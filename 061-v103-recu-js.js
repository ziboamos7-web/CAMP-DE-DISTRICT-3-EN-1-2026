
(function(){
 const KEY='camp_registration_2026',$=id=>document.getElementById(id);
 const esc=s=>String(s==null||s===''?'—':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 window.openTicket=function(){
  const box=$('v49Card'),ov=$('v49Ov');if(!box||!ov)return;
  let d={};try{d=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){}
  box.className='v49-card v103';
  if(!d.Name){
   box.innerHTML='<div class="v49-empty"><h3>Pas encore de ticket</h3><p>Termine ta pré-inscription pour obtenir ton reçu personnel.</p><button type="button" class="v49-close" id="v103Start">Commencer la pré-inscription</button><button type="button" class="v49-edit" id="v103Cl">Fermer</button></div>';
   $('v103Start').onclick=()=>{window.closeTicket();window.openRegistration()};$('v103Cl').onclick=()=>window.closeTicket();
  }else{
   const price=String(d.Price||''),chef=price==='8000'||/chef/i.test(d.Pass||''),
    pass=(chef?'Chef':'Élément')+(price?' – '+price.replace(/\B(?=(\d{3})+(?!\d))/g,'\u00a0')+' F':''),
    dn=['Port-Bouët','Dioulabougou'].find(x=>x.toLowerCase()===String(d.Group||'').toLowerCase())||d.Group,
    logo=window.campLogo&&dn?window.campLogo(dn):'',
    cell=(l,v)=>'<div><small>'+l+'</small><b>'+esc(v)+'</b></div>',
    bg=[d.Branch,d.Grade].filter(Boolean).join(' · ');
   box.innerHTML='<div class="v49-top"><small>TICKET · GARANGO 2026</small><h3>Camp de District <em>3 en 1</em></h3><span class="v49-pass">'+esc(pass)+'</span></div>'+
    '<div class="v49-body">'+(logo?'<img class="v103-wm" alt="" aria-hidden="true" src="'+logo+'">':'')+
    '<div class="v103-who"><div class="nm">'+esc(String(d.Name).toUpperCase())+'</div>'+(d.Photo?'<img class="v103-ph" alt="Photo du participant" src="'+d.Photo+'">':'')+'</div>'+
    '<div class="v49-grid">'+cell('TROUPE',d.Troop)+cell('DISTRICT',dn)+cell('CONTACT',d.Phone)+cell('TITRE',d.Title)+cell('BRANCHE · GRADE',bg)+cell('DATES','28 oct. → 1er nov. 2026')+'</div>'+
    '<div class="v103-lieu"><small>LIEU</small><b>Collège FOHOUNDI, Garango</b></div></div>'+
    '<div class="v49-tear"></div>'+
    '<div class="v49-foot"><p>Présente ce ticket à l’accueil du Camp. Il est enregistré sur cet appareil.</p><p class="v103-code">Ticket '+esc(d.TicketNumber||'')+'</p><button type="button" class="v49-edit" id="v103Ed">Modifier ma pré-inscription</button><button type="button" class="v49-close" id="v103Cl">Fermer</button></div>';
   $('v103Ed').onclick=()=>{window.closeTicket();window.openRegistration()};$('v103Cl').onclick=()=>window.closeTicket();
  }
  ov.classList.add('open');const nav=$('floatingAppNav');if(nav)nav.style.display='none';document.body.style.overflow='hidden';
 };
})();
