# Exact ambiguity, target distances, and bounded-error measurement choice

Research note, 2026-09-05. This is a supporting derivation for the finite-noise recovery project. All distances denoted by capital `D` are **squared Euclidean distances**. The anchors are fixed in a calibrated planar coordinate system. The unknown point's measured ranges share one unknown multiplicative scale, so the available data are ratios within that group. Absolute scale is supplied by the anchor geometry, not by the range ratios alone.

## 1. Prior art and scope

The underlying two-solution geometry is established. [Joseph Cox and Michael B. Partensky, *Spatial Localization Problem and the Circle of Apollonius* (2007)](https://arxiv.org/pdf/physics/0701146), pp. 4-5, explain that three planar isotropic detectors with unknown source strength admit inverse source positions in their circumcircle. Additional detectors on that circle preserve the ambiguity; a fourth off-circle detector resolves it. Their conclusion explicitly sets noise aside. The inverse-square signal model gives the same distance-ratio geometry used here. Accordingly, neither inversion ambiguity nor off-circle uniqueness is claimed as a new result.

This note supplies self-contained formulas for the uncertainty of a selected distance, the separation of two predicted measurements, and deterministic error thresholds. These are elementary consequences and are not asserted to be original. No claim is made that a particular anchor is universally optimal across instruments or noise models.

## 2. Complete solution for three noncollinear anchors

Let `a0,a1,a2` be three distinct noncollinear anchors. Their circumcircle has center `o` and radius `R>0`. Write

\[
u=x-o,\qquad \rho=\|u\|^2,\qquad D_i(x)=\|x-a_i\|^2.
\]

Assume the reference point `x` does not coincide with an anchor. A candidate `y` has the same two independent squared-distance ratios precisely when, for some `lambda>0`,

\[
D_i(y)=\lambda D_i(x),\qquad i=0,1,2.
\]

Translate the circumcenter to zero. Subtracting the equation for anchor 0 from those for anchors 1 and 2 gives

\[
(a_i-a_0)\mathbin\cdot y=\lambda(a_i-a_0)\mathbin\cdot x.
\]

Noncollinearity implies `y=lambda*x`. Substitution into any one range equation yields

\[
(\lambda-1)(\lambda\rho-R^2)=0.
\]

If `rho>0`, the complete finite positive solution set is

\[
\boxed{\{x,x^*\},\qquad x^*=o+t(x-o),\quad t=R^2/\rho.}
\]

The two points coincide if `rho=R^2`. If `rho=0`, the center itself is the unique finite candidate. These exceptional cases must not be described as two distinct branches. No algebraic-genericity assumption is needed for this statement; the listed nondegeneracy assumptions suffice.

## 3. A requested distance may be determined despite positional ambiguity

Let `b=o+w` be a known point whose distance from `x` is requested but unmeasured. Set

\[
D=\|x-b\|^2,\quad D^*=\|x^*-b\|^2,\quad
P(b)=\|b-o\|^2-R^2.
\]

Direct expansion gives two useful identities:

\[
D^*=tD+(1-t)P(b),
\]

\[
\boxed{D^*-D=(1-t)\bigl(2u\mathbin\cdot w-\rho-R^2\bigr).}
\]

For distinct branches, the requested distance is identical on both exactly when

\[
u\mathbin\cdot w=(\rho+R^2)/2.
\]

This is the perpendicular bisector of `x` and `x*`. Thus reconstructing a requested distance can require less information than reconstructing the whole position.

For the unrestricted scalar target estimate, the exact minimax squared-distance estimate is `(D+D*)/2` with unavoidable error `|D-D*|/2`. For the ordinary distance, it is

\[
\widehat d=\frac{\sqrt D+\sqrt{D^*}}2,\qquad
E_d=\frac{|\sqrt D-\sqrt{D^*}|}2.
\]

These are intervals enclosing a two-point target set, not a claim that every intermediate distance is geometrically feasible. Taking the square root of the squared-distance midpoint is generally not the minimax estimate for ordinary distance. A prior domain that excludes one branch changes the feasible set and can remove this ambiguity.

## 4. What extra measurement actually distinguishes the branches?

### 4.1 A range in the same unknown-scale group

Suppose a new range to `b` shares the scale of the original three ranges. It supplies the normalized squared ratio

\[
q_b(z)=\frac{\|z-b\|^2}{\|z-a_0\|^2}.
\]

Because `D_0(x*)=t D_0(x)`, the exact signed prediction separation is

\[
\boxed{q_b(x^*)-q_b(x)
=\frac{(\rho-R^2)P(b)}{R^2D_0(x)}.}
\]

With two distinct branches, this measurement distinguishes them exactly if `b` is off the original circumcircle. An arbitrary number of extra anchors on the circle leaves the ambiguity intact.

### 4.2 A calibrated range

If the new measurement instead reports an absolute calibrated squared range, its predictions are `D` and `D*`. Its bad-anchor locus is the perpendicular bisector from Section 3, rather than the circumcircle. A point on the circumcircle can therefore provide a useful **calibrated** range, even though its **same-group ratio** cannot help.

### 4.3 A wholly separate unknown scale

One positive new range assigned a fresh, unconstrained multiplicative scale does not separate the two positions: that new scale can fit either positive prediction. This qualification matters for instruments that do not share calibration. A zero predicted range is exceptional and is excluded from this observation.

## 5. Exact deterministic discrimination thresholds

Let `h1,h2` be two scalar predictions, and let the additional measurement satisfy `|observed-h_true|<=epsilon`. Write `Delta=|h1-h2|`.

* **Fixed observation:** if the observed value is exactly `h1`, the second point is admitted exactly when `epsilon>=Delta`.
* **Uniform discrimination under all allowed errors:** the two possible observation intervals are disjoint exactly when `Delta>2*epsilon`. At equality, their common endpoint remains ambiguous.
* **Target risk:** if both predictions can explain a common observation, the worst-case remaining error in a scalar target with values `g1,g2` is still `|g1-g2|/2`. If the observation intervals are disjoint, it becomes zero for this two-point feasible set. If `g1=g2`, the target error was already zero.

Proof: the observation intervals are `[h1-epsilon,h1+epsilon]` and `[h2-epsilon,h2+epsilon]`. They overlap exactly at separation at most `2*epsilon`. In an overlap, any estimator faces the same observation under both truths, so one of its two target errors is at least half the target separation. The target midpoint attains that lower bound. If the intervals are disjoint, the observation identifies the branch.

For the normalized squared ratio, write `Delta_b=|q_b(x*)-q_b(x)|`. Uniform discrimination is equivalent to

\[
\boxed{|P(b)|>\frac{2\epsilon R^2D_0(x)}{|\rho-R^2|}.}
\]

This describes an explicit region around the circumcircle in which the new measurement cannot guarantee discrimination at the stated ratio-error level. Near the circle, `P(b)=(||b-o||-R)(||b-o||+R)`, so separation decays linearly with radial displacement to first order. A small separation when `x` itself approaches the circle also reflects the two positions approaching one another; that fact alone is not a claim of diverging target error.

The word "ratio error" is essential. An instrument's absolute range error, quantization, or relative error must first be propagated to this observation. For positive predictions under bounded log-ratio error `|log(observed)-log(h_true)|<=eta`, the exact uniform threshold is `|log(h2/h1)|>2*eta`. Under multiplicative error `observed/h_true in [1-delta,1+delta]`, with `0<=delta<1`, it is `delta<|h2-h1|/(h1+h2)`.

For finitely many candidate same-group measurements with independent deterministic error bounds `epsilon_j`, the two observation boxes are disjoint iff at least one coordinate satisfies `|h2_j-h1_j|>2*epsilon_j`. Repeated bounded-error observations do not automatically yield an averaging guarantee without extra assumptions on their errors.

## 6. Finite uncertainty in the original three measurements

The formulas above compare two exact points. With error in the original measurements, each point generally expands to a set, and testing only its center is insufficient.

Suppose a separate, valid calculation encloses the two candidate sets in balls `B(c_j,delta_j)`, with `delta_j<||c_j-a0||`. By the triangle inequality, every ratio `q_b(y)` on ball `j` belongs to

\[
I_j(b)=\left[
\frac{\max(0,\|c_j-b\|-\delta_j)^2}{(\|c_j-a_0\|+\delta_j)^2},
\frac{(\|c_j-b\|+\delta_j)^2}{(\|c_j-a_0\|-\delta_j)^2}
\right].
\]

If these two intervals, each expanded by the new measurement error `epsilon`, are disjoint, the measurement distinguishes the whole candidate sets. This is a sufficient certificate: the interval construction may overestimate the true prediction ranges because numerator and denominator are correlated. Failure of this sufficient test does not prove ambiguity.

A globally valid calculation must also establish that these candidate sets exhaust the initial feasible set. The main recovery project's physical-consistency and global interval analysis addresses that separate requirement.

## 7. Verified rational example

Use

\[
a_0=(1,0),\quad a_1=(0,1),\quad a_2=(-1,0),\quad
x=(2,2),\quad x^*=(1/4,1/4).
\]

The anchor circle is the unit circle, `rho=8`, and `t=1/8`. The three original squared ranges are `(5,5,13)` and `(5/8,5/8,13/8)`, yielding identical ratios `(1,13/5)`.

| New known point `b` | Target squared ranges `D,D*` | Same-group ratio predictions | Consequence |
|---|---|---|---|
| `(3,2)` | `1,85/8` | `1/5,17` | Strongly separates the example's branches |
| `(0,-1)` | `13,13/8` | `13/5,13/5` | On-circle ratio contributes no separation |
| `(1,5/4)` | `25/16,25/16` | `5/16,5/2` | Target distance is already exactly `5/4`, despite unresolved position |

For target `b=(3,2)`, the exact ordinary-distance enclosure is

\[
[1,\sqrt{170}/4],\qquad
\widehat d=(4+\sqrt{170})/8,\qquad
E_d=(\sqrt{170}-4)/8.
\]

Numerically this is approximately `[1,3.259601203]`, with estimate `2.129800601` and unavoidable error `1.129800601` in the calibrated coordinate units. For the squared target, the midpoint is `93/16` and error is `77/16`.

The extra ratio separation is `84/5`. Therefore an observation exactly equal to `1/5` admits the alternate point at `epsilon>=84/5`, whereas discrimination for **every** permitted observation is guaranteed only at `epsilon<42/5`. These large dimensionless thresholds are properties of this illustrative ratio pair, not generic instrument tolerances.

For an anchor near the circle, `b_h=(0,-1-h)`, the ratio separation is exactly `7*h*(h+2)/5` in signed form. It vanishes at `h=0`; for small positive `h`, it grows initially as `14*h/5`.

## 8. What can be optimized, and what cannot yet be claimed

For this fixed two-point ambiguity, fixed reference anchor, and a given list of candidate same-group measurements with known additive ratio-error bounds, `Delta_b/(2*epsilon_b)` measures the guaranteed discrimination margin. A value above one guarantees branch identification. With identical positive error bounds, maximizing separation amounts to maximizing absolute circumcircle power among the allowed candidate anchors.

This is a bounded design rule, not a universally best anchor location. Without a placement domain, cost, minimum separation from the target, and an instrument-dependent error model, there need not be a meaningful finite optimum. When the noise model changes, use the corresponding separation of predicted observation sets; raw circle power need not rank candidates correctly. With more than two candidates or an uncertain continuum, the requested target loss must be optimized over the whole feasible set.

## 9. Independent verification

Run `python work/recovery/parallel/verify_ambiguity_measurements.py` from the project root. It uses SymPy to verify the general identities, solve the example's complete positive scale system, check the exact target/range values, certify interval-overlap thresholds, and verify the near-circle factorization. It writes only `work/recovery/parallel/ambiguity_measurements_certificate.json`.
