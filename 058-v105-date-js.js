
(function(){
 const $=id=>document.getElementById(id),bf=document.querySelector('.birth-field'),bi=$('regBirth');
 if(!bf||!bi)return;
 const MOIS=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
 const wrap=document.createElement('div');wrap.className='v105-date';
 const mk=(id,label,ph,opts)=>{const f=document.createElement('div');f.className='registration-field';
  const l=document.createElement('label');l.htmlFor=id;l.textContent=label;const s=document.createElement('select');s.id=id;
  s.innerHTML='<option value="">'+ph+'</option>'+opts.map(o=>'<option value="'+o[0]+'">'+o[1]+'</option>').join('');
  f.append(l,s);wrap.append(f);return s};
 const yMax=new Date().getFullYear(),Y=[];for(let y=yMax;y>=1940;y--)Y.push([y,y]);
 const D=[];for(let i=1;i<=31;i++)D.push([i,i]);
 const sd=mk('regBday','Jour','Jour',D),sm=mk('regBmonth','Mois','Mois',MOIS.map((m,i)=>[i+1,m])),sy=mk('regByear','Année','Année',Y);
 bf.querySelector('label').after(wrap);bi.tabIndex=-1;
 const p2=n=>String(n).padStart(2,'0');
 function fromSelects(){
  if(sd.value&&sm.value&&sy.value){const max=new Date(+sy.value,+sm.value,0).getDate();
   if(+sd.value>max){sd.value=String(max);sd.dispatchEvent(new Event('change',{bubbles:true}))}
   bi.value=sy.value+'-'+p2(sm.value)+'-'+p2(sd.value)}else bi.value='';
  bi.dispatchEvent(new Event('input',{bubbles:true}));bi.dispatchEvent(new Event('change',{bubbles:true}))}
 [sd,sm,sy].forEach(s=>s.addEventListener('change',fromSelects));
 function toSelects(){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(bi.value||'');
  sd.value=m?String(+m[3]):'';sm.value=m?String(+m[2]):'';sy.value=m?m[1]:'';
  if(m&&sy.value!==m[1])sy.value=''}
 const o=window.regOnOpen;if(o)window.regOnOpen=function(){const r=o.apply(this,arguments);toSelects();return r};
})();
