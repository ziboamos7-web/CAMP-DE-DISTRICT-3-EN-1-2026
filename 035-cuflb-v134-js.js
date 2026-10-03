
(function(){
  var ids=['appShellView','registrationOverlay','cuLic','cuLb','v49Ov','cpg','posterViewer','authScreen','presenter','cuTm'],H=document.documentElement;
  function on(e){if(!e)return false;var s=getComputedStyle(e);return s.display!=='none'&&e.offsetHeight>0}
  function sync(){var sh=document.getElementById('appShellView'),shell=!!(sh&&sh.classList.contains('visible')&&on(sh)),lic=on(document.getElementById('cuLic')),any=shell||lic||ids.some(function(i){return on(document.getElementById(i))});
    H.classList.toggle('cd-shell',shell);H.classList.toggle('cd-lic',lic);H.classList.toggle('cd-lock',any)}
  var mo=new MutationObserver(sync);
  ids.forEach(function(i){var e=document.getElementById(i);if(e)mo.observe(e,{attributes:true,attributeFilter:['class','style','aria-hidden','hidden']})});
  setInterval(sync,1500);window.addEventListener('pageshow',sync);sync();
})();
