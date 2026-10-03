
(function(){
  const shell = document.getElementById('appShellView');
  const nav = document.getElementById('floatingAppNav');
  const screens = {
    camp: document.getElementById('screenMonCamp'),
    matchs: document.getElementById('screenMatchs'),
    plus: document.getElementById('screenPlus')
  };

  window.showAppTab = function(tab){
    if(!shell || !nav) return;
    nav.querySelectorAll('.nav-item').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    Object.values(screens).forEach(s=>{
      if(!s) return;
      s.style.display='none';
      s.setAttribute('aria-hidden','true');
    });

    if(tab === 'home'){
      shell.classList.remove('visible');
      shell.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
      window.scrollTo({top:0,behavior:'smooth'});
      return;
    }

    shell.classList.add('visible');
    shell.setAttribute('aria-hidden','false');
    const screen = screens[tab];
    if(screen){
      screen.style.display='block';
      screen.setAttribute('aria-hidden','false');
      screen.scrollTop=0;
    }
    document.body.style.overflow='hidden';
  };

  // La barre est visible sur l'accueil et reste disponible dans les 3 interfaces.
  if(nav) nav.style.display='grid';
})();
