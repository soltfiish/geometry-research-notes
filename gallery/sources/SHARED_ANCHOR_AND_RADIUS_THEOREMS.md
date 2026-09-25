# Shared-anchor consistency and chord-height uncertainty

Supporting planar theory, 2026-09-05. These are self-contained elementary derivations, not originality claims. They identify correlations that must be retained when extending the one-unknown-point model to several vertices.

## 1. Why one anchor shared by several vertices changes the model

For one proposed vertex `p_i`, an uncertain anchor in a disk centered at `c` with radius `delta` can attain every ordinary range in `[(||p_i-c||-delta)_+,||p_i-c||+delta]`. If that same actual anchor is observed from several proposed vertices, these radial choices must be realized by **one common anchor point**. Independent interval checks do not enforce that condition.

There is even a pairwise-consistent counterexample. Let the three known candidate vertices be

\[
p_0=(1,0),\quad p_1=(0,1),\quad p_2=(-1,0),
\]

and let the shared anchor lie in the disk centered at the origin of radius `4/7`. Request the same squared range `65/49` from all three vertices. Each pair can be realized inside the disk:

| Observed vertex pair | Shared anchor witness |
|---|---|
| `p0,p1` | `(-1/7,-1/7)` |
| `p1,p2` | `(1/7,-1/7)` |
| `p0,p2` | `(0,4/7)` |

Their squared displacements from the disk center are `2/49,2/49,16/49`. However, an anchor equidistant from the three noncollinear vertices must be their circumcenter `(0,0)`, whose squared ranges are one. Thus no single anchor realizes all three readings, even though every two-reading subsystem is jointly feasible.

This failure is robust to interval observations. If each squared range lies within `epsilon` of `q=65/49`, subtracting the first and third equations gives `|a_x|<=epsilon/2`, and subtracting the first and second gives `|a_x-a_y|<=epsilon`, hence `|a_y|<=3 epsilon/2`. Therefore the first squared range is at most `1+epsilon+(5/2)epsilon^2`. Joint feasibility would require

\[
q-1\le2\epsilon+\frac52\epsilon^2.
\]

At `epsilon=1/100` this is false. The same pair witnesses still obey the interval data, while the full three-reading problem remains infeasible even without the disk restriction.

## 2. Exact elimination for a noncollinear candidate triangle

Let `p0,p1,p2` be fixed noncollinear planar vertices and `t0,t1,t2` their proposed squared ranges to one shared anchor `a`. Set

\[
B=\begin{pmatrix}2(p_1-p_0)^T\\2(p_2-p_0)^T\end{pmatrix},\qquad
k(t)=\begin{pmatrix}
\|p_1\|^2-\|p_0\|^2-t_1+t_0\\
\|p_2\|^2-\|p_0\|^2-t_2+t_0
\end{pmatrix}.
\]

Subtracting the squared-range equations gives `B a=k(t)`. Since the triangle is noncollinear, `B` is invertible, and the only possible shared anchor is

\[
\boxed{a(t)=B^{-1}k(t).}
\]

The readings are realizable by an anchor in its disk **iff**

\[
\boxed{\|a(t)-p_0\|^2=t_0,\qquad \|a(t)-c\|^2\le\delta^2.}
\]

The first equation is essential: solving the two difference equations alone does not establish range consistency. The other two range equations then follow by subtraction. Negative input squared ranges are infeasible; for nonnegative inputs these two tests are necessary and sufficient.

In the coordinate gauge `p0=(0,0),p1=(b,0),p2=(u,h)` with `b>0,h!=0`,

\[
a_x=\frac{b^2+t_0-t_1}{2b},\qquad
a_y=\frac{u^2+h^2+t_0-t_2-2u a_x}{2h}.
\]

The determinant is `4 b h`, or eight times signed triangle area. This identifies the impending singularity as vertices approach collinearity. For a perturbation with `|Delta t_i|<=eta`, the affine recovered anchor perturbation satisfies `||Delta a||_infinity<=2 eta ||B^{-1}||_infinity`. This is an enclosure for feasible range perturbations, not a claim that arbitrary independent perturbed readings remain jointly realizable.

## 3. Interval-valued ranges retain a coupled condition

If the squared readings are intervals `ell_i<=t_i<=u_i`, exact feasibility is the existence of a triple in that range box satisfying

\[
Q(t)=\|B^{-1}k(t)-p_0\|^2-t_0=0,
\qquad
\|B^{-1}k(t)-c\|^2\le\delta^2.
\]

These are a quadratic consistency equation and a quadratic disk inequality in the three range variables. Every feasible triple constructs the shared anchor. Keeping only the coordinate image of the interval box and dropping `Q=0` is an outer relaxation, not an exact test.

An equivalent two-variable reduction uses the range differences `z1=t1-t0,z2=t2-t0`. The anchor is affine in `(z1,z2)`, and `t0=||a(z)-p0||^2`; impose the original three range intervals on `t0,t0+z1,t0+z2` and the anchor disk inequality. Thus the shared anchor can be represented without introducing independent copies for each observed vertex.

This statement fixes a proposed triangle configuration. If the vertices themselves are unknown, it must be applied jointly with their shape or pose constraints. The separate rigid-triangle benchmark with exact anchors isolates the benefit of those shape constraints; it does not silently solve this shared-uncertain-anchor extension.

