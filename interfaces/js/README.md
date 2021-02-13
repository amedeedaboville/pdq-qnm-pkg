PDQ.js - Javascript version
----
![GitHub pages](https://github.com/amedeedaboville/pdq-qnm-pkg/workflows/GitHub%20pages/badge.svg?branch=master)

This is a version of PDQ compiled to Javascript/WASM with the Emscripten C->JS compiler.

It exports an ES Module with .mjs extension (for web) and a CommonJS module for node (for use with require()).

Documentation
----
[Documentation is here](https://amedeedaboville.github.io/pdq-qnm-pkg/).

An example use looks like this:

```
require('./dist/pdq.js')().then(pdq => {
    const requests = 400;
    const threads = 300;
    const service_time = 0.444;

    pdq.init("My model");
    pdq.createClosed("Requests", pdq.BATCH, requests, 0.0);
    pdq.createMultiNode(threads, "Threads", pdq.MSC, pdq.FCFS);
    pdq.setDemand("Threads", "Requests", service_time);
    pdq.setWUnit("Reqs");
    pdq.solve(pdq.EXACT);
    pdq.report();
})
```

Other examples are found in `test.js` (node) and `test.html` (web).

Dependencies
----
Emscripten (emcc and related) tools are needed for the build.

Notes
----
ATM the ES module only supports web and the CJS module only supports running in node.
When https://github.com/emscripten-core/emscripten/issues/11792 and related issues are fixed
I'll turn on `environment=node,script` and probably make the ES Module the only compiled output of the package.

First todo is to make a wrapper function that returns the results of `report()` as an object instead
of logging to the console.