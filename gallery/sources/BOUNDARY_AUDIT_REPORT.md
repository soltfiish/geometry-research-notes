# Scale-cap audit and a solved shared-anchor boundary

**GCS-FINITE-BOUNDARY-013 — 2026-09-06**

We now have an exact recovery-error formula for one specified rigid-triangle model, a complete classification of its feasible configurations, and a concrete failure of the earlier first-order escape test. The partial-scale intersection theorem survives the audit; several reach and threshold claims need narrower hypotheses.

## What changed

The scale cap can affect a direction that never escapes. With anchors (-1,0),(1,0), common anchor radius 1/2, exact common readings one, lower scale 1/10, and upper scale b>=1/2, the reach along x=(t,0) is exactly

\[
T_b=\min(1/2,b-1/2).
\]

It depends on b before saturating. On an eventually feasible ray, the large-cap linear law is valid, and can be sharpened to the exact exit from the intersection of the upper-range balls for sufficiently large caps. Critical directions and a ray's chosen origin need separate treatment. The old profile threshold is a property of the uncapped model; a finite upper scale bound always changes physical boundedness.

The audit also corrects the missing nonnegative clamp in the general-reading profile and the claim about zero lower readings. General reading intervals without an exact reference require a common-interval classification before the earlier directional formula can be reused. See PARTIAL_SCALE_INDEPENDENT_REVIEW.md.

## A complete model-specific answer to the resolution question

Take a known planar right triangle with leg lengths L and H. Two uncertain anchors each observe its first two vertices at one common unknown range r. A fifth observation says that the third vertex is no farther from anchor 0 than r. Actual anchors are shared across their incident observations.

Let D_0 be the separation of the nominal anchor centers, and e the sum of their uncertainty radii. Then:

| Anchor uncertainty and shape | Exact result |
|---|---|
| D_0>e and D_0+e>=H | Nonempty bounded configurations, with an exact finite range interval |
| D_0>e and D_0+e<H | No feasible configuration |
| D_0<=e | Unbounded configurations, including when the disks just touch |

In the nonempty bounded case define D_-=max(H,D_0-e) and D_+=D_0+e. The complete possible range interval is

\[
r\in\left[\frac{\sqrt{L^2+D_-^2}}2,\
\frac{\sqrt{L^2+D_+^2}}2\right].
\]

The smallest achievable worst-case absolute error is exactly

\[
\boxed{E_r=\frac{\sqrt{L^2+D_+^2}-\sqrt{L^2+D_-^2}}4.}
\]

Both endpoints have physical realizations, so this is a sharp recovery limit. When the disks intersect, r instead fills [sqrt(L^2+H^2)/2,infinity), and no finite absolute-error guarantee is possible.

For unit legs and nominal anchors (-1,0),(1,0), common radius delta<1 keeps the body bounded. At delta=1 a new unbounded branch appears because the two actual anchors can coincide. The finite error does not diverge on approach to this threshold: its limit from below is (sqrt(17)-sqrt(2))/4.

The accompanying figure finite_boundary_geometry.png illustrates the two exact-anchor poses, the unbounded branch at contact, and the sharp reference-range error below contact.

## Why the first-order test missed it

The four equal observations imply an exact orthogonality condition between a body edge and the actual anchor separation. In the plane, distinct anchors then fix the midpoint of that body edge. The first-order pooled projection test loses this condition through cancellation and can accept a false escape direction even when the feasible set is nonempty and bounded.

The new fixed-ray theorem keeps both the linear and constant terms of the squared-range difference. It is necessary and sufficient when orientation, anchors, and ray offset are fixed. An exact quadratic formulation also retains all shared-anchor coupling for a variable pose, but it is not yet an efficient general solver or a closed-form characterization for arbitrary graphs.

## What this does and does not establish

The triangle result is planar and uses the specified exact equality readings. Its overlap construction assumes the uncertainty model permits coincident actual anchors. In three dimensions, an additional translation direction defeats this particular boundedness result.

The equality assumption matters directly to lossy-data recovery. Widen the three nonreference equality readings to any positive symmetric ratio tolerance, keep the upper fifth reading, and an explicit escaping family exists even with exact anchors. Its onset distance is asymptotic to sqrt(3/(2 epsilon)) as the ratio tolerance epsilon tends to zero. A finite physical scale bound or other additional information is therefore needed to obtain a finite guarantee for that widened example.

These results solve a meaningful special case and identify information discarded by a cheaper test. They do not establish a new general theory of resolution, literature priority, or a computational advantage over existing guaranteed methods.

## Verification and next bounded task

MIXED_BOUNDARY_TRIANGLE_THEOREM.md contains the proofs. The executable checks verify original physical distances, uncertainty disks, shape constraints, polynomial identities, and deliberately invalid witnesses. The scale audit independently compares its formula with exact one-dimensional optimization, including zero reading bounds. BOUNDARY_AUDIT_README.md gives reproduction commands and artifact names; boundary_audit_validation.json records the fresh-directory reproduction.

The next mathematical task is a certified finite-cap version of the widened-ratio triangle, retaining the shared-anchor four-link constraint. It connects the exact boundary result to lossy observations. The parallel literature task should continue the imprecise-points comparison and distinguish our model-specific consequences from established annulus and distance-geometry identities.
