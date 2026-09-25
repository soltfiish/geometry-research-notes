# Partial reference-range knowledge and rigid shapes

**Checkpoint GCS-SCALE-SHAPE-009 — 2026-09-05**

These are explicit extensions and corrections within the stated geometric models. The proofs establish their mathematical validity; the accompanying finite exact checks support the implementations. No originality claim is made. The calibrated triangle experiment at the end is separate from the ratio model used in sections 1–4.

## 1. An exact profile with partial reference-range knowledge

Use the one-point model from `RECOVERY_SPACE_THEOREM.md`: nominal anchors c_i, independent actual anchor balls of common radius delta in a nontrivial real normed space, and ordinary range ratios `[alpha_i,beta_i]`, with `0<=alpha_i<=beta_i<infinity` and `alpha_0=beta_0=1`. Write `d_i=||x-c_i||`. The shared variable r is the **actual physical reference distance**, not a dimensionless similarity scale.

Suppose now that

\[
0<a\le r\le b<\infty.
\]

For a proposed x, the minimum common anchor radius needed for consistency is

\[
\Delta_{[a,b]}(x)=\min_{a\le r\le b}
\max\left(0,\max_i(\alpha_i r-d_i),\max_i(d_i-\beta_i r)\right).
\]

**Theorem 1 (clipped reference interval).** Let Delta be the previous uncapped profile. Then

\[
\boxed{\Delta_{[a,b]}(x)=\max\left\{
\Delta(x),\ \max_i(\alpha_i a-d_i(x)),\ \max_i(d_i(x)-\beta_i b)
\right\}.}
\]

The exact physical feasible set is `{x:Delta_[a,b](x)<=delta}`. There is no zero-reference exception because `a>0`.

**Proof.** At a fixed delta, each positive beta_j supplies the lower bound `r>=(d_j-delta)/beta_j`, and each positive alpha_i supplies the upper bound `r<=(d_i+delta)/alpha_i`. In addition, `a<=r<=b`. A finite family of real intervals has a common point exactly when every lower bound is at most every upper bound. Comparisons between data bounds give precisely `Delta(x)<=delta`. Comparing a with every data upper bound gives `alpha_i a-d_i<=delta`; comparing each data lower bound with b gives `d_i-beta_i b<=delta`. The remaining cap comparison is the assumed `a<=b`. A zero beta_j requires `d_j<=delta`, which is included in the last maximum; a zero alpha_i adds no condition. Finally, the independent-anchor radial realization lemma constructs every permissible range. This proves necessity, sufficiency, and the minimum-radius formula.

The formula is valid in every dimension covered by the radial-image lemma. It is 1-Lipschitz in x, because every added term is 1-Lipschitz and the original profile is. As a function of the nominal range vector, it is the infinity-norm distance to the admissible range cone truncated by `a<=t0<=b`; it is convex there. It need not be convex in position.

**Corollary 1 (finite upper cap).** Every feasible position obeys

\[
\boxed{\|x-c_0\|\le b+\delta.}
\]

This follows from the reference term `d0-b<=delta`, or directly from the triangle inequality through the actual reference anchor. Thus every finite upper reference bound prevents escape for every anchor layout. In finite dimension the feasible set is compact, possibly empty. One does not need a modified minimum-width threshold to prove this boundedness.

The upper cap, rather than the lower cap, is decisive. If only `r>=a>0` is known, the corresponding formula is

\[
\Delta_{[a,\infty)}(x)=\max\{\Delta(x),\max_i(\alpha_i a-d_i(x))\}.
\]

Outside a sufficiently large ball every added term is negative, so the capped-below profile equals the original profile there. A positive lower reference bound alone leaves the escape behavior unchanged.

A physical prior on transmit power, focal length, or another instrument parameter should not automatically be identified with `[a,b]`. Its forward model must first yield bounds on r, or a separately defined multiplicative range scale. The theorem above specifies exactly which variable has been constrained.

**Example: bounded does not mean connected.** Take exact anchors `(0,0),(2,0)`, ratio one, delta zero, and reference range `[2,3]`. Equal ranges imply `x_coordinate=1`, and `r^2=1+y^2`. The feasible set is exactly

\[
\{(1,y):y\in[-\sqrt8,-\sqrt3]\cup[\sqrt3,\sqrt8]\}.
\]

The upper cap bounds the set, while the lower cap separates it into two components.

