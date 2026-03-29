/* ============================================
   AOKI ATELIER — main.js
   GSAP + ScrollTrigger + UI
   ============================================ */
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    gsap.globalTimeline.timeScale(1000);
  }

  /* ------------------------------------------
     HEADER — scroll detection
     ------------------------------------------ */
  var header = document.querySelector('.site-header');

  if (header) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: function (self) {
        if (self.scroll() > 80) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });
  }

  /* ------------------------------------------
     HAMBURGER MENU
     ------------------------------------------ */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    var closeMobileNav = function () {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    };

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      var isOpen = mobileNav.classList.contains('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
    });

    var mobileLinks = mobileNav.querySelectorAll('.mobile-nav__link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMobileNav();
      }
    });
  }

  /* ------------------------------------------
     HERO ANIMATION (index.html)
     ------------------------------------------ */
  var heroContent = document.querySelector('.hero-content');

  if (heroContent) {
    var tl = gsap.timeline({ delay: 2.6 });

    tl.from('.hero-content__pre-label', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero-content__title', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-content__divider', {
      scaleY: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-content__tagline', {
      opacity: 0,
      y: 25,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-content__cta', {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-scroll-indicator', {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.2');
  }

  /* ------------------------------------------
     PAGE HERO ANIMATION (collections.html etc.)
     ------------------------------------------ */
  var pageHero = document.querySelector('.page-hero');

  if (pageHero) {
    var pageTl = gsap.timeline({ delay: 2.6 });

    pageTl.from('.page-hero__title', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.page-hero__subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');
  }

  /* ------------------------------------------
     REVEAL — Universal ScrollTrigger fade-up
     (.reveal class only — no custom-animated elements)
     ------------------------------------------ */
  document.querySelectorAll('.reveal').forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  /* ------------------------------------------
     PHILOSOPHY — line-by-line stagger
     ------------------------------------------ */
  var philosophyText = document.querySelector('.philosophy__text-en');

  if (philosophyText) {
    var lines = philosophyText.innerHTML.split('<br>');
    philosophyText.innerHTML = lines.map(function (line) {
      return '<span class="philosophy-line" style="display:inline-block;">' + line + '</span>';
    }).join('<br>');

    gsap.from('.philosophy-line', {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.philosophy',
        start: 'top 70%',
        once: true
      }
    });
  }

  /* ------------------------------------------
     COLLECTION PREVIEW — stagger + parallax
     (uses .collection-preview-item initial state from CSS)
     ------------------------------------------ */
  var previewItems = document.querySelectorAll('.collection-preview-item');

  if (previewItems.length) {
    gsap.to(previewItems, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.collection-preview-grid',
        start: 'top 75%',
        once: true
      }
    });

    // Parallax offset on each item
    previewItems.forEach(function (item, i) {
      gsap.to(item, {
        yPercent: (i - 1) * -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.collection-preview-grid',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    });
  }

  /* ------------------------------------------
     ATELIER GLIMPSE — parallax + slide-in
     (uses .atelier-reveal initial state from CSS)
     ------------------------------------------ */
  var atelierImage = document.querySelector('.atelier-glimpse__image');
  var atelierText = document.querySelector('.atelier-glimpse__text');

  if (atelierImage) {
    gsap.to(atelierImage, {
      y: '-15%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.atelier-glimpse',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  if (atelierText) {
    gsap.to(atelierText.querySelectorAll('.atelier-reveal'), {
      opacity: 1,
      x: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.atelier-glimpse',
        start: 'top 60%',
        once: true
      }
    });
  }

  /* ------------------------------------------
     BESPOKE CTA — zoom-out on scroll
     ------------------------------------------ */
  document.querySelectorAll('.bespoke-cta__image-wrap').forEach(function (wrap) {
    gsap.fromTo(wrap,
      { scale: 1.05 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.closest('.bespoke-cta'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }
    );
  });

  /* ------------------------------------------
     PRODUCTS GRID — batch stagger fade-up
     ------------------------------------------ */
  var productCards = document.querySelectorAll('.product-card');

  if (productCards.length) {
    gsap.set(productCards, { opacity: 0, y: 60 });

    ScrollTrigger.batch(productCards, {
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out'
        });
      },
      start: 'top 85%',
      once: true
    });
  }

  /* ------------------------------------------
     FILTER TABS — collections.html
     ------------------------------------------ */
  var filterTabs = document.querySelectorAll('.filter-tab');

  if (filterTabs.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        var category = tab.getAttribute('data-category');

        productCards.forEach(function (card) {
          var cardCategory = card.getAttribute('data-category');
          var shouldShow = category === 'all' || cardCategory === category;

          if (shouldShow) {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
              onStart: function () {
                card.style.display = '';
              }
            });
          } else {
            gsap.to(card, {
              opacity: 0,
              scale: 0.95,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: function () {
                card.style.display = 'none';
              }
            });
          }
        });
      });
    });
  }

  /* ------------------------------------------
     FEATURED — Horizontal scroll (ScrollTrigger pin)
     ------------------------------------------ */
  var featuredSection = document.querySelector('.featured-section');
  var featuredTrack = document.querySelector('.featured-track');

  if (featuredSection && featuredTrack) {
    var mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', function () {
      gsap.to(featuredTrack, {
        x: function () {
          return -(featuredTrack.scrollWidth - window.innerWidth + 96);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: featuredSection,
          pin: true,
          scrub: 1,
          end: function () {
            return '+=' + featuredTrack.scrollWidth;
          },
          invalidateOnRefresh: true
        }
      });
    });
  }

  /* ------------------------------------------
     IMAGE PARALLAX — generic [data-parallax]
     ------------------------------------------ */
  document.querySelectorAll('[data-parallax]').forEach(function (img) {
    var speed = img.getAttribute('data-parallax') || '-20%';
    gsap.to(img, {
      y: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });

  /* ------------------------------------------
     ABOUT — Designer slide-in
     (.about-reveal initial state from CSS)
     ------------------------------------------ */
  var aboutDesignerText = document.querySelector('.about-designer__text');

  if (aboutDesignerText) {
    gsap.to(aboutDesignerText.querySelectorAll('.about-reveal'), {
      opacity: 1,
      x: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-designer',
        start: 'top 60%',
        once: true
      }
    });

    // Designer image parallax
    var designerImage = document.querySelector('.about-designer__image');
    if (designerImage) {
      gsap.to(designerImage, {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-designer',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }

  /* ------------------------------------------
     ABOUT — Process steps stagger + parallax
     ------------------------------------------ */
  var processSteps = document.querySelectorAll('.process-step');

  if (processSteps.length) {
    processSteps.forEach(function (step) {
      var img = step.querySelector('.process-step__image-wrap');
      var textEls = step.querySelectorAll('.process-step__number, .process-step__name, .process-step__desc, .process-step__desc-jp');

      // Image fade-in
      if (img) {
        gsap.from(img, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            once: true
          }
        });

        // Image parallax
        gsap.to(img, {
          y: '-10%',
          ease: 'none',
          scrollTrigger: {
            trigger: step,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      }

      // Text elements stagger
      if (textEls.length) {
        gsap.from(textEls, {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
            once: true
          }
        });
      }
    });
  }

  /* ------------------------------------------
     ABOUT — Materials floating image parallax
     ------------------------------------------ */
  var materialsFloating = document.querySelector('.about-materials__floating');

  if (materialsFloating) {
    gsap.to(materialsFloating, {
      y: '-20%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-materials',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  /* ------------------------------------------
     ABOUT — Atelier gallery stagger
     ------------------------------------------ */
  var atelierPhotos = document.querySelectorAll('.about-atelier__photo');

  if (atelierPhotos.length) {
    gsap.set(atelierPhotos, { opacity: 0, y: 60 });

    ScrollTrigger.batch(atelierPhotos, {
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out'
        });
      },
      start: 'top 85%',
      once: true
    });
  }

  /* ------------------------------------------
     BESPOKE — Flow steps stagger
     (uses .bespoke-step initial opacity/y from CSS)
     ------------------------------------------ */
  var bespokeSteps = document.querySelectorAll('.bespoke-step');

  if (bespokeSteps.length) {
    gsap.to(bespokeSteps, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.bespoke-flow__steps',
        start: 'top 75%',
        once: true
      }
    });
  }

  /* ------------------------------------------
     BESPOKE — Past Works batch stagger
     ------------------------------------------ */
  var bespokeWorkItems = document.querySelectorAll('.bespoke-works__item');

  if (bespokeWorkItems.length) {
    gsap.set(bespokeWorkItems, { opacity: 0, y: 60 });

    ScrollTrigger.batch(bespokeWorkItems, {
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out'
        });
      },
      start: 'top 85%',
      once: true
    });
  }

  /* ------------------------------------------
     CONTACT — Form field stagger
     ------------------------------------------ */
  var contactFields = document.querySelectorAll('.contact-form__field');

  if (contactFields.length) {
    gsap.from(contactFields, {
      opacity: 0,
      y: 30,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        once: true
      }
    });
  }

  /* ------------------------------------------
     CONTACT — Access map fade-in
     ------------------------------------------ */
  var accessMap = document.querySelector('.contact-access__map');

  if (accessMap) {
    gsap.from(accessMap, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-access',
        start: 'top 70%',
        once: true
      }
    });
  }

  /* ------------------------------------------
     REDUCED MOTION — kill parallax/scrub effects
     ------------------------------------------ */
  if (prefersReducedMotion) {
    ScrollTrigger.getAll().forEach(function (st) {
      if (st.vars.scrub) st.kill();
    });
  }

})();
