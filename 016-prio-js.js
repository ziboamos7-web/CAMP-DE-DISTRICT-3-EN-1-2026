
/* ===== À LIRE EN PRIORITÉ — modifie ce tableau pour changer les annonces prioritaires =====
   ico : emoji · cat : catégorie · boutons : { t, tel | go:'inscription'|'cadre'|'programme'|'lieu'|'affiche' } */
var PRIO=[
 {id:'communique',ico:'📢',cat:'Communiqué',titre:'Paiement des tickets : avant le 15 octobre',meta:'Communiqué',date:'Avant le 15 oct.',cta:'Je me pré-inscris',chips:['7 000 F ou 8 000 F','Avant le 15 octobre','Tee-shirt offert'],points:['Ticket Élément : 7 000 F · Chef : 8 000 F','Solde à régler avant le 15 octobre','Tee-shirt offert aux premiers payeurs'],
  texte:'<b>Shalom</b> chers responsables de troupe et adjoints du district de Bouaflé, j’ose croire que mon message vous trouve en bonne santé. 🍀<br><br>Nous venons par ce message vous inviter à faire de votre mieux afin de vous acquitter de votre ticket de <b>7.000 F</b> ou de <b>8.000 F</b> en fonction de votre titre. Nous avons jusqu’au <b>15 octobre</b> pour solder notre paiement afin d’avoir nos tee-shirts gratuitement.<br><br><b>N.B :</b> les tee-shirts seront confectionnés à Abidjan et ce sont ceux qui paieront premièrement leur ticket qui seront servis. Les gens de la dernière minute auront leurs tee-shirts après le camp.<br><br>Nous attachons du prix à ce communiqué et nous souhaitons vivement son exécution.<br><br>Large diffusion à tous, cordialement…<br><b>Pour le camp du district 3 en 1, le SG</b>',
  boutons:[{t:'Je me pré-inscris',go:'inscription'}]},
 {id:'cuflb',ico:'🏆',cat:'CUFLB 2026',titre:'CUFLB : matchs, classement et licence de joueur',meta:'Nouveau',date:'Saison 2026',iso:'2026-10-01',cta:'Ouvrir la CUFLB',chips:['Matchs','Classement','Licence'],points:['Suis les matchs, le classement et les statistiques','Active ta licence avec le code de la Fédération','Retrouve ta licence et ta carte à tout moment'],
  texte:'La Coupe d’Unité Flambeaux-Lumières de Bouaflé est dans l’appli : matchs du jour, classement, statistiques. Joueur ? Active ta licence avec le code à 4 chiffres reçu de la Fédération.',
  boutons:[{t:'🏆 Ouvrir la CUFLB',go:'cuflb'},{t:'Ma licence',go:'licence',alt:1}]},
 {id:'tickets',ico:'🎟️',cat:'Billetterie',titre:'Les tickets sont maintenant disponibles !',meta:'Nouveau',date:'28 sept. 2026',iso:'2026-09-28',cta:'Acheter',ctaTel:1,chips:['Chef · 8 000 F','Élément · 7 000 F'],points:['T-shirt offert après achat','Accès au dortoir du camp','Accès à la nourriture','Bracelet unique pour tout campeur'],
  texte:'Pass Chef : 8 000 F CFA · Pass Élément : 7 000 F CFA. Bonus d’achat : T-shirt offert après achat, accès au dortoir du camp, accès à la nourriture et bracelet unique pour tout campeur.',
  boutons:[{t:'📞 Appeler pour acheter',tel:'+2250748492324'},{t:'Se pré-inscrire',go:'inscription',alt:1}]},
 {id:'cadre',ico:'📸',cat:'Communauté',titre:'Mets ta photo dans le cadre du Camp',meta:'À partager',date:'Camp 2026',cta:'Créer ma photo',chips:['Ta photo','Cadre officiel'],points:['Choisis ta photo','Place-la dans le cadre officiel','Partage-la avec tes amis'],
  texte:'Choisis ta photo, place-la dans le cadre officiel du Camp de District 3 en 1 et partage-la avec tes amis.',
  boutons:[{t:'Créer ma photo',go:'cadre'}]},
 {id:'lieu',ico:'📍',cat:'Rendez-vous',titre:'Du 28 octobre au 1er novembre 2026 à Garango',meta:'Save the date',date:'Camp 2026',cta:'Voir le lieu',chips:['28 oct. → 1er nov.','Collège FOHOUNDI'],points:['Loisirs','Séminaire','Évangélisation'],
  texte:'Rendez-vous au Collège FOHOUNDI, Garango, pour 5 jours de loisirs, de séminaire et d’évangélisation. Thème : « Va avec cette force que tu as. » (Juges 6:14)',
  boutons:[{t:'Voir le lieu',go:'lieu'},{t:'Programme',go:'programme',alt:1}]}
];

