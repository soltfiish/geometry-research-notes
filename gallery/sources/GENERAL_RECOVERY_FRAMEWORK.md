# What “how close to full resolution?” can mean mathematically

GCS-MEASUREMENT-SHAPES-015 · 6 September 2026.

The general object is a **target-specific recovery limit**. Specify the admissible physical states, what the instrument can report, the quantity wanted, and the error metric. Noise size or percentage of retained data alone cannot determine this limit. The same observation can determine a distance while leaving orientation ambiguous, or determine a visible section while leaving the full object unbounded.

This framework builds on classical optimal recovery, information-based complexity, and set-membership estimation. The generic midpoint/modulus rule is not a new GCS theorem. Donoho's technical report explicitly describes the nonlinear deterministic rule in §13.2; its connection to Gaussian statistical minimax risk has additional restrictions. [Donoho, *Statistical estimation and optimal recovery*, Berkeley TR 214, 1989, §13.2](https://digicoll.lib.berkeley.edu/record/85850/files/214.pdf). See `MEASUREMENT_SHAPES_LITERATURE.md` for retrieval status and claim boundaries.

## 1. An exact rule for arbitrary reported outcomes

Let F be the possible states and M(z) the nonempty set of outcomes the instrument may report in state z. Let g(z) be a bounded real target. For each possible outcome y, put `F_y={z∈F:y∈M(z)}`. Estimators may output any real number and are judged by absolute error.

**Recovery rule.**

