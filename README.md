# Geometry research notes

Research notes and interactive explanations by Ayokunle Olufosoye.

## Start here

- [Seven-slide research carousel (PDF)](geometry-research-carousel.pdf)

- [Technical note: model, reduction, results and limitations](geometry-benchmark.md)
- [Open the interactive gallery online](https://soltfiish.github.io/geometry-research-notes/gallery/), or download this package and open `gallery/index.html` for offline use.
- [Proposed research directions](research-directions.md): a library of validated reductions, constraint graphs and possible Bayesian selection.

The gallery contains 27 exhibits from an earlier research snapshot. It explains ambiguity, measurement assumptions, shape priors and related geometry. It is not an interactive reproduction of the later solver-speed experiment.

## Benchmark evidence

The original-versus-reduced IBEX experiment has a [timing table](formulation-timings.csv), [protocol](evidence/056/protocol.json), [retained trials](evidence/056/ablation.json), and [models and logs](evidence/056/). These support 52.23–239.27 times faster search across 12 paired comparisons: six layouts at two inner-HC4 settings. There are 24 formulation/setting combinations, each with one warmup and five measured trials: 120 measured trials plus 24 warmups. Search timing excludes construction and compilation.

The separate six-start SLSQP comparison has a [timing summary](geometry-timings.csv) and [summary script](summarize_timings.py). Its approximate answers have different guarantees; its layouts are not independent holdouts.

Run `python summarize_formulation.py` and `python summarize_timings.py` with Python's standard library. These recompute summaries from retained measurements; they do not rerun solvers or independently verify certificates. The `.mbx` files specify native models, while `.log` and `.cov` files preserve solver outputs. A complete buildable solver release and standalone proof package remain separate work.

## Scope and attribution

The work used AI-assisted investigation and implementation. Internal checks are not external peer review. Broader application benefits, generalization and novelty are not established. The future-research note is a proposal.

Gallery source records retain their original hashes in [the source manifest](gallery/source-manifest.json). Those hashes were checked during packaging; that does not validate every mathematical claim in those records.

Prepared 25 September 2026. No reuse license has been selected for this package. The gallery's adaptation guide is technical guidance, not a substitute for a license.

Public companion gallery: https://soltfiish.github.io/geometry-research-notes/gallery/ (the original 6 September snapshot).