(function(){
var box=document.getElementById('prio'),ps=document.getElementById('ps');if(!box||!ps)return;
var idx=0,likes={},cms={},readS={},timer=0,DUR=7000,elapsed=0,startedAt=0,held=false,hover=false,sheetOpen=false,inView=!('IntersectionObserver' in window),seen=false;
var calm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
var START=Date.UTC(2026,9,28),END=Date.UTC(2026,10,2),KEY='camp_registration_2026';
try{likes=JSON.parse(localStorage.getItem('campPrioLikes')||'{}')}catch(e){}
try{readS=JSON.parse(localStorage.getItem('campPrioRead')||'{}')}catch(e){}
function markRead(id){if(readS[id])return;readS[id]=1;try{localStorage.setItem('campPrioRead',JSON.stringify(readS))}catch(e){}}
function unread(){return PRIO.filter(function(q){return !readS[q.id]}).length}
function buzz(n){if(navigator.vibrate&&!calm)try{navigator.vibrate(n)}catch(e){}}
box.setAttribute('role','region');box.setAttribute('aria-roledescription','carrousel');
var HE='<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/></svg>';
var CO='<svg viewBox="0 0 24 24"><path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4z"/></svg>';
var SH='<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="5.5" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.8l7.6-4M8.2 13.2l7.6 4"/></svg>';
var PH='<svg viewBox="0 0 24 24"><path d="M6.6 3.5h3l1.5 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A15.500 15.500 0 0 1 4.600 5.700 2 2 0 0 1 6.600 3.500z"/></svg>';
var AR='<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
function reg(){var d=null;try{d=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}return !!(d&&d.Name)}
function esc(t){return String(t).replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function closeNav(d){var n=document.getElementById('floatingAppNav');if(n)n.style.display=d?'none':'grid'}
function go(b){if(b.tel)location.href='tel:'+b.tel;else{closeSheet();if(b.go==='inscription'&&window.openRegistration)openRegistration();else if(b.go==='ticket'&&window.openTicket)openTicket();else if(b.go==='cadre'&&window.goCampFrame)goCampFrame();else if(b.go==='affiche'&&window.openPoster)openPoster();else if(b.go==='programme'&&window.openPresenter)openPresenter('programme');else if(b.go==='lieu'&&window.openPresenter)openPresenter('lieu');else if(b.go==='cuflb')window.cuOpen&&cuOpen(0);else if(b.go==='licence')window.cuOpen&&cuOpen(1)}}
function share(p){var t=[p.cat?String(p.cat).toUpperCase():'',p.titre,p.texte,p.date?'📅 '+p.date:'','Dynamique District de Bouaflé · Camp de District 3 en 1'].filter(Boolean).join('\n');if(window.cdShare)cdShare(p.titre,t)}
/* date affichée : relative si connue, compte à rebours pour « lieu » (synchro avec la carte du Camp) */
function when(p){
  var now=Date.now();
  if(p.id==='lieu'){
    if(now<START)return '<span class="prio-j">J-'+Math.ceil((START-now)/86400000)+'</span>';
    if(now<END)return '<span class="prio-j">En cours</span>';
  }
  if(p.iso){var d=Math.floor((now-Date.parse(p.iso+'T00:00:00Z'))/86400000);if(d<=0)return 'Aujourd’hui';if(d===1)return 'Hier';if(d<7)return 'Il y a '+d+' j'}
  return esc(p.date);
}
function metaHTML(p){return '<b>'+esc(p.meta.toUpperCase())+'</b>'+when(p)}
/* lecture auto : pause au toucher, hors écran, onglet caché, fiche ouverte */
function setPlay(on){var i=box.querySelector('.prio-tabs i.on');if(i)i.style.setProperty('--play',on?'running':'paused')}
function stop(){if(timer){elapsed+=Date.now()-startedAt;clearTimeout(timer);timer=0}setPlay(false)}
function run(){
  clearTimeout(timer);timer=0;
  if(calm||PRIO.length<2||held||hover||sheetOpen||document.hidden||!inView){setPlay(false);return}
  startedAt=Date.now();timer=setTimeout(function(){timer=0;step(1)},Math.max(200,DUR-elapsed));setPlay(true);
}
function cntHTML(){var u=unread();return u?'<b>'+u+'</b> à lire':'Tout lu ✓'}
function render(dir){
 var p=PRIO[idx],liked=!!likes[p.id],n=(cms[p.id]||[]).length,isNew=!readS[p.id];
 var tabs='';PRIO.forEach(function(q,i){tabs+='<button type="button" class="prio-tab'+(i===idx?' cur':'')+(readS[q.id]?'':' nw')+'" data-i="'+i+'" aria-label="'+esc(q.cat)+'"'+(i===idx?' aria-current="true"':'')+'><span>'+esc(q.cat)+'</span><i class="'+(i===idx?'on':'')+'" style="--d:'+DUR+'ms"></i></button>'});
 var chips='';(p.chips||[]).forEach(function(c){chips+='<span>'+esc(c)+'</span>'});
 var tel=p.ctaTel?PH:AR;
 box.classList.toggle('is-held',held);
 box.innerHTML='<div class="prio-top"><span class="prio-lab"><span class="prio-dot"></span> À LIRE EN PRIORITÉ</span><span class="prio-nav"><button class="prio-pv" type="button" aria-label="Annonce précédente">‹</button><span class="prio-cnt'+(unread()?'':' ok')+'" aria-live="polite">'+cntHTML()+'</span></span></div>'
 +'<div class="prio-tabs" role="tablist" aria-label="Annonces">'+tabs+'</div>'
 +'<div class="prio-main'+(dir&&!calm?' anim':'')+'" style="--dx:'+(dir<0?'-22px':'22px')+'"><div class="prio-ico" aria-hidden="true">'+p.ico+(isNew?'<em class="prio-new"></em>':'')+'</div><div class="prio-txt"><h3>'+p.titre+'</h3><div class="prio-meta">'+metaHTML(p)+'</div>'+(chips?'<div class="prio-chips">'+chips+'</div>':'')+'</div><button class="prio-nx" type="button" aria-label="Annonce suivante">›</button></div>'
 +'<span class="prio-pause" aria-hidden="true">EN PAUSE</span>'
 +'<div class="prio-bar"><button type="button" class="lk'+(liked?' on':'')+'" aria-label="J’aime">'+HE+'<span>'+(liked?1:0)+'</span></button><button type="button" class="cm" aria-label="Commentaires">'+CO+'<span>'+n+'</span></button><button type="button" class="sh" aria-label="Partager">'+SH+'</button><button type="button" class="prio-cta">'+esc(p.cta||'Lire')+' '+tel+'</button></div>';
 var main=box.querySelector('.prio-main');
 box.querySelector('.prio-nx').onclick=function(e){e.stopPropagation();step(1)};
 box.querySelector('.prio-pv').onclick=function(e){e.stopPropagation();step(-1)};
 main.onclick=function(){openSheet()};
 box.querySelector('.prio-cta').onclick=function(){markRead(p.id);buzz(15);var b0=(p.boutons||[])[0];if(b0&&p.ctaTel&&b0.tel)go(b0);else if(b0)go(b0);else openSheet();render(0)};
 box.querySelector('.cm').onclick=openSheet;
 box.querySelector('.sh').onclick=function(){share(p)};
 [].forEach.call(box.querySelectorAll('.prio-tab'),function(t){t.onclick=function(){var k=+t.getAttribute('data-i');if(k!==idx){var dd=k>idx?1:-1;idx=k;elapsed=0;buzz(8);render(dd)}}});
 box.querySelector('.lk').onclick=function(){likes[p.id]=!likes[p.id];try{localStorage.setItem('campPrioLikes',JSON.stringify(likes))}catch(e){}var b=box.querySelector('.lk');b.classList.remove('on');void b.offsetWidth;b.classList.toggle('on',!!likes[p.id]);b.querySelector('span').textContent=likes[p.id]?1:0;buzz(12)};
 /* glisser sous le doigt : la carte suit, puis change ou revient */
 var x0=null,y0=0,drag=false;
 main.ontouchstart=function(e){x0=e.touches[0].clientX;y0=e.touches[0].clientY;drag=false;held=true;stop();box.classList.add('is-held');main.style.transition='none'};
 main.ontouchmove=function(e){if(x0===null)return;var dx=e.touches[0].clientX-x0,dy=e.touches[0].clientY-y0;if(!drag&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.4)drag=true;if(drag){main.style.transform='translateX('+dx+'px) rotate('+(dx/40)+'deg)';main.style.opacity=String(Math.max(.25,1-Math.abs(dx)/320));if(e.cancelable)e.preventDefault()}};
 main.ontouchend=function(e){
  var dx=x0===null?0:e.changedTouches[0].clientX-x0;x0=null;
  held=false;box.classList.remove('is-held');
  if(drag&&Math.abs(dx)>70){e.preventDefault();buzz(10);step(dx<0?1:-1);return}
  main.style.transition='transform .28s cubic-bezier(.2,.9,.3,1.3),opacity .2s';main.style.transform='';main.style.opacity='';
  if(drag)e.preventDefault();drag=false;run();
 };
 main.ontouchcancel=function(){x0=null;drag=false;held=false;box.classList.remove('is-held');main.style.transition='transform .28s,opacity .2s';main.style.transform='';main.style.opacity='';run()};
 var ct=box.querySelector('.prio-tab.cur');if(ct&&ct.scrollIntoView&&!calm){try{ct.parentNode.scrollTo({left:ct.offsetLeft-12,behavior:'smooth'})}catch(e){}}
 run();
}
function step(d){idx=(idx+d+PRIO.length)%PRIO.length;elapsed=0;render(d)}
if(window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches){
 box.addEventListener('mouseenter',function(){hover=true;stop()});
 box.addEventListener('mouseleave',function(){hover=false;run()});
}
document.addEventListener('visibilitychange',function(){if(document.hidden)stop();else run()});
if('IntersectionObserver' in window){new IntersectionObserver(function(en){inView=en[0].isIntersecting;if(inView)run();else stop()},{threshold:.55}).observe(box)}
setInterval(function(){var m=box.querySelector('.prio-meta');if(m&&!sheetOpen){var h=metaHTML(PRIO[idx]);if(m._h!==h){m._h=h;m.innerHTML=h}}},60000);
function openSheet(){
 var p=PRIO[idx],l=cms[p.id]||[],r=reg();
 markRead(p.id);window.cdFx&&cdFx('read',{once:p.id});
 var pts='';(p.points||[]).forEach(function(t){pts+='<li><span aria-hidden="true">✓</span>'+esc(t)+'</li>'});
 var chips='';(p.chips||[]).forEach(function(c){chips+='<span>'+esc(c)+'</span>'});
 ps.innerHTML='<div class="ps-sheet"><div class="ps-grip"></div><button type="button" class="ps-close" aria-label="Fermer">✕</button><div class="ps-head"><div class="prio-ico">'+p.ico+'</div><div><small>'+esc(p.cat.toUpperCase())+' · '+esc(p.date)+'</small><h3>'+p.titre+'</h3></div></div>'+(chips?'<div class="ps-chips">'+chips+'</div>':'')+'<p>'+p.texte+'</p>'+(pts?'<ul class="ps-pts">'+pts+'</ul>':'')+'<div class="ps-btns"></div><div class="ps-cm"><h4>Commentaires ('+l.length+')</h4><div class="ps-list"></div><form><input placeholder="Écrire un commentaire" maxlength="200"><button>Envoyer</button></form></div></div>';
 var bb=ps.querySelector('.ps-btns');
 (p.boutons||[]).forEach(function(b){
  if(r&&b.go==='inscription')b={t:'Voir mon ticket',go:'ticket',alt:b.alt};
  var e=document.createElement('button');e.type='button';e.textContent=b.t;if(b.alt)e.className='alt';e.onclick=function(){go(b)};bb.appendChild(e);
 });
 var lst=ps.querySelector('.ps-list');l.forEach(function(t){var d=document.createElement('div');d.textContent='Vous : '+t;lst.appendChild(d)});
 ps.querySelector('form').onsubmit=function(e){e.preventDefault();var v=ps.querySelector('input').value.trim();if(!v)return;(cms[p.id]=cms[p.id]||[]).push(v);openSheet();var c=box.querySelector('.cm span');if(c)c.textContent=cms[p.id].length};
 ps.querySelector('.ps-close').onclick=closeSheet;
 /* glisser la poignée vers le bas pour fermer */
 var sh=ps.querySelector('.ps-sheet'),g=ps.querySelector('.ps-grip'),y0=null;
 [g,ps.querySelector('.ps-head')].forEach(function(h){
  h.ontouchstart=function(e){y0=e.touches[0].clientY;sh.style.animation='none';sh.style.transition='none'};
  h.ontouchmove=function(e){if(y0===null)return;var dy=Math.max(0,e.touches[0].clientY-y0);sh.style.transform='translateY('+dy+'px)'};
  h.ontouchend=function(e){if(y0===null)return;var dy=e.changedTouches[0].clientY-y0;y0=null;if(dy>110){closeSheet()}else{sh.style.transition='transform .25s';sh.style.transform=''}};
 });
 ps.classList.add('on');document.body.style.overflow='hidden';closeNav(1);sheetOpen=true;stop()}
function closeSheet(){if(!ps.classList.contains('on'))return;ps.classList.remove('on');document.body.style.overflow='';closeNav(0);sheetOpen=false;render(0)}
ps.onclick=function(e){if(e.target===ps)closeSheet()};
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeSheet()});
window.closePrio=closeSheet;
render(0);
})();
