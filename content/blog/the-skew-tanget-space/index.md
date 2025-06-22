---
title: "The Skew Tangent Space"
date: "2025-06-18"
wsp: true
--- 



![Sphere](https://antoninus.org/svg-gen/images/sphereskew.svg)

<!-- more -->

### Coordinates

Define a [Spherical Coordinate System](https://en.wikipedia.org/wiki/Spherical_coordinate_system). For a given point take:
* $r =$ radius
* $\theta =$ polar angle (angle from the north pole)
* $\phi =$ azimuth angle from the prime meridian, which we will take as the great circle through the north pole and the geomagnetic pole at a distance $\gamma$ from the north pole.

In our example we will let $r=1$.

#### Coordinate System

* The lines of longitude ($\theta$ is constant) are great circles through the poles
* The lines of latitude ($\phi$ is constant) are at different angles to the longitudes. 


### Tangent Space

At each pont you have basis vectors of the tangent space: $\{e^1,e^2\}$.

For our sphere, the basis vectors are not in general perpendicular, so this is a non-cartesian coordinate system.

![Sphere](https://antoninus.org/svg-gen/images/sphereskew-tangent.svg)'

$e^1$ is a tangent along a great circle through the magnetic pole, so take that as our unit length a in the cartesian case.

$e^2$ is the same as our cartesian case, so we can take it as a unit vector in the x / horizontal direction of magnitude $\sin\theta$. 

We need the angle between $e^1$ and $e^2$. This is an exercise in [spherical trigonometry](https://en.wikipedia.org/wiki/Spherical_trigonometry):

<div class="sketch_canvas"  data-url="/wsp/SkewTriangle.json"></div>

Given

* $P =$ North Pole
* $M =$ Magnetic Pole.
* $\gamma = $ angle from $P$ to $M$ along our prime meridian 

Let

* $A=$ point of contact / origin of our tangent space
* $B=$ intersection of latitude line from $A$ to the prime meridian
* $\theta=$ polar angle from $P$ to $A$
* $\phi=$ azimuth around $M$ from $B$ to $A$
* $\alpha = \angle MAB$ which is the angle we seek.

Let's figure out some of the angles here:

* Both arc $PA$ and arc $PMB$ are arcs of great circles through the pole $P$, so they intersect the longitude arc $AB$ at right angles.
* arc $AM$ and $PMB$ are arcs of great circles, so $\angle PMA + \angle AMB = \pi$


And now we can apply the [spherical law of sines](https://en.wikipedia.org/wiki/Law_of_sines#Spherical_law_of_sines) and some basic trig

$$\frac{\sin(\pi/2-\alpha)}{\gamma} = 
\frac{\sin\pi-\phi}{\theta}
$$

$$\frac{\cos\alpha}{\gamma} = 
\frac{\sin\phi}{\theta}
$$

$$ \cos\alpha= \frac{\gamma}{\theta}\sin\phi$$

Which is the angle we seek.

So in summary we have

* $|e^1|=1$
* $|e^2|=\sin\theta$
* $\cos\alpha= \frac{\gamma}{\theta}\sin\phi$

Or formulating via the dot product

$$ \frac{e^1 \cdot e^2}{|e^1||e^2|} = \cos\alpha= \frac{\gamma}{\theta}\sin\phi$$

$$e^1 \cdot e^2=\frac{\gamma}{\theta} \frac{\sin\phi}{\sin\theta}$$


# Next Up

Next up will be "The Riemannian Metric"