## 2. Escape directions: useful extraction, with boundary qualifications

Assume every ratio interval contains one and retain the earlier definitions

\[
A=\{i:\alpha_i=1\},\quad B=\{j:\beta_j=1\},\quad
P=\operatorname{conv}\{c_i:i\in A\}-\operatorname{conv}\{c_j:j\in B\},
\qquad \phi(u)=\tfrac12h_P(u).
\]

The updated `ESCAPE_CONE.md` correctly gives a strict/non-strict sandwich for eventual feasible rays. It should not be read as establishing that every direction with `phi(u)=delta` actually escapes.

To include curved paths to infinity as well, define the asymptotic direction set

\[
D_\infty(F_\delta)=\{u:\exists x_n\in F_\delta,\ \|x_n\|\to\infty,
\ x_n/\|x_n\|\to u\}.
\]

In finite dimension this set is closed. A diagonal choice of sufficiently distant feasible points proves closedness. Uniform convergence of Delta gives

\[
\boxed{\overline{\{u\in S^{d-1}:\phi(u)<\delta\}}
\subseteq D_\infty(F_\delta)
\subseteq\{u\in S^{d-1}:\phi(u)\le\delta\}.}
\]

The left inclusion follows because every strict direction has an eventually feasible ray, and then by closedness. For the right inclusion, evaluate the uniform limit along an escaping sequence of varying unit directions. Consequently the two sets coincide whenever the weak sublevel is the closure of the strict sublevel. This condition must be checked; it is not automatic at critical directions.

For any delta the **weak outer set** has the exact polyhedral description

\[
\{u\in S^{d-1}:u\cdot(c_i-c_j)\le2\delta\ \text{for all }i\in A,j\in B\}.
\]

The identity with `S^(d-1) intersect 2 delta P°` requires **delta>0**. At delta zero the correct expression is `S^(d-1) intersect {v:h_P(v)<=0}`. Multiplying an unbounded polar set by zero in the ordinary set-scaling sense gives only `{0}`, which loses genuine zero-support directions.

**Boundary counterexample with the same hull.** Exact equal ratios for anchors `(0,0),(2,0)` at delta zero give the entire line `x_coordinate=1`. Adding the interior anchor `(1,0)` makes the exact equal-range set empty: its bisector with `(0,0)` instead requires `x_coordinate=1/2`. Both layouts have exactly the same convex hull and the same directional function `phi(u)=|u_x|`. Thus the support function alone cannot decide the critical vertical directions at delta zero.

The support function is a sum `h_convA(u)+h_convB(-u)`, not a difference of support functions. Its homogeneous extension is convex, but its unit-sphere sublevel, or the radial cone `{lambda u:lambda>=0, u in that sublevel}`, need not be convex. For a square with corners `(±1,±1)` and equal ratios, `phi(u)=|u_x|+|u_y|`. At delta `6/5`, coordinate-axis directions strictly escape but the diagonal direction does not. The corresponding radial cone is therefore nonconvex; it is not the convex conic hull.

**Side constraints.** For an arbitrary prior region R, a sufficient condition for `F_delta intersect R` to be bounded is

\[
D_\infty(R)\cap\{u\in S^{d-1}:\phi(u)\le\delta\}=\varnothing.
\]

Otherwise an unbounded intersection would have a subsequence with a common limiting unit direction in both sets. If R is nonempty, closed, and convex, `D_infinity(R)=rec(R) intersect S^(d-1)`: use a fixed point in R, convex combinations with an escaping sequence, and closedness to construct each recession ray. That permits a recession-cone test in this particular case.

This is a sufficient test, not a general equivalence. The exact bisector line `x=1` and the closed half-space `x<=0` have common vertical directions at infinity but empty intersection. For a general closed nonconvex prior, its ordinary recession cone is inadequate: a parabola is closed and unbounded but has only the zero recession vector. If F is the whole plane, intersection with that parabola remains unbounded. These qualify the stronger wording in section 5 of `ESCAPE_CONE.md`.

## 3. Rigid shape: boundedness depends on the measurement graph and ratio bounds

Work in Euclidean space. A known finite body has vertices

\[
X_k=t+Qv_k,\qquad Q^TQ=I,\qquad v_0=0.
\]

Each physical anchor a_i belongs to its bounded ball about c_i. Every observed link `(k,i)` compares `D_ki=||X_k-a_i||` to **one global reference** `r=||X_0-a_0||>0`. An anchor observed by several vertices is one common point. These assumptions are essential; independent reference scales for different vertices define a different problem.

