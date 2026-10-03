
(function(){
  var DAY=86400000,START=Date.UTC(2026,9,28),END=Date.UTC(2026,10,2),OPEN=Date.UTC(2026,8,28),KEY='camp_registration_2026';
  var tm=(location.search||'').match(/[?&]cdtest=(\d+)/);
  if(tm){START=Date.now()+(+tm[1])*1000;END=START+5*DAY;OPEN=START-30*DAY}
  function $(i){return document.getElementById(i)}
  var card=$('v51Cd');if(!card)return;
  var title=$('v51Title'),grid=$('v51Grid'),sub=$('v51Sub'),dots=$('v51Days'),ag=$('v51Ag'),prog=$('v55Prog'),fill=$('v55Fill'),pct=$('v55P'),track=$('v55Track'),marks=$('v56Marks'),head=$('v56Head'),nextEl=$('v56Next'),numEl=$('v56Num');
  var boxes=[$('cdDays'),$('cdHours'),$('cdMinutes'),$('cdSeconds')];
  var labels=[].map.call(grid.querySelectorAll('.cd-box span'),function(x){return x});
  var rings=[].slice.call(grid.querySelectorAll('.v56-ring'));
  var last=['','','',''],lastLab=['','','',''],lastPhase='',lastAria='',lastDay=-1,lastPct=-1,lastHead=-1,lastFact=-1,lastNum=-1,lastNext='',lastP=[-1,-1,-1,-1],timer=0,first=true,raf=0,inView=true;
  var calm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  var MK=[21,14,7,3,1],SPAN=(START-OPEN)/DAY,mkEls=[];
  MK.forEach(function(k){var e=document.createElement('i');e.className='v56-mk';e.title='J-'+k;e.style.left=((1-k/SPAN)*100)+'%';marks.appendChild(e);mkEls.push(e)});
  function pad(n){return String(n).padStart(2,'0')}
  function pl(n,s,p){return n===1?s:p}
  function fmt(n){return n.toLocaleString('fr-FR')}
  function isReg(){try{var d=JSON.parse(localStorage.getItem(KEY)||'null');return !!(d&&d.Name)}catch(e){return false}}
  /* chiffres à défilement */
  function mkDg(){var s=document.createElement('v-d');s.className='v56-dg';var c=document.createElement('v-c');c.className='v56-c';s.appendChild(c);return s}
  boxes.forEach(function(el){var v=el.textContent||'00';el.textContent='';el._d=[];for(var i=0;i<2;i++){var d=mkDg();el.appendChild(d);el._d.push(d);d.firstChild.textContent=v.charAt(i)}});
  function setDigit(dg,ch,anim){
    var cur=dg.lastChild;if(cur.textContent===ch)return;
    if(!anim||calm||!dg.animate){cur.textContent=ch;return}
    var n=document.createElement('v-c');n.className='v56-c';n.textContent=ch;dg.appendChild(n);
    n.animate([{transform:'translateY(70%)',opacity:0,filter:'blur(3px)'},{transform:'none',opacity:1,filter:'blur(0)'}],{duration:340,easing:'cubic-bezier(.2,.9,.3,1.2)'});
    var o=cur.animate([{transform:'none',opacity:1},{transform:'translateY(-70%)',opacity:0,filter:'blur(3px)'}],{duration:260,easing:'ease-in',fill:'forwards'});
    o.onfinish=function(){if(cur.parentNode)cur.remove()};
  }
  function setDigits(el,str,anim){
    while(el._d.length<str.length){var d=mkDg();el.insertBefore(d,el.firstChild);el._d.unshift(d)}
    for(var i=0;i<el._d.length;i++)setDigit(el._d[i],str.charAt(i)||'0',anim);
  }
  function setSub(html,idx){
    if(sub._h===html&&idx===lastFact)return;
    var chg=idx!==lastFact;sub._h=html;lastFact=idx;sub.innerHTML='<span>'+html+'</span>';
    if(chg&&!calm&&!first&&sub.animate)sub.animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:400,easing:'ease-out'});
  }
  function calc(now){
    if(now<START)return{phase:'pre',diff:START-now,span:START-OPEN};
    if(now<END)return{phase:'live',diff:END-now,span:END-START};
    return{phase:'post',diff:0,span:1};
  }
  /* anneaux qui se vident en continu */
  function paintRings(now,c){
    var ms=calm?Math.floor(c.diff/1000)*1000:c.diff;
    var v=c.phase==='post'?[0,0,0,0]:[Math.min(1,c.diff/c.span),(ms%DAY)/DAY,(ms%3600000)/3600000,(ms%60000)/60000];
    for(var i=0;i<4;i++){var p=Math.round(v[i]*1000)/10;if(p!==lastP[i]){lastP[i]=p;rings[i].style.setProperty('--p',p)}}
  }
  function frame(){raf=0;if(!inView||document.hidden)return;var n=Date.now();paintRings(n,calc(n));raf=requestAnimationFrame(frame)}
  function kick(){if(!raf&&inView&&!document.hidden&&!calm)raf=requestAnimationFrame(frame)}
  if('IntersectionObserver' in window)new IntersectionObserver(function(e){inView=e[0].isIntersecting;kick()}).observe(card);
  /* confettis au décollage */
  function confetti(){
    var cv=$('v56Fx');if(calm||!cv||!cv.getContext)return;
    var r=card.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);
    cv.width=r.width*dpr;cv.height=r.height*dpr;var c=cv.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);
    var cols=['#ff8a1f','#ffd76a','#ffffff','#7dffb3','#b98cff','#ff5a8a'],P=[],i;
    for(i=0;i<120;i++)P.push({x:r.width/2,y:r.height*.35,vx:(Math.random()-.5)*11,vy:-Math.random()*11-3,g:.28+Math.random()*.12,s:4+Math.random()*5,r:Math.random()*6.28,vr:(Math.random()-.5)*.4,c:cols[i%cols.length]});
    var t0=performance.now();
    (function f(t){
      var e=t-t0;c.clearRect(0,0,r.width,r.height);
      P.forEach(function(p){p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.vx*=.992;p.r+=p.vr;c.save();c.translate(p.x,p.y);c.rotate(p.r);c.globalAlpha=Math.max(0,1-e/3800);c.fillStyle=p.c;c.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);c.restore()});
      if(e<3800)requestAnimationFrame(f);else c.clearRect(0,0,r.width,r.height);
    })(t0);
  }
  function celebrate(){
    confetti();
    if(navigator.vibrate&&!calm)try{navigator.vibrate([80,40,80,40,220])}catch(e){}
    card.classList.add('v56-go');setTimeout(function(){card.classList.remove('v56-go')},3800);
  }
  function tick(){
    var now=Date.now(),c=calc(now),phase=c.phase,diff=c.diff;
    var d=Math.floor(diff/DAY),h=Math.floor(diff%DAY/3600000),m=Math.floor(diff%3600000/60000),s=Math.floor(diff%60000/1000);
    var vals=[pad(d),pad(h),pad(m),pad(s)],labs=[pl(d,'JOUR','JOURS'),pl(h,'HEURE','HEURES'),'MIN','SEC'];
    for(var i=0;i<4;i++){
      if(vals[i]!==last[i]){setDigits(boxes[i],vals[i],phase!=='post'&&!first);last[i]=vals[i]}
      if(labs[i]!==lastLab[i]){labels[i].textContent=labs[i];lastLab[i]=labs[i]}
    }
    if(phase!==lastPhase){
      if(lastPhase==='pre'&&phase==='live')celebrate();
      lastPhase=phase;
      card.classList.toggle('v51-live',phase==='live');
      card.classList.toggle('v51-done',phase==='post');
      title.textContent=phase==='pre'?'LE CAMP COMMENCE DANS':phase==='live'?'LE CAMP EST EN COURS · FIN DANS':'ÉDITION 2026 TERMINÉE';
      dots.hidden=phase!=='live';
      prog.hidden=phase!=='pre';
      ag.hidden=phase==='post';
      lastDay=-1;lastPct=-1;lastHead=-1;
    }
    card.classList.toggle('v51-hot',phase==='pre'&&diff<DAY);
    /* décompte final 10 → 1 */
    var fin=phase==='pre'&&diff<=10000;
    card.classList.toggle('v56-fin',fin);
    if(fin){
      var num=Math.ceil(diff/1000);
      if(num!==lastNum){
        lastNum=num;numEl.textContent=num;
        if(!calm&&numEl.animate)numEl.animate([{transform:'scale(1.5)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:380,easing:'cubic-bezier(.2,.9,.3,1.2)'});
        if(navigator.vibrate&&!calm)try{navigator.vibrate(num<=3?70:25)}catch(e){}
      }
    }else lastNum=-1;
    var dn=0;
    if(phase==='pre'){
      var reg=isReg(),msg;
      if(fin)msg='<b>Respire… ça commence !</b>';
      else if(diff<DAY)msg='<b>Ça y est, c’est presque l’heure !</b>';
      else if(d<7)msg=reg?'<b>Ticket prêt</b> · plus que '+d+' '+pl(d,'jour','jours')+' avant le départ':'<b>Dernière semaine</b> · pense à te pré-inscrire';
      else if(d<14&&reg)msg='<b>Ticket prêt</b> · prépare ton sac';
      else msg='Du <b>mercredi 28 oct.</b> au <b>dimanche 1er nov. 2026</b> · Garango';
      var facts=[msg];
      if(!fin){
        facts.push('<b>5 jours</b> · 2 formules dès 7 000 F · Bouaflé');
        if(diff>=DAY){var nn=Math.ceil(diff/DAY);facts.push('<b>'+nn+' '+pl(nn,'nuit','nuits')+'</b> à dormir avant le grand départ')}
        var hh=Math.floor(diff/3600000);
        facts.push('Soit <b>'+fmt(hh)+' '+pl(hh,'heure','heures')+'</b> à patienter');
        facts.push('Soit <b>'+fmt(Math.floor(diff/1000))+' secondes</b> exactement');
      }
      var fi=Math.floor(now/6000)%facts.length;
      setSub(facts[fi],fi);
      var dIdx=Math.max(0,Math.min(Math.round(SPAN),Math.floor((now-OPEN)/DAY))),p=Math.max(0,Math.min(1,dIdx/SPAN)),pc=Math.round(p*100),ph=Math.round(p*1000);
      if(pc!==lastPct){lastPct=pc;pct.textContent=pc+' %';track.setAttribute('aria-valuenow',pc)}
      if(ph!==lastHead){lastHead=ph;curP=p;prog.style.setProperty('--np',p.toFixed(3));if(!walking){head.style.left=(p*100)+'%';fill.style.transform='scaleX('+p.toFixed(4)+')'}if(!first)walk()}
      var nx=0;
      MK.forEach(function(k,i){var on=now>=START-k*DAY;if(mkEls[i].classList.contains('on')!==on)mkEls[i].classList.toggle('on',on);if(!on&&!nx)nx=k});
      var nt;
      if(nx){var ms=START-nx*DAY-now;nt='Prochain palier · <b>J-'+nx+'</b> · dans '+(ms<DAY?Math.max(1,Math.ceil(ms/3600000))+' h':Math.ceil(ms/DAY)+' j')}
      else nt='Ligne droite finale · <b>J-1</b> franchi';
      if(nt!==lastNext){lastNext=nt;nextEl.innerHTML=nt}
    }else if(phase==='live'){
      dn=Math.min(5,Math.floor((now-START)/DAY)+1);
      if(dn!==lastDay){lastDay=dn;[].forEach.call(dots.children,function(el,i){el.className=i+1<dn?'done':i+1===dn?'on':''})}
      setSub('<b>Jour '+dn+' sur 5</b> · Collège FOHOUNDI, Garango',0);
    }else{
      setSub('Merci à tous. <b>Rendez-vous à la prochaine édition !</b>',0);
    }
    var capD=$('v53DaysCap'),boxD=$('v53BoxDays');
    if(capD){var ct=phase==='live'?'Jour '+dn+' en cours':phase==='post'?'terminé':'mer. → dim.';if(capD._t!==ct){capD._t=ct;capD.textContent=ct}}
    if(boxD)boxD.classList.toggle('v53-now',phase==='live');
    var aria=phase==='post'?'Le Camp 2026 est terminé':(phase==='pre'?'Le Camp commence dans ':'Fin du Camp dans ')+d+' '+pl(d,'jour','jours')+', '+h+' '+pl(h,'heure','heures')+' et '+m+' '+pl(m,'minute','minutes');
    if(aria!==lastAria){lastAria=aria;grid.setAttribute('aria-label',aria)}
    paintRings(now,c);
    first=false;
  }
  var curP=0,walking=false,lastWalk=0;
  function walk(){
    if(walking||lastPhase!=='pre')return;
    if(calm||!head.animate){head.style.left=(curP*100)+'%';fill.style.transform='scaleX('+curP.toFixed(4)+')';return}
    walking=true;lastWalk=Date.now();
    var p=curP,D=Math.round(Math.min(5200,2200+p*7000)),ez='cubic-bezier(.4,.05,.55,.95)';
    head.style.transition='none';fill.style.transition='none';head.style.left='0%';fill.style.transform='scaleX(0)';void head.offsetWidth;
    head.style.transition='left '+D+'ms '+ez;fill.style.transition='transform '+D+'ms '+ez;
    head.classList.add('v212-walk');
    head.style.left=(p*100)+'%';fill.style.transform='scaleX('+p.toFixed(4)+')';
    setTimeout(function(){head.classList.remove('v212-walk');head.style.transition='';fill.style.transition='';walking=false;head.style.left=(curP*100)+'%';fill.style.transform='scaleX('+curP.toFixed(4)+')'},D+150);
  }
  (function(){
    var sc=$('v58Scene');if(!sc)return;
    if('IntersectionObserver' in window)new IntersectionObserver(function(en){if(en[0].isIntersecting&&Date.now()-lastWalk>25000)walk()},{threshold:.6}).observe(sc);
    else setTimeout(walk,700);
    document.addEventListener('visibilitychange',function(){if(!document.hidden&&Date.now()-lastWalk>60000){var r=sc.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)walk()}});
  })();
  function loop(){tick();timer=setTimeout(loop,1005-Date.now()%1000)}
  document.addEventListener('visibilitychange',function(){clearTimeout(timer);if(!document.hidden){loop();kick()}});
  ag.onclick=function(){
    var st=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'');
    var L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Camp District 3 en 1//FR','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:camp-district-3en1-2026@camp','DTSTAMP:'+st,'DTSTART;VALUE=DATE:20261028','DTEND;VALUE=DATE:20261102','SUMMARY:Camp de District 3 en 1','LOCATION:Collège FOHOUNDI\\, Garango','DESCRIPTION:Du 28 oct. au 1er nov. 2026. Formules : Élément 7 000 F · Chef 8 000 F.','BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:Le Camp commence demain !','END:VALARM','END:VEVENT','END:VCALENDAR'];
    try{
      var blob=new Blob([L.join('\r\n')],{type:'text/calendar;charset=utf-8'}),a=document.createElement('a');
      a.href=URL.createObjectURL(blob);a.download='Camp-District-3-en-1-2026.ics';document.body.appendChild(a);a.click();
      setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1500);
    }catch(e){
      window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Camp de District 3 en 1')+'&dates=20261028/20261102&location='+encodeURIComponent('Collège FOHOUNDI, Garango'),'_blank','noopener');
    }
  };
  loop();kick();
})();
