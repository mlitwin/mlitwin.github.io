## The musical isomorphism

We can use the two interpretations of the dual basis to define an isomorphism between $V^*$ and $V$.

For any basis $\{e_i\}$ of $V$, there is a corresponding basis $\{e^i\}$ of $V^*$ with the defining relationship

$$
e^i(e_j) = e^i \cdot e_j
$$

On the left $e^i$ is a linear functional; on the right, it is a regular vector.

Thinking of our vectors as column vectors in our $V$ basis $v =\sum_i x^i e_i$ we can express the defining relationship in terms of matrices.

Take $G_{ij}=\{e^i \cdot e_j\}$

Then for any 

$$\begin{align}
f &= \sum_i \alpha_i e^i\\
v &=\sum_i x^i e_i\\
\end{align}$$
$$
    f(v)= \alpha^T G x
$$

This means that for any linear transformation on our space of linear functionals 

$$f \mapsto Mf$$

we have in our matrix view of things

$$
    f(v)= (M\alpha)^T G x = \alpha^T M^T G x
$$

-----

More generally, for any basis $b$ of $V$, there's a corresponding basis $f$ of $V^*$, taking $f(v) = b \cdot v$

So if $\{e_i\}$ is a basis for V (like our tangent basis), then we can write in terms of coefficients of the bases

$$\begin{align}
f &= \sum_i \alpha_i f^i\\
b &= \sum_i \alpha_i b^i\\
v &=\sum_i x^i e_i\\
\end{align}$$

and if we let $D = \{b(i,j)\}$ with $b(i,j)= f^i(e_j)$ a matrix, $\alpha=\{\alpha_i\}$ a column vector, and $x=\{x_i\}$ a column vector, we can write

$$
    f(v)= \alpha^T D x
$$

which means if we change coordinate system in $V^*$ by a matrix $M$, $\alpha'=M \alpha$
