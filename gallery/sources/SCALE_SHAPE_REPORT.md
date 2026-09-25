# Partial scale knowledge, shape tolerance, and the handoff review

**GCS-SCALE-SHAPE-009 — 2026-09-05**

The handoff and its update point toward useful extensions. This checkpoint completes an exact formula for partial reference-range knowledge, establishes two contrasting rigid-shape boundedness results, and tests the previously observed shape benefit when side lengths are imperfect. It also records corrections to the supplied literature and escape-set notes. Earlier checkpoint files are preserved.

## 1. Partial reference-range knowledge has a closed formula

Let `d_i(x)=||x-c_i||`, let the permitted ordinary range ratios be `[alpha_i,beta_i]`, and let the actual positive reference distance r now satisfy `0<a<=r<=b<infinity`. With independently movable anchors and a common displacement radius, the exact new profile is

\[
\boxed{\Delta_{[a,b]}(x)=\max\left\{
\Delta(x),\max_i(\alpha_i a-d_i(x)),\max_i(d_i(x)-\beta_i b)
\right\}.}
\]

Thus we can retain the previous profile and add the two constraints supplied by the reference interval. The proof is exact interval intersection, including zero observation bounds; it is not an asymptotic approximation.

Its simplest consequence is

\[
\boxed{\|x-c_0\|\le b+\delta.}
\]

Any finite upper reference-range bound prevents escape, regardless of anchor layout. A lower bound alone does not: its added profile terms vanish outside a sufficiently large region. The geometric work remaining after an upper cap is therefore about the tight size and structure of the feasible set, rather than another escape threshold.

For example, two exact anchors `(0,0),(2,0)` with ratio one and r in `[2,3]` give the two disjoint segments `x=1`, `sqrt(3)<=|y|<=sqrt(8)`. Partial scale knowledge can produce a bounded but disconnected feasible set.

Here r is a physical reference distance. A prior on a different instrument parameter must first be mapped through that instrument's model; it is not automatically the same constraint.

## 2. Shape helps boundedness in some ratio regimes and cannot in others

Consider a known body `X_k=t+Qv_k`, with all readings using one global reference range and each uncertain anchor retained as one shared physical point.

| Ratio information | Result |
|---|---|
| Every nonreference interval strictly contains one | Every sufficiently distant translation is feasible, uniformly over orientation, using even the nominal anchors. A rigid shape cannot restore boundedness here. |
| Some interval excludes one | Its separation from one gives an explicit finite reference-range bound. |
| One shared anchor is exactly equidistant from a known full-dimensional simplex | The anchor is the simplex's circumcenter, which bounds the body's translation. |
| Mixed one-sided bounds or exact equalities | A coupled first-order condition is available; full boundary consistency remains necessary. |

For the last row, the correct pooled variables include **one projected location per physical anchor**, shared across its incident readings, plus the common body orientation. Independent copies for each vertex would discard the constraint that produced the shared-anchor counterexample in checkpoint 007.

The full proofs state a necessary first-order condition and a strict-slack sufficiency result. They do not claim to have solved every boundary case. The reference convention is also explicit: giving each vertex its own unrelated scale changes the problem.

## 3. The triangle benefit survives small side errors

We retained the calibrated lossy-triangle observations from checkpoint 007 and allowed each ordinary side length to differ from nominal by a relative tolerance tau. The target remains one unmeasured external distance, and the anchor positions remain exact. These results concern that controlled experiment, not the free-reference ratio model above.

| Maximum error in each side length | Guaranteed reduction in recovery error relative to independent points |
|---|---:|
| Exact lengths | About 70.06% |
| ±0.01% | At least **60.64%** |
| ±0.1% | At least **44.27%** |
| ±0.25% | At least **16.86%** |
| ±0.5% or ±1% | Current bounds do not settle whether a strict benefit remains |
| ±2% | **Exactly zero benefit**, proved by endpoint attainment |

The lower percentages are rounded down. The intermediate bounds are conservative, not sharp computed optima. At ±0.1%, for example, the unavoidable distance error is enclosed by `[0.00546328277,0.00830678214]` coordinate units, with endpoints rounded outward. The independent-point value is about `0.01490719806`.

At ±2%, both extreme distances from the independent model are attained by triangles satisfying all side tolerances and measurements. That proves exact equality of the recovery errors. Two percent is a sufficient no-gain tolerance; the smallest such tolerance has not been determined.

The certificate checks all nine original squared-range observations and all three ordinary side tolerances for every rational witness. It encloses the possible geometry, excludes the reflected branch, and obtains conservative target bounds. The exact rigid upper bound at tau zero is inherited from the authenticated, already audited checkpoint 007 certificate.

## 4. What changes in the supplied handoff and update

The updated escape note already preserves the strict/non-strict direction distinction. That is correct and should remain. Four further qualifications are recorded in the companion proofs:

- The polyhedral weak set is an outer set for actual escape directions; boundary directions need more information.
- The scaled-polar formula requires positive delta. At zero, a separate zero-support formula is needed.
- Recession directions give a sufficient side-prior test for closed convex priors. Arbitrary closed priors require asymptotic directions, and the test is not a general equivalence.
- The same anchor hull can have different critical-level feasibility after an interior anchor is added. The far-field support function alone loses that information.

The literature review preserves our proved threshold while correcting the priority argument. Annulus minimization and sublevel boundedness are different questions, but this distinction alone cannot establish novelty. Prior work explicitly treats centers at infinity and also relates bounded point perturbations to annulus-width thresholds. The exact general `A,B` interval theorem has not been matched in this bounded review; its priority remains unresolved. [AAHS, §2](https://sarielhp.org/p/98/mw_annul/min_width_annulus.pdf), [Bandyopadhyay–Snoeyink, §3](https://cglab.ca/~morin/sydney-workshop/summaries/p-bandyopadhyay-snoeyink-almost-delaunay-simplices.pdf).

The March 2026 directional paper is by Giuseppe C. Calafiore. Its rank condition concerns a polyhedral outer approximation; the absolute-range balls bound the physical set independently. This corrects the supplied comparison table. [Paper, §§II–III](https://arxiv.org/html/2603.14263).

`LITERATURE_COLLISION_REVIEW.md` supplies the detailed source comparisons, checks the Denkovski paper beyond its abstract, and distinguishes statistical CRLB/protection levels from hard feasible-set guarantees. The circle-sagitta calculation remains a classical, separately modeled explanatory example; it is not evidence of a new universal resolution law.

## 5. What is complete and what remains useful

The partial-reference profile is proved for the stated one-point independent-anchor model. The shape theorems give exact conclusions for explicit ratio regimes. The side-tolerance experiment has certified, independently checked bounds. The mixed-boundary shared-anchor pose problem remains open in this record.

That mixed problem is now a more precise next target: quantify the gap between the necessary shared-projection conditions and actual finite-range consistency, then obtain sharp target bounds under a finite reference cap. This retains the user's general-theory direction while keeping instrument assumptions and established prior methods visible.

The source package contains the proofs, exact certificates, independent side audit, literature review, and the comparison figure. `scale_shape_package_validation.json` records integrity and reproduction of this checkpoint. The verification scripts distinguish finite computational checks from general written proofs; no originality or proof-assistant formalization is claimed.
