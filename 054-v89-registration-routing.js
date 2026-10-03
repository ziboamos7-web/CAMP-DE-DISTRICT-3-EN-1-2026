
(function(){
  function showCampRegistration(){
    var auth=document.getElementById('authScreen');
    var overlay=document.getElementById('registrationOverlay');
    if(auth){auth.classList.remove('open');auth.setAttribute('aria-hidden','true');}
    if(overlay){
      overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');
      if(typeof window.regOnOpen==='function')window.regOnOpen();
      var nav=document.getElementById('floatingAppNav');if(nav)nav.style.display='none';
      document.body.style.overflow='hidden';
    }
  }
  // Le parcours de participation remplace l’ancien formulaire de création de compte.
  window.openRegistration=showCampRegistration;
  var previousOpenAuth=window.openAuth;
  window.openAuth=function(mode){if(mode==='signup'){showCampRegistration();return;}if(previousOpenAuth)return previousOpenAuth.apply(this,arguments)};
  document.addEventListener('click',function(e){
    var signup=e.target.closest('.auth-tab[data-mode="signup"], [data-go="signup"]');
    if(signup){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();showCampRegistration();}
  },true);
  var authNow=document.getElementById('authScreen'),tabsNow=document.getElementById('authTabs');
  if(authNow&&authNow.classList.contains('open')&&tabsNow&&tabsNow.getAttribute('data-mode')==='signup')showCampRegistration();
})();
