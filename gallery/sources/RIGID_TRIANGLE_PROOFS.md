# Rigid-triangle recovery: model, proofs, and certificate specification

Checkpoint **GCS-RIGID-TRIANGLE-007**, 2026-09-05. This is a controlled extension from a point to a known planar shape. The elementary results and exact computational certificates below are not claims of mathematical originality.

## 1. What is being recovered

The calibrated anchors are `A0=(0,0), A1=(4,0), A2=(0,4)`. The three labeled unknown vertices have nine squared-range observations, with centers

| Vertex | To A0 | To A1 | To A2 | Error bound |
|---|---:|---:|---:|---:|
| X0 | 8 | 8 | 8 | 1/100 |
| X1 | 13 | 5 | 13 | 1/100 |
| X2 | 13 | 13 | 5 | e |

Each squared range must lie in its center plus or minus the listed error. We compare `e=1/100` and `e=1/10`. These errors have **squared-coordinate units**. The model does not assume Gaussian noise, unknown range scale, or uncertain anchor positions.

The target is the unmeasured external distance `g=||X2-(1,1)||`. It is not an internal triangle side supplied by the shape prior.

In the independent model the three vertices can move separately. In the rigid model their squared side lengths are exactly `1,1,2`, with the two unit sides incident to X0. Labels are known. All congruent placements, including reflections, are initially allowed.

Both feasible sets are nonempty: the nominal vertices `(2,2),(3,2),(2,3)` obey every observation and the rigid shape. Both are compact: the first anchor's upper range bounds give bounded positions and all constraints are closed. Let `L=min g`, `U=max g`. For any unrestricted real-valued estimate under worst-case absolute error,

\[
\widehat g=(L+U)/2,\qquad E^*=(U-L)/2.
\]

Indeed any estimate has error at least `max(|estimate-L|,|estimate-U|)>=(U-L)/2`; the midpoint attains this bound. This statement concerns one scalar target, not the Euclidean position error of an entire triangle.

## 2. General consequence of a correct shape restriction

Let a nonempty compact measurement-feasible set be F and let S be a closed, correct shape restriction with `F intersect S` nonempty. For a continuous scalar target,

\[
L_F\le L_{F\cap S}\le U_{F\cap S}\le U_F,
\]

and

\[
E_F^*-E_{F\cap S}^*
=\tfrac12[(L_{F\cap S}-L_F)+(U_F-U_{F\cap S})]\ge0.
\]

There is **exactly zero improvement iff both original target extremes remain attainable under the shape restriction**. This follows since the two summands are nonnegative and the extrema are attained. A reduction in parameter count alone does not imply a strict improvement for a chosen target. If the shape assumption is wrong, the feasible set may exclude the truth and the guarantee no longer applies to it.

## 3. Exact independent-point endpoints

For `0<e<=1/10`, define

\[
Y_-=\sqrt{9-e},\quad Y_+=\sqrt{9+e},\qquad
G_\pm=\sqrt{1+(Y_\pm-1)^2}.
\]

Then the independent model has **exact target extrema** `L=G_-`, `U=G_+`.

Proof. Write `X2=(2+d,y)`. Subtraction of the first two squared ranges gives `|d|<=e/4<=1/40`. Subtraction of the first and third ranges gives `y>=3-e/4>1`. The first two anchor constraints imply

\[
9-e+4|d|-d^2\le y^2\le9+e-4|d|-d^2.
\]

The squared target `(1+d)^2+(y-1)^2` increases with positive y in this regime. Substituting the lower and upper square roots produces the lower and upper objective envelopes

\[
f_-(d)=11-e+4|d|+2d-2\sqrt{9-e+4|d|-d^2},
\]
\[
f_+(d)=11+e-4|d|+2d-2\sqrt{9+e-4|d|-d^2}.
\]

Throughout the coordinate interval both square roots exceed `5/2`, and `|4 +/- 2d|<=81/20`. For `d<0`, the derivative of the lower envelope is less than `-2+81/50=-19/50`, and the derivative of the upper envelope is greater than `6-81/50=219/50`. For `d>0`, the corresponding signs reverse: the lower increases and the upper decreases. Thus the lower envelope is minimized and the upper maximized at `d=0`.

