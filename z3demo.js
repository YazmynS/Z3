import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");
const solver = new Solver();


const x = Int.const('x');
const y = Int.const('y');

let constraintLeft = 5;
let constraintRight = 10;
let constraintTop = 15;
let constraintBottom = 25;

solver.add(x.ge(constraintLeft+1));
solver.add(x.le(constraintRight-1));
solver.add(y.ge(constraintTop+1));
solver.add(y.le(constraintBottom-1));

// Run Z3 solver, find solution and sat/unsat
if (await solver.check() === "sat") {

    // Extract value for x
    let model = solver.model();
    let xValprint = model.eval(x);
    let yValprint = model.eval(y);

    console.log("Inside the fence");
    console.log(`x: ${xValprint}`);
    console.log(`y: ${yValprint}`);
    console.log("\n");
} else {
    console.log("unsat. Could not find a valid value for x.");
}
//-----------------------------------------------------------------------
solver.reset();
//-----------------------------------------------------------------------
solver.add(x.ge(constraintLeft));
solver.add(x.le(constraintRight));
solver.add(y.ge(constraintTop));
solver.add(y.le(constraintBottom));

// Run Z3 solver, find solution and sat/unsat
if (await solver.check() === "sat") {

    // Extract value for x
    let model = solver.model();
    let xValprint = model.eval(x);
    let yValprint = model.eval(y);
    
    console.log("On the fence");
    console.log(`x: ${xValprint}`);
    console.log(`y: ${yValprint}`);
    console.log("\n");
} else {
    console.log("unsat. Could not find a valid value for x.");
}
//-----------------------------------------------------------------------
solver.reset();
//-----------------------------------------------------------------------

constraintRight = 8;
constraintTop = 20;

solver.add(x.ge(constraintRight+1));
solver.add(y.ge(constraintTop+1));

// Run Z3 solver, find solution and sat/unsat
if (await solver.check() === "sat") {

    // Extract value for x
    let model = solver.model();
    let xValprint = model.eval(x);
    let yValprint = model.eval(y);
    
    console.log("Outside the fence");
    console.log(`x: ${xValprint}`);
    console.log(`y: ${yValprint}`);
    console.log("\n");
} else {
    console.log("unsat. Could not find a valid value for x.");
}
