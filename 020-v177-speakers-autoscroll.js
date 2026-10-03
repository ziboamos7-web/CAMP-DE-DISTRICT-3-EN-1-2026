
/* V177 — « Ils portent le Camp » défile tout seul toutes les 1 s */
(function(){
  var g=document.getElementById('v39Speakers');if(!g)return;
  var cards=g.querySelectorAll('.speaker-extra-card');if(cards.length<2)return;
  var DELAY=1500,PAUSE=3000,timer=null,visible=true,held=false,resumeT=null;
  function cur(){var gl=g.getBoundingClientRect().left,best=0,bd=1e9;
    cards.forEach(function(c,i){var x=Math.abs(c.getBoundingClientRect().left-gl);if(x<bd){bd=x;best=i}});
    return best}
  function goTo(i){var gl=g.getBoundingClientRect().left,cl=cards[i].getBoundingClientRect().left;
    g.scrollTo({left:g.scrollLeft+(cl-gl),behavior:'smooth'})}
  function next(){
    if(!visible||held||document.hidden)return;
    var atEnd=g.scrollLeft+g.clientWidth>=g.scrollWidth-4;
    goTo(atEnd?0:(cur()+1)%cards.length)}
  function start(){stop();timer=setInterval(next,DELAY)}
  function stop(){if(timer){clearInterval(timer);timer=null}}
  function hold(){held=true;clearTimeout(resumeT);stop()}
  function release(){clearTimeout(resumeT);resumeT=setTimeout(function(){held=false;start()},PAUSE)}
  g.addEventListener('touchstart',hold,{passive:true});
  g.addEventListener('touchend',release,{passive:true});
  g.addEventListener('touchcancel',release,{passive:true});
  g.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')hold()});
  g.addEventListener('pointerup',function(e){if(e.pointerType==='mouse')release()});
  g.addEventListener('wheel',function(){hold();release()},{passive:true});
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(en){visible=en[0].isIntersecting},{threshold:.3}).observe(g)}
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&!held)start()});
  start();
})();
