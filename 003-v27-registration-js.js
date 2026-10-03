
/* V100 — parcours d'inscription : état lu depuis le DOM, validation en ligne, brouillon, récapitulatif */
(function(){
 const key='camp_registration_2026',dkey='camp_registration_draft_2026';
 const $=id=>document.getElementById(id);
 const FIELDS=['regName','regPhone','regEmail','regAddress','regBirth','regBirthPlace','regNation','regSex','regBranch','regGrade','regRegion','regRegionOther','regGroup','regTroop','regChurch','regChurchOther','regPatrol','regPatrolOther','regTitle'];
 const MAP={Name:'regName',Phone:'regPhone',ContactEmail:'regEmail',Address:'regAddress',Birth:'regBirth',BirthPlace:'regBirthPlace',Nation:'regNation',Sex:'regSex',Branch:'regBranch',Grade:'regGrade',Group:'regGroup',Troop:'regTroop',Title:'regTitle'};
 const CHURCHES=['CMA','UEESO','AEECI'];
 const CHEF=['CTA','CT','CD','CR','CNA','CN'];
 const REGIONS=['Bouaflé 1'],PATROLS=['Lion','Tigre','Guépard','Abeille','Chat','Colombe','Coq'];
 const form=$('registrationForm'),sheet=document.querySelector('#registrationOverlay .registration-sheet');
 let photoData='',filledFromSaved=false,dt=null;
 const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const money=p=>String(p).replace(/\B(?=(\d{3})+(?!\d))/g,'\u00a0');
 const cur=()=>{const a=document.querySelector('.reg-step.active');return a?+a.dataset.step:0};
 const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}};
 const isComplete=d=>!!(d&&d.Name&&d.Price);

 /* ---------- messages ---------- */
 let toastT;
 function toast(msg){let t=$('regToast');if(!t){t=document.createElement('div');t.id='regToast';t.className='reg-toast';t.setAttribute('role','status');document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),4500)}

 /* ---------- validation ---------- */
 const digits=v=>String(v||'').replace(/\D/g,'');
 const need=m=>v=>v?'':m;
 const V={
  regName:v=>(v.trim().length<3||!/[A-Za-zÀ-ÿ]/.test(v))?'Saisis ton nom et tes prénoms.':'',
  regPhone:v=>{const n=digits(v).length;return(n<8||n>15)?'Numéro invalide. Exemple : 07 00 00 00 00.':''},
  regBirth:v=>{if(!v)return'Indique ta date de naissance.';const d=new Date(v);return(isNaN(d)||d>new Date()||d.getFullYear()<1930)?'Date de naissance invalide.':''},
  regEmail:v=>(v.trim()&&!/^\S+@\S+\.\S+$/.test(v.trim()))?'E-mail invalide.':'',
  regAddress:v=>v.trim().length<3?'Indique ton adresse (quartier, ville).':'',
  regBirthPlace:v=>v.trim().length<2?'Indique ton lieu de naissance.':'',
  regNation:v=>v.trim().length<3?'Indique ta nationalité.':'',
  regChurch:need('Choisis ton église.'),
  regChurchOther:v=>($('regChurch').value==='Autre'&&v.trim().length<2)?'Précise ton église.':'',
  regEngage:()=>'',
  regSex:need('Choisis ton sexe.'),regBranch:need('Choisis ta branche.'),regGrade:need('Choisis ton grade.'),
  regRegion:need('Choisis ta région.'),
  regRegionOther:v=>($('regRegion').value==='Autre'&&v.trim().length<2)?'Précise ta région.':'',
  regGroup:need('Choisis ton district.'),
  regTroop:v=>{const g=$('regGroup').value,o=[...$('regTroop').options].find(x=>x.value===v&&v);return(!v||(g&&o&&o.dataset.d!==g))?'Choisis ta troupe.':''},
  regPatrolOther:v=>($('regPatrol').value==='Autre'&&v.trim().length<2)?'Précise ta patrouille.':'',
  regTitle:need('Choisis ton titre.')
 };
 const STEP_IDS=[['regName','regPhone','regEmail','regAddress','regBirth','regBirthPlace','regNation','regSex'],['regBranch','regGrade'],['regRegion','regRegionOther','regGroup','regTroop','regChurch','regChurchOther','regPatrolOther','regTitle'],['price','regEngage']];
 function errEl(id){let e=$('err-'+id);if(e)return e;e=document.createElement('span');e.className='reg-err';e.id='err-'+id;e.hidden=true;e.setAttribute('role','alert');
  if(id==='price'){const p=document.querySelectorAll('.reg-step[data-step="3"] .reg-price');p[p.length-1].after(e)}
  else if(id==='regRegionOther'||id==='regPatrolOther'||id==='regChurchOther')$(id).after(e);
  else if(id==='regEngage')$(id).closest('label').after(e);
  else $(id).closest('.registration-field').append(e);
  return e}
 function setErr(id,msg){const e=errEl(id);e.textContent=msg;e.hidden=!msg;if(id==='price')return;const el=$(id);el.setAttribute('aria-invalid',msg?'true':'false');if(msg)el.setAttribute('aria-describedby',e.id);else el.removeAttribute('aria-describedby')}
 function check(id){if(id==='price'){const bad=!document.querySelector('input[name="regPrice"]:checked');setErr('price',bad?'Choisis le tarif de ton ticket.':'');return bad}
  const m=V[id]($(id).value);setErr(id,m);return!!m}
 function validateStep(n){let first=null;STEP_IDS[n].forEach(id=>{if(check(id)&&!first)first=id});return first}
 function focusField(id){const el=id==='price'?document.querySelector('input[name="regPrice"]'):$(id);if(!el)return;const t=id==='price'?el.closest('.reg-price'):el;t.scrollIntoView({block:'center',behavior:'smooth'});setTimeout(()=>el.focus({preventScroll:true}),260)}

 /* ---------- navigation ---------- */
 const LABELS=['Identité','Parcours','Mission','Ticket'];
 function go(n,keepScroll){n=Math.max(0,Math.min(3,n));
  document.querySelectorAll('.reg-step').forEach((x,i)=>x.classList.toggle('active',i===n));
  document.querySelectorAll('.reg-dot').forEach((x,i)=>{x.classList.toggle('active',i===n);x.classList.toggle('done',i<n)});
  document.querySelectorAll('.v93-progress-labels span').forEach((x,i)=>x.classList.toggle('current',i===n));
  $('regPrev').style.display=n?'block':'none';$('regNext').style.display=n<3?'block':'none';$('regSubmit').style.display=n===3?'block':'none';
  if(n===3){suggestPrice();buildRecap()}
  const live=$('regStepLive');if(live)live.textContent='Étape '+(n+1)+' sur 4 : '+LABELS[n];
  if(!keepScroll&&sheet)sheet.scrollTop=0;
  saveDraft()}
 window.regMove=function(dir){const n=cur();if(dir>0){const bad=validateStep(n);if(bad){focusField(bad);return}}go(n+dir)};

 /* ---------- tarif suggéré + récapitulatif ---------- */
 function suggestPrice(){const t=$('regTitle').value,rec=CHEF.includes(t)?'8000':'7000';
  document.querySelectorAll('.reg-price').forEach(l=>{const r=l.querySelector('input'),sp=l.querySelector('span');let b=l.querySelector('.reg-reco');if(!b){b=document.createElement('em');b.className='reg-reco';sp.append(b)}
   const on=t&&r.value===rec;b.textContent=on?'Suggéré pour ton titre ('+t+')':'';b.hidden=!on})}
 function fmtDate(v){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(v||'');return m?m[3]+'/'+m[2]+'/'+m[1]:v}
 function buildRecap(){let box=$('regRecap');
  if(!box){box=document.createElement('div');box.id='regRecap';box.className='reg-recap';document.querySelector('.reg-step[data-step="3"] .reg-engage').before(box);
   box.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)go(+b.dataset.go)})}
  const g=id=>$(id).value.trim(),church=$('regChurch').value==='Autre'?g('regChurchOther'):$('regChurch').value,region=$('regRegion').value==='Autre'?g('regRegionOther'):$('regRegion').value,patrol=$('regPatrol').value==='Autre'?g('regPatrolOther'):$('regPatrol').value;
  const row=(l,v)=>'<div class="reg-rc-row"><span>'+l+'</span><b>'+esc(v||'—')+'</b></div>';
  const sec=(t,n,rows,extra)=>'<div class="reg-rc"><div class="reg-rc-h"><span>'+t+'</span><button type="button" data-go="'+n+'">Modifier</button></div>'+(extra||'')+rows+'</div>';
  const ph=photoData?'<img class="reg-rc-photo" alt="Ta photo" src="'+photoData+'">':'';
  box.innerHTML='<p class="reg-rc-intro">Récapitulatif — vérifie tes informations avant de confirmer.</p>'+
   sec('Identité',0,row('Nom',g('regName'))+row('Contact',g('regPhone'))+row('E-mail',g('regEmail'))+row('Adresse',g('regAddress'))+row('Naissance',fmtDate($('regBirth').value))+row('Lieu de naissance',g('regBirthPlace'))+row('Nationalité',g('regNation'))+row('Sexe',$('regSex').value),ph)+
   sec('Parcours',1,row('Branche',$('regBranch').value)+row('Grade',$('regGrade').value))+
   sec('Mission',2,row('Région',region)+row('District',$('regGroup').value)+row('Troupe',g('regTroop'))+row('Église',church)+row('Patrouille',patrol)+row('Titre',$('regTitle').value))+sec('Ticket',3,row('Numéro du ticket',String($('regTicketNumber')?.value||'').padStart(4,'0')))}

 /* ---------- photo ---------- */
 const photoInput=$('regPhoto'),photoBtn=$('regPhotoChoose');
 function setPhoto(src){photoData=src;$('regPhotoPreview').src=src;$('regPhotoPreview').hidden=false;$('regPhotoPlaceholder').hidden=true;$('regPhotoLabel').textContent='Photo ajoutée';if(photoBtn)photoBtn.textContent='Changer la photo';$('regPhotoStatus').textContent='Photo prête pour le ticket.'}
 function clearPhoto(){photoData='';$('regPhotoPreview').hidden=true;$('regPhotoPreview').removeAttribute('src');$('regPhotoPlaceholder').hidden=false;$('regPhotoLabel').textContent='Ajouter ma photo';if(photoBtn)photoBtn.textContent='📷 Importer une image';$('regPhotoStatus').textContent='Aucune photo sélectionnée';if(photoInput)photoInput.value=''}
 if(photoBtn&&photoInput)photoBtn.addEventListener('click',ev=>{ev.preventDefault();photoInput.click()});
 if(photoInput)photoInput.addEventListener('change',function(){
  const f=this.files&&this.files[0];if(!f)return;const status=$('regPhotoStatus');
  if(!f.type||!f.type.startsWith('image/')){status.textContent='Format non pris en charge. Choisis une image.';this.value='';return}
  if(f.size>12*1024*1024){status.textContent='Image trop lourde (maximum 12 Mo).';this.value='';return}
  status.textContent='Préparation de la photo…';
  const reader=new FileReader();reader.onerror=()=>{status.textContent='Impossible de lire cette image. Réessaie.'};
  reader.onload=()=>{const img=new Image();img.onerror=()=>{status.textContent='Image illisible. Essaie un autre fichier.'};
   img.onload=()=>{let out;try{const max=800,s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);c.getContext('2d').drawImage(img,0,0,c.width,c.height);out=c.toDataURL('image/jpeg',.76)}catch(e){out=reader.result}
    setPhoto(out);saveDraft()};img.src=reader.result};
  reader.readAsDataURL(f)});

 /* ---------- champs « Autre » ---------- */
 function toggleOther(id){const sel=$(id),o=$(id+'Other');if(!o)return;const on=sel.value==='Autre';o.hidden=!on;o.required=on;if(!on){o.value='';setErr(id+'Other','')}}
 ['regRegion','regPatrol','regChurch'].forEach(id=>$(id).addEventListener('change',()=>toggleOther(id)));
 /* église déduite du nom de la troupe (CMA, UEESO, AEECI), modifiable */
 let churchAuto=false,autoing=false;
 function autoChurch(){const c=$('regChurch'),m=/\b(CMA|UEESO|AEECI)\b/i.exec($('regTroop').value||'');
  if(m){autoing=true;c.value=m[1].toUpperCase();c.dispatchEvent(new Event('change',{bubbles:true}));autoing=false;churchAuto=true}
  else if(churchAuto){autoing=true;c.value='';c.dispatchEvent(new Event('change',{bubbles:true}));autoing=false;churchAuto=false}}
 $('regTroop').addEventListener('change',autoChurch);
 $('regChurch').addEventListener('change',()=>{if(!autoing)churchAuto=false});

 /* ---------- préremplissage / brouillon ---------- */
 function pick(sel,val){if(!val)return;const o=[...sel.options].find(x=>(x.value||x.text).toLowerCase()===String(val).toLowerCase());if(o)sel.value=o.value||o.text}
 function fill(d){
  Object.keys(MAP).forEach(k=>{const el=$(MAP[k]);if(!d[k]||!el)return;if(el.tagName==='SELECT')pick(el,d[k]);else el.value=d[k]});
  if(d.Region){if(REGIONS.includes(d.Region))$('regRegion').value=d.Region;else{$('regRegion').value='Autre';$('regRegionOther').value=d.Region}}toggleOther('regRegion');
  if(d.Patrol){if(PATROLS.includes(d.Patrol))$('regPatrol').value=d.Patrol;else{$('regPatrol').value='Autre';$('regPatrolOther').value=d.Patrol}}toggleOther('regPatrol');
  if(d.Church){if(CHURCHES.includes(d.Church))$('regChurch').value=d.Church;else{$('regChurch').value='Autre';$('regChurchOther').value=d.Church}}toggleOther('regChurch');
  $('regEngage').checked=true;
  if(d.Photo)setPhoto(d.Photo);
  if(d.Price){const r=document.querySelector('input[name="regPrice"][value="'+d.Price+'"]');if(r)r.checked=true}}
 function resetForm(){form.reset();clearPhoto();churchAuto=false;['regRegion','regPatrol','regChurch'].forEach(toggleOther);document.querySelectorAll('.reg-err').forEach(e=>{e.hidden=true;e.textContent=''});FIELDS.forEach(id=>{const el=$(id);if(el)el.removeAttribute('aria-invalid')})}
 function saveDraft(){clearTimeout(dt);dt=setTimeout(()=>{try{if(isComplete(read(key)))return;const v={};FIELDS.forEach(id=>v[id]=$(id).value);const p=document.querySelector('input[name="regPrice"]:checked');
   localStorage.setItem(dkey,JSON.stringify({v,eng:$('regEngage').checked,price:p?p.value:'',step:cur(),photo:photoData.length<400000?photoData:''}))}catch(e){}},350)}
 function applyDraft(dr){FIELDS.forEach(id=>{if(dr.v&&dr.v[id]!=null&&$(id))$(id).value=dr.v[id]});['regRegion','regPatrol','regChurch'].forEach(toggleOther);$('regEngage').checked=true;if(dr.v){if(dr.v.regChurchOther)$('regChurchOther').value=dr.v.regChurchOther;if(dr.v.regRegionOther)$('regRegionOther').value=dr.v.regRegionOther;if(dr.v.regPatrolOther)$('regPatrolOther').value=dr.v.regPatrolOther}
  if(dr.photo)setPhoto(dr.photo);if(dr.price){const r=document.querySelector('input[name="regPrice"][value="'+dr.price+'"]');if(r)r.checked=true}}

 /* ---------- bandeau « déjà inscrit » ---------- */
 function banner(show){let b=$('regBanner');if(!b){b=document.createElement('div');b.id='regBanner';b.className='reg-banner';b.innerHTML='<span><b>Tu es déjà pré-inscrit(e).</b> Tu peux modifier tes informations ci-dessous.</span><button type="button" id="regBannerTicket">Voir mon ticket</button>';$('regProgress').before(b);
   $('regBannerTicket').addEventListener('click',()=>{window.closeRegistration();if(window.openTicket)window.openTicket()})}
  b.hidden=!show;$('registrationTitle').textContent=show?'Modifier ma pré-inscription':'Pré-inscription au Camp'}

 /* ---------- ouverture (appelée par tous les points d'entrée) ---------- */
 window.regOnOpen=function(){
  const saved=read(key),dr=read(dkey);let start=0;
  if(saved&&saved.Name){resetForm();fill(saved);filledFromSaved=true}
  else{if(filledFromSaved){resetForm();filledFromSaved=false}
   if(dr&&dr.v&&FIELDS.some(id=>dr.v[id])){applyDraft(dr);start=Math.min(3,Math.max(0,+dr.step||0));toast('Ta pré-inscription en cours a été retrouvée.')}}
  banner(isComplete(saved));
  document.querySelectorAll('.reg-err').forEach(e=>{e.hidden=true});
  go(start);showSummary(saved)};
 window.openRegistration=function(){const ov=$('registrationOverlay');if(!ov)return;window.regOnOpen();ov.classList.add('open');ov.setAttribute('aria-hidden','false');const nav=$('floatingAppNav');if(nav)nav.style.display='none';document.body.style.overflow='hidden'};
 window.closeRegistration=function(e){const ov=$('registrationOverlay');if(!ov)return;if(e&&e.target!==ov)return;ov.classList.remove('open');ov.setAttribute('aria-hidden','true');const nav=$('floatingAppNav');if(nav)nav.style.display='grid';document.body.style.overflow=''};

 /* ---------- enregistrement ---------- */
 window.saveRegistration=function(e){if(e&&e.preventDefault)e.preventDefault();
  const pr=document.querySelector('input[name="regPrice"]:checked'),price=pr?pr.value:'',val=id=>$(id).value.trim();
  const d={Name:val('regName').replace(/\s+/g,' '),Phone:val('regPhone'),Birth:$('regBirth').value,Sex:$('regSex').value,Branch:$('regBranch').value,Grade:$('regGrade').value,
   Region:$('regRegion').value==='Autre'?val('regRegionOther'):$('regRegion').value,Group:$('regGroup').value,Troop:val('regTroop'),
   Patrol:$('regPatrol').value==='Autre'?val('regPatrolOther'):$('regPatrol').value,Title:$('regTitle').value,Sector:'Centre',Photo:photoData,Price:price,
   ContactEmail:val('regEmail'),Address:val('regAddress'),BirthPlace:val('regBirthPlace'),Nation:val('regNation'),
   Church:$('regChurch').value==='Autre'?val('regChurchOther'):$('regChurch').value,Engaged:$('regEngage').checked,
   Pass:(price==='8000'?'Pass Chef':'Pass Élément')+' — '+money(price)+' F CFA'};
  const store=o=>{try{localStorage.setItem(key,JSON.stringify(o));return true}catch(err){return false}};
  let ok=store(d),dropped=false;
  if(!ok&&d.Photo){d.Photo='';ok=store(d);dropped=ok}
  const status=$('registrationStatus');
  if(!ok){status.textContent='Enregistrement impossible sur cet appareil (mémoire pleine ou navigation privée). Libère de l’espace puis réessaie.';status.classList.add('show');toast('Enregistrement impossible : mémoire de l’appareil pleine.');throw new Error('registration-storage')}
  try{localStorage.removeItem(dkey)}catch(err){}
  if(window.v63AddMember)window.v63AddMember(d);
  status.textContent='Ta pré-inscription au Camp FOHOUNDI est enregistrée sur cet appareil. Les modalités de paiement seront communiquées par l’organisation.';status.classList.add('show');
  showSummary(d);filledFromSaved=true;
  if(dropped)toast('Photo trop lourde pour cet appareil : pré-inscription enregistrée sans photo.')};
 function showSummary(d){const box=$('registrationSummary'),txt=$('registrationSummaryText');if(!box||!txt||!d||!d.Name)return;txt.textContent=d.Name+' · '+(d.Price?money(d.Price)+' F CFA':'Ticket à choisir')+' · Secteur Centre';box.classList.add('show')}

 /* ---------- événements du formulaire ---------- */
 form.noValidate=true;form.removeAttribute('onsubmit');
 form.addEventListener('submit',e=>{e.preventDefault();
  if(cur()<3){window.regMove(1);return}
  for(let n=0;n<=3;n++){const bad=validateStep(n);if(bad){if(n!==cur())go(n,true);setTimeout(()=>focusField(bad),80);return}}
  try{window.saveRegistration(e)}catch(err){console.warn(err)}});
 form.addEventListener('input',e=>{const t=e.target;if(t.name==='regPrice')setErr('price','');else if(t.id&&V[t.id])setErr(t.id,'');saveDraft()});
 form.addEventListener('change',e=>{const t=e.target;if(t.name==='regPrice')setErr('price','');else if(t.id&&V[t.id])setErr(t.id,'');if(t.id==='regTitle'&&cur()===3)suggestPrice();saveDraft()});
 form.addEventListener('focusout',e=>{const t=e.target;if(t.id&&V[t.id]&&t.value!==''&&!t.hidden)check(t.id)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')window.closeRegistration()});

 /* ---------- initialisation ---------- */
 (function init(){
  const birth=$('regBirth');if(birth){const t=new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);birth.max=t;birth.min='1930-01-01'}
  $('regName').setAttribute('autocapitalize','words');$('regName').setAttribute('maxlength','80');$('regName').setAttribute('enterkeyhint','next');
  $('regPhone').setAttribute('type','tel');$('regPhone').setAttribute('maxlength','20');$('regPhone').setAttribute('enterkeyhint','next');
  $('regTroop').setAttribute('maxlength','60');
  $('regPrev').parentElement.classList.add('reg-nav');
  if(!$('regStepLive')){const s=document.createElement('span');s.id='regStepLive';s.className='reg-sr';s.setAttribute('aria-live','polite');$('regProgress').after(s)}
 })();
})();
