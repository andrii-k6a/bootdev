// `unhandledrejection` sent when a promise is rejected but there is no rejection handler available.
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

// `rejectionhandled` sent when a handler is attached to a rejected promise that has already caused an unhandledrejection event.
process.on('rejectionHandled', (promise) => {
    console.log('Rejection was handled for:', promise);
});

// this will result in unhandledRejection 
const rejectedPromise = Promise.reject(new Error("Oops"));

setTimeout(() => {
    // this results in rejectionHandled because it will try adding rejection handler to a promise that was rejected and that rejection was handled since the script still running till this moment
    rejectedPromise.catch(err => {
        console.log("Eventually added rejection handler for already rejected promise");
    });
}, 10);

// This is fine because unhandledRejection or rejectionHandled events are emmitted if there any rejected promise AFTER current call stack is empty and the next event loop tick
const rejected2 = Promise.reject(new Error("Just an error"));

rejected2.catch(err => {
    console.log(`Caught ${err.message}`)
});

