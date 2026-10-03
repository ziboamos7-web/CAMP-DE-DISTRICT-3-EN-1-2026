
(function(){var h=document.getElementById('v56Head');if(!h)return;var c=document.createElement('span');c.className='v76-chip';c.setAttribute('aria-hidden','true');h.appendChild(c);
var S=Date.UTC(2026,9,28),tm=(location.search||'').match(/[?&]cdtest=(\d+)/);if(tm)S=Date.now()+(+tm[1])*1000;
function u(){var df=S-Date.now(),d=Math.floor(df/864e5);c.hidden=df<=0;c.textContent=d>=1?'J-'+d:'Départ !'}u();setInterval(u,60000)})();
