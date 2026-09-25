# The exact common-radius feasibility profile

Supporting theory, 2026-09-05. The statements are proved here as elementary interval elimination and approximation results. No originality claim is made.

## 1. Model

The profile, radial-image, and Lipschitz theorems hold in any nontrivial real normed vector space, with anchor uncertainty balls measured in the same norm. The implemented certified optimizer remains Euclidean and planar. Compactness conclusions require finite dimension or a separate compactness assumption.

One point `x` is unknown and actual anchors `a_i` range independently in closed balls of common radius `delta>=0` centered at `c_i`. All observed squared-distance ratios use actual anchor `a_0` as their common reference, and its actual distance from `x` must be positive. Set

\[
d_i(x)=\|x-c_i\|,\qquad
\alpha_i=\sqrt{L_i},\quad\beta_i=\sqrt{U_i},\quad
0\le\alpha_i\le\beta_i<\infty,
\]

and include reference index 0 with `alpha_0=beta_0=1`. Anchor errors are independent; extra anchor-to-anchor or correlated-error constraints are not included.

For a proposed positive actual reference range `r`, the exact disk-elimination test is

\[
f_x(r)=\max\left(0,\max_i(\alpha_i r-d_i),\max_i(d_i-\beta_i r)\right)\le\delta.
\]

Indeed, each nominal range `d_i` must lie within `delta` of the permissible physical interval `[alpha_i r,beta_i r]`. Every such range change is realizable by an independent anchor displacement of norm at most `delta`. In any normed space, for `c_i!=x` and desired range `q>=0`, choose `a_i=x+q(c_i-x)/||c_i-x||`; its displacement from `c_i` has norm `|q-d_i|`. If `c_i=x`, use any unit vector, which exists because the real normed space is nontrivial.

## 2. Closed pairwise formula

Define the closed-domain profile

\[
\Delta(x)=\min_{r\ge0}f_x(r).
\]

The minimum exists: `f_x` is continuous, and its reference term gives `f_x(r)>=|r-d_0|`, making it coercive as `r` tends to infinity.

The exact formula is

\[
\boxed{
\Delta(x)=\max\left(0,
\max_{i,j:\alpha_i+\beta_j>0}
\frac{\alpha_i d_j(x)-\beta_j d_i(x)}{\alpha_i+\beta_j}
\right).
}
\]

To prove it, fix `delta>=0`. Every index with `alpha_i>0` imposes `r<=(d_i+delta)/alpha_i`. Every index with `beta_j>0` imposes `r>=(d_j-delta)/beta_j`. Add `r>=0`. All upper bounds are nonnegative, so the intersection is nonempty exactly when every lower bound is at most every upper bound, and any `beta_j=0` constraint obeys `d_j<=delta`. The nontrivial pairwise comparisons are

\[
\alpha_i d_j-\beta_j d_i\le(\alpha_i+\beta_j)\delta.
\]

If `beta_j=0`, any `alpha_i>0` gives exactly `d_j<=delta`; reference index 0 ensures such an `i` exists. If `alpha_i=0,beta_j>0`, the formula contributes `-d_i<=0`, which imposes nothing. If both coefficients are zero, the constraint pair imposes no additional comparison and is omitted. This proves the formula including zero observation bounds.

At any radius `delta>=Delta(x)`, the complete allowable closed reference-range interval is

\[
\left[
\max\left(0,\max_{j:\beta_j>0}\frac{d_j-\delta}{\beta_j}\right),
\min_{i:\alpha_i>0}\frac{d_i+\delta}{\alpha_i}
\right],
\]

provided each zero-`beta_j` constraint has `d_j<=delta`. The actual ratio model intersects this interval with `(0,infinity)`.

## 3. The positive-reference boundary

The infimum over `r>0` equals `Delta(x)`. The sole failure of attainment in this common-radius model is

\[
\delta=\Delta(x)=0,\qquad d_i(x)=0\text{ for every }i.
\]

In that case all nominal centers coincide with `x`, and the only zero-error reference range is zero. A ratio with denominator zero is undefined. Arbitrarily small positive radii admit positive reference ranges, but radius zero does not.

For completeness, when `delta>0`, the interval's upper endpoint is positive: it is at least `delta/alpha_max`, where `alpha_max>=1` is finite. If its lower endpoint is zero, choose any sufficiently small positive point in the interval; otherwise the lower endpoint itself is positive. When `delta=0` and some `d_i>0`, zero is not feasible because `f_x(0)=max_i d_i>0`; any minimizing reference range is consequently positive.

Thus, if there are at least two distinct nominal centers, the physical feasible set is exactly

