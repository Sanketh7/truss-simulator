function updateZoom() {
    let zoomVal = document.getElementById("zoom").value;
    if (!zoomVal) zoomVal = 1;
    ZOOM = zoomVal;
}

function deleteJointEntry() {
    let formDiv = document.getElementById("data-entry-joints");
    formDiv.removeChild(formDiv.childNodes[formDiv.childNodes.length-1]);   
}

function deleteMemberEntry() {
    let formDiv = document.getElementById("data-entry-members");
    formDiv.removeChild(formDiv.childNodes[formDiv.childNodes.length-1]);   
}

function deleteLoadEntry() {
    let formDiv = document.getElementById("data-entry-loads");
    formDiv.removeChild(formDiv.childNodes[formDiv.childNodes.length-1]);   
}

function deleteReactionEntry() {
    let formDiv = document.getElementById("data-entry-reactions");
    formDiv.removeChild(formDiv.childNodes[formDiv.childNodes.length-1]);   
}

function addJointEntry(name, x, y) {
    let formDiv = document.getElementById("data-entry-joints");
    
    /*
        <div class="row">
            <input type="text" class="name" size="5">
            <input type="text" class="x-val" size="5">
            <input type="text" class="y-val" size="5">
        </div>
    */

    let rowDiv = document.createElement("DIV");
    rowDiv.className = "row";
    
    let nameRow = document.createElement("INPUT");
    nameRow.type = "text";
    nameRow.className = "name";
    nameRow.size = "5";
    nameRow.setAttribute("placeholder", "name");
    if (name) nameRow.value = name;

    let xValRow = document.createElement("INPUT");
    xValRow.type = "text";
    xValRow.className = "x-val";
    xValRow.size = "5";
    xValRow.setAttribute("placeholder", "x");
    if (x) xValRow.value = x;

    let yValRow = document.createElement("INPUT");
    yValRow.type = "text";
    yValRow.className = "y-val";
    yValRow.size = "5";
    yValRow.setAttribute("placeholder", "y");
    if (y) yValRow.value = y;

    rowDiv.appendChild(nameRow);
    rowDiv.appendChild(xValRow);
    rowDiv.appendChild(yValRow);

    formDiv.appendChild(rowDiv);
}

function addMemberEntry(j1, j2) {
    let formDiv = document.getElementById("data-entry-members");
    
    /*
        <div class="row">
            <input type="text" class="joint1" size="5">
            <input type="text" class="joint2" size="5">
        </div>
    */

    let rowDiv = document.createElement("DIV");
    rowDiv.className = "row";

    let joint1 = document.createElement("INPUT");
    joint1.type = "text";
    joint1.className = "joint1";
    joint1.size = "5";
    joint1.setAttribute("placeholder", "joint 1");
    if (j1) joint1.value = j1;

    let joint2 = document.createElement("INPUT");
    joint2.type = "text";
    joint2.className = "joint2";
    joint2.size = "5";
    joint2.setAttribute("placeholder", "joint 2");
    if (j2) joint2.value = j2;

    rowDiv.appendChild(joint1);
    rowDiv.appendChild(joint2);

    formDiv.appendChild(rowDiv);
}

function addLoadEntry(j, x, y) {
    let formDiv = document.getElementById("data-entry-loads");
    
    /*
        <div class="row">
            <input type="text" class="joint" size="5">
            <input type="text" class="x-val" size="5">
            <input type="text" class="y-val" size="5">
        </div>
    */

    let rowDiv = document.createElement("DIV");
    rowDiv.className = "row";

    let joint = document.createElement("INPUT");
    joint.type = "text";
    joint.className = "joint";
    joint.size = "5";
    joint.setAttribute("placeholder", "joint");
    if (j) joint.value = j;

    let xValRow = document.createElement("INPUT");
    xValRow.type = "text";
    xValRow.className = "x-val";
    xValRow.size = "5";
    xValRow.setAttribute("placeholder", "x");
    if (x || x == 0) xValRow.value = x;

    let yValRow = document.createElement("INPUT");
    yValRow.type = "text";
    yValRow.className = "y-val";
    yValRow.size = "5";
    yValRow.setAttribute("placeholder", "y");
    if (y || y == 0) yValRow.value = y;

    rowDiv.appendChild(joint);
    rowDiv.appendChild(xValRow);
    rowDiv.appendChild(yValRow);

    formDiv.appendChild(rowDiv);
}

