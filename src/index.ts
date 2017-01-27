import { es6 } from "./es6_syntax";

// Definition for Module object
interface Module {
    name: string,
    moduleFunc: Function
}

// Manifest of all modules in this test project;
let modules : Module[] = [
    {
        name: "es6",
        moduleFunc: es6
    }
];

// Execute the function of each module
for (let module of modules) {
    console.log("======================================");
    console.log("Executing module '" + module.name + "'");
    console.log("======================================");

    module.moduleFunc();
}