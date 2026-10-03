
(function(){
 /* ===== En-tête de profil : hauteur = largeur × 2/3 (format 3:2) ===== */
 var root=document.getElementById('v193Plus');
 if(root){var upd=function(){var w=root.clientWidth;if(w>0)root.style.setProperty('--w3',Math.min(Math.round(w*2/3),380)+'px')};
  upd();if(window.ResizeObserver)new ResizeObserver(upd).observe(root);window.addEventListener('resize',upd)}

 /* ===== Éditeur de couverture 3:2 (déplacer + zoomer) ===== */
 var KC='camp_cover',KS='camp_cover_src',KT='camp_cover_t',ed=null;
 var g=function(k){try{return localStorage.getItem(k)}catch(e){return null}};
 var st=function(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}};
 var rm=function(k){try{localStorage.removeItem(k)}catch(e){}};
 function toast(m){var t=document.createElement('div');t.className='p-toast';t.textContent=m;document.body.appendChild(t);setTimeout(function(){t.remove()},2600)}
 var inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.hidden=true;document.body.appendChild(inp);
 inp.onchange=function(){var f=inp.files&&inp.files[0];inp.value='';if(!f)return;
  if(!/^image\//.test(f.type)){toast('Choisis une image.');return}
  var u=URL.createObjectURL(f),im=new Image();
  im.onerror=function(){URL.revokeObjectURL(u);toast('Image illisible.')};
  im.onload=function(){var r=Math.min(1,1800/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*r);c.height=Math.round(im.height*r);
   c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);
   var d=c.toDataURL('image/jpeg',.85);closeEd();openEd(d,null)};
  im.src=u};
 function closeEd(){if(!ed)return;var e=ed.el;window.removeEventListener('resize',ed.onr);ed=null;e.classList.remove('on');setTimeout(function(){e.remove()},220)}
 function openEd(src,t){
  if(ed)return;var im=new Image();
  im.onerror=function(){toast('Image illisible.')};
  im.onload=function(){build(im,src,t)};im.src=src}
 function build(im,src,t){
  var iw=im.naturalWidth,ih=im.naturalHeight,e=document.createElement('div');
  e.className='cve';e.setAttribute('role','dialog');e.setAttribute('aria-modal','true');e.setAttribute('aria-label','Ajuster la couverture');
  e.innerHTML='<div class="cve-hd"><button type="button" class="cve-b" data-x="no">Annuler</button><b>Couverture</b><button type="button" class="cve-b ok" data-x="ok">Enregistrer</button></div>'
   +'<div class="cve-bd"><p class="cve-t">Format 3:2 · glisse l’image pour la placer, pince ou utilise le curseur pour zoomer.<br>Ta photo et ton nom s’affichent sur la partie gauche.</p>'
   +'<div class="cve-fr"><img alt="" draggable="false"><i class="cve-gd"></i></div>'
   +'<div class="cve-zm"><span aria-hidden="true">−</span><input type="range" min="100" max="400" value="100" aria-label="Zoom"><span aria-hidden="true">+</span></div>'
   +'<div class="cve-ac"><button type="button" class="cve-s" data-x="chg">Changer l’image</button><button type="button" class="cve-s" data-x="rst">Recentrer</button></div></div>';
  document.body.appendChild(e);
  var fr=e.querySelector('.cve-fr'),img=fr.querySelector('img'),rg=e.querySelector('input[type=range]');
  var z=(t&&t.z)||1,nx=(t&&t.ox)||0,ny=(t&&t.oy)||0,fw=0,fh=0,P={},pd0=0,z0=1;
  img.src=src;
  function meas(){fw=fr.clientWidth;fh=fr.clientHeight}
  function draw(){if(!fw)meas();if(!fw)return;
   var s=Math.max(fw/iw,fh/ih)*z,mx=Math.max(0,(iw*s-fw)/2)/fw,my=Math.max(0,(ih*s-fh)/2)/fh;
   nx=Math.max(-mx,Math.min(mx,nx));ny=Math.max(-my,Math.min(my,ny));
   var dw=iw*s,dh=ih*s;img.style.width=dw+'px';img.style.height=dh+'px';
   img.style.left=(fw/2-dw/2+nx*fw)+'px';img.style.top=(fh/2-dh/2+ny*fh)+'px';rg.value=Math.round(z*100)}
  function dist(){var k=Object.keys(P),a=P[k[0]],b=P[k[1]];return Math.hypot(a.x-b.x,a.y-b.y)}
  fr.addEventListener('pointerdown',function(ev){try{fr.setPointerCapture(ev.pointerId)}catch(x){}P[ev.pointerId]={x:ev.clientX,y:ev.clientY};if(Object.keys(P).length===2){pd0=dist();z0=z}});
  fr.addEventListener('pointermove',function(ev){var p=P[ev.pointerId];if(!p)return;
   if(Object.keys(P).length===1){nx+=(ev.clientX-p.x)/fw;ny+=(ev.clientY-p.y)/fh;p.x=ev.clientX;p.y=ev.clientY}
   else{p.x=ev.clientX;p.y=ev.clientY;if(pd0>0)z=Math.max(1,Math.min(4,z0*dist()/pd0))}
   draw()});
  function up(ev){delete P[ev.pointerId]}
  fr.addEventListener('pointerup',up);fr.addEventListener('pointercancel',up);
  fr.addEventListener('wheel',function(ev){ev.preventDefault();z=Math.max(1,Math.min(4,z*(ev.deltaY<0?1.08:.93)));draw()},{passive:false});
  rg.addEventListener('input',function(){z=rg.value/100;draw()});
  function save(){
   meas();var s=Math.max(fw/iw,fh/ih)*z,W=1200,Hh=800,k=W/fw,c=document.createElement('canvas');c.width=W;c.height=Hh;
   var x=c.getContext('2d');x.fillStyle='#0b2a7a';x.fillRect(0,0,W,Hh);x.imageSmoothingQuality='high';
   x.drawImage(im,(fw/2-iw*s/2+nx*fw)*k,(fh/2-ih*s/2+ny*fh)*k,iw*s*k,ih*s*k);
   var q=[.86,.72,.58],out=null;for(var i=0;i<q.length;i++){var d=c.toDataURL('image/jpeg',q[i]);if(st(KC,d)){out=d;break}}
   if(!out){toast('Mémoire de l’appareil pleine : couverture non enregistrée.');return}
   if(st(KS,src))st(KT,JSON.stringify({z:z,ox:nx,oy:ny,n:out.length}));else{rm(KS);rm(KT)}
   closeEd();document.dispatchEvent(new Event('campprofile'))}
  e.addEventListener('click',function(ev){var b=ev.target.closest('[data-x]');if(!b)return;var a=b.dataset.x;
   if(a==='no')closeEd();else if(a==='ok')save();else if(a==='chg')inp.click();else if(a==='rst'){z=1;nx=0;ny=0;draw()}});
  var onr=function(){meas();draw()};window.addEventListener('resize',onr);
  ed={el:e,onr:onr};
  requestAnimationFrame(function(){meas();draw();requestAnimationFrame(function(){e.classList.add('on')})});
 }
 function openFromStore(){
  var cv=g(KC),sv=g(KS),t=null;try{t=JSON.parse(g(KT)||'null')}catch(e){}
  if(cv&&sv&&t&&t.n===cv.length)openEd(sv,t);else if(cv)openEd(cv,null);else inp.click()}
 var H=window.__v188;if(H){H.pickCover=openFromStore;H.editCover=openFromStore}
})();
