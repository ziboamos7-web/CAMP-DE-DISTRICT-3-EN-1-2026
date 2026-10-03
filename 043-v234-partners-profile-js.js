
(function(){
  var P={
   'CHINO GROUP':{kick:'PARTENAIRE OFFICIEL',lab:'Partenaire officiel',titre:'CHINO GROUP International',
    texte:'Société à responsabilité limitée dirigée par Kouadio Yao Joachim, partenaire officiel du Camp de District 3 en 1.',
    chips:['SARL','Bouaflé'],
    secs:[['Dirigeant','Yao Kouadio Joachim, PDG'],
          ['Siège social','À l’angle et à l’opposé de la pharmacie La Providence de Bouaflé, en venant du marché public de Bouaflé ou de la COOPEC de Bouaflé.'],
          ['Activités','Commerce général, e-commerce, infographie, sérigraphie, photographie, services immobiliers et informatiques, élevage, marketing digital, agence web, développement web et d’applications, production et distribution audiovisuelle, prestations de services divers.']],
    wa:'2250747786828',wat:'0747786828',mail:'info@chino-group.com'},
   'SIAMS':{kick:'PARTENAIRE',lab:'Partenaire',titre:'Société Informatique Agréée Multi-Services',
    texte:'Nous concevons des solutions numériques sur mesure pour accompagner les entreprises, organisations et entrepreneurs dans leur transformation.',
    chips:['Informatique','Solutions numériques'],secs:[],
    wa:'2250506172317',wat:'0506172317',mail:'siamsci.client@gmail.com'},
   'Kam’s Multi-Services':{kick:'PARTENAIRE',lab:'Partenaire',titre:'Kam’s Multi-Services : partenaire créatif pour vos projets',
     texte:'Des créations modernes et percutantes pour valoriser votre image, vos événements et vos projets.',
     chips:['Créativité','Professionnalisme','Rapidité','Satisfaction'],
     secs:[['Affiche publicitaire','Affiches modernes et percutantes pour valoriser votre image.'],
           ['Musique personnalisée','Compositions uniques pour événements, mariages, pubs…'],
           ['Conception de logo','Identité visuelle professionnelle et distinctive.'],
           ['Prise de vue','Couverture vidéo/photo pro pour vos projets.'],
           ['Autres services','Montage vidéo, flyers, cartes de visite, réseaux sociaux, contenu digital, impression, conseil en communication.'],
           ['Valeurs','Créativité, professionnalisme, rapidité, satisfaction.']],
     tel:'0564339245',wa:'2250747153920',wat:'0747153920',mail:'manassesialou@gmail.com'},
   'CTA Ange':{kick:'SPONSOR OFFICIEL',lab:'Sponsor officiel',titre:'Sponsor officiel du Camp',
    texte:'CTA Ange soutient le Camp de District 3 en 1 en tant que sponsor officiel de cette édition.',
    chips:['Sponsor officiel','Camp 2026'],secs:[]}
  };
  function esc(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function clean(){document.querySelectorAll('#presenter .v234-ptn').forEach(function(e){e.remove()})}
  function add(name){
    var d=P[name],body=document.querySelector('#presenter .portfolio-body'),nm=document.getElementById('portfolioSpeakerName');
    if(!d||!body||!nm||nm.textContent.trim()!==name)return;
    clean();
    var t=document.getElementById('presenterTitle');if(t)t.textContent='Partenaire';
    var k=document.getElementById('presenterKicker');if(k)k.textContent=d.kick+' · ÉDITION 2026';
    var pk=document.querySelector('#presenterPortfolio .portfolio-kicker');if(pk)pk.textContent=d.kick+' · ÉDITION 2026';
    var w=document.createElement('div');w.className='v234-ptn';
    var h='<section class="v234-sum"><small>'+esc(d.lab)+'</small><h3>'+esc(d.titre)+'</h3><p>'+esc(d.texte)+'</p><div class="cd-ch">'+d.chips.map(function(c){return '<i>'+esc(c)+'</i>'}).join('')+'</div></section>';
    d.secs.forEach(function(x){h+='<section class="cd-sec"><small>'+esc(x[0])+'</small><p>'+esc(x[1])+'</p></section>'});
    if(d.wa)h+='<section class="cd-sec"><small>Contact</small><div class="v234-ct">'+(d.tel?'<a href="tel:'+esc(d.tel)+'">Appeler '+esc(d.tel)+'</a>':'')+'<a href="https://wa.me/'+d.wa+'" target="_blank" rel="noopener">WhatsApp '+esc(d.wat)+'</a><a href="mailto:'+esc(d.mail)+'">E-mail</a></div><div class="v234-mail">'+esc(d.mail)+'</div></section>';
    w.innerHTML=h;
    var ex=document.getElementById('cdSpkExtra');if(ex)body.insertBefore(w,ex);else body.appendChild(w);
  }
  var op=window.openPresenter;
  if(typeof op==='function')window.openPresenter=function(){clean();return op.apply(this,arguments)};
  var os=window.openSpeakerCard;
  if(typeof os==='function')window.openSpeakerCard=function(i,name,role){
    var r=os.apply(this,arguments);
    if(P[name]){[0,60,200,450].forEach(function(ms){setTimeout(function(){add(name)},ms)})}
    return r};
})();
