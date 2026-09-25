# Shape constraints and the remaining recovery gap

**Checkpoint GCS-RIGID-TRIANGLE-007 — 2026-09-05**

Knowing the shape can substantially improve recovery, but it need not improve every target. In one controlled triangle experiment we prove exactly zero improvement; in another, the same shape information reduces the unavoidable target-distance error by about **70.06%**, or a factor of **3.34**. The difference is whether the shape removes configurations that attain the extreme target values.

This advances the project from point recovery to one certified rigid-shape example. It does not yet solve arbitrary shapes with uncertain anchors and unknown instrument scales.

## The comparison

Three labeled vertices are observed from three exact planar anchors `(0,0),(4,0),(0,4)`. The observations are nine bounded intervals for squared ranges. Two vertices have error bounds of `1/100`; the third has either `1/100` or `1/10`. These are squared-distance error bounds, not percentages or ordinary range errors.

We compare the exact same observations under two assumptions: the vertices are independent, or they form a congruent copy of the triangle with vertices `(0,0),(1,0),(0,1)`. Its position and orientation remain unknown, and reflected alternatives are considered. The quantity to recover is the third vertex's unmeasured distance to `(1,1)`.

For a scalar target with feasible extrema L and U, the minimum possible worst-case absolute error is `E*=(U-L)/2`. This measures the unresolved information in these data, rather than the accuracy of one fitting algorithm.

| Observations | Independent vertices: E* | Known rigid triangle: E* | Effect of knowing the shape |
|---|---:|---:|---|
| All three equally precise | Approximately 0.001490712063 | Exactly the same value | **Zero improvement**, proved analytically |
| Third vertex has ten times the squared-range error bound | Approximately 0.014907198060 | **[0.00446328277, 0.00446338278]** | **70.0588%–70.0596% less error** |

The displayed rigid interval and percentage limits are rounded outward. For the independent cases we obtained an exact closed-form expression, with separate complete-cover checks. For the rigid lossy case the numerical uncertainty in E* is below `10^-7` coordinate units. It would be incorrect to describe this certification precision as the instrument's resolution or the position error of the whole shape.

If one coordinate unit were a meter, the lossy comparison would be about **14.91 mm versus 4.46 mm** of unavoidable error in this external distance. The assumed squared-range tolerances would then have units of square meters.

## Why the two results differ

With equal measurement precision, both extreme independent-point distances can still be realized by translating the entire rigid triangle vertically. The shape therefore removes some configurations without removing either target extreme. We prove this directly; matching optimization results alone would not establish it.

With the third vertex less precisely observed, its shape relationship to the two better-measured vertices narrows its possible target distances. The weaker readings have a separate role: they rule out a reflected triangle. After that alternative is excluded, the first two vertices already constrain the remaining orientation so tightly that the weak readings do not further narrow it.

This distinguishes **selecting the right geometric configuration** from **improving precision within that configuration**. A reading can be useful for the first purpose while adding nothing to the second.

The general elementary statement is:

> For a nonempty compact feasible set and a continuous scalar target, a correct closed shape restriction cannot increase the minimum worst-case error. It gives exactly zero improvement if and only if both original target extremes remain attainable.

The proof and a formula expressing the improvement through the movement of the two endpoints are in `RIGID_TRIANGLE_PROOFS.md`. This is a consequence of set inclusion, not a new universal recovery law.

## A shared-anchor obstacle is now explicit

Extending our earlier one-point formulas independently to every vertex would allow different actual locations for one physical uncertain anchor. Even checking every pair of vertices does not fix this.

We constructed an exact example in which **each pair of three readings is realizable by an anchor inside its uncertainty disk, but all three readings together are impossible**. The contradiction persists for small nonzero observation intervals.

For a fixed noncollinear candidate triangle, subtracting squared-range equations gives one possible shared-anchor location:

\[
a=B^{-1}k(t).
\]

