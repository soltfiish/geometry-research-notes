# Refined recovery limits and a general theorem about the feasible space

**Checkpoint GCS-REFINEMENT-005 · 5 September 2026**

We closed the uncertain-anchor error bracket to less than `10^-7` units in all three worked cases. We also obtained an explicit general formula for the minimum anchor uncertainty needed to make a proposed point feasible. It applies to any number of anchors in any nontrivial real normed space, under the stated one-point, common-reference, independent-ball model. A further Euclidean theorem explains when feasible locations can escape arbitrarily far away.

These are established results within this project, supported by written proofs and exact checks. Originality relative to the literature remains unestablished. The numerical implementation is still a bounded planar research solver, with broader mathematical statements distinguished below.

## 1. The refinement is now quantitatively resolved

The example uses nominal anchors `(1,0),(0,1),(-1,0),(3,2)`, independent anchor uncertainty balls of common radius `delta`, and a fixed target at the origin. Squared-range ratios relative to the first actual anchor are centered at `(1,2.6,0.2)` with absolute tolerance `0.01`.

| Anchor radius | Previous bracket for optimal worst-case error | Refined bracket, rounded outward |
|---:|---|---|
| 0.001 | approximately `[0.02045414,0.02173114]` | `[0.02170820696,0.02170830697]` |
| 0.01 | approximately `[0.02945414,0.04259247]` | `[0.04200548732,0.04200558733]` |
| 0.05 | approximately `[0.06945414,0.14607997]` | `[0.13260021589,0.13260031590]` |

Exact certificate widths are less than `10^-7`; rounded displays are slightly wider. In the central case, the remaining uncertainty about the information limit is more than 100,000 times smaller than before. Most of the previous gap reflected a weak lower bound on unavoidable error.

For `delta=0.01`, every compatible target distance lies in the safely rounded outer interval `[2.7874950642,2.8715062389]`. Reporting approximately `2.82950065155` guarantees worst-case error at most `0.04200558733`. Conversely, explicit compatible geometries prove that no scalar estimator can guarantee error below `0.04200548732` for these observations and assumptions.

If coordinate units are meters, this is an optimal guaranteed distance error of approximately **4.20055 cm**, given 1 cm anchor uncertainty and the specified ratio tolerance. The fine numerical bracket measures how precisely we know that limit. It does not make the reconstructed point itself accurate to `10^-7` meters.

The proof covers the whole feasible plane: a derived root bound contains every permitted point, and a finite tree proves each subregion either infeasible or harmless to the final target bounds. Feasible anchor configurations supply the opposite bounds. A separate verifier checks all 3,503 tree nodes across the three cases using exact integer and rational arithmetic, without importing the generator or trusting numerical optimization.

## 2. A concrete gap formula

Let `d_i(x)=||x-c_i||` be nominal anchor ranges, `alpha_i=sqrt(L_i)` and `beta_i=sqrt(U_i)`. Include the reference index with `alpha_0=beta_0=1`. Then

\[
\boxed{\Delta(x)=\max\left(0,
\max_{i,j:\alpha_i+\beta_j>0}
\frac{\alpha_i d_j(x)-\beta_j d_i(x)}{\alpha_i+\beta_j}\right).}
\]

With at least two distinct nominal centers, `Delta(x)` is exactly the **smallest common anchor-position uncertainty radius that makes point `x` compatible with all the readings**. Equivalently,

\[
\boxed{F_\delta=\{x:\Delta(x)\le\delta\}.}
\]

This gives a concrete form of the gap function we were seeking. It measures compatibility in anchor-position units. It is not automatically the distance from `x` to the true point or to the exact-data feasible set. The full theorem covers zero interval endpoints and the exceptional case where all centers coincide with the point and a zero reference range would otherwise be admitted.

The same proof works in any nontrivial real normed space when distance and anchor uncertainty use the same norm. Every anchor must remain independent and provide one range to the single unknown point. Shared uncertain anchors across multiple unknown points introduce additional joint constraints.

## 3. Useful properties of the space

The profile has a sharp continuity bound:

\[
|\Delta(x)-\Delta(y)|\le\|x-y\|.
\]

