/* Plain-language interpretation and replayable examples for each research model. */
window.RESEARCH_GUIDES={
  pose:{
    character:'Ambiguity · more than one answer fits',
    plain:'Think of the triangle as a rigid part and the squares as two reference beacons. The part can occupy two different placements while giving exactly the same distance readings. A distance can be pinned down even when the part’s placement is not.',
    use:'A robot may have enough information to report one distance, but still lack enough information to choose its position and orientation. This example helps separate those two goals.',
    intro:'Imagine placing the same rigid part in front of two beacons. Compare the two placements, then show them together.',
    examples:[{label:'Placement A',values:{placement:'first'},expect:'Notice the common distance: about 1.118 units.'},{label:'Placement B',values:{placement:'second'},expect:'The part moved, but the common distance is still about 1.118 units.'},{label:'Compare both',values:{placement:'both'},expect:'Two placements survive the same measurements. The distance is settled; the placement is ambiguous.'}]
  },
  inversion:{
    character:'Measurement value · removing an ambiguity',
    plain:'A sensor that retains distance proportions can lose absolute scale. These first three beacons cannot distinguish a nearby candidate from a much farther candidate. A beacon in a different place can tell them apart.',
    use:'Choosing where to add a beacon or which extra measurement to preserve. The useful measurement is one on which the competing explanations disagree.',
    intro:'Treat the two colored points as two possible tag locations. First use three beacons, then add the fourth.',
    examples:[{label:'Three beacons · two answers',values:{fourth:false},expect:'Both candidate locations produce the retained proportions.'},{label:'Add the fourth beacon',values:{fourth:true},expect:'The extra measurement rejects the nearby candidate. Its fourth ratio would be 17, while the observed value is 0.2.'}]
  },
  profile:{
    character:'Compatibility · can the error budget explain this?',
    plain:'The reported beacon positions may be a little wrong. For a proposed target location, ask how much the beacons would need to move to make the readings agree. The gap is the smallest movement budget that would make that proposal work.',
    use:'Checking whether a candidate explanation fits a sensor’s calibration tolerance. A large gap can reject a candidate; a small gap alone does not locate the target accurately.',
    intro:'The disks are allowed beacon movements. The little constructed anchor marks show where the beacons would need to be.',
    examples:[{label:'Too little tolerance',values:{x:1.8,y:1.1,delta:.4},expect:'The candidate needs about 0.496 units of anchor movement. A 0.4 budget cannot cover it.'},{label:'Allow the required movement',values:{x:1.8,y:1.1,delta:.55},expect:'The same candidate now fits. We changed the allowed beacon error, not the target location.'},{label:'A perfect fit',values:{x:1,y:1,delta:0},expect:'At this candidate, all three reported distances already agree. No anchor movement is required.'}]
  },
  residual:{
    character:'Counterexample · good fit is not accurate location',
    plain:'From far away, two nearby beacons look increasingly similar. Their distances become almost equal even at a location that stays off the exact solution line. The fit score improves without the position becoming more correct.',
    use:'Checking stopping rules in reconstruction or localization software. “The residual is small” needs an additional argument before it can mean “the position error is small.”',
    intro:'The green line contains all exact answers. The yellow segment measures how far the candidate misses that line.',
    examples:[{label:'Candidate at height 1',values:{height:1},expect:'The fit gap is about 0.618. The position gap is 1 unit.'},{label:'Candidate at height 20',values:{height:20},expect:'The fit gap drops below 0.05, but the yellow position gap is still exactly 1 unit.'}]
  },
  escape:{
    character:'Model scope · three anchors do not give axial symmetry',
    plain:'Two beacons allow a target to swing around their connecting line without changing its distances to them. A third beacon off that line usually notices the swing. So this three-beacon picture needs a new 3D calculation, rather than a simple revolution of its planar shape.',
    use:'Checking whether a planar sensor layout still constrains a target that can leave the plane. The 3D equal-range line here remains unbounded even with exact beacons.',
    intro:'Compare a bounded planar case with actual 3D freedom. Then turn the candidate around the first two anchors and watch the third reading break the fit.',
    examples:[{label:'Bounded in the plane',values:{space:'plane',delta:.65,angle:0,window:6},expect:'With the target confined to the plane, this tolerance lies below the positive escape threshold.'},{label:'Exact readings in 3D',values:{space:'three',delta:0,angle:0,window:4},expect:'Every point on the purple vertical line fits. The allowed set is unbounded even at zero tolerance.'},{label:'Try a quarter turn',values:{space:'three',delta:0,angle:90,window:4},expect:'The first two squared ranges stay at 2, but the third becomes 6. The rotated candidate is rejected.'},{label:'Allow 3D anchor uncertainty',values:{space:'three',delta:.25,angle:0,window:4},expect:'The green cloud is recomputed from 3D distances. It illustrates more possibilities around the exact-fit line.'}]
  },
  interior:{
    character:'Missing information · the outer hull is not everything',
    plain:'A summary of the outermost beacons ignores a beacon added in the middle. But the actual distance equations still have to satisfy that middle beacon. The outer shape can stay the same while the possible answers disappear.',
    use:'Testing whether a geometric summary throws away constraints that matter near a boundary case. This is a warning for relying only on far-away or hull-based summaries.',
    intro:'Keep the outer two beacons fixed. Add one exactly between them and ask for equal distances to all of them.',
    examples:[{label:'Two endpoint beacons',values:{interior:false},expect:'Every point on the green line is a valid answer.'},{label:'Add the middle beacon',values:{interior:true},expect:'The hull is unchanged, but there are no valid answers. The red dashed line is the old, now-rejected set.'}]
  },
  scale:{
    character:'Revolution · two planar pieces become one ring',
    plain:'Imagine the line between two beacons as a spindle. Every permitted target location can swing around that spindle without changing its distances. The two separated pieces seen in a planar slice sweep out one connected circular band in 3D.',
    use:'Understanding a distance-only tracker that knows a target is within a range band. In 3D it may know the target’s radial band while leaving the angle around the beacon line completely unresolved.',
    intro:'Start with two planar segments. Allow them to revolve into a flat annulus, then move the marked point around it.',
    examples:[{label:'Two planar segments',values:{space:'plane',lower:2,upper:3,angle:35},expect:'The z = 0 slice has two disconnected pieces, above and below the anchor line.'},{label:'Revolve into 3D',values:{space:'three',lower:2,upper:3,angle:35},expect:'The pieces sweep out one connected annulus. The purple segments show the original slice.'},{label:'Turn the point around the ring',values:{space:'three',lower:2,upper:3,angle:215},expect:'The marked point has moved halfway around the same circular orbit. Its range to each fixed anchor is unchanged.'},{label:'Remove the inner hole',values:{space:'three',lower:.5,upper:3,angle:35},expect:'The weaker lower range bound permits the center too, turning the annulus into a disk.'}]
  },
  layout:{
    character:'Sensor geometry · layout changes the threshold',
    plain:'Imagine squeezing the beacon arrangement between two parallel walls. Its narrowest possible width tells us the equal-range escape threshold. A flat arrangement has a blind direction if the target can move out of its plane.',
    use:'Comparing reference layouts for a tracking volume. The formula can guide where geometry is weak, within this equal-range uncertainty model.',
    intro:'The gold surfaces are the squeezing walls. Rotate the tetrahedron to see which edges they touch.',
    examples:[{label:'Tetrahedron in 3D',values:{shape:'tetra'},expect:'The narrowest walls touch opposite edges. The threshold is about 0.7071 units.'},{label:'Cube in 3D',values:{shape:'cube'},expect:'For a cube of edge 2, the narrowest width is 2 and the threshold is 1.'},{label:'Triangle in a plane',values:{shape:'triangle'},expect:'This is a 2D theorem. Camera rotation does not give it a third physical dimension.'}]
  },
  sphere:{
    character:'Ideal benchmark · complete coverage',
    plain:'Imagine reference beacons covering an entire spherical shell, with none missing. Below a certain uncertainty budget, the target is confined to a smaller ball around the center. At the shell’s radius, even arbitrarily distant targets become compatible.',
    use:'An ideal benchmark for studying incomplete sensor coverage. A real finite set of beacons needs its own analysis; the wire mesh stands for continuous coverage.',
    intro:'The cyan mesh is the reference shell. Move the candidate across the green feasible-ball boundary, then raise the tolerance to 1.',
    examples:[{label:'Candidate inside the allowed ball',values:{delta:.55,distance:.4},expect:'The candidate fits with the current uncertainty budget.'},{label:'Candidate outside the ball',values:{delta:.55,distance:.8},expect:'The same budget rejects this more distant candidate.'},{label:'Threshold reached',values:{delta:1,distance:1.8},expect:'Every location is now feasible. The finite outer mesh is just a drawing guide.'}]
  },
  certified:{
    character:'Certified experiment · an honest error interval',
    plain:'We asked for one output: the target’s distance from the origin. We found actual configurations near both extremes, then checked that no allowed configuration can push the answer much farther. The resulting error bracket is a guarantee for that target.',
    use:'Comparing calibration requirements or instruments by the uncertainty they leave in a chosen output. The saved examples quantify anchor-position uncertainty, rather than model a particular device.',
    intro:'Compare two saved calibration levels. The colored dots are real witness locations from the certificate, shown in a close view.',
    examples:[{label:'Tighter anchors · δ = 0.001',values:{level:'0',wide:false},expect:'The optimal distance error is about 0.0217083 units.'},{label:'Looser anchors · δ = 0.05',values:{level:'2',wide:false},expect:'The error rises to about 0.1326003 units. Both witness locations and the certified error bound change.'},{label:'See the full experiment',values:{level:'1',wide:true},expect:'The unknown point is near (2, 2); four beacons supply ratio readings and the target distance is measured to the origin.'}]
  },
  rigid:{
    character:'Value of prior information · shape can help',
    plain:'If three sensors are attached to a rigid triangle, they cannot drift independently. The reliable sensors can constrain the noisier one through the known side lengths. But extra shape knowledge helps only when it removes uncertainty in the output we care about.',
    use:'Estimating a poorly measured marker on a rigid tool or robot from better measured markers. This toy experiment tests the value of exact shape information for one distance.',
    intro:'Give the third vertex noisier readings. Compare using just the ranges with also knowing the rigid shape.',
    examples:[{label:'Noisy vertex · ranges only',values:{noise:'lossy',model:'independent',wide:false},expect:'The target error is about 0.0149072 units.'},{label:'Add the exact shape',values:{noise:'lossy',model:'rigid',wide:false},expect:'The error falls to about 0.0044633 units: roughly 70% less.'},{label:'Equal noise · no gain here',values:{noise:'equal',model:'rigid',wide:false},expect:'In this different noise pattern, both original target extremes remain possible. Exact shape adds no improvement for this target.'}]
  },
  tolerance:{
    character:'Tolerance budget · how exact must the prior be?',
    plain:'A manufactured part is not a perfect mathematical triangle. We relaxed its side lengths and found the exact tolerance where this particular distance stops benefiting from the shape. Below that point some benefit remains; above it the original distance extremes fit again.',
    use:'Deciding how accurately a body’s dimensions must be known for a desired recovery guarantee, before investing in tighter calibration or manufacturing tolerances.',
    intro:'The 0.5% and 1% cases were formerly inconclusive. Compare their improved bounds, then cross the exact no-gain threshold.',
    examples:[{label:'0.1% sides',values:{level:'2',wide:false},expect:'The certificate guarantees at least 44.27% less error than using ranges alone.'},{label:'0.5% · now resolved',values:{level:'4',wide:false},expect:'The new bound guarantees at least 13.46% less error. The exact optimum remains enclosed.'},{label:'1% · now resolved',values:{level:'5',wide:false},expect:'The new bound guarantees at least 5.96% less error.'},{label:'1.5% · no gain',values:{level:'7',wide:false},expect:'This exceeds the exact 1.4213222% threshold. Both original target extremes are attainable again.'}]
  },
  shared:{
    character:'Consistency · one physical object must serve every reading',
    plain:'Two measurements may agree if you put a beacon in one place, and another pair may agree if you move it somewhere else. That does not mean all measurements agree with one physical beacon. The same anchor has to satisfy them together.',
    use:'Checking multi-sensor calibration and joint localization. Independent pairwise checks can accidentally grant the same physical reference several incompatible positions.',
    intro:'Fit two observations at a time, then require all three to use the same anchor.',
    examples:[{label:'Fit the first pair',values:{pair:'01'},expect:'The purple square is a valid single anchor for this pair.'},{label:'Fit a different pair',values:{pair:'02'},expect:'This pair also fits—but it needs a different anchor location.'},{label:'Require all three',values:{pair:'all'},expect:'No anchor can meet all three requested ranges. Pairwise success did not establish joint feasibility.'}]
  },
  contact:{
    character:'Boundary change · a new family suddenly appears',
    plain:'The disks show where two beacons might actually be. When the disks first touch, the beacons are allowed to occupy exactly the same point. That special possibility lets a rigid triangle move arbitrarily far away while the stated relations still hold.',
    use:'Stress-testing reference-position uncertainty in a localization model. This identifies why allowing two reference points to coincide can change a recovery guarantee completely.',
    intro:'Compare the settings just before and at contact. Then forbid actual beacon coincidence to see which assumption caused the change.',
    examples:[{label:'Just before contact · δ = 0.99',values:{delta:.99,distance:3,distinct:false},expect:'All compatible common ranges are bounded; the worst-case range error remains finite.'},{label:'At contact · δ = 1',values:{delta:1,distance:6,distinct:false},expect:'A new coincident-anchor family is allowed. Increase Y to move the triangle farther away while it stays feasible.'},{label:'Require distinct beacons',values:{delta:1,distance:6,distinct:true},expect:'The added assumption removes coincidence. The distinct-anchor branch has a finite sharp range interval.'}]
  },
  noisy:{
    character:'Sensitivity · exact equality is strong information',
    plain:'From very far away, small differences between distances become tiny proportions. Once the model allows even a little ratio slack, a distant triangle can fit readings that its nearby placement fails. A maximum range can rule out this particular distant family.',
    use:'Understanding why guarantees based on exact relative measurements can change when readings are rounded or noisy. It motivates combining realistic ratio tolerance with a physical range cap.',
    intro:'Start with exact ratios. Allow 4% slack, then apply a maximum reference range.',
    examples:[{label:'Exact ratios · family rejected',values:{epsilon:0,height:6,cap:4,capped:false},expect:'This translated family cannot satisfy the exact equalities at any finite distance.'},{label:'4% slack · family fits',values:{epsilon:.04,height:6,cap:4,capped:false},expect:'At T = 6, this family fits. Its two nontrivial ratios lie inside [0.96, 1.04].'},{label:'Add a range cap of 4',values:{epsilon:.04,height:6,cap:4,capped:true},expect:'The cap rejects this family member. It does not prove there are no other feasible poses.'}]
  },
  arc:{
    character:'Ill-conditioning · a small local error becomes a large global one',
    plain:'A small piece of a large circle looks nearly straight. A tiny change in the arc’s bulge can therefore correspond to a big change in the circle’s radius. If the bulge can be arbitrarily close to zero, the radius can be arbitrarily large.',
    use:'Reasoning about radius recovery from a short observed arc, such as a scanned curved edge. This example uses a fixed chord and uncertainty in the arc’s midpoint height.',
    intro:'Imagine a 2-metre chord with a 10-millimetre bulge, uncertain by 1 millimetre. The displayed unit is then a metre.',
    examples:[{label:'See the measured short arcs',values:{epsilon:.001,whole:false},expect:'The two arcs look nearly identical at their true scale.'},{label:'See their whole circles',values:{epsilon:.001,whole:true},expect:'The possible radius spans about 45.46 to 55.56 metres—roughly a 10.10-metre spread.'},{label:'Allow the bulge to approach zero',values:{epsilon:.01,whole:true},expect:'There is no finite upper radius. The large purple circle is just one example from an unbounded family.'}]
  },
  dimension:{
    character:'Rotational freedom · the body moves, the readings stay',
    plain:'The line joining two fixed beacons acts like an axle. A rigid triangle can turn around that axle without changing any of its distances to the beacons. This is a real movement of the body that the range measurements cannot detect.',
    use:'Identifying an unresolved roll angle in a rigid-body tracker. An off-axis reference or appropriate orientation information can help distinguish poses that two on-axis beacons cannot tell apart.',
    intro:'Start with the planar triangle, then give the actual body a quarter turn. The camera is independent of this physical motion.',
    examples:[{label:'Planar starting pose',values:{height:0,angle:0},expect:'The four common squared ranges are 1.25.'},{label:'Rotate the body by 90°',values:{height:0,angle:90},expect:'The triangle leaves its starting plane. Its four common squared ranges are still 1.25.'},{label:'Continue to a half turn',values:{height:0,angle:180},expect:'This reaches the other pose from the first exhibit through a continuous 3D motion. All ranges are unchanged.'},{label:'Increase the orbit radius',values:{height:4,angle:90},expect:'The lift before rotation is now 4. The common squared ranges become 17.25; turning around this larger orbit still preserves them.'}]
  },
  classes:{
    character:'Structural rigidity · can two groups scale separately?',
    plain:'Imagine keeping every pairwise connection between points, but separating those connections into two color groups. Could each group have its own scale change and still describe a valid planar geometry? For a generic five-point arrangement, the two scales must agree.',
    use:'Studying consistency when two sets of geometric measurements have separate unknown calibration factors. This theorem concerns exact squared distances and generic configurations.',
    intro:'The colored graph illustrates the two measurement groups. Compare its size with the proved planar threshold.',
    examples:[{label:'Four points',values:{points:'4'},expect:'Four is below the uniform generic threshold. The picture itself is not a deformation experiment.'},{label:'Five points',values:{points:'5'},expect:'For generic planar points, every nonempty two-class partition forces one common scale. The exact 3D threshold remains unresolved.'}]
  }
};
