
/* V20.5 — hide bottom navigation while an overlay/modal is active */
(function(){
  function syncBottomNav(){
    const nav = document.querySelector('.floating-app-nav');
    if(!nav) return;
    const active = document.querySelector(
      '.modal.show, .modal.active, .overlay.show, .overlay.active, ' +
      '.bottom-sheet.show, .bottom-sheet.active, .presenter-overlay.open, ' +
      '[aria-modal="true"][style*="display: flex"], [aria-modal="true"][style*="display:flex"]'
    );
    nav.style.display = active ? 'none' : 'grid';
  }
  window.syncBottomNav = syncBottomNav;
  const observer = new MutationObserver(syncBottomNav);
  observer.observe(document.documentElement, {subtree:true, attributes:true, attributeFilter:['class','style','aria-hidden']});
  document.addEventListener('DOMContentLoaded', syncBottomNav);
  setTimeout(syncBottomNav, 250);
})();
