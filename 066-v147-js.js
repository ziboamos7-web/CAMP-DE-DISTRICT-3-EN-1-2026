
(function(){
 var C=window.CPG;if(!C)return;
 var NM=['Mercredi 28 octobre','Jeudi 29 octobre','Vendredi 30 octobre','Samedi 31 octobre','Dimanche 1er novembre'];
 var KN={e:'Enseignement',j:'Jeux et concours',o:'Cérémonie',p:'Prière et évangélisation',m:'Repos et repas',s:'Sport et hygiène',r:'Rapport et projection',x:'Arrivée et départ'};
 var ICO={back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',go:'<path d="M9 5l7 7-7 7"/>',book:'<path d="M12 6.5C9.5 5 6.5 4.7 3.5 5.3v13c3-.6 6-.3 8.5 1.2 2.5-1.5 5.5-1.8 8.5-1.2v-13c-3-.6-6-.3-8.5 1.2zM12 6.5v13"/>',chk:'<path d="M5 12.5l4.5 4.5L19 7.5"/>'};
 function ic(k){return '<svg class="mcx-ic" viewBox="0 0 24 24" aria-hidden="true">'+ICO[k]+'</svg>'}
 function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
 function tx(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML}
 function ld(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
 function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
 function mins(t){var m=/(\d+)h(\d*)/.exec(t);return m?(+m[1])*60+(+(m[2]||0)):null}
 function mk(id){var o=el('div','mcx');o.id=id;o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-hidden','true');document.body.appendChild(o);return o}
 var OD=mk('mcxDay'),OS=mk('mcxSem'),pushed=null;
 function show(o){o.classList.add('open');o.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';var n=document.getElementById('floatingAppNav');if(n)n.style.display='none';if(pushed){pushed=o}else{try{history.pushState({mcx:1},'');pushed=o}catch(e){pushed=null}}}
 function hide(o,pop){o.classList.remove('open');o.setAttribute('aria-hidden','true');var any=document.querySelector('.mcx.open');if(!any&&!document.querySelector('.cpg.open')){document.body.style.overflow='';var n=document.getElementById('floatingAppNav');if(n)n.style.display=''}
  if(pushed===o&&!pop){pushed=null;try{history.back()}catch(e){}}else if(pop)pushed=null}
 window.addEventListener('popstate',function(){document.querySelectorAll('.mcx.open').forEach(function(o){hide(o,true)})});
 function head(kicker,title,sub,pill,pcls,o){var h=el('div','mcx-hd'),top=el('div','mcx-top'),b=el('button','mcx-bk','<svg viewBox="0 0 24 24">'+ICO.back+'</svg>');b.type='button';b.setAttribute('aria-label','Retour');b.onclick=function(){hide(o)};
  top.append(b);if(pill)top.append(el('span','mcx-pill'+(pcls?' '+pcls:''),tx(pill)));
  h.append(top,el('span','mcx-k',tx(kicker)),el('h2',null,tx(title)),el('p',null,tx(sub)));return h}
 /* ---------- PROGRAMME DU JOUR ---------- */
 function blocks(d){var out=[];C.P.forEach(function(r){var lab=r[1][d];if(!lab)return;var k=r[2]||C.kind(lab),pr=r[0].split(' – '),L=out[out.length-1];
   if(L&&L.lab===lab&&L.k===k){L.end=pr[1]}else out.push({lab:lab,k:k,start:pr[0],end:pr[1]})});return out}
 function fmt(t){return t.replace(/h(?=$)/,'h00')}
 function day(d){
  var now=new Date(),D0=new Date(2026,9,28+d),D1=new Date(2026,9,29+d),isToday=now>=D0&&now<D1,past=now>=D1,left=Math.ceil((D0-now)/864e5);
  var pill=isToday?'AUJOURD’HUI':past?'TERMINÉ':(left===1?'DEMAIN':'DANS '+left+' JOURS'),nm=now.getHours()*60+now.getMinutes();
  OD.replaceChildren(head('JOUR '+(d+1)+' SUR 5',NM[d],'Camp de District 3 en 1 · Collège FOHOUNDI Garango, Bouaflé',pill,isToday?'now':'',OD));
  var bd=el('div','mcx-bd');
  if(d===2){var sw=el('button','mcx-sw','<span>'+ic('book')+'</span><span><b>Séminaire des chefs</b><small>8 modules · 07h30 – 17h30</small></span><span>'+ic('go')+'</span>');sw.type='button';sw.onclick=function(){OD.classList.remove('open');OD.setAttribute('aria-hidden','true');sem()};bd.append(sw)}
  var tl=el('div','mcx-tl');
  blocks(d).forEach(function(b){var s=mins(b.start),e=mins(b.end),on=isToday&&s!=null&&e!=null&&e>s&&nm>=s&&nm<e;
   var row=el('div','mcx-b'),t=el('div','mcx-t',tx(fmt(b.start))+'<small>'+tx(fmt(b.end))+'</small>'),c=el('div','mcx-c k-'+b.k+(on?' on':''),'<b>'+tx(b.lab)+'</b>'+(KN[b.k]&&KN[b.k]!==b.lab?'<small>'+tx(KN[b.k])+'</small>':'')+(on?'<span class="mcx-tag">EN COURS</span>':''));
   row.append(t,c);tl.append(row)});
  bd.append(tl);
  var nav=el('div','mcx-nav'),pv=el('button',null,'← '+(d>0?NM[d-1].split(' ')[0]:'')),nx=el('button',null,(d<4?NM[d+1].split(' ')[0]:'')+' →');
  pv.type=nx.type='button';pv.disabled=d===0;nx.disabled=d===4;pv.onclick=function(){day(d-1)};nx.onclick=function(){day(d+1)};nav.append(pv,nx);
  bd.append(nav,el('p','mcx-note','Programme susceptible d’être ajusté par le bureau selon les nécessités du camp.'));
  OD.append(bd);bd.scrollTop=0;
  if(isToday){var on=bd.querySelector('.on');if(on)setTimeout(function(){on.scrollIntoView({block:'center'})},50)}
  if(!OD.classList.contains('open'))show(OD)}
 window.mcxDay=day;
 /* ---------- SÉMINAIRE ---------- */
 var SK='camp_mc_sem_2026';
 function sem(){
  var st=ld(SK,{}),rows=C.S,mods=[],spk={};
  rows.forEach(function(r,i){var m=/^Module (\d+) : (.*)$/.exec(r[1]);if(m){mods.push(i);spk[r[2]]=(spk[r[2]]||0)+1}});
  var now=new Date(),isDay=now.getFullYear()===2026&&now.getMonth()===9&&now.getDate()===30,nm=now.getHours()*60+now.getMinutes();
  var pill=isDay?'AUJOURD’HUI':now>new Date(2026,9,31)?'TERMINÉ':'VENDREDI 30 OCT.';
  OS.replaceChildren(head('SÉMINAIRE DE FORMATION DES CHEFS','Former des chefs responsables, disciplinés et serviteurs','Vendredi 30 octobre 2026 · Garango',pill,isDay?'now':'',OS));
  var bd=el('div','mcx-bd'),n=mods.filter(function(i){return st['m'+i]}).length;
  bd.append(el('div','mcx-st','<div><b>'+mods.length+'</b><small>Modules</small></div><div><b>'+Object.keys(spk).length+'</b><small>Intervenants</small></div><div><b>10h</b><small>07h30 – 17h30</small></div>'));
  var pc=el('div','mcx-card','<h3>Mon parcours <small>'+n+' / '+mods.length+'</small></h3><div class="mcx-bar"><i style="width:'+(n/mods.length*100)+'%"></i></div>');bd.append(pc);
  var sp=el('div','mcx-card','<h3>Les intervenants</h3>'),sr=el('div','mcx-sp');
  Object.keys(spk).forEach(function(k){var ini=k.replace(/^(CR|Commissaire de|Sapeurs-)\s*/i,'').trim().slice(0,2).toUpperCase();var ph=window.spPhoto&&window.spPhoto(k);sr.append(el('div',null,'<div class="mcx-av">'+(ph?'<img alt="" src="'+ph+'">':tx(ini))+'</div><small>'+tx(k)+'</small>'))});
  sp.append(sr);bd.append(sp);
  var half=-1;rows.forEach(function(r,i){if(r[1]==='Pause déjeuner')half=i});
  rows.forEach(function(r,i){
   if(i===0)bd.append(el('div','mcx-sec','MATINÉE'));
   if(i===half+1)bd.append(el('div','mcx-sec','APRÈS-MIDI'));
   var tm=r[0].split(' – '),s=mins(tm[0]),e=mins(tm[1]);
   if(r[2]===null){bd.append(el('div','mcx-br',tx(r[1])+'<time>'+tx(r[0])+'</time>'));return}
   var m=/^Module (\d+) : (.*)$/.exec(r[1]),on=isDay&&s!=null&&e!=null&&nm>=s&&nm<e,key='m'+i;
   var card=el('div','mcx-m'+(m?'':' free')+(on?' on':'')+(st[key]?' done':'')),num=el('div','mcx-n',m?m[1]:ic('go')),bx=el('div','mcx-x');
   bx.append(el('time',null,tx(r[0])+(on?' · EN COURS':'')),el('b',null,tx(m?m[2]:r[1])),(function(){var sm=el('small',null,tx(r[2])),ph=window.spPhoto&&window.spPhoto(r[2]);if(ph){sm.textContent='';var im=document.createElement('img');im.className='sp-mini';im.alt='';im.src=ph;sm.append(im,document.createTextNode(r[2]))}return sm})());
   if(m){var ac=el('div','mcx-ac'),dn=el('button',st[key]?'on':null,st[key]?'Suivi':'Marquer suivi'),nt=el('button',null,'Notes'),ta=el('textarea');dn.type=nt.type='button';
    ta.placeholder='Mes notes sur ce module…';ta.value=ld(SK+'n'+i,'');ta.hidden=!ta.value;ta.oninput=function(){sv(SK+'n'+i,ta.value)};
    nt.onclick=function(){ta.hidden=!ta.hidden;if(!ta.hidden)ta.focus()};
    dn.onclick=function(){var s2=ld(SK,{});s2[key]=!s2[key];sv(SK,s2);var sc=bd.scrollTop;sem();OS.querySelector('.mcx-bd').scrollTop=sc};
    ac.append(dn,nt);bx.append(ac,ta)}
   card.append(num,bx);bd.append(card)});
  bd.append(el('p','mcx-note','Programme susceptible d’être ajusté par l’organisation. Tes notes et ton suivi sont enregistrés sur cet appareil.'));
  OS.append(bd);if(!OS.classList.contains('open'))show(OS)}
 window.mcxSem=sem;
})();
