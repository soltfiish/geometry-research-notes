# Independent review of the partial-scale reach claims

Date: 2026-09-06. Reviewed source: `outputs/PARTIAL_SCALE.md`, checkpoint GCS-PARTIAL-SCALE-012. This review preserves that file and its certificate. It makes no literature or originality claim.

**The separation theorem is valid, with a nonnegative clamp needed if its expression is called a minimum-radius profile. Its large-cap reach formula is valid under an eventual-feasibility condition on the particular fixed ray. The claims of cap-independent reach in every other direction, unchanged finite-cap geometry, and unrestricted transfer of the normalized-reference far-field theorem are too strong. Zero lower readings do not remove the capped outer ball.**

## 1. Exact separation, including zero reading bounds

Let there be finitely many anchors, independently uncertain in common-radius balls in a nontrivial real normed space. Write `d_i=||x-c_i||`, `alpha_i=rho_i^-`, `beta_i=rho_i^+`, with

\[
0\le\alpha_i\le\beta_i<\infty,\quad \delta\ge0,
\quad0<a\le s\le b\le\infty.
\]

The radial realization lemma makes feasibility equivalent to

\[
h_x(s):=\max\{0,\max_i(\alpha_i s-d_i),\max_i(d_i-\beta_i s)\}\le\delta.
\]

For strictly positive upper readings, the profile for **nonnegative** unrestricted scale is

\[
\boxed{\Delta_\rho(x)=\max\left(0,
\max_{i,j}\frac{\alpha_jd_i-\beta_id_j}{\beta_i+\alpha_j}\right).}
\]

If an upper reading is zero, the general formula is instead

\[
\boxed{\Delta_\rho(x)=\max\left(
0,\max_{i:\beta_i=0}d_i,
\max_{i:\beta_i>0,\ j:\alpha_j>0}
\frac{\alpha_jd_i-\beta_id_j}{\beta_i+\alpha_j}
\right),}
\]

where empty maxima add no term. A zero upper reading also has zero lower reading and requires the physical anchor to coincide with x.

Indeed, a positive upper reading contributes a lower scale bound `(d_i-delta)_+/beta_i`, a positive lower reading contributes an upper scale bound `(d_i+delta)/alpha_i`, and a zero upper reading requires `d_i<=delta`. Comparing all lower and upper scale endpoints gives exactly these inequalities. At finite caps this yields

\[
\boxed{\min_{a\le s\le b}h_x(s)=
\max\{\Delta_\rho(x),\max_i(\alpha_i a-d_i),
\max_i(d_i-\beta_i b)\}.}
\]

For `b=infinity`, omit the last maximum; zero-upper constraints are already in the free profile. Thus the intersection form is exact, with **closed** outer balls of radii `b beta_i+delta` and excluded **open** inner balls of radii `a alpha_i-delta`. An inner radius at most zero excludes nothing. This is algebraic separation; it does not mean the factors have no combined effects on their intersection.

The missing clamp is visible with `d=(1,1)` and both reading intervals `[1,2]`: the displayed unclamped quotient has maximum `-1/3`, although scale `s=1` realizes both ranges with zero anchor displacement. The actual minimum radius is zero. Tests only of `profile<=delta` for nonnegative delta cannot detect this error, because clamping leaves that Boolean test unchanged.

A positive lower reading is what creates an upper **admissible scale** endpoint. If `alpha_i=0<beta_i`, that upper endpoint and the inner exclusion disappear, while `d_i<=b beta_i+delta` remains. For example, one anchor with `d=2`, reading `[0,1]`, `delta=0`, and scale `[1/10,1]` is infeasible. Dropping its outer ball would incorrectly admit it.

The profile above uses the closure `s>=0`. A literal free model with `s>0` additionally excludes a common interval consisting only of zero. With finite upper readings, the only such zero-radius exception occurs when all nominal distances are zero and at least one lower reading is positive. A positive cap `a>0` handles this automatically. For example, `d=0`, exact reading one has profile zero but cannot be realized at `delta=0` with positive scale. Passing to a limit `a down to 0` must not silently add that configuration to the physical model.

## 2. General positive readings need their own far-field classification

Now assume Euclidean finite dimension and `beta_i>0` for every i. Let

\[
A=\max_i\alpha_i,\quad B=\min_i\beta_i>0,
\quad C=\max_i\|c_i-o\|.
\]

Every profile term is 1-Lipschitz in the nominal distance vector under the infinity norm. At the vector `(t,...,t)` the clamped profile is `kappa t`, where

\[
\kappa=\max\left(0,\frac{A-B}{A+B}\right).
\]

Since `|d_i(o+tu)-t|<=C`, it follows that

