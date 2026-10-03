
(function(){
 var scr=document.getElementById('screenMonCamp');if(!scr)return;
 var grid=scr.querySelector('.mycamp-quick-grid');if(!grid)return;
 var CK='camp_mc_check_2026',NK='camp_mc_notes_2026',XK='camp_mc_extra_2026',RK='camp_registration_2026';
 var BASE=['Chemise et foulard de troupe','Tenue de rechange','Gourde','Lampe torche','Bible et carnet','Trousse de toilette','Drap ou natte','Cadenas pour le sac'];
 var P={
  cal:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18M12 13v5M9.5 15.5h5"/>',
  days:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18M7.5 14h2M11 14h2M14.5 14h2M7.5 17.5h2M11 17.5h2"/>',
  nav:'<path d="M3 11 21 3l-8 18-2.5-7.5z"/>',
  share:'<circle cx="18" cy="5.5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="18.5" r="2.6"/><path d="M8.3 10.8l7.4-4M8.3 13.2l7.4 4"/>',
  tick:'<path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z"/><path d="M14.5 7v10" stroke-dasharray="1.8 2.2"/>',
  chk:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  list:'<rect x="5" y="4" width="14" height="17" rx="3"/><path d="M9 4h6v3H9z"/><path d="M9 14l2 2 4-4.5"/>',
  note:'<path d="M6 3.5h8l4 4V20.5H6z"/><path d="M14 3.5v4h4M9 12.5h6M9 16h4"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>',
  user:'<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20c.8-3.9 3.8-6 7.5-6s6.7 2.1 7.5 6"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M8.5 21h7"/>',
  sem:'<path d="M12 6.5C9.5 5 6.5 4.7 3.5 5.3v13c3-.6 6-.3 8.5 1.2 2.5-1.5 5.5-1.8 8.5-1.2v-13c-3-.6-6-.3-8.5 1.2zM12 6.5v13"/>',
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0z"/><circle cx="12" cy="10" r="2.5"/>',
  img:'<rect x="3" y="4.5" width="18" height="15" rx="3"/><circle cx="8.5" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8.5"/>',
  cam:'<path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H8l1.5-2h5L16 6h1.5A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z"/><circle cx="12" cy="12.5" r="3.4"/>',
  post:'<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
  go:'<path d="M9 5l7 7-7 7"/>'
 };
 function svg(k){return '<svg class="mc6-ic" viewBox="0 0 24 24" aria-hidden="true">'+P[k]+'</svg>'}
 function ld(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
 function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
 function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
 var tt;function msg(t){var x=document.getElementById('mc6Toast');if(!x){x=el('div');x.id='mc6Toast';x.setAttribute('role','status');x.style.cssText='position:fixed;left:50%;bottom:104px;transform:translateX(-50%);z-index:3000;max-width:86vw;padding:12px 16px;border-radius:14px;background:#17173b;color:#fff;font:700 13px/1.35 inherit;text-align:center;box-shadow:0 10px 26px rgba(0,0,0,.3);transition:opacity .25s;opacity:0;pointer-events:none';document.body.appendChild(x)}
  x.textContent=t;x.style.opacity=1;clearTimeout(tt);tt=setTimeout(function(){x.style.opacity=0},3200)}
 function go(u){try{var w=window.open(u,'_blank');if(w){try{w.opener=null}catch(x){}}else location.href=u}catch(e){location.href=u}}
 function head(ic,title,right,pill){var h=el('div','mc6-h'),l=el('div','mc6-hl'),t=el('div','mc6-hi');t.innerHTML=svg(ic);l.append(t,el('b',null,title));h.append(l);
  var r=el(pill?'span':'small',pill?'mc6-pill':null,right);h.append(r);return {h:h,r:r}}
 // Jours
 var days=el('div','mc6-box'),dh=head('days','Les 5 journées','28 OCT. → 01 NOV.',true),row=el('div','mc6-days');days.append(dh.h,row,el('p','mc6-tip','Touche un jour pour voir son programme.'));
 function paintDays(){row.replaceChildren();var n=new Date(),NM=['MER','JEU','VEN','SAM','DIM'];
  for(var i=0;i<5;i++){var d=new Date(2026,9,28+i),e=el('div','mc6-day');
   if(n>=new Date(2026,9,29+i))e.classList.add('past');else if(n>=d)e.classList.add('now');
   e.setAttribute('role','button');(function(k){e.onclick=function(){if(window.mcxDay)mcxDay(k);else if(window.openPresenter)openPresenter('programme')}})(i);e.append(el('small',null,NM[i]),el('b',null,String(d.getDate())));row.append(e)}}
 paintDays();
 // Actions
 var acts=el('div','mc6-acts');
 function act(ic,t,f){var b=el('button','mc6-act'),ti=el('span','mc6-ti');ti.innerHTML=svg(ic);b.type='button';b.append(ti,document.createTextNode(t));b.onclick=f;acts.append(b)}
 act('cal','Agenda',function(){if(window.cdAgenda)cdAgenda()});
 act('nav','Itinéraire',function(){if(window.openPresenter)openPresenter('lieu')});
 act('share','Partager',function(){if(window.cdShareMonCamp)cdShareMonCamp()});
 // ===== Préparation =====
 var CATS=[['Tenue',['Chemise et foulard de troupe','Tenue de rechange']],['Couchage et hygiène',['Drap ou natte','Trousse de toilette']],['Matériel',['Gourde','Lampe torche','Cadenas pour le sac']],['Esprit',['Bible et carnet']]];
 var ck=el('div','mc6-box mc8-prep'),ckTop=el('div','mc8-ptop'),ckBody=el('div'),ckAdd=el('div','mc6-add'),inp=el('input'),ab=el('button',null,'Ajouter'),rs=el('button','mc6-rs','Tout décocher');
 inp.placeholder='Ajouter un élément…';inp.maxLength=40;ab.type=rs.type='button';ckAdd.append(inp,ab);ck.append(ckTop,ckBody,ckAdd,rs);
 function prepCount(){var d=ld(CK,{}),all=BASE.concat(ld(XK,[])),n=0;all.forEach(function(x){if(d[x])n++});return [n,all.length]}
 function paintCk(){var done=ld(CK,{}),ex=ld(XK,[]),pc=prepCount(),n=pc[0],t=pc[1],pct=Math.round(n/t*100),full=n===t,left=Math.ceil((new Date(2026,9,28)-new Date())/864e5);
  ck.classList.toggle('done',full);
  ckTop.innerHTML='<div class="mc8-ring"><svg viewBox="0 0 54 54"><circle cx="27" cy="27" r="22" class="bg"/><circle cx="27" cy="27" r="22" class="fg" style="stroke-dasharray:138.2;stroke-dashoffset:'+(138.2*(1-n/t))+'"/></svg><b>'+pct+'%</b></div><div><b>Ma préparation</b><small>'+(full?'Tout est prêt pour le Camp':(t-n)+' élément'+(t-n>1?'s':'')+' restant'+(t-n>1?'s':'')+(left>0?' · à terminer avant le 28 oct.':''))+'</small></div>';
  ckBody.replaceChildren();
  function sec(name,list,isEx){if(!list.length)return;var k=0;list.forEach(function(x){if(done[x])k++});
   var h=elh('div','mc8-sh','<span>'+tx(name)+'</span><small>'+k+' / '+list.length+'</small>');ckBody.append(h);
   list.forEach(function(name2,idx){var ok=!!done[name2],b=el('div','mc6-it'+(ok?' ok':''));b.setAttribute('role','checkbox');b.setAttribute('aria-checked',ok);b.tabIndex=0;
    var u=el('u');u.innerHTML=svg('chk');b.append(u,el('span',null,name2));
    if(isEx){var x=el('button','mc6-x');x.type='button';x.setAttribute('aria-label','Supprimer');x.style.cssText='border:0;background:none';x.innerHTML=svg('x');x.onclick=function(ev){ev.stopPropagation();var a=ld(XK,[]);a.splice(idx,1);sv(XK,a);paintCk()};b.append(x)}
    var tg=function(){var d=ld(CK,{});d[name2]=!d[name2];sv(CK,d);paintCk()};b.onclick=tg;b.onkeydown=function(e){if(e.key===' '||e.key==='Enter'){e.preventDefault();tg()}};ckBody.append(b)})}
  CATS.forEach(function(c){sec(c[0],c[1],false)});sec('Mes ajouts',ex,true);
  rs.hidden=!n;paintNext()}
 function tx(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML}
 function elh(t,c,h){var e=document.createElement(t);if(c)e.className=c;e.innerHTML=h;return e}
 rs.textContent='Tout décocher';rs.onclick=function(){sv(CK,{});paintCk()};
 ab.onclick=function(){var v=inp.value.trim();if(!v){inp.focus();msg('Écris d’abord un élément à ajouter.');return}var x=ld(XK,[]);if(BASE.concat(x).indexOf(v)<0){x.push(v);sv(XK,x)}inp.value='';paintCk()};
 inp.onkeydown=function(e){if(e.key==='Enter')ab.onclick()};
 // ===== Notes =====
 var NK2='camp_mc_notes2_2026',edit=null;
 function notes(){var a=ld(NK2,null);if(a)return a;var o=ld(NK,'');a=o?[{id:1,t:o,d:Date.now()}]:[];sv(NK2,a);return a}
 function fd(t){var d=new Date(t),z=function(n){return ('0'+n).slice(-2)};return z(d.getDate())+'/'+z(d.getMonth()+1)+' · '+z(d.getHours())+':'+z(d.getMinutes())}
 var nt=el('div','mc6-box mc8-notes'),nh=head('note','Mes notes','0',true),ta=el('textarea','mc6-note'),nbar=el('div','mc8-nb'),sb=el('button','mc8-pri','Enregistrer la note'),cb=el('button','mc8-sec','Annuler'),nl=el('div','mc8-nl');
 ta.placeholder='Idée, contact, rappel pour le Camp…';sb.type=cb.type='button';cb.hidden=true;nbar.append(sb,cb);nt.append(nh.h,ta,nbar,nl);
 function paintNotes(){var a=notes();nh.r.textContent=a.length+(a.length>1?' notes':' note');nl.replaceChildren();
  if(!a.length){nl.append(el('p','mc6-hint','Aucune note pour l’instant. Tout reste sur cet appareil.'));return}
  a.slice().sort(function(x,y){return y.d-x.d}).forEach(function(n){var c=el('div','mc8-n'),ac=el('div','mc8-na');
   c.append(el('small',null,fd(n.d)),el('p',null,n.t));
   function btn(l,f){var b=el('button',null,l);b.type='button';b.onclick=f;ac.append(b);return b}
   btn('Modifier',function(){edit=n.id;ta.value=n.t;sb.textContent='Mettre à jour';cb.hidden=false;ta.focus();nt.scrollIntoView({block:'start',behavior:'smooth'})});
   btn('Copier',function(){try{navigator.clipboard.writeText(n.t).then(function(){msg('Note copiée')},function(){throw 0})}catch(e){var t=document.createElement('textarea');t.value=n.t;document.body.appendChild(t);t.select();try{document.execCommand('copy');msg('Note copiée')}catch(x){msg('Copie impossible')}t.remove()}});
   var del=btn('Supprimer',function(){if(del.dataset.s){sv(NK2,notes().filter(function(x){return x.id!==n.id}));paintNotes()}else{del.dataset.s=1;del.textContent='Confirmer';del.classList.add('dg');setTimeout(function(){del.dataset.s='';del.textContent='Supprimer';del.classList.remove('dg')},3000)}});
   c.append(ac);nl.append(c)})}
 function resetEd(){edit=null;ta.value='';sb.textContent='Enregistrer la note';cb.hidden=true}
 sb.onclick=function(){var v=ta.value.trim();if(!v){ta.focus();msg('Écris ta note avant d’enregistrer.');return}var a=notes();
  if(edit){a.forEach(function(x){if(x.id===edit){x.t=v;x.d=Date.now()}})}else a.push({id:Date.now(),t:v,d:Date.now()});sv(NK2,a);resetEd();paintNotes();msg('Note enregistrée')};
 cb.onclick=resetEd;
 grid.after(days);days.after(acts);

 // Ma fiche (infos de l'inscription)
 var fi=el('div','mc6-box'),fh=head('user','Ma fiche',null,true),fg=el('div','mc6-fiche');
 fh.r.remove();var fb=el('button','mc6-pill btn','Modifier');fb.type='button';fb.onclick=function(){if(window.openRegistration)openRegistration()};fh.h.append(fb);
 var idr=el('div','mc9-id');fi.append(fh.h,idr,fg);fi.hidden=true;
 function paintFiche(){var d=ld(RK,null),ok=!!(d&&d.Name);fi.hidden=!ok;if(!ok)return;fg.replaceChildren();idr.replaceChildren();
  var nm=String(d.Name).trim(),ini=nm.split(/\s+/).slice(0,2).map(function(w){return w.charAt(0)}).join('').toUpperCase();
  var av=el('span','mc9-av',ini),tc=el('div','mc9-idt');tc.append(el('b',null,nm),el('small',null,'Pré-commande validée'));idr.append(av,tc);
  var IC={BRANCHE:'<path d="M12 3c1 3.5 4.5 5 4.5 9a4.5 4.5 0 0 1-9 0c0-2 1-3 2-4 .3 1.2 1 1.8 1.7 2C11.5 8 11 5.5 12 3z"/>',GRADE:'<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8-4.3-4.1 5.9-.9z"/>',TROUPE:'<path d="M3 20 12 4l9 16"/><path d="M9.5 20 12 15.2l2.5 4.8"/>',GROUPE:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0z"/><circle cx="12" cy="10" r="2.5"/>'};
  [['BRANCHE',d.Branch],['GRADE',d.Grade],['TROUPE',d.Troop],['GROUPE',d.Group]].forEach(function(r,i){if(!r[1])return;var c=el('div','mc9-f mc9-f'+i),ic=el('span','mc9-fi'),t=el('div','mc9-ft');ic.innerHTML='<svg class="mc6-ic" viewBox="0 0 24 24" aria-hidden="true">'+IC[r[0]]+'</svg>';t.append(el('small',null,r[0]),el('b',null,r[1]));c.append(ic,t);fg.append(c)});
  if(!fg.children.length)fi.hidden=true}
 // Explorer le Camp (fonctions déjà présentes dans l'app)
 var ex=el('div','mc6-tiles');
 function tile(cls,ic,t,sub,f){var b=el('button','mc6-tile'),ti=el('span','mc6-ti '+cls),c=el('span','mc8-tc'),ch=el('span','mc8-tch');ti.innerHTML=svg(ic);ch.innerHTML=svg('go');c.append(el('b',null,t),el('small',null,sub));b.type='button';b.append(ti,c,ch);b.onclick=function(){if(typeof window[f[0]]==='function'){try{window[f[0]](f[1])}catch(e){msg('Indisponible pour le moment')}}else msg('Bientôt disponible')};ex.append(b)}
 tile('mc6-t1','mic','Orateurs','CTA Ev. Kouamé César',['openPresenter','orateur']);
 tile('mc6-t2','sem','Séminaire','Ven. 30 oct. · 8 modules',['mcxSem']);
 tile('mc6-t3','pin','Lieu & plan','Collège FOHOUNDI Garango',['openPresenter','lieu']);
 tile('mc6-t4','tick','Formules','Élément 7 000 F · Chef 8 000 F',['openPresenter','participation']);
 tile('mc6-t1','cam','Ma photo','Cadre à partager',['goCampFrame']);
 tile('mc6-t3','post','Affiche','Visuel officiel',['openPoster']);
 var eh=el('div','mycamp-section-head');eh.append(el('span',null,'EXPLORER LE CAMP'),el('small',null,'RACCOURCIS'));
 acts.after(fi);fi.after(eh);eh.after(ex);
 // Repères du camp (version enrichie)
 var info=scr.querySelector('.mycamp-info-list'),repw=el('div','mc8-rep'),dchip;
 function rrow(cls,ic,lab,val,sub,chip,f,cf){var r=el('div','mc8-rr'),t=el('span','mc6-ti '+cls),c=el('div','mc8-rc'),ch=chip?el('button','mc8-chip',chip):null;t.innerHTML=svg(ic);
  c.append(el('small',null,lab),el('b',null,val),el('em',null,sub));r.setAttribute('role','button');r.tabIndex=0;r.append(t,c);
  if(ch){ch.type='button';ch.onclick=function(e){e.stopPropagation();if(cf)cf()};r.append(ch)}else{var g=el('span','mc6-chev');g.innerHTML=svg('go');r.append(g)}
  r.onclick=function(){if(window.openPresenter)openPresenter(f)};repw.append(r);return ch}
 dchip=rrow('mc6-t1','cal','DATES','28 oct. → 01 nov. 2026','Mercredi au dimanche · 5 jours','',  'date');
 rrow('mc6-t2','pin','LIEU','Collège FOHOUNDI Garango','Bouaflé','Itinéraire','lieu',function(){if(window.openPresenter)openPresenter('lieu')});
 rrow('mc6-t3','sem','THÈME','« Va avec cette force que tu as. »','Juges 6:14','','theme');
 if(info)info.after(repw);else scr.append(repw);
 repw.after(nt);
 // Suivre mon camp
 var nx8=el('div','mc8-next'),tk8=el('div','mc8-tk'),qk=el('div','mc8-q');
 function reg(){var d=ld(RK,null);return d&&d.Name?d:null}
 function dleft(){return Math.ceil((new Date(2026,9,28)-new Date())/864e5)}
 function phase(){var n=new Date();return n<new Date(2026,9,28)?0:n<new Date(2026,10,2)?1:2}
 function dayI(){return Math.min(4,Math.floor((new Date()-new Date(2026,9,28))/864e5))}
 function hm(t){var m=/(\d+)h(\d*)/.exec(t);return m?(+m[1])*60+(+(m[2]||0)):0}
 function nowAct(){var C=window.CPG;if(!C)return '';var d=dayI(),n=new Date(),nm=n.getHours()*60+n.getMinutes();
  for(var i=0;i<C.P.length;i++){var r=C.P[i],pr=r[0].split(' – '),a=hm(pr[0]),b=hm(pr[1]);if(b>a?(nm>=a&&nm<b):(nm>=a||nm<b))return r[1][d]||''}return ''}
 var SIG={};function chg(k,v){v=JSON.stringify(v);if(SIG[k]===v)return false;SIG[k]=v;return true}
 function paintNext(){var d=reg(),pc=prepCount(),ph=phase(),L=dleft(),done=pc[0]===pc[1],t,p,bt,fn,st;if(!chg('n',[!!d,pc,ph,L,ph===1?nowAct():'']))return;
  if(ph===2){t='Merci d’avoir vécu le Camp';p='À très bientôt pour la suite de l’aventure.';bt='Revoir le programme';fn=function(){openPresenter('programme')};st=[1,1,1]}
  else if(ph===1){var di=dayI();t='Jour '+(di+1)+' sur 5';p='En ce moment : '+(nowAct()||'voir le programme du jour')+'.';bt='Programme du jour';fn=function(){mcxDay(di)};st=[1,1,2]}
  else if(!d){t='Finalise ta pré-inscription';p='Pré-inscris-toi pour recevoir ton ticket et suivre ton Camp.';bt='Se pré-inscrire';fn=function(){openRegistration()};st=[2,0,0]}
  else{t='Ton Camp t’attend !';p='Rendez-vous le mercredi 28 octobre à Garango · J-'+L+'.';bt='Voir le programme';fn=function(){mcxDay(0)};st=[1,1,2]}
  nx8.replaceChildren();var h=elh('div','mc8-nh','<small>SUIVRE MON CAMP</small><b>'+tx(t)+'</b><p>'+tx(p)+'</p>'),sp=el('div','mc8-steps');
  [['Pré-commande',d?'✓':'1',0],['Jour J',ph===0?'J-'+L:ph===1?'En cours':'Fini',2]].forEach(function(x){var c=elh('div','mc8-st s'+st[x[2]],'<i>'+tx(x[1])+'</i><span>'+tx(x[0])+'</span>');sp.append(c)});
  var b=el('button','mc8-go',bt);b.type='button';b.onclick=fn;nx8.append(h,sp,b)}
  function paintTicket(){var d=reg();tk8.hidden=!d;if(!d||!chg('t',d))return;var num=window.campTicketNum?window.campTicketNum(d):(d.TicketNumber||''),pr=String(d.Price||'').replace(/\B(?=(\d{3})+(?!\d))/g,'\u00a0'),fm=pr?(/8000/.test(d.Price)?'Chef':'Élément')+' · '+pr+' F':'';
  tk8.replaceChildren();var top=el('div','mc8-tt'),bot=el('div','mc8-tb');
  top.append(el('small',null,'MON TICKET · CAMP 2026'),el('b',null,num||'—'),el('em',null,d.Name));
  var ch=el('div','mc8-tch2');[d.Troop,d.Group,fm].filter(Boolean).forEach(function(x){ch.append(el('span',null,x))});top.append(ch);
  var ok=elh('span','mc8-ok','<i>'+svg('chk')+'</i>Pré-commande validée'),ob=el('button',null,'Ouvrir');ob.type='button';ob.onclick=function(){if(window.openTicket)openTicket()};bot.append(ok,ob);tk8.append(top,bot)}
  function paintQuick(){var d=reg(),ph=phase(),L=dleft();if(!chg('q',[!!d,d&&d.Price,ph,L,ph===1?nowAct():'']))return;qk.replaceChildren();
  function card(cls,ic,t,sub,f){var b=el('button','mc8-qc'),ti=el('span','mc6-ti '+cls),g=el('span','mc8-qg');ti.innerHTML=svg(ic);g.innerHTML=svg('go');b.type='button';b.append(ti,g,el('b',null,t),el('small',null,sub));b.onclick=f;qk.append(b)}
  var fm=d?(/8000/.test(d.Price)?'Chef':'Élément'):'';
  card('mc6-t1',d?'tick':'user',d?'Mon ticket':'Pré-inscription',d?'Formule '+fm:'Je me pré-inscris',function(){d?(window.openTicket&&openTicket()):(window.openRegistration&&openRegistration())});
  var sub=ph===0?'Les 5 journées · J-'+L:ph===1?'Maintenant : '+(nowAct()||'voir le jour'):'Revoir les 5 journées';
  card('mc6-t2','days','Programme',sub,function(){openPresenter('programme')})}
 function paintAll(){paintTicket();paintNext();paintQuick();if(dchip){}}
 var tkO=document.getElementById('mcTicket');(tkO||welcome0()).after(tk8);tk8.after(nx8);nx8.after(qk);
 function welcome0(){return scr.querySelector('.mycamp-welcome')}
 paintCk();paintNotes();paintAll();
 document.addEventListener('visibilitychange',paintAll);
 // Icône du 1er raccourci : billet si inscrit, crayon sinon
 var qi=grid.querySelector('.quick-icon'),pen=qi?qi.innerHTML:'';
 function syncIcon(){paintFiche();paintAll();if(!qi)return;var d=ld(RK,null),ok=!!(d&&d.Name),cur=qi.getAttribute('data-mc6')==='1';
  if(ok&&!cur){qi.innerHTML=svg('tick');qi.setAttribute('data-mc6','1')}
  else if(!ok&&cur){qi.innerHTML=pen;qi.removeAttribute('data-mc6')}}
 syncIcon();setInterval(syncIcon,1500);
 document.addEventListener('visibilitychange',function(){paintDays();syncIcon()});
 var os=window.showAppTab;if(typeof os==='function')window.showAppTab=function(){var r=os.apply(this,arguments);setTimeout(function(){paintDays();syncIcon()},60);return r};
})();
