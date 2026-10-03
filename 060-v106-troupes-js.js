
(function(){
 const g=document.getElementById('regGroup'),t=document.getElementById('regTroop');if(!g||!t)return;
 function filt(){const d=g.value;[...t.options].forEach((o,i)=>{if(i)o.hidden=!d||o.dataset.d!==d});
  const c=t.options[t.selectedIndex];if(t.value&&c&&c.hidden){t.value='';t.dispatchEvent(new Event('change',{bubbles:true}))}}
 window.v106Filter=filt;g.addEventListener('change',filt);filt();
})();
