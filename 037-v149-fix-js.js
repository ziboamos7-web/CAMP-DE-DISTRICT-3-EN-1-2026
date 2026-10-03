
(function(){
 var op=window.openPresenter;if(typeof op!=='function')return;
 window.openPresenter=function(t){
  var r=op.apply(this,arguments),a=document.querySelector('#presenter .presenter-action');
  if(a){var reg=(t==='participation');a.textContent=reg?'Je me pré-inscris':'J’ai compris';
   a.onclick=function(){closePresenter();if(reg&&window.openRegistration)openRegistration()}}
  return r};
})();