**Theorem 2 (strict intervals preserve escape).** If every nonreference observed ratio interval satisfies `alpha_ki<1<beta_ki`, then all sufficiently distant translations are feasible, uniformly over every orthogonal Q, already using the nominal anchors.

**Proof.** Put `H_ki=||v_k||+||c_i-c_0||` and `m_ki=min(1-alpha_ki,beta_ki-1)>0`. For nominal anchors,

\[
|D_{ki}-r|\le H_{ki},\qquad r\ge\|t\|-\|c_0\|.
\]

Hence every ratio lies strictly inside its allowed interval once

\[
\|t\|>\|c_0\|+\max_{(k,i)\ne(0,0)}H_{ki}/m_{ki}.
\]

All anchor uncertainty balls contain their nominal points, so the same configurations are feasible in the uncertain-anchor model. This proves the claim. Knowing a bounded rigid shape therefore does not restore bounded translation in this strict-interval regime.

Conversely, if some observed ratio interval excludes one, let `eta>0` be its distance from one. For that link,

\[
\eta r\le|D_{ki}-r|\le\|v_k\|+\|c_i-c_0\|+\delta_i+\delta_0.
\]

This bounds r and thus t. The substantive shape question is the remaining boundary regime, including exact equalities.

**Theorem 3 (a known full-dimensional shape can prevent escape at equality).** Suppose one common physical anchor is exactly equidistant from `d+1` affinely independent vertices of a known rigid body in R^d. Then every feasible body translation is bounded by that anchor's position bound, even if the common reference range was initially unrestricted.

**Proof.** In body coordinates let z be the unique circumcenter of those vertices. Subtracting equal squared distances shows that the anchor must be `a=t+Qz`; the relevant difference matrix is invertible by affine independence. If `||a-c||<=delta`, then

\[
\boxed{\|t-c\|\le\delta+\|z\|.}
\]

Additional vertices or anchors can only restrict this set. For the right triangle `(0,0),(1,0),(0,1)`, `z=(1/2,1/2)` and its common range is exactly `1/sqrt2`. The shape itself supplies a range bound. If more body vertices must be equidistant but are not cospherical, the feasible set is empty rather than unbounded.

The same conclusion holds uniformly over a bounded family of shapes whose chosen affine basis stays uniformly nonsingular. Choose a base vertex v_star of that simplex and let V have rows `(v_k-v_star)^T` for its other d vertices. The circumcenter obeys `2Vz=(||v_k||^2-||v_star||^2)_k`; a uniform lower singular-value bound on V and upper bound on vertex norms bound z. This does not require the selected simplex to include the reference body vertex. Near-singular shape families require separate analysis.

Theorems 2 and 3 deliberately describe different data assumptions: exact equality can couple a known shape to a bounded anchor, whereas every nonreference ratio admitting a nonzero neighborhood of one permits sufficiently distant bodies. It would be false to claim universally either that rigidity restores boundedness or that it cannot.

## 4. What a correct shared-anchor pooled condition looks like

Throughout this section assume every observed ratio interval contains one. Suppose an escaping sequence has `t_n/||t_n|| -> u`, `Q_n -> Q`, and `a_i,n -> a_i`, passing to a subsequence as necessary. Compactness of the orthogonal group and anchor balls permits this in finite dimension. Let `z_i=u dot a_i`. Then

\[
D_{ki,n}-r_n\longrightarrow f_{ki}=u\cdot Qv_k-z_i+z_0,
\qquad |z_i-u\cdot c_i|\le\delta_i.
\]

Therefore every active lower boundary `alpha_ki=1` requires `f_ki>=0`, and every active upper boundary `beta_ki=1` requires `f_ki<=0`. There is **one z_i per physical anchor**, shared by every incident reading. These conditions must be solved jointly with Q; introducing a different anchor projection for every link is an outer relaxation.

They are necessary first-order conditions. If there are no nonreference exact-equality intervals and all active inequalities for nonreference links can be made strict for some Q and admissible z_i, they are also sufficient for an eventual feasible ray: choose `a_i=c_i+(z_i-u dot c_i)u`, hold Q and the anchors fixed, and use the first-order signs; all intervals strictly containing one eventually hold automatically. The reference identity has `f_00=0` and holds exactly, so it does not require strict slack. Exact-equality links and non-strict active conditions still require higher-order consistency. This does not claim an exact characterization of every boundary escape direction.

