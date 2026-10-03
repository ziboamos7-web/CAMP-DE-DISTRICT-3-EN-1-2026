
(function(){
  'use strict';
  var KEY='camp_registration_2026';
  var DISTRICT_CODES={
    'port-bouët':'DP','port-bouet':'DP',
    'dioulabougou':'DD'
  };
  function norm(v){return String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
  function codeForDistrict(v){return DISTRICT_CODES[norm(v)]||''}
  function ticketCode(d){
    var p=codeForDistrict(d&&d.Group);
    var n=String(d&&d.TicketNumber||'').replace(/\D/g,'');
    n=n?String(parseInt(n,10)).padStart(4,'0'):'';
    return p&&n?'CAM-'+p+'-2026-'+n:'';
  }
  window.campDistrictCode=codeForDistrict;
  window.campTicketCode=ticketCode;

  function ensureTicketUI(){
    var input=document.getElementById('regTicketNumber');
    var group=document.getElementById('regGroup');
    if(!input||!group)return;
    var field=input.closest('.ticket-number-field');
    if(!field)return;
    var label=field.querySelector('label');
    if(label)label.textContent='NUMÉRO DU TICKET ACHETÉ DANS TA TROUPE *';
    if(!document.getElementById('regTicketWrap')){
      var wrap=document.createElement('div');wrap.id='regTicketWrap';
      var pre=document.createElement('span');pre.id='regTicketPrefix';pre.textContent='CAM-—-2026-';
      var parent=input.parentNode;parent.insertBefore(wrap,input);wrap.appendChild(pre);wrap.appendChild(input);
      var help=document.getElementById('regTicketHelp');
      var pv=document.createElement('div');pv.id='regTicketCodePreview';
      pv.innerHTML='Code du ticket : <b>Choisis d’abord ton district</b>';
      (help||wrap).after(pv);
    }
    function paint(){
      var c=codeForDistrict(group.value);
      var pre=document.getElementById('regTicketPrefix');
      var pv=document.getElementById('regTicketCodePreview');
      if(pre)pre.textContent=c?'CAM-'+c+'-2026-':'CAM-—-2026-';
      if(pv){
        var n=String(input.value||'').replace(/\D/g,'').slice(0,4);
        var nn=n?String(parseInt(n,10)).padStart(4,'0'):'';
        pv.innerHTML='Code du ticket : <b>'+(c&&nn?'CAM-'+c+'-2026-'+nn:'Choisis le district et saisis le numéro du ticket')+'</b>';
      }
    }
    input.addEventListener('input',function(){
      this.value=this.value.replace(/\D/g,'').slice(0,4);
      paint();
    });
    group.addEventListener('change',paint);
    paint();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensureTicketUI);else ensureTicketUI();
  setTimeout(ensureTicketUI,300);
  setTimeout(ensureTicketUI,1000);

  // Les 1 000 tickets (0001–1000) sont une série globale répartie aléatoirement entre les districts.
  // Le même numéro ne peut donc être utilisé qu'une seule fois, quel que soit le district.
  function backend(){return window.CampBackend&&window.CampBackend.sb}
  async function currentUser(sb){var r=await sb.auth.getSession();return r&&r.data&&r.data.session&&r.data.session.user||null}
  async function reserve(d){
    var sb=backend(); if(!sb) throw new Error('Supabase indisponible.');
    var u=await currentUser(sb); if(!u)return {ok:false,message:'Connecte-toi à ton compte avant de valider la pré-inscription.'};
    var dc=codeForDistrict(d.Group);
    if(!dc)return {ok:false,message:'Choisis ton district avant de renseigner le ticket.'};
    if(!String(d.TicketNumber||'').replace(/\D/g,'')){
      var r0={user_id:u.id,name:d.Name,phone:d.Phone,birth:d.Birth||null,sex:d.Sex,branch:d.Branch,grade:d.Grade,region:d.Region,group_name:d.Group,troop:d.Troop,patrol:d.Patrol,title:d.Title,sector:d.Sector||'Centre',price:+d.Price,pass:d.Pass,district_code:dc,ticket_number:null,ticket_code:null};
      var u0=await sb.from('registrations').upsert(r0,{onConflict:'user_id'}).select().single();
      if(u0.error&&/column|schema cache/i.test(u0.error.message||'')){delete r0.ticket_code;u0=await sb.from('registrations').upsert(r0,{onConflict:'user_id'}).select().single()}
      if(u0.error)throw u0.error;
      return {ok:true,data:u0.data};
    }
    var n=parseInt(String(d.TicketNumber||'').replace(/\D/g,''),10);
    if(!n||n<1||n>1000)return {ok:false,message:'Le numéro de ticket doit être compris entre 0001 et 1000.'};
    var code='CAM-'+dc+'-2026-'+String(n).padStart(4,'0');
    var q=await sb.from('registrations').select('user_id,ticket_number,district_code,ticket_code').eq('ticket_code',code).limit(1);
    if(q.error){
      // Compatibilité si ticket_code n'est pas encore présent : vérification par district + numéro.
      if(/ticket_code|column|schema cache/i.test(q.error.message||'')){
        q=await sb.from('registrations').select('user_id,ticket_number,district_code').eq('ticket_number',n).limit(1);
      }
      if(q.error)throw q.error;
    }
    var hit=(q.data||[])[0];
    if(hit && hit.user_id!==u.id)return {ok:false,message:'Ce numéro de ticket ('+String(n).padStart(4,'0')+') a déjà été utilisé.'};
    var row={user_id:u.id,name:d.Name,phone:d.Phone,birth:d.Birth||null,sex:d.Sex,branch:d.Branch,grade:d.Grade,region:d.Region,group_name:d.Group,troop:d.Troop,patrol:d.Patrol,title:d.Title,sector:d.Sector||'Centre',price:+d.Price,pass:d.Pass,ticket_number:n,district_code:dc,ticket_code:code};
    if(d.ContactEmail)row.contact_email=d.ContactEmail;
    if(d.Address)row.address=d.Address;
    if(d.BirthPlace)row.birth_place=d.BirthPlace;
    if(d.Nation)row.nationality=d.Nation;
    if(d.Church)row.church=d.Church;
    try{
      var up=await sb.from('registrations').upsert(row,{onConflict:'user_id'}).select().single();
      if(up.error && /column|schema cache/i.test(up.error.message||'')){
        // Ancien schéma : au minimum conserver le ticket + district si les colonnes existent.
        var fallback={user_id:u.id,name:d.Name,phone:d.Phone,birth:d.Birth||null,sex:d.Sex,branch:d.Branch,grade:d.Grade,region:d.Region,group_name:d.Group,troop:d.Troop,patrol:d.Patrol,title:d.Title,sector:d.Sector||'Centre',price:+d.Price,pass:d.Pass,ticket_number:n,district_code:dc};
        up=await sb.from('registrations').upsert(fallback,{onConflict:'user_id'}).select().single();
      }
      if(up.error){
        var msg=String(up.error.message||'');
        if(/23505|duplicate|unique/i.test(msg))return {ok:false,message:'Ce numéro de ticket est déjà utilisé.'};
        throw up.error;
      }
      return {ok:true,code:code,data:up.data};
    }catch(e){
      if(/23505|duplicate|unique/i.test(String(e&&e.message||'')))return {ok:false,message:'Ce numéro de ticket est déjà utilisé.'};
      throw e;
    }
  }
  if(window.CampBackend){
    var old=window.CampBackend.checkAndSaveRegistration;
    window.CampBackend.checkAndSaveRegistration=reserve;
  }
  // Le validateur final existant construit d'abord d : on lui ajoute TicketCode sans changer le numéro saisi.
  var oldSave=window.saveRegistration;
  if(typeof oldSave==='function'){
    window.saveRegistration=function(e){
      var self=this;
      return Promise.resolve(oldSave.call(self,e)).then(function(ok){
        if(ok!==true)return ok;
        try{
          var d=JSON.parse(localStorage.getItem(KEY)||'null')||{};
          d.DistrictCode=codeForDistrict(d.Group);
          d.TicketCode=ticketCode(d);
          delete d.TicketId;
          localStorage.setItem(KEY,JSON.stringify(d));
          try{window.dispatchEvent(new Event('storage'))}catch(x){}
        }catch(x){}
        return ok;
      });
    };
  }
  // Recalcule le code local après l'enregistrement validé.
  window.addEventListener('storage',function(){try{var d=JSON.parse(localStorage.getItem(KEY)||'null');if(d&&d.TicketNumber){d.DistrictCode=codeForDistrict(d.Group);d.TicketCode=ticketCode(d);localStorage.setItem(KEY,JSON.stringify(d))}}catch(e){}});
  window.campTicketNum=function(d){return ticketCode(d)||String(d&&d.TicketNumber||'')};
})();
