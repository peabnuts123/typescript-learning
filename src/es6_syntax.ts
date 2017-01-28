import { Module } from "./lib/Module";

export const es6 : Module = new Module("es6", function es6() {
    // Typescript can transpile ES6 syntax (with a little help from Babel)


    // BLOCK-SCOPED VARIABLES
    console.log(" - BLOCK-SCOPED VARIABLES");

    // This variable has module scope
    let x = 2;

    // {} without context creates a block (even in normal JS)
    //  but `var` is not scoped to this block. However, `let` is.
    {
        // This variable has the scope of the containing block
        let x = 3;
        console.log("Inner scope `x`: " + x);   // 3
    }

    console.log("Module scope `x`: " + x);      // 2


    // ARROW FUNCTIONS
    console.log(" - ARROW FUNCTIONS");

    // Arrow functions are condensed forms of functions that
    //  take in parameters and return something
    let add = (a,b) => a+b;
    console.log("Arrow function add(10,20): " + add(10,20));    // 30


    // GENERATORS
    console.log(" - GENERATORS");

    // Generator function for fibonacci sequence
    //  Generators are functions that you can jump out of
    //  and resume later. You can pass data to / from them
    //  with the `yield` statement and the `.next()` function
    function* fibonacci() {
        let a = 1, b = 0;
        while(true) {
            var sum = a + b;
            a = b;
            b = sum;
            yield sum;  // Yield returns `sum` and "pauses" execution
        }
    }

    var fibGen = fibonacci();   // Create an iterator

    console.log("Fibonacci Generator: ");
    console.log(fibGen.next().value); // 1
    console.log(fibGen.next().value); // 1
    console.log(fibGen.next().value); // 2
    console.log(fibGen.next().value); // 3
    console.log(fibGen.next().value); // 5 etc.

    // Two-way data passing with a generator
    function* accumulator(initialValue) {
        var sum = initialValue;
        while(true) {
            // `yield sum` returns sum as the `value` property
            //  the statement `yield sum` is replaced with the parameters
            //  passed to `.next()` and then continues executing
            //
            //  In this example, the parameter to `.next()` will be added to `sum`
            //  then the loop will repeat, and then the value of `sum` will be returned.
            sum += yield sum;
        }
    }

    var adder = accumulator(10); //Start at 10;
    console.log("Accumulator Generator (initial value: 10): ");
    // The first call to `.next()` does not "resume" from a
    //  yield statement, so its value is not used anywhere
    console.log("+1000: " + adder.next(1000).value + " (consumed)");    // 10, initial value, parameter value not consumed

    // Subsequent calls will pass the value back to `yield` and continue executing
    console.log("+5: " + adder.next(5).value);       // 15
    console.log("+13: " + adder.next(13).value);      // 28
    console.log("+20: " + adder.next(20).value);      // 48


    // PROMISES
    console.log(" - PROMISES");

    // Promises are a contract between different parts of code.
    //  They are incredibly powerful and as such can be rather complex.
    //  They are USUALLY used for managing asynchronous code.
    //  In the most basic form a promise is a function that is executed that specifies
    //  whether it worked ("resolved") or failed for some reason ("rejected").
    //  Other parts of your code then "subscribe" to execute based on whether
    //  the promise was resolved or rejected.
    //  A promise can pass data to the parts of code that are waiting for it
    //  to either resolve or reject.

    // This is a mock function that resembles an async task.
    //  Note: it is NOT async. It just functions in a manner
    //  similar to how a lot of asynchronous processing is done.
    function doAsync(work, callback) {
        // In this function, `work` represents some task to perform
        //  in actuality it is just a string describing a task in plain english.

        // `callback` is a function to call upon completion of the task
        //  it will be fed two things:
        //      - whether the operation succeeded
        //      - a plain-english message about the success/failure

        // In our mock function we are just immediately calling back
        //  with a success and a message that the work item was completed.
        // In real code, this function would do something asynchronous and
        //  call `callback` only AFTER that task finished.
        // The only reason I didn't actually make this function async was so
        //  that executing this module didn't slow down the program
        callback("success", work + " - completed");
    }

    // Promise is constructed with a single function parameter.
    console.log("Creating promise for requesting data from server")
    let myPromise = new Promise(function(resolve, reject) {
        //  The signature of this function is specific, it takes a
        //  `resolve` object (which is a function) and a `reject` object
        //  (which is also a function).
        // These two functions are used to mark this Promise object as
        //  resolved or rejected.
        // THE MOST IMPORTANT THING to understand about Promises is
        //  that they are themselves NOT ASYNC and this function is
        //  executed EVEN BEFORE `myPromise` is assigned the value
        //  returned from `new Promise()`

        // Call our async task.
        doAsync("request data from server", function(result, message) {
            // Depending on the result of the async task, we mark this promise
            //  as either resolved or rejected.
            // This is how we will inform other code down the line if
            //  our async call went well or not.
            if (result === "success") {
                resolve(message);
            } else {
                reject(message);
            }
        });
    });

    // This is how we subscribe to a promise.
    //  .then() takes 1 or 2 parameters:
    //      1.) Function to be called if Promise is RESOLVED
    //      2.) (optional) Function to be called if promise is REJECTED
    //  We can also ONLY subscribe to REJECTED (as we see below)
    console.log("Subscribing callbacks to promise")
    myPromise.then(function onResolve(message) {
        // The parameter `message` is whatever value was passed
        //  into `resolve()`. It is directly passed through.
        console.log("Promise was resolved. Message: \"" + message + "\"");
    }, function onReject(message) {
        // As per the first function, `message` is whatever value was
        //  passed into `reject()`.
        console.log("Promise was REJECTED. Message: \"" + message + "\"");
    });

    // Subscribing a callback to JUST the rejection state
    myPromise.catch(function onReject(message) {
        console.log("Second callback function for 'Rejection' outcome");
    });

    // There is even more complexity to Promises, which I shall not cover here.
    //  The biggest thing omitted here is that errors in your code will trigger
    //  a rejection state, and this can happen in strange ways (such as
    //  from your .then() resolve callback). You should definitely
    //  read up more about Promises if you plan to use them!


});