function addReactionEntry(j, x, y) {
    let formDiv = document.getElementById("data-entry-reactions");
    
    /*
        <div class="row">
            <input type="text" class="joint" size="5">
            <input type="text" class="x-val" size="5">
            <input type="text" class="y-val" size="5">
        </div>
    */

    let rowDiv = document.createElement("DIV");
    rowDiv.className = "row";

    let joint = document.createElement("INPUT");
    joint.type = "text";
    joint.className = "joint";
    joint.size = "5";
    joint.setAttribute("placeholder", "joint");
    if (j) joint.value = j;

    let xValRow = document.createElement("INPUT");
    xValRow.type = "text";
    xValRow.className = "x-val";
    xValRow.size = "5";
    xValRow.setAttribute("placeholder", "x");
    if (x) xValRow.value = x;

    let yValRow = document.createElement("INPUT");
    yValRow.type = "text";
    yValRow.className = "y-val";
    yValRow.size = "5";
    yValRow.setAttribute("placeholder", "y");
    if (y) yValRow.value = y;

    rowDiv.appendChild(joint);
    rowDiv.appendChild(xValRow);
    rowDiv.appendChild(yValRow);

    formDiv.appendChild(rowDiv);
}

function enterData() {
    updateZoom();

    allJoints = [];

    let jointsDiv = document.getElementById("data-entry-joints");
    let membersDiv = document.getElementById("data-entry-members");
    let loadsDiv = document.getElementById("data-entry-loads");
    let reactionsDiv = document.getElementById("data-entry-reactions");

    if (jointsDiv.hasChildNodes() && membersDiv.hasChildNodes()
    && loadsDiv.hasChildNodes() && reactionsDiv.hasChildNodes) {
        // console.log(jointsDiv.children[0].children[0].value);
        for (let i = 0; i < jointsDiv.children.length; i++) { // index of row div
            let name = jointsDiv.children[i].children[0].value;
            let x = jointsDiv.children[i].children[1].value;
            let y = jointsDiv.children[i].children[2].value;
            
            let joint = new Joint(x, y, name);
            allJoints.push(joint);
        }

        for (let i = 0; i < membersDiv.children.length; i++) { // index of row div
            let j1 = membersDiv.children[i].children[0].value;
            let j2 = membersDiv.children[i].children[1].value;
            
            let x1, y1, x2, y2;

            let joint1found = false;
            for (let j = 0; j < allJoints.length; j++) {
                if (allJoints[j].name == j1) {
                    x1 = allJoints[j].pos.x;
                    y1 = allJoints[j].pos.y;
                    joint1found = true;
                }
            }
            if (!joint1found) alert("Invalid joint.");

            let joint2found = false;
            for (let j = 0; j < allJoints.length; j++) {
                if (allJoints[j].name == j2) {
                    x2 = allJoints[j].pos.x;
                    y2 = allJoints[j].pos.y;
                    joint2found = true;
                }
            }
            if (!joint2found) alert("Invalid joint.");

            let stick = new Stick(x1, y1, x2, y2, j1+j2);

            for (let j = 0; j < allJoints.length; j++) {
                if (allJoints[j].name == j1 || allJoints[j].name == j2) {
                    allJoints[j].addStickToGroup(stick);
                }
            }
        }

        for (let i = 0; i < loadsDiv.children.length; i++) { // index of row div
            let joint = loadsDiv.children[i].children[0].value;
            let x = parseInt(loadsDiv.children[i].children[1].value);
            let y = parseInt(loadsDiv.children[i].children[2].value);

            let force = new Vector(x, y, "L_"+joint+",y");

            let jointFound = false;
            for (let j = 0; j < allJoints.length; j++) {
                if (allJoints[j].name == joint) {
                    allJoints[j].addExForceToGroup(force);
                    jointFound = true;
                }
            }
            if(!jointFound) alert("Invalid joint.");
        }

        for (let i = 0; i < reactionsDiv.children.length; i++) { // index of row div
            let joint = reactionsDiv.children[i].children[0].value;
            let x = reactionsDiv.children[i].children[1].value;
            let y = reactionsDiv.children[i].children[2].value;

            let force;
            if (x == "+x" || x == "-x"){
                y = parseInt(reactionsDiv.children[i].children[2].value);
                force = new Vector(x, y, "R_"+joint+",x");
            } else {
                x = parseInt(reactionsDiv.children[i].children[1].value);
                force = new Vector(x, y, "R_"+joint+",y");
            }

            let jointFound = false;
            for (let j = 0; j < allJoints.length; j++) {
                if (allJoints[j].name == joint) {
                    allJoints[j].addExForceToGroup(force);
                    jointFound = true;
                }
            }
            if(!jointFound) alert("Invalid joint.");
        }

        calculate();
    } else {
        alert("Not enough information provided.");
    }
}

