---
title: "The Gradient"
date: "2025-07-27"
---

Now that we have a good dual basis for linear functionals on our tangent space, we can use it to express an important functional - the gradient of a function defined on our surface.

<!-- more -->

## The Gradient

Consider a function $F(\{u_i\})$ on our surface. We can look at the rate of change $A_i$ of $F$ along the direction of our tangent vectors $e_i$, and form the linear functional $f$ where

$$
f(e_i) = A_i = \frac{\partial F(\{u_i\})}{\partial u_i} 
$$

Since $f$ is a linear function, we can express it in the dual basis. $f$ is called the gradient of $F$, written $\nabla F$, and then

$$
\nabla F = \sum_i A_ie^i = \sum_i \frac{\partial F(\{u_i\})}{\partial u_i} e^i
$$

and now for any vector $v = \sum_i x^i e_j$ in our tangent space, the change in $f$ when you displace by $v$ is

$$
f(v) = \nabla F \cdot v = \sum_{ij}A_i x^j (e^i \cdot e_j)  =  \sum_{ij}A_i x^j \delta^i_j = \sum_i A_i x^i
$$

$$
\nabla F \cdot v =  \sum_i A_i x^i
$$

This is how much $F$ changes with an (infinitesimal) displacement by a vector $v$ in the tangent space.

So for any unit vector $v$, $\nabla F \cdot v$ is the rate of change of $F$ along $v$.

## A Geometric Interpretation of the Gradient



This is the [Directional derivative](https://en.wikipedia.org/wiki/Directional_derivative) variously defined. For our purposes here we will define it for any nonzero vector $v$, putting the normalization into the definition.

$$
\nabla_v F = \nabla F \cdot \frac{v}{|v|}
$$

With this definition, for all $\lambda \neq 0$,

$$\nabla_v F = \nabla_{\lambda v} F$$

and thus for any set of $\{\lambda v_0\}$ we can pick a $\lambda$ and thus a $v = \lambda v_0$ with

$$\lambda = \frac{\nabla_{v_0} F}{|v_0|} \implies |v| = \nabla_v F$$ 

Now we can consider set $\mathcal{D}$ of all vectors such vectors $v$ in the tangent space such that
$$
\frac{|\nabla F \cdot v|}{|v|} = |v|
$$

For $\nabla F$, we also have
$$
\frac{\nabla F \cdot \nabla F}{|\nabla F|} = \frac{\nabla F \cdot \nabla F}{|\nabla F|} = \frac{|\nabla F|^2}{|\nabla F|}  = |\nabla F|
$$

So $\nabla F$ is in $\mathcal{D}$

But also $\nabla F$ is the vector of largest length in $\mathcal{D}$. To prove this we will need the [Cauchy-Schwarz Inequality](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality)

$$
u \cdot v = \langle u,v \rangle \leq |u||v|
$$

### A Proof of the Cauchy-Schwarz Inequality

Form a quadratic function $p(t)$

$$
p(t) = \langle tu+v,tu+v \rangle = t^2\langle u,u \rangle + 2t\langle u,v \rangle + \langle v,v \rangle
$$

Since our quadratic form $\langle ,\rangle$ is never negative, we have

$$
 t^2\langle u,u \rangle + 2t\langle u,v \rangle + \langle v,v \rangle \geq 0
$$

This is a parabola that has a minimum at $p'(t)=0$

$$
t = -\frac{\langle u,v \rangle} {\langle u,u \rangle}
$$

so plugging in this $t$ we have

$$
\frac{\langle u,v \rangle^2}{\langle u,u \rangle} -2 \frac{\langle u,v \rangle^2}{\langle u,u \rangle} + {\langle v,v \rangle} \geq 0
$$

Multiplying by $\langle u,u \rangle$ and simplifying and rearranging 

$$
\langle u,u \rangle \langle v,v \rangle \geq  {\langle u,v \rangle}^2
$$

Taking square roots and reversing the order

$$
\langle u,v \rangle \leq \sqrt{\langle u,u \rangle} \sqrt{\langle v,v \rangle} = |u||v|
$$

### The steepest direction


And now we can consider any $v$ with
$$
\frac{\nabla F \cdot v}{|v|} = |v|
$$

and then apply Cauchy-Schwarz

$$
|v|^2  = \nabla F \cdot v \leq |\nabla F||v|
$$

and so

$$
|v| \leq |\nabla F|
$$

## Two Interpretations of the Gradient

Now we have two ways to think about the gradient of a function $F$.

In the dual space, $\nabla F$ is a linear functional that describes the infinitesimal change of $F$ according to the partial derivatives of $F$ along the tangent basis vectors $e_i$.

In the tangent space, $\nabla F$ is a vector in the direction of the steepest change of $F$, whose length is equal to the rate of change of $F$ in that direction.

# Next Up

The Einstein summation convention.