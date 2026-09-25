# When any geometric prior stops improving a target

GCS-PRIOR-VALUE-017 · 6 September 2026.

**A shape prior helps a scalar recovery guarantee exactly while it removes at least one original target extreme. For a full Euclidean position, the corresponding objects are a few boundary configurations that together determine the enclosing ball.** This gives a common interpretation of the triangle's 1.4213222% transition and the other shape examples.

This is a general reduction built from established optimal recovery and smallest-enclosing-ball geometry. It is not a claim to have discovered those foundations, or a new efficient algorithm for arbitrary shapes.

## 1. State the prior as a tolerance cost

Let F be the nonempty compact set of all physical states consistent with an already received measurement report. A state includes every shared uncertain anchor and body parameter. Let v:F→[0,∞) be continuous. Define

\[
F_\tau=\{z\in F:v(z)\le\tau\}.
\]

Consider only τ for which Fτ is nonempty. The estimator may return any point of the target space; it is not required to return a realizable body or pose.

For uncertain nominal side lengths Lij>0, one useful cost is

\[
v(z)=\max_{ij}\left|\frac{\|X_i-X_j\|}{L_{ij}}-1\right|.
\]

Other continuous costs can encode angle, curvature, height, thickness or deviation from a known model. Each requires a justified physical prior and its own units. Here τ is the looseness of that prior, not a universal measure of data loss.

## 2. Exact scalar threshold

Let g:F→R be continuous, with α=min_F g and β=max_F g. Set

\[
\tau_- = \min_{g(z)=\alpha}v(z),\qquad
\tau_+ = \min_{g(z)=\beta}v(z),\qquad
\boxed{\tau_* = \max(\tau_-,\tau_+).} \tag{1}
\]

All these minima exist. Write E(τ) for the minimax absolute error on Fτ and Ebase=(β−α)/2. Then

\[
\boxed{E(\tau)=E_{base}\iff\tau\ge\tau_*.} \tag{2}
\]

**Proof.** Compactness gives attained extrema ατ and βτ on Fτ. Because α≤ατ≤βτ≤β, equality of the two spans holds precisely when ατ=α and βτ=β. The first equality is equivalent to τ≥τ−, and the second to τ≥τ+. The scalar midpoint rule gives (2). If α=β, every nonempty Fτ has zero error; both threshold minima reduce to min_F v, as required. ∎

The extrema are extrema of the target, not necessarily unique physical configurations. A cheap alternative configuration on an extremal fiber can preserve its value even if another configuration is excluded. One must minimize over the whole fiber.

**Connection to checkpoint 016.** There, F is the calibrated triangle's independent measurement set and v is its largest relative side deviation. The exact maximization over X0 proves that admitting the lower target extreme requires at least the stated τ*. The supplied lower and upper physical triangles admit both extremes at that tolerance. Thus the model-specific algebra evaluates the abstract threshold (1), rather than merely showing that some observed error curve looks flat.

## 3. Full Euclidean position: retained boundary contacts

Let now g:F→R^m be continuous, with the ordinary Euclidean error. Let B(c,R) be the unique smallest enclosing ball of K=g(F). Assume R>0; R=0 gives zero error on every nonempty subset. Define the baseline contact states

\[
\Gamma=\{z\in F:\|g(z)-c\|=R\}.
\]

The exact criterion is

\[
\boxed{E(\tau)=R\iff
c\in\operatorname{conv}\{g(z):z\in\Gamma,\ v(z)\le\tau\}.} \tag{3}
\]

Consequently at most m+1 contact states suffice to certify that the original error survives. A sharp tolerance expression is

\[
\boxed{\tau_*^{vec}=
\min\max_{1\le j\le m+1}v(z_j),} \tag{4}
\]

where the minimum is over z1,…,zm+1∈Γ and weights λj≥0 satisfying

\[
\sum_j\lambda_j=1,\qquad \sum_j\lambda_j g(z_j)=c.
\]

Repeated states are allowed. The domain in (4) is a nonempty compact set, so the minimum is attained, and E(τ)=R iff τ≥τ*vec. This can require three contact positions in 2D or four in 3D, even though a scalar needs just its two extreme values.

**Proof of the contact criterion.** A compact set inside B(c,R) has c as an optimal center exactly when c belongs to the convex hull of its radius-R contacts. For sufficiency, take contact points pj and weights λ with Σλpj=c. For every candidate estimate a,

\[
\sum_j\lambda_j\|p_j-a\|^2=R^2+\|a-c\|^2\ge R^2.
\]

