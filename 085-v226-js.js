
(function(){
 var MK='camp_members_2026',$=function(i){return document.getElementById(i)};
 function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
 function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
 /* ===== « Nos troupes » : indisponible pour le moment ===== */
 var na=null,nt=0;
 var GI='<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle pathLength="1" cx="24" cy="22" r="8"/><path pathLength="1" d="M8 50c1-9 8-14 16-14s15 5 16 14"/><circle pathLength="1" cx="43" cy="26" r="6.5"/><path pathLength="1" d="M45 37c6 1 11 6 12 13"/></svg>';
 var CI='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5"/><path class="v226-hand" d="M12 12l3.2 2"/></svg>';
 function hideNA(){if(!na)return;var e=na;na=null;clearTimeout(nt);e.classList.add('out');setTimeout(function(){e.remove()},260);try{if(e._f)e._f.focus({preventScroll:true})}catch(x){}}
 function showNA(dn){
  if(na)return;
  var e=document.createElement('div');e.className='v226-na';e.setAttribute('role','alertdialog');e.setAttribute('aria-modal','true');e.setAttribute('aria-labelledby','v226T');
  e.innerHTML='<div class="v226-c"><div class="v226-ic"><span class="v226-ring"></span><span class="v226-ring r2"></span><span class="v226-g">'+GI+'</span><span class="v226-bd">'+CI+'</span></div><h3 id="v226T">Indisponible pour le moment</h3><p>La liste des troupes du district'+(dn?' de '+esc(dn):'')+' n’est pas accessible pour le moment.</p><button type="button" class="v226-ok">Compris</button><i class="v226-pr"><b></b></i></div>';
  document.body.appendChild(e);na=e;e._f=document.activeElement;
  e.addEventListener('click',function(ev){if(ev.target===e||ev.target.closest('.v226-ok'))hideNA()});
  nt=setTimeout(hideNA,3800);
  try{e.querySelector('.v226-ok').focus({preventScroll:true})}catch(x){}}
 function chip(t){return t&&t.closest?t.closest('.v72-addb'):null}
 document.addEventListener('click',function(e){var b=chip(e.target);if(!b||window.CAMP_TROUPES_DISPONIBLES===true)return;e.stopImmediatePropagation();e.preventDefault();showNA(b.getAttribute('data-dn'))},true);
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&na){hideNA();return}
  var b=chip(e.target);if(!b||window.CAMP_TROUPES_DISPONIBLES===true)return;if(e.key==='Enter'||e.key===' '){e.stopImmediatePropagation();e.preventDefault();showNA(b.getAttribute('data-dn'))}},true);

 /* ===== Liste des pré-inscrits par district ===== */
 var PAL=[['#efe8ff','#43118a'],['#ffeadb','#c24a00'],['#e3f3ea','#1d7a45'],['#e4efff','#1d4fa8'],['#fde6f1','#a3195b'],['#fff3cc','#8a6100']];
 var st={d:'',q:'',f:'all',n:15,cache:[]};
 function ld(){try{return JSON.parse(localStorage.getItem(MK)||'[]')||[]}catch(e){return[]}}
 function isChef(m){return /chef/i.test(m.p||'')}
 function core(n){return String(n||'').replace(/^\s*(CD|CT|CTA|CP|CA)\s+/i,'').trim()||String(n||'')}
 function ini(n){var w=core(n).split(/\s+/).filter(Boolean);return((w[0]||'?').charAt(0)+(w.length>1?w[w.length-1].charAt(0):'')).toUpperCase()}
 function col(n){var h=0,s=String(n);for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return PAL[Math.abs(h)%PAL.length]}
 function curDist(){var t=document.querySelector('#v63Tabs button.on');return t&&t.childNodes[0]?String(t.childNodes[0].textContent).trim():''}
 function mem(){var d=norm(st.d);return ld().filter(function(m){return norm(m.d)===d}).sort(function(a,b){return core(a.n).localeCompare(core(b.n),'fr',{sensitivity:'base'})})}
 var SRCH='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
 var PPL='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20"/><circle cx="10" cy="8" r="3.5"/><path d="M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.3M15.5 4.7a3.5 3.5 0 0 1 0 6.6"/></svg>';
 function shell(){
  var w=$('v226W');if(!w)return;
  var all=mem(),tot=all.length,ch=all.filter(isChef).length,el=tot-ch;
  var h='<div class="v226-hd"><div><h3>Membres pré-inscrits</h3><small>District de '+esc(st.d)+'</small></div><b class="v226-n">'+tot+'</b></div>';
  if(!tot){w.innerHTML=h+'<div class="v226-em"><i>'+PPL+'</i><b>Aucun membre pour l’instant</b><p>Les pré-inscrits du district de '+esc(st.d)+' apparaîtront ici.</p><button type="button" class="v226-reg">Je me pré-inscris</button></div>';return}
  h+='<div class="v226-sum"><div class="v226-bar"><i class="c" style="width:'+(ch/tot*100)+'%"></i><i class="e" style="width:'+(el/tot*100)+'%"></i></div><div class="v226-lg"><span><i style="background:#f05a00"></i>Chefs <b>'+ch+'</b></span><span><i style="background:#7a3ee0"></i>Éléments <b>'+el+'</b></span></div></div>';
  h+='<label class="v226-s">'+SRCH+'<input type="search" id="v226Q" placeholder="Rechercher un nom ou une église" autocomplete="off" enterkeyhint="search" aria-label="Rechercher un membre"><button type="button" class="v226-x" aria-label="Effacer">×</button></label><div class="v226-fl" id="v226Fl"></div><div id="v226Res" aria-live="polite"></div>';
  w.innerHTML=h;var q=$('v226Q');q.value=st.q;w.querySelector('.v226-x').classList.toggle('on',!!st.q);drawList()}
 function drawList(){
  var all=mem(),q=norm(st.q.trim()),ch=all.filter(isChef).length,fl=$('v226Fl'),res=$('v226Res');if(!fl||!res)return;
  fl.innerHTML=[['all','Tous',all.length],['chef','Chefs',ch],['el','Éléments',all.length-ch]].map(function(x){return '<button type="button" data-f="'+x[0]+'" class="'+(st.f===x[0]?'on':'')+'">'+x[1]+'<b>'+x[2]+'</b></button>'}).join('');
  var list=all.filter(function(m){if(st.f==='chef'&&!isChef(m))return false;if(st.f==='el'&&isChef(m))return false;return !q||norm(m.n+' '+(m.c||'')).indexOf(q)>-1});
  st.cache=list;
  if(!list.length){res.innerHTML='<div class="v226-nr">Aucun résultat'+(q?' pour « '+esc(st.q.trim())+' »':'')+'.</div>';return}
  var show=list.slice(0,st.n),grp=list.length>=8,last='',h='<div class="v226-lst">';
  show.forEach(function(m,k){
   if(grp){var L=norm(core(m.n)).charAt(0).toUpperCase();if(!/[A-Z]/.test(L))L='#';if(L!==last){last=L;h+='<div class="v226-gl">'+L+'</div>'}}
   var c=col(m.n),chef=isChef(m);
   h+='<button type="button" class="v226-m" data-k="'+k+'"><i class="v226-av" style="background:'+c[0]+';color:'+c[1]+'">'+esc(ini(m.n))+'</i><span class="v226-tx"><b>'+esc(m.n)+'</b><small>'+esc(m.c||('District de '+m.d))+'</small></span><em class="v226-tg '+(chef?'chef':'el')+'">'+(chef?'Chef':'Élément')+'</em><span class="v226-ch" aria-hidden="true">›</span></button>'});
  h+='</div>';
  if(list.length>show.length)h+='<button type="button" class="v226-more">Afficher plus ('+(list.length-show.length)+')</button>';
  res.innerHTML=h}
 function sheet(m){
  var c=col(m.n),chef=isChef(m),ov=$('v63Ov');if(!ov||!$('v63Body'))return;
  $('v63Body').innerHTML='<div class="v226-p"><i class="v226-big" style="background:'+c[0]+';color:'+c[1]+'">'+esc(ini(m.n))+'</i><h3>'+esc(m.n)+'</h3><em class="v226-tg '+(chef?'chef':'el')+'">'+(chef?'Chef':'Élément')+'</em><div class="v63-row"><span>District</span><b>District de '+esc(m.d)+'</b></div><div class="v63-row"><span>Formule</span><b>'+esc(m.p||'—')+'</b></div>'+(m.c?'<div class="v63-row"><span>Église / groupe</span><b>'+esc(m.c)+'</b></div>':'')+'<div class="v63-row"><span>Statut</span><b>Pré-inscrit</b></div><button type="button" class="v63-btn alt" id="v226Cl">Fermer</button></div>';
  ov.classList.add('open');ov.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  $('v226Cl').onclick=function(){var x=$('v63X');if(x)x.click()}}
 function bind(w){
  w.addEventListener('input',function(e){if(e.target.id!=='v226Q')return;st.q=e.target.value;st.n=15;var x=w.querySelector('.v226-x');if(x)x.classList.toggle('on',!!st.q);drawList()});
  w.addEventListener('click',function(e){var t=e.target,b;
   if(b=t.closest('.v226-fl button')){st.f=b.getAttribute('data-f');st.n=15;drawList();return}
   if(t.closest('.v226-x')){st.q='';var q=$('v226Q');if(q){q.value='';q.focus()}t.closest('.v226-x').classList.remove('on');st.n=15;drawList();return}
   if(t.closest('.v226-more')){st.n+=15;drawList();return}
   if(b=t.closest('.v226-m')){var m=st.cache[+b.getAttribute('data-k')];if(m)sheet(m);return}
   if(t.closest('.v226-reg')){if(window.openRegistration)window.openRegistration()}})}
 function sync(){var d=curDist();if(!d)return;if(d!==st.d){st.d=d;st.q='';st.f='all';st.n=15}shell()}
 var host=$('v63List'),tabs=$('v63Tabs');
 if(host&&tabs){var w=document.createElement('div');w.id='v226W';w.className='v226-w';host.parentNode.insertBefore(w,host.nextSibling);bind(w);
  new MutationObserver(sync).observe(tabs,{childList:true});sync()}
})();
