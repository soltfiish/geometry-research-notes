"""Recompute matched-setting search ratios from retained checkpoint 056 trials."""
from pathlib import Path
import json
from statistics import median

data = json.loads((Path(__file__).parent / 'evidence/056/ablation.json').read_text())
entries = {(e['case'], e['inhc4'], e['form']): e for e in data['entries']}
ratios, cells = [], []
for case, flag in sorted({(e['case'], e['inhc4']) for e in data['entries']}):
    trials = [[t for t in entries[case, flag, form]['trials'] if t['trial'] > 0]
              for form in ('original', 'reduced')]
    assert all(len(ts) == 5 and all(t['status'] == 0 for t in ts) for ts in trials)
    original, reduced = trials
    ratio = median(t['search_seconds'] for t in original) / median(t['search_seconds'] for t in reduced)
    cell_ratio = median(t['cells'] for t in original) / median(t['cells'] for t in reduced)
    ratios.append(ratio)
    cells.append(cell_ratio)
    print(f'{case:24s} inner-HC4={int(flag)} search={ratio:.2f}x cells={cell_ratio:.2f}x')
print(f'{len(ratios)} paired comparisons; search {min(ratios):.2f}-{max(ratios):.2f}x; cells {min(cells):.2f}-{max(cells):.2f}x')
