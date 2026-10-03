
/* Mot de passe oublié — code à 6 chiffres envoyé par Supabase (modèle « Reset password »),
   puis choix d'un nouveau mot de passe. Met aussi à jour le compte enregistré sur l'appareil. */
(function(){
 'use strict';
 var ACC='camp_accounts_2026',WAIT=60,MAXTRY=5,LEN=6,cur=null;
 var EM=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
 var IC={
  back:'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  lock:'<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="3"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>',
  mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.5 7.5 12 13l8.5-5.5"/></svg>',
  re:'<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg>',
  ok:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'};
 function txt(e){return String(e&&(e.message||e)||'').toLowerCase()}
 function isNet(e){return /failed to fetch|network|load failed|fetch/.test(txt(e))&&!(e&&e.status)}
 function mm(s){s=Math.max(0,s);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
 function pwOk(p){return p.length>=8&&/[a-z]/.test(p)&&/[A-Z]/.test(p)&&/\d/.test(p)}
 function rnd(){var a=new Uint8Array(8);crypto.getRandomValues(a);return Array.prototype.map.call(a,function(x){return x.toString(16).padStart(2,'0')}).join('')}
 function hash(pw,salt){return crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+'|'+pw)).then(function(b){return Array.prototype.map.call(new Uint8Array(b),function(x){return x.toString(16).padStart(2,'0')}).join('')})}
 function syncLocal(email,pw){
  var L;try{L=JSON.parse(localStorage.getItem(ACC))||[]}catch(e){L=[]}
  var a=L.filter(function(x){return(x.Email||'').toLowerCase()===email})[0];
  if(!a)return Promise.resolve();
  var salt=rnd();
  return hash(pw,salt).then(function(h){a.salt=salt;a.pw=h;try{localStorage.setItem(ACC,JSON.stringify(L))}catch(e){}});
 }
 window.campResetPassword=function(prefill){
  var sb=window.CampBackend&&window.CampBackend.sb;
  if(cur)return;
  if(!sb){var f=document.getElementById('acFe');if(f){f.textContent='Service indisponible. Vérifie ta connexion internet puis réessaie.';f.classList.add('show')}return}
  var el=document.createElement('div');el.className='vf rs';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
  el.innerHTML='<div class="vf-top"><button type="button" class="vf-back" aria-label="Retour">'+IC.back+'</button></div><div class="vf-body"></div>';
  var body=el.querySelector('.vf-body'),me=cur={t:null,end:0,tries:0,busy:false},email=String(prefill||'').trim().toLowerCase(),code='';
  function q(x){return body.querySelector(x)}
  function say(t,g){var m=q('.vf-msg');if(m){m.textContent=t||'';m.className='vf-msg'+(g?' good':'')}}
  function close(){if(cur!==me)return;clearInterval(me.t);cur=null;el.classList.remove('on');setTimeout(function(){el.remove()},320)}
  el.querySelector('.vf-back').onclick=close;

  /* ----- étape 1 : e-mail ----- */
  function stepEmail(){
   body.innerHTML='<div class="vf-ic">'+IC.lock+'</div><h2>Mot de passe oublié</h2><p class="vf-sub">Saisis ton e-mail. Nous t’enverrons un code à 6 chiffres pour choisir un nouveau mot de passe.</p>'+
    '<label class="rs-lb" for="rsE">Adresse e-mail</label><input class="rs-in" id="rsE" type="email" inputmode="email" autocomplete="email" autocapitalize="none" placeholder="exemple@mail.com">'+
    '<p class="vf-msg" role="alert"></p><button type="button" class="ac-sub" id="rsGo">Envoyer le code</button>';
   var i=q('#rsE');i.value=email;
   function go(){
    if(me.busy)return;var v=i.value.trim().toLowerCase();
    if(!EM.test(v)){say('Saisis une adresse e-mail valide.');return}
    email=v;me.busy=true;say('');q('#rsGo').disabled=true;
    sb.auth.resetPasswordForEmail(email).then(function(r){
     me.busy=false;if(cur!==me)return;
     if(r.error)throw r.error;
     stepCode(true);
    }).catch(function(e){
     me.busy=false;if(cur!==me)return;q('#rsGo').disabled=false;
     if((e&&e.status===429)||/rate limit|too many|after \d+ seconds|only request/.test(txt(e)))say('Trop de demandes. Patiente une minute puis réessaie.');
     else if(isNet(e))say('Connexion impossible. Vérifie ta connexion internet.');
     else say('L’e-mail n’a pas pu être envoyé. Réessaie dans un instant.');
    });
   }
   q('#rsGo').onclick=go;i.addEventListener('keydown',function(e){if(e.key==='Enter')go()});
  }

  /* ----- étape 2 : code ----- */
  function stepCode(fresh){
   clearInterval(me.t);me.tries=0;
   body.innerHTML='<div class="vf-ic">'+IC.mail+'</div><h2>Saisis le code</h2><p class="vf-sub">Si un compte existe avec cet e-mail, un code à 6 chiffres a été envoyé à<b class="vf-em"></b></p>'+
    '<div class="vf-code"><input class="vf-in" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="one-time-code" aria-label="Code à 6 chiffres"><div class="vf-bx"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>'+
    '<p class="vf-msg" role="alert"></p><p class="vf-tm"></p><button type="button" class="vf-re" disabled>'+IC.re+'Renvoyer le code</button>';
   q('.vf-em').textContent=email;
   var inp=q('.vf-in'),bx=q('.vf-bx'),bs=bx.children,tm=q('.vf-tm'),re=q('.vf-re');
   function paint(){var v=inp.value,foc=document.activeElement===inp;for(var k=0;k<LEN;k++){bs[k].textContent=v[k]||'';bs[k].className=(v[k]?'f ':'')+((foc&&(k===v.length||(k===LEN-1&&v.length===LEN)))?'on':'')}}
   function tick(){var s=Math.ceil((me.end-Date.now())/1000);if(s>0){tm.innerHTML='Nouveau code possible dans <b>'+mm(s)+'</b>';re.disabled=true}else{tm.textContent='Tu peux demander un nouveau code.';re.disabled=false;clearInterval(me.t)}}
   function start(){me.end=Date.now()+WAIT*1000;clearInterval(me.t);tick();me.t=setInterval(tick,250)}
   function check(){
    var v=inp.value;if(v.length<LEN||me.busy)return;
    if(me.tries>=MAXTRY){say('Trop d’essais. Demande un nouveau code.');return}
    me.busy=true;inp.disabled=true;
    sb.auth.verifyOtp({email:email,token:v,type:'recovery'}).then(function(r){
     if(r.error)throw r.error;if(cur!==me)return;
     me.busy=false;bx.className='vf-bx ok';inp.blur();clearInterval(me.t);code=v;
     setTimeout(function(){if(cur===me)stepPw()},450);
    }).catch(function(e){
     if(cur!==me)return;me.busy=false;inp.disabled=false;
     if(isNet(e)){say('Connexion impossible. Vérifie ta connexion internet.');return}
     me.tries++;bx.className='vf-bx err shake';var left=MAXTRY-me.tries;
     say(left<=0?'Trop d’essais. Demande un nouveau code.':'Code incorrect ou expiré. '+left+' essai'+(left>1?'s':'')+' restant'+(left>1?'s':'')+'.');
     setTimeout(function(){bx.classList.remove('shake');inp.value='';bx.className=me.tries>=MAXTRY?'vf-bx err':'vf-bx';paint();try{inp.focus()}catch(x){}},420);
    });
   }
   inp.addEventListener('input',function(){inp.value=inp.value.replace(/\D+/g,'').slice(0,LEN);if(inp.value.length<LEN){bx.className='vf-bx';say('')}paint();check()});
   inp.addEventListener('focus',paint);inp.addEventListener('blur',paint);
   re.onclick=function(){
    if(re.disabled||me.busy)return;me.busy=true;re.disabled=true;say('');
    sb.auth.resetPasswordForEmail(email).then(function(r){
     me.busy=false;if(cur!==me)return;if(r.error)throw r.error;
     inp.value='';bx.className='vf-bx';paint();me.tries=0;start();say('Un nouveau code vient d’être envoyé.',1);try{inp.focus()}catch(x){}
    }).catch(function(e){
     me.busy=false;if(cur!==me)return;tm.textContent='';re.disabled=false;
     say((e&&e.status===429)?'Trop de demandes. Patiente une minute.':isNet(e)?'Connexion impossible. Vérifie ta connexion internet.':'L’e-mail n’a pas pu être envoyé. Réessaie dans un instant.');
    });
   };
   start();setTimeout(function(){try{inp.focus()}catch(e){}},300);
  }

  /* ----- étape 3 : nouveau mot de passe ----- */
  function stepPw(){
   body.innerHTML='<div class="vf-ic">'+IC.lock+'</div><h2>Nouveau mot de passe</h2><p class="vf-sub">Choisis un mot de passe que tu retiendras.</p>'+
    '<label class="rs-lb" for="rsP1">Nouveau mot de passe</label><input class="rs-in" id="rsP1" type="password" autocomplete="new-password" autocapitalize="none" maxlength="64" placeholder="Nouveau mot de passe">'+
    '<label class="rs-lb" for="rsP2">Confirme le mot de passe</label><input class="rs-in" id="rsP2" type="password" autocomplete="new-password" autocapitalize="none" maxlength="64" placeholder="Retape le mot de passe">'+
    '<p class="rs-hint">8 caractères minimum, avec une majuscule, une minuscule et un chiffre.</p>'+
    '<p class="vf-msg" role="alert"></p><button type="button" class="ac-sub" id="rsSave">Changer le mot de passe</button>';
   var p1=q('#rsP1'),p2=q('#rsP2');
   function save(){
    if(me.busy)return;var a=p1.value,b=p2.value;
    if(!pwOk(a)){say('8 caractères minimum, avec une majuscule, une minuscule et un chiffre.');return}
    if(a!==b){say('Les deux mots de passe ne sont pas identiques.');return}
    me.busy=true;say('');q('#rsSave').disabled=true;
    sb.auth.updateUser({password:a}).then(function(r){
     if(r.error)throw r.error;
     return syncLocal(email,a).then(function(){return sb.auth.signOut()}).catch(function(){}).then(function(){me.busy=false;if(cur===me)stepDone()});
    }).catch(function(e){
     me.busy=false;if(cur!==me)return;q('#rsSave').disabled=false;
     var m=txt(e);
     if(/different from the old|same_password/.test(m+' '+(e&&e.code||'')))say('Choisis un mot de passe différent de l’ancien.');
     else if(/weak|least \d+ char/.test(m))say('Ce mot de passe est trop faible. Choisis-en un plus long.');
     else if(isNet(e))say('Connexion impossible. Vérifie ta connexion internet.');
     else say('Le mot de passe n’a pas pu être changé. Redemande un code et réessaie.');
    });
   }
   q('#rsSave').onclick=save;p2.addEventListener('keydown',function(e){if(e.key==='Enter')save()});
   setTimeout(function(){try{p1.focus()}catch(e){}},300);
  }

  /* ----- étape 4 : terminé ----- */
  function stepDone(){
   body.innerHTML='<div class="rs-ok">'+IC.ok+'</div><h2>Mot de passe changé</h2><p class="vf-sub">Tu peux maintenant te connecter avec ton nouveau mot de passe.</p><button type="button" class="ac-sub" id="rsEnd">Se connecter</button>';
   q('#rsEnd').onclick=function(){
    close();
    setTimeout(function(){var e=document.getElementById('ac-email'),p=document.getElementById('ac-pw');if(e&&!e.value)e.value=email;if(p){p.value='';try{p.focus()}catch(x){}}},340);
   };
  }

  document.body.appendChild(el);
  requestAnimationFrame(function(){requestAnimationFrame(function(){el.classList.add('on')})});
  stepEmail();
  setTimeout(function(){var i=q('#rsE');if(i&&!i.value){try{i.focus()}catch(e){}}},350);
 };
})();
