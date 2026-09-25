# Beyond one geometry: a proposed research direction

The current experiments support faster certified search after a particular geometric reformulation on the tested model. They do not establish that a solver can learn transferable reductions or improve real-world decisions. The following is a proposal, not an experimental result or a novelty claim.

## Working hypothesis

A solver equipped with a library of validated geometric reductions may solve a broader family of bounded-error geometric problems more efficiently if it can recognize when each reduction applies. Examples could help train a selector; examples alone do not establish a reduction's validity.

Each library entry would specify its mathematical transformation, assumptions, applicability checks, mapping back to the original variables, and guarantee. The solver would represent variables and constraints as a graph, propose applicable reductions, verify their conditions, and then solve the reduced problem. It would retain a general solver as a fallback.

## Where graphs and Bayesian inference could help

A constraint graph can expose which equations share variables and which subsystems are coupled. A learned or Bayesian selector could estimate which valid reduction is likely to reduce total solution time, updating its estimates from observed results. This is distinct from using Bayesian inference to estimate the physical state: that would require an explicit probabilistic observation model and would change the meaning of uncertainty relative to the current bounded-error formulation.

Posterior confidence is not a certificate of equivalence or a worst-case bound. Composing two individually valid reductions also requires checking their joint assumptions and shared-variable dependencies. Graph structure alone does not justify dropping those dependencies.

Related foundations include [portfolio-based algorithm selection in SATzilla](https://www.cs.ubc.ca/labs/algorithms/Projects/SATzilla/) and [factor-graph modeling and inference in GTSAM](https://gtsam.org/tutorials/intro.html). These are precedents for components of the proposal, not evidence that this particular extension works.

## Potential application areas

- **Sensor localization:** investigate position bounds with uncertain ranges and explicitly modeled shared calibration errors. Different anchor layouts and error structures need their own validity analysis.
- **Geometric metrology:** investigate dimensional or positional bounds from uncertain measurements and geometric constraints. The physical measurement model must match the application.
- **Robot workspace verification:** investigate bounded geometric feasibility questions. Collision, kinematic, and dynamic constraints introduce additional structure not covered by the present experiment.

These are candidate domains to study; no application benefit has yet been measured.

## A discriminating next experiment

1. Build a small library of mathematically checked reductions across several distinct model families.
2. Hold out whole geometry/model families before tuning the selector. Also test new instances within known families; report these two settings separately.
3. Compare the original solver, hand-selected reductions, a rule-based library selector, and a learned or Bayesian selector. Include a strong approximate method where appropriate, clearly separating output guarantees.
4. Measure total runtime including graph construction, selection, applicability checking, transformation, solving, and verification. Report failures, fallback frequency, memory, and bound quality as well as speed.
5. Test whether selection improves over simple rules and whether it preserves guarantees. If checking overhead erases the benefit, or held-out families do not improve, the proposed transfer advantage is unsupported.

The useful question is: can recognizing reusable structure make solving faster on unseen cases while retaining a precise account of when the result is valid?
