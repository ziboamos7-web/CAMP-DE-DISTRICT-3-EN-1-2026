
/* V20.3 — interactions Championnat */
(function(){
  const tabs=document.querySelectorAll('.champ-tab');
  const panels=document.querySelectorAll('.champ-panel');
  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    const key=tab.dataset.champTab;
    tabs.forEach(t=>{const active=t===tab;t.classList.toggle('active',active);t.setAttribute('aria-selected',active?'true':'false')});
    panels.forEach(p=>p.classList.toggle('active',p.dataset.champPanel===key));
  }));
  document.querySelectorAll('.champ-event-card').forEach(card=>card.addEventListener('click',()=>{
    const data={
      football:['TOURNOI DE FOOTBALL','31 OCT. → 01 NOV. 2026','Équipes : Éléments & Chefs','Terrain du collège'],
      esport:['TOURNOI E-SPORT','30 OCTOBRE 2026','FIFA 26 · PlayStation','Salle multimédia'],
      course:["COURSE D'ORIENTATION",'29 OCTOBRE 2026','Équipes mixtes','Site du Camp'],
      teams:['DÉFIS DES ÉQUIPES','28 OCT. → 01 NOV. 2026','Compétitions par secteur','Site du Camp']
    }[card.dataset.event];
    if(!data || typeof openPresenter!=='function') return;
    openPresenter('presentation');
    setTimeout(()=>{
      const title=document.getElementById('presenterTitle'), text=document.getElementById('presenterText'), detail=document.getElementById('presenterDetail'), kicker=document.getElementById('presenterKicker');
      if(title) title.textContent=data[0];
      if(kicker) kicker.textContent='CUFLB';
      if(text) text.textContent=data[1]+' · '+data[2];
      if(detail) detail.textContent=data[3]+' · PROGRAMME À VENIR';
    },20);
  }));
})();
