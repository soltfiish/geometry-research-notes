# The sharp tolerance at which the shape stops helping

GCS-SHAPE-TRANSITION-016 · 6 September 2026.

**The earlier two-percent sufficient threshold can be replaced by an exact transition at approximately 1.4213221963502143% ordinary side-length tolerance. The previously inconclusive 0.5% and 1% cases both have a proved positive benefit.** Their exact minimax values are still enclosed rather than solved in closed form.

## 1. This is the calibrated triangle model, not the ratio/cap model

Retain the checkpoint-007/009 experiment. Fixed exact anchors are `(0,0),(4,0),(0,4)`. The three labeled body vertices have nominal positions `(2,2),(3,2),(2,3)`, with the following squared-range reports:

| Vertex | Nominal squared ranges | Allowed absolute squared-range error |
|---|---|---:|
| X0 | 8,8,8 | .01 each |
| X1 | 13,5,13 | .01 each |
| X2 | 13,13,5 | .1 each |

The target is `g=||X2-(1,1)||`. Each ordinary side length has relative tolerance τ about `1,1,sqrt(2)`, with `0≤τ<1`; equivalently its nominal squared side n has interval `[n(1-τ)²,n(1+τ)²]`. All nine original readings remain in force.

Let E(τ) be the optimal unrestricted scalar absolute-error guarantee with these side constraints, and E_ind the guarantee without them. The feasible sets are nonempty and compact: the nominal rigid triangle fits, and the absolute upper ranges bound all vertices. The error is half the target span.

## 2. Independent endpoints are unique

Put `e=.1`, `d=X2_x-2`, `z=|d|`. Subtracting the first two squared ranges gives `0≤z≤e/4`. Their intersection supplies

\[
 9-e+4z-z^2\le X2_y^2\le9+e-4z-z^2.
\]

All feasible y coordinates exceed 1. The minimum squared target is bounded by

\[
 L(z)=11-e+2z-2\sqrt{9-e+4z-z^2},
\]

and the maximum by

\[
 U(z)=11+e-2z-2\sqrt{9+e-4z-z^2}.
\]

On this interval L is strictly increasing and U strictly decreasing: their derivatives have the signs of `y-(2-z)` and `(2+z)-y`, respectively, and here `y²≥8.9>(2.025)²`. Thus the unique independent endpoint positions are

\[
 P_-=(2,Y_-),\quad P_+=(2,Y_+),\qquad Y_\pm=\sqrt{9\pm.1}.
\]

They also satisfy the third-anchor reading. Its residual is `(Y-3)(Y-5)`, whose magnitude is no larger than `|Y-3|(Y+3)=.1` since Y>2. Therefore

\[
 g_\pm=\sqrt{1+(Y_\pm-1)^2},\qquad E_{ind}=(g_+-g_-)/2\approx.014907198060572.
\]

This reuses and restates the endpoint argument audited in 009. It does not assume that a bounding rectangle is wholly feasible.

## 3. An exact obstruction at the lower endpoint

Define

\[
 h=799/400=1.9975,\quad
 x_*=\sqrt{4-1/160000},\quad
 a=2-x_*,\quad d=Y_--h,
\]

\[
 \ell_* =\sqrt{a^2+d^2},\qquad
 \boxed{\tau_*=1-\ell_*.} \tag{1}
\]

**Lemma.** Among all X0 satisfying its three measured range intervals, the largest distance to P_- is exactly ell_*, attained at `X0*=(x_*,h)`.

**Proof.** The range differences constrain both X0 coordinates to `[h,801/400]`. Write `X0=(x,h+u)` with `0≤u≤1/200`. Its first lower range and third upper range give

\[
 x_*^2-2hu-u^2\le x^2
 \le x_*^2+2(4-h)u-u^2.
\]

Thus `|x²-x_*²|≤4.01u`. Since `x≥h` and `x_*>1.99`, division by `x+x_*` gives `|x-x_*|≤2u`. Consequently

\[
 \|X0-P_-\|^2
 \le(a+2u)^2+(d-u)^2
 =\ell_*^2+u(4a-2d+5u)\le\ell_*^2.
\]

The last coefficient is strictly negative: `a<.01`, `d>.98`, `u≤.005` give `4a-2d+5u<.04-1.96+.025<0`.

At `(x_*,h)`, the first and third squared ranges are exactly 7.99 and 8.01. The second is `7.99+8(2-x_*)`, which lies in `[7.99,8.01]`. Hence this point is feasible and attains ell_*. ∎

