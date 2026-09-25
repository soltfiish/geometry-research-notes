# When the feasible region can escape to infinity

**Checkpoint GCS-REFINEMENT-005 · 5 September 2026**

This is a Euclidean refinement of the common-radius profile theorem. It concerns one unknown point, finitely many independent uncertain anchors, a common uncertainty radius, and ratios to one positive reference range. At least two nominal centers are distinct. The formula and proof below are derived here; literature priority is unestablished.

## 1. The case left open by the linear-growth criterion

Write `alpha_i=sqrt(L_i)`, `beta_i=sqrt(U_i)`, with reference `alpha_0=beta_0=1`, and assume every ratio interval contains one:

\[
\alpha_i\le1\le\beta_i.
\]

The profile `Delta(x)` is then globally bounded, so it is not coercive. Nevertheless, its small sublevel sets can still be bounded. To characterize this boundary, define

\[
A=\{i:\alpha_i=1\},\qquad B=\{j:\beta_j=1\},
\]

both of which contain the reference index. For a Euclidean unit vector `u`, put

\[
\phi(u)=\frac12\left(\max_{i\in A}u\cdot c_i-\min_{j\in B}u\cdot c_j\right)\ge0,
\qquad
\gamma=\min_{\|u\|_2=1}\phi(u).
\]

The minimum exists in every positive finite dimension by continuity and compactness of the unit sphere.

**Theorem.** For any fixed origin `o`,

\[
\Delta(o+tu)\longrightarrow\phi(u)
\]

uniformly over Euclidean unit vectors as `t` tends to infinity. Therefore:

- If `delta<gamma`, the feasible position set `F_delta` is bounded, possibly empty.
- If `delta>gamma`, `F_delta` is unbounded; some ray is eventually entirely feasible.
- The equality `delta=gamma` requires a separate analysis.

If some ratio interval excludes one, the earlier positive linear-growth theorem already makes every finite-radius sublevel bounded. This result treats the complementary case.

## 2. Uniform asymptotic proof

Let `v_i=c_i-o` and `C=max_i ||v_i||`. For `t>C`, put `p_i=u dot v_i`. Then

\[
d_i(o+tu)=\|tu-v_i\|=t-p_i+e_i(t,u),
\]

where

\[
0\le e_i(t,u)
=\frac{\|v_i\|^2-p_i^2}{\|tu-v_i\|+t-p_i}
\le\frac{C^2}{2(t-C)}.
\]

The upper bound is uniform in the finitely many indices and all unit directions.

The pairwise profile term is

\[
q_{ij}(x)=\frac{\alpha_i d_j(x)-\beta_j d_i(x)}{\alpha_i+\beta_j}.
\]

Here every denominator is positive because `beta_j>=1`. If `alpha_i<beta_j`, this term has a strictly negative linear coefficient in `t`. More directly, `|d_i-t|<=C` implies

\[
q_{ij}(o+tu)\le
\frac{\alpha_i-\beta_j}{\alpha_i+\beta_j}\,t+C,
\]

so all such pairs become negative uniformly for sufficiently large `t`. There are only finitely many pairs.

The surviving pairs obey `alpha_i=beta_j=1`, exactly `i in A,j in B`. They have

\[
q_{ij}(o+tu)=\frac{u\cdot(c_i-c_j)}2+
\frac{e_j-e_i}{2}.
\]

Their errors tend uniformly to zero. Taking their finite maximum, together with zero, yields `phi(u)`. The added zero is redundant in the limit because both index sets contain the reference. The origin cancels from each difference.

If `delta<gamma`, choose a uniform asymptotic error smaller than `(gamma-delta)/2`. Outside a large ball, `Delta>delta`, proving boundedness. If `delta>gamma`, choose a minimizing direction `u*` and an error smaller than `(delta-gamma)/2`. Every sufficiently distant point on its ray has `Delta<delta`, proving unboundedness. The exact physical level-set theorem applies because the nominal centers are not all identical.

## 3. Geometric interpretation

The directional function is half the support function of

\[
P=\operatorname{conv}\{c_i:i\in A\}
-\operatorname{conv}\{c_j:j\in B\}.
\]

This convex set contains the origin. Equivalently, `gamma` is half the radius of the largest Euclidean ball centered at the origin contained in `P`; that radius may be zero. This interpretation follows by comparing support functions in every direction.

When all ratios are exactly one, both index sets contain every anchor and

\[
\boxed{\gamma=\tfrac12\times\text{minimum directional width of the anchor convex hull}.}
\]

Thus anchor geometry controls the threshold at which equal-range data permits locations arbitrarily far away. This escape threshold differs from the larger all-space threshold `diam{c_i}/2` proved in the common-radius theorem.

If every nonreference interval contains one strictly, `A=B={0}` and `gamma=0`. In fact the nominal ratios themselves tend uniformly to one, so even at `delta=0` all sufficiently distant nominal points are feasible. Finite ratio tolerances around equal readings can therefore remove every finite upper bound on location, regardless of how many anchors are supplied.

## 4. Exact examples and the equality caution

### Three noncollinear anchors

Take `(0,0),(2,0),(0,2)` and all ratios exactly one. At radius zero, the squared-range equalities give `x=1,y=1`, a unique point. The anchor triangle has minimum width `sqrt(2)`: for a unit vector `(a,b)`, the projection width is `2[max(0,a,b)-min(0,a,b)]`. When `a,b` have the same sign this is at least `sqrt(2)` by `max(|a|,|b|)>=1/sqrt(2)`; with opposite signs it is at least two. Equality occurs at `(1,1)/sqrt(2)`.

Consequently `gamma=1/sqrt(2)`. Every feasible sublevel below this threshold is bounded, even though the profile as a whole is bounded. Above the threshold it is unbounded. The entire plane becomes feasible only at the all-space threshold `diam/2=sqrt(2)`.

In this particular example, equality also gives unboundedness: along `x=t(1,1)/sqrt(2)` with `t>=2`, the profile is

\[
\frac{t-\sqrt{t^2-2\sqrt2\,t+4}}2<\frac1{\sqrt2}
\]

and tends to the threshold. This resolves the equality case for this example only.

### A threshold where radius zero is infeasible

Take reference center `(0,0)`, center `(1,0)` with ordinary ratio interval `[1,2]`, and center `(2,0)` with interval `[1/2,1]`. Every interval contains one. At anchor radius zero, the first lower bound requires `x_coordinate<=1/2`, while the second upper bound requires `x_coordinate>=1`. Hence the exact feasible set is empty.

But vertical unit directions give `phi=0`, so `gamma=0`. Every strictly positive anchor radius makes the feasible region unbounded. This example shows why the strict comparisons in the theorem cannot be replaced automatically with a non-strict unboundedness claim at equality.

`work/refinement/verify_far_field.py` checks the algebraic identities, limiting expressions, and example constraints. The uniform and minimum-width arguments above provide the general proof; finite checks alone would not establish those statements.
