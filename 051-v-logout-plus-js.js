
function plusLogout(){
  if(window.campLogout){window.campLogout();return}
  try{localStorage.removeItem('camp_session_2026');localStorage.removeItem('camp_registration_2026')}catch(e){}
  try{window.dispatchEvent(new Event('storage'))}catch(e){}
}
