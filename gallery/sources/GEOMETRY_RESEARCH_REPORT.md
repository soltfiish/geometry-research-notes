# Geometry research resumed: what survives, and what is new

**Checkpoint:** GCS-CIRCUIT-COMPATIBILITY-002, 5 September 2026. Exact arithmetic throughout; reflections are allowed. All multipliers below apply to **squared distances**.

The two-class theorem survives verification: **for every fixed $n\ge5$, every partition of the complete graph into two nonempty classes forces a common scale at a generic planar reference configuration.** The $K_4$ ambiguity and its inversion interpretation also survive. I strengthened the inherited $K_5$ certificates by recording a nonzero resultant and a Bézout identity for each of the 17 partition orbits, and checking that specialization preserved the relevant polynomial degrees.

This session establishes a finite threshold for every fixed number of classes:

\[
N_2(2)=5,\qquad 6\le N_2(3)\le70,
\]

and, for $c\ge3$,

\[
c+3\le N_2(c)\le R_{\lceil c/2\rceil}(c+2)<\infty.
\]

Here $R_r(k)$ is the ordinary Ramsey number for a monochromatic $K_k$ in an $r$-coloring. These are **proved bounds, not a proposed exact formula**. The number 70 is an elementary upper bound, not a claim about the exact Ramsey number or the exact three-class threshold.

The mechanism is concrete. A clique whose distances have already been calibrated provides anchors. If an additional point sees $m$ fixed anchors through $k$ still-unknown scale classes, **$m\ge k+3$ suffices generically to determine that point and those scales uniquely**. This is a finite statement proved by a linear system in the point displacement, its change in squared norm, and the remaining scales. Pairing colors and applying Ramsey's theorem guarantees a sufficiently large clique using at most two original classes. The verified $K_5$ theorem calibrates that clique; the anchor argument fixes everything else. Unbalanced partitions, including singleton classes, are covered.

There are two consequential corrections to the inherited discussion.

- **All circuit equations are not sufficient.** An exact ten-entry distance vector makes every one of the 20 planar $K_5$ circuit polynomials vanish, yet its Gram matrix has rank four. All ten distances and all triangle Gram determinants are nonzero. Thus merely excluding zero distances or degenerate triangles does not remove this extraneous component. A second example has positive distances and satisfies the full measurement ideal, but has an indefinite Gram matrix: positivity of the scale coordinates still does not imply Euclidean realizability.
- **The old $(\mu,\nu)=(1,1/8)$ example is special-position evidence.** Its points $p_0,p_1,p_4$ are collinear. Reflecting just $p_2$ across their line produces the alternate realization. Its reported tangent and deletion ranks are correct, but its use to refute a *generic* redundancy criterion is unsupported. For the displayed partition, the large class is a wheel, which is generically globally rigid, so generic ambiguity is actually excluded. The branch disappears under an exact symbolic transverse perturbation. The generic redundancy question must therefore be reopened; the robust $K_4$ counterexample to local implying global remains valid.

Two smaller corrections are documented in the proofs: a missing factor in an off-variety $K_4$ identity, and an unweighted stress projection in EXP001 that should not be identified with the weighted stress–gauge pairing.

**A small example of what the geometry determines.** Keep four anchors fixed:

\[
a_0=(1,0),\quad a_1=(0,1),\quad a_2=(-1,0),\quad a_3=(3,2).
\]

The points $x=(2,2)$ and $x'=(1/4,1/4)$ have the same ratios of distances to the first three anchors. They are related by inversion in the unit circle. With the fourth spoke in its own class, both are allowed:

| squared distances | at $x$ | at $x'$ | class multiplier |
|---|---:|---:|---:|
| to $a_0$ | 5 | $5/8$ | $1/8$ |
| to $a_1$ | 5 | $5/8$ | $1/8$ |
| to $a_2$ | 13 | $13/8$ | $1/8$ |
| to $a_3$ | 1 | $85/8$ | $85/8$ |

All anchor-to-anchor distances stay fixed, giving three nonempty classes in total. Comparing the fourth spoke with the other three removes the ambiguity: its multiplier disagrees with theirs. The inversion construction extends to arbitrary $c$, with extra spokes assigned singleton classes, proving the lower bound above.

![The two locations allowed by three spoke ratios](C:/Users/ayolu/Documents/Codex/2026-09-05/geometry-research/outputs/ambiguity_example.png)

**Novelty assessment: narrow, with no priority claim.** Ratio-of-distance rigidity already studies shape recovery up to similarity; it is a closer finite-model precedent than the coordinated-edge-motion paper alone. The author’s [publication list](https://ntu-caokun.github.io/publications/) and the [NTU manuscript abstract](https://dr.ntu.edu.sg/bitstream/10356/146205/2/RoD_final%20submission_upd.pdf) establish that overlap. The specific arbitrary-class threshold bounds and the explicit circuit counterexample were not located in this focused search. That is limited evidence, not proof that they are unpublished. The literature note records exactly what was accessible.

**Next precise obstruction:** determine whether $N_2(3)=6$. The new argument already settles any three-class $K_6$ partition containing a $K_5$ with at most two classes. What remains includes partitions for which every induced $K_5$ uses all three classes. These should be studied using the full Gram-minor scale ideal, retaining branches where only some class scales agree, followed by a separate Euclidean test.

**Reproduction and evidence.** Thirteen bounded inherited tests passed. The new verifier checks all 17 resultant certificates, all 20 circuit supports of the extraneous vector, exact realizations and perturbation of the old control, the new inversion witness, anchor determinants, and the Ramsey recursion. No historical exhaustive census was rerun. Historical artifacts were preserved; source and archive comparisons are recorded in the provenance manifest.

- [Proofs and corrected compatibility formulation](PROOFS.md)
- [Exact certificates](research_certificates.json)
- [Primary-literature assessment](LITERATURE.md)
- [Reproduction instructions](README.md)
- [Validation record](validation_results.json)
- [Provenance and hashes](provenance_manifest.json)
- [Reproducible source package](geometry_research_source.zip)
