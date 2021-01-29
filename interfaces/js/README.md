PDQ.js - Javascript version
----
This is a version of PDQ compiled to Javascript/WASM with the Emscripten C->JS compiler.

It exports an ES Module with .mjs extension (for web) and a CommonJS module for node (for use with require()).

Example uses are found in `test.js` (node) and `test.html` (web).

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