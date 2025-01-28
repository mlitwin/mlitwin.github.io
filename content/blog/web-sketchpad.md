---
title: Web Sketchpad
date: 2021-04-03T14:21:28-07:00
wsp: true
---

I worked a lot in my career on [The Geometer's Sketchpad](https://en.wikipedia.org/wiki/The_Geometer%27s_Sketchpad), an educational geometry visualization and interaction desktop application. Sketchpad had a long and useful life, finally retired as a product in [2019](https://www.mheducation.com/prek-12/program/geometer-s-sketchpad-software/MKTSP-HGA01M0.html). Twenty-five years! It's still in use as an authoring environment for the HTML5 web viewer.

<!-- more -->


## Web Sketchpad

<div class="sketch_canvas"  data-url="/wsp/Newton.json"></div>



Web Sketchpad is HTML5 viewer for Geometer's Sketchpad documents. This was a ground-up re-implementation of the desktop software's internal C logic into HTML5 / JavaScript.

* Some of it's pedagogical potential can be seen in it's [construction tools](https://geometricfunctions.org/fc/tools/) or [pre constructed activities](https://illuminations.nctm.org/wsp/).
* You can see a engineering-centric usage in an [engineering presentation](https://mlitwin.github.io/Cyclades/) I gave on cycle detection (navigate with the right and left arrow).

I learned a tremendous amount about HTML/CSS/JavaScript while working on this. Looking back, it holds up pretty well:

* We limited dependent libraries. There are a few, but it's not an `npm install` fest.
* HTML [Canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) rendering has stayed reasonably performant. Not pining for [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG).

Things I'd re-work:

* Remove the dependency on [jQuery](http://youmightnotneedjquery.com/). In fact, we didn't need it. Useful and comforting while learning, though.
* Use a modern build pipeline like [Webpack](https://webpack.js.org/).
* Use [Typescript](https://www.typescriptlang.org/). Even a modest amount of type checking would help catch some bugs.
* Work on accessibility from the get-go.


