import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");
const solver = new Solver();

const Bob = Int.const('Bob');  // x is a Z3 integer
const Mary = Int.const('Mary');
const Cathy = Int.const('Cathy');
const Sue = Int.const('Sue');

const Dog = 1;
const Cat = 2;
const Bird = 3;
const Fish = 4;



solver.add(Distinct(Bob, Mary, Cathy, Sue));
solver.add(Bob.eq(Dog));
solver.add(Sue.eq(Bird));
solver.add(Mary.l(Fish));




// Run Z3 solver, find solution and sat/unsat
console.log(await solver.check());

// Extract value for x
const model = solver.model();
const bobVal = model.eval(Bob);
const MaryVal = model.eval(Mary);
const CathyVal = model.eval(Cathy);
const SueVal = model.eval(Sue);

console.log(`${bobVal}`);
console.log(`${MaryVal}`);
console.log(`${CathyVal}`);
console.log(`${SueVal}`);