
/* V120 — CUFLB : navigation des onglets */
(function(){
  const bar=document.querySelector('#screenMatchs .champ-tabs');if(!bar)return;
  const tabs=[...bar.querySelectorAll('.champ-tab')];
  const center=t=>{try{t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',inline:'center',block:'nearest'})}catch(e){}};
  tabs.forEach(t=>{t.tabIndex=t.classList.contains('active')?0:-1;t.addEventListener('click',()=>{tabs.forEach(x=>x.tabIndex=x===t?0:-1);center(t);try{sessionStorage.setItem('cuflb_tab',t.dataset.champTab)}catch(e){}})});
  bar.addEventListener('keydown',e=>{const i=tabs.indexOf(document.activeElement);if(i<0)return;let n=-1;
    if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;
    if(n>=0){e.preventDefault();tabs[n].focus();tabs[n].click()}});
  try{const k=sessionStorage.getItem('cuflb_tab');const t=k&&tabs.find(x=>x.dataset.champTab===k);if(t&&!t.classList.contains('active'))setTimeout(()=>t.click(),0)}catch(e){}
})();
