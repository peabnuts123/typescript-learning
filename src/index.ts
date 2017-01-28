import Module from "./lib/Module";

import { es6 } from "./es6_syntax";

// Manifest of all modules in this test project;
let modules : Module[] = [
    es6
];

// Execute the function of each module
for (let module of modules) {
    console.log("======================================");
    console.log("Executing module '" + module.name + "'");
    console.log("======================================");

    module.moduleFunc();
}