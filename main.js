let canvas = document.getElementById("canvas");
canvas.style.border = "none";
let ctx = canvas.getContext("2d");

ctx.translate(0, 500);
ctx.rotate(-Math.PI/2);


function printValueInfo(varName, value) {
    finalValues[varName] = value;

    let pTag = document.createElement("p");
    let text = document.createTextNode(varName + " = " + value.toFixed(5));

    pTag.appendChild(text);
    document.getElementById("resultBox").appendChild(pTag);
}

function calculate() {
    allSticks = [];
    for (let i = 0; i < allJoints.length; i++) {
        for (let j = 0; j < allJoints[i].sticks.length; j++) {
            let stick = allJoints[i].sticks[j];
            if (!allSticks.includes(stick)) allSticks.push(stick);
        }
    }

    allExForces = [];
    for (let i = 0; i < allJoints.length; i++) {
        for (let j = 0; j < allJoints[i].exForces.length; j++) {
            let exForce = allJoints[i].exForces[j];
            if (!allExForces.includes(exForce)) allExForces.push(exForce);
        }
    }


    console.log(findAllVarNames(allSticks, allExForces));
    let rows = [];
    for (let i = 0; i < allJoints.length; i++) {
        rows.push(allJoints[i].solveJoint()[0]);
        rows.push(allJoints[i].solveJoint()[1]);
    }

    let varNames = findAllVarNames(allSticks, allExForces);
    let rrefMatrix = rref(formBigMatrix(rows, varNames));
    console.log(rows);
    console.log(formBigMatrix(rows, findAllVarNames(allSticks, allExForces)));
    console.log(rref(formBigMatrix(rows, findAllVarNames(allSticks, allExForces))));

    var myNode = document.getElementById("resultBox");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    let header = document.createElement("h2");
    let textNode = document.createTextNode("Results");

    let subtitle = document.createElement("p");

    header.appendChild(textNode);

    document.getElementById("resultBox").appendChild(header);
    if (allSticks.length !== 2 * allJoints.length - reactionForceCounter) {
        let subtitleText = document.createTextNode("This truss is not statically determinate.")
        subtitle.appendChild(subtitleText);
        document.getElementById("resultBox").appendChild(subtitle);
    }

    reactionForceCounter = 0;

    for (let i = 0; i < varNames.length; i++) {
        printValueInfo(varNames[i], rrefMatrix[i][rrefMatrix[0].length-1]);
    }

}


function mainLoop() {
    window.requestAnimationFrame(mainLoop);

    ctx.clearRect(0, 0, 500, 500);

    //gravity.draw(ctx);
    //test.draw(ctx);

    for (let i = 0; i < allJoints.length; i++) {
        allJoints[i].draw(ctx);
        /*
        for (let j = 0; j < allJoints[i].exForces.length; j++) {
            allJoints[i].exForces[j].draw(ctx, allJoints[i].pos);
        }*/
    }

    for (let i = 0; i < allSticks.length; i++) {
        allSticks[i].draw(ctx);
    }
}
mainLoop();