The proposed endpoints `(2,Y_-)` and `(2,Y_+)` attain these bounds and satisfy the third anchor as well. Its squared-range residual from 5 is `(Y-3)(Y-5)`; the first two residuals from 13 are `(Y-3)(Y+3)=+/- e`. Since `Y>1`, `|Y-5|<Y+3`. The nominal first two vertices complete a feasible independent configuration. This proves the claim.

In particular,

\[
\boxed{E^*_{\rm independent}(e)=\frac{
\sqrt{11+e-2\sqrt{9+e}}-
\sqrt{11-e-2\sqrt{9-e}}}{2}.}
\]

The formula holds in the stated benchmark and error regime, not for arbitrary anchors or targets.

## 4. Equal precision gives exactly zero shape gain

Set `e=1/100`. For either `Y=Y_-` or `Y=Y_+`, take a rigid placement

\[
X_0=(2,Y-1),\quad X_1=(3,Y-1),\quad X_2=(2,Y).
\]

This is an exact vertical translation of the prescribed triangle. The first two vertices' squared-range residuals are either `(Y-3)(Y+1)` or `(Y-3)(Y-7)`. Their magnitudes are less than e because `Y>2`, `Y+1<Y+3`, and `|Y-7|<Y+3`. Section 3 checks all three readings for X2. Thus both independent target extrema remain attainable by a rigid triangle. Section 2 proves the exact equality

\[
\boxed{E^*_{\rm rigid}=E^*_{\rm independent}\quad\text{when all three errors are }1/100.}
\]

This is proved by endpoint attainment, rather than inferred from matching numerical fits. `triangle_equal_rigid_certificate.json` records the analytic expressions and rational outward evaluations.

## 5. Compact rigid-pose coordinates and the reflected alternative

For a vertex with squared ranges D0,D1,D2,

\[
x=(16+D_0-D_1)/8,\qquad y=(16+D_0-D_2)/8.
\]

These identities give exact enclosing coordinate intervals. The first two vertices each lie within `1/400` in each coordinate of their nominal positions. Any congruent triangle can be written

\[
X_0=(t_x,t_y),\quad X_1=X_0+(c,s),\quad
X_2=X_0+\sigma(-s,c),
\qquad c^2+s^2=1,\quad\sigma\in\{-1,1\}.
\]

The data imply `c>=199/200`, `|s|<=1/200`. Hence the positive-cosine orientation admits the global half-angle parameter

\[
q=s/(1+c),\quad |q|\le1/399,\qquad
c=(1-q^2)/(1+q^2),\quad s=2q/(1+q^2).
\]

If `sigma=-1`, then `X2_y<=801/400-199/200=403/400=1.0075`. Its observations instead require `X2_y>=3-e/4>=2.975`. This strictly excludes the reflected branch in both cases. The remaining three-dimensional root box encloses every feasible translation and orientation; no local-pose assumption is substituted for this argument.

The first two vertices alone would admit the nominal reflected triangle with X2=(2,1). Its target distance is 1, whereas the nominal positive triangle has target distance sqrt(5). Thus the third vertex's weak observations still convey globally useful information.

Within the positive branch the first two vertices imply `|X2_x-2|<=3/400` and `|X2_y-3|<=3/400`. For a nominal range vector v and coordinate displacement w with both coordinates bounded by r,

\[
\big|\|v+w\|^2-\|v\|^2\big|\le2r\|v\|_1+2r^2.
\]

At `r=3/400`, the three squared-range residual bounds for X2 are `6009/80000,6009/80000,3609/80000`, all below `1/10`. Its weak observations therefore **exclude the reflected branch but impose no further restriction on the positive branch**. They must not be described as globally redundant.

## 6. Exact finite-cover certification for the lossy rigid case

The certificate generator uses integer boxes on the fixed grid `G=2^40`. Rational bounds are rounded outward. For a q interval inside `[-1,1]`, cosine extrema follow from extrema of `|q|`, and sine is monotone. Translation plus these rotation bounds encloses each complete vertex coordinate box.