\[
\boxed{F_\delta=\{x:\Delta(x)\le\delta\}\quad\text{for every }\delta\ge0.}
\]

For any centers, the same equality holds when `delta>0`. These qualifications remove the otherwise hidden `r=0` relaxation.

## 4. Range-space interpretation and Lipschitz continuity

Let the admissible physical-range cone be

\[
\mathcal C=\{t\in\mathbb R_{\ge0}^{m+1}:
\alpha_i t_0\le t_i\le\beta_i t_0\ \forall i\}.
\]

Then

\[
\Delta(x)=\operatorname{dist}_\infty\bigl((d_0(x),\ldots,d_m(x)),\mathcal C\bigr).
\]

The cone includes its apex `t=0`; Section 3 describes the only pointwise distinction this introduces for positive reference range. The profile is convex and positively homogeneous **as a function of the nominal range vector**. It is generally not convex as a function of position.

Each pairwise formula term has positional Lipschitz constant at most one: the absolute coefficients of `d_j` and `d_i` sum to one, while each nominal range is 1-Lipschitz. Taking a finite maximum preserves that bound. Hence

\[
\boxed{|\Delta(x)-\Delta(y)|\le\|x-y\|.}
\]

This constant is sharp. For two centers `(0,0),(2,0)` with exact ratio one, the profile is `|d_1-d_0|/2`, and changes with slope one along the segment joining the centers.

The same formula gives robustness to nominal-center perturbations: if `max_i ||c_i-c_i'||<=h`, the corresponding profiles differ by at most `h` at every fixed point. This is a statement about independent center errors and fixed ratio bounds.

## 5. Valid offset properties and their limitations

For every nonempty physical feasible set and `h>=0`,

\[
\boxed{F_\delta+\overline B_h\subseteq F_{\delta+h}.}
\]

Besides following from the Lipschitz bound under Section 3's level-set conditions, this has a direct construction valid even in the exceptional setup: translate a feasible point and all its actual anchors by a vector of norm at most `h`. The ratios are unchanged and the translated anchors remain within radius `delta+h` of their original centers.

Also,

\[
\boxed{\operatorname{dist}(x,F_\delta)\ge(\Delta(x)-\delta)_+.}
\]

Consequently, a position box centered at `z` with covering radius `rho` is certainly infeasible if `Delta(z)>delta+rho`. This is a valid, possibly conservative, rejection certificate.

The reverse offset inclusion is false. With centers `c_0=(0,0),c_1=(2,0)` and exact ratio one,

\[
F_0=\{(u,v):u=1\},\qquad
\Delta(x)=\frac{|\|x-c_1\|-\|x-c_0\||}{2}.
\]

At `x=(0,3/2)`, the nominal ranges are `3/2,5/2`, so `Delta(x)=1/2`; however `dist(x,F_0)=1`. The radius-`1/2` anchor witnesses are `a_0=(0,-1/2)` and `a_1=(8/5,3/10)`, both at physical distance two from `x`. Thus `x` belongs to `F_(1/2)` but not to the radius-`1/2` offset of `F_0`.

There is no uniform converse bound `dist(x,F_0)<=C Delta(x)` on the whole plane in this example. At `x=(0,H)` with `H>0`,

\[
\Delta(x)=\frac{2}{\sqrt{H^2+4}+H}\longrightarrow0,
\qquad \operatorname{dist}(x,F_0)=1.
\]

Nor should the profile be treated as positionally convex. For the same centers but exact ordinary ratio two, the zero set is the circle centered at `(-2/3,0)` with radius `4/3`. Its points `(-2,0)` and `(2/3,0)` have profile zero, whereas their midpoint `(-2/3,0)` has profile `4/9>0`.

## 6. Global growth and an exact all-space threshold

Put `a=max_i alpha_i`, `b=min_j beta_j`. Reference index 0 ensures `a>=1>=b>=0`, and therefore

\[
\kappa=\frac{a-b}{a+b}\in[0,1].
\]

For any chosen origin `o`, put `C=max_i ||c_i-o||`. The reverse triangle inequality gives `|d_i(x)-||x-o|||<=C`. The range-vector Lipschitz theorem and the pairwise formula evaluated on a constant range vector give

\[
\boxed{|\Delta(x)-\kappa\|x-o\||\le C.}
\]

Indeed, on the constant range vector `(t,...,t)`, the largest pairwise coefficient `(alpha_i-beta_j)/(alpha_i+beta_j)` is attained at `a,b` and equals `kappa`. Hence the profile is coercive, meaning it tends to infinity when `||x||` does, **iff `kappa>0`**. This is equivalent to at least one observed ratio interval excluding one. When `kappa=0`, the profile is globally bounded by `C`.

