
(function(){
  'use strict';
  var KEY='camp_registration_2026';

  function normalizeLocal(){
    try{
      var raw=localStorage.getItem(KEY);
      if(!raw)return;
      var d=JSON.parse(raw)||{};
      if(d.TicketNumber!=null){
        var n=String(d.TicketNumber).replace(/\D/g,'');
        d.TicketNumber=n?String(parseInt(n,10)).padStart(4,'0'):'';
      }
      if(window.campDistrictCode && d.Group){
        d.DistrictCode=window.campDistrictCode(d.Group)||d.DistrictCode||'';
      }
      if(window.campTicketCode){
        d.TicketCode=window.campTicketCode(d)||'';
      }
      localStorage.setItem(KEY,JSON.stringify(d));
    }catch(e){}
  }

  window.CAMP_2026_STABILIZED=true;
  window.addEventListener('storage',normalizeLocal);
  document.addEventListener('visibilitychange',function(){
    if(!document.hidden)normalizeLocal();
  });
  setTimeout(normalizeLocal,0);
})();
