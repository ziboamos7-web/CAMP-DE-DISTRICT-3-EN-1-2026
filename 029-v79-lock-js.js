
(function(){
  var ACC='camp_accounts_2026',SES='camp_session_2026',REG='camp_registration_2026';
  function rd(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
  function registered(){
    var d=rd(REG);return !!(d&&d.Name&&d.Pass);
  }
  window.campIsRegistered=registered;
  var origReg=window.openRegistration,origAuth=window.openAuth;
  function toTicket(){if(window.openTicket)openTicket()}
  window.openRegistration=function(){
    if(registered()){toTicket();return}
    if(origReg)origReg.apply(this,arguments);
  };
  window.openAuth=function(m){
    if(registered()){toTicket();return}
    if(origAuth)origAuth.apply(this,arguments);
  };
  function setText(sel,i,t){var e=document.querySelectorAll(sel)[i||0];if(e)e.textContent=t}
  function paint(){
    var on=registered();
    document.documentElement.classList.toggle('camp-reg',on);
    if(!on)return;
    var q=document.querySelector('.mycamp-quick .quick-copy');
    if(q){var b=q.querySelector('b'),sm=q.querySelector('small');if(b)b.textContent='Mon ticket';if(sm)sm.textContent='Ma participation'}
    var nx=document.querySelector('.mycamp-next-card');
    if(nx){
      var h=nx.querySelector('h3'),p=nx.querySelector('p'),bt=nx.querySelector('button');
      if(h)h.textContent='Suis ton Camp';
      if(p)p.textContent='Ton ticket est prêt. Découvre le programme des cinq journées.';
      if(bt){bt.onclick=function(){if(window.openPresenter)openPresenter('programme')};bt.firstChild.textContent='Programme '}
    }
    var h2=document.querySelector('.profile-card small');
  }
  window.addEventListener('storage',paint);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)paint()});
  document.addEventListener('DOMContentLoaded',paint);
  paint();setInterval(paint,2000);
})();
