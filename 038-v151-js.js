
(function(){
 /* --- partage : jamais de lien « file:// », toujours le texte tel qu'affiché --- */
 try{var ns=navigator.share;if(typeof ns==='function'){navigator.share=function(d){if(d&&d.url&&!/^https?:/i.test(d.url)){d=Object.assign({},d);delete d.url}return ns.call(navigator,d)}}}catch(e){}
 function toast(m){var x=document.getElementById('cdToast');if(!x){x=document.createElement('div');x.id='cdToast';x.style.cssText='position:fixed;left:50%;bottom:104px;transform:translateX(-50%);z-index:99999;max-width:86vw;padding:12px 16px;border-radius:14px;background:#17173b;color:#fff;font:700 13px/1.35 sans-serif;text-align:center;pointer-events:none;transition:opacity .25s';document.body.appendChild(x)}x.textContent=m;x.style.opacity=1;clearTimeout(x._t);x._t=setTimeout(function(){x.style.opacity=0},2600)}
 function wa(t){window.open('https://wa.me/?text='+encodeURIComponent(t),'_blank')}
 window.cdShare=function(title,text){
  if(navigator.share){return navigator.share({title:title,text:text}).catch(function(e){if(e&&e.name==='AbortError')return;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(function(){toast('Texte copié')},function(){wa(text)});else wa(text)})}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){toast('Texte copié — colle-le où tu veux')},function(){wa(text)})}else wa(text)};
 window.cdShareMonCamp=function(){
  var L=['Camp de District 3 en 1 — Garango 2026'];
  document.querySelectorAll('#screenMonCamp .mc8-rr .mc8-rc').forEach(function(c){var p=[].map.call(c.children,function(x){return x.textContent.trim()}).filter(Boolean);if(p.length)L.push(p[0]+' : '+p.slice(1).join(' · '))});
  cdShare('Camp de District 3 en 1',L.join('\n'))};

 /* --- fenêtre « Lieu » : le site du camp d'abord, puis le bouton qui ouvre la carte --- */
 var op=window.openPresenter;
 if(typeof op==='function')window.openPresenter=function(t){
  var r=op.apply(this,arguments),a=document.querySelector('#presenter .presenter-action');
  if(a){var reg=(t==='participation');a.textContent=reg?'Je me pré-inscris':'J’ai compris';a.onclick=function(){closePresenter();if(reg&&window.openRegistration)openRegistration()}}
  var old=document.getElementById('presenterMapOpen');if(old)old.remove();
  if(t==='lieu'&&a){
   document.querySelectorAll('#presenter .v69-loc a').forEach(function(x){x.style.display='none'});
   var b=document.createElement('a');b.id='presenterMapOpen';b.className='presenter-map-open';b.target='_blank';b.rel='noopener';
   b.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Collège FOHOUNDI Garango Bouaflé');
   b.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 11 21 3l-8 18-2.5-7.5z"/></svg>Ouvrir la carte';
   a.before(b)}
  return r};

 /* --- agenda interne --- */
 var AK='camp_agenda_2026',NM=['MER','JEU','VEN','SAM','DIM'],NF=['Mercredi 28 octobre','Jeudi 29 octobre','Vendredi 30 octobre','Samedi 31 octobre','Dimanche 1er novembre'];
 function ld(){try{return JSON.parse(localStorage.getItem(AK))||[]}catch(e){return[]}}
 function sv(a){try{localStorage.setItem(AK,JSON.stringify(a))}catch(e){}}
 function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
 function tx(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML}
 function mins(t){var m=/(\d+)h(\d*)/.exec(t||'');return m?(+m[1])*60+(+(m[2]||0)):null}
 function fmt(t){return String(t).replace(/h(?=$)/,'h00')}
 var ICP='<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',ICK='<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',ICB='<svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',ICX='<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>';
 var O=null,day=0,tab='prog',pushed=false;
 function blocks(d){var C=window.CPG,out=[];if(!C)return out;C.P.forEach(function(r){var lab=r[1][d];if(!lab)return;var k=r[2]||C.kind(lab),pr=r[0].split(' – '),L=out[out.length-1];if(L&&L.lab===lab&&L.k===k)L.end=pr[1];else out.push({lab:lab,k:k,start:pr[0],end:pr[1]})});return out}
 function today(){var n=new Date(),i=Math.floor((n-new Date(2026,9,28))/864e5);return(i>=0&&i<5)?i:-1}
 function close(){if(!O)return;O.classList.remove('open');O.setAttribute('aria-hidden','true');if(!document.querySelector('.cpg.open,.mcx.open,#presenter.open')){document.body.style.overflow='';var n=document.getElementById('floatingAppNav');if(n)n.style.display=''}if(pushed){pushed=false;try{history.back()}catch(e){}}}
 window.addEventListener('popstate',function(){if(O&&O.classList.contains('open')){pushed=false;close()}});
 function paint(){
  var a=ld(),n=today();O.replaceChildren();
  var hd=el('div','cda-hd'),top=el('div','cda-top'),bk=el('button','cda-bk',ICB);bk.type='button';bk.setAttribute('aria-label','Retour');bk.onclick=close;
  top.append(bk,el('div',null,'<small>MON AGENDA</small><h2>Agenda du Camp</h2>'));
  hd.append(top,el('p',null,'28 oct. → 1er nov. 2026 · Collège FOHOUNDI Garango, Bouaflé'));
  var ds=el('div','cda-days');NM.forEach(function(m,i){var b=el('button','cda-d'+(i===day?' on':''),'<small>'+m+'</small><b>'+(28+i>31?1:28+i)+'</b>'+(a.some(function(x){return x.d===i})?'<i></i>':''));b.type='button';b.onclick=function(){day=i;paint()};ds.append(b)});
  hd.append(ds);
  var sg=el('div','cda-seg'),b1=el('button',tab==='prog'?'on':'','Programme'),b2=el('button',tab==='mine'?'on':'','Mon agenda ('+a.length+')');b1.type=b2.type='button';b1.onclick=function(){tab='prog';paint()};b2.onclick=function(){tab='mine';paint()};sg.append(b1,b2);
  var bd=el('div','cda-bd'),nm=new Date().getHours()*60+new Date().getMinutes();
  if(tab==='prog'){
   bd.append(el('div','cda-sec',tx(NF[day]).toUpperCase()));
   var bl=blocks(day);if(!bl.length)bd.append(el('p','cda-empty','Programme bientôt disponible.'));
   bl.forEach(function(b){var id=day+'|'+b.start+'|'+b.lab,has=a.some(function(x){return x.id===id}),s=mins(b.start),e=mins(b.end),on=n===day&&s!=null&&e!=null&&e>s&&nm>=s&&nm<e;
    var row=el('div','cda-row'),t=el('div','cda-t',tx(fmt(b.start))+'<small>'+tx(fmt(b.end))+'</small>'),c=el('div','cda-c k-'+b.k+(on?' on':''),'<b>'+tx(b.lab)+'</b>'+(on?'<span class="cda-tag">EN COURS</span>':'')),ad=el('button','cda-add'+(has?' on':''),has?ICK:ICP);ad.type='button';ad.setAttribute('aria-label',has?'Retirer de mon agenda':'Ajouter à mon agenda');
    ad.onclick=function(){var x=ld();if(has)x=x.filter(function(y){return y.id!==id});else x.push({id:id,d:day,start:b.start,end:b.end,lab:b.lab,k:b.k});sv(x);paint()};
    row.append(t,c,ad);bd.append(row)});
   bd.append(el('p','cda-note','Appuie sur + pour ajouter une activité à ton agenda. Programme susceptible d’être ajusté par le bureau selon les nécessités du camp.'))
  }else{
   var f=el('div','cda-form'),sel=el('select'),ti=el('input','t'),tt=el('input'),ab=el('button',null,'Ajouter à mon agenda');
   NF.forEach(function(x,i){var o=el('option',null,x.split(' ')[0]+' '+(28+i>31?1:28+i));o.value=i;if(i===day)o.selected=true;sel.append(o)});
   tt.type='time';tt.value='08:00';ti.placeholder='Mon rendez-vous (ex. : réunion de troupe)';ti.maxLength=60;ab.type='button';
   f.append(sel,tt,ti,ab);bd.append(el('div','cda-sec','AJOUTER UN RENDEZ-VOUS'),f);
   ab.onclick=function(){var v=ti.value.trim();if(!v){ti.focus();toast('Écris un titre.');return}var h=tt.value.replace(':','h'),x=ld();x.push({id:'c'+Date.now(),d:+sel.value,start:h,end:'',lab:v,k:'x',perso:1});sv(x);tab='mine';day=+sel.value;paint()};
   if(!a.length)bd.append(el('p','cda-empty','Ton agenda est vide.<br>Ajoute des activités depuis l’onglet Programme ou crée ton propre rendez-vous.'));
   else{
    for(var d=0;d<5;d++){var it=a.filter(function(x){return x.d===d}).sort(function(p,q){return (mins(p.start)||0)-(mins(q.start)||0)});if(!it.length)continue;
     bd.append(el('div','cda-sec',tx(NF[d]).toUpperCase()));
     it.forEach(function(x){var row=el('div','cda-row'),t=el('div','cda-t',tx(fmt(x.start))+(x.end?'<small>'+tx(fmt(x.end))+'</small>':'')),c=el('div','cda-c k-'+x.k,'<b>'+tx(x.lab)+'</b>'+(x.perso?'<em>Mon rendez-vous</em>':'')),rm=el('button','cda-add',ICX);rm.type='button';rm.setAttribute('aria-label','Supprimer');rm.onclick=function(){sv(ld().filter(function(y){return y.id!==x.id}));paint()};row.append(t,c,rm);bd.append(row)})}
    var sh=el('button','cda-sh','Partager mon agenda');sh.type='button';sh.onclick=function(){var L=['Mon agenda — Camp de District 3 en 1'];for(var d=0;d<5;d++){var it=ld().filter(function(x){return x.d===d}).sort(function(p,q){return (mins(p.start)||0)-(mins(q.start)||0)});if(!it.length)continue;L.push('',NF[d]);it.forEach(function(x){L.push(fmt(x.start)+(x.end?' – '+fmt(x.end):'')+' · '+x.lab)})}cdShare('Mon agenda — Camp',L.join('\n'))};bd.append(sh)}
  }
  O.append(hd,sg,bd)}
 window.cdAgenda=function(){
  if(!O){O=el('div','cda');O.id='cdAgenda';O.setAttribute('role','dialog');O.setAttribute('aria-modal','true');document.body.appendChild(O)}
  var n=today();day=n>=0?n:0;tab='prog';paint();
  O.classList.add('open');O.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';var nv=document.getElementById('floatingAppNav');if(nv)nv.style.display='none';
  if(!pushed){try{history.pushState({cda:1},'');pushed=true}catch(e){}}};
})();