## 4. Collinear and coincident vertices

Let the vertices lie on a line, `p_i=p_0+s_i e`, where `e` is a unit vector and `s0=0`. Write the anchor as `a=p0+v e+w n`, with a perpendicular unit vector `n`. Exact ranges satisfy

\[
t_i-t_0=s_i^2-2s_i v.
\]

Each nonzero `s_i` determines `v=(s_i^2-t_i+t0)/(2s_i)`; all such values must agree. A repeated vertex `s_i=0` requires `t_i=t0`. Then

\[
w^2=t_0-v^2.
\]

A negative right side is impossible, zero gives one anchor, and a positive value gives two reflected anchors. The disk may admit neither, one, or both. If all vertices coincide, the problem reduces to one circle intersecting the anchor disk, together with agreement of the repeated readings.

For interval readings, one can retain two variables `v,z`, with `z=v^2+w^2`, and impose

\[
\ell_i\le z-2s_i v+s_i^2\le u_i,\qquad z\ge v^2.
\]

Write the disk center relative to `p0` as `v_c e+w_c n`. At least one reflected sign is admitted exactly when

\[
(v-v_c)^2+\bigl(\sqrt{z-v^2}-|w_c|\bigr)^2\le\delta^2.
\]

If the disk center is on the vertex line, this last condition reduces to the linear inequality `z-2 v_c v+v_c^2<=delta^2`; the remaining inequalities describe a convex set in `(v,z)`. The physical anchors may nevertheless retain reflection ambiguity.

## 5. Exact circle-radius bounds from a fixed chord and uncertain height

Fix chord endpoints `(-a,0),(a,0)`, where `a>0` is half the chord length. The third point is `(0,h)` with `h>0`. The circle center and radius are

\[
y_c=\frac{h^2-a^2}{2h},\qquad
\boxed{R(h)=\frac{a^2+h^2}{2h}=\frac h2+\frac{a^2}{2h}.}
\]

This formula covers both minor-segment heights `0<h<=a` and major-segment heights `h>=a`. A specification that means only the minor sagitta must explicitly intersect its height interval with `(0,a]`.

Suppose a positive nominal height is `h0`, with bounded absolute error `epsilon>=0`. First consider `epsilon<h0`, so `l=h0-epsilon>0` and `u=h0+epsilon`. The exact radius range is

\[
\boxed{
R_{\min}=
\begin{cases}
R(u),&u<a,\\
a,&l\le a\le u,\\
R(l),&l>a,
\end{cases}
\qquad
R_{\max}=\max\{R(l),R(u)\}.
}
\]

Indeed, `R'(h)=(1-a^2/h^2)/2`, with its only positive critical point at `h=a`, and `R''(h)=a^2/h^3>0`. Every intermediate radius in the displayed interval is attainable by continuity. The best unrestricted scalar estimate under absolute loss is `(R_min+R_max)/2`, with unavoidable error `(R_max-R_min)/2`.

If `epsilon>=h0`, positive heights can approach zero. The exact radius range becomes

\[
\boxed{[R(\min(a,h0+\epsilon)),\ +\infty).}
\]

Thus **the threshold for losing every finite upper radius bound is `epsilon=h0`**. A height of exactly zero gives a collinear triple and no finite circle; arbitrarily small positive allowed heights already make the radius unbounded. If signed heights are permitted, crossing zero also permits both curvature orientations. Restricting to the minor sagitta changes the upper height endpoint to `min(a,h0+epsilon)` but leaves this unboundedness threshold unchanged whenever the height interval is nonempty.

On a fully minor-sagitta interval `0<=epsilon<h0` and `h0+epsilon<=a`, the exact minimax formulas simplify to

\[
\boxed{
\widehat R=\frac{h0}{2}+\frac{a^2 h0}{2(h0^2-\epsilon^2)},\qquad
E_R=\frac{\epsilon(a^2-h0^2+\epsilon^2)}{2(h0^2-\epsilon^2)}.
}
\]

The midpoint of the radius interval generally differs from the radius at the midpoint height. Its exact upper deviation from the nominal-radius estimate is

\[
R(h0-\epsilon)-R(h0)
=\frac{\epsilon(a^2-h0^2+h0\epsilon)}{2h0(h0-\epsilon)}.
\]

Absolute sensitivity diverges as a positive height approaches zero with a fixed absolute instrument tolerance. The relative differential condition number is instead `|h^2-a^2|/(h^2+a^2)<=1`; these statements concern different error models.

For chord length two, nominal height `1/10`, and error `1/100`, the exact radius interval is `[10121/2200,10081/1800]`. Its minimax estimate is `10099/1980`, and error is `9901/19800`. At error `1/10`, the interval becomes `[13/5,infinity)`.

Curvature is a different target. `1/R=2h/(a^2+h^2)` stays bounded and tends to zero as `h` approaches zero, even when radius is unbounded. Recoverability should therefore be stated for the requested quantity, not inferred solely from coordinate or radius sensitivity.

## 6. Verification

Run `python work/rigid_triangle/parallel/verify_shared_anchor_radius.py`. The checks verify the general squared-range elimination identities, the pairwise-consistent counterexample and its interval obstruction, collinear branches, the radius formula and derivative identities, and exact finite/unbounded height-interval cases. The JSON certificate is written beside the verifier.
