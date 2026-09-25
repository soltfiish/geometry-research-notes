# How much geometry survives imperfect measurements?

**Checkpoint GCS-RECOVERY-BOUNDS-003 · 5 September 2026**

We now have a concrete recovery result: **a method that computes the exact smallest and largest possible values of an unmeasured distance in a bounded planar ratio model.** It includes separate alternative geometries and produces a worst-case error guarantee conditional on the measurement assumptions.

The model uses known, calibrated anchors and one unknown point. Its ranges share an unknown gain, which cancels in their ratios. Some distances are missing, and retained squared-distance ratios have bounded errors. This is a first mathematical instance of the intended recovery theory; it is not yet a general instrument or image reconstruction system.

## A numerical answer to “how close can we get?”

Use anchors `(1,0)`, `(0,1)`, `(-1,0)`, and `(3,2)`. The unknown point's nominal location is `(2,2)`, but that coordinate is used only to create a controlled example. The recovery calculation receives ratio intervals. The requested quantity is its **unmeasured distance to `(0,0)`**.

With each retained squared-distance ratio uncertain by **±0.01**:

| Available measurements | Enclosure of the requested distance | Smallest possible worst-case error |
|---|---:|---:|
| Ratios to the first three anchors | 0.34915067–2.86409301 | 1.25747117 |
| Add the ratio to the fourth anchor | 2.80932735–2.84823563 | 0.01945414 |

Enclosure endpoints above are rounded outward. Lengths use the calibrated anchor units. The tolerance is an absolute dimensionless error in **squared-distance ratios**, not a percentage of raw range error. The intervals enclose every feasible target value; they do not assert that every interior value is feasible.

For the four-anchor case, a conveniently rounded guaranteed statement is **2.8288 ±0.0195 anchor units**. The exact endpoints are algebraic expressions, and feasible geometries attaining both are recorded in the certificates. Therefore a smaller worst-case error than the exact half-width cannot be guaranteed from this interval model alone.

![Recovery intervals and error as measurement tolerance grows](C:/Users/ayolu/Documents/Codex/2026-09-05/geometry-research/outputs/recovery_bounds.png)

## A usable formula, plus a sharper exact calculation

For this example, if every squared ratio has tolerance `epsilon`, a simple global enclosure is

\[
\sqrt{\frac{96+5\epsilon}{12+25\epsilon}}
\le d\le
\sqrt{\frac{96-5\epsilon}{12-25\epsilon}},
\qquad 0\le\epsilon<0.48.
\]

This bound follows from a linear reconstruction with a positive scale denominator. It is conservative because some combinations of ratio errors do not fit a real planar geometry. The exact calculation retains that physical consistency and tightens the interval.

The same exact procedure applies to a larger specified class: rational planar anchor positions, finite ratio intervals, a rational target, and a sufficient condition ensuring that the possible point locations are bounded. It examines all relevant circle/line intersections and distance extrema, with exact algebraic feasibility checks. A poor local solution or an unexamined alternative branch cannot silently become a uniqueness certificate.

## What the parallel work added

The known three-anchor inversion ambiguity gives two possible locations. A fourth off-circle anchor separates them in exact data, but two distinctions matter with imperfect measurements:

1. **Separating the exact alternatives does not necessarily separate their uncertainty regions.** At fourth-anchor position `(0,-1.01)`, the two exact predictions are farther apart than twice the new reading's tolerance. Nevertheless, with uncertainty in the original readings, nearby alternatives remain feasible and the target interval stays wide: approximately `0.34915–2.85100`.
2. **The strongest branch separator need not give the best final precision.** In the same controlled comparison, fourth anchor `(0,-2)` gives worst-case distance error about `0.011785`, while `(3,2)` gives about `0.019454`, despite `(3,2)` separating the noiseless alternatives more strongly.

A requested distance may also be exact while the point remains ambiguous. For the two original locations, distance to `(1,1.25)` is exactly `1.25` in both cases. This supports focusing on the quantity the instrument user needs rather than always reconstructing the whole object.

These placement comparisons use the same known nominal reference and the same ratio-error tolerance. They do not establish a universally best anchor or optimize over every possible future observation.

## Evidence and research assessment

Verification passed at **seven noise levels and six fourth-anchor placements**, together with **35 exact ambiguity checks and seven independently designed solver edge cases**. The edge cases include tangent and zero-radius configurations, coincident boundaries, a constant-distance arc, and inconsistent data. Decimal displays and plots do not support the proofs; the certificates use exact arithmetic.

The literature check found a direct precedent for inversion and off-circle uniqueness: [Cox and Partensky's localization paper](https://arxiv.org/abs/physics/0701146). Optimal recovery and bounded-error localization are also established subjects. **This stage establishes a reproducible recovery baseline; it does not establish originality or superiority to existing methods.** The [literature note](RECOVERY_LITERATURE.md) records the overlap.

For the intended direction, the next useful extension is **uncertain anchors and several unknown calibration groups with globally valid bounds**. The present calculations assume exact anchor geometry and a specified ratio-error model. They quantify what those assumptions support; real instrument precision remains to be modeled and tested.

- [Proofs and exact model](RECOVERY_PROOFS.md)
- [Exact recovery certificates](recovery_certificates.json)
- [Supporting ambiguity and measurement analysis](AMBIGUITY_AND_MEASUREMENT_NOTE.md)
- [Validation results](recovery_validation.json)
- [Reproduction instructions](RECOVERY_README.md)
- [Source package](recovery_source.zip)
