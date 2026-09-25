# Reuse the model-gallery structure

The reusable idea is one exhibit per question or assumption change. Every exhibit keeps five things together: a manipulable model, its hypotheses, the outcome, the strength of the evidence, and its source.

For a new theory repository, first choose a small tour: the simplest model, a useful positive result, a counterexample, a boundary case, a numerical experiment, and an open question. Add more only when they teach a distinct idea. A theoretical result does not need to be turned into 3D if a line, plane, graph or chart is clearer.

## File responsibilities

| File | Purpose | Reuse action |
|---|---|---|
| `renderer.js` | Orbitable orthographic 3D camera; points, curves, faces, circles and sphere meshes | Keep for geometric projects |
| `gallery.js` | Navigation, controls, definitions, outcomes, evidence links and bound charts | Keep the structure; update the project title if needed |
| `gallery.css`, `index.html` | Responsive shell | Keep; change project branding and introductory text |
| `catalog.js` | Questions, hypotheses, definitions, evidence status and control definitions | Replace with your project's exhibits |
| `guides.js` | Plain explanations, characterization, possible use cases and replayable examples | Replace; preserve the distinction between a tested model and a possible application |
| `scenes.js` | Geometry and model-specific calculations | Replace; one function for each exhibit ID |
| `discoveries.js`, `discovery-scenes.js` | Additional GCS checkpoints using the same contracts | Replace or remove their script tags when reusing the gallery |
| `evidence-data.js` | A small embedded snapshot of saved results | Replace from your own evidence |
| `sources/`, `source-manifest.json` | Original source records and provenance hashes | Replace; never carry unrelated research records forward |
| `build_snapshot.py` | This GCS project's extraction and provenance script | Adapt deliberately; it assumes the GCS certificate schemas |

The finished gallery runs from a file or a static web server. No hosted service is required. Keep operational logs, browser profiles, credentials and unrelated repository files out of any copy you distribute.

## Exhibit contract

A catalog entry has an `id`, `group`, `short` label, `title`, `question`, evidence `status`, `assumptions` array, `finding`, display `scope`, term keys, evidence description, source filenames, and controls. Supported controls are numeric ranges, finite selections and checkboxes.

The matching scene function receives those control values and returns:

```js
{
  scene,                 // model(center, radius, actualDimension)
  metrics: [             // only quantities that explain the experiment
    { label: '...', value: '...' }
  ],
  text: 'What the current setting demonstrates.',
  legend: [[color, 'Meaning of this visual mark']],
  caption: 'What is and is not represented in the view.'
}
```

The renderer exposes `Geometry.model`, `point`, `line`, `path`, `face`, `circle`, `sphere`, `triangle`, vector operations in `V`, and a consistent semantic palette in `C`. Every point is a three-component coordinate array. Set the actual dimension to 2 for planar models, even though the camera can orbit them.

An optional `chart` contains a title, a finite maximum, units and rows `{label, lo, hi, color}`. It specifically represents lower and upper bounds on a nonnegative scalar error. Use a different chart specification for quantities that are not error bounds; do not silently reuse that interpretation.

## Evidence rules worth carrying forward

1. State the target before reporting recovery error. Identifying one scalar and identifying an entire configuration are different tasks.
2. State whether a parameter is a length, squared length, ratio, relative error, or abstract index. Define overloaded symbols beside their exhibit.
3. Separate changes of camera from changes of model assumptions. A rotated planar drawing does not prove a three-dimensional result.
4. Keep physical witnesses distinct from outer covers, sampled points and connecting guide lines. A segment between two feasible points need not be feasible.
5. Show the exact scope of each theorem. A necessary condition, sufficient condition, generic statement and full equivalence are different claims.
6. Report conservative bounds as intervals. A bound that fails to prove improvement does not prove no improvement.
7. Copy source records without altering them and record their hashes. Reference superseding corrections explicitly.
8. Use the visual to reveal a question or a failure mode. Never treat visual agreement, a finite sample or passing code checks as a mathematical proof.

## Before calling a gallery complete

Open every exhibit. Change every control type. Check important thresholds on both sides and at equality. Check that changing the ambient dimension changes the model label. Verify source links and compare extracted numbers to the original records. Inspect a narrow screen, label readability, and the scenes where geometry becomes very small or very large. Preserve a short validation record describing exactly what was checked.
