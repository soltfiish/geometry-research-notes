# Shape-dependent recovery: proofs and limits

GCS-MEASUREMENT-SHAPES-015 · 6 September 2026.

These results extend the research examples to additional **object shapes**. They do not all use the triangle observation graph of checkpoint 014. Each section states its own observations. Equal side lengths, an exactly rigid body, a full boundary, and a few sampled points are different assumptions. These are proved results in this record, not established originality claims.

## 1. A conditioning bound for a full-dimensional co-spherical body

Let the known body vertices be `v0=0,v1,...,vn` in R^d. Assume the nonreference vectors span R^d and every vertex lies on the sphere with center c and radius R=||c||>0. There is one physical shared anchor b. Set r=||b||>0. Every other body-to-anchor range is observed only through

\[
 (1-\epsilon)r\le\|b-v_i\|\le(1+\epsilon)r,
 \qquad 0\le\epsilon<1.
\]

Define the shape constant and the noise coefficient

\[
 \mu=\min_{\|u\|=1}\max_i|v_i\cdot u|>0,
 \qquad \kappa=\frac{2\epsilon+\epsilon^2}{2\mu}.
\]

**Theorem 1.** Every feasible reference range satisfies

\[
 |r-R|\le\kappa r^2. \tag{1}
\]

If `0<κR<1/4`, this gives the outer enclosure

\[
 r\in[r_\ell,r_n]\ \cup\ [r_f,\infty), \tag{2}
\]

where

\[
 r_\ell=\frac{2R}{1+\sqrt{1+4\kappa R}},\quad
 r_n=\frac{2R}{1+\sqrt{1-4\kappa R}},\quad
 r_f=\frac{1+\sqrt{1-4\kappa R}}{2\kappa}.
\]

For ε=0, the anchor is exactly c and r=R. For a cap B<r_f the far part is excluded. If the capped feasible set is nonempty, estimating r by the midpoint of `[r_ell,min(B,r_n)]` has worst error at most half that interval's length. This is a bound, not a claim of endpoint feasibility or sharpness for positive ε.

**Proof.** Co-sphericity with v0=0 gives `||vi||²=2vi·c`. Squaring the observations and subtracting r² gives

\[
 -m r^2\le -2v_i\cdot(b-c)\le p r^2,
 \quad p=2\epsilon+\epsilon^2,\quad m=2\epsilon-\epsilon^2\le p.
\]

Consequently `max_i |vi·(b-c)|≤p r²/2`, whence `||b-c||≤κr²`. The reverse triangle inequality proves (1). Below R, (1) requires `κr²+r-R≥0`. Above R, it requires `κr²-r+R≥0`. Solving these two quadratics proves (2). At κ=0 the spanning condition instead gives b=c directly. ∎

For fixed nondegenerate shape, the near width is O(ε) and the excluded far range starts at order `1/ε`. This differs from the `1/sqrt(ε)` onset in the **partially observed** mixed-boundary triangle of 014. It is the observation pattern as well as the shape that changes the result.

There is a matching general escape order. Put `D=max_i ||vi||`. For any anchor with `r=||b||≥D/ε`, the reverse triangle inequality gives `| ||b-vi||-r |≤D≤εr` for every vertex. Thus **every** such distant anchor fits, regardless of direction. No exact rigid shape by itself removes this far family under this one-anchor relative-error model. Together with (2), this makes the far onset order `1/ε` sharp for a fixed full-rank co-spherical body as ε→0, though the two constants need not agree.

### Explicit shape constants

| Known body, with v0 at a vertex | Ambient dimension | Circumradius R | μ |
|---|---:|---:|---:|
| Right triangle with legs a,b | 2 | sqrt(a²+b²)/2 | ab/sqrt(a²+b²) |
| Rectangle with sides a,b | 2 | sqrt(a²+b²)/2 | ab/sqrt(a²+b²) |
| Equilateral triangle, edge a | 2 | a/sqrt(3) | a/2 |
| Regular tetrahedron, edge a | 3 | a sqrt(6)/4 | a sqrt(2/11) |

