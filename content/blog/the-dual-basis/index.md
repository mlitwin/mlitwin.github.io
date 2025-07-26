---
title: "The Dual Basis"
date: "2025-06-25"
---

The tangent space and the metric lets us do basic calculus at a point on our surface: vector displacements with the metric telling us distances and angles.

The next step is to "do calculus" with scalar functions on our surface. At a point on our surface, we can approximate a scalar function with a [Linear Functional](https://en.wikipedia.org/wiki/Linear_form): $f(x+y)=f(x)+f(y)$ and $f(\lambda x)=\lambda f(x)$. These are what we are going to need.

<!-- more -->

## The Dual Space

If we have a real valued function $F$ on our surface, we can
consider at any point a [Linear Functional](https://en.wikipedia.org/wiki/Linear_form) f on the tangent space $V$ which approximates it: $f(x+y)=f(x)+f(y)$ and $f(\lambda x)=\lambda f(x)$

If $v = \sum_i x^i e_i$ then $f(v) = \sum_i A_i x^i$, where $A_i = f(e_i)$

Conversely we can define a linear functional by its action on the $\{e_i\}$
$$
f(v) \coloneqq \sum_i f(e_i) x^i
$$

The set of our linear functionals on our tangent space is a vector space (it's closed under addition and multiplication by a scalar), and we now see it has the same dimension as the tangent space. It's denoted $V^*$


## The Dot Product

There is a deep relationship between the Dual Space and the Tangent Space (hence the "dual"). This is through a notion of the dot product, which you can define on the tangent space using the Metric Tensor. 

With the Tangent space and the Metric Tensor, we can determine the geometry of our surface in its coordinate system by using the Metric Tensor to define a dot product, which encapsulates the notion of distance of vectors and the angle between vectors.

$$g_{i j}=e_i \cdot e_j$$
and if $x=x^i e_i$ and $y=y^i e_i$, then

$$x \cdot y = g_{i j} x^i y^j$$

As special case for a vector $v=\sum_i x^i e_i$ we can define its length

$$v \cdot v = |v|^2 = g_{i j} x^i x^j$$


and the definition of a scalar product can then define the angle between vectors

$$
x \cdot y=|x||y|\cos\theta
$$  

and a way to project $y$ onto $x$ using the component of $y$ along $x$

$$
\text{comp}_x y = \frac{x \cdot y}{|x|}
$$


$$
\text{proj}_x y = (\text{comp}_x y) x =\frac{x \cdot y}{|x|^2}x
$$

## The Dual Basis
The elements of the Dual Space are linear functionals. But for any vector $v$ in the Tangent space, we can use it to define a linear function, interpreting it as a linear function where for any tangent space vector $x$

$$
    v(x) = v \cdot x
$$

For an orthonormal basis of a vector space, the dot product has a nice property that you can use it to compute the component of any vector $v$ along a basis vector $e$ just by taking $v \cdot e$

The basis of our tangent space might not be nice in this sense. The $\{e_i\}$ might not be unit vectors, but more significantly they might not be orthogonal at all.

But we can find such a basis - the dual basis $\{e^i\}$ where this property holds, and it will be unique.

We want for any vector $v$ in our tangent space to have components $x^i$ in $\{e_i\}$ so that

$$
v = \sum_i (v \cdot e^i) e_i
$$

If it works for any $v$, then it should work for each $e_j$ too, and if it works on the basis vectors, it's going to work for any $v$ since the dot product is linear. A basis vector $e_j$ is really a vector whose $j$-th component is $1$ and the rest $0$.

We can write this in terms of the [Kronecker delta](https://en.wikipedia.org/wiki/Kronecker_delta)

$$
\delta^i_j = \begin{cases}
1 & \text{if } i = j \\
0 & \text{if } i \neq j
\end{cases}
$$

Writing out each $e_j$ in full as a linear combination of all the basis vectors

$$
 e_j = \sum_i \delta^i_j e_i = \sum_i(e_j \cdot e^i) e_i
$$

Comparing components, we must have

$$
e_j \cdot e^i = \delta^i_j 
$$


Expressing the basis $\{e^i\}$, we can express the new basis in terms of the tangent basis $\{e_i\}$ according to some change of basis matrix $\{\alpha^{ij}\}$

$$
    e^i = \sum_k \alpha^{ik}e_k
$$

and now dotting with $e_j$

$$
\delta^i_j = e_j \cdot e^i = \sum_k \alpha^{ik}(e_j \cdot e_k) = \sum_k \alpha^{ik}g_{jk}  = \sum_k \alpha^{ik}g_{kj}
$$

Which in matrix terms means
$$
\mathbf{\alpha} \mathbf{g} = \mathrm{I}
$$


which means that

$$
    \alpha= g^{-1} = \{g^{ij}\}
$$

$$
    \alpha^{ij}= g^{ij}
$$

and we can now express the dual basis vectors in terms of the metric tensor and the tangent space basis vectors

$$
    e^i = \sum_j g^{ij}e_j
$$

## Two interpretations of the Dual Basis

Vectors in the tangent space are naturally thought of as column vectors, taking for $v=\sum_i x^i e_i$ the column vector

$$
x=\
\begin{bmatrix} 
x^1 \\ 
\vdots \\ 
x^n
\end{bmatrix}
$$

A linear transformation on the tangent space has a straightforward formulation as matrix multiplication.

$$
v' = \mathbf{A}v
$$

Now  the dual basis $\{e^i\}$ of the Dual Space, which is a space of linear functionals, which means we interpret $e^i$ as the functional with

$$
e^i(e_j) = \delta^i_j
$$

But also the $\{e^i\}$ are actual vectors in our tangent space, computed by

$$
e^i = \sum_j g^{ij}e_j
$$

with the defining relationship
$$
e^i \cdot e_j = \delta^i_j
$$

So we can also think of them as column vector in the tangent space itself. This is somewhat less direct than when you start with tangent vectors, so I will write them (in a nonstandard way) with a hat $\hat{e^i}$ when thinking of them not as functionals but as vectors living in the tangent space.

$$
\hat{e^i}=\
\begin{bmatrix} 
g^{i1} \\ 
\vdots \\ 
g^{in}
\end{bmatrix}
$$

and for a general $f=\sum_i \alpha_i e^i$,

$$
\hat{f}= \sum_i \alpha_i \hat{e^i}
$$

and taking $\alpha$ as a column vector

$$
\alpha=\
\begin{bmatrix} 
\alpha_1 \\ 
\vdots \\ 
\alpha_n
\end{bmatrix}
$$

we can write our linear function $f$ in terms of the column vector $\alpha$

$$
f(v) = \alpha^T x
$$

For a linear transformation $f' = \mathbf{A}f$, of $f=\sum_i \alpha_i e^i$, the matrix form is a little different than with the tangent space

$$
f'(v) = (\mathbf{A}\alpha)^T x = \alpha^T \mathbf{A}^T x
$$

So transforming $\hat{f}$ by $\mathbf{A}$ is equivalent to transforming the input vectors $x$ by $\mathbf{A}^T$, and vice-versa.

## Next Up

Next up is the gradient