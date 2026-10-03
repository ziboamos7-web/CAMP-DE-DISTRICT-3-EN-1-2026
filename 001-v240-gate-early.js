
/* V240 — pas de session = l'application reste masquée tant que l'écran « Crée ton compte » n'est pas validé */
(function(){var on=1;try{on=!JSON.parse(localStorage.getItem('camp_session_2026'))}catch(e){}if(on)document.documentElement.classList.add('camp-gate')})();
