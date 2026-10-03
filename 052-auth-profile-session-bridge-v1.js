
(function(){
  'use strict';
  var ACC='camp_accounts_2026', SES='camp_session_2026', REG='camp_registration_2026';
  function read(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
  function write(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
  function digits(v){return String(v||'').replace(/\D+/g,'')}
  function notify(){try{window.dispatchEvent(new Event('storage'))}catch(e){};try{if(window.paintProfile)window.paintProfile()}catch(e){}}
  function syncUser(user){
    if(!user || !window.CampBackend) return Promise.resolve();
    var sb=window.CampBackend.sb;
    return sb.from('profiles').select('*').eq('id',user.id).maybeSingle().then(function(r){
      if(r.error) throw r.error;
      var p=r.data||{}, email=(user.email||'').toLowerCase();
      var phone=digits(p.phone||user.user_metadata&&user.user_metadata.phone||'');
      var name=p.name||user.user_metadata&&user.user_metadata.name||email;
      var list=read(ACC,[]), acc=list.filter(function(a){return String(a.Email||'').toLowerCase()===email || (phone && digits(a.Phone)===phone)})[0];
      if(!acc){
        acc={phone:phone,Name:name,Phone:p.phone||user.user_metadata&&user.user_metadata.phone||'',Email:email,Group:p.group_name||'',Church:p.church||'',Pass:p.pass||'',supabase_id:user.id,ts:Date.now()};
        list.push(acc);
      }else{
        acc.supabase_id=user.id;acc.Email=acc.Email||email;acc.phone=acc.phone||phone;
        acc.Name=name||acc.Name;acc.Phone=p.phone||acc.Phone;acc.Group=p.group_name||acc.Group;acc.Church=p.church||acc.Church;acc.Pass=p.pass||acc.Pass;
      }
      write(ACC,list);
      write(SES,{phone:acc.phone||phone,email:email,supabase_id:user.id});
      var cur=read(REG,{})||{};
      Object.assign(cur,{Name:acc.Name,Phone:acc.Phone,Email:email,Church:acc.Church||'',Group:acc.Group||'',Pass:acc.Pass||''});
      write(REG,cur);notify();
      return window.CampBackend.restoreRegistration ? window.CampBackend.restoreRegistration() : null;
    }).catch(function(e){
      console.warn('[Camp] synchronisation profil Supabase',e&&e.message||e);
    });
  }
  function sync(){
    if(!window.CampBackend) return;
    window.CampBackend.getSession().then(function(r){
      var u=r&&r.data&&r.data.session&&r.data.session.user;
      if(u) return syncUser(u);
    }).catch(function(e){console.warn('[Camp] lecture session Supabase',e&&e.message||e)});
  }
  window.CampSync={sync:sync,syncUser:syncUser};
  setTimeout(sync,0);
  if(window.CampBackend && window.CampBackend.sb){
    window.CampBackend.sb.auth.onAuthStateChange(function(event,session){
      setTimeout(function(){
        if(event==='SIGNED_IN'||event==='TOKEN_REFRESHED'||event==='USER_UPDATED'){
          if(session&&session.user)syncUser(session.user);
        }else if(event==='SIGNED_OUT'){
          try{localStorage.removeItem(SES);localStorage.removeItem(REG)}catch(e){}
          notify();
        }
      },0);
    });
  }
})();
