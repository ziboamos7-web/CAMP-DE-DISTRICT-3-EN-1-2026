
(function(){
  function clean(){try{var k='camp_registration_2026',d=JSON.parse(localStorage.getItem(k)||'null');if(d){delete d.TicketId;localStorage.setItem(k,JSON.stringify(d));}}catch(e){}}
  clean();
  var inp=document.getElementById('regTicketNumber');
  if(inp){inp.addEventListener('input',function(){var v=this.value.replace(/\D/g,'').slice(0,4);this.value=v;var n=parseInt(v||'0',10);if(v&&n>=1&&n<=1000)this.value=String(n).padStart(4,'0');});}
})();