Moving a proposed point by `h` changes the minimum required anchor uncertainty by at most `h`. Therefore a point with `Delta(x)<delta` has a certified feasible neighborhood of radius `delta-Delta(x)`. A sufficiently large profile value can also reject an entire nearby region.

This continuity does not imply that the feasible region is convex or that `Delta` measures ordinary distance to it. For two anchors `(0,0),(2,0)` with equal-range data, `Delta(0,1.5)=0.5`, while the point's distance from the exact feasible line `x=1` is one. Farther along the vertical direction, the required anchor uncertainty tends to zero while distance from that line stays one. The log records this counterexample to a tempting but false interpretation.

The formula also identifies a pair of range constraints sufficient to explain a proposed point's incompatibility. That is a local explanation at a fixed point; it does not mean two readings alone determine an entire geometry.

## 4. When distance can become unbounded

Two structural results help classify the feasible space.

**If any ratio interval excludes one**, the profile grows linearly at large distances. More precisely, with `a=max alpha_i`, `b=min beta_i`, and `kappa=(a-b)/(a+b)>0`,

\[
|\Delta(x)-\kappa\|x-o\||\le\max_i\|c_i-o\|.
\]

Every fixed uncertainty sublevel is consequently bounded. In finite dimensions it is compact under the positive-reference qualifications.

**If all intervals contain one**, anchor shape and which interval endpoints equal one determine a sharper threshold. The far-field theorem defines a directional function whose minimum `gamma` separates bounded sublevels (`delta<gamma`) from unbounded ones (`delta>gamma`). Equality needs separate treatment.

For all readings exactly equal, the result becomes particularly geometric:

\[
\boxed{\gamma=\tfrac12\text{ minimum width of the anchor convex hull}.}
\]

For anchors `(0,0),(2,0),(0,2)`, exact equal-range data gives the unique nominal point `(1,1)`. The escape threshold is `1/sqrt(2)`, whereas the radius at which **every point in the plane** becomes feasible is the larger value `sqrt(2)`, half the anchor diameter. The two thresholds answer different questions and are both proved.

If every nonreference ratio interval contains one strictly, even the nominal feasible set contains all sufficiently distant points. Thus sufficiently lossy, nearly equal readings can remove all finite upper bounds on location, even with many anchors. Calibration geometry alone cannot overcome that ambiguity.

![Two illustrations of the feasible space](feasible_space.png)

The plot uses numerical contours for explanation. The endpoint guarantees come from the exact certificates.

## 5. What this completes, and what follows

This stage completes the three uncertain-anchor benchmark refinements to the chosen precision and establishes a dimension-independent common-radius profile theorem, its boundary cases, and several geometric consequences. The finite-cover certificate theorem is general; its implementation has fixed precision and supported input conditions. A separate convergence theorem states the additional witness-density and converging-arithmetic assumptions needed for an arbitrary-accuracy algorithm.

The next substantial generalization is several unknown points with shared uncertain anchors or calibration variables. The main issue is preserving those shared choices. Testing each edge independently can admit impossible geometries, as the previous shared-reference example already showed. The current exact profile should be treated as a solved building block for that extension.

Useful findings are retained in `SPACE_FINDINGS_LOG.md`, with proved statements, counterexamples, and unresolved questions distinguished. No theorem here is presented as a completed theory of every instrument or every loss mechanism.

## 6. Verification and relation to existing work

The independent verifier accepted all three complete covering trees and rejected four deliberately corrupted certificates. The common-radius theorem has 1,078 exact checks, including comparison against an independently solved rational linear program. A further 22 exact algebraic checks accompany the far-field examples and limiting identities. The written arguments establish the general statements; finite computations alone do not prove them.

The approach builds on established set inversion and bounded-error estimation, including [Jaulin and Walter's interval-analysis method](https://webperso.ensta.fr/Jaulin/paper_automatica93.pdf). The distinction between a constraint residual and distance to a solution set is also central to existing [error-bound theory](https://epubs.siam.org/doi/10.1137/0804021). Our present contribution to this project is the explicit model reduction, proved structural consequences, and portable verified calculations. A novelty or comparative-performance claim would need a separate, focused literature comparison.

See `REFINEMENT_PROOFS.md`, `RECOVERY_SPACE_THEOREM.md`, `FAR_FIELD_THEOREM.md`, and `REFINEMENT_README.md` for details and reproduction.
