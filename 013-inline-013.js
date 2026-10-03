
function openSpeakerCard(i,name,role){
  if(typeof openExtraSpeakerProfile==='function') openExtraSpeakerProfile(i);
  const n=document.getElementById('portfolioSpeakerName'); if(n) n.textContent=name;
  const r=document.querySelector('.portfolio-role'); if(r) r.textContent=role;
  const card=document.getElementById('extraSpeakerPreview'+i), ph=document.getElementById('presenterSpeakerPhoto'), pl=document.getElementById('presenterSpeakerPlaceholder');
  if(card && !card.hidden && card.src && ph){ph.src=card.src;ph.hidden=false;if(pl)pl.style.display='none';}
  if(ph){if(i===15)ph.style.setProperty('object-position','50% 0%','important');else ph.style.removeProperty('object-position');}
  else if(ph){ph.hidden=true;ph.removeAttribute('src');if(pl)pl.style.display='flex';}
}
