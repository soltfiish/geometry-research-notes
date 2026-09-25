# Finite-distance consistency at mixed ratio boundaries

**Checkpoint GCS-FINITE-BOUNDARY-013 — 2026-09-06**

This note proves an exact fixed-ray test, records a general quadratic feasibility formulation, and completely solves one planar rigid-triangle problem with shared uncertain anchors. The triangle gives a nonempty bounded counterexample to treating the first-order pooled condition as sufficient for escape. These are mathematical additions to this research record; priority in the literature is not established.

## 1. Model and the term that first order loses

Let a known Euclidean body have vertices

\[
X_k=t+Qv_k,\qquad Q^TQ=I,\qquad v_0=0.
\]

One actual anchor a_i is shared by every observation incident to anchor i. Its nominal center is c_i and its uncertainty ball has radius delta_i. All ordinary range intervals compare to one global reference

\[
r=\|X_0-a_0\|>0,\qquad
\alpha_{ki}r\le \|X_k-a_i\|\le\beta_{ki}r.
\]

For the ray theorem, every interval contains one. Fix Q, all actual anchors, an offset t_0, and a unit direction u. Put t=t_0+tau u, and define

\[
p_{ki}=t_0+Qv_k-a_i,\quad p_{00}=t_0-a_0,
\]
\[
f_{ki}=u\cdot(Qv_k-a_i+a_0),\qquad
g_{ki}=\|p_{ki}\|^2-\|p_{00}\|^2.
\]

There is an exact identity, with no asymptotic remainder:

\[
\boxed{\|X_k-a_i\|^2-r^2=2\tau f_{ki}+g_{ki}.}
\]

The earlier pooled test retains f. At a zero first-order coefficient, g decides the sign and cannot be discarded.

**Theorem 1 — exact eventual-ray test for fixed pose orientation and anchors.** The fixed ray satisfies every observation for all sufficiently large tau if and only if every active nonreference constraint satisfies the following test:

| Ratio constraint | Exact eventual-ray condition |
|---|---|
| Exact equality alpha=beta=1 | f=0 and g=0 |
| Lower boundary alpha=1, beta>1 | f>0, or f=0 and g>=0 |
| Upper boundary alpha<1, beta=1 | f<0, or f=0 and g<=0 |
| Strict interval alpha<1<beta | No additional eventual condition |

The actual anchors must, of course, belong to their uncertainty balls. The reference identity satisfies f=g=0 automatically.

**Proof.** All ranges are nonnegative, so squaring comparisons to the positive reference preserves their order. Active boundaries are the displayed affine polynomial in tau; its eventual sign is determined first by its linear coefficient and then by its constant. An exact equality on an eventual ray requires both coefficients to vanish. A lower boundary with alpha<1 instead has squared gap

\[
(1-\alpha^2)\tau^2+
2\tau\,u\cdot(p_{ki}-\alpha^2p_{00})+
\|p_{ki}\|^2-\alpha^2\|p_{00}\|^2,
\]

whose leading coefficient is positive. The analogous upper-bound polynomial has leading coefficient beta^2-1>0. Thus all inactive boundaries hold eventually. There are finitely many constraints, and r>0 eventually, proving both directions.

This is constructive. A polynomial A tau^2+B tau+C with A>0 is positive once

\[
\tau>\frac{|B|+\sqrt{B^2+4A|C|}}{2A}.
\]

The nonconstant active linear constraints give equally explicit thresholds. Include tau>||p_00|| to guarantee a positive reference by the reverse triangle inequality. Taking the maximum of these thresholds supplies a valid starting point for the ray.

This theorem fixes the orientation, anchors, and offset. It does not assert that every escaping configuration sequence admits such a fixed realization. Variable orientations and anchors can change their constant-order behavior as the body recedes.

## 2. A shared-anchor cycle constraint survives the limit

For any two body vertices and two anchors,

\[
\boxed{
\|X_1-a_1\|^2-\|X_1-a_0\|^2
-\|X_0-a_1\|^2+\|X_0-a_0\|^2
=-2(X_1-X_0)\cdot(a_1-a_0).
}
\]

Consequently, four equal observations to the same global reference force

\[
\boxed{Q(v_1-v_0)\cdot(a_1-a_0)=0.}
\]

This constraint is independent of translation. The first-order pooled version of the four-link difference cancels identically, so it misses this orthogonality condition.

