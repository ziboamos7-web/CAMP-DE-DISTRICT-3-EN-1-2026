

const presenterData = {
  presentation: {
    icon:'sparkle', kicker:'LE CAMP', title:'Découvrir le Camp',
    text:'Une expérience de cinq jours pensée autour de la foi, de la discipline, du service, de la fraternité et de l’engagement.',
    detail:'CAMP DE DISTRICT 3 EN 1 · ÉDITION 2026'
  },
  programme: {
    icon:'list', kicker:'PROGRAMME', title:'Les temps forts du Camp',
    text:'Retrouve ici les activités et les moments importants de chaque journée du Camp.',
    detail:'PROGRAMME DÉTAILLÉ · BIENTÔT DISPONIBLE'
  },
  actualites: {
    icon:'news', kicker:'À LA UNE', title:'Actualités du Camp',
    text:'Les annonces importantes du Camp seront présentées ici : informations pratiques, nouveautés et communications.',
    detail:'ESPACE ACTUALITÉS · MIS À JOUR PAR L’ORGANISATION'
  },
  participation: {
    icon:'check', kicker:'PARTICIPATION', title:'Participe au Camp',
    text:'Choisis ta formule et poursuis ta pré-inscription pour prendre part au Camp de District 3 en 1.',
    detail:'ÉLÉMENT : 7 000 F · CHEF : 8 000 F'
  },
  orateur: {
    icon:'mic', kicker:'ORATEUR DU CAMP', title:'CTA Ev. Kouamé César',
    text:'Découvre l’orateur mis à l’honneur pour cette édition du Camp de District 3 en 1.',
    detail:'ORATEUR · ÉDITION 2026'
  },
  rescom: {
    icon:'presentation', kicker:'ATELIER RESCOM · DEUX DISTRICTS', title:'Faire des deux districts une référence',
    text:'Un atelier destiné aux responsables communication pour apprendre, maîtriser et pratiquer un même standard d’image, de contenu et de diffusion.',
    detail:'JEUDI À PARTIR DE 22H → VENDREDI À 22H · 2 JOURS PLEINS · FORMATEUR : ÉQUIPE DE COMMUNICATION, REPRÉSENTÉE PAR CP ZIBO AMOS'
  },
  date: {
    icon:'clock', kicker:'DATES OFFICIELLES', title:'28 OCT. → 01 NOV. 2026',
    text:'Cinq jours pour vivre pleinement le Camp de District 3 en 1.',
    detail:'Du mercredi 28 octobre au dimanche 01 novembre 2026.'
  },
  lieu: {
    icon:'pin', kicker:'LIEU DU CAMP', title:'Collège FOHOUNDI Garango',
    text:'Le Camp se tiendra à Bouaflé, au Collège FOHOUNDI Garango.',
    detail:'BOUAFLÉ · COLLÈGE FOHOUNDI GARANGO'
  },
  theme: {
    icon:'book', kicker:'THÈME 2026', title:'Va avec cette force que tu as',
    text:'Le thème du Camp invite chaque participant à avancer avec courage, foi, discipline et engagement.',
    detail:'JUGES 6:14 · « VA AVEC CETTE FORCE QUE TU AS. »'
  }
};


function getPresenterIcon(type){
  const icons = {
    date: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 9h18M7 13h3M14 13h3M7 17h3"/></svg>`,
    lieu: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
    theme: `<svg viewBox="0 0 64 48" aria-hidden="true"><path d="M5 8.5C15 5 24 7 32 13v30C24 37 15 35 5 38.5Z"/><path d="M59 8.5C49 5 40 7 32 13v30c8-6 17-8 27-4.5Z"/><path class="page" d="M9 12c7-2 14-1 20 3v23c-6-3.5-13-4.5-20-2.8Z"/><path class="page" d="M55 12c-7-2  -14-1 -20 3v23c6-3.5 13-4.5 20-2.8Z"/><path class="spine" d="M32 13v30"/><path class="line" d="M13 19c5-1 10-.5 15 2M13 24c5-1 10-.5 15 2M51 19c-5-1-10-.5-15 2M51 24c-5-1-10-.5-15 2"/></svg>`,
    participation: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-check"/></svg>`,
    presentation: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-sparkle"/></svg>`,
    programme: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-list"/></svg>`,
    actualites: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-news"/></svg>`,
    orateur: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-mic"/></svg>`
  };
  return icons[type] || icons.date;
}

