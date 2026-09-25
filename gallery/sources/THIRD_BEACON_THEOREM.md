# A prospective measurement that can be valued before it is taken

GCS-MEASUREMENT-SHAPES-015 · 6 September 2026.

## Model and quantified question

Use the checkpoint-014 planar rigid triangle with vertices `X0,X1,X2` and squared sides 1,1,2. Actual shared anchors a0,a1 lie in radius-δ disks centered at `(-1,0),(1,0)`. The reference range is `r=||X0-a0||`, with `0<r≤10`. The three ranges `||X0-a1||,||X1-a0||,||X1-a1||` each lie in `[.99r,1.01r]`, and `||X2-a0||≤r`. The prior pose class is O(2), including reflections.

The prospective extra measurement is an **absolute** range `h=||X0-c||` to a fixed exact beacon c, with additive error at most η. The target remains r. We seek the optimal worst absolute target error **over every possible future reading**, not only a favorable outcome.

The classical scalar common-outcome rule reduces the answer to half the largest reference-range separation of two prior feasible states whose new readings differ by at most 2η. See `GENERAL_RECOVERY_FRAMEWORK.md` for the rule, attribution, and its distinction from full-pose recovery.

## Certified results

| Actual-anchor uncertainty δ | New beacon c | New reading error η | Certified optimal error for r |
|---:|---|---:|---|
| 0 | (0,2) | .01 | [0.059674665323810126, 0.05967516685944878] |
| .05 | (0,2) | .01 | [0.10944448988566313, 0.10944500137348838] |
| .05 | (0,1) | 0 | [1.0278667971199238, 1.0278670465837074] |
| .05 | (0,1) | .01 | [1.0278667971199238, 1.0278670465837074] |

The displayed decimals approximate outward rational certificate endpoints; use the JSON rationals for exact bounds. With δ=.05 and no new measurement, the prior error is in `[4.467218327117394,4.467218377641853]`. A direct measurement of r with ±.01 noise has exact optimal error .01 for this prior family, as proved in 014. This is a different instrument, whose availability and cost have not been assumed.

The `(0,1)` obstruction has a pair of poses with the same positive chirality. It survives restricting the model to orientation-preserving rigid motions. The `(0,2)` matching pairs in this packet use both chiralities: their upper bounds apply to the restricted class, but their lower bounds have not been proved for that restriction.

## Proof of the global upper bounds at (0,2)

Checkpoint 014 supplies complete rational cover certificates confining r to a near outer window and a far outer window. In the δ=.05 case the near upper bound is below 1.171772144 and the far lower bound is above 7.944265906. These are enclosing windows; this argument does not assume that every value inside them is feasible.

Write c=(0,k), and let A,C be the distances of X0 to the two **nominal** anchors. The reverse triangle inequality gives

\[
 A\in[r-\delta,r+\delta],\qquad
 C\in[(1-\epsilon)r-\delta,(1+\epsilon)r+\delta],\quad\epsilon=.01. \tag{1}
\]

The argument uses these relaxed constraints for X0; it never assigns separate physical copies to a shared anchor. Put `X0=(X,sY)`, Y>0, s=±1. Intersecting its two nominal-radius circles gives

\[
 X=(A^2-C^2)/4,\quad Y=\sqrt{A^2-(X+1)^2},
\]

\[
 h^2=(A^2+C^2)/2+k^2-1-2ksY. \tag{2}
\]

On the entire far range domain `[f,B]`, let

\[
 x_*=[(2\epsilon+\epsilon^2)B^2+2\delta(2+\epsilon)B]/4,
 \qquad y_*^2=(f-\delta)^2-(1+x_*)^2.
\]

Exact arithmetic verifies `|X|≤x_*` and `Y²≥y_*²>k²(1+x_*)²` for k=2, B=10 and both tested δ. Thus

\[
 \partial_{A^2}h^2=\tfrac12-\frac{ks(1-X)}{2Y}>0,
 \quad
 \partial_{C^2}h^2=\tfrac12-\frac{ks(1+X)}{2Y}>0. \tag{3}
\]

Define `H_(s,edge)(r)` by substituting `A=r+edge δ` and `C=(1+edge ε)r+edge δ` into (2), for edge=−1,+1. These are lower/upper reading envelopes. All such corner circles intersect throughout the domain, and the bounds ensure nonzero Y; (3) also makes each envelope increasing in r.

Three certified separations reduce the problem to one variable:

