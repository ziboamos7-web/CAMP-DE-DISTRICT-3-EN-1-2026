
/* Camp de District 3 en 1 — branchement Supabase (comptes + pré-inscription)
   Placé en dernier dans index.html, après le script @supabase/supabase-js.
   L'application garde son fonctionnement local ; Supabase s'ajoute en synchronisation. */
(function () {
  'use strict';
  var SUPABASE_URL = 'https://pzxpjavylrsmptwjeupi.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6eHBqYXZ5bHJzbXB0d2pldXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MTU1ODMsImV4cCI6MjEwNjQ5MTU4M30.DeuASRJAaTuMhrSaF5N0SHfo-4E5r_c_wiugheIFiN0';
  if (!window.supabase) { console.warn('[Camp] supabase-js non chargé'); return; }

  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  var ACC = 'camp_accounts_2026', SES = 'camp_session_2026', REG = 'camp_registration_2026';
  var rd = function (k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
  var wr = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  var dg = function (s) { return String(s || '').replace(/\D+/g, ''); };
  var log = function (m, e) { console.warn('[Camp] ' + m, e && (e.message || e)); };

  function rnd() { var a = new Uint8Array(8); crypto.getRandomValues(a); return Array.prototype.map.call(a, function (x) { return x.toString(16).padStart(2, '0'); }).join(''); }
  function hash(pw, salt) {   // identique à celui de l'application
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + '|' + pw)).then(function (b) {
      return Array.prototype.map.call(new Uint8Array(b), function (x) { return x.toString(16).padStart(2, '0'); }).join('');
    });
  }
  function blobToDataURL(b) { return new Promise(function (res) { var r = new FileReader(); r.onload = function () { res(r.result); }; r.onerror = function () { res(''); }; r.readAsDataURL(b); }); }

  /* ---------- comptes ---------- */
  function ensureProfile(user, p) {
    return sb.from('profiles').upsert({
      id: user.id, phone: dg(p.phone), name: p.name, church: p.church || '', group_name: p.group || '', pass: p.pass || ''
    }, { onConflict: 'id' });
  }
  function remoteSignUp(p) {   // p: {email, pw, name, phone, group}
    return sb.auth.signUp({ email: p.email, password: p.pw }).then(function (r) {
      if (r.error) throw r.error;
      if (!r.data.session) throw new Error('E-mail à confirmer : désactiver « Confirm email » dans Supabase');
      return ensureProfile(r.data.user, p);
    });
  }
  function remoteSignIn(email, pw) {
    return sb.auth.signInWithPassword({ email: email, password: pw }).then(function (r) { if (r.error) throw r.error; return r.data.user; });
  }

  /* Création de compte : Supabase envoie le code à 6 chiffres par e-mail (SMTP), puis le contrôle.
     Le compte en ligne n'est confirmé qu'une fois le code saisi. */
  var pending = null;   // champs du formulaire de création de compte
  function saveProfile(user, p) {
    return Promise.resolve(ensureProfile(user, p)).then(function (r) { if (r && r.error) log('profil', r.error); }, function (e) { log('profil', e); });
  }
  function otpSignUp(p) {
    return sb.auth.signUp({ email: p.email, password: p.pw, options: { data: { name: p.name, phone: dg(p.phone), group_name: p.group } } })
      .then(function (r) {
        if (r.error) throw r.error;
        var u = r.data && r.data.user;
        if (u && Array.isArray(u.identities) && u.identities.length === 0) { var ex = new Error('already registered'); ex.code = 'exists'; throw ex; }
        if (r.data && r.data.session) {   // « Confirm email » désactivé dans Supabase : aucun e-mail n'est envoyé
          console.warn('[Camp] Active « Confirm email » dans Supabase (Authentication → Sign In / Providers → Email) pour que le code soit envoyé.');
          return saveProfile(u, p).then(function () { return 'skip'; });
        }
        return 'sent';
      });
  }
  window.CAMP_OTP = {
    send: function () { return pending ? otpSignUp(pending) : Promise.reject(new Error('formulaire manquant')); },
    resend: function (email) { return sb.auth.resend({ type: 'signup', email: email }).then(function (r) { if (r.error) throw r.error; return 'sent'; }); },
    verify: function (email, code) {
      return sb.auth.verifyOtp({ email: email, token: code, type: 'signup' }).then(function (r) {
        if (r.error) throw r.error;
        var u = r.data && (r.data.user || (r.data.session && r.data.session.user));
        return (u && pending) ? saveProfile(u, pending) : null;
      }).then(function () { return true; });
    }
  };
  var vOrig = window.campVerifyEmail;
  if (typeof vOrig === 'function') {
    window.campVerifyEmail = function (email, name, done) {
      var g = function (id) { var e = document.getElementById('ac-' + id); return e ? e.value : ''; };
      pending = { email: String(email).trim().toLowerCase(), pw: g('pw'), name: (g('first').trim() + ' ' + g('last').trim()).trim(), phone: g('phone'), group: g('dist').trim() };
      return vOrig.call(this, email, name, function () {
        var r = done && done.apply(this, arguments);
        pending = null;
        return r;
      });
    };
  }

  /* Connexion : accepte aussi un compte créé sur un autre appareil, et migre les anciens comptes locaux */
  var reentry = false;
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (reentry || !f || f.id !== 'acF' || document.getElementById('ac-first')) return;   // uniquement le formulaire de connexion
    var emEl = document.getElementById('ac-email'), pwEl = document.getElementById('ac-pw');
    if (!emEl || !pwEl) return;
    var email = emEl.value.trim().toLowerCase(), pw = pwEl.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !pw) return;
    var local = rd(ACC, []).filter(function (a) { return (a.Email || '').toLowerCase() === email; })[0];

    if (local) {            // compte local existant : connexion normale + synchronisation en ligne en arrière-plan
      remoteSignIn(email, pw).catch(function () {
        return remoteSignUp({ email: email, pw: pw, name: local.Name, phone: local.Phone, group: local.Group, church: local.Church, pass: local.Pass });
      }).then(function () { setTimeout(restoreRegistration, 900); })
        .catch(function (err) { log('synchronisation du compte', err); sb.auth.signOut(); });
      return;
    }
    // aucun compte local : on cherche en ligne (autre appareil)
    e.preventDefault(); e.stopImmediatePropagation();
    remoteSignIn(email, pw).then(function (user) {
      return sb.from('profiles').select('*').eq('id', user.id).maybeSingle().then(function (r) {
        var p = r.data || {}, salt = rnd();
        return hash(pw, salt).then(function (h) {
          var parts = String(p.name || '').trim().split(/\s+/);
          var acc = { phone: dg(p.phone), first: parts[0] || '', last: parts.slice(1).join(' '), Name: p.name || email, Phone: p.phone || '',
                      Email: email, Group: p.group_name || '', Church: p.church || '', Pass: p.pass || '', salt: salt, pw: h, ts: Date.now() };
          var L = rd(ACC, []); L.push(acc); wr(ACC, L);
        });
      });
    }).then(function () {
      reentry = true;
      if (f.requestSubmit) f.requestSubmit(); else f.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      reentry = false;
      setTimeout(restoreRegistration, 900);
    }).catch(function (err) {
      var box = document.getElementById('acFe');
      if (box) { box.textContent = 'Aucun compte trouvé. Vérifie ton e-mail et ton mot de passe, ou crée un compte.'; box.classList.add('show'); }
      log('connexion en ligne', err);
    });
  }, true);

  /* Déconnexion locale → déconnexion en ligne (évite d'écrire sous le mauvais compte) */
  var rmItem = Storage.prototype.removeItem;
  Storage.prototype.removeItem = function (k) {
    if (k === SES) { try { sb.auth.signOut(); } catch (e) {} }
    return rmItem.apply(this, arguments);
  };

  /* ---------- pré-inscription ---------- */
  function currentUser() { return sb.auth.getSession().then(function (r) { return r.data.session && r.data.session.user; }); }

  function pushRegistration(d) {
    return currentUser().then(function (u) {
      if (!u) return null;
      var mail = String((rd(REG, {}) || {}).Email || '').toLowerCase();
      if (mail && u.email && mail !== u.email.toLowerCase()) return null;   // session en ligne d'un autre compte
      var up = Promise.resolve(null);
      if (d.Photo && String(d.Photo).indexOf('data:') === 0) {
        up = fetch(d.Photo).then(function (r) { return r.blob(); }).then(function (b) {
          var path = u.id + '/avatar.jpg';
          return sb.storage.from('photos').upload(path, b, { upsert: true, contentType: b.type || 'image/jpeg' })
            .then(function (r) { return r.error ? null : path; });
        }).catch(function () { return null; });
      }
      return up.then(function (photo_path) {
        var row = { user_id: u.id, name: d.Name, phone: d.Phone, birth: d.Birth || null, sex: d.Sex, branch: d.Branch, grade: d.Grade,
                    region: d.Region, group_name: d.Group, troop: d.Troop, patrol: d.Patrol, title: d.Title, sector: d.Sector || 'Centre',
                    price: +d.Price, pass: d.Pass, ticket_number: (String(d.TicketNumber||'').replace(/\D/g,'') ? parseInt(String(d.TicketNumber).replace(/\D/g,''),10) : null) };
        if (photo_path) row.photo_path = photo_path;
        /* champs ajoutés (lieu de naissance, nationalité, église, adresse, e-mail) : envoyés si les colonnes existent, sinon repli sur l'envoi d'origine */
        var full = Object.assign({}, row, {
          birth_place: d.BirthPlace || '', nationality: d.Nation || '', church: d.Church || '',
          address: d.Address || '', contact_email: d.ContactEmail || '',
          district_code: d.DistrictCode || (window.campDistrictCode ? window.campDistrictCode(d.Group) : ''),
          ticket_code: d.TicketCode || (window.campTicketCode ? window.campTicketCode(d) : '')
        });
        return sb.from('registrations').upsert(full, { onConflict: 'user_id' }).select().single().then(function (r) {
          if (r.error && /column|schema cache/i.test(r.error.message || '')) return sb.from('registrations').upsert(row, { onConflict: 'user_id' }).select().single();
          return r;
        });
      }).then(function (r) {
        if (r.error) throw r.error;
        var cur = rd(REG, {}) || {};
        if (r.data.ticket_number != null) { cur.TicketNumber = String(r.data.ticket_number).padStart(4, '0'); delete cur.TicketId; wr(REG, cur); }
        return r.data;
      });
    });
  }

  /* Une seule écriture d'inscription : le validateur final appelle CampBackend.checkAndSaveRegistration().
     On ne ré-emballe plus saveRegistration() ici, afin d'éviter une seconde écriture Supabase. */

  /* Récupère la pré-inscription en ligne (nouvel appareil) */
  function restoreRegistration() {
    return currentUser().then(function (u) {
      if (!u) return;
      return sb.from('registrations').select('*').eq('user_id', u.id).maybeSingle().then(function (r) {
        var x = r.data; if (!x) return;
        var cur = rd(REG, {}) || {};
        var m = { Name: x.name, Phone: x.phone, Birth: x.birth, Sex: x.sex, Branch: x.branch, Grade: x.grade, Region: x.region, Group: x.group_name,
                  Troop: x.troop, Patrol: x.patrol, Title: x.title, Sector: x.sector, Price: String(x.price), Pass: x.pass, TicketNumber: x.ticket_number != null ? String(x.ticket_number).padStart(4,'0') : '',
                  BirthPlace: x.birth_place, Nation: x.nationality, Church: x.church, Address: x.address, ContactEmail: x.contact_email };
        Object.keys(m).forEach(function (k) { if (m[k] != null && m[k] !== '') cur[k] = m[k]; });
        var finish = function () { wr(REG, cur); try { window.dispatchEvent(new Event('storage')); } catch (e) {} };
        if (!cur.Photo && x.photo_path) {
          return sb.storage.from('photos').download(x.photo_path).then(function (p) { return p.data ? blobToDataURL(p.data) : ''; })
            .then(function (url) { if (url) cur.Photo = url; finish(); }).catch(finish);
        }
        finish();
      });
    }).catch(function (e) { log('restauration de la pré-inscription', e); });
  }

  /* Fallback legacy : utilisé seulement si aucun module de réservation par district n'est disponible. */
  function checkAndSaveRegistration(d){
    return currentUser().then(function(u){
      if(!u) return {ok:false,message:'Connecte-toi à ton compte avant de valider la pré-inscription.'};
      var n=parseInt(String(d.TicketNumber||'').replace(/\D/g,''),10);
      if(!n||n<1||n>1000)return {ok:false,message:'Le numéro de ticket doit être compris entre 0001 et 1000.'};
      var q=sb.from('registrations').select('user_id,ticket_number').eq('ticket_number',n).limit(1);
      return q.then(function(r){
        if(r.error){ if(/ticket_number|column|schema cache/i.test(r.error.message||'')) throw new Error('Le champ ticket_number n’est pas encore configuré dans Supabase.'); throw r.error; }
        var hit=(r.data||[])[0];
        if(hit && hit.user_id!==u.id)return {ok:false,message:'Ce ticket a déjà été vendu et est déjà associé à une autre personne.'};
        return pushRegistration(d).then(function(){return {ok:true}}).catch(function(err){
          var msg=String(err && (err.message||err) || '');
          if(/23505|duplicate|unique|ticket_number/i.test(msg))return {ok:false,message:'Ce numéro de ticket vient d’être utilisé par une autre personne. Choisis un autre numéro.'};
          throw err;
        });
      });
    });
  }
  /* API d'authentification unique pour l'interface : Supabase est la source d'identité.
     Le localStorage reste uniquement un cache d'interface / compatibilité. */
  /* Le module ticket par district peut avoir installé une version plus stricte de la réservation.
     On la conserve au lieu de l'écraser par l'ancien validateur global. */
  var ticketReservation = window.CampBackend && window.CampBackend.checkAndSaveRegistration;
  window.CampBackend = {
    sb: sb,
    restoreRegistration: restoreRegistration,
    pushRegistration: pushRegistration,
    checkAndSaveRegistration: (typeof ticketReservation === 'function' ? ticketReservation : checkAndSaveRegistration),
    signIn: function(email, password){
      return sb.auth.signInWithPassword({email: String(email||'').trim().toLowerCase(), password: String(password||'')})
        .then(function(r){ if(r.error) throw r.error; return r.data; });
    },
    signOut: function(){ return sb.auth.signOut(); },
    getSession: function(){ return sb.auth.getSession(); },
    getUser: function(){ return sb.auth.getUser(); }
  };
  /* Si Supabase signale une déconnexion, on ne conserve pas une session locale active. */
  sb.auth.onAuthStateChange(function(event){
    if(event==='SIGNED_OUT'){
      try{localStorage.removeItem('camp_session_2026')}catch(e){}
      try{window.dispatchEvent(new Event('storage'))}catch(e){}
    }
  });
})();

