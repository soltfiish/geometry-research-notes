# Which planar pictures can revolve into a 3D feasible set?

6 September 2026. Elementary Euclidean corollaries for the gallery; no novelty claim. These extend the stated example models and do not replace their planar conclusions.

## 1. The rotation must preserve the observations

Place two fixed anchors on the x axis. Rotation by angle θ about that axis sends

`(x, y, z) → (x, y cos θ − z sin θ, y sin θ + z cos θ)`.

For any fixed anchor `(c, 0, 0)`, the squared distance is

`(x − c)² + y² + z²`,

which is unchanged. Applying the same rotation to every vertex of a body also preserves all its side lengths. Thus range measurements to anchors on the axis cannot distinguish these rotated configurations. Range ratios and common-range caps are preserved as well.

The same argument applies to independent isotropic anchor uncertainty balls when their nominal centers lie on the axis, provided actual anchors rotate with the candidate configuration. It does not justify holding arbitrary off-axis actual anchors fixed while rotating only the body. Additional off-axis observations or orientation priors can break the symmetry. A target distance to a separate off-axis point need not remain constant.

Camera orbit is a separate operation: it changes how an unchanged configuration is viewed. The gallery's angle controls below change the physical coordinates while keeping the reference anchors fixed.

## 2. Two planar segments become one connected annulus

For exact anchors `(0,0,0)` and `(2,0,0)`, equal ranges require

`x² + y² + z² = (x − 2)² + y² + z²`, hence `x = 1`.

Adding a positive common-range bracket `0 < a ≤ r ≤ b` gives the complete set

`F = {(1,y,z) : a² ≤ 1 + y² + z² ≤ b²}`.

If `b < 1`, the set is empty. Otherwise, put

`ρ_L = sqrt(max(0, a² − 1))`, `ρ_U = sqrt(b² − 1)`.

The complete 3D solution set is the planar annulus `x = 1`, `ρ_L ≤ sqrt(y²+z²) ≤ ρ_U`. It becomes a disk when `ρ_L = 0`, a circle when `ρ_L = ρ_U > 0`, and a point when both radii are zero. It is always connected when nonempty. An explicit parametrization is

`(1, ρ cos θ, ρ sin θ)`, with `ρ_L ≤ ρ ≤ ρ_U`, `0 ≤ θ ≤ 2π`.

At `a = 2, b = 3`, the original planar restriction `z = 0` has two disconnected segments, `sqrt(3) ≤ |y| ≤ sqrt(8)`. Rotating those segments around the anchor axis fills one connected annulus. This is a flat sheet in the plane perpendicular to the anchor axis, not a solid torus or a thick volume.

The prior planar disconnectedness result remains correct. Changing the allowed ambient space changes the feasible set and can change its connectedness.

## 3. The third anchor in the escape exhibit prevents this revolution

Keep the exact nominal anchors `(0,0,0)`, `(2,0,0)`, `(0,2,0)` fixed. The candidate `(1,1,0)` is equidistant from all three. Rotating it about the first two anchors' axis gives

`X(θ) = (1, cos θ, sin θ)`.

The first two squared ranges remain `2`; the third is `6 − 4 cos θ`. At a quarter turn the third squared range is `6`, so the rotated candidate no longer satisfies exact equal ranges. With independent anchor balls of common radius δ, its equal-range profile is exactly

`Δ(X(θ)) = (sqrt(6 − 4 cos θ) − sqrt(2))/2`.

This is zero only when `θ` is a multiple of a full turn. It is approximately `0.517638` at a quarter turn. This demonstrates why the three-anchor planar picture cannot simply be revolved around the first anchor pair with all anchors held fixed.

The correct 3D equal-range set at δ = 0 is instead the full line `(1,1,z)`, because subtracting the squared range equations forces `x = y = 1` and leaves `z` free. Every point on this line has squared common range `2 + z²`. It is unbounded even at zero tolerance.

Consequently this layout has 3D far-field threshold `γ = 0`, compared with its planar threshold `1/sqrt(2)`. At positive δ the gallery recomputes the profile using genuine three-dimensional distances. The displayed grid is a finite sample, not a certified full boundary. The exact equal-range line is displayed separately. Reflection across the anchor plane is a symmetry, but full axial rotation is not.

## 4. A rigid triangle can also turn around the anchor line

Use the three-dimensional family already established in `MIXED_BOUNDARY_TRIANGLE_THEOREM.md`:

`X0 = (0, −1/2, T)`, `X1 = (0, 1/2, T)`, `X2 = (−1, −1/2, T)`,

with exact fixed anchors `(−1,0,0)` and `(1,0,0)`. Apply the rotation from section 1 to all three vertices. Every angle preserves the side lengths `1, 1, sqrt(2)`, four common squared ranges `5/4 + T²`, and fifth squared range `1/4 + T²`.

For fixed T, rotation changes pose without changing any of these absolute ranges. Increasing T then makes the common range arbitrarily large while preserving the required equalities and inequality. These are two different freedoms. T is the lift *before* rotation; after rotation it is not each vertex's z coordinate.

At T = 0, a half turn joins the two placements shown as separate answers in the planar pose exhibit through a continuous family of 3D poses. Intermediate rotations leave the original plane, which is why this does not contradict the two-pose planar result.

## Verification

`work/gallery/verify_rotation.py` checks the symbolic distance identities, rational rotations of physical triangle witnesses, the annular range formulas, and the off-axis third-anchor obstruction. The finite checks audit the formulas; the arguments above establish their stated scope. The saved output is `rotation_geometry_checks.json`.
