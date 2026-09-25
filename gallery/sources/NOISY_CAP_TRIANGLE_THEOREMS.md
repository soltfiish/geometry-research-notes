# Noisy shared-anchor triangles with finite range knowledge

**GCS-NOISY-CAP-014 · 6 September 2026**

This checkpoint supplies an exact reduction, a quantitative stability bound, certified examples with separated distance families, and a target-specific rule for evaluating a future measurement. These are additions to this research record, not established priority claims. The numerical model is planar and retains an exact rigid shape.

## 1. Physical model and target

The body vertices are v0=(0,0), v1=(L,0), v2=(0,H), with L,H>0. Its unknown pose is Xk=t+Qvk, with Q orthogonal. Two actual anchors ai belong to closed disks B(ci,delta_i). Each ai is one physical point shared by every observation incident to it.

Let r=|X0-a0|>0 be the physical reference range. The three other readings on the first two vertices obey ordinary, not squared, ratio intervals

\[
(1-\varepsilon)r\le |X_0-a_1|,\ |X_1-a_0|,\ |X_1-a_1|
\le(1+\varepsilon)r,\qquad 0\le\varepsilon<1.
\]

The fifth observation remains |X2-a0|<=r. Reference knowledge is a<=r<=B, with 0<=a<=B<infinity. A finite B must be supplied by justified physical knowledge or a measurement. It is not a computational cutoff that can be substituted for an unbounded model.

The scalar target is r, with absolute estimation loss. Since H=|X2-X0|<=2r, every feasible reference satisfies r>=H/2>0, even when a=0.

## 2. Exact elimination of the two uncertainty disks

Put D0=|c1-c0|, e=delta0+delta1, and

\[
d_- = \max(0,D_0-e),\qquad d_+=D_0+e.
\]

**Separation reduction.** In this model, which contains no absolute pose restrictions or additional anchors, the two disks can be replaced exactly by

\[
d_-\le |b_1-b_0|\le d_+,
\qquad b_i=Q^T(a_i-t).
\]

Necessity is the triangle inequality. For sufficiency, every D in [d_-,d_+] is an attainable actual separation. If D0>0 and e>0, let n=(c1-c0)/D0 and choose

\[
a_0=c_0-\frac{\delta_0}{e}(D-D_0)n,
\qquad a_1=c_1+\frac{\delta_1}{e}(D-D_0)n.
\]

The displacements are within their disks and a1-a0=Dn. For D0=0 choose any unit n; for e=0 the only possible D is D0. An orthogonal map aligns b1-b0 with a1-a0, and t=a0-Qb0 reconstructs the body. If D=0, both differences vanish and any Q works. All incident observations use these same reconstructed anchors.

This is an exact reduction for the requested target and existence problem. It does not preserve absolute pose information. It fails as a sufficient reduction if one adds absolute orientation/position restrictions, correlated anchor errors, or a third anchor without retaining their extra constraints.

## 3. Three coordinates suffice for a complete range certificate

Write b0=(x,y), b1=(z,w), q=r^2, alpha=1-epsilon, beta=1+epsilon, and

\[
p=\beta^2-1=2\varepsilon+\varepsilon^2,
\qquad m=1-\alpha^2=2\varepsilon-\varepsilon^2.
\]

The exact reference and the fifth reading give

\[
y=\sqrt{q-x^2}\ge H/2.
\]

Subtracting the first anchor's two squared readings gives

\[
\frac{L^2-pq}{2L}\le x\le\frac{L^2+mq}{2L}.
\]

Subtracting the second anchor's two squared readings gives

\[
\frac L2-\frac{2\varepsilon q}{L}\le z\le
\frac L2+\frac{2\varepsilon q}{L}.
\]

For fixed q,z the remaining squared height lies exactly in

\[
A(q,z)=\max\{0,\alpha^2q-\min(z^2,(z-L)^2)\},
\]
\[
C(q,z)=\beta^2q-\max(z^2,(z-L)^2),\qquad A\le w^2\le C.
\]

Discard the candidate if A>C. Otherwise let W=[sqrt(A),sqrt(C)] and retain both signs w in W and w in -W. For each sign, the continuous map

\[
\omega\longmapsto (x-z)^2+(y\mp\omega)^2,\qquad\omega\in W,
\]