For each vertex box, the minimum and maximum squared distances to every exact anchor are calculated using exact integer arithmetic: per coordinate use the nearest and farthest distances from the interval to the anchor coordinate, then sum their squares. A box is rejected only if one measured interval is disjoint from the resulting squared-distance interval, or if a necessary coordinate interval is disjoint from its vertex box.

The target's distance interval is enclosed using integer square roots after intersecting its box with its necessary coordinate box. A terminal target box is accepted only if this entire enclosure lies between `u-eta_grid` and `v+eta_grid`. Here u is an outward upper target bound for a genuine minimum witness, and v an outward lower target bound for a genuine maximum witness. Witness coordinates and rotations are rational; every original squared range is checked exactly. The rigid parameterization enforces exact side lengths. Floating-point optimization proposes witnesses but makes no proof decisions.

Otherwise the longest parameter side is bisected, choosing the first dimension in a tie. Both children are retained, with an overlapping common boundary. The certificate records the full preorder tree, including each split and every exclusion or target decision. Updating witnesses can only decrease u and increase v; earlier accepted target leaves therefore remain valid for the final enclosing interval.

After a complete cover, the exact endpoint brackets are

\[
L\in[(u-\eta_g)/G,u/G],\qquad
U\in[v/G,(v+\eta_g)/G],
\]

and

\[
E^*\in[(v-u)/(2G),(v-u+2\eta_g)/(2G)].
\]

The requested tolerance is `1/10^7` and `eta_g=floor(G/10^7)`. This is numerical uncertainty about the recovery limit. It is not the remaining measurement or position error.

Three covers are supplied: two independent cases and the rigid lossy case. The equal rigid case has the stronger analytic proof in section 4. The implementation has a finite node budget and fixed coordinate grid, and raises an error if either is exhausted; no unconditional arbitrary-accuracy termination theorem is claimed.

## 7. A coverage threshold for a shrinking circular arc

For fixed exact chord length `ell=2a` and uncertain minor sagitta `h0 +/- epsilon`, the supporting note derives `R(h)=(a^2+h^2)/(2h)`, its exact interval extrema, and the threshold `epsilon=h0` at which every finite upper radius bound is lost. These conclusions assume chord endpoints are exact and only the height is uncertain.

To compare shorter chords of the same synthetic circle of radius R0, generate the nominal height

\[
h_0(\ell)=R_0-\sqrt{R_0^2-(\ell/2)^2}.
\]

R0 generates test observations and is not given as a prior to the recovery problem. For `0<epsilon<R0`, the boundary `h0=epsilon` becomes

\[
\boxed{\ell_{\rm critical}=2\sqrt{2R_0\epsilon-\epsilon^2}.}
\]

At or below this chord length, positive allowed heights approach zero and the feasible radius is unbounded above. For the synthetic circle `R0=50.005` and height error `epsilon=.001`, the critical chord is approximately `.632484` coordinate units. The exact squared threshold and outward square-root bracket are in `short_arc_threshold_certificate.json`.

Curvature is a different scalar target: `k=1/R=2h/(a^2+h^2)` remains bounded and approaches zero as h approaches zero. On a minor-height interval reaching zero, its infimum is zero and supremum is the value at the largest permitted height. Radius becoming unbounded does not mean all geometric quantities have become unrecoverable.

## 8. Scope and relation to existing work

Known rigid sensor geometry represented by common rotation and translation is established; see [Chepuri, Leus, and van der Veen, Rigid Body Localization Using Sensor Networks](https://arxiv.org/abs/1307.6476). [Hopp's NIST study of three-point circle fitting](https://www.nist.gov/publications/sensitivity-three-point-circle-fitting) studies first-order sensitivity under random point perturbations. Our fixed-chord, bounded-height calculation uses a different explicit error model. Neither source is evidence that this benchmark or its certificates are novel.

The present contribution to this research record is a reproducible, target-specific comparison with exact endpoint proofs or complete arithmetic covers, plus an explicit treatment of shared-anchor consistency in the companion note. It is not yet a certified solver for uncertain-anchor rigid networks, uncertain shape geometry, unlabeled correspondences, arbitrary instruments, or every shape.
