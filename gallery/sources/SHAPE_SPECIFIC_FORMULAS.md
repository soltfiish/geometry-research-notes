# Shape-specific formulas and the next checks

**Checkpoint GCS-SHAPE-COROLLARIES-006 · 5 September 2026 (local date)**

There are two distinct extensions: the shape of the anchor layout changes recovery of an unknown point, while a known shape being recovered constrains several points jointly. This note derives immediate layout corollaries, an ideal spherical-coverage formula, and a concrete curved-shape uncertainty example. It identifies the next bounded research checks without claiming a completed general shape-recovery solver or mathematical originality.

## 1. Formulas supplied by the anchor layout

For exact equal-range readings, one unknown point, and independent anchor uncertainty balls of common radius `delta`, the previous Euclidean theorem gives

\[
\gamma=\frac12w_{\min}(K),\qquad K=\operatorname{conv}\{c_i\}.
\]

Here `w_min` is minimum width in the ambient space. If `delta<gamma`, the feasible region is bounded, possibly empty. If `delta>gamma`, it is unbounded. Equality is a separate case. **Gamma is an escape threshold, not a reconstruction-error bound.**

| Nominal anchor layout | Ambient space | Escape threshold `gamma` | Radius making every point feasible |
|---|---|---|---|
| Nondegenerate triangle: area `A`, longest side `l_max` | 2D | `A/l_max` | `l_max/2` |
| Equilateral triangle: side `s` | 2D | `sqrt(3)s/4` | `s/2` |
| Rectangle: sides `a,b` | 2D | `min(a,b)/2` | `sqrt(a^2+b^2)/2` |
| Square: side `s` | 2D | `s/2` | `s/sqrt(2)` |
| Regular tetrahedron: edge `s` | 3D | `s/(2sqrt(2))` | `s/2` |
| Rectangular box: sides `a,b,c` | 3D | `min(a,b,c)/2` | `sqrt(a^2+b^2+c^2)/2` |
| A finite layout lying in a proper affine subspace | Higher-dimensional ambient space | `0` | Half its positive diameter |

The all-space column follows from the separate half-diameter theorem, assuming at least two distinct centers. All rows inherit the equal-range and independent-error assumptions. They do not describe arbitrary ratio data or recovery of an object having the named shape.

### Why these formulas hold

