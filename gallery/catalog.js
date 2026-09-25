/* Project content lives here; the viewer and application shell are reusable. */
window.RESEARCH_CATALOG = {
  title:'GCS geometry research', date:'2026-09-06',
  terms:{
    pose:'Ordinary geometric meaning: a body’s position and orientation. A known shape can still have several possible poses.',
    anchor:'A reference point used for distance measurements. A nominal anchor is its reported position; an actual anchor is a position allowed by its uncertainty region.',
    feasible:'Satisfies every stated assumption and measurement at once. A point in a sampled picture is not a certificate of the whole feasible set.',
    delta:'δ is an allowed displacement of each anchor, in length units. In these exhibits it is not the unknown point’s position error.',
    profile:'Δ(x) is the least anchor displacement needed to make candidate x compatible with the ratio data in the stated model.',
    target:'The particular quantity we want to recover: for example one distance, rather than the entire pose.',
    minimax:'E is the smallest guaranteed worst-case absolute error for a chosen scalar target. If its feasible extrema are g_min and g_max, E = (g_max − g_min)/2.',
    certificate:'A saved, independently checkable record supporting the reported bound. A displayed decimal or this browser’s calculation is not a new certificate.',
    escape:'Feasible configurations can occur arbitrarily far away. An arrow shows a direction or an explicit family; a finite drawing cannot display infinity.',
    gamma:'γ is the critical far-field threshold in the stated ratio model. Below it the feasible set is bounded; above it it is unbounded. Equality needs its own analysis.',
    squared:'A squared range is distance². Its tolerance has squared length units. A ratio of squared ranges is dimensionless; it is not an ordinary distance ratio.',
    shared:'One actual anchor must serve every observation involving it. Letting the anchor move separately for each observation describes a different model.',
    prior:'Additional information imposed on the feasible configurations, such as a known side length. It can help only insofar as it restricts the chosen target.',
    generic:'Outside an exceptional algebraic set. It does not mean every drawing, every numerical example, or merely “not collinear.”',
    revolution:'Physical rotation around an axis. Distances to points on that axis stay fixed; distances to off-axis references generally do not.',
    annulus:'A flat circular band between two concentric circles. In this example it lies in a plane inside 3D space; it is not a solid doughnut.'
  },
  exhibits:[
    {
      id:'pose',group:'Start with the question',short:'Distance versus pose',title:'A distance can be settled while a pose is not.',
      question:'Switch between two placements. What changes, and what remains identical?',status:'Proved example',dimension:2,
      assumptions:['A planar right triangle has side lengths 1, 1 and √2.','Anchors are exactly at (−1, 0) and (1, 0).','Four cross-ranges are equal, and the fifth is no larger.'],
      finding:'Two distinct placements satisfy the same data. Their common range is exactly √5/2. Recovering this one number does not select a unique pose.',
      scope:'The triangle remains in the xy plane when you orbit the camera. The alternate placement is a real ambiguity of this example.',
      terms:['pose','anchor','target','feasible'],
      evidence:'The exact planar boundary theorem includes these configurations. The later dimension exhibit changes the model itself to three dimensions.',
      sources:['MIXED_BOUNDARY_TRIANGLE_THEOREM.md','mixed_boundary_certificate.json'],
      controls:[{key:'placement',label:'Show placement',type:'select',value:'both',options:[['both','Both admissible poses'],['first','Pose A'],['second','Pose B']]}]
    },
    {
      id:'inversion',group:'Start with the question',short:'One extra measurement',title:'An extra anchor can remove a global ambiguity.',
      question:'The first three anchors give identical ratios for two very different locations.',status:'Exact calculation',dimension:2,
      assumptions:['Measurements are ratios of squared distances to a reference anchor.','The first three anchors lie on the unit circle.','Candidate locations are (2, 2) and (¼, ¼).'],
      finding:'The candidates have the same first two squared-range ratios, 1 and 13/5. A fourth anchor at (3, 2) gives 1/5 versus 17, separating them.',
      scope:'The connecting dashed segment only pairs the two candidates. Its interior is not asserted feasible. This is the exact-data example before noise is added.',
      terms:['anchor','squared','feasible'],evidence:'The exact inversion ambiguity and fourth-anchor comparison are recorded in the recovery and ambiguity notes.',
      sources:['RECOVERY_RESEARCH_REPORT.md','AMBIGUITY_AND_MEASUREMENT_NOTE.md','ambiguity_measurements_certificate.json'],
      controls:[{key:'fourth',label:'Include the fourth anchor’s measurement',type:'check',value:false}]
    },
    {
      id:'profile',group:'The recovery space',short:'What the gap measures',title:'The gap is the anchor motion needed for a fit.',
      question:'Move a candidate point. Can the uncertain anchors give it one common distance?',status:'Exact formula',dimension:2,
      assumptions:['Three nominal anchors: (0, 0), (2, 0), (0, 2).','Every ordinary distance ratio is 1.','Each anchor may move independently by at most δ.'],
      finding:'Here Δ(x) = (largest nominal range − smallest nominal range)/2. The candidate is feasible exactly when Δ(x) ≤ δ.',
      scope:'Small diamonds show one optimal construction of actual anchors. They are allowed only when each lies inside its uncertainty disk. The formula is for a single unknown point.',
      terms:['profile','delta','anchor','feasible'],evidence:'Closed-form interval elimination, constructive sufficiency and the recovery-space theorem. This equal-ratio display is one specialization of the weighted profile.',
      sources:['RECOVERY_SPACE_THEOREM.md','ANCHOR_SCALE_PROJECTION.md'],
      controls:[{key:'x',label:'Candidate x',type:'range',min:-1,max:4,step:.02,value:1.8},{key:'y',label:'Candidate y',type:'range',min:-1,max:4,step:.02,value:1.1},{key:'delta',label:'Anchor uncertainty δ',type:'range',min:0,max:1.5,step:.01,value:.4}]
    },
    {
      id:'residual',group:'The recovery space',short:'Fit is not position error',title:'A small fit gap need not mean a nearby solution.',
      question:'Move the candidate higher. Its fit gap shrinks while its distance to the exact solution set stays fixed.',status:'Proved counterexample',dimension:2,
      assumptions:['Two exact anchors are at (0, 0) and (2, 0).','The requested range ratio is 1.','Candidates are (0, H); exact solutions lie on x = 1.'],
      finding:'Δ(0, H) = 2/(√(H² + 4) + H) tends to zero, but the candidate remains exactly 1 unit from the solution line.',
      scope:'The camera follows the candidate. The anchors can move out of frame, but the two vertical lines stay one unit apart. A Lipschitz bound for Δ alone does not bound position error.',
      terms:['profile','target','feasible'],evidence:'The recovery-space result and framing review distinguish residual size from positional distance.',
      sources:['RECOVERY_SPACE_THEOREM.md','RESEARCH_FRAMING_REVIEW_2026_09_06.md'],
      controls:[{key:'height',label:'Candidate height H',type:'range',min:1,max:40,step:.25,value:4}]
    },
    {
      id:'escape',group:'The recovery space',short:'Boundedness and escape',title:'A tolerance threshold changes whether escape is possible.',
      question:'Compare planar escape with true 3D motion, then try rotating a candidate around the first two anchors.',status:'Theorem + sampled view',dimension:2,
      assumptions:['Nominal anchors form the triangle (0, 0), (2, 0), (0, 2).','All distance ratios are 1; anchors move independently.','No upper bound is placed on the common range.'],
      finding:'In the plane γ = 1/√2. In actual 3D space γ = 0, and (1, 1, z) is feasible for every z even at zero tolerance. Rotation around the first two anchors generally changes the third range.',
      scope:'The model-space control changes the allowed coordinates. 3D samples are recomputed using 3D distances. A point cloud is a finite illustration; the exact equal-range line has a separate proof.',
      terms:['gamma','escape','delta','profile','revolution'],evidence:'The far-field theorem supplies the thresholds. The rotational note proves the exact 3D line and shows why the planar figure cannot simply be revolved while the third anchor stays fixed.',
      sources:['FAR_FIELD_THEOREM.md','SHAPE_SPECIFIC_FORMULAS.md','ROTATIONAL_SYMMETRY_3D.md','rotation_geometry_checks.json'],
      controls:[{key:'space',label:'Allowed model space',type:'select',value:'plane',options:[['plane','Confined to the plane · 2D'],['three','Free to move out of the plane · 3D']]},{key:'delta',label:'Anchor uncertainty δ',type:'range',min:0,max:1.5,step:.005,value:.6,presets:[{label:'Planar γ = 1/√2',value:Math.SQRT1_2},{label:'At √2 · all space',value:Math.SQRT2}]},{key:'angle',label:'Physical candidate rotation · degrees',type:'range',min:0,max:360,step:1,value:0},{key:'window',label:'Window radius',type:'range',min:3,max:16,step:1,value:5}]
    },
    {
      id:'interior',group:'The recovery space',short:'What the far field misses',title:'An interior anchor can change everything at the boundary.',
      question:'Add one anchor without changing the convex hull of the anchor layout.',status:'Exact counterexample',dimension:2,
      assumptions:['Exact anchors at (0, 0) and (2, 0), with equal ranges.','An optional third anchor is at (1, 0).','The anchor uncertainty is δ = 0.'],
      finding:'With two anchors the entire line x = 1 is feasible. With the midpoint anchor added, no point is equidistant from all three. The hull and far-field support data are unchanged.',
      scope:'The dashed old solution line becomes a rejected reference when the third anchor is active. This is a finite-range obstruction at the critical level.',
      terms:['gamma','feasible','anchor'],evidence:'The scale review and finite-boundary work record why the support function cannot settle every critical case.',
      sources:['PARTIAL_SCALE_INDEPENDENT_REVIEW.md','MIXED_BOUNDARY_INDEPENDENT_REVIEW.md'],
      controls:[{key:'interior',label:'Add the interior anchor',type:'check',value:false}]
    },
    {
      id:'scale',group:'The recovery space',short:'Partial scale knowledge',title:'Two planar pieces can revolve into one connected annulus.',
      question:'Keep the same range bracket. Allow the candidate to rotate around the line joining the two fixed anchors.',status:'Exact 2D and 3D formulas',dimension:2,
      assumptions:['Exact anchors at (0, 0) and (2, 0); equal ranges.','The common range r must satisfy a ≤ r ≤ b.','This is a restriction on range, not a new noisy measurement.'],
      finding:'At a = 2, b = 3 the planar set has two components: x = 1, √3 ≤ |y| ≤ √8. In 3D it becomes one connected annulus: x = 1, 3 ≤ y² + z² ≤ 8.',
      scope:'In 3D, the original planar pieces are purple and the complete annulus is green. Its hole stays empty. The angle changes the candidate position; the camera buttons only change the view.',
      terms:['feasible','target','prior','revolution','annulus'],evidence:'Checkpoint 009 proves the planar capped example. The added rotational corollary proves its complete 3D annulus and the constant ranges along every circular orbit.',
      sources:['PARTIAL_SCALE_AND_SHAPE_THEOREMS.md','scale_shape_theory_certificate.json','PARTIAL_SCALE_INDEPENDENT_REVIEW.md','ROTATIONAL_SYMMETRY_3D.md','rotation_geometry_checks.json'],
      controls:[{key:'space',label:'Allowed model space',type:'select',value:'plane',options:[['plane','Confined to the plane · 2D'],['three','Allow revolution around the anchors · 3D']]},{key:'lower',label:'Lower common range a',type:'range',min:0.1,max:3,step:.05,value:2},{key:'upper',label:'Upper common range b',type:'range',min:.2,max:4,step:.05,value:3},{key:'angle',label:'Physical rotation around anchors · degrees',type:'range',min:0,max:360,step:1,value:35}]
    },
    {
      id:'layout',group:'Shape and dimension',short:'Shape of an anchor layout',title:'The narrowest width gives shape-specific thresholds.',
      question:'Change the anchor layout and inspect its closest pair of supporting planes.',status:'Exact formulas',dimension:3,
      assumptions:['Finite anchors have equal requested ranges.','Each anchor has the same independent displacement tolerance.','γ is half the minimum width of the anchor hull in the stated ambient dimension.'],
      finding:'For these layouts: right triangle γ = 1/√2; 4 × 2 rectangle γ = 1; regular tetrahedron of edge 2 γ = 1/√2; cube of edge 2 γ = 1.',
      scope:'These are shapes made by the anchors. A known shape of the moving body is a different kind of information. Planar layouts here use the planar theorem; putting them in 3D would give zero minimum width.',
      terms:['gamma','anchor','prior'],evidence:'Twenty saved exact checks cover the shape formulas. The tetrahedron uses its true minimum-width direction, rather than a vertex altitude.',
      sources:['SHAPE_SPECIFIC_FORMULAS.md','shape_formula_checks.json'],
      controls:[{key:'shape',label:'Anchor layout and ambient space',type:'select',value:'tetra',options:[['triangle','Right triangle · 2D'],['rectangle','4 × 2 rectangle · 2D'],['tetra','Regular tetrahedron · 3D'],['cube','Cube · 3D']]}]
    },
    {
      id:'sphere',group:'Shape and dimension',short:'Continuous sphere of anchors',title:'A sphere gives a completely explicit recovery space.',
      question:'How far can a candidate move from the center before the tolerance is exhausted?',status:'Exact continuous model',dimension:3,
      assumptions:['An anchor is present at every point of a sphere of radius R = 1.','Requested ranges are equal; each anchor may move independently.','This is a continuous anchor surface, not a finite sampled anchor set.'],
      finding:'Δ(x) = min(‖x‖, 1). For δ < 1 the feasible set is the closed ball of radius δ. At δ ≥ 1 the whole ambient space is feasible.',
      scope:'The wire mesh represents the continuous sphere. The visible region is finite even when the theorem says all of space.',
      terms:['profile','delta','feasible'],evidence:'The continuous circle/sphere formula is distinct from the finite-polytope cases.',
      sources:['SHAPE_SPECIFIC_FORMULAS.md','shape_formula_checks.json'],
      controls:[{key:'delta',label:'Anchor uncertainty δ',type:'range',min:0,max:1.3,step:.01,value:.55},{key:'distance',label:'Candidate distance from center',type:'range',min:0,max:2.2,step:.02,value:.8}]
    },
    {
      id:'certified',group:'What the tests measured',short:'Certified recovery error',title:'Uncertain anchors widen a certified distance interval.',
      question:'Compare the actual feasible witnesses at three saved uncertainty levels.',status:'Saved numerical certificate',dimension:2,
      assumptions:['Four nominal anchors and squared-range ratios from checkpoint 003.','Squared-ratio tolerance is 0.01; anchor radius δ varies.','The target is distance from the unknown point to the origin.'],
      finding:'Refinement closed the earlier loose brackets. At δ = 0.01 the optimal error is certified between 0.0420054873 and 0.0420055874.',
      scope:'The two displayed points are saved feasible witnesses near the target extrema. Their connecting segment is only a comparison guide. This view does not depict the whole feasible set.',
      terms:['minimax','certificate','target','squared'],evidence:'Three rational interval-cover certificates, with separate audits; endpoint tolerance 10⁻⁷. Old checkpoint 004 brackets are superseded by these refinements.',
      sources:['REFINEMENT_REPORT.md','refined_anchor_small_certificate.json','refined_anchor_certificate.json','refined_anchor_large_certificate.json','refined_anchor_certificate_independent_validation.json'],
      controls:[{key:'level',label:'Saved anchor uncertainty δ',type:'select',value:'1',options:[['0','0.001'],['1','0.01'],['2','0.05']]},{key:'wide',label:'Show the full anchor layout',type:'check',value:false}]
    },
    {
      id:'rigid',group:'What the tests measured',short:'When known shape helps',title:'A known triangle improves one lossy target measurement.',
      question:'Compare recovery with and without the side-length information.',status:'Saved numerical certificate',dimension:2,
      assumptions:['Three calibrated anchors at (0, 0), (4, 0), (0, 4).','The body has known sides 1, 1, √2 in the rigid model.','Target: distance from X2 to B = (1, 1). Noise is in squared ranges.'],
      finding:'With a noisier third vertex, rigidity reduces optimal target error by about 70.06%. With equal noise at all three vertices, this example has exactly no gain.',
      scope:'The marked configurations are endpoint witnesses from the saved records. The close view magnifies genuine coordinate differences; it does not rescale or deform the triangle.',
      terms:['prior','minimax','target','certificate','squared'],evidence:'Exact no-gain proof for the equal case; rational cover and physical witnesses for the lossy rigid case. The global mirror branch is explicitly checked.',
      sources:['RIGID_TRIANGLE_REPORT.md','RIGID_TRIANGLE_PROOFS.md','triangle_comparison_certificate.json','triangle_lossy_rigid_certificate.json','triangle_lossy_rigid_certificate_independent_validation.json'],
      controls:[{key:'noise',label:'Third vertex squared-range tolerance',type:'select',value:'lossy',options:[['lossy','0.10 · third vertex is noisier'],['equal','0.01 · equal noise at all vertices']]},{key:'model',label:'Information included',type:'select',value:'rigid',options:[['rigid','Ranges + exact triangle shape'],['independent','Ranges only']]},{key:'wide',label:'Show the full anchor layout',type:'check',value:false}]
    },
    {
      id:'tolerance',group:'What the tests measured',short:'An imperfect shape prior',title:'Shape knowledge has a measurable tolerance budget.',
      question:'Relax the side lengths and inspect the exact threshold where target-error improvement ends.',status:'Sharp transition + certified bounds',dimension:2,
      assumptions:['Same calibrated lossy-triangle experiment as the preceding exhibit.','Each ordinary side length may vary by a relative tolerance τ.','The saved brackets bound optimal target error; some are intentionally loose.'],
      finding:'Checkpoint 016 resolves the old inconclusive rows: 0.5% sides guarantee at least 13.46% less target error; 1% sides guarantee at least 5.96%. The exact no-gain threshold is about 1.4213222%.',
      scope:'The bars show eight saved cases, with no interpolation of the unknown error curve. A separate theorem proves strict gain below the exact threshold and no gain at or above it.',
      terms:['prior','certificate','minimax'],evidence:'Checkpoint 009 supplies the earlier witnesses. Checkpoint 016 proves the sharp no-gain threshold, verifies algebraic endpoint states and sharpens the 0.5% and 1% bounds.',
      sources:['SHAPE_TOLERANCE_TRANSITION.md','shape_tolerance_transition.json','SCALE_SHAPE_REPORT.md','PARTIAL_SCALE_AND_SHAPE_THEOREMS.md','shape_tolerance_certificate.json','shape_tolerance_independent_validation.json'],
      controls:[{key:'level',label:'Saved relative side tolerance τ',type:'select',value:'4',options:[['0','0% · exact shape'],['1','0.01%'],['2','0.1%'],['3','0.25%'],['4','0.5%'],['5','1%'],['7','1.5% · above the exact threshold'],['6','2%']]},{key:'wide',label:'Show the full body',type:'check',value:false}]
    },
    {
      id:'shared',group:'Where assumptions matter',short:'One shared anchor',title:'Pairwise fits can fail when an anchor must be shared.',
      question:'Each pair has a valid anchor position. Can one anchor satisfy all three?',status:'Exact counterexample',dimension:2,
      assumptions:['Body points: (1, 0), (0, 1), (−1, 0).','One actual anchor must lie in the disk centered at the origin with radius 4/7.','All three requested squared ranges are 65/49.'],
      finding:'Every pair can be satisfied, but the triple cannot. The only point equidistant from all three is their circumcenter, where the squared range is 1 rather than 65/49.',
      scope:'Switching pairs changes the witness anchor. Those three different anchor positions cannot be silently combined into one shared-anchor solution.',
      terms:['shared','anchor','squared','feasible'],evidence:'Exact pair witnesses and the triple obstruction are certified. A separate saved check shows the obstruction persists under small squared-range intervals.',
      sources:['SHARED_ANCHOR_AND_RADIUS_THEOREMS.md','shared_anchor_radius_certificate.json'],
      controls:[{key:'pair',label:'Observations that must hold together',type:'select',value:'01',options:[['01','X0 and X1'],['12','X1 and X2'],['02','X0 and X2'],['all','All three observations']]}]
    },
    {
      id:'contact',group:'Where assumptions matter',short:'When uncertainty regions touch',title:'Anchor coincidence creates an exact escape threshold.',
      question:'Increase the uncertainty until the two anchor disks touch.',status:'Proved planar theorem',dimension:2,
      assumptions:['A planar unit right triangle; nominal anchors are (−1, 0) and (1, 0).','Four cross-ranges equal r; the fifth is at most r.','Each actual anchor may move by δ. Coincidence is allowed unless excluded below.'],
      finding:'With coincidence allowed, the common range is bounded for δ < 1 and unbounded for δ ≥ 1. Merely touching closed uncertainty disks is enough.',
      scope:'At and above contact, the displayed family uses coincident actual anchors. Requiring distinct actual anchors changes the assumptions and removes this escape mechanism.',
      terms:['shared','delta','escape','minimax'],evidence:'Exact boundary classification, constructive configurations and the sharp common-range interval. The audit also checks endpoints and rejects corrupted records.',
      sources:['MIXED_BOUNDARY_TRIANGLE_THEOREM.md','BOUNDARY_AUDIT_REPORT.md','mixed_boundary_certificate.json','boundary_audit_validation.json'],
      controls:[{key:'delta',label:'Each anchor uncertainty δ',type:'range',min:0,max:1.5,step:.01,value:.8},{key:'distance',label:'Escape-family parameter Y',type:'range',min:.5,max:10,step:.1,value:3},{key:'distinct',label:'Require actual anchors to be distinct',type:'check',value:false}]
    },
    {
      id:'noisy',group:'Where assumptions matter',short:'Relax equality, restore escape',title:'Tiny ratio slack can restore an unbounded family.',
      question:'An exact equality blocks this ray. Any positive slack eventually permits it.',status:'Proved family · capped cases now certified',dimension:2,
      assumptions:['Exact anchors at (−1, 0), (1, 0); a fixed unit right triangle.','The three nonreference cross-ratios are ordinary distance ratios in [1 − ε, 1 + ε].','The fifth range is at most the reference range; an optional upper range cap is shown.'],
      finding:'For every ε > 0, an explicit translated family becomes feasible sufficiently far away. An upper cap truncates this family. Checkpoint 014 now certifies 18 global capped cases; see Noise and the range cap.',
      scope:'The threshold is exact for this chosen ray, not a classification of all poses. Failure of this family below the cap does not prove the entire model infeasible.',
      terms:['escape','feasible','target'],evidence:'The finite-boundary theorem gives the exact squared residuals and constructive noisy escape family; twelve positive-slack cases are included in the certificate.',
      sources:['MIXED_BOUNDARY_TRIANGLE_THEOREM.md','mixed_boundary_certificate.json'],
      controls:[{key:'epsilon',label:'Ordinary ratio slack ε',type:'range',min:0,max:.2,step:.002,value:.04},{key:'height',label:'Translation parameter T',type:'range',min:.5,max:20,step:.1,value:6},{key:'cap',label:'Upper reference-range cap b',type:'range',min:1,max:25,step:.1,value:12},{key:'capped',label:'Apply the finite range cap',type:'check',value:false}]
    },
    {
      id:'arc',group:'Where assumptions matter',short:'A short arc and its radius',title:'A well-observed short arc can hide a very large radius.',
      question:'Let the sagitta uncertainty reach zero and the radius loses its finite upper bound.',status:'Classical exact formula',dimension:2,
      assumptions:['Half-chord length a = 1; nominal sagitta h₀ = 0.01.','The true positive sagitta lies in [h₀ − ε, h₀ + ε].','The target is the supporting circle’s radius.'],
      finding:'R(h) = (1 + h²)/(2h). The radius has a finite interval while the lower sagitta bound is positive, and becomes unbounded when zero enters the interval.',
      scope:'The default view shows the short measured arc. Whole-circle view reveals the large circles compatible with it. This is a classical conditioning example, not a novelty claim.',
      terms:['target','minimax','feasible'],evidence:'Exact endpoint formulas and the zero-sagitta threshold are saved alongside the shared-anchor work.',
      sources:['SHARED_ANCHOR_AND_RADIUS_THEOREMS.md','short_arc_threshold_certificate.json'],
      controls:[{key:'epsilon',label:'Sagitta uncertainty ε',type:'range',min:0,max:.015,step:.0001,value:.001},{key:'whole',label:'Show the whole supporting circles',type:'check',value:false}]
    },
    {
      id:'dimension',group:'Where assumptions matter',short:'Changing the actual dimension',title:'A rigid triangle can revolve while its ranges stay fixed.',
      question:'Turn the body around the anchor line, then increase its distance from that line.',status:'Exact 3D counterexample',dimension:3,
      assumptions:['The mixed-boundary triangle model lives in ℝ³.','The two distinct anchors stay exactly at (−1, 0, 0) and (1, 0, 0).','The triangle is lifted by T, then physically rotated around the x axis.'],
      finding:'Every rotation angle preserves the common squared range r² = 5/4 + T² and the fifth squared range 1/4 + T². Raising T allows unbounded range. Rotation and increasing range are different freedoms.',
      scope:'The angle control rotates the actual triangle while keeping the anchors fixed. T is the lift before rotation, not its final z coordinate. Purple circles trace the vertices’ possible motions.',
      terms:['pose','escape','target','revolution'],evidence:'The finite-boundary certificate supplies the unbounded 3D family. The added exact rotation checks show that all its ranges and side lengths survive a physical turn around the anchors.',
      sources:['MIXED_BOUNDARY_TRIANGLE_THEOREM.md','mixed_boundary_certificate.json','ROTATIONAL_SYMMETRY_3D.md','rotation_geometry_checks.json'],
      controls:[{key:'height',label:'Lift before rotation T',type:'range',min:0,max:8,step:.05,value:2},{key:'angle',label:'Physical body rotation · degrees',type:'range',min:0,max:360,step:1,value:0}]
    },
    {
      id:'classes',group:'Earlier foundations',short:'Two distance classes',title:'Generic rigidity was the starting question.',
      question:'Can two classes of pairwise distances change scale independently?',status:'Generic theorem · 3D bound open',dimension:2,
      assumptions:['Edges of the complete graph are partitioned into two nonempty classes.','Each class has one multiplier on its squared distances.','The planar configuration is generic; this drawing does not certify genericity.'],
      finding:'In the plane, five points force both multipliers to be equal: N₂(2) = 5. In three dimensions the project established only 6 ≤ N₂(3) ≤ 70.',
      scope:'Edge colors illustrate the two classes. They do not display a computed deformation. A local rank check alone is not a global realizability proof.',
      terms:['generic','squared'],evidence:'Seventeen K₅ partition orbits, circuit elimination and exact certificates support the planar result. Exceptional configurations and proof limitations are recorded.',
      sources:['GEOMETRY_RESEARCH_REPORT.md','PROOFS.md','research_certificates.json'],
      controls:[{key:'points',label:'Complete-graph size',type:'select',value:'5',options:[['4','Four points · below the generic threshold'],['5','Five points · planar threshold']]}]
    }
  ]
};
