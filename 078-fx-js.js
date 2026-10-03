
/* Animations d'actions — durée 0,7 s, non bloquantes, jouées uniquement à la 1re utilisation de chaque action.
   API : ActionFX.play('like', element?)  |  ou attribut data-fx="like" sur n'importe quel bouton */
(function(){
var C={b:'#1a56db',r:'#e5484d',g:'#0f9d6b',o:'#f06a0a',s:'#64748b'};
var I={
signup:'<circle cx="10" cy="8" r="4"/><path d="M2.5 20c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5M19 8v6M16 11h6"/>',
login:'<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><path d="M10 8l4 4-4 4M14 12H3"/>',
logout:'<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"/><path d="M16 8l4 4-4 4M20 12H9"/>',
like:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
comment:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
invite:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
avatar:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
cover:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
remove:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
ok:'<path d="M5 12.5l4.5 4.5L19 7"/>',
trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3"/>',
repeat:'<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
tent:'<path d="M3 20 12 4l9 16z"/><path d="M9.5 20 12 14.5l2.5 5.5M12 4V1.5l3 1-3 1"/>',
ticket:'<path d="M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3z"/><path d="M13 6v2M13 11v2M13 16v2"/>'};
/* [libellé, couleur, voile de fond, remplissage, icône] */
var T={signup:['Compte créé',C.b,1],login:['Connecté',C.b,1],logout:['Déconnecté',C.s],
like:['J’aime',C.r,0,1],unlike:['',C.s,0,0,'like'],comment:['Commentaires',C.b],send:['Commentaire envoyé',C.b],
share:['Partage',C.g],invite:['Invitation',C.o],avatar:['Photo de profil ajoutée',C.b],cover:['Couverture ajoutée',C.b],
remove:['Retiré',C.s],ok:['Enregistré',C.g],ticket:['Pré-inscription enregistrée',C.o,1],welcome:['Bienvenue au Camp',C.o,1,0,'tent'],
step0:['Identité validée',C.b,0,0,'ok'],step1:['Parcours validé',C.b,0,0,'ok'],step2:['Mission validée',C.g,0,0,'ok']};

var MILE={welcome:['tent','Bienvenue au Camp','Camp de District 3 en 1 · Garango 2026'],
step0:['ok','Identité validée','Passe à l’étape suivante'],step1:['ok','Parcours validé','Plus qu’une étape'],step2:['ok','Mission validée','Vérifie tout puis valide ta pré-inscription'],
signup:['signup','Compte créé','Bienvenue au Camp !'],login:['login','Content de te revoir','Reconnexion réussie'],logout:['logout','À bientôt !','Tu es déconnecté(e)']};
var EM={'🎉':'ok','👋':'logout','🤗':'login','💬':'comment','🏆':'trophy','🚀':'share','🔁':'repeat','🌄':'cover','📸':'avatar','🖼':'cover','✅':'ok','🪪':'ticket'};
function svg(k){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+(I[k]||I.ok).replace(/<(path|circle|rect)/g,'<$1 pathLength="1"')+'</svg>'}
function enhance(n){var c=n.querySelector&&n.querySelector('.fx-c');if(!c||c.getAttribute('data-fxd'))return;c.setAttribute('data-fxd','1');
 var e=c.querySelector('.fx-e'),k=c.getAttribute('data-ic')||(e&&EM[Array.from(e.textContent.trim())[0]])||'ok';
 var i=document.createElement('span');i.className='fx-i';i.innerHTML=svg(k);c.insertBefore(i,c.firstChild)}
function card(m){var e=document.createElement('div');e.className='fx big';
 e.innerHTML='<div class="fx-c" data-ic="'+m[0]+'"><span class="fx-e">•</span><b>'+m[1]+'</b><small>'+m[2]+'</small></div>';
 document.body.appendChild(e);try{navigator.vibrate&&navigator.vibrate(15)}catch(z){}
 setTimeout(function(){e.classList.add('out')},2300);setTimeout(function(){e.remove()},2700)}
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1&&n.classList&&n.classList.contains('fx'))enhance(n)})})}).observe(document.body,{childList:true});

var POP={like:['J’aime','Merci pour ton soutien',1],comment:['Commentaires','Rejoins la conversation'],send:['Commentaire envoyé','Merci pour ton message'],
share:['Partage','Fais connaître le Camp'],invite:['Invitation','Invite un ami à se pré-inscrire']};
function pop(m,el,t){var h=document.getElementById('fx');if(!h){h=document.createElement('div');h.id='fx';h.setAttribute('aria-hidden','true');document.body.appendChild(h)}
 var w=232,x=innerWidth/2,top=innerHeight*.4;
 if(el&&el.getBoundingClientRect){var r=el.getBoundingClientRect();if(r.width){x=r.left+r.width/2;top=r.top>100?r.top-74:r.bottom+8}}
 var e=document.createElement('div');e.className='fxp'+(m[2]?' h':'');
 e.style.left=Math.round(Math.min(Math.max(x-w/2,10),innerWidth-w-10))+'px';e.style.top=Math.round(Math.min(Math.max(top,10),innerHeight-90))+'px';
 e.innerHTML='<span class="i">'+svg(t)+'</span><div><b>'+m[0]+'</b><small>'+m[1]+'</small></div>';
 h.appendChild(e);try{navigator.vibrate&&navigator.vibrate(12)}catch(z){}setTimeout(function(){e.remove()},1900)}