\[
|\Delta_\rho(o+tu)-\kappa t|\le C.
\]

This separates three cases, rather than presuming an exact reference normalization:

1. **A>B:** the common reading intervals have empty intersection. The profile grows linearly and every finite-delta sublevel is bounded. There is no finite directional limit of the form used in the cited far-field theorem.
2. **A<B:** the intervals have a common interior reading. All pairwise linear coefficients are strictly negative, so the clamped profile is exactly zero outside a sufficiently large ball. The nominal anchors already suffice there, including when delta is zero.
3. **A=B=rho_*>0:** retain active lower indices `J={j:alpha_j=rho_*}` and upper indices `I={i:beta_i=rho_*}`. The uniform limit is

\[
\boxed{\Phi(u)=\max\left(0,
\frac{\max_{j\in J}u\cdot c_j-\min_{i\in I}u\cdot c_i}{2}\right).}
\]

All other pairwise terms become negative uniformly, and the active terms follow from `d_i=t-u dot(c_i-o)+O(1/t)`. Unlike the normalized-reference setting, I and J need not share an index, so the unclamped support expression can be negative. For anchors `0,2` on a line with reading intervals `[1,2],[2,3]`, the limiting profile is one in the positive direction and zero in the negative direction; the latter raw expression is minus one.

An exact positive reference reading `rho_0=rho_*` permits the change `r=s rho_*` and normalized ratio intervals `alpha_i/rho_*`, `beta_i/rho_*`. This includes a reference interval exactly one, as required in GCS-REFINEMENT-005. Arbitrary interval readings do not supply that exact reference automatically.

When the finite limit exists, its strict inequalities give the familiar sufficient statements: `Phi(u)<delta` makes every ray with direction u eventually feasible; `Phi(u)>delta` makes every such ray eventually infeasible. At equality, neither conclusion follows merely from the limit. Similarly, the scalar threshold `gamma=min Phi` gives strict boundedness/unboundedness implications; “bounded iff delta<gamma” discards the unresolved critical level.

## 3. Precise large-upper-cap reach law

Fix Euclidean centers, a unit u and origin o. Let `F_b` use upper scale b and any lower scale `a(b)` satisfying `0<a(b)<=b`. Define

\[
p_i=u\cdot(c_i-o),\qquad
q_i=\|c_i-o\|^2-p_i^2\ge0.
\]

Assume all upper readings are positive and finite, and assume that this particular fixed ray is eventually feasible for the uncapped profile: for some T0,

\[
\Delta_\rho(o+tu)\le\delta\quad\hbox{for every }t\ge T0.
\]

For sufficiently large b, all outer balls contain o. Their exact final exit along the ray is

\[
E_b=\min_i\left[p_i+
\sqrt{(b\beta_i+\delta)^2-q_i}\right].
\]

Then the exact capped reach satisfies

\[
\boxed{T_b(o,u)=E_b\quad\hbox{for all sufficiently large }b.}
\]

**Proof.** All outer balls bound any feasible t by E_b, and `E_b tends to infinity`. At their common exit at least one anchor has `d_i=b beta_i+delta`, so its admissible scale lower bound is exactly b. All other outer bounds are at most b. Profile feasibility at `o+E_b u` therefore implies that b also satisfies every scale upper bound. Scale `s=b` realizes the point and respects every allowed lower cap `a(b)<=b`. Hence the geometric outer bound is attained. This also shows that fixing the lower scale is unnecessary for this eventual-ray result.

With finitely many anchors,

\[
\boxed{T_b(o,u)=
\min_i(b\beta_i+\delta+p_i)+O(b^{-1})
=bB+\delta+\min_{i:\beta_i=B}p_i+O(b^{-1}).}
\]

The exact error of the ith outer-ball expansion is

\[
-\frac{q_i}{b\beta_i+\delta+
\sqrt{(b\beta_i+\delta)^2-q_i}},
\]

which supplies the asserted order and sign. Thus the note's refined expression and slope are valid under these hypotheses. `Phi(u)<delta` is a sufficient eventual-feasibility condition in the applicable finite-limit regime, not a necessary one. If an upper reading is zero, its outer ball has radius delta independently of b and prevents this positive-slope escape law.

The note's triangle-inequality expression `min_i(b beta_i+delta+||c_i-o||)` is a valid coarse upper bound, not generally the exact ray exit. A factor-of-ten change in b does not generally divide reach by ten at finite caps: additive terms, square-root curvature, inner exclusions and profile intersections remain.

