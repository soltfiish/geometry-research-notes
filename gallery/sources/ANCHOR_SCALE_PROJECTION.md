# Exact elimination of independent anchor disks and calibration scales

Supporting theory note, 2026-09-05. This is an elementary derivation and verification, with no originality claim.

## 1. Model and assumptions

The elimination and bound arguments hold in every finite-dimensional Euclidean space: replace planar disks by balls in `R^d`. The explicit examples and verifier use `d=2`. There is one unknown point `x`. Actual anchor `a_i` may be any point of the closed ball

\[
\mathcal D_i=\{a:\|a-c_i\|\le\delta_i\},\qquad \delta_i\ge0.
\]

Each anchor has one range edge to `x`, assigned to a class `k(i)`. Its actual **squared** distance satisfies

\[
\|x-a_i\|^2\in\lambda_{k(i)}[L_i,U_i],\qquad 0\le L_i\le U_i<\infty.
\]

Each class scale belongs to a specified positive interval `Lambda_k`, such as a closed interval `[ell_k,u_k]` with `0<ell_k<=u_k<infinity`, the calibrated singleton `{1}`, or all of `(0,infinity)`. Half-infinite intervals can be treated by the same intersection rule. The actual scale is always finite and strictly positive.

The anchor disks are independent. There are no anchor-to-anchor distance constraints, correlations between anchor displacements, inter-anchor distinctness restrictions, or measurement-error correlations beyond the common scale in each class. Repeated observations of the same actual anchor must share its one physical squared range; treating such records as independent anchors would in general invalidate sufficiency. Known correlations or extra geometric constraints must be retained separately.

## 2. Exact radial image of one anchor disk

At fixed `x`, put

\[
r_i=\|x-c_i\|,\quad m_i=\max(0,r_i-\delta_i),\quad M_i=r_i+\delta_i,
\]

\[
A_i=m_i^2,\qquad B_i=M_i^2.
\]

The achievable ordinary distances are exactly `[m_i,M_i]`, and the achievable squared distances are exactly `[A_i,B_i]`. The triangle inequality proves containment. To attain any ordinary distance `r` in that interval, if `c_i!=x`, choose

\[
a_i=x+r\frac{c_i-x}{\|c_i-x\|}.
\]

Its displacement from `c_i` has length `|r-r_i|<=delta_i`. If `c_i=x`, choose any fixed unit direction, for example `a_i=x+(r,0,...,0)`.

## 3. Exact admissible scales for one edge, including zeros

The physical and instrument intervals overlap iff

\[
[A_i,B_i]\cap[\lambda L_i,\lambda U_i]\ne\varnothing.
\]

Because both intervals are ordered, this is equivalent to

\[
\boxed{A_i\le\lambda U_i,\qquad \lambda L_i\le B_i.}
\]

Consequently:

* If `U_i>0`, impose `lambda>=A_i/U_i`.
* If `U_i=0`, then `L_i=0`; feasibility requires `A_i=0`. If that holds, this edge imposes no scale restriction and is realized by `a_i=x`.
* If `L_i>0`, impose `lambda<=B_i/L_i`.
* If `L_i=0`, impose no upper scale bound.
* If `L_i>0` and `B_i=0`, no positive scale works, even if a nonnegative-scale relaxation would admit zero.

Thus, except for the explicit impossible `U_i=0,A_i>0` case, define

\[
\ell_i(x)=\begin{cases}A_i/U_i,&U_i>0,\\0,&U_i=0,\ A_i=0,\end{cases}
\quad
u_i(x)=\begin{cases}B_i/L_i,&L_i>0,\\+\infty,&L_i=0.\end{cases}
\]

The exact edge scale set is `[ell_i(x),u_i(x)] intersect (0,infinity)`. Infinity is only an unbounded endpoint, never an admissible scale value.

## 4. Exact per-class elimination theorem

Define

\[
\boxed{K_k(x)=\Lambda_k\cap(0,\infty)\cap\bigcap_{i:k(i)=k}[\ell_i(x),u_i(x)].}
\]

Include the zero-upper-bound impossibility test from Section 3. Then **the fixed point `x` is feasible iff every `K_k(x)` is nonempty**.

Necessity follows by retaining each actual class scale. For sufficiency, choose one scale in each nonempty intersection. For each edge choose

\[
D_i\in[A_i,B_i]\cap[\lambda_{k(i)}L_i,\lambda_{k(i)}U_i].
\]

Section 2 constructs an actual anchor attaining `D_i`. Independence of the disks allows these constructions simultaneously. No physical-position variables or scale variables remain in this pointwise feasibility test.

For a closed positive scale interval `[ell_k,u_k]`, feasibility reduces to

\[
\max\bigl(\ell_k,\max_i\ell_i(x)\bigr)
\le
\min\bigl(u_k,\min_i u_i(x)\bigr).
\]

For an unrestricted positive scale, it reduces to

\[
\max_i\ell_i(x)\le\min_i u_i(x),\qquad \min_i u_i(x)>0.
\]

The second inequality is essential: an intersection containing only zero is inadmissible. The maximum lower endpoint is finite under the stated finite-input and zero-bound tests. For calibrated scale `{1}`, the test is simply `A_i<=U_i` and `L_i<=B_i` for every edge in that class.

