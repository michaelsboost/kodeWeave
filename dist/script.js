// Reveal-on-scroll (IntersectionObserver)
(function(){
  const prefersReduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const observed = new WeakSet();
  function setupIO(){
    if (prefersReduce || !('IntersectionObserver' in window)) return null;
    return new IntersectionObserver((entries, io)=>{
      for (const e of entries){
        if (e.isIntersecting){ 
          e.target.classList.add('is-visible'); 
          io.unobserve(e.target); 
        }
      }
    }, { threshold: 0.15 });
  }
  let io = setupIO();
  window._kwObserveReveals = function(){
    const els = document.querySelectorAll('.reveal');
    if (!io || prefersReduce){ 
      els.forEach(el=>el.classList.add('is-visible')); 
      return; 
    }
    els.forEach(el=>{ 
      if (!observed.has(el)){ 
        io.observe(el); 
        observed.add(el);
      } 
    });
  }
  // Initial pass
  window._kwObserveReveals();
  // Watch DOM changes (e.g., Alpine x-for/x-show)
  const mo = new MutationObserver(()=> window._kwObserveReveals());
  mo.observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:['class','style']});
})();