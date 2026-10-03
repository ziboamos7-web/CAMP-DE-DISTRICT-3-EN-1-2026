
/* V240 — Compte obligatoire.
   Aucune session : l'écran « Crée ton compte » s'ouvre dès que l'application est chargée.
   Il n'a ni bouton de fermeture, ni raccourci : on le quitte uniquement en créant un compte
   (ou en se connectant à un compte existant). Le récap du Camp suit la création du compte. */
(function(){
 var de=document.documentElement;
 function sess(){try{return JSON.parse(localStorage.getItem('camp_session_2026'))}catch(e){return null}}
 function gate(){
  if(sess()){de.classList.remove('camp-gate');return}
  de.classList.add('camp-gate');
  if(window.campGateOpen&&!document.querySelector('.ac'))campGateOpen()}
 gate();
 document.addEventListener('DOMContentLoaded',gate);
 window.addEventListener('load',function(){gate();
  /* filet de sécurité : si l'écran n'a pas pu s'ouvrir, on ne laisse pas une page blanche */
  setTimeout(function(){if(!sess()&&!document.querySelector('.ac')){gate();if(!document.querySelector('.ac'))de.classList.remove('camp-gate')}},3000)});
 window.addEventListener('storage',gate);
 setInterval(function(){
  if(sess()){de.classList.remove('camp-gate');return}
  if(!document.querySelector('.ac')&&!document.querySelector('.vf'))gate()},800);
})();