For `kappa>0`, every radius-`delta` feasible position obeys `||x-o||<=(delta+C)/kappa`. In finite dimension, closed feasible sublevels are consequently compact. In infinite dimension, this argument supplies boundedness, not compactness. Conversely, a globally bounded profile need not have every small sublevel unbounded; no such converse is asserted.

When every observed ratio is exactly one, the formula simplifies to

\[
\Delta(x)=\frac{\max_i d_i(x)-\min_i d_i(x)}2.
\]

If `D=diam{c_i}`, the triangle inequality gives the spread at most `D`; evaluating at an endpoint of a diameter realizes spread `D`. Therefore

\[
\boxed{\sup_x\Delta(x)=D/2.}
\]

If `D>0`, the entire normed space becomes feasible exactly at common anchor radius `delta>=D/2`. If `D=0`, every positive radius makes the entire space feasible, but at radius zero the common-center point still has the undefined reference ratio described in Section 3.

This threshold does not mean the anchor balls must have a common intersection. In the Euclidean plane, take equilateral centers `(0,0),(2,0),(1,sqrt(3))` and radius one. The first two balls meet only at `(1,0)`, which lies outside the third, so their total intersection is empty. Nevertheless `D/2=1`, and for every point there are independently adjusted anchors giving all physical ranges equal and positive.

## 7. A finite-certification theorem for subdivision

Let `K` be a compact box known to contain the whole physical feasible set `F={x in K:Delta(x)<=delta}`, with the level-set qualification of Section 3 satisfied. Assume `F` is nonempty. Let `g` be a continuous scalar target, such as distance to a fixed point. Write `m=min_F g`, `M=max_F g`.

Suppose a subdivision algorithm has:

1. A finite initial box cover and finitely branching, fair subdivisions whose maximum side lengths tend to zero along every infinite branch.
2. Safe rejection certificates that reject every sufficiently small box lying near any fixed infeasible point. A convergent interval extension of `Delta`, or the exact Lipschitz rejection test above, suffices.
3. Safe target-range enclosures on boxes whose widths tend uniformly to zero as box diameters do.
4. A sequence of genuinely feasible witnesses dense in `F`, made available fairly during the calculation.

For any fixed `eta>0`, the algorithm can certify all remaining boxes inside

\[
[m_{\rm witness}-\eta,\ M_{\rm witness}+\eta]
\]

after finitely many subdivisions and a finite witness prefix. Its target-range enclosure is then within `eta` beyond its feasible witnessed extrema on each side.

Proof: choose a finite witness prefix with `m_witness<m+eta/3` and `M_witness>M-eta/3`, possible by density and continuity. Every feasible target value lies strictly inside the acceptance interval by margin at least `2 eta/3`. Uniform continuity and convergent target enclosures therefore make all sufficiently small boxes near `F` acceptable. The compact set away from that neighborhood is infeasible; continuity gives a positive minimum gap `Delta-delta` there, so convergent rejection certificates reject its sufficiently small boxes. Hence a uniform sufficiently fine cover has no unresolved box. If a finitely branching adaptive tree had infinitely many unresolved descendants, it would have an infinite branch, contradicting vanishing diameters and this fine-cover property. Fair witness generation ensures the required finite prefix is eventually available.

If `F` is empty, compactness instead gives `min_K Delta>delta`, so convergent rejection alone yields a finite emptiness certificate. No positive-tolerance endpoint theorem is claimed at `eta=0`.

The witness assumption is material. Rational grid sampling is not automatically dense on isolated or lower-dimensional feasible components. A sufficient condition for rational feasible sampling is `F=closure({x in K:Delta(x)<delta})`, together with sampling dense in that strict feasible set. Alternatively, an exact witness method may cover boundary-only components.

Likewise, coefficient enclosures must converge as needed. Fixed-width outward approximations of `alpha_i,beta_i` can retain an artificial uncertainty gap even when spatial boxes shrink to points. A general arbitrary-`eta` convergence theorem therefore requires tightening those coefficient bounds, exact coefficient evaluation, or a separately established precision margin. A finite completed certificate may remain fully valid with fixed outward coefficients; this distinction concerns the general termination guarantee.

## 8. Verification

`verify_common_radius_profile.py` independently minimizes the two-variable rational linear program by exact vertex enumeration and compares its optimum with the pairwise formula. It also verifies zero-bound and positive-reference edge cases, explicit anchor witnesses for the offset counterexample, the nonconvexity example, and exact profile Lipschitz checks. It writes its certificate only within this directory.