has an interval as its image. Feasibility at q,x,z is equivalent to at least one of these squared-separation intervals intersecting [d_-^2,d_+^2]. This tests all heights without assigning different realizations to the same anchor.

For epsilon>0, parameterize the entire x,z domain by u in [0,1], v in [-1,1]:

\[
x=\frac L2+\frac{q}{2L}(-p+4\varepsilon u),
\qquad z=\frac L2+\frac{2\varepsilon q}{L}v.
\]

Thus the finite search has just three coordinates (q,u,v), with max(a^2,H^2/4)<=q<=B^2. The same formulas collapse at epsilon=0; the earlier exact-equality theorem handles that case directly.

The implementation sets L=H=1, D0=2, delta0=delta1=delta, and a=0. It uses exact integer outward interval operations at scale 2^40. A binary partition tree covers the whole initial box. Every leaf either has an exact constraint exclusion or lies wholly inside a declared outer target window. Accepted windows do not assert that all their values are feasible.

The separate checker recomputes exclusions with rational arithmetic, rounding square roots outward at scale 2^64. It checks the full partition tree and physical witnesses in the original coordinates; it does not import the producer or trust the optimizer's residuals.

## 4. A quantitative stability theorem

This bound holds for all L,H>0 and all disk pairs in the model, subject to the explicit condition below. It is an outer bound, not an asserted sharp formula at positive noise.

Assume d_->0 and define

\[
\tau=\frac{(2p+m)B^2}{2L}
=\frac{(6\varepsilon+\varepsilon^2)B^2}{2L}.
\]

When tau<d_-, put

\[
R_M^2=\frac{\tau^2}{4}
+\frac{\tau^2(L+\tau)^2}{4(d_-^2-\tau^2)},
\]
\[
\ell=\max\left\{a^2,
\frac{L^2+d_-^2}{4+3p},
\frac{H^2}{4}+\left[\max\left(0,\frac L2-\frac{pB^2}{2L}\right)\right]^2\right\},
\]
\[
U=\min\left\{B^2,
\frac{L^2+d_+^2+4R_M^2}{4-3m}\right\}.
\]

**Theorem.** Every feasible configuration satisfies ell<=r^2<=U. If ell>U the model is empty. If it is nonempty, its optimal worst-case scalar error obeys

\[
E_r\le\frac{\sqrt U-\sqrt\ell}{2}.
\]

**Proof.** In body coordinates write d=b1-b0=(dx,dy), D=|d|, and let M=(b0+b1)/2-(L/2,0) be the displacement between the anchor midpoint and the first body-edge midpoint. Denote the three nonreference squared-reading deviations by t10,t01,t11 in [-m,p], so each corresponding squared distance is (1+tki)q. Direct expansion yields

\[
2L d_x=(t_{10}+t_{01}-t_{11})q,
\]
\[
4L M_x=(t_{01}-t_{11}-t_{10})q,
\]
\[
4M\cdot d=(t_{01}+t_{11}-t_{10})q,
\]
\[
(4+t_{10}+t_{01}+t_{11})q=L^2+D^2+4|M|^2.
\]

Each signed three-term combination in the first three lines has absolute value at most 2p+m. Therefore |dx|<=tau, |Mx|<=tau/2, and |M dot d|<=L tau/2. Since |dy|>=sqrt(d_-^2-tau^2)>0,

\[
|M_y|\le\frac{|M\cdot d|+|M_xd_x|}{|d_y|}
\le\frac{\tau(L+\tau)}{2\sqrt{d_-^2-\tau^2}},
\]

giving |M|^2<=R_M^2. Bound the sum of deviations between -3m and 3p in the fourth identity. Its denominator is positive because 0<=m<1. This gives the first nontrivial lower bound and U. Finally x>=L/2-pB^2/(2L), y>=H/2 gives the other lower bound; intersect with the physical range bracket. The scalar half-width gives the stated error bound.

At epsilon=0, tau=0 and these endpoints reduce exactly to

\[
\left[\max\{a^2,(L^2+\max(d_-^2,H^2))/4\},
\min\{B^2,(L^2+d_+^2)/4\}\right],
\]

