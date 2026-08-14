if (!customElements.get('hero-slider')) {
  customElements.define('hero-slider', class extends HTMLElement {
    connectedCallback() {
      this.slides = Array.from(this.querySelectorAll('.section-hero__slide'));
      this.dots = Array.from(this.querySelectorAll('.section-hero__dot'));
      if (this.slides.length <= 1) return;

      this.currentIndex = 0;
      this.autoPlayTimer = null;
      this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.stop();
          this.goToSlide(index);
        });
      });

      this.addEventListener('mouseenter', this.stop.bind(this));
      this.addEventListener('mouseleave', this.play.bind(this));
      this.addEventListener('focusin', this.stop.bind(this));
      this.addEventListener('focusout', this.play.bind(this));

      if (Shopify && Shopify.designMode) {
        document.addEventListener('shopify:block:select', (e) => {
          const index = this.slides.findIndex(slide => slide.dataset.blockId === e.detail.blockId);
          if (index !== -1) {
            this.stop();
            this.goToSlide(index);
          }
        });
      }

      this.play();
    }

    goToSlide(index) {
      this.slides[this.currentIndex].setAttribute('aria-hidden', 'true');
      this.dots[this.currentIndex].setAttribute('aria-selected', 'false');

      this.currentIndex = index;

      this.slides[this.currentIndex].setAttribute('aria-hidden', 'false');
      this.dots[this.currentIndex].setAttribute('aria-selected', 'true');
    }

    play() {
      if (!this.reduceMotion && !this.autoPlayTimer) {
        this.autoPlayTimer = setInterval(() => {
          const nextIndex = (this.currentIndex + 1) % this.slides.length;
          this.goToSlide(nextIndex);
        }, 4000);
      }
    }

    stop() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    }
  });
}