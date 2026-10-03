
/* Bloque le défilement de la page derrière l'écran de connexion */
(function(){
  var locked=false,y=0,html=document.documentElement,body=document.body;
  function lock(){
    if(locked)return;locked=true;
    y=window.pageYOffset||html.scrollTop||0;
    html.style.overflow='hidden';
    body.style.cssText+=';position:fixed;top:-'+y+'px;left:0;right:0;width:100%;overflow:hidden;';
  }
  function unlock(){
    if(!locked)return;locked=false;
    html.style.overflow='';
    body.style.position='';body.style.top='';body.style.left='';body.style.right='';body.style.width='';body.style.overflow='';
    var p=html.style.scrollBehavior;html.style.scrollBehavior='auto';
    window.scrollTo(0,y);html.style.scrollBehavior=p;
  }
  function sync(){document.querySelector('.ac')?lock():unlock()}
  new MutationObserver(sync).observe(body,{childList:true});
  /* Dans l'écran : le scroll reste dans le panneau, pas de rebond vers la page */
  document.addEventListener('touchmove',function(e){
    var ac=document.querySelector('.ac');if(!ac||!ac.contains(e.target))return;
    if(ac.scrollHeight<=ac.clientHeight+1)e.preventDefault();
  },{passive:false});
  sync();
})();
