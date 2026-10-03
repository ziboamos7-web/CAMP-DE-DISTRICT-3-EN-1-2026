
window.spPhoto=function(n){try{var id=/N[’']DAH/i.test(n||'')?7:(/TOUTOUKPO/i.test(n||'')?8:(/SAPEURS?[- ]*POMPIERS/i.test(n||'')?9:(/COMMISSAIRE DE POLICE/i.test(n||'')?10:(/FULBERT/i.test(n||'')?11:(/EMMANUEL/i.test(n||'')?12:(/^CR\s+PAUL$/i.test((n||'').trim())?13:(/YAO\s+OLIVIER/i.test(n||'')?14:0)))))));if(id){var i=document.getElementById('extraSpeakerPreview'+id);return i&&i.src?i.src:null}}catch(e){}return null};
window.spMini=function(n){var p=window.spPhoto(n);return p?'<img class="sp-mini" alt="" src="'+p+'"> ':''};
