document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (reduceMotion) {
    document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target); 
      }
    });
  }, { 
    rootMargin: '0px 0px -10% 0px', 
    threshold: 0.05 
  });

  document.querySelectorAll('.rv').forEach(el => observer.observe(el));
});