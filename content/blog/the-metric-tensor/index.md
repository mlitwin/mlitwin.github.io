---
title: "The Metric Tensor"
date: "2025-06-22"
wsp: true
--- 

At every point of our coordinate space, we can use the tangent space to define the distance in any (infinitesimal) direction. In general the square of the distance will be a [quadratic form](https://en.wikipedia.org/wiki/Quadratic_form) in the (infinitesimal) coordinate displacements along the basis vectors of the tangent space.

<!-- more -->

## Quadratic Form

We can represent the quadratic form as a [symmetric matrix](https://en.wikipedia.org/wiki/Quadratic_form#Associated_symmetric_matrix)

For a general tangent space with basis $\{e_i\}$, and (infinitesimal) displacements along those basis vectors $\{dx^i\}$, then the square of the distance is:
$$ds^2=\sum_{ij}g_{ij}{dx}^i {dx}^j$$
where $g=\{g_{ij}\}$ is our matrix and $g_{ij}=e_i\cdot e_j$

and if $x=x^i e_i$ and $y=y^i e_i$, then we can define the dot product by

$$

\langle x,y \rangle = x \cdot y = \sum_{ij}g_{i j} x^i y^j

$$

which also lets us define the angle $\theta$ between $x$ and $y$ since we can take 
$$x\cdot y=|x||y|\cos\theta$$
as a definition.


## Law of Cosines

We can figure these out in our examples using the [Law of cosines](https://en.wikipedia.org/wiki/Law_of_cosines).

If we have our basis vectors $AB$, $AC$ with angle $alpha$ between them, to find the displacement of them together you put them head to tail (doesn't matter which is first), and the side $AD$ is the net displacement.

Consider the following diagram:


<div class="sketch_canvas"  data-url="/wsp/Metric.json"></div>

If $\angle BAC=\alpha$, then $\angle ACD=\pi-\alpha$.

And since $\cos(\pi-\alpha)=-\cos\alpha$ the law of cosines tells us

$$
s^2=a^2+b^2+2ab\cos\alpha
$$

## Tangent Space for non-skew Sphere

We have calculated:
* $|e_1|=1$
* $|e_2|=\sin\theta$

which give us

$$
g=\begin{pmatrix}
   1 & 0 \\
   0 & \sin^2\theta
\end{pmatrix}
$$


## Tangent Space for skew Sphere

We have calculated:
* $|e_1|=1$
* $|e_2|=\sin\theta$
* $|e_1||e_2|\cos\alpha = \frac{\gamma}{\theta} \sin\phi \sin\theta$

which give us

$$ \large g=\def\arraystretch{1.5}
\def\A{\frac{\gamma}{\theta} \sin\phi \sin\theta}
\begin{pmatrix}
   1 & \A \\
   \A & \sin^2\theta
\end{pmatrix}
$$

# Next Up

Next up will be "The Dual Basis"