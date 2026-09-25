# Framing review: recoverability and the value of additional information

Review date: 2026-09-06. This reviews the supplied workspace result and GCS-IMPRECISE-POINTS-013 against the existing research record. It adds no theorem checkpoint, changes no earlier certificate, and makes no priority claim.

## Recommendation

Keep noisy and lossy observations as the motivating problem. Frame the research around **guaranteed recovery of a chosen quantity, and which additional information most improves that guarantee**.

The central question is: given the observations, their uncertainty model, and justified prior information, how much can the requested quantity still vary across physically possible explanations?

This supports three concrete outputs:

1. The complete possible interval, or certified enclosing interval, for a chosen distance or other scalar quantity.
2. A matching lower bound showing what accuracy no estimator can guarantee under those assumptions.
3. A comparison of prospective measurements or improved prior knowledge by how much they can reduce that uncertainty.

The general theory can remain instrument independent by treating the forward measurement model, uncertainty set, structural prior, target, and loss as explicit inputs. Its computational realization should start with the geometric models already analyzed. A claim about arbitrary compressed images or signals would require their corresponding measurement or compression model; it does not follow from distance-ratio geometry alone.

## The mathematical interface already available

Let F(y;P) be the nonempty set of physical configurations consistent with observations y and prior P, and let g be the scalar quantity being recovered. Define

\[
L_g=\inf_{z\in F(y;P)}g(z),\qquad
U_g=\sup_{z\in F(y;P)}g(z).
\]

If both endpoints are finite, the optimal unrestricted scalar estimate under absolute loss and its worst-case error are

\[
\widehat g=(L_g+U_g)/2,\qquad
E_g=(U_g-L_g)/2.
\]

This requires neither convexity of F nor connectedness of its image. The endpoint values can be approached rather than attained. If the image is unbounded, there is no finite absolute-error guarantee; if F is empty, the assumptions and observations are inconsistent rather than perfectly resolved.

For a prospective measurement j and possible outcome v, write F_j(v) for the remaining feasible set. A conservative experimental-design score is

\[
W_j=\sup_{v:\,F_j(v)\ne\varnothing} E_g(F_j(v)).
\]

Choose a permitted measurement that minimizes W_j, subject to its real cost and accuracy constraints. This evaluates every possible compatible outcome, rather than assuming the next reading is favorable. When the current error is finite, E_g(F)-W_j is a guaranteed reduction. Do not subtract infinities when the current error is unbounded; first compare whether a proposed addition makes W_j finite.

A known valid additional prior is handled by intersection directly. Prospective improvements in survey or measurement accuracy require the new observation and its possible outcomes to be modeled, rather than merely shrinking an error interval around an assumed unchanged center.