var L={},last='',PF='fx_seen_';
function seen(t){try{return localStorage.getItem(PF+t)==='1'}catch(e){return !!L['s'+t]}}
function mark(t){L['s'+t]=1;try{localStorage.setItem(PF+t,'1')}catch(e){}}
function play(t,el){var s=T[t];if(!s)return;if(seen(t))return;var n=Date.now();if(L[t]&&n-L[t]<900)return;L[t]=n;mark(t);
 if(MILE[t]){card(MILE[t]);return}
 if(POP[t]){pop(POP[t],el,t);return}
 var h=document.getElementById('fx');if(!h){h=document.createElement('div');h.id='fx';h.setAttribute('aria-hidden','true');document.body.appendChild(h)}
 var x=innerWidth/2,y=innerHeight*.42;
 if(el&&el.getBoundingClientRect){var r=el.getBoundingClientRect();if(r.width){x=Math.min(Math.max(r.left+r.width/2,60),innerWidth-60);y=Math.min(Math.max(r.top+r.height/2,60),innerHeight-90)}}
 var p='';for(var k=0;k<8;k++){var a=k*Math.PI/4+.4;p+='<i class="p" style="--x:'+Math.round(Math.cos(a)*54)+'px;--y:'+Math.round(Math.sin(a)*54)+'px"></i>'}
 var e=document.createElement('div');e.style.setProperty('--c',s[1]);
 e.innerHTML=(s[2]?'<div class="w"></div>':'')+'<div class="m" style="left:'+x+'px;top:'+y+'px"><b class="r"></b>'+p+'<div class="d'+(s[3]?' h':'')+'"><svg viewBox="0 0 24 24">'+I[s[4]||t].replace(/<(path|circle|rect)/g,'<$1 pathLength="1"')+'</svg></div>'+(s[0]?'<div class="l">'+s[0]+'</div>':'')+'</div>';
 h.appendChild(e);setTimeout(function(){e.remove()},760);
 try{navigator.vibrate&&navigator.vibrate(12)}catch(z){}}
function dv(b){var n=b.closest('[data-v8],[data-v9],[data-c]');return n?[n.dataset.v8,n.dataset.v9,n.dataset.c].join(' '):''}
document.addEventListener('click',function(ev){var t=ev.target;if(!t||!t.closest||t.closest('#fx'))return;
 var f=t.closest('[data-fx]');if(f){play(f.dataset.fx,f);return}
 var b=t.closest('button,a,[role=button]');if(!b)return;
 var d=dv(b),c=String(b.className&&b.className.baseVal!==undefined?'':b.className),al=b.getAttribute('aria-label')||'';
 if(/\b(lk|cms-lk)\b/.test(c)||/^J’aime/.test(al)){setTimeout(function(){play(/\bon\b/.test(b.className)?'like':'unlike',b)},0);return}
 if(b.id==='v51Share'||/nviter/.test(al)){play('invite',b);return}
 if(/\b(sh|v51-share)\b/.test(c)||/^Partager/.test(al)||/share/i.test(b.getAttribute('onclick')||'')){play('share',b);return}
 if(/\bcm\b/.test(c)||/^Commentaires/.test(al)){play('comment',b);return}
 if(/avdel|cvdel|wipe/.test(d)){play('remove',b);return}
 if(/avadd|avatar/.test(d)||/v188-cam|p-cam/.test(c)){last='avatar';return}
 if(/cvadd|cover/.test(d)||/v188-pill/.test(c)){last='cover';return}
 if(/logout/.test(d)||/\bp-out\b/.test(c))play('logout')},true);
document.addEventListener('submit',function(ev){var f=ev.target,i=f&&f.closest&&f.closest('.ps-cm,[class*="cms"]')&&f.querySelector('input');
 if(i&&i.value.trim())play('send',f.querySelector('button'))},true);
var K=[[/retir|supprim/i,'remove'],[/compte créé/i,'signup'],[/reconnexion|content de te revoir/i,'login'],[/déconnect/i,'logout'],[/copi|enregistr/i,'ok']];
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){
 if(n.nodeType!==1||!/toast|(^|\s)(ac-t|v188-to|p-toast|cf-toast)(\s|$)/.test(String(n.className)))return;
 var x=n.textContent||'';for(var i=0;i<K.length;i++)if(K[i][0].test(x)){play(K[i][1]);break}})})}).observe(document.body,{childList:true});
var prev=-1;
function steps(){var E=[].slice.call(document.querySelectorAll('.reg-step'));if(!E.length)return;
 function cur(){for(var i=0;i<E.length;i++)if(E[i].classList.contains('active'))return i;return 0}
 prev=cur();var mo=new MutationObserver(function(){var n=cur();if(n>prev&&prev<3)play('step'+prev,document.getElementById('regNext'));prev=n});
 E.forEach(function(e){mo.observe(e,{attributes:true,attributeFilter:['class']})})}
function boot(){steps();setTimeout(function(){play('welcome')},1300)}
if(document.readyState==='complete')boot();else addEventListener('load',boot);
window.ActionFX={play:play,types:Object.keys(T),reset:function(){Object.keys(T).forEach(function(k){try{localStorage.removeItem(PF+k)}catch(e){}});L={}}};
})();
