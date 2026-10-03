
function openPoster(){var v=document.getElementById('posterViewer');v.hidden=false;document.body.style.overflow='hidden';var n=document.getElementById('floatingAppNav');if(n)n.style.display='none';}
function closePoster(){var v=document.getElementById('posterViewer');v.hidden=true;document.body.style.overflow='';var n=document.getElementById('floatingAppNav');if(n)n.style.display='grid';}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closePoster();});