For the right triangle, the first two projections give the lower bound for μ; the unit direction proportional to `(b,-a)` attains it. That direction has zero projection on the rectangle's extra `(a,b)` corner, so the rectangle has the same μ. This does not say that its extra reading is useless for every target or dataset.

For a regular d-simplex with edge a, put the d nonreference vertex vectors in the rows of V. Since `VV^T=(a²/2)(I+11^T)`, the reciprocal squared constant is the largest value of

\[
 \|V^{-1}t\|^2=\frac2{a^2}
 \left(\sum_i t_i^2-\frac{(\sum_i t_i)^2}{d+1}\right)
\]

on the unit cube. A convex quadratic reaches a maximum at a cube vertex. The smallest squared sum of d signs is zero for even d and one for odd d. Therefore

\[
 \mu^2=\frac{a^2}{2[d-(d\bmod2)/(d+1)]}. \tag{3}
\]

For a general matrix V, `μ≥σ_min(V)/sqrt(n)` supplies a simpler spectral bound. A thin rectangle has μ→0 as one side tends to zero: there is no shape-independent good linear constant across that degenerating family. A planar rectangle embedded in 3D fails the spanning assumption and is not covered by Theorem 1.

## 2. Exact formula for a complete circle or spherical boundary

The body is the **entire** spherical boundary of known radius R in R^d, d≥2, with one marked reference point. A shared anchor has reference range r>0; the same interval `[1-ε,1+ε]` bounds the ratio of **every boundary point's** range to r. Here `0<ε<1`. This ideal observation model uses the complete boundary; it is not a few-point circle fit.

**Theorem 2.** The exact image of feasible reference ranges is

\[
 \boxed{\left[\frac{2R}{2+\epsilon},\frac{2R}{2-\epsilon}\right]
 \ \cup\ \left[\frac R\epsilon,\infty\right).} \tag{4}
\]

At ε=0 its image is `{R}`. If a cap satisfies `2R/(2-ε)≤B<R/ε`, the exact scalar minimax error is

\[
 E=\frac{2R\epsilon}{4-\epsilon^2}. \tag{5}
\]

**Proof.** Let ρ be the anchor's distance to the center. Boundary ranges have extrema `|ρ-R|` and `ρ+R`; the marked range r must also lie between them. For ρ≤R the necessary and sufficient inequalities are

\[
 |r-R|\le\rho\le\min\{R,(1+\epsilon)r-R,R-(1-\epsilon)r\}.
\]

Eliminating ρ gives the first interval in (4). For r≤R its lower endpoint follows from `(2+ε)r≥2R`; for r≥R its upper endpoint follows from `(2-ε)r≤2R`. Choosing `ρ=|r-R|` proves sufficiency, by placing the anchor on the reference radius with the appropriate sign.

For ρ≥R the noisy inequalities require `R+(1-ε)r≤ρ≤(1+ε)r-R`, hence r≥R/ε. Conversely choose ρ=r and an angle ψ to the reference radius with `cos ψ=R/(2r)`. Then the marked range really is r and both extreme ranges obey the noise inequalities. Such an angle exists in d≥2. The midpoint error formula gives (5). ∎

The near anchors obey `ρ≤εR`, whereas far anchors obey `ρ≥R/ε`. These anchor bands stay separated for ε<1. Their **scalar range images** in (4) overlap when ε≥2/3. A connected target interval therefore does not imply a connected physical feasible set.

For R=1 and ε=.01, the near interval is approximately `[.99502488,1.00502513]`, its optimal error is `.005000125`, and the far interval starts at 100. A one-dimensional sphere consists of only two endpoints and has a different far threshold; the d≥2 hypothesis is essential.

## 3. Complete equal-distance blocks and the spare dimension

