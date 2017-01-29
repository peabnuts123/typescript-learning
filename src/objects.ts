import { Module } from "./lib/Module";

export const objects : Module = new Module("Objects", function() {

    /* CONCEPTS
        # class definition
        T public / protected / private members
        T abstract classes / members
        # inheritance
        T interfaces
        # readonly
    */

    // We cover a broad spectrum of using Objects and OOP in Typescript.
    //  ES6 introduced a lot of object-oriented syntax, and so this
    //  module has a lot of overlap with ES6.

    // CLASS SYNTAX
    {
        // We begin with a Car class. It captures how many wheels it has (always 4)
        //  what colour it is, and what make it is (assignable but not changeable).
        //
        // While class is an ES6 feature, we already see some TS specific features here
        class Car {
            // In Typescript we must explicitly specify the properties of a class
            //  They cannot be dynamically assigned to.
            // We can also assign a default value to them
            // In this instance, we also mark numWheels as readonly, as we
            //  never want it to change
            readonly numWheels: number = 4;

            // You can define and assign your properties in one step by specifying
            //  their access level in the constructor (as parameters)
            constructor(protected _color: string, protected _make: string) {
            }

            get color(): string {
                return this._color;
            }

            get make(): string {
                return this._make;
            }

            toString(): string {
                return `Car: ${this.color} ${this.make}`;
            }
        }

        console.log("New car instance:");
        var redHonda = new Car("Red", "Honda");
        console.log(redHonda.toString());   // "Car: Red Honda"
    }

    // INHERITANCE
    {
        // But now we want to make a new class, Scooter, which has many of the
        //  same properties as a car, and we might want to use them just for
        //  their base properties. We should have a base class for these two concepts:
        class Vehicle {
            // Protected members can only be accessed by this class
            //  or a class that inherits from it.
            protected _color: string;

            // `readonly` members must be initialized either statically or
            //  in the constructor.
            readonly make: string;
            readonly numWheels: number;

            constructor(_color: string, _make: string, _numWheels: number) {
                this._color = _color;

                this.make = _make;
                this.numWheels = _numWheels;
            }

            get color(): string {
                return this._color;
            }

            toString(): string {
                return `Vehicle: ${this.color} ${this.make} - ${this.numWheels} wheels`;
            }
        }

        // Now we can inherit both Car and Scooter from Vehicle with minimal effort
        class Car extends Vehicle {
            constructor(color: string, make: string) {
                // We assume a car always has four wheels
                super(color, make, 4);
            }
        }

        class Scooter extends Vehicle {
            // We add an additional field to the Scooter class
            //  called `hasBell` which basically just represents
            //  whether the scooter has a bell or not
            private _hasBell: boolean;

            constructor(color: string, make: string, hasBell: boolean) {
                // We assume a scooter always has two wheels.
                super(color, make, 2);

                this._hasBell = hasBell;
            }

            get hasBell(): boolean {
                return this._hasBell;
            }

            toString(): string {
                // Override and extend the Vehicle definition of `toString`
                return super.toString() + `${this.hasBell ? ", Has Bell" : ""}`
            }
        }

        // Do some things with these types
        let myCar = new Car("Red", "Honda");
        let myScooter = new Scooter("Blue", "Vespa", true);

        console.log("New types, extending Vehicle");
        console.log(myCar.toString());
        console.log(myScooter.toString());

        // myCar and myScooter are compatible types with Vehicle
        //  as such, they can be assigned to a variable of that type.
        let myVehicle: Vehicle;

        myVehicle = myCar;
        myVehicle = myScooter;

        // However, a member on the concrete type cannot be accessed.
        //  Only members from the Vehicle type

        /* Compiler error:
            [ts] Property 'hasBell' does not exist on type 'Vehicle'.

            console.log(myVehicle.hasBell);
        */
    }

    // VISIBILITY
    {
        // Typescript adds visibility to class members to restrict access
        //  It is similar to other OOP languages, if you are already familiar.

        // Puzzle object, say, from a Video Game
        class Puzzle {
            // Name of the puzzle. Public members can be accessed from any context
            public readonly name: string;

            // Author of the puzzle. Members are public by default, if not specified
            readonly createdBy: string;

            // Difficulty of the puzzle
            //  This may change, but since it is `protected` it can only be
            //  modified from inside this class or classes that inherit from it.
            protected _difficulty: number;

            // Some kind of state-storing variable.
            // Private variables can ONLY be modified from this class
            //  Inheriting classes cannot access or modify this variable
            private _state: number;

            constructor(name: string, createdBy: string) {
                this.name = name;
                this.createdBy = createdBy;

                // Default difficult to 5.
                //  If the player is struggling, reduce
                //  If the player is excelling, increase
                this._difficulty = 5;

                // We are assuming `_state` is used in the game logic somehow
                //  Not covered in this example
                this._state = 0;
            }

            // ------------------------------------------------------
            // NOTE: Functioning code omitted for the sake of clarity
            // ...
            // ------------------------------------------------------

            // Expose `_difficulty` so that it can be read but not altered from
            //  outside this class (or inheriting classes). But modified from
            //  within.
            get difficulty(): number {
                return this._difficulty;
            }
        }

        let myPuzzle = new Puzzle("World 01 - Puzzle 01", "Peabnuts123");

        console.log("Puzzle object demonstrates member visibility");
        console.log(myPuzzle);
        console.log("Puzzle.name: " + myPuzzle.name);
        console.log("Puzzle.createdBy: " + myPuzzle.createdBy);
        console.log("Puzzle.difficulty: " + myPuzzle.difficulty);
        console.log("Compiler errors are obviously omitted (see comments in source code)");
        /* Compiler error:
            [ts] Cannot assign to 'difficulty' because it is a constant or a read-only property.

            myPuzzle.difficulty = 2;
        */
        /* Compiler error:
            [ts] Property '_state' is private and only accessible within class 'Puzzle'.

            console.log(myPuzzle._state);
        */
    }
});