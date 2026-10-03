
(function(){
 window.CD_SPEAKER_TOPIC=window.CD_SPEAKER_TOPIC||{};
 var T=window.CD_SPEAKER_TOPIC;
 /* Modifier ici : lab = intitulé, titre, texte, chips = repères horaires */
 T['CR N’DAH Olivier']=T['CR N’DAH Olivier']||{lab:'Ce qu’il enseigne',titre:'Le leadership chrétien : servir et non dominer',texte:'Il montre comment un chef de troupe guide les autres à l’exemple de Jésus : par le service, l’humilité et le bon exemple plutôt que par l’autorité. Il présente aussi la synthèse et les recommandations aux chefs en fin de séminaire.',chips:['Séminaire des chefs','Module 6 · 11h55','Synthèse · 16h25']};
 T['CR TOUTOUKPO Pascal']=T['CR TOUTOUKPO Pascal']||{lab:'Ce qu’il enseigne',titre:'Les valeurs du mouvement F/L à travers les grands jeux',texte:'Il montre aux chefs de troupe comment intégrer les valeurs du mouvement Flambeaux/Lumières à travers les grands jeux.',chips:['Séminaire des chefs','Module 3 · 09h40','Vendredi 30 oct.']};
 T['Sapeurs-Pompiers']=T['Sapeurs-Pompiers']||{lab:'Ce qu’ils enseignent',titre:'Apprendre à protéger la vie',texte:'Ils expliquent la responsabilité du Flambeau/Lumière face à la protection de la vie.',chips:['Séminaire des chefs','Module 5 · 11h15','Vendredi 30 oct.']};
 T['Commissaire de Police']=T['Commissaire de Police']||{lab:'Ce qu’il enseigne',titre:'L’ordre et la rigueur : forces du Flambeau/Lumière engagé(e)',texte:'Il présente l’ordre et la rigueur comme des forces du Flambeau/Lumière engagé(e).',chips:['Séminaire des chefs','Module 7 · 13h30','Vendredi 30 oct.']};
 T['CR EMMANUEL']=T['CR EMMANUEL']||{lab:'Ce qu’il enseigne',titre:'Le Flambeau/Lumière, citoyen modèle pour sa communauté',texte:'Il montre comment le Flambeau/Lumière devient un citoyen modèle pour sa communauté.',chips:['Séminaire des chefs','Module 4 · 10h35','Vendredi 30 oct.']};
 T['CR YAO Olivier']=T['CR YAO Olivier']||{lab:'Ce qu’il enseigne',titre:'Organisation d’une troupe : rôles et responsabilités',texte:'Il présente l’organisation d’une troupe et le rôle de chaque responsable pour bien conduire les Flambeaux/Lumières.',chips:['Séminaire des chefs','Module 1 · 08h20','Vendredi 30 oct.']};
 T['CR Paul']=T['CR Paul']||{lab:'Ce qu’il enseigne',titre:'Jésus, modèle parfait de leader et de serviteur',texte:'Il présente Jésus comme le modèle parfait du leader et du serviteur pour les chefs de troupe.',chips:['Séminaire des chefs','Module 2 · 09h00','Vendredi 30 oct.']};
 T['CR FULBERT']=T['CR FULBERT']||{lab:'Ce qu’il enseigne',titre:'L’administration au sein du Mouvement Flambeaux & Lumières',texte:'Il présente l’administration au sein du Mouvement Flambeaux & Lumières, à partir du cas du District.',chips:['Séminaire des chefs','Module 8 · 14h10','Vendredi 30 oct.']};
 T['CTA Ev. Kouamé César']=T['CTA Ev. Kouamé César']||{lab:'Ce qu’il enseigne',titre:'« Va avec cette force que tu as »',texte:'Orateur principal du Camp, il porte les enseignements autour du thème de l’édition (Juges 6:14) pour encourager chaque participant à avancer avec courage, foi, discipline et engagement.',chips:['Orateur du Camp','Juges 6:14']};
 T['M. Soro Zie Abraham']=T['M. Soro Zie Abraham']||{lab:'Son rôle',titre:'Parrain de l’édition 2026',texte:'PDG de GLS, il accompagne le Camp de District 3 en 1 et soutient les participants dans cette édition.',chips:['Parrain du Camp','PDG de GLS']};
 T['CD YAO Joachim']=T['CD YAO Joachim']||{lab:'Son rôle',titre:'Coordination du Camp',texte:'PCO du Camp, il coordonne l’organisation et veille au bon déroulement du Camp de District 3 en 1.',chips:['PCO du Camp','Camp 2026']};
 function esc(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
 function cardPhoto(name){var cs=document.querySelectorAll('.ref-speakers .speaker-extra-card'),r=null;
  Array.prototype.forEach.call(cs,function(c){var h=c.querySelector('h3');if(h&&h.textContent.trim()===name){var im=c.querySelector('.speaker-extra-photo img');if(im&&im.getAttribute('src'))r=im.getAttribute('src')}});return r}
 function render(){
  var P=document.getElementById('presenter');if(!P||!P.classList.contains('cd-spk'))return;
  var body=document.querySelector('#presenter .portfolio-body'),nm=document.getElementById('portfolioSpeakerName');if(!body||!nm)return;
  var n=nm.textContent.trim(),d=T[n];
  var old=body.querySelector('.cd-sum');if(old)old.remove();
  var ph=document.getElementById('presenterSpeakerPhoto'),src=cardPhoto(n);
  if(ph&&src&&ph.getAttribute('src')!==src){ph.src=src;ph.hidden=false;var pl=document.getElementById('presenterSpeakerPlaceholder');if(pl)pl.style.display='none'}
  if(!d)return;
  var h=document.createElement('section');h.className='cd-sum';
  h.innerHTML='<small>'+esc(d.lab)+'</small><h3>'+esc(d.titre)+'</h3><p>'+esc(d.texte)+'</p>'+(d.chips&&d.chips.length?'<div class="cd-ch">'+d.chips.map(function(c){return '<i>'+esc(c)+'</i>'}).join('')+'</div>':'');
  var ex=document.getElementById('cdSpkExtra');if(ex)body.insertBefore(h,ex);else body.appendChild(h)}
 var nm=document.getElementById('portfolioSpeakerName');
 if(nm)new MutationObserver(function(){setTimeout(render,0)}).observe(nm,{childList:true,characterData:true,subtree:true});
 var op=window.openPresenter;
 if(typeof op==='function')window.openPresenter=function(t){var r=op.apply(this,arguments);if(t==='orateur'){setTimeout(render,10);setTimeout(render,120)}return r};
})();
