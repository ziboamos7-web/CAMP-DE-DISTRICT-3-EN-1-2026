
(function(){
  for(let i=2;i<=11;i++){
    const input=document.getElementById('extraSpeakerPhoto'+i);
    const img=document.getElementById('extraSpeakerPreview'+i);
    const card=input?.closest('.speaker-extra-card');
    const ph=card?.querySelector('.speaker-extra-placeholder');
    if(!input||!img) continue;
    const key='camp_extra_speaker_photo_'+i;
    const saved=(function(){try{localStorage.removeItem(key)}catch(e){}return null})();
    if(saved){img.src=saved;img.hidden=false;card?.classList.add('photo-ready');}
    input.addEventListener('change_locked',function(){
      const file=this.files?.[0];
      if(!file||!file.type.startsWith('image/')) return;
      const reader=new FileReader();
      reader.onload=()=>{img.src=reader.result;img.hidden=false;card?.classList.add('photo-ready');};
      reader.readAsDataURL(file);
    });
  }
})();
function shareExtraSpeaker(i,e){
  if(e)e.stopPropagation();
  const card=e&&e.target&&e.target.closest?e.target.closest('.speaker-extra-card'):null;
  const g=s=>{const x=card&&card.querySelector(s);return x?x.textContent.trim():''};
  const isParrain=(i===5),isMarr=(i===15);
  const lines=[isParrain?'PARRAIN DU CAMP':isMarr?'MARRAINE DU FOOTBALL':'INTERVENANT',g('h3'),g('.speaker-extra-info p')||g('p'),'Camp de District 3 en 1 · du 28 oct. au 1er nov. 2026 · Collège FOHOUNDI Garango, Bouaflé'].filter(Boolean);
  cdShare((isParrain?'Parrain':isMarr?'Marraine':'Intervenant')+' — Camp de District 3 en 1',lines.join('\n'));
}
function openExtraSpeakerProfile(i){
  const original=window.openPresenter;
  if(typeof original==='function') original('orateur');
  const title=document.getElementById('presenterTitle');
  const kicker=document.getElementById('presenterKicker');
  const role=document.getElementById('presenterRole');
  const isParrain=(i===5),isMarr=(i===15);
  if(title) title.textContent=isParrain?'Parrain':isMarr?'Marraine':'Intervenant '+i;
  if(kicker) kicker.textContent=(isParrain?'PARRAIN':isMarr?'MARRAINE':'INTERVENANT')+' · ÉDITION 2026';
  const pKick=document.querySelector('#presenterPortfolio .portfolio-kicker'); if(pKick) pKick.textContent=(isParrain?'PARRAIN':isMarr?'MARRAINE':'INTERVENANT')+' · ÉDITION 2026';
  if(role) role.textContent='Profil à compléter';
}
