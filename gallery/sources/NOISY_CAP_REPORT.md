# What the noisy triangle study tells us

**GCS-NOISY-CAP-014 · 6 September 2026**

We have completed the proposed finite-range noisy-triangle milestone for six benchmark settings. We also have a bound that applies beyond those examples, to arbitrary positive leg lengths and nonoverlapping anchor disks under its stated noise/cap condition.

The main finding is that uncertainty can admit an entirely separate distant explanation. Looking only around the nearby solution can drastically understate what remains unknowable.

![Certified nearby and distant distance families](noisy_triangle_recovery.png)

## Read the model in ordinary language

Imagine a rigid right-angle marker with two known legs of length one. Two beacons observe its first two corners. Their three nonreference distances are reported as approximately equal to one common reference distance. One more reading says the third corner is no farther from the first beacon than the reference corner is. The beacons' surveyed locations are two units apart, and each actual beacon may lie within 0.05 units of its surveyed position.

The question is the distance to the first beacon, not the complete position and orientation of the marker. Ratio tolerance 1% means each specified ratio is between 0.99 and 1.01; it is not a 1% error guarantee for the answer. A cap of 10 means separate justified information says the reference distance is at most ten leg lengths.

The same actual beacon must fit all of its readings. The model keeps this requirement throughout.

## What the complete search established

At 1% ratio tolerance, the nearby feasible distances have extremes approximately 1.065563 and 1.171772. But another feasible family starts at about 7.944266. There is a certified empty gap between these families.

If the physical cap is 10, an exactly feasible configuration has reference distance 10. The best estimate must account for both the nearby and distant possibilities, giving unavoidable worst-case error about 4.467218. An algorithm returning just the nearby solution would miss most of that ambiguity.

If the reported central ratios remain one and tolerance tightens to 0.5%, the first distant possibility moves to about 11.244755. A cap of 10 excludes it, and the error drops to about 0.048907. With a cap of 12, the distant family is admitted again and the error is about 5.465231.

| Information supplied | Best possible worst-case distance error |
|---|---:|
| 1% ratio tolerance; anchor radius 0.05; cap 10 | 4.467218 |
| Same ratios and anchors; justified cap 2 | 0.053104 |
| Central ratios unchanged; 0.5% tolerance; cap 10 | 0.048907 |
| 1% tolerance; exact nominal anchor positions; cap 10 | 4.445139 |
| Baseline plus an absolute reference-range reading accurate to +/-0.01 | 0.010000 exactly |

All distances are in units of one triangle leg. Except for the last row, these are comparisons of specified information sets with fixed reported centers; they do not assume what a future improved instrument or survey will report. The last row is evaluated over **all** possible future readings.

The optimal scalar midpoint can itself fall in the impossible gap. It minimizes the largest possible numerical error; it is not being presented as a physically feasible reconstruction. The figure preserves the separate possibilities. Requiring the estimate to be a feasible pose would be a different decision problem.

The extra absolute reading has a simple sharp guarantee. Its interval is at most 0.02 wide, so its midpoint is accurate to 0.01. This cannot be improved uniformly here: two already-feasible configurations at ranges 1.10 and 1.12 can both produce the future reading 1.11. It is a useful calibration benchmark, not a claim that measuring a target directly is a new recovery method.

## The general result behind the examples

We proved an exact reduction from uncertain shared anchor locations to a three-coordinate search for this observation graph. We also derived an explicit distance enclosure for arbitrary leg lengths and disk radii when a stated conditioning inequality holds. At zero ratio noise it recovers the earlier sharp interval.

For a fixed finite cap and anchor disks that cannot touch, the best possible range error increases by at most a constant times sufficiently small ratio noise. The constant depends on the geometry and cap. The combination that weakens the geometry is **ratio noise times allowed squared range**, compared with body-edge length times anchor separation. This explains why the same percentage can be manageable nearby and ambiguous far away.

This does not establish a universal error formula for arbitrary shapes, instruments or dimensions. In 3D, the earlier rotational examples already admit additional ambiguity even at zero ratio noise.

## What this makes possible next

There is now a precise objective for evaluating an extra measurement: find two feasible configurations whose target distances differ as much as possible but whose new measurement predictions could still be confused within the instrument's error. Half their target difference is the remaining worst-case error. The proof accounts for unknown future readings.

The next useful test is a calibrated range to a third beacon off the original anchor line, compared with the direct reference-range benchmark at a declared precision. A third beacon prevents reuse of the two-anchor separation-only reduction without extra pose variables. That is the next substantive geometry problem.

A numerical benchmark against existing interval methods and a theorem-level literature comparison remain open. The broad bounded-error estimation and worst-case measurement-design framing is established; neither framework is claimed as new here. See the primary-source positioning notes in the theorem document.

## Evidence and reproduction

- Six complete cover trees, totaling 5,862 nodes, cover all feasible states through cap 12 in the reduced coordinates.
- Twenty-eight exact rational physical witnesses satisfy the original shared-anchor observations, rigid side lengths and anchor disks.
- A separately implemented rational checker accepts those certificates and rejects 22 deliberate corruptions.
- Eighteen minimax-error brackets, across caps 2, 10 and 12, have width below 1.1e-7. This is the precision of our knowledge of the limit, not the error of the reconstruction.
- Symbolic identities and 1,020 finite information-rule cases support the written proofs. This is not external peer review or proof-assistant verification.

[Proofs and exact hypotheses](NOISY_CAP_TRIANGLE_THEOREMS.md) · [Reproduction instructions](NOISY_CAP_README.md) · [Exact result intervals](noisy_triangle_results.json) · [Validation](noisy_triangle_validation.json) · [Next-work handoff](NOISY_CAP_HANDOFF.md)
