
(function(){
  /* Onglets où l'en-tête reste visible */
  var KEEP={home:1,camp:1,matchs:1};
  /* Écrans / fiches plein écran (intervenant, inscription, ticket, galerie, connexion…) */
  var OVERLAYS='.presenter-overlay,.registration-overlay,.poster-viewer,.ps,.cpg,.v49-ov,.v63-ov,.v69-lb,.v72-pg,.auth-screen';
  var raf=0;
  function overlayOpen(){
    var list=document.querySelectorAll(OVERLAYS);
    for(var i=0;i<list.length;i++){
      var el=list[i],cs=getComputedStyle(el);
      if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)<0.05||cs.position!=='fixed')continue;
      var r=el.getBoundingClientRect();
      if(r.width<innerWidth*0.9||r.height<innerHeight*0.5)continue;
      /* V152 : une fiche fermee hors ecran ne doit plus masquer l'en-tete */
      if(r.bottom<=8||r.top>=innerHeight-8||r.right<=8||r.left>=innerWidth-8)continue;
      if(cs.pointerEvents==='none')continue;
      var top=document.elementFromPoint(Math.round(innerWidth/2),Math.round(innerHeight/2));
      if(top&&(top===el||el.contains(top)))return true;
    }
    return false;
  }
  function sync(){
    raf=0;
    var shell=document.getElementById('appShellView');
    var act=document.querySelector('#floatingAppNav .nav-item.active');
    var tab=act&&act.getAttribute('data-tab');
    var shellOn=shell&&shell.classList.contains('visible');
    var hideForTab=!!(shellOn&&tab&&!KEEP[tab]);
    var h=document.querySelector('.ref-header');
    if(h&&h.offsetHeight)document.documentElement.style.setProperty('--cd-header-h',h.offsetHeight+'px');
    document.body.classList.toggle('cd-header-off',hideForTab||overlayOpen());
  }
  function plan(){if(!raf)raf=requestAnimationFrame(sync)}
  function init(){
    /* V152 : resynchronise l'en-tete aussi au retour sur l'appli, au defilement et en cas de doute */
    ['scroll','touchend','pageshow','focus','hashchange','popstate'].forEach(function(ev){window.addEventListener(ev,plan,{passive:true})});
    document.addEventListener('visibilitychange',plan);
    setInterval(plan,1200);
    new MutationObserver(plan).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class','style','aria-hidden']});
    window.addEventListener('resize',plan);
    sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
