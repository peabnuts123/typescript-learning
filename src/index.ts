import { Module } from "./lib/Module";

import { generics } from "./generics";
import { objects } from "./objects";
import { typing_basics } from "./typing_basics";
import { es6 } from "./es6_syntax";

// Manifest of all modules in this test project;
let modules : Module[] = [
    generics,
    objects,
    typing_basics,
    es6
];

// Execute the function of each module
for (let module of modules) {
    console.log("======================================");
    console.log("Executing module '" + module.name + "'");
    console.log("======================================");

    module.moduleFunc();
}