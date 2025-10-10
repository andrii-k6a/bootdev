const e = new Error("human-readabel error description");
// console.log(e); // includes stacktrace
console.log(e.message);

try {
    const foo = { foo: "bar" };
    console.log("About to get an error...");
    console.log(foo.x.y);
    console.log("Not executed statement");
} catch (err) {
    console.log(err.message);
} finally {
    console.log("This will always run regardless of any errors.");
}
console.log("Done");

try {
    throw new Error("an error can be thrown using trow");
} catch (err) {
    console.log(err.message);
}

try {
    throw "actually you can throw anything";
} catch (err) {
    console.log(err);
}