For the full-dimensional exactly equidistant simplex in Theorem 3, these first-order conditions already force u to be orthogonal to every transformed body edge, which is impossible for a unit vector. This is a useful check that the pooled formulation preserves the shared-anchor obstruction.

## 5. Authorized side-tolerance test in the calibrated triangle benchmark

Retain all nine checkpoint-007 lossy squared-range intervals and the target `g=||X2-(1,1)||`. Exact anchors are `(0,0),(4,0),(0,4)`. Now each ordinary side length can vary by relative tau about its nominal value `(1,1,sqrt2)`, equivalently each nominal squared side s belongs to `[s(1-tau)^2,s(1+tau)^2]`. Measurement errors and side tolerances are different inputs.

Let `u=X1-X0`, `b=||u||`, and `e=u/b`. The first six range observations imply `u_x>=199/200`, `|u_y|<=1/200`, and `X0` lies within `1/400` per coordinate of `(2,2)`. Hence

\[
b\ge b_{min}=\max(1-\tau,199/200),\quad
|e_y|\le s_{max}=\frac{1}{200b_{min}},\quad e_x\ge\sqrt{1-s_{max}^2}.
\]

Write `v=X2-X0=p e+sigma h Je`, with `h>=0`. The three squared-side intervals give

\[
u\cdot v=\tfrac12(\|u\|^2+\|v\|^2-\|v-u\|^2),\qquad |u\cdot v|\le4\tau.
\]

Thus `|p|<=p_max=4tau/b_min` and

\[
\sqrt{(1-\tau)^2-p_{max}^2}\le h\le1+\tau.
\]

The radicand is positive for every tested tau up to 2%. The reflected branch has

\[
X2_y\le801/400+p_{max}s_{max}-h_{min}e_{x,min}<119/40,
\]

contradicting its measured lower coordinate bound. On the remaining branch,

\[
|X2_x-2|\le1/400+p_{max}+(1+\tau)s_{max},
\]
\[
799/400-p_{max}s_{max}+h_{min}e_{x,min}
\le X2_y\le801/400+p_{max}s_{max}+1+\tau.
\]

Intersect this rectangle with the third vertex's measurement coordinate box. Both coordinates exceed one, so its nearest and farthest corners give valid target bounds. Intersect these with the already proved independent-point target interval. The resulting half-width is a conservative upper bound on the minimum worst-case error.

Lower bounds come from the old rigid feasible shapes and additional exact rational witnesses. Moving the old minimum or maximum witness's third vertex toward or away from the target by at most tau preserves the length tolerances by the triangle inequality (the diagonal has nominal length greater than one); every proposed witness is also checked directly against all three squared-side intervals and all nine original measurement intervals. This does not assume that every proposed move remains measurement-feasible.

At tau `1/50=2%` there is an exact no-gain proof: keep X0 and X1 at their nominal positions and take `X2=(2,Y)` at either independent endpoint `Y=sqrt(9±1/10)`. Since `2.98<Y<3.02`, the vertical leg `Y-2` lies in `[.98,1.02]`. The diagonal satisfies the same relative bound because `1+(1-tau)^2>=2(1-tau)^2` and `1+(1+tau)^2<=2(1+tau)^2`. Both independent extrema therefore remain attainable. Two percent is a sufficient no-gain tolerance, not a proved smallest such tolerance.

`shape_tolerance_certificate.json` records rational witnesses, outward enclosures, and seven tolerance levels. Intermediate bounds are not asserted to be sharp, and an upper bound that reaches the independent error is inconclusive about strict benefit. The stronger exact-rigid certificate is reused at tau zero.

## 6. Verification boundary

`verify_scale_shape.py` compares the capped profile against exact breakpoint enumeration in 3,888 cases, including zero observation bounds and a singleton reference interval. It also checks explicit boundary, cap-topology, circumcenter, and strict-ratio examples. These finite checks do not replace the general proofs above. A separate verifier checks the side-tolerance arithmetic and its physically feasible witnesses.

The substantive open work is a sharp, efficient certificate for mixed active ratio constraints with shared uncertain anchors and variable rigid pose. The first-order pooled condition is a principled necessary test with a strict-slack sufficiency result; it is not yet the full solution to that problem.
