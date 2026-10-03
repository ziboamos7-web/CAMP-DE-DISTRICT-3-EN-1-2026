
(function(){
var root=document.getElementById('v193Plus');if(!root)return;
var TL={CLJ:'Comité Local de Jeunesse',SCP:'Sous-chef de Patrouille',CP:'Chef de Patrouille',CTA:'Chef de Troupe adjoint',CT:'Chef de Troupe',CD:'Commissaire de District',CR:'Commissaire de région',CNA:'Commissaire National Adjoint',CN:'Commissaire National'};
var IC={ok:'<path d="M5 12.5l4.5 4.5L19 7"/>',pin:'<path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>',
ph:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
cam:'<path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',user:'<circle cx="12" cy="8.5" r="3.6"/><path d="M5 20c1-4 4-5.5 7-5.5s6 1.5 7 5.5"/>'};
function ico(k){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+IC[k]+'</svg>'}
function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function reg(){try{var h=window.__v188;if(h&&h.reg)return h.reg()}catch(e){}try{return JSON.parse(localStorage.getItem('camp_registration_2026')||'null')}catch(e){return null}}
function phone(v){var n=String(v||'').replace(/\D/g,'').replace(/^225/,'');return n.length===10?'+225 '+n.replace(/(\d{2})(?=\d)/g,'$1 ').trim():(n?'+225 '+n:'')}
function upgrade(){var hero=root.querySelector('#pHero');if(!hero||hero.getAttribute('data-rh'))return;hero.setAttribute('data-rh','1');
 var d=reg(),ok=!!(d&&d.Name),nm=hero.querySelector('.p-nm');
 if(nm){var t=(ok&&d.Title&&TL[d.Title])?d.Title:'',txt=nm.textContent;
  nm.innerHTML=(t?'<span class="rh-t" title="'+esc(TL[t])+'">'+esc(t)+'</span>':'')+'<span class="rh-n">'+esc(txt)+'</span>';
  var role=ok?[t?TL[t]:'',d.Branch].filter(Boolean).join(' · '):'';
  if(role)nm.insertAdjacentHTML('beforeend','<small class="rh-r">'+esc(role)+'</small>');
  nm.setAttribute('aria-label',(t?t+' ':'')+txt);hero.classList.toggle('rh-l1',txt.length>=15&&txt.length<22);hero.classList.toggle('rh-l2',txt.length>=22)}
 var tr=ok?[d.Troop,d.Group].filter(Boolean).filter(function(x,i,a){return a.indexOf(x)===i}).join(' · '):'';
 var h1=ok?'<span class="rh-p rh-ok">'+ico('ok')+'<span class="rh-x">Pré-inscrit(e) · Camp Garango 2026</span></span>':'<button type="button" class="rh-p rh-go" data-c="reg">'+ico('user')+'<span class="rh-x">Se préinscrire pour le camp</span></button>';
 var h2='';if(tr)h2+='<span class="rh-p">'+ico('pin')+'<span class="rh-x">'+esc(tr)+'</span></span>';
 var ph=ok?phone(d.Phone):'';if(ph)h2+='<span class="rh-p" style="flex:none">'+ico('ph')+'<span class="rh-x">'+esc(ph)+'</span></span>';
 var h='<div class="rh-row">'+h1+'</div>'+(h2?'<div class="rh-row">'+h2+'</div>':'');
 hero.insertAdjacentHTML('beforeend','<div class="rh-info">'+h+'</div><button type="button" class="rh-cv" data-c="cvadd" aria-label="Changer ma couverture">'+ico('cam')+'<span>Couverture</span></button>')}
new MutationObserver(upgrade).observe(root,{childList:true});upgrade();
})();