One may also remove the max/min operators. For every pair `i,j` in a class with `U_i>0,L_j>0`, the cross-comparison is `L_j A_i<=U_i B_j`. Scale-prior endpoint comparisons and the positive-scale condition must still be included. Pairwise cross-comparisons alone can accidentally admit a zero-only scale intersection.

## 5. Exact projection of ratios with one common uncertain reference

Now let `a_0` be a common reference anchor. Its squared physical distance

\[
s=\|x-a_0\|^2
\]

must be strictly positive. The observations are

\[
L_i\le\frac{\|x-a_i\|^2}{s}\le U_i,\qquad i=1,\ldots,m.
\]

At fixed `x`, the exact admissible denominator set is

\[
\boxed{S(x)=[A_0,B_0]\cap(0,\infty)\cap\bigcap_{i=1}^{m}[\ell_i(x),u_i(x)].}
\]

The point is feasible iff `S(x)` is nonempty, subject to the same zero-upper-bound tests. This is the class-scale theorem with the scale specialized to the shared reference squared distance. The reference disk attains every `s` in its squared radial interval, independently of the numerator anchors.

When `A_0=B_0=0`, the set is empty: `0/0` does not define a measured ratio. When `A_0=0<B_0`, positive denominator choices remain possible, so one must not reject the point merely because it lies inside the reference disk.

### Why eliminating the denominator independently for each ratio fails

The individual tests `[A_0,B_0] intersect J_i intersect (0,infinity) != empty`, where `J_i=[ell_i,u_i]`, do not imply a common denominator works for all measurements.

An exact geometric counterexample is

\[
x=(0,0),\quad c_0=(0,3/2),\quad\delta_0=1/2,
\]

with exact numerator anchors `a_1=(1,0)` and `a_2=(2,0)`. The achievable reference squared distances form `[1,4]`; the numerator squared distances are `1` and `4`. Observe both ratios as exactly one. The first ratio requires `s=1`, attained at reference anchor `(0,1)`. The second requires `s=4`, attained at `(0,2)`. Each ratio is individually feasible, but no single reference anchor realizes both. The joint denominator set is empty.

## 6. Compactness and a positive denominator certificate

Consider one ratio interval `[L,U]` between actual anchors `a_0` and `a_i`, with finite `0<=L<=U`. Set

\[
C=\|c_i-c_0\|,\quad
D_+=C+\delta_0+\delta_i,\quad
D_-=\max(0,C-\delta_0-\delta_i).
\]

For every allowed pair of anchor positions, `D_-<=||a_i-a_0||<=D_+`. Write the actual ordinary reference and numerator distances as `r_0,r_i`, so

\[
\sqrt L\,r_0\le r_i\le\sqrt U\,r_0,\qquad r_0>0.
\]

### Positive denominator from separated disks

By the triangle inequality,

\[
D_-\le r_0+r_i\le(1+\sqrt U)r_0.
\]

Therefore

\[
\boxed{s=r_0^2\ge\frac{D_-^2}{(1+\sqrt U)^2}.}
\]

If the disks are strictly separated (`D_->0`), this is a strictly positive bound valid for every feasible geometry. It bounds the actual reference distance; it does not assert that `x` is separated from every point of the reference disk. With overlapping disks this argument gives no positive lower bound.

### Bounded point location from a ratio interval excluding one

If `L>1`, then `r_i<=r_0+D_+` implies

\[
\boxed{r_0\le\frac{D_+}{\sqrt L-1}.}
\]

If `U<1`, then `r_0<=r_i+D_+` implies

\[
\boxed{r_0\le\frac{D_+}{1-\sqrt U}.}
\]

In either case, let `R_0` denote the displayed upper bound. Every feasible point lies in the closed ball

\[
\boxed{\|x-c_0\|\le\delta_0+R_0.}
\]

These are safe bounds, not claims that the whole ball is feasible. A ratio interval containing one may still yield boundedness together with other constraints, but this single-interval argument does not establish it.

If some observed ratio supplies this location bound and some observed ratio with strictly separated disks supplies a positive denominator bound, the full ratio-model feasible set is compact. Indeed, the point and anchors lie in compact sets; all cross-multiplied interval constraints are closed, and the positive denominator bound replaces the otherwise open condition `s>0`. Projection of that compact feasible set onto `x` remains compact. The bounding and separating ratios need not be the same one.

For the class-scale model, any edge with finite class scale upper bound `lambda_max` gives the additional simple location enclosure `||x-c_i||<=delta_i+sqrt(lambda_max U_i)`.

## 7. Exact checks and scope

Run `python work/uncertain_anchors/parallel/verify_anchor_elimination.py`. It compares the interval-elimination formulas against independent one-variable exact inequality elimination, verifies constructed anchor witnesses, checks the shared-reference counterexample and zero-denominator cases, and verifies equality examples for the compactness and denominator bounds. The resulting JSON certificate is written beside the source.

This result eliminates anchor and scale variables exactly at fixed `x`; it does not by itself give a global optimizer for a target distance over all feasible `x`. A method that encloses this projected set must still justify its global bounds and numerical arithmetic.
