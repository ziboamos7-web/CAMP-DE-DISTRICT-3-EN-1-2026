
(function(){
 var LSg=function(k){try{return localStorage.getItem(k)}catch(e){return null}},LSs=function(k,v){try{localStorage.setItem(k,v)}catch(e){}};
 var ov=document.createElement('div');ov.className='v187-ov';ov.id='v187Ov';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');
 ov.addEventListener('click',function(e){if(e.target===ov)close()});document.body.appendChild(ov);
 function close(){ov.classList.remove('open');ov.innerHTML='';document.body.style.overflow=''}
 function open(kicker,title,html){ov.innerHTML='<div class="v187-sh"><div class="v187-gr"></div><div class="v187-hd"><div><small>'+kicker+'</small><h3>'+title+'</h3></div><button type="button" class="v187-x" aria-label="Fermer">×</button></div>'+html+'</div>';
  ov.querySelector('.v187-x').onclick=close;ov.classList.add('open');document.body.style.overflow='hidden'}
 var ov0=navigator.vibrate&&navigator.vibrate.bind(navigator);
 if(ov0)try{navigator.vibrate=function(p){return LSg('camp_set_vibr')==='0'?false:ov0(p)}}catch(e){}
 function applyCalm(){document.documentElement.classList.toggle('v187-calm',LSg('camp_set_calm')==='1')}
 applyCalm();
 window.openContactSheet=function(){
  open('ASSISTANCE','Contact & Assistance','<p class="v187-p">Une question sur ta pré-inscription, ton ticket ou le Camp ? Appelle-nous ou écris-nous sur WhatsApp.</p>'
  +'<a class="v187-b" href="tel:+2250748492324"><i>📞</i><span>Appeler<small>+225 07 48 49 23 24</small></span></a>'
  +'<a class="v187-b" href="tel:+2250747153920"><i>📞</i><span>Appeler<small>+225 07 47 15 39 20</small></span></a>'
  +'<a class="v187-b wa" href="https://wa.me/2250506172317" target="_blank" rel="noopener"><i>💬</i><span>Écrire sur WhatsApp<small>Réponse rapide</small></span></a>')};
 window.openSettingsSheet=function(){
  function row(key,def,ic,t,sub){var on=(LSg(key)||def)==='1';return '<button type="button" class="v187-b" data-k="'+key+'" aria-pressed="'+on+'"><i>'+ic+'</i><span>'+t+'<small>'+sub+'</small></span><span class="v187-sw"></span></button>'}
  open('RÉGLAGES','Paramètres',row('camp_set_vibr','1','📳','Vibrations','Compte à rebours et j’aime')+row('camp_set_calm','0','🎞️','Réduire les animations','Interface plus calme et plus légère')
  +'<button type="button" class="v187-b dg" id="v187Rst"><i>🗑️</i><span>Effacer mes données<small>Supprime ma pré-inscription de cet appareil</small></span></button>');
  ov.querySelectorAll('[data-k]').forEach(function(b){b.onclick=function(){var k=b.dataset.k,on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);LSs(k,on?'1':'0');if(k==='camp_set_vibr'&&on&&navigator.vibrate)navigator.vibrate(30);applyCalm()}});
  ov.querySelector('#v187Rst').onclick=function(){if(confirm('Effacer ta pré-inscription et ton ticket de cet appareil ?')){try{localStorage.removeItem('camp_registration_2026');localStorage.removeItem('camp_registration_draft')}catch(e){}location.reload()}}};
 document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
 function wire(){document.querySelectorAll('#screenPlus .plus-menu button').forEach(function(b){var t=(b.querySelector('b')||{}).textContent||'';
  if(/^Galerie/.test(t))b.setAttribute('onclick',"openPresenter('lieu')");
  else if(/^Contact/.test(t))b.setAttribute('onclick','openContactSheet()');
  else if(/^Paramètres/.test(t))b.setAttribute('onclick','openSettingsSheet()');
  var sm=b.querySelector('small');if(sm&&/^Galerie/.test(t))sm.textContent='Photos du Collège FOHOUNDI';if(sm&&/^Paramètres/.test(t))sm.textContent='Vibrations, animations, données'})}
 wire();
})();
