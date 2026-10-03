
(function(){
 const $=id=>document.getElementById(id),syncs=[],CH='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const parts=t=>{const m=t.split(' — ');return m.length>1?esc(m[0])+' <i>('+esc(m.slice(1).join(' — '))+')</i>':esc(t)};
 let openMenu=null;
 function closeAll(f){if(!openMenu)return;openMenu.menu.hidden=true;openMenu.btn.setAttribute('aria-expanded','false');if(f)openMenu.btn.focus();openMenu=null}
 ['regSex','regBranch','regGrade','regBday','regBmonth','regByear','regRegion','regGroup','regTroop','regPatrol','regTitle'].forEach(id=>{const s=$(id);if(!s)return;const f=s.closest('.registration-field'),lab=f.querySelector('label').textContent.replace(/\s*\*/,'').replace(/\s*\(.*\)/,'').trim();
  const btn=document.createElement('button');btn.type='button';btn.className='reg-dd-btn';btn.setAttribute('aria-haspopup','listbox');btn.setAttribute('aria-expanded','false');
  const menu=document.createElement('ul');menu.className='reg-dd-menu';menu.id='dd-'+id;menu.hidden=true;menu.setAttribute('role','listbox');menu.setAttribute('aria-label',lab);btn.setAttribute('aria-controls',menu.id);
  const opts=[...s.options].slice(1).map(o=>{const li=document.createElement('li');li.className='reg-dd-opt';li.setAttribute('role','option');li.id='dd-'+id+'-'+o.index;li.dataset.v=o.value||o.text;li.dataset.i=o.index;li.innerHTML=parts(o.text);menu.append(li);return li}),all=opts,empty=document.createElement('li');empty.className='reg-dd-opt';empty.style.cssText='color:#7a86a3;cursor:default';empty.textContent='Choisis d\u2019abord ton district';empty.hidden=true;menu.append(empty);
  const sync=()=>{const o=s.options[s.selectedIndex],has=s.value!=='';btn.innerHTML=(has?'<span>'+parts(o.text)+'</span>':'<span class="ph">'+esc(s.options[0].text)+'</span>')+CH;all.forEach(li=>li.setAttribute('aria-selected',String(has&&li.dataset.v===s.value)))};
  let act=-1;let vis=all;const hl=i=>{if(!vis.length)return;act=Math.max(0,Math.min(vis.length-1,i));all.forEach(x=>x.classList.remove('act'));vis[act].classList.add('act');vis[act].scrollIntoView({block:'nearest'});btn.setAttribute('aria-activedescendant',vis[act].id)};
  const open=()=>{closeAll();if(window.v106Filter)window.v106Filter();all.forEach(li=>{li.hidden=!!s.options[li.dataset.i].hidden});vis=all.filter(x=>!x.hidden);empty.hidden=vis.length>0;menu.hidden=false;menu.classList.remove('up');btn.setAttribute('aria-expanded','true');openMenu={menu,btn};
   const nv=document.querySelector('.reg-nav'),nh=nv?nv.offsetHeight:0,r=btn.getBoundingClientRect(),below=innerHeight-r.bottom-nh,h=Math.min(menu.scrollHeight,innerHeight*.52);if(below<h+20&&r.top>below)menu.classList.add('up');
   {const st=document.querySelector('#registrationOverlay .v93-progress-labels'),top=st?st.getBoundingClientRect().bottom:0,up=menu.classList.contains('up'),room=up?r.top-Math.max(top,0)-16:innerHeight-r.bottom-nh-16;menu.style.maxHeight=Math.max(150,Math.min(420,room))+'px'}
   const i=vis.findIndex(x=>x.getAttribute('aria-selected')==='true');hl(i<0?0:i);setTimeout(()=>menu.scrollIntoView({block:'nearest',behavior:'smooth'}),30)};
  const pick=li=>{s.value=li.dataset.v;s.dispatchEvent(new Event('change',{bubbles:true}));sync();closeAll(true)};
  btn.onclick=()=>menu.hidden?open():closeAll();
  menu.onclick=e=>{const li=e.target.closest('.reg-dd-opt');if(li)pick(li)};
  btn.onkeydown=e=>{const k=e.key;if(menu.hidden){if(k==='ArrowDown'||k==='ArrowUp'){e.preventDefault();open()}return}
   if(k==='Escape'){e.preventDefault();e.stopPropagation();closeAll(true)}else if(k==='ArrowDown'){e.preventDefault();hl(act+1)}else if(k==='ArrowUp'){e.preventDefault();hl(act-1)}else if(k==='Home'){e.preventDefault();hl(0)}else if(k==='End'){e.preventDefault();hl(vis.length-1)}else if(k==='Enter'||k===' '){e.preventDefault();e.stopPropagation();if(vis[act])pick(vis[act])}else if(k==='Tab')closeAll()};
  s.after(btn,menu);f.classList.add('has-dd');s.addEventListener('change',sync);s.addEventListener('focus',()=>btn.focus());syncs.push(sync);sync()});
 document.addEventListener('click',e=>{if(openMenu&&!e.target.closest('.reg-dd-btn,.reg-dd-menu'))closeAll()});
 const o=window.regOnOpen;if(o)window.regOnOpen=function(){closeAll();const r=o.apply(this,arguments);syncs.forEach(f=>f());return r};
 const rf=$('registrationForm');if(rf)new MutationObserver(m=>{if(m.some(x=>x.target.classList&&x.target.classList.contains('reg-step')))closeAll()}).observe(rf,{attributes:true,attributeFilter:['class'],subtree:true,childList:false});
})();
