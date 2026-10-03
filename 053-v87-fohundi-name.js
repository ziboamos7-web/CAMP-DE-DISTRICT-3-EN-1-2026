
(function(){
 const original=window.openPresenter;
 if(typeof original!=='function')return;
 window.openPresenter=function(type){
   const result=original.apply(this,arguments);
   const panel=document.getElementById('presenter');
   if(panel){panel.classList.toggle('presenter-lieu',type==='lieu');}
   if(type==='lieu'){
     const title=document.getElementById('presenterTitle');
     const text=document.getElementById('presenterText');
     const detail=document.getElementById('presenterDetail');
     if(title)title.textContent='Collège FOHOUNDI';
     if(text)text.textContent='Le Camp se tiendra à Bouaflé, au Collège FOHOUNDI.';
     if(detail)detail.textContent='FOHOUNDI · COLLÈGE FOHOUNDI';
     document.querySelectorAll('#presenterMap .map-label strong').forEach(x=>x.textContent='Collège FOHOUNDI');
     document.querySelectorAll('#presenterMap .map-label small').forEach(x=>x.textContent='Bouaflé');
     document.querySelectorAll('#presenter .v69-loc b').forEach(x=>x.textContent='Collège FOHOUNDI');
     document.querySelectorAll('#presenter .v69-loc small').forEach(x=>x.textContent='Bouaflé · Lieu du Camp');
   }
   return result;
 };
})();