Thus every covering ball has radius at least R. For necessity, suppose c is outside the compact contact hull. Strict separation gives a unit direction u and b>0 such that u·(p−c)≥b for every contact p. By compactness, the same inequality with b/2 holds in some neighborhood of the contacts. Moving the center a sufficiently small positive distance toward u strictly reduces every squared contact-neighborhood distance, by the identity

\[
\|p-c-su\|^2=\|p-c\|^2-2s\,u\cdot(p-c)+s^2.
\]

All remaining points have a uniform strictly smaller baseline radius, so a small enough move leaves them strictly inside radius R as well. This contradicts optimality. If there are no contacts, compactness already gives a smaller radius.

Apply this criterion to Kτ=g(Fτ). Since the baseline ball covers Kτ, equality E(τ)=R makes that same ball optimal; conversely the contact condition prevents any smaller ball. Carathéodory's theorem reduces the contact hull witness to at most m+1 points. Padding with repeats proves (4). ∎

**Example.** Let one report leave the three possible positions `(1,0),(-1/2,√3/2),(-1/2,-√3/2)`, with prior costs `0,.01,.02`. The error is 0 below .01, √3/2 from .01 up to but excluding .02, and 1 at or above .02. All three contacts are needed to recover the baseline radius 1. No two-target scalar test captures that last transition. A regular tetrahedron analog requires all four vertices for its full baseline radius.

These contact states are competing physical explanations for one report. They are not extra measurements one can assume available, and their small number does not bound the difficulty of finding them.

## 4. A rate exists in a compact semialgebraic model

Under the additional assumptions that F, g and v are semialgebraic, the scalar strict-gain statement admits a power bound. There exist constants C−,C+>0 and positive integer exponents N−,N+ such that, for every nonempty Fτ,

\[
E_{base}-E(\tau)\ge\tfrac12\left[
C_-\,\max(\tau_- -\tau,0)^{N_-}
+C_+\,\max(\tau_+ -\tau,0)^{N_+}\right]. \tag{5}
\]

**Proof.** On F define f−=g−α and h−=max(τ−−v,0). They are continuous semialgebraic nonnegative functions, and f−=0 implies h−=0 by the definition of τ−. The classical compact Łojasiewicz inequality therefore gives h−^N≤C f−. On Fτ, h−≥max(τ−−τ,0); minimize f− there. Apply the same argument to f+=β−g and add the two endpoint deficits. Identically zero h terms may be omitted. ∎

This is an application of a classical inequality. The result does not calculate useful numerical constants or guarantee linear sensitivity. Those still require geometry-specific work; checkpoint 016 supplies explicit numerical bounds instead.

## 5. What the theorem does and does not settle

- It replaces a vague “how useful is the shape?” question with extremal-fiber feasibility, or an enclosing-ball contact problem.
- It allows a prior to remove many states while leaving the selected error guarantee completely unchanged. Smaller feasible set does not force smaller minimax error.
- It applies to a fixed received report. To judge a proposed future instrument uniformly, the outer worst case over its possible reports must still be taken. A favorable report is not a uniform design certificate.
- Compactness and closed tolerance sets matter. If a cost is discontinuous and excludes only the endpoints of `[-1,1]` at τ=0, the surviving open interval still has error 1 even though neither endpoint is retained. Formula (2) cannot be transferred to that example without replacing the attained-minimum argument.
- The threshold is specific to the target and prior cost. A tolerance at which range gains vanish need not be a threshold for position, pose, volume or visible-surface error.

## 6. Verification and attribution

`verify_prior_threshold.py` checks the scalar rule against direct extrema over finite state tables, and the Euclidean rule against an independent exact enumeration of enclosing disks over rational planar point sets. It also checks the equilateral/tetrahedral contact examples symbolically. These are finite audits of a general proof, not exhaustive verification of every continuous model.

The enclosing-ball foundations are classical. Theorems G.3–G.4 in the ETH geometry notes state uniqueness and a basis of at most m+1 points; the full notes were retrieved. [ETH, *Smallest Enclosing Balls*, Appendix G](https://geometry.inf.ethz.ch/gca18-G.pdf). Welzl's original publication provides the standard algorithmic context. [*Smallest enclosing disks (balls and ellipsoids)*](https://doi.org/10.1007/BFb0038202).

The power-bound argument uses the classical inequality stated as Theorem 1.1 in Basu and Mohammad-Nezhad. [*Improved effective Łojasiewicz inequality and applications*](https://doi.org/10.1017/fms.2024.66). The scalar recovery foundation is attributed separately in `GENERAL_RECOVERY_FRAMEWORK.md` and `MEASUREMENT_SHAPES_LITERATURE.md`.

The prior-threshold formulation is derived here as a unifying corollary. Its publication priority has not been established; no general computational improvement is claimed.
