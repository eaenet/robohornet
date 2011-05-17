# Benchmark.js API documentation

<!-- div -->


<!-- div -->

## `Benchmark`
* [`Benchmark`](#Benchmark)
* [`Benchmark.options`](#Benchmark.options)
* [`Benchmark.platform`](#Benchmark.platform)
* [`Benchmark.version`](#Benchmark.version)
* [`Benchmark.each`](#Benchmark.each)
* [`Benchmark.extend`](#Benchmark.extend)
* [`Benchmark.filter`](#Benchmark.filter)
* [`Benchmark.formatNumber`](#Benchmark.formatNumber)
* [`Benchmark.hasKey`](#Benchmark.hasKey)
* [`Benchmark.indexOf`](#Benchmark.indexOf)
* [`Benchmark.interpolate`](#Benchmark.interpolate)
* [`Benchmark.invoke`](#Benchmark.invoke)
* [`Benchmark.isArray`](#Benchmark.isArray)
* [`Benchmark.isClassOf`](#Benchmark.isClassOf)
* [`Benchmark.isHostType`](#Benchmark.isHostType)
* [`Benchmark.join`](#Benchmark.join)
* [`Benchmark.map`](#Benchmark.map)
* [`Benchmark.noop`](#Benchmark.noop)
* [`Benchmark.pluck`](#Benchmark.pluck)
* [`Benchmark.reduce`](#Benchmark.reduce)
* [`Benchmark.trim`](#Benchmark.trim)

<!-- /div -->


<!-- div -->

## `Benchmark.prototype`
* [`Benchmark#CYCLE_DELAY`](#Benchmark:CYCLE_DELAY)
* [`Benchmark#DEFAULT_ASYNC`](#Benchmark:DEFAULT_ASYNC)
* [`Benchmark#INIT_RUN_COUNT`](#Benchmark:INIT_RUN_COUNT)
* [`Benchmark#MAX_TIME_ELAPSED`](#Benchmark:MAX_TIME_ELAPSED)
* [`Benchmark#MIN_SAMPLE_SIZE`](#Benchmark:MIN_SAMPLE_SIZE)
* [`Benchmark#MIN_TIME`](#Benchmark:MIN_TIME)
* [`Benchmark#aborted`](#Benchmark:aborted)
* [`Benchmark#count`](#Benchmark:count)
* [`Benchmark#created`](#Benchmark:created)
* [`Benchmark#cycles`](#Benchmark:cycles)
* [`Benchmark#error`](#Benchmark:error)
* [`Benchmark#hz`](#Benchmark:hz)
* [`Benchmark#running`](#Benchmark:running)
* [`Benchmark#abort`](#Benchmark:abort)
* [`Benchmark#addListener`](#Benchmark:addListener)
* [`Benchmark#clone`](#Benchmark:clone)
* [`Benchmark#compare`](#Benchmark:compare)
* [`Benchmark#emit`](#Benchmark:emit)
* [`Benchmark#on`](#Benchmark:on)
* [`Benchmark#removeAllListeners`](#Benchmark:removeAllListeners)
* [`Benchmark#removeListener`](#Benchmark:removeListener)
* [`Benchmark#reset`](#Benchmark:reset)
* [`Benchmark#run`](#Benchmark:run)
* [`Benchmark#setup`](#Benchmark:setup)
* [`Benchmark#teardown`](#Benchmark:teardown)
* [`Benchmark#toString`](#Benchmark:toString)
* [`Benchmark#stats`](#Benchmark:stats)
* [`Benchmark#stats.ME`](#Benchmark:stats.ME)
* [`Benchmark#stats.RME`](#Benchmark:stats.RME)
* [`Benchmark#stats.SEM`](#Benchmark:stats.SEM)
* [`Benchmark#stats.deviation`](#Benchmark:stats.deviation)
* [`Benchmark#stats.mean`](#Benchmark:stats.mean)
* [`Benchmark#stats.size`](#Benchmark:stats.size)
* [`Benchmark#stats.variance`](#Benchmark:stats.variance)
* [`Benchmark#times`](#Benchmark:times)
* [`Benchmark#times.cycle`](#Benchmark:times.cycle)
* [`Benchmark#times.elapsed`](#Benchmark:times.elapsed)
* [`Benchmark#times.period`](#Benchmark:times.period)
* [`Benchmark#times.start`](#Benchmark:times.start)
* [`Benchmark#times.stop`](#Benchmark:times.stop)

<!-- /div -->


<!-- div -->

## `Benchmark.Suite`
* [`Benchmark.Suite`](#Benchmark.Suite)
* [`Benchmark.Suite.options`](#Benchmark.Suite.options)

<!-- /div -->


<!-- div -->

## `Benchmark.Suite.prototype`
* [`Benchmark.Suite#aborted`](#Benchmark.Suite:aborted)
* [`Benchmark.Suite#length`](#Benchmark.Suite:length)
* [`Benchmark.Suite#running`](#Benchmark.Suite:running)
* [`Benchmark.Suite#abort`](#Benchmark.Suite:abort)
* [`Benchmark.Suite#add`](#Benchmark.Suite:add)
* [`Benchmark.Suite#addListener`](#Benchmark.Suite:addListener)
* [`Benchmark.Suite#clone`](#Benchmark.Suite:clone)
* [`Benchmark.Suite#each`](#Benchmark.Suite:each)
* [`Benchmark.Suite#emit`](#Benchmark.Suite:emit)
* [`Benchmark.Suite#filter`](#Benchmark.Suite:filter)
* [`Benchmark.Suite#indexOf`](#Benchmark.Suite:indexOf)
* [`Benchmark.Suite#invoke`](#Benchmark.Suite:invoke)
* [`Benchmark.Suite#map`](#Benchmark.Suite:map)
* [`Benchmark.Suite#on`](#Benchmark.Suite:on)
* [`Benchmark.Suite#pluck`](#Benchmark.Suite:pluck)
* [`Benchmark.Suite#reduce`](#Benchmark.Suite:reduce)
* [`Benchmark.Suite#removeAllListeners`](#Benchmark.Suite:removeAllListeners)
* [`Benchmark.Suite#removeListener`](#Benchmark.Suite:removeListener)
* [`Benchmark.Suite#reset`](#Benchmark.Suite:reset)
* [`Benchmark.Suite#run`](#Benchmark.Suite:run)

<!-- /div -->


<!-- /div -->


<!-- div -->


<!-- div -->

## `Benchmark`

<!-- div -->

### <a id="Benchmark" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L130" title="View in source">`Benchmark(name, fn [, options={}])`</a>
Benchmark constructor.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the benchmark.
2. `fn` *(Function)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

#### Example
    // basic usage
    var bench = new Benchmark(fn);

    // or using a name first
    var bench = new Benchmark('foo', fn);

    // or with options
    var bench = new Benchmark('foo', fn, {

      // displayed by Benchmark#toString if `name` is not available
      'id': 'xyz',

      // called when the benchmark starts running
      'onStart': onStart,

      // called after each run cycle
      'onCycle': onCycle,

      // called when aborted
      'onAbort': onAbort,

      // called when a test errors
      'onError': onError,

      // called when reset
      'onReset': onReset,

      // called when the benchmark completes running
      'onComplete': onComplete,

      // compiled/called before the test loop
      'setup': setup,

      // compiled/called after the test loop
      'teardown': teardown
    });

    // or options only
    var bench = new Benchmark({

      // benchmark name
      'name': 'foo',

      // benchmark test function
      'fn': fn
    });

    // a test's `this` binding is set to the benchmark instance
    var bench = new Benchmark('foo', function() {
      'My name is '.concat(this.name); // My name is foo
    });

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1735" title="View in source">`Benchmark.options`</a>
*(Object)*: The default options object copied by instances.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1540" title="View in source">`Benchmark.platform`</a>
*(Object)*: Platform object containing browser name, version, and operating system.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.version" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1727" title="View in source">`Benchmark.version`</a>
*(String)*: The version number.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.each" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L549" title="View in source">`Benchmark.each(object, callback)`</a>
A bare-bones `Array#forEach`/`for-in` own property solution.
Callbacks may terminate the loop by explicitly returning `false`.
[&#9650;][1]

#### Arguments
1. `object` *(Array|Object)*: The object to iterate over.
2. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Array|Object)*: Returns the object iterated over.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.extend" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L577" title="View in source">`Benchmark.extend(destination [, source={}])`</a>
Copies own/inherited properties of a source object to the destination object.
[&#9650;][1]

#### Arguments
1. `destination` *(Object)*: The destination object.
2. `[source={}]` *(Object)*: The source object.

#### Returns
*(Object)*: The destination object.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.filter" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L608" title="View in source">`Benchmark.filter(array, callback)`</a>
A generic bare-bones `Array#filter` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function|String)*: The function/alias called per iteration.

#### Returns
*(Array)*: A new array of values that passed callback filter.

#### Example
    // get odd numbers
    Benchmark.filter([1, 2, 3, 4, 5], function(n) {
      return n % 2;
    }); // -> [1, 3, 5];

    // get fastest benchmarks
    Benchmark.filter(benches, 'fastest');

    // get slowest benchmarks
    Benchmark.filter(benches, 'slowest');

    // get benchmarks that completed without erroring
    Benchmark.filter(benches, 'successful');

<!-- /div -->


<!-- div -->

### <a id="Benchmark.formatNumber" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L637" title="View in source">`Benchmark.formatNumber(number)`</a>
Converts a number to a more readable comma-separated string representation.
[&#9650;][1]

#### Arguments
1. `number` *(Number)*: The number to convert.

#### Returns
*(String)*: The more readable string representation.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.hasKey" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L650" title="View in source">`Benchmark.hasKey(object, key)`</a>
Checks if an object has the specified key as a direct property.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to check.
2. `key` *(String)*: The key to check for.

#### Returns
*(Boolean)*: Returns `true` if key is a direct property, else `false`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.indexOf" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L678" title="View in source">`Benchmark.indexOf(array, value)`</a>
A generic bare-bones `Array#indexOf` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `value` *(Mixed)*: The value to search for.

#### Returns
*(Number)*: The index of the matched value or `-1`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.interpolate" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L824" title="View in source">`Benchmark.interpolate(string, object)`</a>
Modify a string by replacing named tokens with matching object property values.
[&#9650;][1]

#### Arguments
1. `string` *(String)*: The string to modify.
2. `object` *(Object)*: The template object.

#### Returns
*(String)*: The modified string.

#### Example
    Benchmark.interpolate('#{greet} #{who}!', {
      'greet': 'Hello',
      'who': 'world'
    }); // -> 'Hello world!'

<!-- /div -->


<!-- div -->

### <a id="Benchmark.invoke" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L727" title="View in source">`Benchmark.invoke(benches, name [, arg1, arg2, ...])`</a>
Invokes a method on all items in an array.
[&#9650;][1]

#### Arguments
1. `benches` *(Array)*: Array of benchmarks to iterate over.
2. `name` *(String|Object)*: The name of the method to invoke OR options object.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

#### Returns
*(Array)*: A new array of values returned from each method invoked.

#### Example
    // invoke `reset` on all benchmarks
    Benchmark.invoke(benches, 'reset');

    // invoke `emit` with arguments
    Benchmark.invoke(benches, 'emit', 'complete', listener);

    // invoke `run(true)`, treat benchmarks as a queue, and register invoke callbacks
    Benchmark.invoke(benches, {

      // invoke the `run` method
      'name': 'run',

      // pass a single argument
      'args': true,

      // treat as queue, removing benchmarks from front of `benches` until empty
      'queued': true,

      // called before any benchmarks have been invoked.
      'onStart': onStart,

      // called between invoking benchmarks
      'onCycle': onCycle,

      // called after all benchmarks have been invoked.
      'onComplete': onComplete
    });

<!-- /div -->


<!-- div -->

### <a id="Benchmark.isArray" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L839" title="View in source">`Benchmark.isArray(value)`</a>
Determines if the given value is an array.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if value is an array, else `false`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.isClassOf" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L851" title="View in source">`Benchmark.isClassOf(object, name)`</a>
Checks if an object is of the specified class.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object.
2. `name` *(String)*: The name of the class.

#### Returns
*(Boolean)*: Returns `true` if of the class, else `false`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.isHostType" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L865" title="View in source">`Benchmark.isHostType(object, property)`</a>
Host objects can return type values that are different from their actual
data type. The objects we are concerned with usually return non-primitive
types of object, function, or unknown.
[&#9650;][1]

#### Arguments
1. `object` *(Mixed)*: The owner of the property.
2. `property` *(String)*: The property to check.

#### Returns
*(Boolean)*: Returns `true` if the property value is a non-primitive, else `false`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.join" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L879" title="View in source">`Benchmark.join(object [, separator1=',', separator2=': '])`</a>
Creates a string of joined array values or object key-value pairs.
[&#9650;][1]

#### Arguments
1. `object` *(Array|Object)*: The object to operate on.
2. `[separator1=',']` *(String)*: The separator used between key-value pairs.
3. `[separator2=': ']` *(String)*: The separator used between keys and values.

#### Returns
*(String)*: The joined result.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.map" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L901" title="View in source">`Benchmark.map(array, callback)`</a>
A generic bare-bones `Array#map` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Array)*: A new array of values returned by the callback.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.noop" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L913" title="View in source">`Benchmark.noop`</a>
A no-operation function.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.pluck" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L925" title="View in source">`Benchmark.pluck(array, property)`</a>
Retrieves the value of a specified property from all items in an array.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: A new array of property values.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.reduce" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L940" title="View in source">`Benchmark.reduce(array, callback, accumulator)`</a>
A generic bare-bones `Array#reduce` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `accumulator` *(Mixed)*: Initial value of the accumulator.

#### Returns
*(Mixed)*: The accumulator.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.trim" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L954" title="View in source">`Benchmark.trim(string)`</a>
A generic bare-bones `String#trim` solution.
[&#9650;][1]

#### Arguments
1. `string` *(String)*: The string to trim.

#### Returns
*(String)*: The trimmed string.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.prototype`

<!-- div -->

### <a id="Benchmark:CYCLE_DELAY" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1801" title="View in source">`Benchmark#CYCLE_DELAY`</a>
*(Number)*: The delay between test cycles *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:DEFAULT_ASYNC" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1808" title="View in source">`Benchmark#DEFAULT_ASYNC`</a>
*(Boolean)*: A flag to indicate methods will run asynchronously by default.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:INIT_RUN_COUNT" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1815" title="View in source">`Benchmark#INIT_RUN_COUNT`</a>
*(Number)*: The default number of times to execute a test on a benchmark's first cycle.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:MAX_TIME_ELAPSED" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1822" title="View in source">`Benchmark#MAX_TIME_ELAPSED`</a>
*(Number)*: The maximum time a benchmark is allowed to run before finishing *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:MIN_SAMPLE_SIZE" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1829" title="View in source">`Benchmark#MIN_SAMPLE_SIZE`</a>
*(Number)*: The minimum sample size required to perform statistical analysis.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:MIN_TIME" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1836" title="View in source">`Benchmark#MIN_TIME`</a>
*(Number)*: The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:aborted" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1878" title="View in source">`Benchmark#aborted`</a>
*(Boolean)*: A flag to indicate if the benchmark is aborted.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:count" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1843" title="View in source">`Benchmark#count`</a>
*(Number)*: The number of times a test was executed.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:created" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1850" title="View in source">`Benchmark#created`</a>
*(Number)*: A timestamp of when the benchmark was created.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:cycles" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1857" title="View in source">`Benchmark#cycles`</a>
*(Number)*: The number of cycles performed while benchmarking.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:error" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1864" title="View in source">`Benchmark#error`</a>
*(Object|Null)*: The error object if the test failed.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:hz" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1871" title="View in source">`Benchmark#hz`</a>
*(Number)*: The number of executions per second.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:running" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1885" title="View in source">`Benchmark#running`</a>
*(Boolean)*: A flag to indicate if the benchmark is running.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:abort" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1192" title="View in source">`Benchmark#abort`</a>
Aborts the benchmark without recording times.
[&#9650;][1]

#### Returns
*(Object)*: The benchmark instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:addListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1103" title="View in source">`Benchmark#addListener(type, listener)`</a>
Registers a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function called when the event occurs.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.addListener('cycle', listener);

    // register a listener for multiple event types
    bench.addListener('start cycle', listener);

<!-- /div -->


<!-- div -->

### <a id="Benchmark:clone" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1220" title="View in source">`Benchmark#clone(options)`</a>
Creates a new benchmark using the same test and options.
[&#9650;][1]

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new benchmark instance.

#### Example
    var bizarro = bench.clone({
      'name': 'doppelganger'
    });

<!-- /div -->


<!-- div -->

### <a id="Benchmark:compare" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1238" title="View in source">`Benchmark#compare(other)`</a>
Determines if the benchmark's period is smaller than another.
[&#9650;][1]

#### Arguments
1. `other` *(Object)*: The benchmark to compare.

#### Returns
*(Number)*: Returns `1` if smaller, `-1` if larger, and `0` if indeterminate.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:emit" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1118" title="View in source">`Benchmark#emit(type)`</a>
Executes all registered listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:on" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1891" title="View in source">`Benchmark#on`</a>
Alias of [`Benchmark#addListener`](#Benchmark:addListener).
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:removeAllListeners" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1175" title="View in source">`Benchmark#removeAllListeners(type)`</a>
Unregisters all listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.removeAllListeners('cycle');

    // unregister all listeners for multiple event types
    bench.removeListener('start cycle');

<!-- /div -->


<!-- div -->

### <a id="Benchmark:removeListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1148" title="View in source">`Benchmark#removeListener(type, listener)`</a>
Unregisters a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.removeListener('cycle', listener);

    // unregister a listener for multiple event types
    bench.removeListener('start cycle', listener);

<!-- /div -->


<!-- div -->

### <a id="Benchmark:reset" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1258" title="View in source">`Benchmark#reset`</a>
Reset properties and abort if running.
[&#9650;][1]

#### Returns
*(Object)*: The benchmark instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:run" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1442" title="View in source">`Benchmark#run([async=false])`</a>
Runs the benchmark.
[&#9650;][1]

#### Arguments
1. `[async=false]` *(Boolean)*: Flag to run asynchronously.

#### Returns
*(Object)*: The benchmark instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:setup" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1917" title="View in source">`Benchmark#setup`</a>
Compiled into the test and executed immediately **before** the test loop.
[&#9650;][1]

#### Example
    var bench = new Benchmark({
      'fn': function() {
        a += 1;
      },
      'setup': function() {
        // reset local var `a` at the beginning of each test cycle
        a = 0;
      }
    });

    // compiles into something like:
    var a = 0;
    var start = new Date;
    while (count--) {
      a += 1;
    }
    var end = new Date - start;

<!-- /div -->


<!-- div -->

### <a id="Benchmark:teardown" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1924" title="View in source">`Benchmark#teardown`</a>
Compiled into the test and executed immediately **after** the test loop.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:toString" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1299" title="View in source">`Benchmark#toString`</a>
Displays relevant benchmark information when coerced to a string.
[&#9650;][1]

#### Returns
*(String)*: A string representation of the benchmark instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1931" title="View in source">`Benchmark#stats`</a>
*(Object)*: An object of stats including mean, margin or error, and standard deviation.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.ME" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1938" title="View in source">`Benchmark#stats.ME`</a>
*(Number)*: The margin of error.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.RME" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1945" title="View in source">`Benchmark#stats.RME`</a>
*(Number)*: The relative margin of error *(expressed as a percentage of the mean)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.SEM" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1952" title="View in source">`Benchmark#stats.SEM`</a>
*(Number)*: The standard error of the mean.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.deviation" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1959" title="View in source">`Benchmark#stats.deviation`</a>
*(Number)*: The sample standard deviation.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.mean" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1966" title="View in source">`Benchmark#stats.mean`</a>
*(Number)*: The sample arithmetic mean.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.size" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1973" title="View in source">`Benchmark#stats.size`</a>
*(Number)*: The sample size.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.variance" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1980" title="View in source">`Benchmark#stats.variance`</a>
*(Number)*: The sample variance.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1988" title="View in source">`Benchmark#times`</a>
*(Object)*: An object of timing data including cycle, elapsed, period, start, and stop.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.cycle" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1995" title="View in source">`Benchmark#times.cycle`</a>
*(Number)*: The time taken to complete the last cycle *(secs)*
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.elapsed" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2002" title="View in source">`Benchmark#times.elapsed`</a>
*(Number)*: The time taken to complete the benchmark *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.period" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2009" title="View in source">`Benchmark#times.period`</a>
*(Number)*: The time taken to execute the test once *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.start" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2016" title="View in source">`Benchmark#times.start`</a>
*(Number)*: A timestamp of when the benchmark started *(ms)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.stop" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2023" title="View in source">`Benchmark#times.stop`</a>
*(Number)*: A timestamp of when the benchmark finished *(ms)*.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Suite`

<!-- div -->

### <a id="Benchmark.Suite" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L194" title="View in source">`Benchmark.Suite(name [, options={}])`</a>
Suite constructor.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the suite.
2. `[options={}]` *(Object)*: Options object.

#### Example
    // basic usage
    var suite = new Benchmark.Suite;

    // or using a name first
    var suite = new Benchmark.Suite('foo');

    // or with options
    var suite = new Benchmark.Suite('foo', {

      // called when the suite starts running
      'onStart': onStart,

      // called between running benchmarks
      'onCycle': onCycle,

      // called when aborted
      'onAbort': onAbort,

      // called when a test errors
      'onError': onError,

      // called when reset
      'onReset': onReset,

      // called when the suite completes running
      'onComplete': onComplete
    });

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite.options" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2062" title="View in source">`Benchmark.Suite.options`</a>
*(Object)*: The default options object copied by instances.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Suite.prototype`

<!-- div -->

### <a id="Benchmark.Suite:aborted" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2080" title="View in source">`Benchmark.Suite#aborted`</a>
*(Boolean)*: A flag to indicate if the suite is aborted.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:length" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2073" title="View in source">`Benchmark.Suite#length`</a>
*(Number)*: The number of benchmarks in the suite.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:running" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2087" title="View in source">`Benchmark.Suite#running`</a>
*(Boolean)*: A flag to indicate if the suite is running.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:abort" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L966" title="View in source">`Benchmark.Suite#abortSuite`</a>
Aborts all benchmarks in the suite.
[&#9650;][1]

#### Returns
*(Object)*: The suite instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:add" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L996" title="View in source">`Benchmark.Suite#add(name, fn [, options={}])`</a>
Adds a test to the benchmark suite.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the benchmark.
2. `fn` *(Function)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    suite.add(fn);

    // or using a name first
    suite.add('foo', fn);

    // or with options
    suite.add('foo', fn, {
      'onCycle': onCycle,
      'onComplete': onComplete
    });

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:addListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1103" title="View in source">`Benchmark.Suite#addListener(type, listener)`</a>
Registers a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function called when the event occurs.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.addListener('cycle', listener);

    // register a listener for multiple event types
    bench.addListener('start cycle', listener);

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:clone" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1013" title="View in source">`Benchmark.Suite#cloneSuite(options)`</a>
Creates a new suite with cloned benchmarks.
[&#9650;][1]

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new suite instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:each" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2096" title="View in source">`Benchmark.Suite#each(callback)`</a>
A bare-bones `Array#forEach` solution.
Callbacks may terminate the loop by explicitly returning `false`.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Object)*: The suite iterated over.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:emit" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1118" title="View in source">`Benchmark.Suite#emit(type)`</a>
Executes all registered listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:filter" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1032" title="View in source">`Benchmark.Suite#filterSuite(callback)`</a>
A bare-bones `Array#filter` solution.
[&#9650;][1]

#### Arguments
1. `callback` *(Function|String)*: The function/alias called per iteration.

#### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:indexOf" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2104" title="View in source">`Benchmark.Suite#indexOf(value)`</a>
A bare-bones `Array#indexOf` solution.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to search for.

#### Returns
*(Number)*: The index of the matched value or `-1`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:invoke" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2113" title="View in source">`Benchmark.Suite#invoke(name [, arg1, arg2, ...])`</a>
Invokes a method on all benchmarks in the suite.
[&#9650;][1]

#### Arguments
1. `name` *(String|Object)*: The name of the method to invoke OR options object.
2. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

#### Returns
*(Array)*: A new array of values returned from each method invoked.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:map" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2121" title="View in source">`Benchmark.Suite#map(callback)`</a>
A bare-bones `Array#map` solution.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Array)*: A new array of values returned by the callback.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:on" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1891" title="View in source">`Benchmark.Suite#on`</a>
Alias of [`Benchmark#addListener`](#Benchmark:addListener).
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:pluck" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2129" title="View in source">`Benchmark.Suite#pluck(property)`</a>
Retrieves the value of a specified property from all benchmarks in the suite.
[&#9650;][1]

#### Arguments
1. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: A new array of property values.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:reduce" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2138" title="View in source">`Benchmark.Suite#reduce(callback, accumulator)`</a>
A bare-bones `Array#reduce` solution.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.
2. `accumulator` *(Mixed)*: Initial value of the accumulator.

#### Returns
*(Mixed)*: The accumulator.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:removeAllListeners" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1175" title="View in source">`Benchmark.Suite#removeAllListeners(type)`</a>
Unregisters all listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.removeAllListeners('cycle');

    // unregister all listeners for multiple event types
    bench.removeListener('start cycle');

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:removeListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1148" title="View in source">`Benchmark.Suite#removeListener(type, listener)`</a>
Unregisters a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.removeListener('cycle', listener);

    // unregister a listener for multiple event types
    bench.removeListener('start cycle', listener);

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:reset" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1046" title="View in source">`Benchmark.Suite#resetSuite`</a>
Resets all benchmarks in the suite.
[&#9650;][1]

#### Returns
*(Object)*: The suite instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:run" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1062" title="View in source">`Benchmark.Suite#runSuite([async=false, queued=false])`</a>
Runs the suite.
[&#9650;][1]

#### Arguments
1. `[async=false]` *(Boolean)*: Flag to run asynchronously.
2. `[queued=false]` *(Boolean)*: Flag to treat benchmarks as a queue.

#### Returns
*(Object)*: The suite instance.

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #readme "Jump back to the TOC."