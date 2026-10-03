
(function(){
  const KEY='camp_registration_2026';
  const $=id=>document.getElementById(id);
  const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}};
  const digits=v=>String(v||'').replace(/\D/g,'');
  const money=v=>String(v||'').replace(/\B(?=(\d{3})+(?!\d))/g,'\u00a0');
  function val(id){const e=$(id);return e?e.value.trim():''}
  function selectedPrice(){const e=document.querySelector('input[name="regPrice"]:checked');return e?e.value:''}
  function valid(){
    const checks=[
      ['regName',v=>v.length>=3],['regPhone',v=>{const n=digits(v).length;return n>=8&&n<=15}],
      ['regBirth',v=>!!v],['regSex',v=>!!v],['regBranch',v=>!!v],['regGrade',v=>!!v],
      ['regRegion',v=>!!v],['regGroup',v=>!!v],['regTroop',v=>!!v],['regTitle',v=>!!v],
      ['regChurch',v=>!!v],['regEngage',()=>true]
    ];
    for(const [id,fn] of checks){const e=$(id);if(!e||!fn(e.value)){try{e&&e.focus()}catch(_){};return false}}
    const price=selectedPrice(); if(!price)return false;
    if($('regEmail')&&val('regEmail')&&!/^\S+@\S+\.\S+$/.test(val('regEmail')))return false;
    if($('regAddress')&&!val('regAddress'))return false;
    if($('regBirthPlace')&&!val('regBirthPlace'))return false;
    if($('regNation')&&!val('regNation'))return false;
    if($('regRegion')&&$('regRegion').value==='Autre'&&!val('regRegionOther'))return false;
    if($('regPatrol')&&$('regPatrol').value==='Autre'&&!val('regPatrolOther'))return false;
    if($('regChurch')&&$('regChurch').value==='Autre'&&!val('regChurchOther'))return false;
    return true;
  }
  async function save(){
    if(!valid()){
      const form=$('registrationForm');
      if(form) form.reportValidity?.();
      return false;
    }
    const price=selectedPrice();
    const ticketEl=$('regTicketNumber');
    const rawTicket=String(ticketEl?.value||'').replace(/\D/g,'');
    const hasT=!$('regHasTicket')||$('regHasTicket').checked;
    const ticketNumber=(hasT&&rawTicket) ? String(parseInt(rawTicket,10)).padStart(4,'0') : '';
    const ticketStatus=$('regTicketStatus');
    const setTicketStatus=(msg,kind)=>{if(ticketStatus){ticketStatus.textContent=msg;ticketStatus.className='reg-ticket-status show '+(kind||'')}};
    if(hasT&&(!ticketNumber || parseInt(ticketNumber,10)<1 || parseInt(ticketNumber,10)>1000)){
      if(ticketEl){ticketEl.setAttribute('aria-invalid','true');ticketEl.focus();}
      setTicketStatus('Le numéro du ticket doit être compris entre 0001 et 1000.','bad');
      return false;
    }
    if(ticketEl){ticketEl.value=ticketNumber;ticketEl.setAttribute('aria-invalid','false')}
    if(hasT)setTicketStatus('Vérification du numéro de ticket…','');

    const old=read(KEY)||{};
    const d={
      Name:val('regName').replace(/\s+/g,' '), Phone:val('regPhone'), Birth:val('regBirth'), Sex:val('regSex'),
      Branch:val('regBranch'), Grade:val('regGrade'), Region:$('regRegion')?.value==='Autre'?val('regRegionOther'):val('regRegion'),
      Group:val('regGroup'), Troop:val('regTroop'), Patrol:$('regPatrol')?.value==='Autre'?val('regPatrolOther'):val('regPatrol'),
      Title:val('regTitle'), Sector:'Centre', Photo:window.__campPhotoData||'', Price:price,
      TicketNumber:ticketNumber,
      ContactEmail:val('regEmail'), Address:val('regAddress'), BirthPlace:val('regBirthPlace'), Nation:val('regNation'),
      Church:$('regChurch')?.value==='Autre'?val('regChurchOther'):val('regChurch'), Engaged:!!$('regEngage')?.checked,
      Pass:(price==='8000'?'Pass Chef':'Pass Élément')+' — '+money(price)+' F CFA'
    };
    // IMPORTANT : aucun numéro de pré-inscription n'est généré ou conservé.
    delete d.TicketId;

    // Vérification locale immédiate.
    try{
      const localRaw=localStorage.getItem(KEY);
      if(localRaw){const local=JSON.parse(localRaw)||{};if(local.TicketNumber && String(local.TicketNumber).padStart(4,'0')===ticketNumber && local.Name!==d.Name){
        setTicketStatus('Ce numéro de ticket est déjà associé à une autre pré-inscription sur cet appareil.','bad');return false;
      }}
    }catch(_){ }

    // Vérification globale + réservation via Supabase.
    try{
      const backend=window.CampBackend;
      if(!backend || !backend.checkAndSaveRegistration){
        throw new Error('Le service de réservation des tickets n’est pas configuré.');
      }
      const result=await backend.checkAndSaveRegistration(d);
      if(!result || result.ok!==true){
        setTicketStatus((result&&result.message)||'Ce numéro de ticket est déjà utilisé ou indisponible.','bad');
        if(ticketEl){ticketEl.setAttribute('aria-invalid','true');ticketEl.focus();}
        return false;
      }
    }catch(err){
      console.warn('[Camp] validation du ticket',err);
      setTicketStatus('Impossible de vérifier ce numéro maintenant. Vérifie ta connexion puis réessaie.','bad');
      return false;
    }

    try{
      localStorage.setItem(KEY,JSON.stringify(d));
      localStorage.removeItem('camp_registration_draft_2026');
    }catch(err){
      setTicketStatus('Impossible d’enregistrer la pré-inscription sur cet appareil.','bad');
      return false;
    }
    try{if(typeof window.v63AddMember==='function')window.v63AddMember(d)}catch(_){ }
    const ov=$('registrationOverlay');
    if(ov){ov.classList.remove('open');ov.setAttribute('aria-hidden','true')}
    const nav=$('floatingAppNav');if(nav)nav.style.display='grid';
    document.body.style.overflow='';
    try{if(typeof window.paintProfile==='function')window.paintProfile()}catch(_){ }
    try{window.dispatchEvent(new Event('storage'))}catch(_){ }
    return true;
  }
  window.saveRegistration=save;
  // Ensure the final button always uses this validator, even if older listeners exist.
  document.addEventListener('click',function(e){
    const b=e.target.closest('#regSubmit');
    if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();save();
  },true);
})();
