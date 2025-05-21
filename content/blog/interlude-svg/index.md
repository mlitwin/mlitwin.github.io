---
title: "Interlude in the House of SVG"
date: "2025-05-20"
--- 

Making diagrams for coordinate systems proved harder than I thought, and I got sidetracked.

<!-- more -->

## SVG Diagrams

I wanted to make some [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) diagrams for coordinate systems on a sphere, to illustrate some tensor calculus concepts, and work through some examples. SVG's 3D capability isn't quite what I wanted (via [CSS perspective transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/perspective)) - there are cases like viewing shapes on edge that don't work in common browsers, and the full 3D experience isn't actually what I was looking for, e.g. I want a 1 pixel width line to stay 1 pixel width at any distance – more a wireframe effect than true 3D.

## svg-gen

So I wrote a node library [svg-gen](https://github.com/mlitwin/svg-gen) to create SVGs, which supports a perspective transform by mapping shapes (here circles) according to a perspective transform, where they become ellipses. It can also handle special cases like viewing a circle on edge by transforming it into a line.

Clipping was hard!

Much more to do in the library, but good enough to start on diagrams.


![Sphere](https://antoninus.org/svg-gen/generated/spherestandard.svg)

![Skew Sphere](https://antoninus.org/svg-gen/generated/sphereskew.svg)


And here's a CSS transform effect that wasn't what I was aiming for

![CSS 3D Transformed Circles](https://antoninus.org/svg-gen/csstransforms.svg)


