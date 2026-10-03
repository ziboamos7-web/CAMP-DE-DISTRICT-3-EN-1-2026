
(function(){
 const KEY='camp_registration_2026',scr=document.getElementById('screenMonCamp');if(!scr)return;
 const welcome=scr.querySelector('.mycamp-welcome');if(!welcome)return;
 const T0=new Date(2026,9,28),T1=new Date(2026,10,2);
 const cnt=document.createElement('div');cnt.className='mc-count';cnt.id='mcCount';
 const tk=document.createElement('div');tk.className='mc-tk';tk.id='mcTicket';tk.hidden=true;
 welcome.after(cnt);cnt.after(tk);
 const reg=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}};
 const mk=(tag,txt,cls)=>{const e=document.createElement(tag);if(cls)e.className=cls;e.textContent=txt;return e};
 const openT=()=>{if(window.openTicket)window.openTicket()};
 function refresh(){
  const now=new Date(),d=reg(),ok=!!(d&&d.Name);
  let big,t1,t2;
  if(now<T0){const n=Math.ceil((T0-now)/864e5);big='J-'+n;t1=n===1?'Demain, le Camp commence !':'avant le début du Camp';t2='Mercredi 28 octobre 2026 · Collège FOHOUNDI, Garango'}
  else if(now<T1){const n=Math.min(5,Math.floor((now-T0)/864e5)+1);big='Jour '+n;t1='sur 5 · le Camp est en cours';t2='Collège FOHOUNDI, Garango'}
  else{big='Merci';t1='Le Camp est terminé';t2='À très bientôt pour la suite de l’aventure'}
  cnt.replaceChildren(mk('b',big));const w=document.createElement('div');w.append(mk('span',t1),mk('small',t2));cnt.append(w);
  scr.classList.toggle('mc-reg',ok);tk.hidden=!ok;
  if(ok){
   const num=window.campTicketNum?window.campTicketNum(d):(d.TicketNumber||''),pr=String(d.Price||'').replace(/\B(?=(\d{3})+(?!\d))/g,'\u00a0'),
    meta=[d.Troop,d.Group,pr?(/8000/.test(d.Price)?'Chef':'Élément')+' – '+pr+' F':''].filter(Boolean).join(' · ');
   const c=document.createElement('div');c.append(mk('small','MON TICKET · N° DU TICKET'),mk('b',num||'—'),mk('em',meta||'Pré-inscription enregistrée'));
   const b=mk('button','Ouvrir');b.type='button';b.onclick=openT;tk.replaceChildren(c,b);
  }
  const q=scr.querySelector('.mycamp-quick'),sb=document.getElementById('myCampStatusBtn');
  if(q)q.onclick=ok?openT:()=>window.openRegistration&&window.openRegistration();
  if(sb)sb.onclick=ok?openT:()=>window.openRegistration&&window.openRegistration();
 }
 ['showAppTab','closeRegistration','closeTicket'].forEach(n=>{const f=window[n];if(typeof f==='function')window[n]=function(){const r=f.apply(this,arguments);setTimeout(refresh,60);return r}});
 window.addEventListener('storage',refresh);document.addEventListener('visibilitychange',refresh);
 setInterval(refresh,60000);refresh();
})();