Let B and A be nonempty finite sets in R^d, with affine direction spaces U,V of dimensions p,q. Their positions here are **actual physical positions**. Ask for every distance from every body point to every anchor to equal the same r. This is a complete bipartite equal-distance observation graph.

**Theorem 3.** All cross distances equal r if and only if:

1. B and A are each co-spherical in their own affine spans, with relative circumcenters o_B,o_A and radii R_B,R_A;
2. U is perpendicular to V;
3. `w=o_B-o_A` is perpendicular to U+V; and
4. `r²=R_B²+R_A²+||w||²`.

For a singleton the relative radius is zero. Because each set spans its affine hull, its relative circumcenter, if one exists, is unique.

**Proof.** Subtract the four cross-distance squares associated with b,b' and a,a'. Their equality gives `(b-b')·(a-a')=0`, so U⊥V. Fix an anchor a. Its orthogonal projection into aff(B) is equidistant from all body points and hence is o_B. All anchors have the same such projection. The symmetric argument yields o_A and both perpendicularities for w. Expanding a cross difference in the orthogonal components from U,V,(U+V)^perp gives the displayed formula. This expansion also proves sufficiency. ∎

Consequences when relative placements are otherwise free:

| Shape and anchors | Result under the complete equal-distance graph |
|---|---|
| Planar triangle or rectangle + two distinct anchors, in 2D | Impossible: p+q=3>2. |
| The same co-circular body + two anchors, in 3D | Possible with perpendicular spans and coincident relative centers; r²=R_B²+D²/4. |
| A rectangle of sides a,b in 3D, anchor separation D | r²=(a²+b²+D²)/4; all eight cross readings can be equal. |
| Equilateral triangle, edge a, in 3D | r²=a²/3+D²/4. |
| A full-dimensional tetrahedron in 3D + one anchor | Anchor must be the circumcenter; r=R_B. |
| That tetrahedron + two distinct anchors | Impossible. Coincident anchors may fit but do not restore escape. |
| Noncyclic planar quadrilateral + even one anchor | Impossible, including when the anchor is allowed out of plane. |
| p+q<d, otherwise free placements | A residual perpendicular translation w can make r unbounded. |

These statements concern a specific equal-distance graph, not universal localization from the shape name. Rotation of an entire feasible body around a two-anchor axis still preserves its ranges. Fixing r is not fixing pose.

## 4. Four equal sides do not make a rigid square

Consider a convex parallelogram generated by vectors u,v of known lengths a,b but unknown angle θ. Its diagonals satisfy

\[
 d_\pm^2=a^2+b^2\pm2ab\cos\theta. \tag{6}
\]

For a rhombus a=b and one diagonal constrained to `[l,u]⊂[0,2a]`, the exact other-diagonal image is

\[
 [\sqrt{4a^2-u^2},\sqrt{4a^2-l^2}]. \tag{7}
\]

The optimal error is half its span. If a reading at the maximal diagonal 2a has tolerance η, the other diagonal has optimal error

\[
 E=\tfrac12\sqrt{4a\eta-\eta^2}\sim\sqrt{a\eta}. \tag{8}
\]

Strictly convex rhombi exclude the collapsed endpoints, but the same infimum, supremum, and minimax value apply. Equation (6) follows by expanding `||u±v||²`; monotonicity proves (7)-(8). A true rectangle prior already fixes both diagonals to `sqrt(a²+b²)`.

There is also a useful range-based angle bound. If one shared anchor b has reference range r at vertex 0, and all other corner ratios lie in `[1-ε,1+ε]`, then under r≤B,

\[
 |\cos\theta|\le\frac{(6\epsilon+\epsilon^2)B^2}{2ab}. \tag{9}
\]

Indeed, with `s_w=||w-b||²`, the identity `s_(u+v)-s_u-s_v+s_0=2u·v` holds exactly. Each nonreference difference from s0 lies in `[-m r²,p r²]`. Their signed combination lies in `[-(m+2p)r²,(p+2m)r²]`; `m+2p=6ε+ε²` proves (9). It is an outer bound, useful only when its right side is small.