More generally, a complete block of equal observations forces the span of its body edges to be orthogonal to the span of its anchor differences. Their dimensions sum to at most the ambient dimension. This is a necessary condition, not sufficient feasibility for an arbitrary graph.

The same condition must hold at any limit of orientations and anchors along an escaping sequence: it is an exact continuous identity before taking the limit. It can therefore strengthen the pooled necessary test even when orientation and anchors vary. This still does not make the augmented test sufficient in general.

The geometric identity is elementary distance geometry. Related orthogonality of difference vectors across equal-distance bipartite classes is explicitly used in the proof of Lemma 11 of *Almost-Equidistant Sets*. We claim neither that identity nor its rank consequence as new. [Primary paper, section 3.1](https://link.springer.com/article/10.1007/s00373-020-02149-w).

## 3. A fully solved planar triangle with mixed boundaries

Work specifically in the plane. The known right triangle is

\[
v_0=(0,0),\quad v_1=(L,0),\quad v_2=(0,H),\qquad L,H>0.
\]

Allow translations and orthogonal Q, including reflections. There are two physical anchors in closed disks

\[
a_i\in\overline B(c_i,\delta_i),\qquad i=0,1.
\]

The five observations are

\[
\boxed{
\|X_0-a_0\|=\|X_0-a_1\|
=\|X_1-a_0\|=\|X_1-a_1\|=r>0,\qquad
\|X_2-a_0\|\le r.
}
\]

Thus three nonreference ratios are exactly one and a fourth has interval [0,1]. No reading from X_2 to a_1 is required. No upper reference-range cap or prohibition on coincident actual anchors is assumed.

Write D_0=||c_1-c_0|| and e=delta_0+delta_1.

**Theorem 2 — complete classification.**

| Condition | Feasible configurations |
|---|---|
| D_0<=e | Unbounded translations |
| D_0>e and D_0+e>=H | Nonempty and bounded |
| D_0>e and D_0+e<H | Empty |

In either disjoint-disk case every feasible translation satisfies

\[
\boxed{\left\|X_0-\frac{c_0+c_1}{2}\right\|
\le\frac{\delta_0+\delta_1+L}{2}.}
\]

For any distinct actual anchor pair, the result gives the entire finite pose set.
Let

\[
d=a_1-a_0,\quad D=\|d\|>0,\quad \widehat d=d/D,\quad
m=(a_0+a_1)/2,
\]

and let J be a quarter turn. Such a pair admits a pose exactly when D>=H, in which case the two possibilities are

\[
\boxed{
X_0=m\pm\frac L2J\widehat d,\quad
X_1=m\mp\frac L2J\widehat d,\quad
X_2=X_0-H\widehat d,\qquad
r^2=\frac{D^2+L^2}{4}.
}
\]

If a chirality is fixed and only proper rotations are allowed, one of these two reflected poses remains. The existence and escape classification is unchanged.

**Proof for distinct anchors.** Let E=X_1-X_0, with ||E||=L. The four-link identity gives E perpendicular to d. Subtracting the two anchor ranges from X_0 gives (X_0-m) dot d=0. Subtracting the ranges of the two vertices to either anchor gives

\[
\left(\frac{X_0+X_1}{2}-a_i\right)\cdot E=0.
\]

Therefore the vector between the body-edge midpoint and m is perpendicular to both E and d. In the plane these nonzero perpendicular vectors span the whole space; the midpoint vector is zero. This proves the two endpoint positions and the formula for r.

The vector X_2-X_0 is perpendicular to E and has length H, so it equals either H d_hat or -H d_hat. Its squared-range difference from the reference is respectively

\[
H^2+HD\quad\hbox{or}\quad H^2-HD.
\]

Only the negative branch can satisfy the upper reading, and it does so exactly when D>=H. This proves the complete distinct-anchor parameterization.

If the disks are disjoint, all actual anchors are distinct. Their midpoint differs from the nominal midpoint by at most e/2, giving the position bound. The greatest attainable anchor separation is D_0+e, attained by moving the two anchors directly away from each other. Thus there exists a valid pair with D>=H exactly when D_0+e>=H. This proves both disjoint-disk cases, including equality.

**Proof for intersecting disks.** Choose a common point a and set a_0=a_1=a. With Q=I, for every Y>=H/2 define

\[
X_0=a-(L/2,Y),\quad
X_1=X_0+(L,0),\quad X_2=X_0+(0,H).
\]

All four equal ranges have r^2=L^2/4+Y^2>0, while

\[
\|X_2-a\|^2-r^2=H^2-2HY\le0.
\]

These are physical configurations with arbitrarily distant translations. Two closed planar disks intersect exactly when D_0<=e, including tangency. This completes the proof.

The overlap condition is a condition on the uncertainty model. A justified physical requirement that the two anchors maintain a positive separation would remove the coincident-anchor construction and keep this family bounded, even if the uncertainty disks overlap.

### Exact recovery error for the physical reference range

This family also gives a sharp scalar recovery formula. In the nonempty disjoint-disk regime set

\[
D_-=\max(H,D_0-e),\qquad D_+=D_0+e.
\]

The complete attainable reference-range interval is

\[
\boxed{r\in[r_-,r_+]
=\left[\tfrac12\sqrt{L^2+D_-^2},\
\tfrac12\sqrt{L^2+D_+^2}\right].}
\]

The distance between points of the two disks attains every value from D_0-e to D_0+e. Intersecting with D>=H and applying the increasing distinct-branch formula proves the claim, including endpoint attainment. Equivalently, continuity on the connected product of disks gives the whole interval between its distance extrema.

Under absolute error, the optimal scalar estimate and its unavoidable worst-case error are therefore

\[
\boxed{
\widehat r=\frac{\sqrt{L^2+D_-^2}+\sqrt{L^2+D_+^2}}4,\qquad
E_r=\frac{\sqrt{L^2+D_+^2}-\sqrt{L^2+D_-^2}}4.
}
\]

Every estimator must cover the two feasible endpoint values; the midpoint attains the resulting half-width. This is an exact recovery formula for r under these observations and priors, not a bound for every possible target.

When the disks intersect, the complete interval instead is

\[
\boxed{r\in[\tfrac12\sqrt{L^2+H^2},\infty).}
\]

For a coincident pair, body coordinates of the common anchor satisfy b_x=L/2 and b_y>=H/2, so this interval is attained exactly. Distinct pairs already obey the same lower bound. Thus no finite absolute-error guarantee for r exists in the overlap regime. An empty feasible set signifies inconsistent assumptions or observations and has no recovery estimate in this formulation.

## 4. Nonempty bounded false escape, and a discontinuous threshold

Take

\[
c_0=(-1,0),\quad c_1=(1,0),\quad L=H=1,\quad
\delta_0=\delta_1=\delta.
\]

At delta=0 the complete feasible set consists of the two reflected poses

\[
X_0=(0,\pm1/2),\quad X_1=(0,\mp1/2),\quad
X_2=(-1,\pm1/2),\qquad r^2=5/4.
\]

The earlier pooled first-order condition nevertheless accepts

\[
u=(0,-1),\quad Q=I,\quad z_0=z_1=u\cdot a_i=0.
\]

All four equality coefficients f are zero; the third upper-reading coefficient is -1. This is a false escape prediction for a nonempty bounded problem. The missing cycle condition would require (1,0) dot (2,0)=0 and rejects that limiting orientation.

Theorem 2 gives the exact uncertainty transition:

\[
\boxed{
0\le\delta<1:\ \|X_0\|\le\delta+\tfrac12<\tfrac32;
\qquad
\delta\ge1:\ \hbox{unbounded translations}.
}
\]

There is no compulsory growth to infinity as delta approaches one from below. A new unbounded branch becomes available at the exact touching value because the actual anchors can coincide. This example separates critical-level feasibility from a leading directional projection test.

For this symmetric example the sharp reference-range error below contact is

\[
E_r(\delta)=\frac{
\sqrt{1+(2+2\delta)^2}
-\sqrt{1+\max(1,2-2\delta)^2}}4,\qquad 0\le\delta<1.
\]

It starts at zero and tends to (sqrt(17)-sqrt(2))/4, a finite value, as delta approaches one from below. At delta=1 it becomes infinite. Known triangle side lengths remain exact throughout; recoverability is specific to the requested target and loss.

### Sensitivity to replacing exact equalities by lossy ratios

The exact equalities are substantive information. In this same nominal example, replace the three nonreference equality intervals by [1-epsilon,1+epsilon], with 0<epsilon<1, and keep the third upper interval [0,1]. Even with exact anchors, Q=I and

\[
X_0=(0,-T),\quad X_1=(1,-T),\quad X_2=(0,1-T)
\]

give

\[
r^2=T^2+1,\quad D_{01}^2=r^2,\quad
D_{10}^2=T^2+4,\quad D_{11}^2=T^2,\quad
D_{20}^2=r^2+1-2T.
\]

The complete set of feasible parameters on this ray is T>=T_epsilon, where

\[
T_\varepsilon=
\max\left\{\frac12,\
\sqrt{\max\left(0,\frac3{2\varepsilon+\varepsilon^2}-1\right)},\
\sqrt{\max\left(0,\frac1{2\varepsilon-\varepsilon^2}-1\right)}
\right\}.
\]

These conditions follow directly by squaring the two nontrivial interval comparisons and the third upper comparison. Thus every positive ratio tolerance already admits escape in this example, and T_epsilon is asymptotic to sqrt(3/(2 epsilon)) as epsilon tends to zero.

Accordingly, the finite error formula above applies to anchor uncertainty with the stated exact ratio equalities. It is not an error guarantee for freely widened ratio readings. This calculation identifies a concrete next task: combine ratio tolerance, a finite reference cap, and the shared-anchor cycle constraints to obtain a useful finite recovery certificate.

## 5. Why the planar hypothesis matters

In three dimensions retain L=H=1, fixed anchors (-1,0,0),(1,0,0), and take

\[
X_0=(0,-1/2,T),\quad X_1=(0,1/2,T),\quad
X_2=(-1,-1/2,T).
\]

These form the same rigid right triangle. The four equality readings have
r^2=5/4+T^2, and the upper reading has squared range 1/4+T^2.
Every T is feasible despite distinct exact anchors.

The translation can occupy the extra direction perpendicular to both the body edge and anchor separation. The planar midpoint argument therefore cannot be asserted in higher dimensions.

## 6. General finite-distance feasibility can retain all coupling

For arbitrary observed intervals and any fixed finite body, introduce body-coordinate variables

\[
y=Q^Tt,\qquad b_i=Q^T(a_i-t).
\]

Then t=Qy, a_i=Q(y+b_i), and the exact constraints become

\[
Q^TQ=I,\quad
\|y+b_i-Q^Tc_i\|^2\le\delta_i^2,\quad
\|b_0\|^2>0,
\]
\[
\boxed{
\alpha_{ki}^2\|b_0\|^2
\le\|v_k-b_i\|^2
\le\beta_{ki}^2\|b_0\|^2.
}
\]

Every listed constraint is quadratic in the displayed variables, with fixed centers and body vertices. One b_i is used for all links to the same physical anchor. Reconstruction by t=Qy and a_i=Q(y+b_i) proves sufficiency; the coordinate change proves necessity. Squaring is equivalent because bounds and ranges are nonnegative.

In the plane use

\[
Q=\begin{pmatrix}c&-\sigma s\\s&\sigma c\end{pmatrix},
\quad c^2+s^2=1,\quad \sigma\in\{-1,1\}.
\]

With m anchors, each chirality branch has 2m+4 real variables: two for orientation, two for y, and two per shared anchor. A physical reference bracket [a,b], a>0, adds the quadratic constraints a^2<=||b_0||^2<=b^2.

This is an exact nonconvex quadratic feasibility formulation, not a claim of an efficient global solver or a general closed-form escape criterion. It supplies a concrete finite-distance object for subsequent elimination or certified subdivision. Quadratic distance realizability and interval-distance formulations are established parts of distance geometry. [Liberti, Lavor, Maculan and Mucherino, *Euclidean Distance Geometry and Applications*, sections 1–3](https://www.math.ucdavis.edu/~saito/data/distmat/liberti-etal_euclidean-dist-geom.pdf).

## 7. Verification and limits

The companion program work/boundary_audit/verify_mixed_boundary.py verifies the general four-link and fixed-ray polynomial identities with SymPy, compares every sign case on a finite coefficient grid with exact symbolic solution sets, and checks rational witnesses against the original physical observations, all three rigid side constraints, and the actual anchor disks.

It covers distinct anchors, coincident anchors at disk tangency, all three classification regimes, the pooled false positive, and the three-dimensional counterexample. Deliberately corrupted witnesses are rejected. Counts and reproducible witnesses are recorded in mixed_boundary_certificate.json.

The proofs establish the general statements within their hypotheses. Finite checks audit their implementations. The full variable-pose mixed-boundary problem for arbitrary observation graphs remains open in this record; Theorems 1 and 2 do not claim to close it.
