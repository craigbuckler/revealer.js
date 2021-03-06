/*
	Revealer.js
*/
if ('IntersectionObserver' in window) window.addEventListener('DOMContentLoaded', function() {

  'use strict';

  var
    cfg = {
      name      : 'revealer',  // revealer data name, e.g. data-revealer="animationClass"
      delay     : 'delay',     // revealer delay data name, e.g. data-delay="100"
      threshold : 0.6,         // proportion of element visible before triggering animation
      minDelay  : 300          // minimum delay between each animation unless set with data-delay
    },

    rNode = document.querySelectorAll('[data-' + cfg.name + ']');

  var rN = rNode.length;
  if (!rN) return;

  // hide elements
  for (var i = 0; i < rN; i++) rNode[i].classList.add(cfg.name);

  // observe all elements
  window.addEventListener('load', function() {

    var
      nextTime = 0,
      observer = new IntersectionObserver(

        function(entries) {

          entries.forEach(function(entry) {

            var t = entry.target, rCls = (t.dataset[cfg.name] || '').trim();

            if (!rCls || entry.intersectionRatio < cfg.threshold) return;

            // component in view
            var d = t.dataset[cfg.delay], now = +new Date();
            if (nextTime < now) nextTime = now;

            // reveal after delay
            setTimeout(function() {
              requestAnimationFrame(function() {
                t.classList.add(rCls);
              });
            }, d !== undefined ? d : nextTime - now);

            nextTime += cfg.minDelay;

            // unobserve
            observer.unobserve(t);

          });

        },
        {
          root: null,         // root element (null for viewport)
          rootMargin: '0px',  // margin around root element
          threshold: cfg.threshold
        }
      );

    for (var i = 0; i < rN; i++) observer.observe(rNode[i]);

  }, false);

}, false);
