
(function(){
  const key='camp_registration_2026';
  function getReg(){try{return JSON.parse(localStorage.getItem(key)||'null')}catch(e){return null}}
  function refresh(){
    const d=getReg(), title=document.getElementById('myCampStatusTitle'), text=document.getElementById('myCampStatusText'), btn=document.getElementById('myCampStatusBtn'), greet=document.getElementById('myCampGreeting');
    if(!title||!text||!btn)return;
    if(d&&d.Name){
      const first=d.Name.trim().split(/\s+/)[0]||'participant';
      if(greet)greet.textContent='Bonjour '+first;
      title.textContent='Pré-inscription enregistrée';
      text.textContent=(d.Pass||'Formule à préciser')+(d.Phone?' · '+d.Phone:'')+(d.Church?' · '+d.Church:'');
      btn.textContent='Mon ticket';
    }else{
      if(greet)greet.textContent='Bienvenue au Camp';
      title.textContent='Pas encore pré-inscrit';
      text.textContent='Enregistre ta participation pour retrouver ici tes informations.';
      btn.textContent='Se pré-inscrire';
    }
  }
  window.addEventListener('storage',refresh);
  document.addEventListener('DOMContentLoaded',refresh);
  const oldShow=window.showAppTab;
  if(oldShow) window.showAppTab=function(tab){oldShow(tab);if(tab==='camp')setTimeout(refresh,30)};
})();
