
(function(){
 var P={user:'<circle cx="12" cy="8.5" r="3.6"/><path d="M5 20c1-4 4-5.5 7-5.5s6 1.5 7 5.5"/>',
  tk:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 6v12"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  news:'<path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM18 9h2v9a2 2 0 0 1-2 2M8 8h7M8 12h7M8 16h4"/>',
  img:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',
  gal:'<rect x="6" y="3" width="15" height="15" rx="3"/><path d="M3 7v11a3 3 0 0 0 3 3h11M9 13l3-3 3 3 2-2 2 2"/>',
  head:'<path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1z"/>',
  set:'<path d="M4 8h9M17 8h3M4 16h3M11 16h9"/><circle cx="15" cy="8" r="2"/><circle cx="9" cy="16" r="2"/>',
  cam:'<path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'};
 var sv=function(n){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+P[n]+'</svg>'};
 var esc=function(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
 var scr=document.getElementById('screenPlus');if(!scr)return;
 var root=document.createElement('div');root.id='v190Plus';scr.insertBefore(root,scr.firstChild);
 function row(k,ic,col,t,sub){return '<button type="button" class="v188-row" data-v9="'+k+'"><i style="background:'+col+'">'+sv(ic)+'</i><span class="t"><b>'+t+'</b><small>'+sub+'</small></span></button>'}
 function render(){
  var H=window.__v188||{},d=H.reg?H.reg():null,cv=H.cover?H.cover():'',av=H.avatar?H.avatar():'';
  var nm=d?d.Name:'Mon profil',ini=(nm.trim().charAt(0)||'S').toUpperCase();
  var sub=d?([d.Phone?'+225 '+String(d.Phone).replace(/^\+?225/,'').trim():'',d.Group||''].filter(Boolean).join(' • ')):'Touche ici pour te pré-inscrire';
  root.innerHTML='<div class="v188-cv" style="'+(cv?'background-image:url('+cv+')':'')+'"><div class="v188-cvb"><button type="button" class="v188-pill" data-v9="cover">'+sv('img')+(cv?'Changer':'Ajouter une couverture')+'</button></div></div>'
  +'<div class="v188-id"><div class="v188-av" style="'+(av?'background-image:url('+av+');font-size:0':'')+'">'+esc(ini)+'<button type="button" class="v188-cam" data-v9="avatar" aria-label="Changer ma photo de profil">'+sv('cam')+'</button></div><h2 data-v9="acc">'+esc(nm)+'</h2><p>'+esc(sub)+'</p></div>'
  +'<div class="v188-card">'
  +row('acc','user','#2b8cf0','Ma pré-inscription','Détails de ma participation')
  +(d?row('tk','tk','#7c4dff','Mon ticket','N° d’inscription et QR code'):'')
  +row('prog','list','#3a56d4','Programme du Camp','Activités et horaires')
  +row('news','news','#f08a1c','Actualités','Les dernières informations')
  +row('frame','img','#e8a317','Ma photo du Camp','Cadre photo à partager')
  +row('gal','gal','#a259e6','Galerie','Photos du Collège FOHOUNDI')
  +'</div><div class="v188-card">'
  +row('help','head','#1fb5a8','Contact & Assistance','Nous appeler ou nous écrire')
  +row('set','set','#8e5be8','Paramètres','Profil, couverture, réglages')
  +'</div><div class="v190-sig"><b>Camp de District 3 en 1</b>Garango 2026 · 5 jours · 1 expérience · 1 communauté</div>'}
 var A={
  cover:function(){window.__v188&&__v188.pickCover()},avatar:function(){window.__v188&&__v188.pickAvatar()},
  acc:function(){window.openRegistration&&openRegistration()},
  tk:function(){window.openTicket&&openTicket()},
  prog:function(){window.openPresenter&&openPresenter('programme')},
  news:function(){window.goFil&&goFil()},
  frame:function(){window.goCampFrame&&goCampFrame()},
  gal:function(){window.openPresenter&&openPresenter('lieu')},
  help:function(){window.openContactSheet&&openContactSheet()},
  set:function(){window.openSettingsSheet&&openSettingsSheet()}};
 root.addEventListener('click',function(e){var b=e.target.closest('[data-v9]');if(!b||!root.contains(b))return;var f=A[b.dataset.v9];if(f)f()});
 render();
 document.addEventListener('campprofile',render);
 var os=window.showAppTab;if(typeof os==='function')window.showAppTab=function(t){var r=os.apply(this,arguments);if(t==='plus')setTimeout(render,30);return r};
 window.addEventListener('storage',render);
})();
