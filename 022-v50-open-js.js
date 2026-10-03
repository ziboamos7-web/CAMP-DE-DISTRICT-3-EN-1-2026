
(function(){
  var KEY='camp_registration_2026';
  var START=Date.UTC(2026,9,28),END=Date.UTC(2026,10,2);
  var sec=document.getElementById('v50Open');if(!sec)return;
  var T=document.getElementById('v50T'),S=document.getElementById('v50S'),M=document.getElementById('v50M'),B=document.getElementById('v50B'),BL=document.getElementById('v50BL'),SH=document.getElementById('v51Share');
  function reg(){var d=null;try{d=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}return d&&d.Name?d:null}
  function pills(list){M.textContent='';list.forEach(function(t){var s=document.createElement('span');s.textContent=t;M.appendChild(s)})}
  function setTitle(txt,check){
    T.textContent='';
    if(check){var ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('class','ic');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');var u=document.createElementNS(ns,'use');u.setAttribute('href','#i-check');svg.appendChild(u);T.appendChild(svg)}
    T.appendChild(document.createTextNode(txt));
  }
  function paint(){
    var now=Date.now(),d=reg(),days=Math.ceil((START-now)/86400000);
    sec.classList.remove('v50-urgent','v50-in');
    if(now>=END){sec.style.display='none';return}
    sec.style.display='';
    if(d){
      sec.style.display='none';return;
      sec.classList.add('v50-in');
      setTitle('Pré-commande validée',true);
      S.textContent=d.Name+(d.Pass?' · '+d.Pass.replace(' — ',' · '):'');
      pills(now<START?['Ticket prêt','J-'+days]:['Ticket prêt']);
      BL.textContent='Mon ticket';
      B.onclick=function(){if(window.openTicket)openTicket()};
      B.setAttribute('aria-label','Ouvrir mon ticket');
      return;
    }
    B.onclick=function(){if(window.openRegistration)openRegistration()};
    B.removeAttribute('aria-label');
    BL.textContent='Se pré-inscrire';
    pills(['Élément 7 000 F','Chef 8 000 F']);
    if(now>=START){
      setTitle('Le Camp est en cours',false);
      S.textContent='Pré-inscris-toi ici ou à l’accueil du Camp';
      return;
    }
    setTitle('Pré-inscriptions ouvertes',false);
    if(days<=1)S.textContent='Dernier jour : le Camp commence demain !';
    else if(days<=7){S.textContent='Plus que '+days+' jours pour réserver ta place';sec.classList.add('v50-urgent')}
    else S.textContent='Le Camp commence dans '+days+' jours · réserve ta place';
    if(days<=1)sec.classList.add('v50-urgent');
  }
  /* partage : feuille native, sinon WhatsApp */
  if(SH)SH.onclick=function(){
    var txt='Camp de District 3 en 1 — du 28 oct. au 1er nov. 2026, Collège FOHOUNDI, Garango. Élément 7 000 F · Chef 8 000 F. Pré-inscris-toi et viens avec nous !';
    var url=/^https?:/.test(location.protocol)?location.href.split('#')[0]:'';
    if(navigator.share){navigator.share(url?{title:'Camp de District 3 en 1',text:txt,url:url}:{title:'Camp de District 3 en 1',text:txt}).catch(function(){})}
    else{window.open('https://wa.me/?text='+encodeURIComponent(url?txt+' '+url:txt),'_blank','noopener')}
  };
  var os=window.saveRegistration;
  if(os)window.saveRegistration=function(e){var r=os.apply(this,arguments);paint();return r};
  window.addEventListener('storage',paint);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)paint()});
  setInterval(paint,60000);
  paint();
})();