For a planar convex polygon, a minimum-width supporting strip can be chosen with one boundary containing an edge. A triangle therefore has minimum width equal to its shortest altitude, `2A/l_max`. Halving gives the first two rows. This is standard convex geometry; see [Houle and Toussaint, *Computing the Width of a Set*](https://www-cgrl.cs.mcgill.ca/~godfried/publications/width.pdf) and the [CGAL minimum-strip documentation](https://doc.cgal.org/Manual/4.1/doc_html/cgal_manual/Bounding_volumes_ref/Function_min_strip_2.html).

For a rectangle, directional width is `a|u_1|+b|u_2|` for a unit direction `u`. It is at least `min(a,b)` because `|u_1|+|u_2|>=1`, and equality is attained along a shortest side direction. The same argument with three coordinates proves the box formula.

For the regular tetrahedron use vertices `(1,1,1),(1,-1,-1),(-1,1,-1),(-1,-1,1)`, whose edge length is `2sqrt(2)`. Projections onto any unit direction have mean zero and variance one, since the sum of their outer-product matrices is `4I`. If four real values lie in an interval `[m,M]`, their variance is at most `(M-m)^2/4`: average `(z-m)(M-z)>=0` and use `(mean-m)(M-mean)<=(M-m)^2/4`. Thus projection width is at least two. An axis direction attains two. Scaling proves `w_min=s/sqrt(2)` and `gamma=s/(2sqrt(2))`.

This last example is useful: the tetrahedron's minimum width is attained between opposite-edge supporting planes, and is smaller than its vertex-to-opposite-face altitude. Substituting an altitude automatically would give the wrong threshold.

If anchors occupy a lower-dimensional affine subspace, a perpendicular unit direction has projection width zero. A planar triangle can consequently have a positive 2D threshold and a zero 3D threshold. Under these exact equal-range assumptions, every positive anchor radius then permits unbounded feasible locations in the larger space.

## 2. A fully explicit spherical-coverage case

Consider an **ideal continuous set of nominal anchors on the entire sphere** of radius `R>0` centered at `o` (a full circle in 2D). All retained ratios are exactly one. Each anchor may move independently within radius `delta`. This is an idealization, not a formula for a few anchors merely lying on a circle or sphere.

Write `rho=||x-o||`. Across all nominal anchors, the smallest range is `|rho-R|` and the largest is `rho+R`. The smallest common anchor displacement needed to equalize the ranges is half their spread:

\[
\boxed{\Delta(x)=\frac{\rho+R-|\rho-R|}{2}=\min(\rho,R).}
\]

To justify extending the finite-anchor argument, ranges attain their extrema on the compact spherical surface. A positive common range at their midpoint is within half the spread of every nominal range. The same independent radial construction realizes all those ranges simultaneously. At `rho=0`, their common range is `R>0`; no ratio pole is introduced.

Therefore the entire feasible set has the exact form

\[
\boxed{
F_\delta=\begin{cases}
\overline B(o,\delta),&0\le\delta<R,\\
\mathbb R^d,&\delta\ge R.
\end{cases}}
\]

For `delta<R`, the optimal worst-case full-position error is `delta` with estimate `o`. If the target is instead the scalar distance to `o`, its possible values are `[0,delta]`, and the optimal scalar error is `delta/2`. These are different targets.

Finite sampling changes the feasible set and escape threshold. For example, four cardinal points on a circle of radius `R` form a square: their threshold is `R/sqrt(2)`, rather than the continuous-circle value `R`. The full spherical formula can serve as an analytic benchmark for studying finite coverage.

## 3. Formulas for a shape being recovered

For a known rigid shape with local vertices `v_k`, the joint positions are

\[
x_k=Qv_k+t,\qquad Q^TQ=I,\quad\det Q=1.
\]

A correctly specified shape prior restricts the data-compatible set to its intersection with this shape family. For a nonempty intersection, the range of any scalar target can only shrink. All points share the same rotation, translation, anchors, and relevant calibration parameters. Applying a separate one-point feasibility test to each vertex can lose that coupling. Rigid-body localization with known sensor topology is established; see [Chepuri, Leus, and van der Veen](https://arxiv.org/abs/1307.6476).

Shape-specific identities then specify useful target quantities:

| Shape information | Missing quantity or parameter |
|---|---|
| Triangle with two sides `a,b` and included angle `theta` | `c=sqrt(a^2+b^2-2ab cos(theta))` |
| Rectangle with side lengths `a,b` | Diagonal `sqrt(a^2+b^2)` |
| Circle with radius `R` and central angle `theta` | Straight chord `2R sin(theta/2)`; arc length `R theta` |
| Circular minor arc with chord `ell` and sagitta `h` | Radius `R=ell^2/(8h)+h/2` |

These classical identities do not alone supply a measurement-error guarantee. The next calculation is to optimize the requested quantity over the joint allowed parameter intervals and measurement constraints. For instance, with exact `a,b` and `theta` restricted to `[theta_L,theta_U]` inside `[0,pi]`, the law-of-cosines expression is nondecreasing in `theta`, giving exact endpoint bounds. If the side lengths vary too, their dependence must also be retained.

Symmetry changes which parameters can be identified. An unmarked circular or spherical shape has no observable intrinsic orientation. An unmarked square has orientation equivalent modulo quarter turns. Marked vertices or distinguishable sensors can remove some of these equivalences. Knowing shape does not by itself imply every pose parameter can be recovered.

## 4. A short-arc uncertainty calculation

Fix an exact chord of length `ell=2` and a minor-arc sagitta in `[0.009,0.011]`. Since `h<ell/2` throughout,

\[
\frac{dR}{dh}=\frac12-\frac{\ell^2}{8h^2}<0.
\]

Thus the exact radius interval is

\[
\boxed{R\in\left[
\frac{4}{8(0.011)}+\frac{0.011}{2},\quad
\frac{4}{8(0.009)}+\frac{0.009}{2}
\right]
\approx[45.46004545,55.56005556].}
\]

At sagitta `0.01`, the nominal radius is `50.005`. In meter units, a 2 m chord and a sagitta of 10 mm with 1 mm uncertainty leave a radius range spanning approximately 10.1 m, even with the chord held exact. This is a geometric information-loss example, not a claim about a particular instrument or fitting algorithm. If positive `h` can approach zero, the compatible radius becomes unbounded.

The sensitivity of circle parameters to measured-point error and arc angle is established in [NIST's *The Sensitivity of Three-Point Circle Fitting*](https://www.nist.gov/publications/sensitivity-three-point-circle-fitting). The interval above is our direct deterministic calculation for the stated chord/sagitta model, not a transfer of NIST's statistical uncertainty formulas.

## 5. Recommended order of checks

1. **A rigid triangle.** This is the smallest planar shape with noncollinear vertices. Determine which pose and missing-distance targets remain identifiable, retaining shared anchor and calibration choices. Compare broad and nearly flat triangles.
2. **A rectangle versus a flexible quadrilateral.** Quantify how known right angles and fixed side lengths narrow the feasible set. Four points with only side distances can still flex, so the shape assumptions must be explicit.
3. **A circle observed through progressively shorter arcs.** Bound center and radius separately, test whether finite radius bounds disappear, and compare those parameter errors with local curve-position error.
4. **A regular versus nearly flat tetrahedron.** Check depth recovery, reflection alternatives, and the effect of small width when moving from 2D to 3D.

Across all cases, check incomplete visibility, point correspondence, symmetry, and allowed departure from the ideal shape. Compare layouts at a fixed physical scale and with the same observation/error model before ranking them.

I would start with the rigid triangle, while using the analytic short-arc example as a second test of information loss. That adds real coupling to the present point theory and supplies a clear failure case against which broader claims can be checked.

## Verification

`work/shapes/check_shape_formulas.py` performs exact algebraic checks for triangle examples, the regular tetrahedron, the continuous spherical profile, and the short-arc interval. Its certificate is `shape_formula_checks.json`. The accompanying arguments, including the variance and supporting-width proofs, establish the general statements. Earlier checkpoints remain unchanged.