1. A near state and a far state cannot share a new reading, because `|h-r|≤sqrt(1+k²)+δ` and the range-window gap exceeds twice that bound plus 2η.
2. The two far signs cannot share a reading, because `H_(-1,-1)(f)-H_(+1,+1)(B)>2η`.
3. For same-sign states with `r2≥r1+G`, their readings obey `h2-h1≥H_(s,-1)(r1+G)-H_(s,+1)(r1)`.

A complete rational interval tree on `[f,B-G]` proves the last expression exceeds 2η for each sign, at G equal to twice the tabulated upper risk. The near-window error is smaller than that risk, by 014. This excludes **every** state pair with a larger target gap. The trees have 5,842 nodes for δ=0 and 5,588 nodes for δ=.05.

The interval producer uses outward rational square-root bounds on a 2^52 scale. A separate checker reimplements the arithmetic at 2^64, verifies the conservative 014 inputs, checks every subdivision and rejected leaf, and checks the geometric inequalities above. A floating optimum proposed G but is not acceptance evidence.

## Matching physical lower bounds at (0,2)

`third_beacon_physical_pairs.json` contains two complete states for each δ. Their vertices and actual anchor coordinates are rational. The independent checker verifies:

- each physical anchor is in its allowed nominal disk;
- the rigid squared side lengths are exactly 1,1,2;
- all three ratio inequalities, the fifth upper inequality, and the reference cap hold;
- a saved common observation lies within .01 of both new absolute ranges; and
- the actual reference-range difference gives the stated lower risk.

Only rational comparisons and outward square-root bounds accept these pairs. Their risks are within 5.12×10^-7 of the global upper bounds. The near-optimal ambiguity is physically realizable, not merely an artifact of the X0 annulus relaxation.

## Exact ambiguity at (0,1)

Take the rational `same_min` witness from 014 with δ=.05, ε=.01. Its reference range is approximately 7.944266405760152 and X0 is below the nominal anchor line. Let

\[
 H=\|X_0-(0,1)\|^2,\qquad S=(100-H)/2,\qquad Q=199-2S-S^2>0.
\]

Construct a second state using exact anchors `(-1,0),(1,0)` and

\[
 X'_0=((S-1-\sqrt Q)/2,(S+1+\sqrt Q)/2),
 \quad X'_1=X'_0+(-1,0),\quad X'_2=X'_0+(0,-1).
\]

Algebra gives `||X'_0-(-1,0)||²=100` and `||X'_0-(0,1)||²=H` exactly. Both triangles have the same positive chirality. The remaining inequalities are verified in the quadratic field `Q(sqrt(Q))` with exact rational coefficient operations and outward sign bounds at 2^160. They are saved in `third_beacon_placement_counterexample.json`.

Thus the two states have the **identical exact** new reading, approximately 8.9266 (the JSON supplies its exact squared value), but their reference ranges differ by approximately 2.05573359. This proves the lower error bound even for η=0. The `(0,1)` measurement separates the prior near/far windows for η≤.01, so half the full far outer-window span is an upper bound. The two bounds differ by less than 2.50×10^-7.

It is therefore false that any off-line third beacon eliminates the relevant ambiguity in this mixed ratio/uncertain-anchor problem. This does not contradict exact trilateration from three known absolute ranges: our original observations are ratio intervals and the two original anchors may move within their disks.

## What the comparisons establish

For δ=.05, the reverse-triangle bound alone gives the simple generic upper risk `sqrt(5)+.05+.01≈2.2961` for the `(0,2)` measurement. Retaining the prior near/far windows improves it to approximately 1.027867. The envelope certificate and matching physical pair narrow it to approximately .109445. These are three levels of bounds on the same problem, not timings against a published optimized solver.

Moving the extra beacon changes which explanations remain confusable. The two certified placements are a concrete design comparison, not a global placement optimum. Its value also depends on the chosen target, anchor calibration, cap, chirality class, and extra instrument's error semantics.

## Reproduction

Run `python work/measurement_shapes/verify_measurement.py`, followed by `python work/measurement_shapes/beacon_counterexample.py`. The first command rechecks the 014 certificate dependency and all new `(0,2)` certificates and physical pairs; it rejects 12 intentionally damaged records. The second verifies the exact algebraic `(0,1)` construction and rejects a corrupted coordinate. Never use Python's `-O` option: these research checkers use assertions.

The exact checks support the stated rational certificates; the handwritten geometric reduction remains a separate proof obligation. Neither the local optimization nor the gallery is proof evidence.
