
(function(){
 var ACC='camp_accounts_2026',SES='camp_session_2026',REG='camp_registration_2026';
 var rd=function(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},wr=function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
 var dg=function(s){return String(s||'').replace(/\D+/g,'')};
 var esc=function(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
 function rnd(){var a=new Uint8Array(8);(window.crypto||{}).getRandomValues?crypto.getRandomValues(a):a.forEach(function(_,i){a[i]=Math.floor(Math.random()*256)});return Array.prototype.map.call(a,function(x){return x.toString(16).padStart(2,'0')}).join('')}
 function hash(pw,salt){var s=salt+'|'+pw;if(window.crypto&&crypto.subtle&&window.TextEncoder)return crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)).then(function(b){return Array.prototype.map.call(new Uint8Array(b),function(x){return x.toString(16).padStart(2,'0')}).join('')});var h=5381;for(var i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return Promise.resolve('f'+(h>>>0).toString(16))}
 var accounts=function(){return rd(ACC,[])},session=function(){return rd(SES,null)};
 var EYE='<svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',EYEO='<svg viewBox="0 0 24 24"><path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 4.1-.9M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
 var ov=null,mode='login',busy=false;
 var IC={
  user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.6-3.6 3.7-5.6 7.5-5.6s6.9 2 7.5 5.6"/></svg>',
  mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.5 7.5 12 13l8.5-5.5"/></svg>',
  ph:'<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
  pin:'<svg viewBox="0 0 24 24"><path d="M12 21s7-5.7 7-11a7 7 0 0 0-14 0c0 5.3 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  lock:'<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="3"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>',
  bolt:'<svg viewBox="0 0 24 24"><path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z"/></svg>',
  shield:'<svg viewBox="0 0 24 24"><path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z"/><path d="m9 12 2.2 2.2L15.2 10"/></svg>'};
 function fld(id,label,attrs,pre,ico){return '<div class="ac-f" data-f="'+id+'"><label for="ac-'+id+'">'+label+'</label><div class="ac-i'+(ico?' has-ic':'')+'">'+(ico?'<span class="ac-ic" aria-hidden="true">'+IC[ico]+'</span>':'')+(pre?'<span class="pf">'+pre+'</span>':'')+'<input id="ac-'+id+'" '+attrs+'></div><span class="ac-e"></span></div>'}
 function pwOk(p){return p.length>=8&&/[a-z]/.test(p)&&/[A-Z]/.test(p)&&/\d/.test(p)}
 function pwui(p){var m=ov&&ov.querySelector('.ac-mt');if(!m)return;
  var c={len:p.length>=8,low:/[a-z]/.test(p),up:/[A-Z]/.test(p),dig:/\d/.test(p),sym:/[^A-Za-z0-9]/.test(p)};
  ov.querySelectorAll('.ac-ru li').forEach(function(li){li.classList.toggle('ok',!!c[li.getAttribute('data-r')])});
  var ok=c.len&&c.low&&c.up&&c.dig,sc=!p?0:!ok?1:((c.sym&&p.length>=10)?4:(c.sym||p.length>=10)?3:2);
  m.setAttribute('data-s',sc);m.querySelector('.ac-ml').textContent=['','Trop faible','Correct','Bon','Excellent'][sc]}
 function pin(id,label,ac,ph,meter){return '<div class="ac-f" data-f="'+id+'"><label for="ac-'+id+'">'+label+'</label><div class="ac-i ac-pw has-ic"><span class="ac-ic" aria-hidden="true">'+IC.lock+'</span><input id="ac-'+id+'" type="password" maxlength="64" autocomplete="'+ac+'" autocapitalize="none" spellcheck="false" placeholder="'+ph+'"><button type="button" class="ac-eye" data-eye="ac-'+id+'" aria-label="Afficher le mot de passe">'+EYE+'</button></div>'+(meter?'<div class="ac-mt" data-s="0"><div class="ac-ms"><i></i><i></i><i></i><i></i></div><span class="ac-ml"></span></div><ul class="ac-ru"><li data-r="len">8 caractères minimum</li><li data-r="up">Une majuscule</li><li data-r="low">Une minuscule</li><li data-r="dig">Un chiffre</li><li data-r="sym" class="opt">Un symbole (conseillé)</li></ul>':'')+'<span class="ac-e"></span></div>'}
 function form(){
  var fe='<div class="ac-fe" id="acFe" role="alert"></div>';
  if(mode==='login')return fe+'<form id="acF" novalidate>'+fld('email','Adresse e-mail','type="email" inputmode="email" autocomplete="email" autocapitalize="none" placeholder="exemple@mail.com"','','mail')+pin('pw','Mot de passe','current-password','Ton mot de passe',0)+'<button type="button" class="ac-lk" id="acForgot">Mot de passe oublié ?</button><button type="submit" class="ac-sub">Se connecter</button></form>';
  return fe+'<form id="acF" novalidate><div class="ac-r">'+fld('first','Prénom','autocomplete="given-name" placeholder="Jean"')+fld('last','Nom','autocomplete="family-name" placeholder="Kouassi"')+'</div>'+fld('phone','Numéro de téléphone','type="tel" inputmode="tel" autocomplete="tel" placeholder="07 00 00 00 00"','+225','ph')+fld('email','Adresse e-mail','type="email" inputmode="email" autocomplete="email" autocapitalize="none" placeholder="exemple@mail.com"','','mail')+fld('dist','District','autocomplete="off" placeholder="Ex. District de Port-Bouët"','','pin')+pin('pw','Mot de passe','new-password','Crée ton mot de passe',1)+pin('pw2','Confirmer le mot de passe','new-password','Répète ton mot de passe',0)+'<button type="submit" class="ac-sub">Créer mon compte</button></form>'}
 function paint(){var l=mode==='login';
  ov.querySelector('h2').textContent=l?'Content de te revoir':'Rejoins le Camp';
  ov.querySelector('.ac-sb').textContent=l?'Saisis ton e-mail et ton mot de passe pour retrouver ton espace.':'Renseigne tes informations. Un code de confirmation sera envoyé à ton e-mail.';
  ov.querySelectorAll('.ac-tb button').forEach(function(t){var on=t.dataset.m===mode;t.classList.toggle('on',on);t.setAttribute('aria-selected',on?'true':'false')});
  ov.querySelector('.ac-fm').innerHTML=form();ov.scrollTop=0}
 function toast(t){var e=document.createElement('div');e.className='ac-t';e.textContent=t;document.body.appendChild(e);requestAnimationFrame(function(){e.classList.add('on')});setTimeout(function(){e.classList.remove('on');setTimeout(function(){e.remove()},300)},3200)}
 function open(m){mode=m==='signup'?'signup':'login';if(ov){paint();return}
  ov=document.createElement('div');ov.className='ac';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-labelledby','acTitle');
  ov.innerHTML='<div class="ac-w"><div class="ac-br"><div class="ac-mk"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20 12 4l9 16"/><path d="M9.5 20 12 15.2l2.5 4.8"/><path d="M2 20h20"/></svg></div><div class="ac-bn"><b>Camp de District 3 en 1</b><span>Garango 2026</span></div></div><div class="ac-tb" role="tablist"><button type="button" role="tab" data-m="signup">Créer un compte</button><button type="button" role="tab" data-m="login">Se connecter</button></div><h2 id="acTitle"></h2><p class="ac-sb"></p><div class="ac-fm"></div><div class="ac-lg">Ton compte est enregistré en ligne et sur cet appareil.</div></div>';
  document.body.appendChild(ov);paint();(function(){var g=document.querySelector('.ref-header .ref-logo img'),m=ov.querySelector('.ac-mk');if(g&&g.src&&m){var im=document.createElement('img');im.alt='Dynamique District de Bouaflé';im.src=g.src;m.innerHTML='';m.appendChild(im)}})();
  ov.addEventListener('click',function(e){var s=e.target.closest('[data-m]'),y=e.target.closest('.ac-eye');
   if(s&&s.dataset.m!==mode){mode=s.dataset.m;paint();return}
   if(y){var i=document.getElementById(y.dataset.eye),sh=i.type==='password';i.type=sh?'text':'password';y.innerHTML=sh?EYEO:EYE;return}
   if(e.target.id==='acForgot'){if(window.campResetPassword)campResetPassword(((ov.querySelector('#ac-email')||{}).value||'').trim());else ferr('Pour réinitialiser ton mot de passe, contacte l’organisation du Camp.')}});
  ov.addEventListener('input',function(e){var t=e.target,f=t.closest('.ac-f');if(!f)return;
   if(t.id==='ac-pw'&&mode==='signup')pwui(t.value);
   f.classList.remove('err');var fe=ov.querySelector('#acFe');if(fe)fe.classList.remove('show')});
  ov.addEventListener('submit',function(e){e.preventDefault();mode==='login'?login():signup()});
  requestAnimationFrame(function(){requestAnimationFrame(function(){ov.classList.add('on')})})}
 function close(){if(!ov)return;var e=ov;ov=null;e.classList.remove('on');setTimeout(function(){e.remove()},350)}
 function ferr(m){var e=ov&&ov.querySelector('#acFe');if(e){e.textContent=m;e.classList.add('show')}}
 function ferrF(id,m){var f=ov.querySelector('[data-f="'+id+'"]');if(!f)return;f.classList.add('err');f.querySelector('.ac-e').textContent=m}
 var v=function(id){return(ov.querySelector('#ac-'+id)||{}).value||''};
 var EM=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
 function go(acc){wr(SES,{phone:acc.phone});if(acc.camp&&acc.camp.Name&&acc.camp.Pass)wr(REG,acc.camp);else{try{localStorage.removeItem(REG)}catch(e){}}try{window.dispatchEvent(new Event('storage'))}catch(e){}
  try{sessionStorage.setItem('ac_p','1')}catch(e){}document.documentElement.classList.remove('camp-gate');close();window.showAppTab&&showAppTab('plus')}
 function login(){if(busy)return;var em=v('email').trim().toLowerCase(),pw=v('pw'),bad=0;
  if(!EM.test(em)){ferrF('email','Saisis un e-mail valide.');bad=1}
  if(!pw){ferrF('pw','Saisis ton mot de passe.');bad=1}
  if(bad)return;
  var backend=window.CampBackend;
  if(!backend||!backend.signIn){ferr('Service de connexion indisponible. Vérifie ta connexion internet puis réessaie.');return}
  busy=true;
  backend.signIn(em,pw).then(function(data){
    var user=data&&data.user;
    if(!user)throw new Error('Session Supabase introuvable.');
    var acc=accounts().filter(function(a){return(a.Email||'').toLowerCase()===em})[0]||{};
    /* Profil local = cache uniquement. L'identité validée vient de Supabase. */
    acc.Email=em;
    acc.phone=acc.phone||String(user.phone||'').replace(/\D+/g,'');
    acc.Phone=acc.Phone||user.phone||'';
    acc.Name=acc.Name||((user.user_metadata&&user.user_metadata.name)||em.split('@')[0]);
    acc.first=acc.first||String(acc.Name).trim().split(/\s+/)[0];
    acc.Group=acc.Group||((user.user_metadata&&user.user_metadata.group_name)||'');
    var L=accounts(),idx=L.findIndex(function(a){return(a.Email||'').toLowerCase()===em});
    if(idx>=0)L[idx]=Object.assign({},L[idx],acc);else L.push(acc);
    wr(ACC,L);
    busy=false;go(acc);toast('Bienvenue '+String(acc.first||acc.Name).trim().split(/\s+/)[0]+' !');
  }).catch(function(e){
    busy=false;
    var m=String(e&&e.message||e||'').toLowerCase();
    if(/invalid login credentials|invalid credentials/.test(m)){
      ferrF('pw','E-mail ou mot de passe incorrect.');
      ferr('Connexion refusée. Vérifie tes identifiants ou utilise « Mot de passe oublié ? ».');
    }else if(/email not confirmed|email_not_confirmed/.test(m)){
      ferrF('email','E-mail non confirmé.');
      ferr('Confirme ton adresse e-mail avec le code reçu avant de te connecter.');
    }else if(/network|fetch|failed to fetch/.test(m)){
      ferr('Connexion impossible. Vérifie ta connexion internet puis réessaie.');
    }else{
      ferr('La connexion n’a pas pu être effectuée. Réessaie dans un instant.');
    }
  })}
 function signup(){if(busy)return;var fi=v('first').trim(),la=v('last').trim(),ph=dg(v('phone')),em=v('email').trim().toLowerCase(),di=v('dist').trim(),pw=v('pw'),p2=v('pw2'),bad=0;
  if(fi.length<2){ferrF('first','Obligatoire.');bad=1}if(la.length<2){ferrF('last','Obligatoire.');bad=1}
  if(ph.length<8||ph.length>12){ferrF('phone','Numéro invalide (8 à 12 chiffres).');bad=1}
  if(!EM.test(em)){ferrF('email','Saisis un e-mail valide.');bad=1}
  if(di.length<2){ferrF('dist','Indique ton district.');bad=1}
  if(!pwOk(pw)){ferrF('pw','8 caractères minimum, avec une majuscule, une minuscule et un chiffre.');bad=1}
  if(p2!==pw||!p2){ferrF('pw2','Les mots de passe ne correspondent pas.');bad=1}
  if(bad){ferr('Vérifie les champs signalés.');return}
  var L=accounts();if(L.some(function(a){return(a.Email||'').toLowerCase()===em})){ferrF('email','Cet e-mail a déjà un compte.');ferr('Cet e-mail a déjà un compte. Utilise l’onglet « Se connecter ».');return}
  if(L.some(function(a){return a.phone===ph})){ferrF('phone','Ce numéro a déjà un compte.');ferr('Ce numéro a déjà un compte. Utilise l’onglet « Se connecter ».');return}
  busy=true;var salt=rnd();hash(pw,salt).then(function(h){busy=false;
   var acc={phone:ph,first:fi,last:la,Name:fi+' '+la,Phone:v('phone').trim(),Email:em,Group:di,Church:'',Pass:'',salt:salt,pw:h,ts:Date.now()};
   (window.campVerifyEmail||function(a,b,c){c()})(em,fi,function(){L.push(acc);wr(ACC,L);go(acc);try{window.campFirstRecap&&campFirstRecap()}catch(e){}toast('Compte créé. Bienvenue au Camp !')})})}
 window.openAuth=function(m){if(session())return;open('signup')};window.closeAuth=function(){if(session())close()};window.campGateOpen=function(){if(!session())open('signup')};
 var oo=window.openRegistration;
 window.openRegistration=function(){if(session()){oo&&oo.apply(this,arguments);return}open('signup')};
 
 function auto(){var p=null;try{p=sessionStorage.getItem('ac_p')}catch(e){}
  if(!p&&!session()&&localStorage.getItem('camp_was_out')==='1'){try{sessionStorage.setItem('ac_p','1')}catch(e){}setTimeout(function(){open('signup')},1400)}}
 if(document.readyState==='complete')auto();else window.addEventListener('load',auto);
})();
