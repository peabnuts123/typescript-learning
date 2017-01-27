export function es6() {
    // Typescript uses ES6 syntax 

    // This variable has the global scope
    let x = 2;

    // {} without context creates a scope (even in normal JS)
    //  but `var` is not restricted to this scope. However, `let` is. 
    {
        // This variable has the scope of the containing block
        let x = 3;
        console.log("Inner scope `x`: " + x); // 3
    }

    console.log("Module scope `x`: " + x); // 2

    // Arrow functions are the bomb yo
    let add = (a,b) => a+b;
    console.log("Arrow function add(10,20): " + add(10,20));

    // Generator for fibonacci sequence
    function* fibonacci() {
        let a = 1, b = 0;
        while(true) {
            var sum = a + b;
            a = b;
            b = sum;
            yield sum;  // Yield returns `sum` from context and "pauses"
        }
    }

    var fibGen = fibonacci();   // Create an iterator

    console.log("Fibonacci Generator: ");
    console.log(fibGen.next().value); // 1
    console.log(fibGen.next().value); // 1
    console.log(fibGen.next().value); // 2
    console.log(fibGen.next().value); // 3
    console.log(fibGen.next().value); // 5 etc.
};