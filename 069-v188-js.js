
(function(){
 var KEY='camp_registration_2026',KC='camp_cover',KA='camp_avatar';
 var g=function(k){try{return localStorage.getItem(k)}catch(e){return null}};
 var st=function(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}};
 var rm=function(k){try{localStorage.removeItem(k)}catch(e){}};
 var P={user:'<circle cx="12" cy="8.5" r="3.6"/><path d="M5 20c1-4 4-5.5 7-5.5s6 1.5 7 5.5"/>',
  vib:'<rect x="8" y="3" width="8" height="18" rx="2"/><path d="M4 8v8M20 8v8"/>',
  db:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
  bolt:'<path d="M13 2 5 14h6l-1 8 8-12h-6z"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  head:'<path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1z"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.6v.4"/>',
  tk:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 6v12"/>',
  img:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',
  cam:'<path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',chev:'<path d="M9 5l7 7-7 7"/>',trash:'<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>'};
 var sv=function(n,c){return '<svg viewBox="0 0 24 24" class="'+(c||'')+'" aria-hidden="true">'+P[n]+'</svg>'};
 var esc=function(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
 var pg=document.createElement('div');pg.className='v188-pg';pg.id='v188Pg';pg.setAttribute('role','dialog');pg.setAttribute('aria-modal','true');pg.setAttribute('aria-label','Paramètres');document.body.appendChild(pg);
 var fc=document.createElement('input');fc.type='file';fc.accept='image/*';fc.hidden=true;document.body.appendChild(fc);
 var fa=document.createElement('input');fa.type='file';fa.accept='image/*';fa.hidden=true;document.body.appendChild(fa);
 function toast(m){var t=document.createElement('div');t.className='v188-toast';t.textContent=m;document.body.appendChild(t);setTimeout(function(){t.remove()},2800)}
 function reg(){try{var d=JSON.parse(g(KEY)||'null');return d&&d.Name?d:null}catch(e){return null}}
 function cover(){return g(KC)||''}
 function avatar(){var a=g(KA);if(a)return a;var d=reg();return d&&d.Photo&&String(d.Photo).indexOf('data:')===0?d.Photo:''}
 function prep(file,w,h,cb){
  if(!file||!/^image\//.test(file.type)){toast('Choisis une image.');return}
  var u=URL.createObjectURL(file),im=new Image();
  im.onerror=function(){URL.revokeObjectURL(u);toast('Image illisible.')};
  im.onload=function(){
   var c=document.createElement('canvas');c.width=w;c.height=h;var x=c.getContext('2d'),r=Math.max(w/im.width,h/im.height),dw=im.width*r,dh=im.height*r;
   x.fillStyle='#fff';x.fillRect(0,0,w,h);x.drawImage(im,(w-dw)/2,(h-dh)/2,dw,dh);URL.revokeObjectURL(u);
   var q=[.82,.65,.5];for(var i=0;i<q.length;i++){var d=c.toDataURL('image/jpeg',q[i]);if(cb(d))return}
   toast('Mémoire de l’appareil pleine : image non enregistrée.')}
  im.src=u}
 fc.onchange=function(){var f=fc.files&&fc.files[0];fc.value='';prep(f,1200,480,function(d){return st(KC,d)&&(refresh(),true)})};
 fa.onchange=function(){var f=fa.files&&fa.files[0];fa.value='';prep(f,400,400,function(d){return st(KA,d)&&(refresh(),true)})};
 function row(a,ic,col,t,sub,right){return '<button type="button" class="v188-row" data-v8="'+a+'"'+(right==='sw'?' aria-pressed="'+(sub.on?'true':'false')+'"':'')+'><i style="background:'+col+'">'+sv(ic)+'</i><span class="t"><b>'+t+'</b><small>'+(sub.t||sub)+'</small></span>'+(right==='sw'?'<span class="v188-sw"></span>':right?'<em>'+right+'</em>':'')+'</button>'}
 function usage(){var n=0;try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);n+=k.length+(localStorage.getItem(k)||'').length}}catch(e){}return n*2}
 function fmt(b){return b>1048576?(b/1048576).toFixed(1)+' Mo':Math.max(1,Math.round(b/1024))+' Ko'}
 var view='main';
 function render(){
  var d=reg(),cv=cover(),av=avatar(),nm=d?d.Name:'Mon profil',ini=(nm.trim().charAt(0)||'S').toUpperCase();
  var sub=[d&&d.Phone?'+225 '+d.Phone.replace(/^\+?225/,'').trim():'',d&&d.Group?d.Group:''].filter(Boolean).join(' • ')||'Camp de District 3 en 1';
  var vib=(g('camp_set_vibr')||'1')==='1',calm=g('camp_set_calm')==='1';
  var main='<div class="v188-top"><button type="button" class="v188-rb" data-v8="close" aria-label="Retour">'+sv('back')+'</button></div>'
  +'<div class="v188-cv" style="'+(cv?'background-image:url('+cv+')':'')+'"><div class="v188-cvb">'
  +(cv?'<button type="button" class="v188-pill" data-v8="cvdel">'+sv('trash')+'Retirer</button>':'')
  +'<button type="button" class="v188-pill" data-v8="cvadd">'+sv('img')+(cv?'Changer':'Ajouter une couverture')+'</button></div></div>'
  +'<div class="v188-id"><div class="v188-av" style="'+(av?'background-image:url('+av+');font-size:0':'')+'">'+esc(ini)+'<button type="button" class="v188-cam" data-v8="avadd" aria-label="Changer ma photo de profil">'+sv('cam')+'</button></div><h2>'+esc(nm)+'</h2><p>'+esc(sub)+'</p></div>'
  +'<div class="v188-card">'
  +row('acc','user','#2b8cf0','Compte','Nom, numéro, troupe, formule','')
  +(d?row('tk','tk','#7c4dff','Mon ticket','N° d’inscription et QR code',''):'')
  +row('vib','vib','#e5484d',"Vibrations",{t:'Compte à rebours, j’aime',on:vib},'sw')
  +row('calm','bolt','#f08a1c','Économie d’énergie',{t:'Réduire les animations',on:calm},'sw')
  +row('data','db','#2f6bff','Données et stockage','Photos, pré-inscription, espace utilisé','')
  +row('lang','globe','#a259e6','Langue','Français','')
  +'</div><div class="v188-card">'
  +row('help','head','#1fb5a8','Contact & Assistance','Nous appeler ou nous écrire','')
  +row('about','info','#ff7a0a','À propos du Camp','Camp de District 3 en 1 · Garango 2026','')
  +'</div><div style="height:calc(env(safe-area-inset-bottom,0px) + 24px)"></div>';
  var sub2='<div class="v188-sub'+(view==='data'?' open':'')+'"><div class="v188-sh"><button type="button" class="v188-rb" data-v8="back" aria-label="Retour">'+sv('back')+'</button><h3>Données et stockage</h3></div>'
  +'<div class="v188-card">'+row('cvdel','img','#2f6bff','Retirer ma couverture',cv?'Image enregistrée sur cet appareil':'Aucune couverture','')
  +row('avdel','user','#2b8cf0','Retirer ma photo de profil',g(KA)?'Photo enregistrée sur cet appareil':'Aucune photo ajoutée ici','')
  +row('wipe','trash','#e5484d','Effacer ma pré-inscription','Supprime le ticket de cet appareil','')+'</div>'
  +'<p class="v188-note">Espace utilisé par l’application : '+fmt(usage())+'. Tes données restent uniquement sur cet appareil.</p></div>';
  pg.innerHTML='<div class="v188-main'+(view==='data'?' v188-sub-hide':'')+'">'+main+'</div>'+sub2;
 }
 function refresh(){var sc=pg.scrollTop;render();pg.scrollTop=sc;applyPlus();document.dispatchEvent(new Event('campprofile'))}
 function applyPlus(){
  var pc=document.querySelector('#screenPlus .profile-card'),av=document.querySelector('#screenPlus .profile-avatar'),cv=cover(),a=avatar();
  if(pc){if(cv){pc.style.background='linear-gradient(rgba(40,12,110,.45),rgba(30,8,90,.78)),url('+cv+') center/cover'}else pc.style.background=''}
  if(av){if(a){av.style.backgroundImage='url('+a+')';av.style.backgroundSize='cover';av.style.backgroundPosition='center';av.style.color='transparent'}else{av.style.backgroundImage='';av.style.color=''}}
 }
 var acts={
  close:function(){close()},
  back:function(){view='main';render();pg.scrollTop=0},
  cvadd:function(){fc.click()},avadd:function(){fa.click()},
  cvdel:function(){if(!cover())return toast('Aucune couverture à retirer.');rm(KC);refresh();toast('Couverture retirée.')},
  avdel:function(){if(!g(KA))return toast('Aucune photo ajoutée ici.');rm(KA);refresh();toast('Photo retirée.')},
  acc:function(){close();if(window.openRegistration)openRegistration()},
  tk:function(){close();if(window.openTicket)openTicket()},
  vib:function(){var on=(g('camp_set_vibr')||'1')!=='1';st('camp_set_vibr',on?'1':'0');if(on&&navigator.vibrate)navigator.vibrate(30);refresh()},
  calm:function(){var on=g('camp_set_calm')!=='1';st('camp_set_calm',on?'1':'0');document.documentElement.classList.toggle('v187-calm',on);refresh()},
  data:function(){view='data';render();pg.scrollTop=0},
  lang:function(){toast('Le Camp est disponible en français uniquement.')},
  help:function(){if(window.openContactSheet)openContactSheet()},
  about:function(){if(window.openPresenter)openPresenter('presentation')},
  wipe:function(){if(confirm('Effacer ta pré-inscription et ton ticket de cet appareil ?')){rm(KEY);rm('camp_registration_draft');location.reload()}}
 };
 pg.addEventListener('click',function(e){var b=e.target.closest('[data-v8]');if(!b||!pg.contains(b))return;var f=acts[b.dataset.v8];if(f)f()});
 function open(){view='main';render();pg.classList.add('open');pg.scrollTop=0;document.body.style.overflow='hidden'}
 function close(){pg.classList.remove('open');document.body.style.overflow=''}
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&pg.classList.contains('open'))close()});
 window.openSettingsSheet=open;
 window.__v188={cover:cover,avatar:avatar,reg:reg,pickCover:function(){fc.click()},pickAvatar:function(){fa.click()}};
 function wire(){
  document.querySelectorAll('#screenPlus .plus-menu button').forEach(function(b){var t=(b.querySelector('b')||{}).textContent||'';if(/^Paramètres/.test(t)){b.setAttribute('onclick','openSettingsSheet()');var sm=b.querySelector('small');if(sm)sm.textContent='Profil, couverture, réglages'}});
  var gear=document.querySelector('#screenPlus .settings-gear');if(gear&&!gear.dataset.v188){gear.dataset.v188='1';gear.classList.add('v188-gear');gear.setAttribute('role','button');gear.setAttribute('aria-label','Paramètres');gear.addEventListener('click',open)}
  applyPlus()}
 wire();document.addEventListener('visibilitychange',applyPlus);
 var os=window.showAppTab;if(typeof os==='function')window.showAppTab=function(t){var r=os.apply(this,arguments);if(t==='plus')setTimeout(applyPlus,50);return r};
})();