If the lower cap a is fixed and the **uncapped feasible portion of the fixed ray is bounded**, its reach eventually stabilizes as b increases. All of those bounded positions admit scale lower endpoints bounded uniformly in t, so a sufficiently large cap ceases to exclude any of them. This gives eventual constancy, not cap-independence for every finite b. With a variable lower cap, even that stabilization claim needs separate hypotheses.

## 4. Exact finite-cap and critical-direction counterexamples

### A non-escape ray still changes with small scale caps

Take `c0=(-1,0), c1=(1,0)`, exact readings one, `delta=1/2`, lower scale `1/10`, and `x=(t,0)`, `t>=0`. The nominal distances are `t+1, |t-1|`. Feasibility forces

\[
t+1-\tfrac12\le |t-1|+\tfrac12,
\quad t+1\le b+\tfrac12.
\]

The first inequality is `t<=|t-1|`, hence `t<=1/2` by squaring. The second gives `t<=b-1/2`. Conversely, for every t satisfying both bounds choose actual anchors

\[
a_0=(-1/2,0),\qquad a_1=(2t+1/2,0),\qquad s=t+1/2.
\]

Both anchors lie in their original disks, and both physical ranges equal positive s. Consequently

\[
\boxed{T_b=\min(1/2,b-1/2)\quad(b\ge1/2).}
\]

Below `b=1/2` the ray feasible set is empty; at `b=1/2` it consists of t zero. This direction has `Phi=1>delta`: reach grows on `[1/2,1]` and only then stabilizes. A convention such as reach zero for an empty feasible ray must be stated if used; the ordinary extended-real supremum of the empty set is different.

### A critical limiting direction can fail on a chosen fixed ray

For the same centers and exact readings, use `u=(3/5,4/5)` and `delta=3/5=Phi(u)`. From origin zero the distance spread is strictly less than `2delta` for every t, giving an eventually feasible ray and a limiting feasible direction. From origin `c1=(1,0)`, however,

\[
d_1=t,\qquad d_0^2=t^2+(12/5)t+4
>(t+6/5)^2.
\]

The spread exceeds `2delta` for every t, so that fixed ray is entirely infeasible under every cap. The same unit direction can therefore be an asymptotic feasible direction, and an eventual feasible direction for some origin, without producing linear reach from an arbitrarily specified origin. At strict `Phi<delta` this origin dependence disappears eventually.

### The weak critical set can also contain no limiting feasible direction

Take centers `(0,1),(0,-1),(1,0)`, all exact readings one, and `delta=1/2`. Both horizontal directions have `Phi=delta`. Yet every feasible point obeys `x<=3/4`. To see this, put `k=|y|`: when `x>3/4`, compare the range to the farther of `(0,1)` and `(0,-1)` with the range to `(1,0)`. At y zero either vertical anchor works. The necessary comparison would imply

\[
(x+k-1/2)^2\le(x-1)^2+k^2.
\]

The difference is `(2x-1)k+x-3/4>0`, a contradiction. Thus positive horizontal u is not even a limiting feasible direction. The opposite ray `(-t,0)` is feasible, since its spread is `t+1-sqrt(t^2+1)<1`. The closed support sublevel alone cannot decide the boundary.

For arbitrary escaping sequences, uniform convergence gives only

\[
\overline{\{u:\Phi(u)<\delta\}}
\subseteq D_\infty(F_\delta)
\subseteq\{u:\Phi(u)\le\delta\}.
\]

A fixed-ray reach law and a description of limiting feasible directions are therefore different assertions at critical levels.

## 5. What remains true about scale knowledge

The free-scale profile and its intrinsic asymptotic quantities contain no cap parameters. But every finite upper cap already makes the actual feasible set bounded, so gamma is not a boundedness criterion for the capped model. A scale prior can repair unbounded position uncertainty, change emptiness or connectivity, and alter target-specific recovery error. Algebraic separation does not establish that geometry is the only useful design choice or that tightening scale changes nothing else.

## 6. Independent executable checks

Run from the workspace root:

```powershell
python work/boundary_audit/parallel/check_partial_scale.py
```

This produces `work/boundary_audit/parallel/partial_scale_independent_checks.json`. It checks 720 rational distance/reading models, including zero bounds, and 3,600 capped minimum-radius problems. The independent comparator minimizes the original affine constraints at all breakpoints and verifies exact active-slope optimality conditions, rather than merely rewriting the pairwise formula. Its optimum also supplies directly realized radial intervals.

The geometric checks include physical anchor/range witnesses for exact reach endpoints, polynomial identities giving the global counterexample inequalities, the missing clamp, positive-scale exception, and all three general-reading regimes. The run passes 20,579 exact assertions. These finite checks supplement the proofs above; they do not claim to test every asymptotic model. No existing certificate or generator was imported, executed, or overwritten.
