
(function(){
 var root=document.getElementById('v193Plus');if(!root)return;
 var I={tk:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 6v12"/>',cal:'<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M8 2.5v4M16 2.5v4M3 10h18"/>',share:'<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1"/>',help:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>'};
 function reg(){try{var h=window.__v188,r=h&&h.reg?h.reg():null;return r&&r.Pass?r:null}catch(e){return null}}
 function bag(){try{return JSON.parse(localStorage.getItem('camp_checklist_2026')||'[]').length}catch(e){return 0}}
 function go(k){var b=root.querySelector('.p-row[data-a="'+k+'"]')||(k==='tk'?root.querySelector('.p-row[data-a="reg"]'):null);if(b)b.click()}
 function inject(){
  var bd=root.querySelector('.p-body');if(!bd||bd.querySelector('#q8'))return;
  var d=reg(),dl=Math.ceil((new Date(2026,9,28)-new Date())/864e5),
   c1=dl>0?['J-'+dl,'avant le Camp','lieu','']:(new Date()<new Date(2026,10,2)?['En cours','Camp ouvert','lieu','ok']:['Terminé','Merci !','lieu','']),
   c2=d?['Validée','ma pré-inscription','reg','ok']:['À faire','ma pré-inscription','reg','td'],
   c3=[bag()+'/8','sac prêt','chk',''];
  function st(c){return '<button type="button" data-g="'+c[2]+'"><b class="'+c[3]+'">'+c[0]+'</b><small>'+c[1]+'</small></button>'}
  function qa(k,l,col,ic){return '<button type="button" data-g="'+k+'" style="--c:'+col+'"><i style="background:'+col+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+I[ic]+'</svg></i>'+l+'</button>'}
  var e=document.createElement('div');e.className='q8';e.id='q8';
  e.innerHTML='<div class="q8-st">'+st(c1)+st(c2)+st(c3)+'</div><div class="q8-qa">'+qa('tk','Ticket','#7c4dff','tk')+qa('agenda','Agenda','#5b6ee1','cal')+qa('share','Inviter','#0ea5a4','share')+qa('help','Aide','#e8650a','help')+'</div>';
  e.addEventListener('click',function(ev){var b=ev.target.closest('[data-g]');if(b)go(b.dataset.g)});
  bd.insertBefore(e,bd.firstChild);
  var sb=root.querySelector('.p-sb');if(sb&&d&&!sb.querySelector('.q8-bd'))sb.insertAdjacentHTML('afterend','<p class="q8-bd" style="position:absolute;z-index:2;top:240px;left:50%;transform:translateX(-50%);margin:0;white-space:nowrap;opacity:calc(1 - var(--p)*3)">✓ Pré-inscrit(e) · Camp Garango 2026</p>');
 }
 new MutationObserver(inject).observe(root,{childList:true});inject();
})();
