/**
 * Benchmark version.
 *
 * @type {string}
 */
var BENCHMARK_VERSION = 'RH100';

/*
 * List of benchmakrs. Array of objects.
 *
 * name:         Short human readable name of benchmark.
 * description:  Description of benchmark.
 * filename:     Filename of benchmark, each benchmark file must implement a test
 *               function and may implement a setUp and tearDown function.
 * runs:         List of parameters to feed to test, setUp and tearDown
 *               functions. For each entry a test run is constructed and the
 *               parameter in the second field is fed to the test function.
 *               The first field is a short human readable description of the
 *               parameter.
 * weight:       Weight of test as relative to the other tests in the file.
 *               A percentage weight will be computed based on the relative
 *               weight of each benchmark.
 * baselineTime: Baseline time, in milliseconds.
 */
var benchmarks = [
  {
      name: 'Add Rows to Table',
      description: 'Tests adding rows to an existing table',
      filename: 'tests/addrow.html',
      runs: [
        ['250 rows',   250],
        ['1000 rows', 1000]
      ],
      weight: 2,
      baselineTime: 38
  },

  {
      name: 'Add Columns to Table',
      description: 'Tests adding columns to an existing table',
      filename: 'tests/addcol.html',      
      runs: [
        ['250 columns',   250],
        ['1000 columns', 1000]
      ],
      weight: 1,
      baselineTime: 46.5
  },

  {
      name: 'Descendant Selector',
      description: 'Tests descendant selectors at different DOM depths',
      filename: 'tests/descendantselector.html',
      runs: [
        ['1000 nodes deep', 1000]
      ],
      weight: 2,
      baselineTime: 47.99
  },

/*
  {
      name: 'Input Selection',
      description: 'Test the cost of selecting the text in an input field. In some browsers this causes a relayout which can be expensive.',
      filename: 'tests/inputselect.html',
      runs: [
        ['10 nodes deep',     10],
        ['100 nodes deep',   100],
        ['1000 nodes deep', 1000]
      ],
      weight: 1,
      baselineTime: 2.75
  },
*/

  {
      name: '2D Canvas Draw',
      description: 'Test 2D canvas line painting.',
      filename: 'tests/canvasdrawline.html',
      runs: [
        ['1000 lines', 1000],
        ['10000 lines', 10000]
      ],
      weight: 3,
      baselineTime: 461.02
  },

  {
      name: 'innerHTML Table',
      description: 'Test table render speed after innerHTML.',
      filename: 'tests/createtable.html',
      runs: [
        ['200x10', [200, 10]],
        ['200x50', [200, 50]],
        ['200x100', [200, 100]]
      ],
      weight: 2,
      baselineTime: 209.895
  },

  {
      name: 'Table scrolling',
      description: 'Test scrolling speed using scrollTop',
      filename: 'tests/table_scrolltop.html',
      runs: [
        ['500x10', [500, 10]],
        ['500x50', [500, 50]],
        ['1000,10', [1000, 10]],
        ['1000,50', [1000, 50]]
      ],
      weight: 1,
      baselineTime: 204.36
  },

  {
      name: 'Resize columns',
      description: 'Test resizing columns in a table',
      filename: 'tests/resizecol.html',
      runs: [
        ['500x10', [500, 10]],
        ['500x50', [500, 50]],
        ['500x100', [500, 100]]
      ],
      weight: 2,
      baselineTime: 1892.655
  },

  {
      name: 'SVG resize',
      description: 'Test resizing SVGs',
      filename: 'tests/svgresize.html',
      runs: [
        ['50 SVGs', 50],
        ['100 SVGs', 100],
        ['500 SVGs', 500]
      ],
      weight: 5,
      baselineTime: 41.43
  }
];
