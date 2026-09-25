# A faster formulation for a bounded height-uncertainty problem

## Question

Given noisy squared-distance readings and a known region containing a point, how large can the unavoidable error in estimating its height be? This is a worst-case question over admissible states and errors, rather than a prediction of typical measurement noise.

The research examines a circular annular-cylinder region, three known noncollinear anchors at a common height at or above the region's top, a bounded shared additive bias in the squared readings, and separate bounded residuals. These are specific assumptions. The bias is not an ordinary range bias subsequently squared, and separate residual bounds do not imply statistical independence.

## Reformulation

For a technical reading, write the state as x = (w,u), with horizontal position w and height u. The region is r ≤ ||w|| ≤ R and |u| ≤ b. Anchor j has coordinates (d_j,A), with A ≥ b and noncollinear horizontal anchor positions. The measurement model is

```text
y_j = ||w - d_j||² + (u - A)² + β + e_j
|β| ≤ H,   |e_j| ≤ ε_j,   j = 1,2,3.
```

Let U(y) be the set of heights compatible with report y. With unrestricted scalar estimates under absolute loss, the midpoint of the extreme compatible heights minimizes worst-case error for that report. Consequently the global minimax error is

```text
E* = ½ sup over feasible reports y [max U(y) - min U(y)].
```

Equivalently, maximize half the height separation of two admissible physical states that can explain the same report. Each explanation may use its own admissible bias and residuals. This converts an estimation question into a geometric ambiguity problem. The half-separation factor matters: maximum ambiguity diameter and minimax estimation error are different quantities.

The underlying research note gives an equivalent five-variable optimization with nine inequalities, replacing an original formulation with six or seven variables and 17 inequalities. It uses two physical states that can produce the same observations: their height separation determines the unavoidable estimation error. Geometric elimination reduces the search while preserving the optimum under the stated model.

This summary does not supply a standalone proof of that equivalence. General scalar optimal-recovery principles and squared-range differencing are established ideas; publication priority for the specialized reduction remains unresolved.

## Two different comparisons

| Comparison | Scope | Recorded result | Interpretation |
|---|---|---|---|
| Original versus reduced formulation in native IBEX | Six layouts; matched settings, 24 combinations, 120 measured trials and 24 warmups | 52.2–239.3 times faster search; 34.2–130.2 times fewer handled child cells | A formulation benefit inside the same solver on this tested family |
| Compiled six-start SLSQP on original formulation versus reduced IBEX | 32 evaluation entries, representing 26 unique layouts | Heuristic meets the 1% target on all entries; at least twice as fast on 28 entries, or 22 unique layouts | No demonstrated cost advantage for certification over this heuristic at the chosen target |

The first experiment's ratio is not the ratio between IBEX and the heuristic. These are separate comparisons and should not be combined into a single speedup claim.

## Timing and guarantees

For the 32-entry comparison, the median of per-entry search medians is approximately 1.53 ms for the heuristic and 9.56 ms for reduced IBEX. Each entry has five measured trials after one warmup. Search, setup and final-candidate validation are distinct measurements; these figures are search-only.

The compiled heuristic uses SLSQP on the original equations with analytic derivatives. Six starts were selected on the 26-layout calibration set. The additional six entries repeat layouts already in that set and are not independent holdouts. Near-optimality is assessed against the retained certified reference; exact candidate validation alone proves feasibility, not global optimality.

IBEX produces interval bounds at its specified objective-gap tolerance (1e-5); the heuristic is judged against a 1% relative target. Their outputs have different guarantees. A faster approximate answer does not remove the value of a global bound when that is the required output.

The host was an AMD Ryzen 7 PRO 5850U on Windows 11. Sequential native runs were used. CPU affinity, thermal state and frequency were not controlled. There is no hardware or problem-size scaling study.

## What changed in the conclusion

The evidence supports faster certified search through this specialized reformulation. It does not show that certification is cheaper than a well-implemented heuristic, nor a material accuracy advantage over strong local search on these layouts. Application value, broader instance families and independent external review remain open.

## Evidence provenance

The first comparison is reported in the original project’s checkpoint 056–057 significance assessment. The second is checkpoint 058, with its frozen protocol, timing verdict and retained summary. The CSV in this package extracts only numerical timing summaries, entry labels and recorded success flags from checkpoint 058. Entries whose role is `repeated_holdout` repeat calibration layouts despite their historical name.

The extraction and summary check performed for this package do not constitute a fresh scientific experiment. A complete source release would additionally need the corrected mathematical note, native build instructions, dependencies and licenses, original/reduced models, reference certificates, and full reproduction checks.