It is feasible exactly when it also satisfies one original squared-range equation and the anchor's uncertainty disk. For interval readings this becomes a coupled quadratic condition, which must be retained. The companion `SHARED_ANCHOR_AND_RADIUS_THEOREMS.md` gives the construction, proofs, collinear cases, and perturbation bound.

The triangle's area appears in the determinant of B, explaining sensitivity of this particular anchor-reconstruction step near collinearity. This does not establish that every nearly flat known triangle is poorly localized: two distinct labeled planar body vertices already determine its rigid pose when their positions are exact. The target and observation model still matter.

## Short arcs give a sharp loss-of-information threshold

With an exact chord of length `ell=2a` and a minor sagitta h,

\[
R(h)=\frac{a^2+h^2}{2h}.
\]

If the observed height is `h0 +/- epsilon`, a finite upper radius bound exists only if the permitted positive heights stay away from zero. At `epsilon>=h0`, arbitrarily large radii fit the allowed data.

For a fully minor-sagitta interval with `0<=epsilon<h0` and `h0+epsilon<=a`, the exact minimum worst-case radius error is

\[
\boxed{E_R=\frac{\epsilon(a^2-h_0^2+\epsilon^2)}{2(h_0^2-\epsilon^2)}.}
\]

For a two-unit chord and height `0.010 +/- 0.001`, the feasible radius interval is approximately **[45.46005, 55.56006]**. This is an illustrative rounded interval; the exact endpoints are `1000121/22000` and `1000081/18000`. Better computation cannot select a more precise radius guaranteed for every allowed height.

If the same synthetic circle of radius R0 is observed over progressively shorter chords, the cutoff is

\[
\boxed{\ell_{\rm critical}=2\sqrt{2R_0\epsilon-\epsilon^2}.}
\]

Here R0 only generates the synthetic observations; it is not supplied as a recovery prior. For `R0=50.005` and `epsilon=0.001`, the cutoff is approximately **0.632483991892** coordinate units. At or below it the upper radius bound is infinite. The exact computations and several chord lengths are recorded in `short_arc_threshold_certificate.json`.

Curvature, `1/R`, remains bounded as the permitted height approaches zero. Loss of radius resolution therefore does not imply the same loss for every geometric property.

## What is established and what remains

The record now contains an exact point formula for this anchor layout, an exact example of zero benefit from rigidity, a certified positive benefit in the lossy case, a precise shared-anchor consistency obstruction and reduction, and a closed-form arc radius limit. The figure `shape_recovery_comparison.png` summarizes the two numerical experiments.

The numerical triangle experiment deliberately uses calibrated anchors and exact side lengths. Its result should not be transferred to the earlier uncertain-anchor, unknown-scale model without solving the coupled constraints. There are also no guarantees here for incorrect shape priors, unlabeled vertices, arbitrary nonrigid objects, or unmodeled instrument errors.

The most useful next test is **shape tolerance**: relax the exact side lengths by known manufacturing or deformation bounds and determine how much of the 70% improvement survives. The shared-anchor reduction then provides a principled route to bringing anchor uncertainty back into the rigid-shape problem. These tests address whether the benefit survives realistic uncertainty rather than adding more idealized shape identities.

## Prior work and validation

Known rigid geometry is an established source of localization information; [Chepuri, Leus, and van der Veen](https://arxiv.org/abs/1307.6476) formulate common rotation and translation from range measurements. [Hopp's NIST report](https://www.nist.gov/publications/sensitivity-three-point-circle-fitting) analyzes sensitivity of three-point circle fitting under small random point errors. The present fixed-chord bounded-height model has different assumptions. We make no novelty claim for these underlying principles.

The package contains rational feasible witnesses, complete integer cover trees, a verifier implemented separately from the generator, exact checks of the shared-anchor and arc formulas, and the proofs above. Floating optimization is used only to propose witnesses; original measurement constraints and cover decisions are checked with exact arithmetic. `RIGID_TRIANGLE_INDEPENDENT_REVIEW.md` and the validation JSON files report the completed checks. These are auditable mathematical computations, not proof-assistant formalization.
