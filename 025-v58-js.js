
(function(){
  var scene=document.getElementById('v58Scene');if(!scene)return;
  var cardEl=document.getElementById('v51Cd');
  function fit(){var w=(cardEl&&cardEl.clientWidth)||374;scene.style.setProperty('--k',(w/374*.72).toFixed(3))}
  fit();if(window.ResizeObserver&&cardEl)new ResizeObserver(fit).observe(cardEl);else window.addEventListener('resize',fit);
  var calm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches,t=0;
  scene.addEventListener('click',function(){
    scene.classList.remove('flare');void scene.offsetWidth;scene.classList.add('flare');
    clearTimeout(t);t=setTimeout(function(){scene.classList.remove('flare')},1000);
    if(navigator.vibrate&&!calm)try{navigator.vibrate(12)}catch(e){}
  });
})();
