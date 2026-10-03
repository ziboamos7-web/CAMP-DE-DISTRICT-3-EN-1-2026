
(function(){
  var KEY='camp_registration_2026';
  function $(i){return document.getElementById(i)}
  var calm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  /* 1) chiffres qui montent une seule fois */
  var st=$('v52Stats');
  if(st&&'IntersectionObserver' in window&&!calm){
    var nums=[].slice.call(st.querySelectorAll('strong[data-n]'));
    var io=new IntersectionObserver(function(en){
      if(!en[0].isIntersecting)return;io.disconnect();
      var t0=performance.now(),D=900;
      nums.forEach(function(n){n.textContent='0'});
      (function f(t){
        var p=Math.min(1,(t-t0)/D),e=1-Math.pow(1-p,3);
        nums.forEach(function(n){n.textContent=String(Math.round(e*(+n.dataset.n)))});
        if(p<1)requestAnimationFrame(f);
      })(t0);
    },{threshold:.6});
    io.observe(st);
  }
  /* 2) tuile inscription : pastille verte si inscrit */
  var reg=$('v52Reg'),lab=$('v52RegL');
  function paint(){
    var d=null;try{d=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}
    var on=!!(d&&d.Name);
    if(reg){reg.classList.toggle('is-in',on);reg.setAttribute('aria-label',on?'Ma pré-inscription, validée':'Se pré-inscrire')}
    if(lab)lab.textContent=on?'Pré-inscrit(e)':'Se pré-inscrire';
  }
  var os=window.saveRegistration;
  if(os)window.saveRegistration=function(){var r=os.apply(this,arguments);paint();return r};
  window.addEventListener('storage',paint);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)paint()});
  paint();
  /* 3) partage du verset */
  var vs=$('v52VS');
  if(vs)vs.onclick=function(){
    var txt='« Va avec cette force que tu as. » — Juges 6:14 · Camp de District 3 en 1, du 28 oct. au 1er nov. 2026';
    if(navigator.share){navigator.share({title:'Thème du Camp 2026',text:txt}).catch(function(){});return}
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(txt).then(function(){
        var o=vs.innerHTML;vs.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
        setTimeout(function(){vs.innerHTML=o},1500);
      },function(){window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank','noopener')});
    }else window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank','noopener');
  };
})();
