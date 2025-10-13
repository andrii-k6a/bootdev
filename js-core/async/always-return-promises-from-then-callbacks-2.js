async function doSomething() {
    console.log("Doing stuff...");
    return "https://jsonplaceholder.typicode.com/todos/1";
}

// 1st block
{
    const listOfIngredients = [];

    doSomething()
        .then((url) => {
            // Missing `return` keyword in front of fetch(url).
            // So it results into resolved promise with undefined value
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    console.log("This will be called only after last outer then in first block, because of missing return");
                    listOfIngredients.push(data);
                });
        })
        .then(() => {
            // this callback goes right away to microtask queue, because prev `then` is immediately resolved with undefined value
            console.log("Last then in 1st block");
            console.log(listOfIngredients);
            // listOfIngredients will always be [], because the fetch request hasn't completed yet.
        });
}

// 2nd block
{
    const listOfIngredients = [];

    doSomething()
        .then((url) => {
            // `return` keyword now included in front of fetch call.
            return fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    console.log("This will be called before outer then in 2nd block");
                    listOfIngredients.push(data);
                });
        })
        .then(() => {
            console.log("Last then in 2nd block");
            console.log(listOfIngredients);
            // listOfIngredients will now contain data from fetch call.
        });
}

// Since there is no garantee which fetch promise resolves first, there are two possible options:
// - doing stuff
// - doing stuff
// - Last then in 1st block
// - []
//
// *** option 1 ***
// - This will be called only after last outer then in first block, because of missing return
// - This will be called before outer then in 2nd block
// - Last then in 2nd block
// - [ { userId: 1, id: 1, title: 'delectus aut autem', completed: false } ]
//
// *** option 2 ***
// - This will be called before outer then in 2nd block
// - Last then in 2nd block
// - [ { userId: 1, id: 1, title: 'delectus aut autem', completed: false } ]
// - This will be called only after last outer then in first block, because of missing return

