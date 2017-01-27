# typescript-learning
### *Note: I am still working on this project (it is not yet "complete")*

This project is for educational purposes. It serves as a guide for readers, and an educational exercise for myself. 

Think of this repository as a broad TL;DR for working with Typescript, or a nice playground to fork if you wish to poke around yourself with everything already set up.

Of course, Typescript has a [comprehensive set of documentation](https://www.typescriptlang.org/docs/tutorial.html) itself, which I strongly encourage checking out if you wish to learn more.

## Structure
The project is structured as follows:

 - index
   - module_a
   - module_b
   - module_c
   - etc.

The index script is the main entry point for the project and registers / loads / executes all the submodules. I have done my best to group each submodule into related categories. This way you can learn about different aspects of Typescript in semantically related ways.

Feel free to create an [issue](https://github.com/peabnuts123/typescript-learning/issues) or  drop me a [tweet](https://twitter.com/peabnuts123) if you have an questions/suggestions.

## Usage
To run the application, first install it with either `npm install` or `yarn install` (if you are using yarn), then run `npm test` (or `yarn test`) which will transpile the project to run in NodeJS and then run it. Also see `package.json` for other scripts that exist behind-the-scenes (such as `build` which just compiles but does not run the project).

## Requirements
You should run this project with _at least NodeJS v6.x_. If you are getting ES6 warnings, you probably need to upgrade NodeJS. I highly recommend [Node Version Manager](https://github.com/creationix/nvm) for installing and managing multiple version of NodeJS. I use it to run Node 5 for some projects and Node 6 for newer projects 👍