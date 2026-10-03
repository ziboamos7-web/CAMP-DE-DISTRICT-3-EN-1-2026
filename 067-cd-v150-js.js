
(function(){
 var CH='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>';
 function cl(sel){var e=document.querySelector(sel);if(e)e.click();return !!e}
 function mk(fn,cls){var b=document.createElement('button');b.type='button';b.className='cd-bk'+(cls?' '+cls:'');b.setAttribute('aria-label','Retour');b.innerHTML=CH;
  b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();fn()});return b}
 function regBack(){var a=document.querySelector('#registrationOverlay .reg-step.active'),i=a?+a.getAttribute('data-step'):0,p=document.getElementById('regPrev');
  if(i>0&&p)p.click();else if(window.closeRegistration)closeRegistration()}
 function licBack(){var l=document.getElementById('cuLic'),g=null;
  if(l)Array.prototype.forEach.call(l.querySelectorAll('.nav button'),function(b){if(!g&&/retour|précédent|pr[ée]c/i.test(b.textContent))g=b});
  if(g)g.click();else cl('#cuLic [data-cl]')}
 var SPECS=[
  {h:'.presenter',pad:1,f:function(){if(window.closePresenter)closePresenter()}},
  {h:'.registration-head',first:1,f:regBack},
  {h:'#posterViewer',f:function(){if(window.closePoster)closePoster()}},
  {h:'.ps-sheet',pad:1,f:function(){cl('#ps .ps-close')}},
  {h:'#v49Ov',f:function(){if(window.closeTicket)closeTicket();else cl('#v49Ov')}},
  {h:'.v63-sh',pad:1,f:function(){cl('#v63X')}},
  {h:'.v69-lb',f:function(){cl('.v69-lb .c')}},
  {h:'#cuLb',f:function(){cl('#cuLb [data-cl]')}},
  {h:'#cuLic',flow:1,f:licBack},
  {h:'#cuPh .pa-top',f:function(){cl('#cuPh .pa-x')}},
  {h:'.cf-card',f:function(){cl('.cf-card .cf-x')}}
 ];
 function has(h){for(var i=0;i<h.children.length;i++){var c=h.children[i];if(c.classList.contains('cd-bk')||c.classList.contains('cd-bar'))return true}return false}
 function run(){SPECS.forEach(function(sp){var h=document.querySelector(sp.h);if(!h||has(h))return;var b=mk(sp.f);
  if(sp.pad)h.classList.add('cd-hb');
  if(sp.flow){var bar=document.createElement('div');bar.className='cd-bar';bar.appendChild(b);h.insertBefore(bar,h.firstChild)}
  else if(sp.first)h.insertBefore(b,h.firstChild);else h.appendChild(b)})}
 var raf=0;function sched(){if(!raf)raf=requestAnimationFrame(function(){raf=0;run()})}
 run();new MutationObserver(sched).observe(document.documentElement,{childList:true,subtree:true});

 /* Galerie : la vignette active reste visible */
 function syncTh(){var th=document.querySelector('.v69-th'),b=th&&th.querySelector('button.on');if(!b)return;
  th.scrollTo({left:th.scrollLeft+b.getBoundingClientRect().left-th.getBoundingClientRect().left-(th.clientWidth-b.clientWidth)/2,behavior:'smooth'})}
 document.addEventListener('scroll',function(e){if(e.target&&e.target.classList&&e.target.classList.contains('v69-tr'))setTimeout(syncTh,80)},true);
 document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.v69-g'))setTimeout(syncTh,400)},true);
 /* Fiche intervenant */
 function esc(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
 /* Pour ajouter plus tard : CD_SPEAKER_INFO['CTA Ev. Kouamé César']={fonction:'…',role:'…',eglise:'…',district:'…',parcours:'…',formation:'…',experience:'…',citation:'…'} */
 window.CD_SPEAKER_INFO=window.CD_SPEAKER_INFO||{};
 function renderExtra(){var box=document.getElementById('cdSpkExtra');if(!box)return;
  var n=((document.getElementById('portfolioSpeakerName')||{}).textContent||'').trim(),d=window.CD_SPEAKER_INFO[n]||{};
  var L=[['fonction','Titre / fonction'],['role','Rôle dans le mouvement'],['eglise','Église / assemblée'],['district','District / structure'],['parcours','Parcours'],['formation','Formation & compétences'],['experience','Expérience & engagement'],['citation','Parole de l’intervenant']],h='';
  L.forEach(function(x){var v=d[x[0]];if(v&&String(v).trim())h+='<section class="cd-sec"><small>'+x[1]+'</small><p>'+esc(v)+'</p></section>'});
  box.innerHTML=h;box.hidden=!h}
 function fixPhoto(){var i=document.getElementById('presenterSpeakerPhoto'),p=document.getElementById('presenterSpeakerPlaceholder');if(!i)return;
  function bad(){i.hidden=true;i.removeAttribute('src');if(p)p.style.display='flex'}
  if(!i.dataset.cdE){i.dataset.cdE='1';i.addEventListener('error',bad)}
  if(!i.hidden&&(!i.getAttribute('src')||(i.complete&&!i.naturalWidth)))bad()}
 var op=window.openPresenter;
 if(typeof op==='function')window.openPresenter=function(t){var r=op.apply(this,arguments),P=document.getElementById('presenter');
  if(P)P.classList.toggle('cd-spk',t==='orateur');fixPhoto();setTimeout(function(){fixPhoto();renderExtra()},0);return r};
 var nm=document.getElementById('portfolioSpeakerName');
 if(nm)new MutationObserver(renderExtra).observe(nm,{childList:true,characterData:true,subtree:true});
})();