**Exact warning example.** At ε=.01 and cap 10, a unit square centered on its anchor and a very thin unit-sided rhombus both satisfy these same ratio reports. An exact rational rhombus in `shape_recovery_validation.json` has area about .003999988 and short diagonal about .003999996, compared with square area 1 and diagonal sqrt(2). It uses one shared anchor, not the two-anchor graph from 014. Both can be placed relative to the same fixed physical anchor by translating the body. The rational coordinates, unit sides, noise inequalities, and cap are checked exactly.

## 5. A short arc: visible shape can be stable when radius is unbounded

Fix a chord with endpoints `(-c,0),(c,0)` and a minor circular arc of positive sagitta h<c. Its radius and visible graph are

\[
 R(h)=\frac{c^2+h^2}{2h},\qquad
 f_h(x)=h-R(h)+\sqrt{R(h)^2-x^2},\quad |x|\le c. \tag{10}
\]

The radius formula is classical; this section distinguishes recovery targets. For `0<h1<h2<c`,

\[
 \|f_{h_2}-f_{h_1}\|_\infty=h_2-h_1. \tag{11}
\]

**Proof.** `R'(h)=(1-c²/h²)/2<0`. Differentiating the graph gives

\[
 \partial_h f_h=1+R'(h)\left(\frac{R(h)}{\sqrt{R(h)^2-x^2}}-1\right).
\]

This derivative ranges from 1 at x=0 to 0 at |x|=c: the bracket increases with |x|, and substitution at c gives zero exactly. Thus `0≤∂_h f≤1`. Integrating in h supplies the upper bound in (11); the center point attains it. ∎

If the known sagitta lies in `[h_L,h_U]`, the exact optimal error for the **visible graph in vertical sup norm** is `(h_U-h_L)/2`, achieved by the actual circular arc with midpoint sagitta. For `(0,h_U]` the same supremum error holds with h_L=0. The radius, however, has no finite upper bound in that case. Curvature

\[
 k(h)=\frac{2h}{c^2+h^2}
\]

is increasing on `(0,c)`, so its image and midpoint error are also explicit. With c=1 and `0<h≤.01`, radius is at least 50.005 with no upper bound, while the visible-arc error is exactly .005 and curvature lies in `(0,200/10001]`.

This does not control an unobserved continuation of the arc, horizontal registration error, an arbitrary free-form curve, or Hausdorff error of the full circle. Changing the target changes the recovery claim.

## 6. Tetrahedral depth, flattening, and reflection

Three fixed base anchors are `(0,0,0),(2,0,0),(0,2,0)`. A point has exactly equal squared ranges q to them. Subtraction forces it to have coordinates `(1,1,z)` and

\[
 q=2+z^2. \tag{12}
\]

If the common squared range is known only to lie in `[2,2+ν]`, the signed depth image is `[-sqrt(ν),sqrt(ν)]`, whereas the unsigned depth image is `[0,sqrt(ν)]`. Their optimal scalar errors are respectively `sqrt(ν)` and `sqrt(ν)/2`. This is an exact family with a common uncertain squared range, not three independently noisy equal readings or a known rigid tetrahedron.

For any fixed |z|, put a fourth beacon at `(1,1,b)`, b>0. Its ranges for the two reflected possibilities differ by

\[
 |b+|z||-|b-|z||=2\min(b,|z|). \tag{13}
\]

With additive range error η, it distinguishes these two signs for **all** possible readings exactly when `min(b,|z|)>η`. At equality the closed reading intervals still meet. If the instrument reports squared range with error η_q, the corresponding condition is `4b|z|>2η_q`.

