"""Recompute descriptive summaries from retained checkpoint 058 measurements."""
import csv
from pathlib import Path
from statistics import median

rows = list(csv.DictReader(Path(__file__).with_name('geometry-timings.csv').open(encoding='utf-8-sig', newline='')))
for label, subset in [('All evaluation entries', rows), ('Unique calibration layouts', [r for r in rows if r['role'] == 'selection'])]:
    fast = sum(float(r['ibex_search_ms']) >= 2 * float(r['heuristic_search_ms']) for r in subset)
    met = sum(r['accuracy_target_met'].lower() == 'true' for r in subset)
    print(f'{label}: {len(subset)}; target met: {met}; heuristic >=2x faster: {fast}')
    print(f"  Median of entry search medians (ms): heuristic={median(float(r['heuristic_search_ms']) for r in subset):.4f}; IBEX={median(float(r['ibex_search_ms']) for r in subset):.4f}")
print('Descriptive reconstruction only. Different guarantees; repeated entries are not independent holdouts.')
