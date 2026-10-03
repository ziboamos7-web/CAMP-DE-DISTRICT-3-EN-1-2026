
(function(){
  const input=document.getElementById('speakerPhotoInput');
  const img=document.getElementById('speakerPhotoPreview');
  const placeholder=document.querySelector('.speaker-photo-placeholder');
  if(input && img){
    const saved=(function(){try{localStorage.removeItem('camp_speaker_photo')}catch(e){}return null})();
    if(saved){
      img.src=saved; img.hidden=false;
      if(placeholder){ placeholder.hidden=true; placeholder.classList.add('is-hidden'); }
    }
    input.addEventListener('change_locked',function(){
      const file=this.files && this.files[0];
      if(!file || !file.type.startsWith('image/')) return;
      const reader=new FileReader();
      reader.onload=function(){
        img.src=reader.result;
        img.hidden=false;
        if(placeholder){ placeholder.hidden=true; placeholder.classList.add('is-hidden'); }
        try{ void 0; }catch(e){}
      };
      reader.readAsDataURL(file);
    });
  }
})();

function shareSpeaker(e){
  if(e) e.stopPropagation();
  const n=document.getElementById('portfolioSpeakerName'),nm=n?n.textContent.trim():'CTA Ev. Kouamé César';
  cdShare('Intervenant — Camp de District 3 en 1',['ORATEUR PRINCIPAL',nm,'Intervenant du Camp de District 3 en 1','Camp de District 3 en 1 · du 28 oct. au 1er nov. 2026 · Collège FOHOUNDI Garango, Bouaflé'].join('\n'));
}

(function(){
  const originalOpenPresenter=window.openPresenter;
  if(typeof originalOpenPresenter!=='function') return;
  window.openPresenter=function(type){
    originalOpenPresenter(type);
    const portfolio=document.getElementById('presenterPortfolio');
    const orb=document.getElementById('presenterIcon');
    const kicker=document.getElementById('presenterKicker');
    const title=document.getElementById('presenterTitle');
    const body=document.getElementById('presenterText');
    const detail=document.getElementById('presenterDetail');
    const action=document.querySelector('.presenter-action');
    if(!portfolio) return;
    const isSpeaker=type==='orateur';
    portfolio.hidden=!isSpeaker;
    [orb,kicker,title,body,detail,action].forEach(el=>{if(el) el.style.display=isSpeaker?'none':'';});
    if(isSpeaker){
      /* Remise à zéro : sinon le nom/rôle du dernier intervenant ouvert reste figé */
      const pName=document.getElementById('portfolioSpeakerName'),pRole=document.querySelector('#presenterPortfolio .portfolio-role');
      if(pName) pName.textContent='CTA Ev. Kouamé César';
      if(pRole) pRole.textContent='Orateur du Camp';
      const pKick=document.querySelector('#presenterPortfolio .portfolio-kicker'); if(pKick) pKick.textContent='INTERVENANT · ÉDITION 2026';
      const pImg=document.getElementById('presenterSpeakerPhoto');
      const pPh=document.getElementById('presenterSpeakerPlaceholder');
      const source=document.getElementById('speakerPhotoPreview');
      if(source && !source.hidden && source.src){
        pImg.src=source.src;pImg.hidden=false;pPh.style.display='none';
      }else if(window.CD_SPEAKER_PHOTO){
        pImg.src=window.CD_SPEAKER_PHOTO;pImg.hidden=false;pPh.style.display='none';
      }else{
        pImg.hidden=true;pPh.style.display='flex';
      }
    }
  };
})();