Thus adding an out-of-plane beacon removes a fixed nonzero reflection ambiguity with exact readings, but no positive fixed precision can uniformly determine the sign over a family approaching z=0. An algebraic uniqueness statement alone is not a useful uniform accuracy guarantee.

## 7. A compatibility obstruction for other shapes

Equal reported ratios are a special dataset. They need not be compatible with a general known shape. Let `v0,...,vn` be known body points and choose real weights λ with `sum λ_i=0` and `sum λ_i v_i=0`. For any shared anchor b,

\[
 D_\lambda:=\sum_i\lambda_i\|v_i\|^2
 =\sum_i\lambda_i\|b-v_i\|^2. \tag{14}
\]

Let r be the reference range at v0, `p=2ε+ε²`, `m=2ε-ε²`, and suppose all other ratios lie in `[1-ε,1+ε]`. Write `P=sum_{i>0,λ_i>0}λ_i` and `N=sum_{i>0,λ_i<0}(-λ_i)`. The reference squared-range deviation is exactly zero. Therefore the following necessary test holds:

\[
 -(mP+pN)r^2\le D_\lambda\le(pP+mN)r^2. \tag{15}
\]

With r≤B, a nonzero Dλ supplies a quantitative noise floor. The test follows immediately by applying the signed weights to deviations in `[-mr²,pr²]`. An affine dependence with nonzero Dλ also proves impossibility at ε=0. Conversely, if every such affine dependence has Dλ=0, the squared vertex norms are affine functions of the vertex coordinates, which is precisely co-sphericity in their affine span. Thus this is a general obstruction, not a shape-by-shape guess.

For example, an ellipsoid's two antipodal vertex pairs on axes a_max and a_min give

\[
 2(a_{\max}^2-a_{\min}^2)
 =s_{+\max}+s_{-\max}-s_{+\min}-s_{-\min}.
\]

Since each s lies in `[(1-ε)²r²,(1+ε)²r²]`, necessarily

\[
 \epsilon\ge\frac{a_{\max}^2-a_{\min}^2}{4B^2}. \tag{16}
\]

This symmetric bound deliberately relaxes the exact reference reading when it is one of those vertices. A nonspherical ellipse with semiaxes 2 and 1 and cap 10 cannot fit the full equal-ratio report with ε<.0075. The inequality is necessary, not sufficient or asserted sharp. Actual unequal ratio reports for an ellipse require their own feasible-set computation; failure of this special report does not mean ellipses cannot be recovered.

## 8. Missing a dimension: an ellipsoid from a perfect slice

Suppose the data reveal the exact equatorial section `x²/a²+y²/b²=1, z=0` of an axis-aligned ellipsoid with known a,b but unknown positive semiaxis c. Every member

\[
 x^2/a^2+y^2/b^2+z^2/c^2=1,\qquad c>0,
\]

has the identical observed section. Thus c, full vertical extent 2c, and volume `4πabc/3` are unbounded above without an additional prior, even though the measured section has zero error. This is exact data loss, with no measurement noise needed.

One absolute measurement of c with feasible interval `[c_L,c_U]` makes its minimax error `(c_U-c_L)/2`; the volume error is `4πab/3` times that value. The extension assumes the ellipsoid and axis alignment are known. Arbitrary bodies with the same slice remain much less constrained.

## Verification and positioning

`work/measurement_shapes/verify_shapes.py` checks the circle elimination on 10,800 rational instances, simplex constants through dimension 9, rectangle directions, exact equal-distance identities, the physical flexible-rhombus witness, arc identities, 1,830 reflection thresholds, and 343 finite measurement relations. The accompanying written proofs cover the continuous families; finite checks alone do not establish them.

Equations (6), (10), distance subtraction, circumcenter geometry, and simplex Gram matrices are classical tools. Their inclusion is for a consistent recovery atlas, not to claim their discovery. The earlier literature review documents the chord/sagitta precedent and short-arc fitting literature. The exact specialized range images and bounds above have been derived here; their publication priority has not been established.
