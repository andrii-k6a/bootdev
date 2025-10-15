// Closures capture variables from their enclosing scope by reference, not by value. (including primitives)
// This means the closure accesses the live, most up-to-date value of the variable at the time the closure is executed, not a snapshot of the value when the closure was created.
// This behavior is crucial for understanding common issues like the "loop trap" and potential performance problems like memory leaks due to unintended variable retention

function surprise() {

    let value = 8;

    Promise.resolve()
        .then(() => {
            console.log(`The number is ${value}`);
        });

    value = 911;

}

surprise();

