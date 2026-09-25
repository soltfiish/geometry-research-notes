> Public-package snapshot: this gallery covers earlier research, not the checkpoint 056/058 timing experiments. Use the repository benchmark notes for the speed claims. This packaging pass checks file integrity and links, not the mathematics of every exhibit.

# GCS geometry research gallery

Open **index.html** in a browser. Everything needed for the gallery is included; no install, account, network connection or build step is required for this local copy.

The 27 exhibits and 81 working examples connect the project's questions, model assumptions, exact geometry, saved tests and remaining gaps. Drag a figure to orbit, scroll to zoom, or use the view buttons. The Next button follows a suggested learning order. A URL fragment such as `#measurement` opens one exhibit directly.

Every exhibit also includes a plain-language explanation, a short characterization, a possible use case and one-click working examples. Start with the working-example buttons: they set the controls and explain exactly what to notice. Then adjust the controls freely. Possible use cases illustrate where the reasoning could help; the actual tested models are listed separately in the assumptions.

Start with these four:

1. **Distance versus pose** — two placements, one exactly known distance.
2. **What the gap measures** — the difference between fitting measurements and recovering position.
3. **When uncertainty regions touch** — a small assumption change opens an unbounded family.
4. **Changing the actual dimension** — why a planar theorem need not survive in 3D.

The full tour also includes ratio inversion, an extra anchor measurement, far-field escape, interior anchors, disconnected scale-restricted sets, layout-specific formulas, continuous spheres, certified recovery error, useful and useless shape priors, uncertain side lengths, shared-anchor consistency, noisy escape, short-arc conditioning and the early two-distance-class theorem.

## How evidence is presented

- **Exact formulas and counterexamples:** the displayed geometry is generated from the formulas. Browser arithmetic is an illustration; the proof remains in the linked document.
- **Saved certificates:** error bounds and witness coordinates are extracted from research records. The browser does not rerun the global interval solvers.
- **Sampled illustrations:** the escape-region dots sample a finite viewing window. They are not a certified boundary or a completeness claim.
- **Open or inconclusive:** the gallery says so, including the exact 3D two-class threshold and the arbitrary-data recovery problem. The noisy-cap benchmark now has 18 certified cases. Checkpoint 016 proves gain for the formerly inconclusive 0.5% and 1% shape tolerances and an exact no-gain transition at about 1.4213222%.

All planar scenes have z = 0, even when the camera rotates. The tetrahedron, cube, sphere, ellipsoid and dimensional counterexample use actual three-dimensional coordinates. Physical-coordinate figures preserve the same geometric length unit along every axis, except the **Radius versus visible arc** exhibit's explicitly labeled optional vertical magnification. The **Noise and the range cap** exhibit displays a scalar range axis rather than physical positions.

The **Partial scale knowledge** and **Boundedness and escape** exhibits now also have an **Allowed model space** control. In the two-anchor scale example, choose **Revolve into 3D** to see two planar segments join into a connected annulus, then use the physical angle slider. The three-anchor escape exhibit instead recomputes a true 3D point cloud and shows why rotating a candidate generally changes its third distance. In **Changing the actual dimension**, the physical angle slider rotates the rigid triangle while the reference anchors remain fixed. Camera dragging is independent of all these physical changes.

Proof notes and certificate files are copied into `sources/`, with original SHA-256 hashes in `source-manifest.json`. These are a snapshot dated 6 September 2026. Existing research records are not edited by the gallery. Literature priority is not claimed.

The final nine exhibits add the 014 noisy-cap certificates and 015 measurement/shape results: beacon placement, a fully observed round body, complete equal-distance blocks, flexible rhombi, visible arcs, nearly flat depth, missing ellipsoid sections, and scalar versus vector error. Checkpoint 016 sharpens the calibrated side-tolerance exhibit. Checkpoint 017 adds the general prior-value criterion and a control that removes one candidate position. Their analytical model checks pass together with the older gallery. The 18-exhibit browser inspection record is historical; it is not a claim that the nine new exhibits were interactively audited.

The existing **An imperfect shape prior** exhibit now incorporates checkpoint 016: two improved quantitative bounds, an exact no-gain threshold, and a new algebraic endpoint example at 1.5% side tolerance. Its earlier inconclusive descriptions are superseded explicitly.

`discoveries.js` and `discovery-scenes.js` extend the catalog and scene functions using the same reusable contracts. The local gallery is usable independently of hosted publishing. Hosted deployment remains unavailable in the current record; no live hosted version is claimed.

See **REUSE.md** for adapting the format to another repository. `build_snapshot.py` refreshes this project's evidence extract from the parent `outputs/` directory; it is specific to GCS and should not be run unchanged in another project.
