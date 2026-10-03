
(function(){
 var KEY='camp_notifs_2026',LS=function(k){try{return localStorage.getItem(k)}catch(e){return null}},SS=function(k,v){try{localStorage.setItem(k,v)}catch(e){}};
 var P={bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 21h4"/>',clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',user:'<circle cx="12" cy="8.5" r="3.6"/><path d="M5 20c1-4 4-5.5 7-5.5s6 1.5 7 5.5"/>',bag:'<path d="M6 8h12l1 12H5zM9 8a3 3 0 0 1 6 0"/>',img:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',back:'<path d="m15 5-7 7 7 7"/>'};
 var COL={bell:'#1a56db',clock:'#e8650a',user:'#2b8cf0',bag:'#34a853',img:'#a259e6',flag:'#0ea5a4'};
 var sv=function(n){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+P[n]+'</svg>'};
 var esc=function(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
 function load(){try{return JSON.parse(LS(KEY)||'[]')}catch(e){return[]}}function save(a){SS(KEY,JSON.stringify(a.slice(0,60)))}
 function reg(){try{var h=window.__v188,r=h&&h.reg?h.reg():null;return r&&r.Pass?r:null}catch(e){return null}}
 function nChk(){try{return JSON.parse(LS('camp_checklist_2026')||'[]').length}catch(e){return 0}}
 var fresh=[],panel=null;
 function add(id,i,t,b,g){var a=load();if(a.some(function(x){return x.id===id}))return;var n={id:id,i:i,t:t,b:b,ts:Date.now(),r:0,g:g||''};a.unshift(n);save(a);fresh.push(n)}
 function gen(){
  var now=new Date(),dl=Math.ceil((new Date(2026,9,28)-now)/864e5),end=new Date(2026,10,2);
  add('welcome','bell','Bienvenue au Camp','Active les alertes pour ne rien rater avant le départ pour Garango.','plus');
  if(!reg())add('reg','user','Termine ta pré-inscription','Pré-inscris-toi pour recevoir ton ticket et ton QR code.','reg');
  if(dl>0){var m=null;[30,21,14,7,3,2,1].forEach(function(x){if(x>=dl&&(m===null||x<m))m=x});
   if(m!==null)add('cd-'+m,'clock',dl===1?'Le Camp commence demain !':'J-'+dl+' avant le Camp','Garango · 28 oct. → 1er nov. '+(nChk()<8?'Pense à préparer ton sac.':'Ton sac est prêt, bravo !'),'chk');
   if(dl<=7&&nChk()<8)add('bag-'+dl,'bag','Ton sac n’est pas prêt','Il te reste '+(8-nChk())+' élément(s) à cocher dans « À emporter ».','chk')}
  else if(now<end){var d=Math.floor((now-new Date(2026,9,28))/864e5)+1;add('gal','img','Galerie ouverte','Les photos du Camp sont disponibles.','gal');add('day-'+d,'flag','Jour '+d+' du Camp','Consulte le programme du jour.','prog')}
  else add('end','flag','Merci d’avoir vécu le Camp','À bientôt pour la prochaine aventure !','')}
 function ago(ts){var s=(Date.now()-ts)/1000;if(s<60)return 'À l’instant';if(s<3600)return 'Il y a '+Math.floor(s/60)+' min';if(s<86400)return 'Il y a '+Math.floor(s/3600)+' h';if(s<172800)return 'Hier';return new Date(ts).toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}
 function sys(n){try{if(!('Notification' in window)||Notification.permission!=='granted')return;var o={body:n.b,tag:n.id};try{new Notification(n.t,o)}catch(e){navigator.serviceWorker.getRegistration().then(function(r){r&&r.showNotification(n.t,o)})}}catch(e){}}
 function bell(){return document.querySelector('.ref-header .ref-circle[aria-label="Notifications"]')}
 function badge(){var b=bell();if(!b)return;var n=load().filter(function(x){return !x.r}).length,e=b.querySelector('.nf-n');
  if(n){if(!e){e=document.createElement('i');e.className='nf-n';b.appendChild(e)}e.textContent=n>9?'9+':n}else if(e)e.remove();b.classList.toggle('nf-ring',n>0)}
 function banner(a){if(!a.length)return;var n=a[0],e=document.createElement('button');e.type='button';e.className='nf-bn';
  e.innerHTML='<i class="nf-ic" style="background:'+(COL[n.i]||'#1a56db')+'">'+sv(n.i)+'</i><div><b>'+esc(a.length>1?a.length+' nouvelles notifications':n.t)+'</b><span>'+esc(a.length>1?n.t:n.b)+'</span></div>';
  document.body.appendChild(e);if(navigator.vibrate)try{navigator.vibrate(30)}catch(x){}
  function shut(){e.classList.remove('on');setTimeout(function(){e.remove()},450)}e.onclick=function(){shut();open()};
  requestAnimationFrame(function(){requestAnimationFrame(function(){e.classList.add('on')})});setTimeout(shut,5000)}
 function act(g){if(!g)return;if(g==='reg'){window.openRegistration&&openRegistration();return}if(g==='prog'){window.openPresenter&&openPresenter('programme');return}
  window.showAppTab&&showAppTab('plus');if(g==='plus')return;setTimeout(function(){var r=document.querySelector('.p-row[data-a="'+g+'"]');r&&r.click()},380)}
 function perm(){var s='Notification' in window?Notification.permission:'na';
  if(s==='granted')return '<div class="nf-pm"><span><b>Alertes activées</b>Tu reçois aussi les rappels sur ton appareil.</span><button type="button" class="gh" data-t="test">Tester</button></div>';
  if(s==='default')return '<div class="nf-pm"><span><b>Alertes sur l’appareil</b>Reçois les rappels même hors de l’application.</span><button type="button" data-t="ask">Activer</button></div>';
  return '<div class="nf-pm"><span><b>Rappels dans l’application</b>'+(s==='denied'?'Les alertes système sont bloquées dans les réglages du navigateur.':'Les alertes système ne sont pas disponibles ici.')+'</span><button type="button" class="gh" data-t="test">Tester</button></div>'}
 function paint(){if(!panel)return;var a=load(),y=panel.scrollTop;
  panel.querySelector('.nf-bd').innerHTML=perm()+(a.length?a.map(function(n,i){return '<button type="button" class="nf-it'+(n.r?'':' u')+'" data-id="'+esc(n.id)+'" style="animation-delay:'+Math.min(i,8)*.04+'s"><i class="nf-ic" style="background:'+(COL[n.i]||'#1a56db')+'">'+sv(n.i)+'</i><span class="nf-tx"><b>'+esc(n.t)+'</b><p>'+esc(n.b)+'</p><small>'+ago(n.ts)+'</small></span></button>'}).join('')+'<button type="button" class="nf-clr" data-t="clr">Effacer tout</button>':'<div class="nf-em">'+sv('bell')+'<b>Rien pour le moment</b>Tes rappels du Camp apparaîtront ici.</div>');
  panel.scrollTop=y;badge()}
 function close(){if(!panel)return;var e=panel;panel=null;e.classList.remove('on');setTimeout(function(){e.remove()},330)}
 function open(){if(panel)return;var e=document.createElement('div');e.className='nf';
  e.innerHTML='<div class="nf-h"><button type="button" class="nf-bk" aria-label="Retour">'+sv('back')+'</button><h3>Notifications</h3><button type="button" data-t="all">Tout lire</button></div><div class="nf-bd"></div>';
  document.body.appendChild(e);panel=e;paint();e.querySelector('.nf-bk').onclick=close;
  e.addEventListener('click',function(ev){var t=ev.target.closest('[data-t]'),it=ev.target.closest('.nf-it');
   if(t){var k=t.dataset.t,a=load();
    if(k==='all'){a.forEach(function(x){x.r=1});save(a);paint()}
    else if(k==='clr'){if(confirm('Effacer toutes les notifications ?')){save([]);paint()}}
    else if(k==='ask'){try{var r=Notification.requestPermission(function(){paint()});r&&r.then&&r.then(paint)}catch(x){paint()}}
    else if(k==='test'){fresh=[];add('test-'+Date.now(),'bell','Notification de test','Les alertes fonctionnent sur cet appareil.','');sys(fresh[0]);paint()}return}
   if(it){var a2=load(),n=a2.filter(function(x){return x.id===it.dataset.id})[0];if(n){n.r=1;save(a2)}badge();var g=n&&n.g;close();setTimeout(function(){act(g)},g?200:0)}});
  requestAnimationFrame(function(){requestAnimationFrame(function(){e.classList.add('on')})})}
 document.addEventListener('click',function(ev){var t=ev.target;if(!t.closest)return;
  if(t.closest('.ref-header .ref-profile')){ev.stopImmediatePropagation();ev.preventDefault();window.showAppTab&&showAppTab('plus');return}
  if(t.closest('.ref-header .ref-circle[aria-label="Notifications"]')){ev.stopImmediatePropagation();ev.preventDefault();open()}},true);
 function run(){fresh=[];gen();var f=fresh.slice();f.slice().reverse().forEach(sys);badge();if(panel)paint();return f}
 function start(){var f=run();if(f.length)setTimeout(function(){banner(f)},2600)}
 if(document.readyState==='complete')start();else window.addEventListener('load',start);
 setInterval(function(){var f=run();if(f.length)banner(f)},1800000);
 document.addEventListener('visibilitychange',function(){if(!document.hidden){var f=run();if(f.length)banner(f)}});
})();
