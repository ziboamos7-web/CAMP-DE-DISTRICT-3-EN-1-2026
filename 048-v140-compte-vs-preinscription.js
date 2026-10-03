
(function(){
var ACC='camp_accounts_2026',SES='camp_session_2026',REG='camp_registration_2026';
function rd(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function norm(v){return String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function me(){var t=rd(SES);if(!t)return null;return (rd(ACC)||[]).filter(function(a){return a.phone===t.phone})[0]||null}
/* la préinscription est rattachée au compte (et restaurée à la reconnexion) */
function sync(){var a=me(),d=rd(REG);if(!a||!d||!d.Pass)return;var L=rd(ACC)||[],j=JSON.stringify(d);for(var i=0;i<L.length;i++)if(L[i].phone===a.phone&&JSON.stringify(L[i].camp)!==j){L[i].camp=d;try{localStorage.setItem(ACC,JSON.stringify(L))}catch(e){}}}
window.addEventListener('storage',sync);setInterval(sync,1500);
/* ticket facultatif : visible seulement si la personne en a déjà un */
function ui(){var cb=document.getElementById('regHasTicket'),f=document.querySelector('.ticket-number-field');if(!cb||!f)return;
 var lb=f.querySelector('label');if(lb)lb.textContent='NUMÉRO DE TON TICKET (0001 À 1000) *';
 var h=document.getElementById('regTicketHelp');if(h)h.textContent='Le début du code (CAM-DP-2026- ou CAM-DD-2026-) dépend du district choisi et ne peut pas être modifié. Tape seulement le numéro imprimé sur ton ticket. Un numéro déjà pris dans ce district est refusé.';
 f.style.display=cb.checked?'':'none'}
document.addEventListener('change',function(e){if(e.target&&e.target.id==='regHasTicket'){if(!e.target.checked){var i=document.getElementById('regTicketNumber');if(i){i.value='';i.dispatchEvent(new Event('input',{bubbles:true}))}}ui()}});
function prefill(){var a=me();if(!a)return;
 [['regName',a.Name],['regPhone',a.Phone],['regEmail',a.Email]].forEach(function(p){var e=document.getElementById(p[0]);if(e&&!e.value&&p[1]){e.value=p[1];e.dispatchEvent(new Event('input',{bubbles:true}))}});
 var g=document.getElementById('regGroup');if(g&&!g.value&&a.Group){for(var i=0;i<g.options.length;i++){var v=g.options[i].value||g.options[i].text;if(v&&norm(v)===norm(a.Group)){g.value=v;g.dispatchEvent(new Event('change',{bubbles:true}));break}}}
 ui()}
var ro=window.regOnOpen;window.regOnOpen=function(){var r=ro&&ro.apply(this,arguments);setTimeout(prefill,80);return r};
setTimeout(ui,1500);
})();