These principles belong to established optimal recovery and experiment design. Foucart and Liao explicitly study deterministic recovery with bounded observational errors and local Chebyshev centers. Tanaskovic, Fagiano and Morari optimize the worst-case radius of feasible parameter sets over experiments for a specified class of constrained linear systems. Their setting does not establish a result for our nonlinear shared-anchor geometry. The possible research contribution is a sharper theorem, exact reduction, reliable certificate, or demonstrated computational improvement for the particular geometric model. [Foucart–Liao](https://arxiv.org/abs/2310.09677), [Tanaskovic–Fagiano–Morari, author manuscript, section 2](https://fagiano.faculty.polimi.it/docs/papers/InputDesign_Automatica_2014.pdf).

## Why this is a stronger guide than noise level alone

Our own record separates several different obstructions.

| Question | Evidence already established here | Research consequence |
|---|---|---|
| Does better numerical precision resolve the ambiguity? | In the checkpoint-013 triangle, every positive symmetric tolerance on the equality ratios permits escape without further bounds. | Reducing a positive tolerance alone does not guarantee finite range error in this example. |
| Can one different kind of information change the problem qualitatively? | A finite physical reference-range cap bounds translation through the reference anchor. | Compare calibration or range information with improved ratio precision. |
| Must the complete pose be known to recover one useful quantity? | The exact-anchor triangle has two reflected poses but one exact physical reference range. | Recoverability depends on the target. |
| Does a shape prior actually help under imperfect knowledge? | The calibrated triangle experiment gives certified improvements for small side tolerances and exact no-gain at a sufficient 2% tolerance. | Quantify prior benefit and its tolerance, rather than counting constraints. |
| Can local or far-field approximations certify the whole answer? | The pooled first-order condition accepts a bounded shared-anchor false escape; the four-link identity rejects it. | Retain finite-distance coupling and validate any relaxation gap. |

A useful general theory should distinguish measurement error, omitted measurements, unknown calibration or scale, and uncertain structural priors. They can all enlarge a feasible set, but they do so in different ways. A single percentage of “full resolution” obscures these distinctions unless the recovered object and error metric are defined.

## What to accept and correct in the new workspace result

**Accept the narrower literature positioning.** Almost-Delaunay work already has existential point perturbations, asymmetric nearest/farthest sets, and centers at infinity. The existing LITERATURE_COLLISION_REVIEW.md had already identified this close precedent. Nested versus incomparable sets and a different question about sublevels merit a precise comparison; they do not establish originality by themselves. In particular, the best fitting annulus error delta_fit and the escape threshold gamma are different quantities. The new table's factor-of-one-half row must not identify those two scalars. [Bandyopadhyay–Snoeyink, section 3](https://cglab.ca/~morin/sydney-workshop/summaries/p-bandyopadhyay-snoeyink-almost-delaunay-simplices.pdf).

**Multiplicative weights are an area to compare, not an established novelty claim.** Weighted distance ratios and circular bisectors are already explicit in the multiplicatively weighted Voronoi literature. Gudmundsson, Seybold and Wong define the weighted distance and Apollonian bisectors in section 2.1 of their 2024 paper. Cox and Partensky also use distance ratios and Apollonius circles directly in source localization. Neither source, merely by having those objects, settles equivalence to our whole uncertainty model. [Weighted-diagram primary paper](https://drops.dagstuhl.de/storage/00lipics/lipics-vol293-socg2024/LIPIcs.SoCG.2024.62/LIPIcs.SoCG.2024.62.pdf), [Cox–Partensky](https://arxiv.org/pdf/physics/0701146).

The comparison should use the actual feasibility inequalities. For positive ratio coefficients a typical constraint is

\[
\alpha_i d_j-\beta_j d_i\le\delta(\alpha_i+\beta_j).
\]

At zero uncertainty this has a weighted-distance comparison boundary. With positive additive uncertainty, the general equality boundary need not be an Apollonius circle. Shared anchors, interval ratios, reference caps, and the target being optimized also remain part of the comparison. “Weighted Voronoi” is therefore a useful search term, not the only possible location of prior art or a ready-made exact solution.

**The claimed grid accuracy does not follow from Lipschitz continuity.** For a cell with center z and covering radius rho, a 1-Lipschitz profile gives

\[
\Delta(x)\in[\Delta(z)-\rho,\Delta(z)+\rho]
\quad\hbox{for every }x\hbox{ in the cell}.
\]

This supports safe cell rejection or inclusion when the entire value interval is above or below the threshold. It does not say that every retained point lies within rho of the true feasible set. Grid spacing and covering radius also differ by dimension and convention.

The record already has an explicit counterexample in RECOVERY_SPACE_THEOREM.md, section 5. With anchors (0,0),(2,0), exact ratio one and delta zero, F_0 is the line x=1, while

\[
\Delta(0,H)=\frac2{\sqrt{H^2+4}+H}\to0,\qquad
\operatorname{dist}((0,H),F_0)=1.
\]

Thus arbitrarily small profile residual does not imply arbitrarily small position error. A quantitative inverse error bound or independently proved target enclosure is needed for such an accuracy claim.

The new checker selects points with absolute profile residual less than the grid spacing and then asserts that the maximum selected residual is no greater than the spacing. That verifies its selection rule, not a geometric error bound. Its random Lipschitz samples corroborate a valid analytical inequality but do not validate the claimed distance-to-set guarantee. We did not rerun or overwrite that certificate.

**The one-point elimination does not solve shared-anchor pose consistency.** Unequal uncertainty radii do give the exact common-nonnegative-range condition

\[
d_i-d_j\le\delta_i+\delta_j
\]

for one candidate point with independent anchor choices. Positive reference range needs the existing zero-range exception handled. Multiple vertices observing one anchor must share one physical anchor realization. Their radial interval tests alone can be jointly infeasible.

The associated directional inequalities describe a weak outer set on the unit sphere, with strict directions sufficient for escape. They do not automatically decide equality directions. For delta_i=delta w_i, divisions by w_i+w_j require positive denominators or separate zero-weight treatment. These qualifications carry forward from the existing escape audit.

For universal containment of entire balls, nominal centers and radii still determine the fixed-center width:

\[
w_{\forall}(x)=\max_i(d_i+\delta_i)
-\min_i\max(0,d_i-\delta_i).
\]

This differs from the existential intersection condition. With equal radii delta, the familiar addition of 2 delta to the point-set width holds when the candidate center is outside every ball, so min_i d_i>=delta. It is not unconditional: a single ball centered at x has width delta, not 2 delta.

Finally, Lipschitz rejection and adaptive certification were already proved and implemented in checkpoint 005. The new source does not supply a previously missing general solver. Annulus candidate enumeration or optimality conditions would need their hypotheses re-established before being used for a variable rigid pose with shared anchors.

## Recommended work split

Have the other workspace finish a bounded comparison of multiplicatively weighted nearest/farthest geometry with the actual ratio-interval profile, including positive additive slack and common-scale coupling. It should correct its grid and critical-direction claims before building on them. Broaden the conceptual comparison to optimal recovery and worst-case information design, where the recommended framing already has established foundations.

Our next mathematical target remains the finite-cap noisy shared-anchor triangle. Obtain certified target extrema, with feasible witnesses and controlled relaxation gaps. Then compare information changes on that same target: reference-range knowledge, ratio accuracy, anchor survey accuracy, and shape tolerance. Assess new measurements over their possible outcomes. Use the existing certified interval machinery as a baseline with identical observations, priors, and required accuracy.

This keeps the user's general direction while concentrating work on a concrete, falsifiable question: which missing information prevents a finite or useful recovery guarantee, and how much does supplying it improve that guarantee?
