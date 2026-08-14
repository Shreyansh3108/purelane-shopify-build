document.addEventListener('DOMContentLoaded', () => {
  const initMarquee = (section) => {
    const track = section.querySelector('.section-reviews__track');
    if (!track) return;
    
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!reduceMotion) {
      while (track.scrollWidth < window.innerWidth * 2.2) {
        const clones = [...track.children].map(n => {
          const c = n.cloneNode(true);
          c.setAttribute('aria-hidden', 'true'); 
          return c;
        });
        track.append(...clones);
      }
      track.style.setProperty('--marquee-distance', `-${track.scrollWidth / 2}px`);
      track.classList.add('section-reviews__track--animate');
    } else {
      track.style.setProperty('--marquee-distance', '0px');
    }
  };

  document.querySelectorAll('.section-reviews').forEach(initMarquee);

  if (Shopify && Shopify.designMode) {
    document.addEventListener('shopify:section:load', (e) => {
      if (e.target.classList.contains('section-reviews')) {
        initMarquee(e.target);
      }
    });
  }
});