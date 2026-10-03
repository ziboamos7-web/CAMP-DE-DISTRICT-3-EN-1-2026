
(function(){
  const input=document.getElementById('speakerPhotoInput');
  const img=document.getElementById('speakerPhotoPreview');
  const placeholder=document.querySelector('.speaker-photo-placeholder');
  if(!input || !img) return;
  input.addEventListener('change',function(){
    const file=this.files && this.files[0];
    if(!file || !file.type.startsWith('image/')) return;
    const url=URL.createObjectURL(file);
    img.onload=function(){
      img.hidden=false;
      if(placeholder) placeholder.style.display='none';
      URL.revokeObjectURL(url);
    };
    img.src=url;
  });
})();
