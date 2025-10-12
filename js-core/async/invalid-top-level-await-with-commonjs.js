// likely function redeclaration makes node treat the script as CommonJS module where top level await are forbidden
function xyz() {
}
function xyz() {
}

const resolvedPromise = Promise.resolve(42);

// SyntaxError: await is only valid in async functions and the top level bodies of modules
await resolvedPromise;

