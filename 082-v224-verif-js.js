
/* Vérification de l'e-mail par code à 6 chiffres (après « Créer mon compte »).
   Le code est envoyé et contrôlé par Supabase (window.CAMP_OTP, défini dans le script Supabase en bas de page).
   Aucun code n'est jamais affiché dans l'application. */
(function(){
 var WAIT=60,MAXTRY=5,LEN=6,cur=null;
 var I={
  back:'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  head:'<svg viewBox="0 0 24 24"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/></svg>',
  mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.5 7.5 12 13l8.5-5.5"/></svg>',
  re:'<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg>',
  ed:'<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-4-4L4 16v4Z"/><path d="M13.5 6.5l4 4"/></svg>'};
 function mm(s){s=Math.max(0,s);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
 function txt(e){return String(e&&(e.message||e)||'').toLowerCase()}
 function isNet(e){return /failed to fetch|network|load failed|fetch/.test(txt(e))&&!(e&&e.status)}
 function sendMsg(e){var m=txt(e);
  if((e&&e.code==='exists')||/already|registered|exists/.test(m))return 'Cet e-mail a déjà un compte. Reviens à l’écran précédent et utilise l’onglet « Se connecter ».';
  if((e&&e.status===429)||/rate limit|too many|only request|after \d+ seconds/.test(m))return 'Trop de demandes d’envoi. Patiente une minute puis renvoie le code.';
  if(isNet(e))return 'Connexion impossible. Vérifie ta connexion internet puis renvoie le code.';
  return 'L’e-mail n’a pas pu être envoyé. Réessaie dans un instant.'}
 window.campVerifyEmail=function(email,name,done){
  if(cur)return;
  var el=document.createElement('div');el.className='vf';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-labelledby','vfT');
  el.innerHTML='<div class="vf-top"><button type="button" class="vf-back" aria-label="Retour">'+I.back+'</button><button type="button" class="vf-help">'+I.head+'Besoin d’aide ?</button></div>'+
   '<div class="vf-body"><div class="vf-ic">'+I.mail+'</div><h2 id="vfT">Confirme ton adresse e-mail</h2><p class="vf-sub">Saisis le code à 6 chiffres envoyé à<b class="vf-em"></b></p>'+
   '<div class="vf-hbox" hidden>Vérifie aussi ton dossier spam ou courrier indésirable. Si rien n’arrive après une minute, renvoie le code.</div>'+
   '<div class="vf-code"><input class="vf-in" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="one-time-code" aria-label="Code à 6 chiffres"><div class="vf-bx"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>'+
   '<p class="vf-msg" role="alert"></p><p class="vf-tm">Envoi du code…</p>'+
   '<button type="button" class="vf-re" disabled>'+I.re+'Renvoyer le code</button></div>'+
   '<button type="button" class="vf-alt">'+I.ed+'Modifier mon e-mail</button>';
  var q=function(x){return el.querySelector(x)},inp=q('.vf-in'),bx=q('.vf-bx'),bs=bx.children,msg=q('.vf-msg'),tm=q('.vf-tm'),re=q('.vf-re');
  q('.vf-em').textContent=email;
  var me=cur={tries:0,end:0,t:null,busy:false,sent:false};
  function paint(){var v=inp.value,foc=document.activeElement===inp;for(var k=0;k<LEN;k++){bs[k].textContent=v[k]||'';bs[k].className=(v[k]?'f ':'')+((foc&&(k===v.length||(k===LEN-1&&v.length===LEN)))?'on':'')}}
  function say(t,g){msg.textContent=t||'';msg.className='vf-msg'+(g?' good':'')}
  function tick(){var s=Math.ceil((me.end-Date.now())/1000);if(s>0){tm.innerHTML='Nouveau code possible dans <b>'+mm(s)+'</b>';re.disabled=true}else{tm.textContent='Tu peux demander un nouveau code.';re.disabled=false;clearInterval(me.t)}}
  function start(){me.end=Date.now()+WAIT*1000;clearInterval(me.t);tick();me.t=setInterval(tick,250)}
  function stop(t){clearInterval(me.t);tm.textContent=t||'';re.disabled=false}
  function close(){if(cur!==me)return;clearInterval(me.t);cur=null;el.classList.remove('on');setTimeout(function(){el.remove()},320)}
  function issue(){
   if(me.busy)return;
   var o=window.CAMP_OTP,first=!me.sent;
   inp.value='';bx.className='vf-bx';paint();say('');
   if(!o){stop('');say('Service e-mail indisponible. Vérifie ta connexion puis renvoie le code.');return}
   me.busy=true;re.disabled=true;tm.textContent='Envoi du code…';
   o[first?'send':'resend'](email).then(function(r){
    if(cur!==me)return;me.busy=false;
    if(r==='skip'){close();done&&done();return}
    me.sent=true;me.tries=0;start();if(!first)say('Un nouveau code vient d’être envoyé.',1);
    try{inp.focus()}catch(e){}
   }).catch(function(e){if(cur!==me)return;me.busy=false;stop('');say(sendMsg(e));try{console.warn('[Camp] envoi du code',e)}catch(x){}})}
  function check(){var v=inp.value;if(v.length<LEN||me.busy)return;
   if(me.tries>=MAXTRY){say('Trop d’essais. Demande un nouveau code.');return}
   var o=window.CAMP_OTP;if(!o){say('Service e-mail indisponible.');return}
   me.busy=true;inp.disabled=true;
   o.verify(email,v).then(function(){
    if(cur!==me)return;
    bx.className='vf-bx ok';inp.blur();re.disabled=true;say('E-mail vérifié.',1);clearInterval(me.t);tm.textContent='';
    setTimeout(function(){close();done&&done()},550)
   }).catch(function(e){
    if(cur!==me)return;me.busy=false;inp.disabled=false;
    if(isNet(e)){say('Connexion impossible. Vérifie ta connexion internet.');return}
    me.tries++;bx.className='vf-bx err shake';
    var left=MAXTRY-me.tries;
    if(left<=0)say('Trop d’essais. Demande un nouveau code.');
    else say('Code incorrect ou expiré. '+left+' essai'+(left>1?'s':'')+' restant'+(left>1?'s':'')+'.');
    setTimeout(function(){bx.classList.remove('shake');inp.value='';bx.className=me.tries>=MAXTRY?'vf-bx err':'vf-bx';paint();try{inp.focus()}catch(x){}},420)})}
  inp.addEventListener('input',function(){inp.value=inp.value.replace(/\D+/g,'').slice(0,LEN);if(inp.value.length<LEN){bx.className='vf-bx';say('')}paint();check()});
  inp.addEventListener('focus',paint);inp.addEventListener('blur',paint);
  re.onclick=function(){if(!re.disabled)issue()};
  q('.vf-back').onclick=q('.vf-alt').onclick=close;
  q('.vf-help').onclick=function(){var h=q('.vf-hbox');h.hidden=!h.hidden};
  document.body.appendChild(el);
  requestAnimationFrame(function(){requestAnimationFrame(function(){el.classList.add('on')})});
  setTimeout(function(){try{inp.focus()}catch(e){}},360);
  issue()};
})();
