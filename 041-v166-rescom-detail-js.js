
(function(){
  var originalOpen=window.openPresenter;
  if(typeof originalOpen!=='function') return;
  window.openPresenter=function(type){
    var r=originalOpen.apply(this,arguments);
    var panel=document.getElementById('presenter');
    if(panel) panel.classList.toggle('rescom-detail-mode',type==='rescom');
    return r;
  };
  var close=window.closePresenter;
  if(typeof close==='function'){
    window.closePresenter=function(){
      var p=document.getElementById('presenter');
      if(p)p.classList.remove('rescom-detail-mode');
      return close.apply(this,arguments);
    };
  }
})();
