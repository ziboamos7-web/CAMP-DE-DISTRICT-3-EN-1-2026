
(function(){
 const KEY='camp_registration_2026';
 const $=id=>document.getElementById(id);
 const safe=v=>(v===undefined||v===null||String(v).trim()==='')?'—':String(v);
 function getData(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
 function ticketCode(d){return String(d&&d.TicketNumber||'')}
 function field(label,value){const x=document.createElement('div');x.className='v93-item';const a=document.createElement('small');a.textContent=label;const b=document.createElement('b');b.textContent=safe(value);x.append(a,b);return x}
 window.openTicket=function(){
  const d=getData(),box=$('v49Card');if(!box)return;
  box.textContent='';
  if(!d.Name){const empty=document.createElement('div');empty.className='v49-empty';empty.innerHTML='<h3>Pas encore de ticket</h3><p>Termine ta pré-inscription pour obtenir ton ticket personnel.</p>';const b=document.createElement('button');b.type='button';b.className='v49-close';b.textContent='Commencer la pré-inscription';b.onclick=()=>{window.closeTicket();window.openRegistration()};empty.append(b);box.append(empty)}
  else{
   const card=document.createElement('article');card.className='v93-ticket';
   const head=document.createElement('header');head.className='v93-head';const logo=document.createElement('div');logo.className='v93-logo';logo.textContent='CAMP\n3 EN 1';const branding=document.createElement('div');const sm=document.createElement('small');sm.textContent='CAMP DE DISTRICT';const h=document.createElement('h2');h.textContent='FOHOUNDI 2026';const sub=document.createElement('p');sub.textContent='Collège FOHOUNDI · Bouaflé';branding.append(sm,h,sub);head.append(logo,branding);
   const rib=document.createElement('div');rib.className='v93-ribbon';rib.textContent='TICKET DE PARTICIPATION';
   const main=document.createElement('div');main.className='v93-main';const person=document.createElement('div');person.className='v93-person';if(d.Photo){const im=document.createElement('img');im.className='v93-photo';im.src=d.Photo;im.alt='Photo du participant';person.append(im)}const who=document.createElement('div');const name=document.createElement('div');name.className='v93-name';name.textContent=safe(d.Name);const title=document.createElement('div');title.className='v93-sub';title.textContent=safe(d.Title)+' · '+safe(d.Branch);who.append(name,title);person.append(who);main.append(person);
   const grid=document.createElement('div');grid.className='v93-grid';[
    ['CONTACT',d.Phone],['DATE DE NAISSANCE',d.Birth],['SEXE',d.Sex],['BRANCHE',d.Branch],['GRADE',d.Grade],['RÉGION',d.Region],['DISTRICT',d.Group],['TROUPE',d.Troop],['PATROUILLE',d.Patrol],['TITRE',d.Title],['SECTEUR',d.Sector||'Centre']
   ].forEach(a=>grid.append(field(a[0],a[1])));main.append(grid);
   const price=document.createElement('div');price.className='v93-price';const pl=document.createElement('b');pl.textContent='TARIF DU TICKET';const pv=document.createElement('b');pv.textContent=safe(d.Price)+' F CFA';price.append(pl,pv);main.append(price);
   const foot=document.createElement('footer');foot.className='v93-foot';const note=document.createElement('p');note.textContent='Présente ce ticket à l’accueil du Camp. Conserve-le sur ton téléphone.';const code=document.createElement('div');code.className='v93-code';code.textContent=ticketCode(d);foot.append(note,code);
   card.append(head,rib,main,foot);box.append(card);
   const actions=document.createElement('div');actions.className='v93-actions';const print=document.createElement('button');print.type='button';print.textContent='Télécharger / Imprimer';print.onclick=()=>window.print();const close=document.createElement('button');close.type='button';close.className='secondary';close.textContent='Fermer';close.onclick=()=>window.closeTicket();actions.append(print,close);box.append(actions);
  }
  const ov=$('v49Ov');if(ov)ov.classList.add('open');const nav=$('floatingAppNav');if(nav)nav.style.display='none';document.body.style.overflow='hidden';
 };
 // Afficher des libellés d’étapes et synchroniser l’étape active.
 function labels(){const p=$('regProgress');if(!p||p.nextElementSibling?.classList.contains('v93-progress-labels'))return;const row=document.createElement('div');row.className='v93-progress-labels';['Identité','Parcours','Mission','Ticket'].forEach((t,i)=>{const s=document.createElement('span');s.textContent=t;s.dataset.step=i;row.append(s)});p.after(row);sync()}
 function sync(){const active=document.querySelector('.reg-step.active');const n=active?Number(active.dataset.step):0;document.querySelectorAll('.v93-progress-labels span').forEach((x,i)=>x.classList.toggle('current',i===n))}
 const oldMove=window.regMove;if(typeof oldMove==='function')window.regMove=function(dir){const r=oldMove.apply(this,arguments);sync();return r};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',labels);else labels();
 // Après enregistrement effectif, ouvrir le ticket final plutôt que laisser l’utilisateur dans le formulaire.
 const oldSave=window.saveRegistration;
 if(typeof oldSave==='function')window.saveRegistration=function(e){const result=oldSave.apply(this,arguments);const d=getData();if(d&&d.Name){window.closeRegistration();window.openTicket()}return result};
})();
