# Independent review of the mixed-boundary triangle theorem

Date: 2026-09-06. Reviewed: `outputs/MIXED_BOUNDARY_TRIANGLE_THEOREM.md`, checkpoint GCS-FINITE-BOUNDARY-013, including the exact range-recovery and equality-tolerance additions. This is a bounded mathematical proof review. No earlier files or certificates were edited or rerun.

**The fixed-realization ray test, complete planar classification, exact reference-range intervals and minimax errors, and body-coordinate quadratic formulation are valid under their stated assumptions. The three-dimensional and pooled-test counterexamples are valid. The only requested correction was to include eventual positivity of the reference range in the constructive ray cutoff.**

## 1. Fixed orientation, anchors and ray offset

With all these variables fixed, subtracting the two squared norms cancels the quadratic translation term and gives exactly `2 tau f+g`. At an active lower bound, an affine polynomial is eventually nonnegative precisely when its slope is positive, or the slope is zero and the constant is nonnegative. The upper-bound version reverses signs. Exact equality over an eventual interval forces both coefficients to vanish. Thus the lexicographic table includes every boundary case, including a constant gap equal to zero.

Inactive lower bounds have leading squared-gap coefficient `1-alpha^2>0`, and inactive upper bounds have coefficient `beta^2-1>0`; both eventually hold. This argument assumes nonnegative ordinary ratio bounds and a finite set of observations. Reference positivity holds eventually because `r=||p00+tau u||>=tau-||p00||`.

The proposed positive-quadratic cutoff is sound: `A tau^2+B tau+C` is bounded below by `A tau^2-|B|tau-|C|`, whose positive root is the displayed expression. When using maxima of such cutoffs constructively, also require **tau>||p00||**. Polynomial sign conditions alone can permit an isolated zero-reference point when all active gaps vanish identically. The main author accepted this correction. It does not change the eventual-ray theorem.

The scope qualification is essential: this characterizes one fixed orientation/anchor/offset realization, not all possible configuration sequences with changing orientations and anchors.

## 2. The complete planar classification

For distinct anchors put `d=a1-a0`, `D=||d||>0`, `m=(a0+a1)/2` and `E=X1-X0`, `||E||=L`. The four common-range equalities force

\[
E\cdot d=0,\qquad (X0-m)\cdot d=0,
\qquad ((X0+X1)/2-m)\cdot E=0.
\]

The body midpoint minus m is also perpendicular to d. In the plane the nonzero perpendicular pair E,d spans the ambient space, so this midpoint equals m. It follows that

\[
X0=m\pm(L/2)J\widehat d,\quad
X1=m\mp(L/2)J\widehat d,\quad
r^2=(L^2+D^2)/4.
\]

The second body edge is either `H d_hat` or `-H d_hat`. Its squared-range gap to anchor zero is respectively `H^2+HD` or `H^2-HD`. Since H,D are positive, only the negative branch works, and it works exactly when **D>=H**. Therefore the source's two-pose formula is complete, not just a construction. Fixing chirality selects one of the two poses without changing existence.

For disjoint disks, every actual anchor pair is distinct and `D` varies through `[D0-e,D0+e]`, where `D0=||c1-c0||`, `e=delta0+delta1`. Consequently the set is nonempty precisely when `D0+e>=H`; otherwise it is empty. The body midpoint argument and the triangle inequality give the stated global translation bound `(e+L)/2` about the nominal anchor midpoint. This bound does not deteriorate as the actual anchors approach each other while remaining distinct.

For intersecting **closed** disks, coincidence `a0=a1=a` is an allowed physical configuration, including at tangency `D0=e`. The construction

\[
X0=a-(L/2,Y),\quad X1=X0+(L,0),\quad X2=X0+(0,H),\quad Y\ge H/2
\]

satisfies all four equalities with positive common range, and its last squared gap is `H^2-2HY<=0`. Thus it yields arbitrary translations at every overlap level, including first contact. The inclusive escape threshold is correct. Requiring the actual anchors to remain distinct removes this construction; every remaining feasible pose obeys the uniform bounded midpoint formula.

These statements use independent uncertainty disks. Additional constraints linking actual anchor positions can change the attainable separation interval or forbid coincidence.

## 3. Sharp recovery of the physical reference range

In the nonempty disjoint regime, the allowed separation interval is exactly

\[
D\in[D_-,D_+],\qquad D_-=\max(H,D0-e),\quad D_+=D0+e.
\]

