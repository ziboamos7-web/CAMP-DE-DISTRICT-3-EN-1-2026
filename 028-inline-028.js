
(function(){
var D=['Mercredi 28 oct.','Jeudi 29 oct.','Vendredi 30 oct.','Samedi 31 oct.','Dimanche 1er nov.'];
var E='';
/* [horaire, [Mer,Jeu,Ven,Sam,Dim]] — types: m méditation/repos, s sport/toilettes, r rapport, e enseignement, j jeux, o cérémonie, p prière/culte/évangélisation, x arrivée/départ */
var P=[
['5h – 5h30',[E,'Méditation','Méditation','Méditation','Méditation'],'m'],
['5h30 – 6h30',[E,'Sport','Sport','Sport','Sport'],'s'],
['6h30 – 7h',[E,'Toilettes','Toilettes','Toilettes','Toilettes'],'s'],
['7h – 8h',[E,'Rapport','Rapport','Rapport','Rapport'],'r'],
['8h – 9h',[E,'Enseignement','Jeux et concours','Cérémonie officielle','Culte']],
['9h – 10h',[E,'Enseignement','Jeux et concours','Cérémonie officielle','Culte']],
['10h – 11h',[E,'Enseignement','Jeux et concours','Cérémonie officielle','Entretien']],
['11h – 12h',[E,'Enseignement','Jeux et concours','Cérémonie officielle','Entretien']],
['12h – 14h',[E,'Déjeuner + Repos','Déjeuner + Repos','Déjeuner + Repos','Déjeuner + Repos'],'m'],
['14h – 15h',['Arrivée','Évangélisation','Prédication','Jeux et concours','Départ']],
['15h – 16h',['Arrivée','Évangélisation','Prédication','Jeux et concours','Départ']],
['16h – 17h',['Arrivée','Évangélisation','Prédication','Jeux et concours','Départ']],
['17h – 18h',[E,'Toilettes','Toilettes','Toilettes',E],'s'],
['18h – 19h',['Repos (Dîner)','Dîner','Dîner','Dîner',E],'m'],
['19h – 21h',['Accueil et installation','Projection','Projection','Jeux et concours',E]],
['21h – 5h',['Repos','Repos','Repos','Concert',E]]
];
function kind(t){t=t.toLowerCase();return /arriv|départ/.test(t)?'x':/jeux/.test(t)?'j':/enseign|entretien/.test(t)?'e':/cérém|concert/.test(t)?'o':/culte|évang|préd/.test(t)?'p':/médit|repos|déj|dîn/.test(t)?'m':/sport|toilet/.test(t)?'s':/rapport|projection/.test(t)?'r':'s'}
var S=[
['07h30 – 08h00','Accueil et installation des participants','Secrétariat du séminaire'],
['08h00 – 08h20','Ouverture, prière et présentation du séminaire','Organisation'],
['08h20 – 09h00','Module 1 : Organisation d’une troupe : rôles et responsabilités','CR YAO Olivier'],
['09h00 – 09h40','Module 2 : Jésus, modèle parfait de leader et de serviteur','CR Paul'],
['09h40 – 10h20','Module 3 : Intégration des valeurs du mouvement F/L à travers les grands jeux','CR TOUTOUKPO'],
['10h20 – 10h35','Pause café',null],
['10h35 – 11h15','Module 4 : Le Flambeau/Lumière, citoyen modèle pour sa communauté','CR EMMANUEL'],
['11h15 – 11h55','Module 5 : Apprendre à protéger la vie : responsabilité du Flambeau/Lumière','Sapeurs-Pompiers'],
['11h55 – 12h35','Module 6 : Le leadership chrétien : servir et non dominer','CR N’DAH Olivier'],
['12h35 – 13h30','Pause déjeuner',null],
['13h30 – 14h10','Module 7 : L’ordre et la rigueur : forces du Flambeau/Lumière engagé(e)','Commissaire de Police'],
['14h10 – 14h50','Module 8 : L’administration au sein du Mouvement Flambeaux & Lumières – Cas du District','CR FULBERT'],
['14h50 – 15h05','Pause café',null],
['15h05 – 15h45','Travaux pratiques : mise en situation d’un chef de troupe','Encadrement'],
['15h45 – 16h25','Questions – réponses et échanges d’expériences','Tous les intervenants'],
['16h25 – 16h50','Synthèse et recommandations aux chefs','CR N’DAH Olivier'],
['16h50 – 17h20','Engagement des chefs et évaluation du séminaire','Organisation'],
['17h20 – 17h30','Prière et clôture','Aumônerie / Responsables']
];
var el=document.getElementById('cpg'),B=document.getElementById('cpgB'),cur='camp',pushed=false;
function camp(){
 var h='<div class="cpg-info"><span>28 oct. → 1er nov. 2026</span><span>Garango</span><span>5 jours</span></div><div class="cpg-wrap"><table class="cpg-t"><thead><tr><th>Horaires</th>'+D.map(function(d){return '<th>'+d.replace(' ','<br>')+'</th>'}).join('')+'</tr></thead><tbody>';
 P.forEach(function(r){h+='<tr><td>'+r[0]+'</td>'+r[1].map(function(c){return c?'<td class="k-'+(r[2]||kind(c))+'">'+c+'</td>':'<td class="e">—</td>'}).join('')+'</tr>'});
 h+='</tbody></table></div><div class="cpg-lg"><i class="k-e" style="background:#f1e9ff;color:#5b2bb8">Enseignement</i><i style="background:#fff1e3;color:#c4520a">Jeux et concours</i><i style="background:#ffe8ef;color:#b3134f">Cérémonie</i><i style="background:#e5f6f8;color:#0e7185">Évangélisation / Culte</i><i style="background:#e6f7ee;color:#1f7a48">Repos et repas</i></div><p class="cpg-note">Glisse le tableau pour voir tous les jours. Programme susceptible d’être ajusté par le bureau selon les nécessités du camp.</p>';
 return h}
function sem(){
 var h='<div class="cpg-hero"><span>SÉMINAIRE DE FORMATION DES CHEFS</span><b>Former des chefs responsables, disciplinés et serviteurs</b></div><div class="cpg-info"><span>Vendredi 30 octobre 2026</span><span>Garango</span><span>8 modules</span></div><div class="cpg-sm">';
 S.forEach(function(r){h+=r[2]===null?'<div class="cpg-r br"><time>'+r[0]+'</time><div><b>'+r[1]+'</b></div></div>':'<div class="cpg-r'+(/^(Ouverture|Prière)/.test(r[1])?' ft':'')+'"><time>'+r[0]+'</time><div><b>'+r[1]+'</b><small>'+spMini(r[2])+r[2]+'</small></div></div>'});
 return h+'</div>'}
function draw(){
 el.querySelectorAll('.cpg-tabs button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-t')===cur)});
 document.getElementById('cpgT').textContent=cur==='camp'?'Programme du Camp':'Séminaire des chefs';
 document.getElementById('cpgS').textContent=cur==='camp'?'Camp de District 3 en 1 · 2026':'Vendredi 30 octobre 2026 · Garango';
 B.innerHTML=cur==='camp'?camp():sem();B.scrollTop=0}
function open(t){cur=t;draw();el.classList.add('open');el.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';try{history.pushState({cpg:1},'');pushed=true}catch(e){pushed=false}}
function close(pop){el.classList.remove('open');el.setAttribute('aria-hidden','true');document.body.style.overflow='';if(pushed&&!pop){pushed=false;try{history.back()}catch(e){}}pushed=false}
document.getElementById('cpgBk').onclick=function(){close()};
el.querySelector('.cpg-tabs').onclick=function(e){var b=e.target.closest('button');if(b){cur=b.getAttribute('data-t');draw()}};
window.addEventListener('popstate',function(){if(el.classList.contains('open'))close(true)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&el.classList.contains('open'))close()});
var old=window.openPresenter;
window.openPresenter=function(t){if(t==='programme')return open('camp');if(t==='seminaire')return open('sem');return old.apply(this,arguments)};
window.openProgramme=open;window.CPG={D:D,P:P,S:S,kind:kind};
})();
