
(function(){
  var ACC='camp_accounts_2026', SES='camp_session_2026', REG='camp_registration_2026';
  var $=function(id){return document.getElementById(id)};
  var scr=$('authScreen'), tabs=$('authTabs'), plan='';
  var EYE='<svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
  var EYE_OFF='<svg viewBox="0 0 24 24"><path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a9.700 9.700 0 0 0 4.100-.9M9.900 9.900a3 3 0 0 0 4.200 4.200"/></svg>';

  function read(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
  function write(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
  function digits(s){return String(s||'').replace(/\D+/g,'')}
  function accounts(){return read(ACC,[])}
  function session(){return read(SES,null)}

  function rnd(){var a=new Uint8Array(8);(window.crypto||{}).getRandomValues?crypto.getRandomValues(a):a.forEach(function(_,i){a[i]=Math.floor(Math.random()*256)});return Array.prototype.map.call(a,function(x){return x.toString(16).padStart(2,'0')}).join('')}
  function hash(pw,salt){
    var s=salt+'|'+pw;
    if(window.crypto&&crypto.subtle&&window.TextEncoder){
      return crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)).then(function(b){return Array.prototype.map.call(new Uint8Array(b),function(x){return x.toString(16).padStart(2,'0')}).join('')});
    }
    var h=5381;for(var i=0;i<s.length;i++){h=((h<<5)+h+s.charCodeAt(i))|0}
    return Promise.resolve('f'+(h>>>0).toString(16));
  }

  /* ---------- ouverture / fermeture ---------- */
  function setMode(m){
    tabs.setAttribute('data-mode',m);
    tabs.querySelectorAll('.auth-tab').forEach(function(b){var on=b.dataset.mode===m;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
    scr.querySelectorAll('.auth-pane').forEach(function(p){p.classList.toggle('on',p.dataset.pane===m)});
    $('authKicker').textContent=m==='login'?'ESPACE PARTICIPANT':'PRÉ-INSCRIPTION · CAMP 2026';
    $('authTitle').textContent=m==='login'?'Content de te revoir':'Rejoins le Camp';
    $('authSub').textContent=m==='login'?'Connecte-toi pour retrouver ta pré-inscription et les infos du Camp.':'Crée ton compte en une minute pour enregistrer ta participation.';
    clearErrors();scr.scrollTop=0;
  }
  window.openAuth=function(m){
    setMode(m||'login');
    scr.classList.add('open');scr.setAttribute('aria-hidden','false');
    var nav=$('floatingAppNav');if(nav)nav.style.display='none';
    document.body.style.overflow='hidden';
  };
  window.closeAuth=function(){
    scr.classList.remove('open');scr.setAttribute('aria-hidden','true');
    var nav=$('floatingAppNav');if(nav)nav.style.display='grid';
    document.body.style.overflow='';
  };
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&scr.classList.contains('open'))closeAuth()});

  tabs.addEventListener('click',function(e){var b=e.target.closest('.auth-tab');if(b)setMode(b.dataset.mode)});
  scr.addEventListener('click',function(e){var g=e.target.closest('[data-go]');if(g)setMode(g.dataset.go)});

  /* œil mot de passe */
  scr.querySelectorAll('.auth-eye').forEach(function(b){
    b.innerHTML=EYE;
    b.addEventListener('click',function(){
      var i=$(b.dataset.eye),show=i.type==='password';
      i.type=show?'text':'password';b.innerHTML=show?EYE_OFF:EYE;
      b.setAttribute('aria-label',show?'Masquer le mot de passe':'Afficher le mot de passe');
    });
  });

  /* formules */
  $('authPlans').addEventListener('click',function(e){
    var b=e.target.closest('.auth-plan');if(!b)return;
    plan=b.dataset.plan;
    this.querySelectorAll('.auth-plan').forEach(function(x){x.classList.toggle('on',x===b)});
    fieldErr($('authSignup'),'plan',false);
  });

  /* ---------- erreurs ---------- */
  function fieldErr(form,f,on){
    var el=form.querySelector('[data-f="'+f+'"]');if(!el)return;
    el.classList.toggle('err',!!on);
    var w=el.querySelector('.auth-input');if(w)w.classList.toggle('err',!!on);
  }
  function clearErrors(){
    scr.querySelectorAll('.err').forEach(function(x){x.classList.remove('err')});
    scr.querySelectorAll('.auth-formerr').forEach(function(x){x.classList.remove('show');x.textContent=''});
  }
  function formErr(id,msg){var e=$(id);e.textContent=msg;e.classList.add('show')}
  scr.addEventListener('input',function(e){
    var f=e.target.closest('.auth-field');if(f){f.classList.remove('err');var w=f.querySelector('.auth-input');if(w)w.classList.remove('err')}
    scr.querySelectorAll('.auth-formerr.show').forEach(function(x){x.classList.remove('show')});
  });

  function toast(t){var el=$('authToast');el.textContent=t;el.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(function(){el.classList.remove('show')},3200)}

  /* ---------- session + synchronisation avec Mon Camp ---------- */
  function startSession(acc){
    write(SES,{phone:acc.phone});
    write(REG,{Name:acc.Name,Phone:acc.Phone,Church:acc.Church||'',Group:acc.Group||'',Pass:acc.Pass||''});
    try{window.dispatchEvent(new Event('storage'))}catch(e){}
    paintProfile();
  }
  function paintProfile(){
    var s=session(),acc=s&&accounts().filter(function(a){return a.phone===s.phone})[0];
    var av=document.querySelector('.profile-card .profile-avatar');
    if(av)av.textContent=acc?acc.Name.trim().charAt(0).toUpperCase():'S';
    var sub=document.querySelector('.profile-card small');
    if(sub)sub.textContent=acc?acc.Name:'Voir et modifier mes informations';
    var lo=$('authLogout');if(lo)lo.classList.toggle('show',!!acc);
  }
  window.campLogout=function(){
    /* Point unique de déconnexion : le compte reste enregistré, mais la session et
       les données de participation propres à la session sont retirées. */
    try{
      [SES,REG,'camp_registration_draft','camp_registration_draft_2026','camp_avatar','camp_cover','camp_cover_src','camp_cover_t'].forEach(function(k){
        try{localStorage.removeItem(k)}catch(e){}
      });
      try{localStorage.setItem('camp_was_out','1')}catch(e){}
    }catch(e){}
    try{window.dispatchEvent(new Event('storage'))}catch(e){}
    try{if(window.closeRegistration)closeRegistration()}catch(e){}
    try{if(window.showAppTab)showAppTab('plus')}catch(e){}
    paintProfile();
    try{toast('Tu es déconnecté.')}catch(e){}
    try{window.cdFx&&cdFx('logout')}catch(e){}
  };

  /* ---------- connexion ---------- */
  $('authLogin').addEventListener('submit',function(e){
    e.preventDefault();clearErrors();
    var ph=digits($('lgPhone').value),pw=$('lgPw').value,bad=false;
    if(ph.length<8){fieldErr(this,'phone',true);bad=true}
    if(!pw){fieldErr(this,'pw',true);bad=true}
    if(bad){formErr('loginErr','Renseigne ton numéro et ton mot de passe.');return}
    var acc=accounts().filter(function(a){return a.phone===ph})[0];
    if(!acc){fieldErr(this,'phone',true);formErr('loginErr','Aucun compte avec ce numéro. Crée ton compte dans l’onglet Pré-inscription.');return}
    var btn=this.querySelector('.auth-submit'),form=this;btn.disabled=true;
    hash(pw,acc.salt).then(function(h){
      btn.disabled=false;
      if(h!==acc.pw){fieldErr(form,'pw',true);formErr('loginErr','Mot de passe incorrect.');return}
      startSession(acc);closeAuth();form.reset();
      toast('Bienvenue '+acc.Name.trim().split(/\s+/)[0]+' !');
      if(window.showAppTab)showAppTab('camp');
    });
  });
  $('authForgot').addEventListener('click',function(){
    formErr('loginErr','Comptes enregistrés sur cet appareil : la réinitialisation n’est pas disponible. Rapproche-toi de l’organisation ou crée un nouveau compte.');
  });

  /* ---------- inscription ---------- */
  $('authSignup').addEventListener('submit',function(e){
    e.preventDefault();clearErrors();
    var form=this,name=$('suName').value.trim(),ph=digits($('suPhone').value),pw=$('suPw').value,pw2=$('suPw2').value,bad=false;
    if(name.split(/\s+/).filter(Boolean).length<2){fieldErr(form,'name',true);bad=true}
    if(ph.length<8||ph.length>12){fieldErr(form,'phone',true);bad=true}
    if(!plan){fieldErr(form,'plan',true);bad=true}
    if(pw.length<6){fieldErr(form,'pw',true);bad=true}
    if(pw2!==pw){fieldErr(form,'pw2',true);bad=true}
    if(bad){formErr('signupErr','Vérifie les champs signalés.');return}
    if(accounts().some(function(a){return a.phone===ph})){
      fieldErr(form,'phone',true);formErr('signupErr','Ce numéro a déjà un compte. Utilise l’onglet Connexion.');return;
    }
    var btn=form.querySelector('.auth-submit');btn.disabled=true;
    var salt=rnd();
    hash(pw,salt).then(function(h){
      btn.disabled=false;
      var acc={phone:ph,Name:name,Phone:$('suPhone').value.trim(),Church:$('suChurch').value.trim(),Group:$('suGroup').value.trim(),Pass:plan,salt:salt,pw:h};
      var list=accounts();list.push(acc);write(ACC,list);
      startSession(acc);closeAuth();form.reset();
      plan='';$('authPlans').querySelectorAll('.auth-plan').forEach(function(x){x.classList.remove('on')});
      toast('Compte créé. Bienvenue au Camp !');
      if(window.showAppTab)showAppTab('camp');
    });
  });

  /* ---------- branchement sur l’app existante ---------- */
  var origOpen=window.openRegistration;
  window.openRegistration=function(){
    if(session()&&origOpen){origOpen();return}   // connecté : on modifie ses infos
    openAuth('signup');
  };
  var origSave=window.saveRegistration;
  if(origSave){
    window.saveRegistration=function(e){
      origSave(e);
      var s=session();if(!s)return;
      var d=read(REG,null),list=accounts();
      list.forEach(function(a){if(a.phone===s.phone&&d){a.Name=d.Name||a.Name;a.Church=d.Church;a.Group=d.Group;a.Pass=d.Pass||a.Pass}});
      write(ACC,list);paintProfile();
    };
  }

  /* bouton profil de l’en-tête */
  var hp=document.querySelector('.ref-profile');
  if(hp)hp.addEventListener('click',function(){session()?openRegistration():openAuth('login')});

  /* bouton déconnexion dans la fiche « Ma pré-inscription » */
  var sheet=document.querySelector('#registrationOverlay .registration-sheet');
  

  paintProfile();
})();