Distance is a continuous function on the connected product of the two disks, and the nearest/farthest collinear anchor choices attain its two extrema. Every intermediate separation is therefore attainable. The complete pose parameterization realizes every allowed D, and `r=(1/2)sqrt(L^2+D^2)` is increasing. This proves the complete closed r interval and both endpoint attainments.

The interval midpoint minimizes worst-case absolute error; the two endpoint configurations prove the matching lower bound. The stated estimate and error each have the correct factor of one quarter after substituting the endpoint formulas.

For coincident anchors, the common anchor's body coordinates obey `b_x=L/2` from the first two equalities, and `b_y>=H/2` from the upper third reading. Consequently `r^2=L^2/4+b_y^2`. Every value at least `(1/2)sqrt(L^2+H^2)` is attainable with a common anchor in the disk intersection. Distinct-anchor poses already have at least that range because D>=H. Hence the claimed half-infinite interval is exact for the entire intersecting-disk model, not merely a subset construction.

In the symmetric example, the finite one-sided limit `(sqrt(17)-sqrt(2))/4` as delta approaches one from below and the infinite error at contact follow directly. This is a discontinuous loss of recovery caused by admitting coincident anchors. It is not a contradiction with the bounded finite branch just before contact.

## 4. Counterexamples and tolerance sensitivity

At exact anchors `(±1,0)` with `L=H=1`, the two stated reflected physical triangles satisfy all five observations. The pooled first-order candidate `u=(0,-1), Q=I` has zero equality coefficients and negative upper coefficient, yet violates the exact cycle orthogonality. Thus the counterexample has a nonempty bounded feasible set; it does not rely on an inconsistent model.

The three-dimensional example is valid: each of the four common squared ranges is `5/4+T^2`, while the third upper reading is `1/4+T^2`. The extra translation direction is perpendicular to both the body edge and anchor separation. The planar theorem cannot extend to arbitrary dimension with the same disk-intersection criterion.

For the added equality-tolerance ray `X0=(0,-T), X1=(1,-T), X2=(0,1-T)`, direct squared ranges are

\[
r^2=T^2+1,\quad D01^2=r^2,\quad D10^2=r^2+3,
\quad D11^2=r^2-1,\quad D20^2=r^2+1-2T.
\]

With each former nonreference equality widened to `[1-epsilon,1+epsilon]`, `0<epsilon<1`, the only nonautomatic conditions are

\[
T\ge1/2,\quad
(2\epsilon+\epsilon^2)(T^2+1)\ge3,\quad
(2\epsilon-\epsilon^2)(T^2+1)\ge1.
\]

These are exactly the source's threshold formula. The first quadratic bound dominates the second throughout `0<epsilon<1`, since `3(2-epsilon)>=2+epsilon`. Therefore its small-epsilon leading threshold is `sqrt(3/(2 epsilon))`, and every positive epsilon admits eventual escape. This is a formula for the onset of feasibility on the specified ray, not necessarily the nearest feasible point or earliest escape threshold over every pose. It correctly shows that the exact-equality boundedness result is not robust to arbitrary positive ratio widths in this example.

## 5. Exact quadratic body-coordinate formulation

For square orthogonal Q, let `y=Q^T t` and `b_i=Q^T(a_i-t)`. Then `Q^T a_i=y+b_i`, and orthogonal invariance gives the original anchor constraint as

\[
\|y+b_i-Q^Tc_i\|^2\le\delta_i^2.
\]

The physical ranges become `||v_k-b_i||`, with reference `||b0||>0`. Both necessity and reconstruction by `t=Qy`, `a_i=Q(y+b_i)` hold exactly. A single b_i per anchor retains every shared-anchor correlation present in the model.

Each constraint is quadratic in the displayed unknowns: `Q^Tc_i` is linear because c_i is fixed. The reconstruction is bilinear, but it is a map back to physical variables, not an extra higher-degree feasibility constraint. In the planar parameterization, sigma must be fixed separately on each chirality branch; the source does that. Treating sigma as another variable inside products would require revisiting the degree claim. The count of `2m+4` real variables per branch is correct, and positive physical reference caps add the stated quadratic inequalities.

The formulation remains nonconvex and includes a strict positive-reference condition unless a positive lower reference cap is imposed. It is an exact finite-distance model, with no general efficiency or complete escape characterization implied.
