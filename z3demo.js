import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");
const solver = new Solver();


const x = Int.const('x');
const y = Int.const('y');

const constraintLeft = 5;
const constraintRight = 10;
const constraintTop = 15;
const constraintBottom = 25;

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

    console.log(`x: ${xValprint}`);
    console.log(`y: ${yValprint}`);
} else {
    console.log("unsat. Could not find a valid value for x.");
}
