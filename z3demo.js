import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And } = new Context("main");

// Generate values
async function getValidValues(constraints) {
    //Define Variables
    const { left, right, top, bottom } = constraints;
    const solver = new Solver();
    
    const x = Int.const('x');
    const y = Int.const('y');

    const validX = new Set();
    const validY = new Set();
    const validPairs = [];

    // Define constraints
    solver.add(x.ge(left));
    solver.add(x.le(right));
    solver.add(y.ge(top));
    solver.add(y.le(bottom));

    // Find solutions
    while (await solver.check() === "sat") {
        const model = solver.model();
        
        //Get values
        const xTemp = Number(model.eval(x).value());
        const yTemp = Number(model.eval(y).value());

        //Push valid values to list
        validX.add(xTemp);
        validY.add(yTemp);
        validPairs.push({ x: xTemp, y: yTemp });

        // Exclude current solution
        solver.add(And(x.neq(xTemp), y.neq(yTemp))); 
    }

    return {
        // Sort values
        validX: Array.from(validX).sort((a, b) => a - b),
        validY: Array.from(validY).sort((a, b) => a - b),
        
        // Get random pair
        randomPair: validPairs[Math.floor(Math.random() * validPairs.length)] || null,
    };
}

// Output results
function outputResult(label, results) {
    const { validX, validY, randomPair } = results;
    console.log(label);
    if (randomPair) {
        console.log(`x: ${validX.join(' ')}`);
        console.log(`y: ${validY.join(' ')}`);
        console.log(`Random (x,y): (${randomPair.x}, ${randomPair.y})`);
    } else {
        console.log("unsat");
    }
    console.log("\n");
}
async function main() {
    // Define scenarios
    const scenarios = [
        { label: "Inside the fence", constraints: { left: 6, right: 9, top: 16, bottom: 24 } },
        { label: "On the fence", constraints: { left: 5, right: 10, top: 15, bottom: 25 } },
        { label: "Outside the fence", constraints: { left: 10, right: 20, top: 20, bottom: 30 } },
    ];
    
    // Get & Output valid values for each scenario
    for (const { label, constraints } of scenarios) {
        const results = await getValidValues(constraints);
        outputResult(label, results);
    }
}

// Run the program
await main();
