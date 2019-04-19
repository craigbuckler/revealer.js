# revealer.js

revealer.js reveals an element with a CSS animation when it is scrolled into view.

[See example page on Codepen.io...](https://codepen.io/craigbuckler/full/Lvmdjb)

Please use the code as you wish - [tweet me @craigbuckler](https://twitter.com/craigbuckler) if you find it useful.

Benefits:

* shows attention-grabbing animations
* fast loading, high performance, uses Intersection Observers
* fully customisable - any CSS reveal effect can be applied
* small: 825 bytes of JavaScript, 171 bytes of CSS (minimum)
* works in all modern browsers (not IE)
* safe progressive enhancement - will not break older browsers
* easy to use


## Usage instructions

Include the minified CSS and JavaScript anywhere in your page. Typically, the CSS is loaded in the HTML `<head>` and the JS is loaded just before the closing `</body>` tag:

```html
<link rel="stylesheet" href="css/progressive-image.min.css">
<script src="js/progressive-image.min.js"></script>
```

Then add a `data-revealer="class"` attribute to any element you wish to animate into view, e.g.

```html
<h1 data-revealer="up">Main title</h1>
```

Five class animations are provided: `up`, `down`, `left`, `right`, and `zoomup`, but more can be added.


## Custom delays

By default, a delay of at least 300 milliseconds occurs between each element animation. So, if three elements are scrolled into view at the same time, the first animates immediately, the second after 300ms, and the third after 600ms.

An optional `data-delay="M"` attribute on the same element sets a custom delay to `M` milliseconds. For example, `data-delay="0"` on three elements scrolled into the viewport at the same time would animate all immediately.


## Custom animations

An element is initially hidden by applying the `.revealer` class which sets `opacity: 0`.

When the element is scrolled into view, the class defined by the `data-revealer` attribute is applied, e.g. `data-revealer="up"` applies the up class which triggers an animation defined by the `.revealer.up` selector in the CSS.

Animations should generally set `animation-fill-mode: forwards` to ensure the animation ends at the state defined by the last (100%) keyframe. That last keyframe should also set the final opacity.

Example from revealer.css:

```css
.revealer.up { animation: revealup 0.6s ease forwards; }

@keyframes revealup {
  0% { opacity: 0.2; transform: translateY(100px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

The element is unobserved once it has been revealed so it remains in-place.


## Advanced configuration

revealer.js defines the following configuration variables in a cfg object which can be changed:

* `cfg.name` - attribute data name (default `revealer`)
* `cfg.delay` - attribute data delay (default `delay`)
* `cfg.root` - root element (default `null` for viewport)
* `cfg.margin` - margin around root element (default `0px`)
* `cfg.threshold` - proportion of element visible before triggering animation (default `0.6` - element must be at least 60% in viewport)
* `cfg.minDelay` - minimum delay between each animation unless set with data-delay (default `300` milliseconds)


## Further considerations

Consider using the [`prefers-reduced-motion` media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) to disable animations according to user preference.


## Version history

### v1.0, 19 April 2019

* Initial commit
