---
title: "The Einstein Summation Convention"
date: "2025-08-04"
---

<blockquote>

"I have made a great discovery in mathematics; I have suppressed the summation sign every time that the summation must be made over an index which occurs twice..." Albert Einstein [(Kollros 1956; Pais 1982, p. 216)](https://mathworld.wolfram.com/EinsteinSummation.html).
</blockquote>

<!-- more -->

The [Einstein summation notation](https://en.wikipedia.org/wiki/Einstein_notation) simplifies expressions involving sums over multiple indices. Typically, such expressions are sums of products, with some indices summed over ("dummy" indices) and others left free ("free" indices).

The convention is: _if an index appears exactly twice in a term, summation over that index is implied._

Dummy indices can be renamed without changing the meaning; free indices remain unchanged. In tensor notation, summed indices often pair as one superscript (upper) and one subscript (lower).

## Cheat-sheet

| Type           | Description      | Summation Notation                          |
|:-------------- |:--------------- |:--------------------------------------------|
| Vector         | expansion        | $x^i e_i$                                   |
| Co-Vector      | expansion        | $y_i e^i$                                   |
| Metric Tensor  | basis change     | $e^i = g^{ij}e_j$                           |
| Metric Tensor  | dot product      | $\langle x, y \rangle = x \cdot y = g_{ij} x^i y^j$ |
| Matrix         | multiplication   | $u^i = A^i_j v^j$                           |
| Matrix         | multiplication   | $C^i_j = A^i_k B^k_j$                       |
| Matrix         | inverse          | $A^i_k (A^{-1})^k_j = \delta^i_j$           |


