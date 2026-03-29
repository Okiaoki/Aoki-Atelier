/* ============================================
   LOADING SCREEN — loading.js
   ============================================ */
(function () {
  'use strict';

  var screen = document.querySelector('.loading-screen');
  if (!screen) return;

  var brand = screen.querySelector('.loading-brand');
  var tagline = screen.querySelector('.loading-tagline');
  var barFill = screen.querySelector('.loading-bar-fill');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var barDelay = reduced ? 0 : 400;
  var hideDelay = reduced ? 100 : 2800;
  var removeDelay = reduced ? 100 : 700;

  // Step 1: Show brand name
  requestAnimationFrame(function () {
    brand.classList.add('visible');
    tagline.classList.add('visible');

    // Step 2: Animate progress bar
    setTimeout(function () {
      barFill.classList.add('animate');
    }, barDelay);

    // Step 3: Slide out after bar completes
    setTimeout(function () {
      screen.classList.add('hide');

      // Step 4: Remove from DOM after transition
      setTimeout(function () {
        screen.remove();
      }, removeDelay);
    }, hideDelay);
  });
})();
