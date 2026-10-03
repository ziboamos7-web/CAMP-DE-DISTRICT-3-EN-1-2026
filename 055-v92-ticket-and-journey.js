
(function(){
 const KEY='camp_registration_2026';
 function val(v){return v||'—'}
 function ticketId(d){return String(d&&d.TicketNumber||'')}
 function item(label,value){let x=document.createElement('div');x.className='v92-ticket-item';let a=document.createElement('small');a.textContent=label;let b=document.createElement('b');b.textContent=val(value);x.append(a,b);return x}
 window.openTicket=function(){
  let d={};try{d=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
  let box=document.getElementById('v49Card');if(!box)return;
  if(!d.Name){box.innerHTML='<div class="v49-empty"><h3>Pas encore de ticket</h3><p>Termine ta pré-inscription pour obtenir ton ticket personnel.</p><button class="v49-close" onclick="closeTicket();openRegistration()">Commencer la pré-inscription</button><button class="v49-edit" onclick="closeTicket()">Fermer</button></div>'}
  else{
   box.textContent='';let card=document.createElement('div');card.className='v92-ticket';
   let head=document.createElement('div');head.className='v92-ticket-head';let mark=document.createElement('div');mark.className='v92-ticket-mark';mark.textContent='3 EN 1';let ht=document.createElement('div');let sm=document.createElement('small');sm.textContent='CAMP DE DISTRICT';let h=document.createElement('h2');h.textContent='FOHOUNDI 2026';let p=document.createElement('p');p.textContent='Collège FOHOUNDI · Bouaflé';ht.append(sm,h,p);head.append(mark,ht);
   let rib=document.createElement('div');rib.className='v92-ticket-ribbon';rib.textContent='TICKET DE PARTICIPATION';
   let main=document.createElement('div');main.className='v92-ticket-main';let person=document.createElement('div');person.className='v92-ticket-person';if(d.Photo){let im=document.createElement('img');im.className='v92-ticket-photo';im.src=d.Photo;im.alt='Photo du participant';person.append(im)}let pn=document.createElement('div');let name=document.createElement('strong');name.textContent=val(d.Name);let sub=document.createElement('small');sub.textContent=(val(d.Title))+' · '+val(d.Branch);pn.append(name,sub);person.append(pn);main.append(person);
   let grid=document.createElement('div');grid.className='v92-ticket-grid';[["TÉLÉPHONE",d.Phone],["DATE DE NAISSANCE",d.Birth],["BRANCHE",d.Branch],["GRADE",d.Grade],["RÉGION",d.Region],["DISTRICT",d.Group],["TROUPE",d.Troop],["PATROUILLE",d.Patrol],["TITRE",d.Title],["SECTEUR",d.Sector||'Centre']].forEach(a=>grid.append(item(a[0],a[1])));main.append(grid);
   let price=document.createElement('div');price.className='v92-ticket-price';let pl=document.createElement('b');pl.textContent='TARIF SÉLECTIONNÉ';let pv=document.createElement('b');pv.textContent=(d.Price||'—')+' F CFA';price.append(pl,pv);main.append(price);
   let foot=document.createElement('div');foot.className='v92-ticket-bottom';let note=document.createElement('p');note.textContent='Présente ce ticket à l’accueil du Camp. Conserve-le sur ton téléphone.';let code=document.createElement('div');code.className='v92-ticket-code';code.textContent=ticketId(d);foot.append(note,code);card.append(head,rib,main,foot);box.append(card);
   let actions=document.createElement('div');actions.className='v92-ticket-actions';let print=document.createElement('button');print.textContent='Télécharger / Imprimer';print.onclick=function(){window.print()};let close=document.createElement('button');close.className='secondary';close.textContent='Fermer';close.onclick=function(){window.closeTicket()};actions.append(print,close);box.append(actions);
  }
  let o=document.getElementById('v49Ov');o.classList.add('open');let n=document.getElementById('floatingAppNav');if(n)n.style.display='none';document.body.style.overflow='hidden';
 };
 // Après confirmation, proposer immédiatement l'ouverture du ticket.
 let original=window.saveRegistration;
 if(typeof original==='function')window.saveRegistration=function(e){original(e);let status=document.getElementById('registrationStatus');if(status&&!status.querySelector('.v92-show-ticket')){let b=document.createElement('button');b.type='button';b.className='registration-submit v92-show-ticket';b.style.marginTop='10px';b.textContent='Voir mon ticket →';b.onclick=function(){window.closeRegistration();window.openTicket()};status.appendChild(b)}};
})();
