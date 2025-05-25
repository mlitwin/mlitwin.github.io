---
title: "The Tangent Space"
date: "2025-05-24"
--- 


Let's set the scene of the things I think I understand, at least to the first approximation. We have a curvilinear coordinate system on a space under some metric. For example, the surface of a sphere. We will start simple, and then mess with it to look at a slightly more complicated variant.
<!-- more -->

### Coordinates

![Sphere](https://antoninus.org/svg-gen/generated/spherestandard.svg)

Define a [Spherical Coordinate System](https://en.wikipedia.org/wiki/Spherical_coordinate_system). For a given point take:
* $r =$ radius
* $\theta =$ polar angle (angle from the north pole)
* $\phi =$ azimuth (angle from the prime meridian)

In our example we will let $r=1$.

#### Coordinate System
* The lines of longitude ($\theta$ is constant) are great circles through the poles
* The lines of latitude ($\phi$ is constant) are perpendicular to the longitudes

#### Cartesian Coordinates
For the conversion to cartesian coordinates we have:
* $x=r \sin\theta \cos\phi $
* $y=r \sin\theta \sin\phi $
* $z=r \cos \theta$


### Tangent Space

At each pont you have basis vectors of the tangent space: $\{e^1,e^2\}$.

For our sphere, the basis vectors are perpendicular, so this is a cartesian coordinate.

![Sphere](https://antoninus.org/svg-gen/generated/spherestandard-tanget.svg)'

But how long are they are they?

Let $e^1$ be our line of longitude, which is a great circle, so a constant diameter for all points. Take our unit of distance so $|e^1|=1$.

Now for $e^2$ or line of latitude, we have to be a little careful since its radius depends on $\theta$, it's only a great circle along the equator $\theta=\pi/2$. Looking at the cartesian coordinates, $z$ is constant, and you are left with a circle of radius $r \sin \theta$.

* $|e^1|=1$
* $|e^2|=\sin \theta$

Well that's enough for tonight. 

# Next Up

Next up will be "A Tangent Space with a non-orthogonal coordinate system"



