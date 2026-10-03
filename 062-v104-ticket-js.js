
(function(){
 const KEY='camp_registration_2026',$=id=>document.getElementById(id);
 const esc=s=>String(s==null||s===''?'—':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const CODES={'port-bouët':'DP','port-bouet':'DP','dioulabougou':'DD'};
 /* N° d'inscription : CAM-DP-2026-XXXXX (Port-Bouët) · CAM-DD-2026-XXXXX (Dioulabougou) — calculé à partir du district + du contact : identique sur tous les appareils et à chaque réouverture */
 function ticketNum(d){
  return String(d && d.TicketNumber || '').trim();
 }
 window.campTicketNum=ticketNum;
 const I={
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  group:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c.6-3.5 3-5.5 6-5.5s5.4 2 6 5.5M16 14.5c3 0 4.6 1.8 5 4.5"/>',
  pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  bank:'<path d="M3 9l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  cup:'<path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H4c0 3 1.5 4.5 4 5M16 6h4c0 3-1.5 4.5-4 5M12 13v4M8 21h8M10 17h4"/>'};
 const ic=n=>'<span class="v104-ic"><svg viewBox="0 0 24 24" aria-hidden="true">'+I[n]+'</svg></span>';
 const row=(i,l,v)=>'<div class="v104-r">'+ic(i)+'<div><small>'+l+'</small><b>'+esc(v)+'</b></div></div>';
 /* Logo GARANGO 2026 : soleil, montagne, tente, sapins */
 const LOGO='<svg viewBox="0 0 120 104" aria-hidden="true"><circle cx="82" cy="20" r="17" fill="#ff9a2b"/><path d="M14 92 52 30l16 22 12-14 30 54z" fill="#e9f0ff"/><path d="M52 30l8 12-6-3-5 7-6-9z" fill="#9db6ee"/><path d="M28 92 62 52l34 40z" fill="#fff"/><path d="M62 52 50 92h24z" fill="#0b2a8f"/><path d="M62 52v40" stroke="#9db6ee" stroke-width="2"/><g fill="#fff"><path d="M14 42l7 14h-4l6 11H5l6-11H7z"/><path d="M104 46l6 12h-4l5 9H94l5-9h-4z"/></g><path d="M8 94h104" stroke="#ff9a2b" stroke-width="3" stroke-linecap="round"/></svg>';
 window.openTicket=function(){
  const box=$('v49Card'),ov=$('v49Ov');if(!box||!ov)return;
  let d={};try{d=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){}
  box.className='v49-card v104';
  if(!d.Name){
   box.innerHTML='<div class="v49-empty"><h3>Pas encore de ticket</h3><p>Termine ta pré-inscription pour obtenir ton ticket personnel.</p><button type="button" class="v49-close" id="v104Start">Commencer la pré-inscription</button><button type="button" class="v49-edit" id="v104Cl">Fermer</button></div>';
   $('v104Start').onclick=()=>{window.closeTicket();window.openRegistration()};$('v104Cl').onclick=()=>window.closeTicket();
  }else{
   const price=String(d.Price||''),chef=price==='8000'||/chef/i.test(d.Pass||''),
    dn=['Port-Bouët','Dioulabougou'].find(x=>x.toLowerCase()===String(d.Group||'').toLowerCase())||d.Group,
    wm=window.campLogo&&dn?window.campLogo(dn):'',
    bg=[d.Branch,d.Grade].filter(Boolean).join(' · ');
   const money=String(price).replace(/\B(?=(\d{3})+(?!\d))/g,'\u00a0'),
    cell=(l,v,c)=>'<div class="v107-c'+(c?' '+c:'')+'"><small>'+l+'</small><b>'+esc(v)+'</b></div>';
   box.innerHTML='<article class="v107-t"><header class="v107-h"><small>TICKET · GARANGO 2026</small><h3>Camp de District <em>3 en 1</em></h3><span class="v107-pass">'+(chef?'Chef':'Élément')+(price?' – '+money+' F':'')+'</span></header>'+
    '<div class="v107-b"><div class="v107-who"><h4>'+esc(String(d.Name).toUpperCase())+'</h4>'+(d.Photo?'<img class="v107-ph" alt="Photo du participant" src="'+d.Photo+'">':'')+'</div>'+
    '<div class="v107-g">'+cell('ÉGLISE',d.Troop)+cell('GROUPE',dn)+cell('CONTACT',d.Phone)+cell('DATES','28 oct. → 1er nov. 2026','dt')+'</div>'+
    cell('LIEU','Collège FOHOUNDI, Garango','full')+
    '<div class="v107-num"><small>N° DU TICKET</small><b>'+esc(ticketNum(d))+'</b></div>'+
    '<div class="v107-tear"></div>'+
    '<p class="v107-note">Présente ce ticket à l’accueil du Camp. Il est enregistré sur cet appareil.</p>'+
    '<button type="button" class="v107-ed" id="v104Ed">Modifier ma pré-inscription</button>'+
    '<button type="button" class="v107-cl" id="v104Cl">Fermer</button></div></article>';
   $('v104Ed').onclick=()=>{window.closeTicket();window.openRegistration()};$('v104Cl').onclick=()=>window.closeTicket();
  }
  ov.classList.add('open');const nav=$('floatingAppNav');if(nav)nav.style.display='none';document.body.style.overflow='hidden';
 };
})();