function exportData() {
    let jointsDiv = document.getElementById("data-entry-joints");
    let membersDiv = document.getElementById("data-entry-members");
    let loadsDiv = document.getElementById("data-entry-loads");
    let reactionsDiv = document.getElementById("data-entry-reactions");

    let data = {"joints": [], "members": [], "loads": [], "reactions": []};

    if (jointsDiv.hasChildNodes() && membersDiv.hasChildNodes()
    && loadsDiv.hasChildNodes() && reactionsDiv.hasChildNodes) {
        // console.log(jointsDiv.children[0].children[0].value);
        for (let i = 0; i < jointsDiv.children.length; i++) { // index of row div
            let name = jointsDiv.children[i].children[0].value;
            let x = jointsDiv.children[i].children[1].value;
            let y = jointsDiv.children[i].children[2].value;
            
            data.joints.push({"name": name, "x": x, "y": y});
        }

        for (let i = 0; i < membersDiv.children.length; i++) { // index of row div
            let j1 = membersDiv.children[i].children[0].value;
            let j2 = membersDiv.children[i].children[1].value;
            
            data.members.push({"j1": j1, "j2": j2});
        }

        for (let i = 0; i < loadsDiv.children.length; i++) { // index of row div
            let joint = loadsDiv.children[i].children[0].value;
            let x = loadsDiv.children[i].children[1].value;
            let y = loadsDiv.children[i].children[2].value;

            data.loads.push({"joint": joint, "x": x, "y": y});
        }

        for (let i = 0; i < reactionsDiv.children.length; i++) { // index of row div
            let joint = reactionsDiv.children[i].children[0].value;
            let x = reactionsDiv.children[i].children[1].value;
            let y = reactionsDiv.children[i].children[2].value;

            data.reactions.push({"joint": joint, "x": x, "y": y});
        }

        console.log(JSON.stringify(data));
    } else {
        alert("Not enough information provided.");
    }
}

function takeInData() {
    let data = JSON.parse(prompt("Enter JSON data:"));

    for (let i = 0; i < data.joints.length; i++) {
        addJointEntry(data.joints[i].name, data.joints[i].x, data.joints[i].y);
    }

    for (let i = 0; i < data.members.length; i++) {
        addMemberEntry(data.members[i].j1, data.members[i].j2);
    }

    for (let i = 0; i < data.loads.length; i++) {
        addLoadEntry(data.loads[i].joint, data.loads[i].x, data.loads[i].y);
    }

    for (let i = 0; i < data.reactions.length; i++) {
        addReactionEntry(data.reactions[i].joint, data.reactions[i].x, data.reactions[i].y);
    }
}