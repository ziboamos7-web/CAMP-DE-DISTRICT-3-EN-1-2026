
(function(){
  var g=document.getElementById('v39Speakers'),d=document.getElementById('v39Dots');if(!g||!d)return;
  var img=document.getElementById('v39MainImg'),ph=document.querySelector('#v39MainPhoto .speaker-extra-placeholder');
  if(img&&img.getAttribute('src')){img.hidden=false;if(ph)ph.style.display='none'}
  try{localStorage.removeItem('camp_speaker_photo')}catch(e){}
  var cards=g.querySelectorAll('.speaker-extra-card');
  cards.forEach(function(){d.appendChild(document.createElement('i'))});
  function upd(){var sl=g.scrollLeft,best=0,bd=1e9;cards.forEach(function(c,i){var x=Math.abs(c.offsetLeft-g.offsetLeft-sl);if(x<bd){bd=x;best=i}});
    if(g.scrollLeft+g.clientWidth>=g.scrollWidth-4)best=cards.length-1;
    d.querySelectorAll('i').forEach(function(e,i){e.classList.toggle('on',i===best)})}
  g.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});upd();
})();
