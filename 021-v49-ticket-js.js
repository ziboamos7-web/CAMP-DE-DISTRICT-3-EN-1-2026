
(function(){
  var KEY='camp_registration_2026';
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
  function field(l,v){var d=el('div');d.appendChild(el('small',null,l));d.appendChild(el('b',null,v||'—'));return d}
  function read(){var d=null;try{d=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}return d&&d.Name?d:null}
  function render(){
    var box=document.getElementById('v49Card');box.textContent='';var d=read();
    if(!d){
      var em=el('div','v49-empty');
      var ico=el('div','ico');ico.innerHTML='<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-ticket"/></svg>';em.appendChild(ico);
      em.appendChild(el('h3',null,'Pas encore de ticket'));
      em.appendChild(el('p',null,'Pré-inscris-toi au Camp pour obtenir ton ticket personnel.'));
      var b1=el('button','v49-close','Se pré-inscrire');b1.type='button';b1.onclick=function(){closeTicket();if(window.openRegistration)openRegistration()};
      var b2=el('button','v49-edit','Fermer');b2.type='button';b2.onclick=closeTicket;
      em.appendChild(b1);em.appendChild(b2);box.appendChild(em);return;
    }
    var top=el('div','v49-top');top.appendChild(el('small',null,'TICKET · GARANGO 2026'));
    var h=el('h3',null,'Camp de District ');h.appendChild(el('em',null,'3 en 1'));top.appendChild(h);
    top.appendChild(el('span','v49-pass',d.Pass||'Participant'));box.appendChild(top);
    var body=el('div','v49-body');body.appendChild(el('div','nm',d.Name));
    var g=el('div','v49-grid');
    g.appendChild(field('ÉGLISE',d.Church));g.appendChild(field('GROUPE',d.Group));
    g.appendChild(field('CONTACT',d.Phone));g.appendChild(field('DATES','28 oct. → 1er nov. 2026'));
    body.appendChild(g);
    var lieu=field('LIEU','Collège FOHOUNDI, Garango');body.appendChild(lieu);box.appendChild(body);
    box.appendChild(el('div','v49-tear'));
    var foot=el('div','v49-foot');
    foot.appendChild(el('p',null,'Présente ce ticket à l’accueil du Camp. Il est enregistré sur cet appareil.'));
    var c=el('button','v49-close','Fermer');c.type='button';c.onclick=closeTicket;
    foot.appendChild(c);box.appendChild(foot);
  }
  window.openTicket=function(){
    render();var o=document.getElementById('v49Ov');o.classList.add('open');
    var n=document.getElementById('floatingAppNav');if(n)n.style.display='none';document.body.style.overflow='hidden';
  };
  window.closeTicket=function(){
    var o=document.getElementById('v49Ov');o.classList.remove('open');
    var n=document.getElementById('floatingAppNav');if(n)n.style.display='grid';document.body.style.overflow='';
  };
  document.addEventListener('keydown',function(e){if(e.key==='Escape')window.closeTicket()});
})();