the exact nonoverlapping-anchor result, clipped to the reference bracket. At fixed B and positive d_-, the positive-noise endpoints converge to it, with O(epsilon) endpoint corrections for fixed model constants.

In particular, if the exact-data model is nonempty, its optimal error E0 and the noisy optimal error E_epsilon satisfy 0<=E_epsilon-E0=O(epsilon) as epsilon decreases to zero with B fixed. The lower inequality is nesting of feasible sets; the upper rate follows from the displayed endpoints. This is a scalar range-recovery statement, not a pose-error rate.

The parameter tau/d_- explains the conditioning: the cycle constraint loses control as noise times allowed squared range becomes comparable to L d_-. The condition tau<d_- is sufficient for this particular bound, **not** an exact onset threshold for the distant family. The bound can be conservative or uninformative before that condition fails.

For L=H=1, D0=2, delta=0.05, epsilon=0.01, B=2, the analytic enclosure is approximately [1.065544,1.173857], rounded outward here. The certified numerical extrema below sharpen it to about 1.065563 and 1.171772.

## 5. Compactness gives a separate qualitative guarantee

For fixed finite B, fixed disks and exact shape, the physical feasible sets F_epsilon are compact and nested as epsilon decreases. The anchor variables and Q range over compact sets; |t-c0|<=B+delta0; and r>=H/2 removes the undefined-zero-reference boundary. All remaining constraints are closed. Moreover intersection over epsilon>0 of F_epsilon is F_0.

If F_0 is nonempty, F_epsilon converges to F_0 in Hausdorff distance as epsilon decreases to zero, and the extrema of every continuous scalar target converge to their exact-data counterparts. Otherwise there would be an epsilon sequence decreasing to zero and feasible states a positive distance from F_0; a convergent subsequence in the common compact set would have a limit in F_0, a contradiction. The same subsequence argument proves convergence of target extrema. If F_0 is empty, F_epsilon is empty for all sufficiently small epsilon by the finite-intersection property.

This is an elementary compactness consequence. It has no cap-independent rate. It does not prevent a new separated family from appearing at a positive noise level or range cap. The uncapped counterexample in checkpoint 013 shows why taking B to infinity is materially different.

## 6. Certified unit-triangle experiments

Six base cases use epsilon in {0.005,0.01,0.02}, delta in {0,0.05}, and B=12. All feasible r^2 are covered by two disjoint outer windows. Exact physical witnesses occur in both windows. Consequently the attainable range set is disconnected; we do not assert that it has exactly two components or that each outer window is entirely attainable.

Each certificate also applies to the clipped models B=2 and B=10. Their extrema are certified using feasible endpoint witnesses or exact witnesses at the cap. The 18 minimax-error brackets have width below 1.1e-7. Distance to the first feasible value above the gap is bracketed to within 1.3e-6. These tolerances describe the precision with which the limits are known, not the reconstruction error itself.

Selected values, rounded for reading:

| Ratio tolerance | Each anchor radius | Cap | Smallest feasible r | Largest feasible r | Optimal worst-case error |
|---|---:|---:|---:|---:|---:|
| 1% | 0.05 | 2 | 1.065563 | 1.171772 | 0.053104 |
| 1% | 0.05 | 10 | 1.065563 | 10 exactly | 4.467218 |
| 0.5% | 0.05 | 10 | 1.069537 | 1.167351 | 0.048907 |
| 0.5% | 0.05 | 12 | 1.069537 | 12 exactly | 5.465231 |
| 1% | 0 | 10 | 1.109722 | 10 exactly | 4.445139 |

At epsilon=1%, delta=0.05, the first feasible r above the large gap lies in

\[
[7.944265906832585,\ 7.944266405760153]
\]

(decimal endpoints rounded outward). At epsilon=0.5% it lies in

\[
[11.244754335640249,\ 11.244755562408190].
\]

The exact rational enclosures in noisy_triangle_results.json are authoritative. The existence of a nonempty gap and feasible states on both sides also proves that the optimal error as a function of B has an upward jump when B first includes the distant set: the prior near-family maximum is strictly smaller than the new admitted range. This does not conflict with monotonicity under larger caps.

These comparisons keep all reported central ratios equal to one and nominal anchor centers fixed. They compare specified information sets. They do not forecast that a more precise future instrument or new anchor survey will return those same central readings.