\[
 E=\inf_{\widehat g}\sup_{z\in F,\ y\in M(z)}|\widehat g(y)-g(z)|
 =\frac12\sup_{M(z)\cap M(z')\ne\varnothing}|g(z)-g(z')|. \tag{1}
\]

**Proof.** For a fixed possible y, every estimate has error at least half the span of `g(F_y)`. The midpoint of its infimum and supremum achieves that value. Taking the supremum over y is equivalent to taking all pairs sharing an outcome. ∎

This relation formulation includes quantization, saturation, omitted readings, and dependent errors, provided those mechanisms are actually represented in M. An estimator constrained to be a feasible physical state can have a different optimum.

For a normed real measurement space with `M(z)={h(z)+e:||e||≤η}`, two noise balls meet exactly when `||h(z)-h(z')||≤2η`: necessity is the triangle inequality and sufficiency uses their midpoint. Thus, defining

\[
 \omega_g(t)=\sup\{|g(z)-g(z')|:z,z'\in F,
                       \|h(z)-h(z')\|\le t\},
\]

equation (1) becomes `E(η)=ω_g(2η)/2`. If only discrete codes can be reported, replacing their actual common-outcome relation by overlapping continuous balls can be conservative; it is not automatically exact.

## 2. Full position or shape requires a different center problem

For a target g in a metric space, the exact general expression is

\[
 E=\sup_{y}\operatorname{rad}(g(F_y)),\qquad
 \operatorname{rad}(S)=\inf_a\sup_{v\in S}d(a,v), \tag{2}
\]

where a ranges over the allowed decision space. For Euclidean targets R^m and compact fibers, this is the smallest enclosing ball radius, with its center allowed anywhere in R^m.

Half the diameter is always a lower bound. It need not be the answer. Three equilateral-triangle vertices of circumradius 1 have diameter sqrt(3), but their enclosing radius is 1, exceeding sqrt(3)/2. Consequently the scalar certificate in 014 or 015 must not be relabeled a full-position or full-pose error.

For compact S⊂R^m, classical Jung's inequality gives

\[
 \frac{\operatorname{diam}S}{2}\le\operatorname{rad}S
 \le\sqrt{\frac{m}{2(m+1)}}\operatorname{diam}S. \tag{3}
\]

A current primary research paper states this classical bound in its introduction. [Arman et al., *On asymptotic Lebesgue's universal covering problem*](https://arxiv.org/abs/2512.04023).

For completeness, translate a smallest-ball center to zero. Zero lies in the convex hull of the boundary contacts, since otherwise a separating direction would move the center and reduce the radius. By Carathéodory's theorem choose at most m+1 contacts p_i with nonnegative weights λ_i summing to one and `sum λ_i p_i=0`. Then

\[
 R^2=\tfrac12\sum_{i,j}\lambda_i\lambda_j\|p_i-p_j\|^2
 \le\tfrac12D^2(1-\sum_i\lambda_i^2)
 \le\frac{mD^2}{2(m+1)}.
\]

This also explains the equality example. A pose metric identifying physically equivalent rotations or reflections must be specified separately; ordinary coordinates can overstate or understate the intended uncertainty.

## 3. When does arbitrarily good precision eventually suffice?

Assume F is a compact metric space and g,h are continuous, with scalar g and h in a normed space.

**Stability criterion.** The following are equivalent:

1. Exact equal measurements imply equal targets: `h(z)=h(z') ⇒ g(z)=g(z')`.
2. `ω_g(t)→0` as `t↓0`, equivalently `E(η)→0`.
3. A continuous function G on h(F) satisfies `g=G∘h`.

**Proof.** If (1) holds but (2) fails, select pairs whose measurement differences tend to zero while their target differences stay at least some a>0. Compactness gives convergent subsequences; continuity yields an exact equal-measurement pair with target difference at least a, a contradiction. Condition (2) implies (1) because an exact pair qualifies at every t. Under (1), define `G(h(z))=g(z)`; it is well defined. The same compact-subsequence argument proves continuity of G. Condition (3), together with uniform continuity on compact h(F), implies (2). ∎

The criterion requires uniqueness only of the **target**, not of the whole state. Two-anchor rotational ambiguity is harmless for an invariant range target but fatal for a pose target that distinguishes those rotations.

Compactness matters. On `[0,∞)`, the exact measurement `h(r)=1/(1+r)` identifies r, yet arbitrarily large differences in r can produce arbitrarily close measurements. There is no finite uniform recovery error at any η>0. The capped results avoid this particular failure by imposing a real prior bound.

## 4. Recovery rates: linear, slower powers, and ambiguity floors

A verified inverse bound

\[
 |g(z)-g(z')|\le C\|h(z)-h(z')\|^\alpha
\]

implies `E(η)≤C(2η)^α/2`. A matching indistinguishable pair gives the corresponding lower bound. A derivative at one pose is insufficient for a global statement if remote poses or singularities remain feasible.

| Geometry / target | What shrinking measurement error does |
|---|---|
| Direct scalar reading h=g | Linear error, until restricted by the prior target span. |
| Nonnegative height z inferred from z² near zero | Square-root sensitivity. |
| Signed height inferred only from z² | Reflection ambiguity survives exact readings. |
| Full circle radius inferred from a sagitta interval reaching zero | Radius has no finite upper bound. |
| The visible arc under the same sagitta interval | Its vertical graph error is exactly half the sagitta width. |
| Ellipsoid's missing axial extent from a perfect equatorial slice | Exact data do not constrain that extent. |

There is a useful existing general theorem behind the power-rate cases. If F, g, and h are compact/continuous and semialgebraic in finite-dimensional Euclidean spaces, and exact measurements determine the target, the classical semialgebraic Łojasiewicz inequality applied on F×F gives some `C>0`, integer N≥1 with

\[
 |g(z)-g(z')|^N\le C\|h(z)-h(z')\|. \tag{4}
\]

This follows by setting the two functions to measurement discrepancy and target discrepancy; their zero sets have the required inclusion. Theorem 1.1 of Basu–Mohammad-Nezhad states the underlying inequality; this recovery interpretation is a corollary, not a new inequality. It guarantees some Hölder exponent 1/N, without providing a good numerical constant for our instrument. [*Improved effective Łojasiewicz inequality and applications*, 2024, Theorem 1.1](https://doi.org/10.1017/fms.2024.66).

No universal positive exponent covers all degrees: on `[0,1]`, measurement `h(x)=x^k` and target x require exponent no larger than 1/k near zero. Nor does a small tolerance alone certify that anchor, rigidity, calibration, and reflection assumptions are correct.

## 5. A precise connection to lossy codes

Suppose a noiseless encoder may return at most K distinct codes and the target image is a full scalar interval `[L,U]`. Every decoder has worst error at least

\[
 E\ge\frac{U-L}{2K}. \tag{5}
\]

Indeed, its K decoded values must have radius-E intervals covering `[L,U]`; their total length is at most 2KE. An ideal encoder that can directly access the target attains the bound by K equal bins and midpoint decoding. With b bits, K=2^b.

This is an elementary worst-case quantization bound, not a new information theory result or a Shannon average-distortion formula. A physical instrument may not realize that ideal encoder. If it already merges two distinct targets into the same raw observation, additional bits cannot separate them.

For a general metric target set T, replace intervals by balls: K must be at least the radius-E covering number of T. This connects geometric size to required code capacity, but retained-bit percentage alone omits T, the encoder, and the metric.

## 6. How to choose another measurement

Fix the same F, target, and noise semantics for every proposed instrument. For each candidate h, certify `ω_(g,h)(2η)/2`; choose the smallest value among designs with acceptable costs. This evaluates every possible future reading, not only the reading expected at a guessed pose.

The third-beacon study is a concrete example. In the δ=.05, ε=.01, cap-10 triangle benchmark, one placement at `(0,2)` gives error about .109445 with ±.01 reading noise, whereas `(0,1)` leaves error about 1.027867 even with an exact reading. A direct reference-range reading with ±.01 noise gives .01. These are different specified instruments; the comparison does not establish a cost-optimal placement or a generally optimal sensing technology.

Additional independent measurements cannot enlarge F_y, so cannot worsen the optimal conditional guarantee when the physical and error models are held fixed. Improving a heuristic reconstruction algorithm may help reach this information limit; it cannot beat a proved indistinguishable-pair lower bound under the same model.

## 7. Why rigidity alone cannot defeat unrestricted relative-error escape

Here is a general elementary obstruction for finite geometric data. Fix a rigid body with vertices v_i, a reference vertex v_0=0, actual anchors a_j, and reference anchor a_0. Translate the whole body by t while keeping its orientation and all anchors fixed. Write `r=||t-a_0||`. For every observed cross-range,

\[
 \big|\|t+v_i-a_j\|-r\big|\le\|v_i+a_0-a_j\|.
\]

If every retained ratio interval contains `[1-ε,1+ε]` for some ε>0, and `K=max_observed ||v_i+a_0-a_j||`, every translation with `r≥K/ε` satisfies all those interval observations. Known rigid shape and shared anchors do not prevent this escape. The result assumes no additional absolute range cap, pose restriction, or one-sided/exact reading that removes the translated states. It does not cover an interval that excludes 1.

This proves an obstruction for all finite shapes under the stated observation pattern, without separate searches for cubes, prisms, or more complicated meshes. A finite cap or genuinely different information is necessary for a finite uniform range guarantee in this family.

This restates the strict-interval escape theorem already proved in checkpoint 009, `PARTIAL_SCALE_AND_SHAPE_THEOREMS.md`, §3. It is included here to connect that earlier result to the general recovery framework, not as a new 015 theorem.

## What this closes and what it leaves open

The general question has a mathematically precise answer: evaluate the radius of the compatible target set, and use common-outcome pairs to prove what no estimator can improve. The geometry determines whether the limit is small, slow to improve, permanently ambiguous, or unbounded.

Computing that object sharply for arbitrary high-dimensional bodies, unknown calibration, uncertain rigidity, or arbitrary observation graphs remains difficult. This framework is not an efficient universal reconstruction algorithm. The immediate research value lies in exact reductions, certified target bounds, constructive ambiguity examples, and measured advantages over a matched existing baseline.
