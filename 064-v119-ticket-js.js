
(function(){
 var KEY='camp_registration_2026',$=function(i){return document.getElementById(i)};
 var esc=function(s){return String(s==null||s===''?'—':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
 var prev=window.openTicket;
 window.openTicket=function(){
  var box=$('v49Card'),ov=$('v49Ov');if(!box||!ov)return;
  var d={};try{d=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){}
  if(!d.Name||!window.campTicketNum||!window.campQR){if(prev)prev();return}
  box.className='v49-card v104';
  var price=String(d.Price||''),chef=price==='8000'||/chef/i.test(d.Pass||''),
   dn=['Port-Bouët','Dioulabougou'].find(function(x){return x.toLowerCase()===String(d.Group||'').toLowerCase()})||d.Group,
   money=price.replace(/\B(?=(\d{3})+(?!\d))/g,'\u00a0'),num=campTicketNum(d),pass=(chef?'Chef':'Élément')+(price?' – '+money+' F':''),
   qr=campQR('CAMP3EN1|'+num+'|'+d.Name+'|'+(d.Phone||'')+'|'+(chef?'Chef':'Élément'))||'',
   cell=function(l,v,c){return '<div class="v119-c'+(c?' '+c:'')+'"><small>'+l+'</small><b>'+esc(v)+'</b></div>'};
  box.innerHTML='<article class="v119-t"><header class="v119-h"><small>TICKET · GARANGO 2026</small><h3>Camp de District <em>3 en 1</em></h3><span class="v119-pass">'+esc(pass)+'</span></header>'+
   '<div class="v119-b"><div class="v119-who"><h4>'+esc(String(d.Name).toUpperCase())+'</h4>'+(d.Photo?'<img class="v119-ph" alt="Photo du participant" src="'+d.Photo+'">':'')+'</div>'+
   '<div class="v119-g">'+cell('ÉGLISE',d.Troop)+cell('DISTRICT',dn)+cell('CONTACT',d.Phone)+cell('DATES','28 oct. → 1er nov. 2026')+'</div>'+
   '<div class="v119-id"><div><small>N° DU TICKET</small><b>'+esc(num)+'</b></div><div class="v119-qr">'+qr+'</div></div></div>'+
   '<div class="v119-tear"></div><div class="v119-f"><p>Présente ce ticket à l’accueil du Camp. Il est enregistré sur cet appareil.</p>'+
   '<button type="button" class="v119-ed" id="v119Ed">Modifier ma pré-inscription</button><button type="button" class="v119-cl" id="v119Cl">Fermer</button></div></article>';
  $('v119Ed').onclick=function(){window.closeTicket();window.openRegistration()};$('v119Cl').onclick=function(){window.closeTicket()};
  ov.classList.add('open');var nav=$('floatingAppNav');if(nav)nav.style.display='none';document.body.style.overflow='hidden';
 };
})();