## 7. Outcome-aware value of one additional measurement

Here is a general target-specific rule, not restricted to triangle geometry. Let F be a nonempty compact feasible state set, g:F->R a continuous scalar target, and h:F->Y a continuous proposed measurement into a normed vector space. Suppose the new observation is y=h(z)+e with |e|<=eta. The estimator may use y and the prior set F.

**Pair characterization.** The optimal error, evaluated over every allowed future observation and noise realization, is

\[
\boxed{E_{\rm after}(h,\eta;F)
=\frac12\max_{z,z'\in F:\ \|h(z)-h(z')\|\le2\eta}
|g(z)-g(z')|.}
\]

For a fixed observation y, the optimal scalar error is half the target diameter of F_y={z in F:|h(z)-y|<=eta}. Two states share a possible observation exactly when the two measurement balls intersect, equivalently |h(z)-h(z')|<=2eta. Necessity is the triangle inequality; sufficiency uses their midpoint observation. Maximizing the conditional target diameter proves the formula, and choosing the midpoint of each conditional target interval attains it. Compactness gives attainment of the displayed maximum.

Thus an extra measurement helps by separating previously confusable state pairs whose target values differ substantially. It need not resolve all pose symmetries. For vector targets or a different loss, the scalar half-diameter rule requires replacement.

If h=g=r and the added absolute range has error at most eta, the new worst-case error is at most min(E_before,eta). Equality with eta holds whenever F contains two target values separated by exactly 2eta. Disconnected target sets can give strictly better performance; the upper bound is not an unconditional equality.

**Exact worked result for this study.** With delta=0.05 and any of the tested noise levels and caps, an added absolute reference-range measurement accurate to +/-0.01 has optimal future worst-case error exactly 0.01. For the lower bound, the existing exact-ratio submodel already contains r=1.10 and r=1.12: choose anchor separation D=sqrt(4r^2-1), which is between 1.9 and 2.1 and exceeds H=1, and use the exact poses of checkpoint 013. Both can produce y=1.11. The upper bound follows from the measurement interval. This is a guarantee over all possible future readings, not a calculation assuming a favorable value.

The rule gives an objective for comparing other observations. It does not rank an off-axis anchor or an instrument until its h, precision, nuisance variables and cost constraints are specified. No such ranking is claimed here.

## 8. Evidence, reproduction and limits

Run `python work/noisy_triangle/verify_certificate.py` for the six cover trees, 28 physical witnesses and 22 deliberate corruptions. This checker needs only the Python standard library. Run `python work/noisy_triangle/verify_theory.py` for seven symbolic identities, 48 coefficient endpoint checks, the analytic bounds on 12 applicable witnesses, and 1,020 exact finite audits of the information rule. The proofs above establish the general statements; these finite checks audit their implementation. The checker was implemented separately within the same research task, not by an external reviewer or a proof assistant.

Reproduction of all numerical certificates is provided by `work/noisy_triangle/run_study.py`. Floating proposals select candidate windows and interior witnesses; exact checks alone justify exclusions and acceptance of witnesses. The generator's first unscaled bisection attempt exhausted its five-million-node budget. The final sensitivity-based bisection produced complete certificates; this is an implementation observation, not a benchmark against other methods.

The exact disk reduction, positive-noise certificates and stability bound concern a two-anchor planar rigid-triangle observation graph. A third anchor, uncertain shape, arbitrary measurement graphs, three-dimensional pose recovery, and algorithmic superiority remain unproved by this checkpoint.

The broader framing has established antecedents. Milanese and Vicino's 1991 abstract explicitly describes estimating a target function from nonlinear bounded-error measurements using minimal enclosing boxes ([publisher record](https://www.sciencedirect.com/science/article/pii/000510989190090O)). The 2011 paper *Design of Experiments for Guaranteed Parameter Estimation in Membership Setting* describes a min-max approach to future experiments ([IEEE record](https://ieeexplore.ieee.org/document/6161062/)). These records support positioning only; full-text retrieval was unavailable in this check. No claim of novelty is made for bounded-error recovery, interval subdivision, scalar midpoint estimation, compactness stability, or the general idea of worst-case measurement design. A theorem-level literature comparison of the specialized reduction and bounds remains open.
