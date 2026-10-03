
(function(){
 var root=document.getElementById('v193Plus');if(!root)return;
 var LS=function(k){try{return localStorage.getItem(k)}catch(e){return null}},SS=function(k,v){try{localStorage.setItem(k,v)}catch(e){}};
 var H=function(){return window.__v188||{}};
 var CK=['Tenue de troupe','Tee-shirt du Camp','Bible et cahier','Gourde et couverts','Lampe torche','Drap et matelas','Produits de toilette','Médicaments personnels'];
 var P={lock:'<rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',bag:'<path d="M6 8h12l1 12H5zM9 8a3 3 0 0 1 6 0"/><path d="m9.5 14 2 2 3-3.5"/>',share:'<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1"/>',set:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',back:'<path d="m15 5-7 7 7 7"/>'};
 var sv=function(n){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+P[n]+'</svg>'};
 var esc=function(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
 function ck(){try{return JSON.parse(LS('camp_checklist_2026')||'[]')}catch(e){return[]}}
 function code(d){var t=String(d.Name||'')+String(d.Phone||''),h=0;for(var i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))>>>0;return (String(d.Name||'').normalize('NFD').replace(/[^A-Za-z]/g,'').slice(0,3).toUpperCase()||'CMP')+'-'+(h%9000+1000)}
 function shell(c1,c2,hero,title,sub){var e=document.createElement('div');e.className='d8';
  e.innerHTML='<div class="d8-h" style="background:linear-gradient(150deg,'+c1+','+c2+')"><i class="d8-orb" style="width:120px;height:120px;right:-30px;top:30px"></i><i class="d8-orb" style="width:70px;height:70px;left:-16px;top:150px;animation-delay:2s"></i><button type="button" class="d8-b" aria-label="Retour">'+sv('back')+'</button><div class="d8-hero">'+hero+'</div><h3>'+title+'</h3><p>'+sub+'</p></div><div class="d8-bd"></div>';
  document.body.appendChild(e);var t=0;
  e.close=function(){clearInterval(t);e.classList.remove('on');setTimeout(function(){e.remove()},350)};
  e.setT=function(f,ms){t=setInterval(function(){e.isConnected?f():clearInterval(t)},ms)};
  e.querySelector('.d8-b').onclick=e.close;
  requestAnimationFrame(function(){requestAnimationFrame(function(){e.classList.add('on')})});return e}
 function gal(){
  var e=shell('#5b2bbf','#a259e6','<i class="d8-fr" style="left:14%;top:6px;transform:rotate(-12deg)"></i><i class="d8-fr" style="right:14%;top:14px;transform:rotate(10deg);animation-delay:1.4s"></i><div class="d8-ic d8-lk">'+sv('lock')+'</div>','Galerie bientôt ouverte','Les photos du Camp seront visibles dès le premier jour.'),bd=e.querySelector('.d8-bd');
  var on=LS('camp_gal_notify')==='1';
  bd.innerHTML='<div class="d8-c"><h4>Ouverture dans</h4><div class="d8-cd"><div><b id="d8d">0</b><small>jours</small></div><div><b id="d8h">0</b><small>heures</small></div><div><b id="d8m">0</b><small>min</small></div><div><b id="d8s">0</b><small>sec</small></div></div></div><div class="d8-c"><h4>Aperçu</h4><div class="d8-gr">'+[0,1,2,3,4,5].map(function(i){return '<div class="d8-t" style="animation-delay:'+i*.2+'s">'+sv('lock')+'</div>'}).join('')+'</div></div><button type="button" class="d8-btn" id="d8n"></button>';
  var nb=bd.querySelector('#d8n');function lab(){nb.className='d8-btn'+(on?' on':'');nb.textContent=on?'Je serai prévenu(e) ✓':'Me prévenir à l’ouverture'}lab();
  nb.onclick=function(){on=!on;SS('camp_gal_notify',on?'1':'0');lab();if(on&&navigator.vibrate)navigator.vibrate(25)};
  function tick(){var ms=Math.max(0,new Date(2026,9,28)-new Date()),s=Math.floor(ms/1000);bd.querySelector('#d8d').textContent=Math.floor(s/86400);bd.querySelector('#d8h').textContent=Math.floor(s%86400/3600);bd.querySelector('#d8m').textContent=Math.floor(s%3600/60);bd.querySelector('#d8s').textContent=s%60}
  tick();e.setT(tick,1000)}
 function chk(){
  var e=shell('#2e9e4f','#1b7a8a','<svg class="d8-rg" viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="42"/><circle class="fg" cx="50" cy="50" r="42" style="stroke-dashoffset:264"/></svg><div class="d8-rn"><span id="d8n">0</span><small>/'+CK.length+'</small></div>','À emporter','Coche chaque élément quand il est dans ton sac.'),bd=e.querySelector('.d8-bd'),hero=e.querySelector('.d8-hero');
  function paint(first){var a=ck(),n=a.length;
   bd.innerHTML='<div class="d8-c">'+CK.map(function(x,i){return '<button type="button" class="d8-ck'+(a.indexOf(i)>-1?' on':'')+'" data-i="'+i+'"><s></s><span>'+x+'</span></button>'}).join('')+'</div>';
   e.querySelector('#d8n').textContent=n;e.querySelector('.fg').style.strokeDashoffset=264*(1-n/CK.length);
   hero.classList.toggle('full',n===CK.length);e.querySelector('h3').textContent=n===CK.length?'Sac prêt !':'À emporter';
   var r=document.querySelector('.p-row[data-a="chk"] small');if(r)r.textContent=n+' / '+CK.length+' prêts';
   var q=document.querySelector('#q8 [data-g="chk"] b');if(q)q.textContent=n+'/'+CK.length}
  bd.addEventListener('click',function(ev){var b=ev.target.closest('.d8-ck');if(!b)return;var a=ck(),i=+b.dataset.i,p=a.indexOf(i);if(p>-1)a.splice(p,1);else a.push(i);SS('camp_checklist_2026',JSON.stringify(a));if(navigator.vibrate&&LS('camp_set_vibr')!=='0')navigator.vibrate(15);paint()});
  paint();setTimeout(function(){paint()},350)}
 function share(){
  var d=H().reg?H().reg():null;
  var e=shell('#0ea5a4','#0a6f9c','<i class="d8-rp"></i><i class="d8-rp b"></i><div class="d8-ic">'+sv('share')+'</div>','Inviter un ami','Chaque ami inscrit avec ton code te rapproche des avantages.'),bd=e.querySelector('.d8-bd');
  if(!d){bd.innerHTML='<div class="d8-c"><div class="d8-em">Pré-inscris-toi d’abord pour obtenir ton code personnel.</div><button type="button" class="d8-btn" id="d8r">Me pré-inscrire</button></div>';bd.querySelector('#d8r').onclick=function(){e.close();window.openRegistration&&openRegistration()};return}
  var c=code(d),n=Math.min(10,+LS('camp_ref_count_2026')||0);
  bd.innerHTML='<div class="d8-tk"><small>Ton code promo</small><b>'+esc(c)+'</b><small>à donner à tes amis</small></div><div class="d8-c" style="margin-top:12px"><h4>'+n+' / 10 amis inscrits</h4><div class="d8-dt">'+[0,1,2,3,4,5,6,7,8,9].map(function(i){return '<i style="animation-delay:'+i*.07+'s" class="'+(i<n?'on':'')+'"></i>'}).join('')+'</div><div class="d8-em" style="padding:0">'+(n>=10?'Avantages débloqués !':'Les avantages se débloquent à 10 inscrits.')+'</div></div><button type="button" class="d8-btn" id="d8sh">Partager mon code</button><button type="button" class="d8-btn gh" id="d8cp">Copier le code</button>';
  var txt='Rejoins-moi au Camp de District 3 en 1 à Garango (28 oct. → 1er nov.) ! Utilise mon code promo '+c+' à ton inscription.';
  bd.querySelector('#d8sh').onclick=function(){if(navigator.share)navigator.share({text:txt}).catch(function(){});else window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank')};
  bd.querySelector('#d8cp').onclick=function(){var b=this;try{navigator.clipboard.writeText(c)}catch(x){}b.textContent='Code copié ✓';setTimeout(function(){b.textContent='Copier le code'},1600)}}
 function set(){
  var e=shell('#8e5be8','#5b3bd0','<div class="d8-ic d8-gear">'+sv('set')+'</div>','Paramètres','Règle l’application à ta façon.'),bd=e.querySelector('.d8-bd');
  function tg(k,t,s,on){return '<button type="button" class="d8-tg" data-k="'+k+'" aria-pressed="'+on+'"><span>'+t+'<small>'+s+'</small></span><i></i></button>'}
  function paint(){bd.innerHTML='<div class="d8-c">'+tg('vib','Vibrations','Petit retour au toucher',(LS('camp_set_vibr')||'1')==='1')+tg('calm','Économie d’énergie','Moins d’animations',LS('camp_set_calm')==='1')+'</div><div class="d8-c"><h4>Mon profil</h4><button type="button" class="d8-btn gh" data-p="avatar" style="margin-top:0">Changer ma photo de profil</button><button type="button" class="d8-btn gh" data-p="cover">Changer ma couverture</button></div>'}
  paint();
  bd.addEventListener('click',function(ev){var b=ev.target.closest('[data-k]'),p=ev.target.closest('[data-p]');
   if(b){var on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);if(b.dataset.k==='vib'){SS('camp_set_vibr',on?'1':'0');if(on&&navigator.vibrate)navigator.vibrate(30)}else{SS('camp_set_calm',on?'1':'0');document.documentElement.classList.toggle('v187-calm',on)}}
   else if(p){var h=H();(p.dataset.p==='cover'?h.pickCover:h.pickAvatar)&&(p.dataset.p==='cover'?h.pickCover():h.pickAvatar())}})}
 var U={gal:gal,chk:chk,share:share,set:set};
 root.addEventListener('click',function(ev){var r=ev.target.closest('.p-row[data-a]');if(!r)return;var k=r.dataset.a;
  if(!U[k]||(k==='gal'&&new Date()>=new Date(2026,9,28)))return;
  ev.stopImmediatePropagation();ev.preventDefault();U[k]()},true);
})();