function openPresenter(type){
  const d = presenterData[type];
  if(!d) return;

  const el = document.getElementById('presenter');
  document.getElementById('presenterIcon').innerHTML = getPresenterIcon(type);
  document.getElementById('presenterKicker').textContent = d.kicker;
  document.getElementById('presenterTitle').textContent = d.title;
  document.getElementById('presenterText').textContent = d.text;
  document.getElementById('presenterDetail').textContent = d.detail;

  document.querySelectorAll('#presenterDateVisual,#presenterMap,#presenterThemeVisual,#presenterRescomVisual').forEach(x=>x.remove());

  if(type === 'rescom'){
    const visual = document.createElement('div');
    visual.id = 'presenterRescomVisual';
    visual.className = 'presenter-rescom-visual rescom-detail-page';
    const photo = document.getElementById('v39RescomImg');
    const src = photo ? photo.src : '';
    visual.innerHTML = `
      <section class="rescom-hero">
        <div class="rescom-hero-media">${src ? `<img src="${src}" alt="CP ZIBO AMOS — Atelier Rescom">` : ''}<div class="rescom-hero-shade"></div></div>
        <div class="rescom-hero-copy">
          <span class="rescom-hero-kicker">ATELIER RESCOM · DEUX DISTRICTS</span>
          <h1>Faire des deux districts<br>une référence</h1>
          <span class="rescom-hero-pill">ATELIER · COMMUNICATION</span>
        </div>
      </section>

      <section class="rescom-info-card rc-joincard">
        <div class="rescom-accent-title">PARTICIPATION</div>
        <h2>Réserve ta place à l’atelier</h2>
        <p>Dis-nous que tu viens : cela aide l’équipe à préparer le matériel et le nombre de places.</p>
        <button type="button" class="rc-join" data-rescom-join><span>Participer</span></button>
        <div class="rc-count" data-rescom-count></div>
        <a class="rc-wa" data-rescom-wa hidden target="_blank" rel="noopener">Confirmer par WhatsApp ›</a>
      </section>

      <section class="rescom-info-card">
        <div class="rescom-accent-title">POURQUOI CET ATELIER</div>
        <h2>Un même standard pour une image forte</h2>
        <p>Aujourd’hui, chaque troupe communique à sa façon. L’atelier réunit les responsables communication autour d’un même standard, pour que les deux districts soient reconnaissables d’un coup d’œil et respectés pour la qualité de leur image.</p>
        <div class="rescom-chips"><span>Jeudi 22h → Vendredi 22h</span><span>2 jours pleins</span><span>Formateur · CP ZIBO AMOS</span></div>
      </section>

      <section class="rescom-info-card">
        <div class="rescom-accent-title">QUI EST CONCERNÉ</div>
        <p>Les rescoms de chaque troupe, les responsables de district et, selon les places, les chefs de troupe qui souhaitent suivre le travail de leur rescom.</p>
      </section>

      <section class="rescom-info-card">
        <div class="rescom-accent-title">À PRÉPARER AVANT L’ATELIER</div>
        <a class="rc-dl" href="https://play.google.com/store/search?q=pixellab&c=apps" target="_blank" rel="noopener"><i>⬇</i><span><strong>Télécharge Pixellab à l’avance</strong><small>L’application servira à la partie pratique : logo, affiche et filigrane.</small></span></a>
        <ul class="rescom-check-list" style="margin-top:12px">
          <li><b>Installe et ouvre Pixellab</b> avant l’atelier pour gagner du temps le jour J.</li>
          <li><b>Charge ton téléphone</b> et prévois de quoi le recharger.</li>
          <li><b>Rassemble les logos et photos</b> de ta troupe dans ta galerie.</li>
        </ul>
      </section>

      <section class="rescom-info-card">
        <div class="rescom-accent-title">LES 6 AXES DE LA FORMATION</div>
        <div class="rescom-axis-list">
          <div><b>01 · Identité visuelle</b><span>Couleurs, polices, style des visuels, cohérence entre troupes et districts.</span></div>
          <div><b>02 · Charte graphique</b><span>Un guide simple que chaque rescom garde, avec ce qu’il faut faire et ne pas faire.</span></div>
          <div><b>03 · Logos</b><span>Concevoir ou moderniser le logo d’une troupe : simplicité, lisibilité, versions couleur et noir et blanc.</span></div>
          <div><b>04 · Filigrane des activités</b><span>Une signature commune sur les photos et vidéos pour protéger les contenus et marquer chaque activité.</span></div>
          <div><b>05 · Photo et vidéo</b><span>Cadrer, couvrir une activité, choisir et trier les images.</span></div>
          <div><b>06 · Réseaux et supports</b><span>Affiches, publications, ton des messages et rythme de communication.</span></div>
        </div>
      </section>

      <section class="rescom-info-card">
        <div class="rescom-accent-title">LES STRUCTURES À METTRE EN PLACE</div>
        <ul class="rescom-check-list">
          <li><b>Un rescom par troupe</b> — une personne identifiée, formée et responsable de l’image de sa troupe.</li>
          <li><b>Une équipe communication par district</b> — elle coordonne les rescoms et valide les contenus importants.</li>
          <li><b>Un kit commun aux deux districts</b> — charte, modèles d’affiches, filigrane et bibliothèque de logos.</li>
          <li><b>Un circuit de validation</b> — qui relit, qui publie et sous quel délai.</li>
          <li><b>Un espace de partage</b> — un dossier commun pour archiver les photos, vidéos et visuels de chaque activité.</li>
        </ul>
      </section>

      <section class="rescom-info-card">
        <div class="rescom-accent-title">DÉROULEMENT</div>
        <h2>Apprendre · maîtriser · pratiquer</h2>
        <p>Un court exposé par axe, puis un atelier pratique. Chaque rescom repart avec son logo retravaillé, un modèle d’affiche et le filigrane prêt à l’emploi.</p>
      </section>

      <section class="rescom-result-card">
        <div class="rescom-accent-title">CE QU’ON OBTIENT À LA FIN</div>
        <h2>Une communication prête à devenir une référence</h2>
        <p>Une image unifiée des deux districts, des rescoms formés et reconnus dans leur rôle, des contenus mieux protégés et mieux conservés, et une référence que d’autres districts peuvent suivre.</p>
      </section>

      <section class="rescom-formateur-card">
        <span>FORMATEUR</span><b>L’équipe de communication</b><strong>Représentée par CP ZIBO AMOS</strong>
      </section>
    `;
    document.querySelector('.presenter-detail').after(visual);
    if(window.rescomPaint)rescomPaint();
  }

  if(type === 'theme'){
    const visual = document.createElement('div');
    visual.id = 'presenterThemeVisual';
    visual.className = 'presenter-theme-visual';
    visual.innerHTML = `
      <div class="theme-book-realistic">
        <div class="book-page-real left"></div>
        <div class="book-page-real right"></div>
        <div class="book-spine-real"></div>
        <div class="book-text left-text"></div>
        <div class="book-text right-text"></div>
      </div>
      <div class="theme-verse">JUGES 6:14</div>
    `;
    document.querySelector('.presenter-detail').after(visual);
  }

  if(type === 'date'){
    const visual = document.createElement('div');
    visual.id = 'presenterDateVisual';
    visual.className = 'presenter-date-visual';
    visual.innerHTML = `
      <div class="date-block"><span>28</span><small>OCT.</small></div>
      <div class="date-arrow"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrow"/></svg></div>
      <div class="date-block"><span>01</span><small>NOV.</small></div>
      <div class="date-caption">ÉDITION 2026 · BOUAFLÉ</div>
    `;
    document.querySelector('.presenter-detail').after(visual);
  }

  if(type === 'lieu'){
    const map = document.createElement('div');
    map.id = 'presenterMap';
    map.className = 'presenter-map';
    map.innerHTML = `
      <div class="map-grid"></div>
      <div class="map-pin"><span><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-pin"/></svg></span></div>
      <div class="map-label"><strong>Collège FOHOUNDI Garango</strong><small>Bouaflé</small></div>
    `;
    document.querySelector('.presenter-detail').after(map);
  }

  el.classList.add('open');
  el.setAttribute('aria-hidden','false');
  const nav = document.getElementById('floatingAppNav');
  if(nav) nav.style.display='none';
  document.body.style.overflow='hidden';
}

function closePresenter(e){
  const el = document.getElementById('presenter');
  if(e && e.target !== el) return;
  el.classList.remove('open');
  el.setAttribute('aria-hidden','true');
  const nav = document.getElementById('floatingAppNav');
  if(nav) nav.style.display='grid';
  document.body.style.overflow='';
}

document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closePresenter();
});

