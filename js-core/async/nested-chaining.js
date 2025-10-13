// • Both promises create the same promise chain (6 promises each)
// • Readability: Flat is cleaner, nested creates "pyramid"
// • Scope: Nested allows inner promises to access outer variables
// • Execution: Identical - same microtasks, same order, same output
// • When to nest: Only when you need multiple previous values in scope

// Example when nesting is useful:
// .then(user => {
//     return fetch(`/posts/${user.id}`)
//         .then(posts => {
//             return { user, posts }; // Access both user and posts
//         })
// })

// Note: No guarantee which fetch promise settles first. Second fetch might resolve before first due to network variability.
Promise.resolve(1)
    .then(val => {
        console.log(val);
        return fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => {
                process.stdout.write("1ST: ");
                console.log(json);
            })
    })
    .then(() => console.log(`1st Done!`));

Promise.resolve(2)
    .then(val => {
        console.log(val);
        return fetch('https://jsonplaceholder.typicode.com/todos/1')
    })
    .then(response => response.json())
    .then(json => {
        process.stdout.write("2ND: ");
        console.log(json);
    })
    .then(() => console.log(`2nd Done!`));

