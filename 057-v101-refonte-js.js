
(function(){
 const $=id=>document.getElementById(id),syncs=[];
 ['regSex','regBranch','regGrade','regChurch'].forEach(id=>{const s=$(id);if(!s)return;const f=s.closest('.registration-field'),box=document.createElement('div');
  box.className='reg-chips';box.setAttribute('role','radiogroup');box.setAttribute('aria-label',f.querySelector('label').textContent.replace(/\s*\*/,'').trim());
  [...s.options].slice(1).forEach(o=>{const b=document.createElement('button');b.type='button';b.className='reg-chip';b.setAttribute('role','radio');b.dataset.v=o.value||o.text;b.textContent=o.text;
   b.onclick=()=>{s.value=b.dataset.v;s.dispatchEvent(new Event('change',{bubbles:true}));sync()};box.append(b)});
  const sync=()=>box.querySelectorAll('.reg-chip').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.v===s.value)));
  s.after(box);f.classList.add('has-chips');s.addEventListener('change',sync);syncs.push(sync);sync()});
 const o=window.regOnOpen;if(o)window.regOnOpen=function(){const r=o.apply(this,arguments);syncs.forEach(f=>f());return r};
 const form=$('registrationForm');if(form)new MutationObserver(()=>{const a=document.querySelector('.reg-step.active'),n=a?+a.dataset.step:0;
  document.querySelectorAll('.v93-progress-labels span').forEach((x,i)=>x.classList.toggle('done',i<n))}).observe(form,{attributes:true,attributeFilter:['class'],subtree:true});
})();
