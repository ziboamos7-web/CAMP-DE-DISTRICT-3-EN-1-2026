
/* V240 — emojis de l’interface remplacés par des icônes SVG ; réactions (👍 ❤️ 😂…) conservées */
(function(){
 var P=function(d,fill){return '<svg viewBox="0 0 24 24" fill="'+(fill||'none')+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>'};
 var M={
  '📢':P('<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>'),
  '🏆':P('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>'),
  '📸':P('<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>'),
  '📷':P('<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>'),
  '📍':P('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
  '🎟':P('<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2M13 17v2M13 11v2"/>'),
  '📞':P('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>'),
  '📅':P('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
  '💬':P('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>'),
  '⬇':P('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>'),
  '✕':P('<path d="M18 6 6 18M6 6l12 12"/>'),
  '✓':P('<path d="M20 6 9 17l-5-5"/>'),
  '✅':P('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'),
  '★':P('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>','currentColor'),
  '♡':P('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'),
  '🗑':P('<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
  '📳':P('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M12 18h.01M3 8v8M21 8v8"/>'),
  '🎞':P('<rect x="2" y="2" width="20" height="20" rx="2.2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>'),
  '🪪':P('<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 10h4M14 14h4"/>'),
  '🖼':P('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>'),
  '↔':P('<path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/>'),
  '↻':P('<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>')
 };
 var HEART=P('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>','#e0245e');
 var keys=Object.keys(M).concat(['❤']);
 var RE=new RegExp('('+keys.join('|')+')\\uFE0F?','g');
 var SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,INPUT:1,OPTION:1,TITLE:1,NOSCRIPT:1,SVG:1,svg:1};
 var css=document.createElement('style');
 css.textContent='.emo{display:inline-flex;align-items:center;justify-content:center;width:1.15em;height:1.15em;vertical-align:-.2em;line-height:1}.emo svg{width:100%;height:100%;display:block}';
 document.head.appendChild(css);
 function icon(ch,parent){
  if(ch==='❤'){if(!(parent&&parent.closest&&parent.closest('.cms-lk')))return null;return HEART}
  return M[ch]||null}
 function fix(root){
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
   var p=n.parentNode;if(!p||SKIP[p.nodeName]||(p.closest&&p.closest('[data-noemo],.emo')))return NodeFilter.FILTER_REJECT;
   RE.lastIndex=0;return RE.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
  var list=[],n;while((n=w.nextNode()))list.push(n);
  list.forEach(function(t){
   var txt=t.nodeValue,frag=document.createDocumentFragment(),last=0,m,did=false;
   RE.lastIndex=0;
   while((m=RE.exec(txt))){
    var svg=icon(m[1],t.parentNode);if(!svg)continue;
    if(m.index>last)frag.appendChild(document.createTextNode(txt.slice(last,m.index)));
    var sp=document.createElement('span');sp.className='emo';sp.setAttribute('aria-hidden','true');sp.innerHTML=svg;frag.appendChild(sp);
    last=m.index+m[0].length;did=true}
   if(!did)return;
   if(last<txt.length)frag.appendChild(document.createTextNode(txt.slice(last)));
   t.parentNode.replaceChild(frag,t)})}
 var pend=false;
 function later(){if(pend)return;pend=true;requestAnimationFrame(function(){pend=false;try{fix(document.body)}catch(e){}})}
 new MutationObserver(later).observe(document.body,{childList:true,subtree:true,characterData:true});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',later);else later();
 window.addEventListener('load',later);

 /* Images du fil : si une image n'a pas été chargée, on la recharge */
 function heal(){document.querySelectorAll('#filCamp .fil-img img').forEach(function(im){
  if(im.complete&&im.naturalWidth===0&&im.src){var s=im.src;im.removeAttribute('loading');im.src='';im.src=s}})}
 window.addEventListener('load',function(){setTimeout(heal,600);setTimeout(heal,2500)});
})();
