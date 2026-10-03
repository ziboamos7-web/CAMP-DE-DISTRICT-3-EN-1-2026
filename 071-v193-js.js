
(function(){
 var scr=document.getElementById('screenPlus');if(!scr)return;
 var root=document.createElement('div');root.id='v193Plus';scr.appendChild(root);
 var LS=function(k){try{return localStorage.getItem(k)}catch(e){return null}},SS=function(k,v){try{localStorage.setItem(k,v)}catch(e){}};
 var P={user:'<circle cx="12" cy="8.5" r="3.6"/><path d="M5 20c1-4 4-5.5 7-5.5s6 1.5 7 5.5"/>',tk:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 6v12"/>',list:'<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',news:'<path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM18 9h2v9a2 2 0 0 1-2 2M8 8h7M8 12h7M8 16h4"/>',img:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',gal:'<rect x="6" y="3" width="15" height="15" rx="3"/><path d="M3 7v11a3 3 0 0 0 3 3h11M9 13l3-3 3 3 2-2 2 2"/>',head:'<path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1z"/>',set:'<path d="M4 8h9M17 8h3M4 16h3M11 16h9"/><circle cx="15" cy="8" r="2"/><circle cx="9" cy="16" r="2"/>',cam:'<path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',pin:'<path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>',share:'<circle cx="6" cy="12" r="2.3"/><circle cx="18" cy="6" r="2.3"/><circle cx="18" cy="18" r="2.3"/><path d="M8.1 11 15.9 7M8.1 13l7.8 4"/>',cal:'<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',bag:'<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2M9.5 13.5l2 2 3.5-3.5"/>',chev:'<path d="M6 9l6 6 6-6"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',out:'<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 8l4 4-4 4M19 12H9"/>',arr:'<path d="M9 5l7 7-7 7"/>'};
 var sv=function(n){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+P[n]+'</svg>'};
 var esc=function(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
 var H=function(){return window.__v188||{}};
 var CK=['Tenue de troupe','Tee-shirt du Camp','Bible et cahier','Gourde et couverts','Lampe torche','Drap et matelas','Produits de toilette','Médicaments personnels'];
 var n0=new Date(),pd=(n0.getFullYear()===2026&&n0.getMonth()===9&&n0.getDate()>=28)?n0.getDate()-28:(n0.getFullYear()===2026&&n0.getMonth()===10&&n0.getDate()===1?4:0);
 var first=true,hero=null,M={},pageK='',pgEl=null;
 function ck(){try{return JSON.parse(LS('camp_checklist_2026')||'[]')}catch(e){return[]}}
 function toast(m){var t=document.createElement('div');t.className='p-toast';t.textContent=m;document.body.appendChild(t);setTimeout(function(){t.remove()},2200)}
 function kv(a,b){return (typeof b==='string'||typeof b==='number')&&b!==''?'<div class="p-kv"><span>'+a+'</span><b>'+esc(b)+'</b></div>':''}
 function tg(c,l,on){return '<button type="button" class="p-tg" data-c="'+c+'" aria-pressed="'+(on?'true':'false')+'"><span>'+l+'</span><i></i></button>'}
 function prog(){var C=window.CPG;if(!C)return '';var h='<div class="p-days">'+C.D.map(function(x,i){return '<button type="button" data-c="day" data-v="'+i+'" class="'+(i===pd?'on':'')+'">'+x+'</button>'}).join('')+'</div>';C.P.forEach(function(r){var t=r[1][pd];if(t)h+='<div class="p-pg"><time>'+r[0]+'</time><span>'+esc(t)+'</span></div>'});return h}
 function gal(){var seen={},im=[];document.querySelectorAll('img').forEach(function(i){var s=i.currentSrc||i.src||'';if(root.contains(i)||s.indexOf('data:image')!==0||seen[s]||!/FOHOUNDI|Garango|panneau|bâtiment|salle|plan/i.test(i.alt||''))return;seen[s]=1;if(im.length<8)im.push(s)});return (im.length?'<div class="p-gal">'+im.map(function(s){return '<img alt="" loading="lazy" src="'+s+'">'}).join('')+'</div>':'<p class="p-p">Photos du Collège FOHOUNDI.</p>')+'<button type="button" class="p-btn" data-c="gal">Voir toute la galerie</button>'}
 function refCode(d){var t=String(d.Name||'')+String(d.Phone||''),h=0;for(var i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))>>>0;var ini=String(d.Name||'').normalize('NFD').replace(/[^A-Za-z]/g,'').slice(0,3).toUpperCase()||'CMP';return ini+'-'+(h%9000+1000)}
 function myCode(){var d=H().reg?H().reg():null;return d?refCode(d):''}
 function body(k,d,cv){
  if(k==='reg')return d?kv('Nom',d.Name)+kv('Téléphone',d.Phone)+kv('Troupe',d.Group)+kv('Église',d.Church)+'<button type="button" class="p-btn pr" data-c="reg">Modifier</button>':'<p class="p-p">Tu n’es pas encore pré-inscrit(e).</p><button type="button" class="p-btn pr" data-c="reg">Me pré-inscrire</button>';
  if(k==='tk')return kv('Titulaire',d&&d.Name)+kv('Formule',d&&d.Pass)+'<button type="button" class="p-btn pr" data-c="tk">Afficher mon QR code</button>';
  if(k==='lieu')return kv('Lieu','Collège FOHOUNDI, Garango')+kv('Dates','28 oct. → 1er nov. 2026')+'<a class="p-btn pr" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Coll%C3%A8ge%20FOHOUNDI%20Garango">Itinéraire</a><button type="button" class="p-btn" data-c="copy">Copier l’adresse</button>';
  if(k==='prog')return prog();
  if(k==='gal')return gal();
  if(k==='frame')return '<p class="p-p">Choisis ta photo : elle s’insère dans le cadre du Camp, prête à partager.</p><button type="button" class="p-btn pr" data-c="frame">Choisir ma photo</button><button type="button" class="p-btn" data-c="frameGo">Voir le cadre</button>';
  if(k==='chk'){var a=ck();return CK.map(function(x,i){return '<button type="button" class="p-ck'+(a.indexOf(i)>-1?' on':'')+'" data-c="chk" data-v="'+i+'"><s></s><span>'+x+'</span></button>'}).join('')}
  if(k==='share'){if(!d)return '<p class="p-p">Pré-inscris-toi d’abord pour obtenir ton code promo personnel.</p><button type="button" class="p-btn pr" data-c="reg">Me pré-inscrire</button>';
   var cd=refCode(d),n=Math.min(10,+LS('camp_ref_count_2026')||0);
   return '<p class="p-p">Partage ton code promo à tes amis. Quand ils s’inscrivent avec ton code, tu te rapproches des avantages.</p><div class="p-code">'+esc(cd)+'</div><div class="pp-bar"><i style="width:'+n*10+'%"></i></div><p class="p-p"><b>'+n+' / 10</b> inscrits avec ton code'+(n>=10?' · avantages débloqués !':' · avantages dès 10 inscrits')+'</p><button type="button" class="p-btn pr" data-c="sharecode">Partager mon code</button><button type="button" class="p-btn" data-c="copycode">Copier le code</button>'}
  if(k==='help')return '<a class="p-btn" href="tel:+2250748492324">Appeler 07 48 49 23 24</a><a class="p-btn" href="tel:+2250747153920">Appeler 07 47 15 39 20</a><a class="p-btn wa" target="_blank" rel="noopener" href="https://wa.me/2250506172317">WhatsApp 05 06 17 23 17</a>';
  if(k==='set')return tg('vib','Vibrations',(LS('camp_set_vibr')||'1')==='1')+tg('calm','Économie d’énergie',LS('camp_set_calm')==='1')+'<button type="button" class="p-btn" data-c="cvadd">'+(cv?'Ajuster la couverture':'Ajouter une couverture')+'</button>'+(cv?'<button type="button" class="p-btn dg" data-c="cvdel">Retirer la couverture</button>':'')+'';
  return ''}
 function render(){
  var h=H(),d=h.reg?h.reg():null,cv=h.cover?h.cover():'',av=h.avatar?h.avatar():'';
  var nm=d?d.Name:'Mon profil',ini=(String(nm).trim().charAt(0)||'S').toUpperCase();
  var sub=d?([d.Phone?'+225 '+String(d.Phone).replace(/^\+?225/,'').trim():'',d.Group||''].filter(Boolean).join(' • ')):'Touche pour te pré-inscrire';
  var dl=Math.ceil((new Date(2026,9,28)-new Date())/864e5),cd=dl>0?'J-'+dl+' · 28 oct. → 1er nov.':(new Date()<new Date(2026,10,2)?'Camp en cours':'Camp terminé');
  var nck=ck().length;
  function it(k,ic,col,t,s,go){M[k]=[ic,col,t,s];return '<div class="p-it" data-k="'+k+'"><button type="button" class="p-row" data-a="'+k+'"><i style="background:'+col+'">'+sv(ic)+'</i><span class="t"><b>'+t+'</b><small>'+s+'</small></span><em class="p-ch">'+sv('arr')+'</em></button></div>'}
  function sec(l,a,dl){return '<div class="p-lb">'+l+'</div><div class="p-card" style="animation-delay:'+dl+'ms">'+a.join('')+'</div>'}
  root.className=first?'pfx':'';first=false;
  root.innerHTML='<div class="p-hero" id="pHero"><div class="p-cv" style="'+(cv?'background-image:url('+cv+')':'')+'"></div><div class="p-ov" data-c="viewcv"></div><div class="p-av" data-c="viewav" style="'+(av?'background-image:url('+av+');font-size:0':'')+'">'+esc(ini)+'<button type="button" class="p-cam" data-c="avadd" aria-label="Changer ma photo de profil">'+sv('cam')+'</button></div><h2 class="p-nm" data-c="reg">'+esc(nm)+'</h2><p class="p-sb">'+esc(sub)+'</p><p class="p-tag">Ensemble<br>pour un meilleur camp !</p></div>'
  +'<div class="p-body">'
  +sec('MON CAMP',[it('reg','user','#2b8cf0','Ma pré-inscription',d?'Voir mes informations':'Pas encore pré-inscrit(e)'),d?it('tk','tk','#7c4dff','Mon ticket','Titulaire et QR code'):'',it('agenda','cal','#5b6ee1','Mon agenda','Mes rendez-vous du Camp',1),it('lieu','pin','#e5484d','Lieu & dates',cd)],0)
  +sec('DÉCOUVRIR',[it('prog','list','#3a56d4','Programme du Camp','Activités et horaires'),it('news','news','#f08a1c','Actualités','Les dernières informations',1),it('gal',galOn()?'gal':'lock',galOn()?'#a259e6':'#a9a9bb','Galerie',galOn()?'Photos du Camp':'Disponible pendant le Camp'),it('frame','img','#e8a317','Ma photo du Camp','Cadre photo à partager')],70)
  +sec('PRATIQUE',[it('chk','bag','#34a853','À emporter',nck+' / '+CK.length+' prêts'),it('share','share','#0ea5a4','Inviter un ami','Code promo · avantages dès 10 inscrits'),it('help','head','#1fb5a8','Contact & Assistance','Appeler ou écrire'),it('set','set','#8e5be8','Paramètres','Réglages et couverture'),'<div class=\"p-logout-wrap\"><button type=\"button\" class=\"p-logout\" data-c=\"logout\"><span class=\"p-logout-ic\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 8l4 4-4 4M19 12H9\"/></svg></span><span><b>Se déconnecter</b><small>Fermer ma session sur cet appareil</small></span></button></div>'],140)
  +'<div class="p-sig"><b>Camp de District 3 en 1</b>Garango 2026 · 5 jours · 1 expérience · 1 communauté</div></div>';
  hero=root.querySelector('#pHero');sync()}
 function sync(){if(!hero)return;var a=hero.getBoundingClientRect().top,b=scr.getBoundingClientRect().top;hero.style.setProperty('--p',Math.max(0,Math.min(1,(b-a)/Math.max(1,-parseFloat(getComputedStyle(hero).top)||196))).toFixed(3))}
 function refresh(){var y=scr.scrollTop,w=window.scrollY;render();scr.scrollTop=y;window.scrollTo(0,w);sync();paint()}
 function upd(){paint()}
 function galOn(){return new Date()>=new Date(2026,9,28)}
 function go(k){var m={reg:'openRegistration',tk:'openTicket',agenda:'cdAgenda',news:'goFil',frame:'goCampFrame',help:'openContactSheet'};
  if(k==='prog'){window.openPresenter&&openPresenter('programme');return}
  if(k==='gal'){if(!galOn()){toast('Galerie bientôt disponible : les photos du Camp seront consultables pendant le Camp.');return}window.openPresenter&&openPresenter('lieu');return}
  if(k==='lieu'){window.openPresenter&&openPresenter('lieu');return}
  if(m[k]){if(window[m[k]])window[m[k]]();return}
  openPage(k)}
 function view(src){var v=document.createElement('div');v.className='p-vw';v.innerHTML='<img alt="" src="'+src+'"><button type="button" aria-label="Fermer">×</button>';v.onclick=function(){v.remove()};document.body.appendChild(v)}
 function sheet(){var o=document.createElement('div');o.className='p-sh';
  o.innerHTML='<div class="p-sc"><span class="p-si">'+sv('out')+'</span><h3>Se déconnecter ?</h3><p>Sur cet appareil, ta pré-inscription, ton ticket, ta photo de profil et ta couverture seront retirés. Tu pourras te pré-inscrire à nouveau à tout moment.</p><button type="button" class="p-btn dg2" data-x="ok">Se déconnecter</button><button type="button" class="p-btn gh" data-x="no">Annuler</button></div>';
  function shut(){o.classList.remove('open');setTimeout(function(){o.remove()},250)}
  o.addEventListener('click',function(e){
    var x=e.target.closest('[data-x]');
    if(e.target===o||(x&&x.dataset.x==='no'))return shut();
    if(x&&x.dataset.x==='ok'){
      shut();
      if(window.campLogout)window.campLogout();
      else plusLogout();
    }
  });
  document.body.appendChild(o);requestAnimationFrame(function(){requestAnimationFrame(function(){o.classList.add('open')})})}
 function pbody(k){var h=H(),d=h.reg?h.reg():null,cv=h.cover?h.cover():'',x='';if(k==='chk'){var n=ck().length;x='<div class="pp-bar"><i style="width:'+Math.round(n/CK.length*100)+'%"></i></div><p class="p-p">'+n+' / '+CK.length+' éléments prêts</p>'}return x+body(k,d,cv)}
 function paint(){if(!pageK||!pgEl)return;var c=pgEl.querySelector('.pp-in'),y=pgEl.scrollTop;c.innerHTML=pbody(pageK);pgEl.scrollTop=y}
 function closePage(){if(!pgEl)return;var e=pgEl;pgEl=null;pageK='';e.classList.remove('open');setTimeout(function(){e.remove()},300)}
 function openPage(k){var m=M[k];if(!m)return;closePage();pageK=k;var e=document.createElement('div');e.className='pp';
  e.innerHTML='<div class="pp-hd" style="background:linear-gradient(135deg,'+m[1]+','+m[1]+'cc)"><button type="button" class="pp-bk" aria-label="Retour">'+sv('arr')+'</button><span class="pp-ic">'+sv(m[0])+'</span><h3>'+m[2]+'</h3><p>'+m[3]+'</p></div><div class="pp-bd"><div class="p-card"><div class="pp-in"></div></div></div>';
  document.body.appendChild(e);pgEl=e;paint();e.querySelector('.pp-bk').onclick=closePage;
  e.addEventListener('click',function(ev){var c=ev.target.closest('[data-c]');if(c&&e.contains(c)){var f=C[c.dataset.c];if(f)f(c);if(/^(reg|tk|gal|frame|frameGo)$/.test(c.dataset.c))closePage()}});
  requestAnimationFrame(function(){requestAnimationFrame(function(){e.classList.add('open')})})}
 var C={
  reg:function(){window.openRegistration&&openRegistration()},tk:function(){window.openTicket&&openTicket()},
  cvadd:function(){H().pickCover&&H().pickCover()},avadd:function(){H().pickAvatar&&H().pickAvatar()},
  cvdel:function(){try{localStorage.removeItem('camp_cover');localStorage.removeItem('camp_cover_src');localStorage.removeItem('camp_cover_t')}catch(e){}refresh();toast('Couverture retirée')},
  vib:function(){var on=(LS('camp_set_vibr')||'1')!=='1';SS('camp_set_vibr',on?'1':'0');if(on&&navigator.vibrate)navigator.vibrate(30);refresh()},
  calm:function(){var on=LS('camp_set_calm')!=='1';SS('camp_set_calm',on?'1':'0');document.documentElement.classList.toggle('v187-calm',on);refresh()},
  logout:function(){sheet()},
  viewcv:function(){var c=H().cover&&H().cover();if(c)view(c)},
  viewav:function(){var c=H().avatar&&H().avatar();if(c)view(c)},
  wipe:function(){if(confirm('Effacer ta pré-inscription et ton ticket de cet appareil ?')){try{localStorage.removeItem('camp_registration_2026');localStorage.removeItem('camp_registration_draft')}catch(e){}location.reload()}},
  gal:function(){window.openPresenter&&openPresenter('lieu')},
  frame:function(){var f=document.getElementById('cfF');if(!f){window.goCampFrame&&goCampFrame();return}f.addEventListener('change',function(){setTimeout(function(){window.goCampFrame&&goCampFrame()},300)},{once:true});f.click()},
  frameGo:function(){window.goCampFrame&&goCampFrame()},
  copy:function(){try{navigator.clipboard.writeText('Collège FOHOUNDI, Garango')}catch(e){}toast('Adresse copiée')},
  sharecode:function(){var c=myCode();if(!c)return;var t='Rejoins le Camp de District 3 en 1 (28 oct. → 1er nov. 2026, Garango) ! Utilise mon code promo '+c+' à ton inscription.';if(window.cdShare)cdShare('Camp de District 3 en 1',t);else if(navigator.share)navigator.share({title:'Camp de District 3 en 1',text:t}).catch(function(){})},
  copycode:function(){var c=myCode();try{navigator.clipboard.writeText(c)}catch(e){}toast('Code copié : '+c)},
  share:function(){var t='Camp de District 3 en 1 · du 28 oct. au 1er nov. 2026 · Collège FOHOUNDI Garango. Rejoins-nous !';if(window.cdShare)cdShare('Camp de District 3 en 1',t);else if(navigator.share)navigator.share({title:'Camp de District 3 en 1',text:t}).catch(function(){})},
  day:function(b){pd=+b.dataset.v;upd('prog')},
  chk:function(b){var a=ck(),i=+b.dataset.v,j=a.indexOf(i);if(j<0)a.push(i);else a.splice(j,1);SS('camp_checklist_2026',JSON.stringify(a));refresh()}};
 root.addEventListener('click',function(e){
  var c=e.target.closest('[data-c]');if(c&&root.contains(c)){var f=C[c.dataset.c];if(f)f(c);return}
  var a=e.target.closest('[data-a]');if(!a)return;var k=a.dataset.a;
  if(k==='news'){window.goFil&&goFil();return}if(k==='agenda'){window.cdAgenda&&cdAgenda();return}
  go(k)});
 document.addEventListener('scroll',sync,{capture:true,passive:true});
 document.addEventListener('campprofile',refresh);window.addEventListener('storage',refresh);
 var os=window.showAppTab;if(typeof os==='function')window.showAppTab=function(t){var r=os.apply(this,arguments);if(t==='plus'){first=true;setTimeout(refresh,30)}return r};
 window.openSettingsSheet=function(){if(window.showAppTab)showAppTab('plus');setTimeout(function(){openPage('set')},60)};
 render();
})();