If τ<τ_*, every allowed side X0–X2 has length at least `1-τ>ell_*`. Therefore X2 cannot equal P_-. Compactness and endpoint uniqueness imply that its minimum target is strictly above g_-. The maximum cannot exceed g_+, so

\[
 E(\tau)<E_{ind}\quad\text{for all }0\le\tau<\tau_* . \tag{2}
\]

This proves strict gain even where a conservative quantitative bound is not yet sharp.

## 4. Both independent endpoints are feasible at the threshold

At the lower endpoint use

\[
 X0=(x_*,h),\quad X1=(3,2),\quad X2=(2,Y_-).
\]

At the upper endpoint use

\[
 X0=(2,\sqrt{4.01}),\quad X1=(3,2),\quad X2=(2,Y_+).
\]

Every one of the nine observation intervals holds. Every side lies within its relative τ_* interval; the lower construction's X0–X2 side attains the lower bound `1-τ_*` exactly. The other five side checks have strict slack. These statements are certified as algebraic inequalities in `verify_shape_transition.py`; equalities are simplified exactly and inequalities use outward rational square-root bounds at 2^120. No floating feasibility threshold is used.

Both independent target extrema consequently remain attainable for every `τ≥τ_*` in the stated tolerance range. Combined with (2), this proves the sharp equivalence

\[
 \boxed{E(\tau)=E_{ind}\quad\Longleftrightarrow\quad\tau\ge\tau_*,
 \qquad 0\le\tau<1.} \tag{3}
\]

The exact expression (1) is the theorem; its percent display is approximately **1.4213221963502143%**. The machine record includes distinct outward rational endpoints even when their rounded decimal displays coincide.

At or above the threshold the shape still excludes some physical triples. “No gain” refers only to this target's scalar minimax error, not to complete equality of feasible sets, pose recovery, or every other target.

## 5. Quantitative benefit at the two formerly inconclusive tolerances

A simple stronger outer bound suffices. The original range differences give

\[
 X0\in[h,801/400]^2,\qquad
 X2\in[79/40,81/40]\times[119/40,121/40].
\]

Thus `|X2_x-X0_x|≤11/400` and `X2_y-X0_y>0`. The side interval for X0–X2 forces

\[
 c_-:=h+\sqrt{(1-\tau)^2-(11/400)^2}
 \le X2_y\le c_+:=1201/400+\tau. \tag{4}
\]

For τ=.005 and .01, these levels lie strictly between the independent Y_- and Y_+ endpoints. At a fixed z, the minimum target uses `x=2-z` and `y=max(c_-,sqrt(8.9+4z-z²))`. Before these y bounds meet its squared target decreases with z; afterwards it increases by the L derivative above. Similarly, the maximum uses `x=2+z` and `y=min(c_+,sqrt(9.1-4z-z²))`, increasing before the join and decreasing after it. The joins lie in `[0,1/40]` and are

\[
 z_-=2-\sqrt{12.9-c_-^2},\qquad
 z_+=-2+\sqrt{13.1-c_+^2}.
\]

Therefore valid target bounds are

\[
 \sqrt{(1-z_-)^2+(c_--1)^2}\le g
 \le\sqrt{(1+z_+)^2+(c_+-1)^2}. \tag{5}
\]

The first two vertices and the other side constraints are partly relaxed in this bound, so it is not asserted sharp. Rechecking the prior rational physical witnesses supplies lower error bounds:

| Ordinary side tolerance | Certified optimal-error enclosure | Guaranteed reduction from E_ind |
|---:|---|---:|
| 0.5% | [0.009463282774105864, 0.012900542270740094] | at least 13.4609% |
| 1% | [0.011090863060990223, 0.014018315606508121] | at least 5.9627% |
| at least τ_* ≈ 1.4213222% | exactly E_ind | exactly 0% |

These supersede the inconclusive verdicts for the two middle rows in 009; they do not alter the old saved certificates. Decimal endpoints approximate the exact rational bounds in the new record.

## 6. Verification, novelty and remaining scope

Run `python work/measurement_shapes/verify_shape_transition.py`. It verifies both algebraic endpoint triangles, all measurements and sides, the constants in the global lemma, both improved target bounds, and four old rational witnesses directly from their coordinates. It rejects three damaged/false-threshold examples. It requires SymPy and the original `shape_tolerance_certificate.json`; no optimizer or network is required. Do not run with `-O`.

The global proof is the lemma and monotonic envelope argument above. Exact arithmetic audits it; passing code is not a substitute for the proof. This is a sharp theorem for this particular calibrated model. Its publication priority is unestablished, and it does not supply a universal percentage at which every shape prior becomes unhelpful. The exact positive-gain curve below τ_* and other observation models remain separate problems.
