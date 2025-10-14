// This promise is resolved immediately (when resolveOuter is called),
// but it won't be fulfilled until ~1 second later when the inner promise fulfills.
// Demonstrates that "resolved" ≠ "fulfilled" - a resolved promise can still be pending.
const p = new Promise((resolveOuter) => {
    console.log("Outer promise created - RESOLVED immediately");
    resolveOuter(
        new Promise((resolveInner) => {
            console.log("Inner promise created - PENDING resolution");
            setTimeout(resolveInner("result"), 1000);
        }),
    );

    // Calling resolve func second time does nothing - promise is already resolved (locked)
    // Resolved promise means that the promise is settled or "locked-in" to match the eventual state of another promise, and further resolving or rejecting it has no effect.
    resolvedOuter("Does not matter - this value is ignored becase the promise was already resolved");
});

console.log("Outer promise state: still PENDING (even though resolved)");

p.then((value) => {
    console.log("Outer promise FULFILLED with:", value);
});

