class Vector {
    constructor(x, y, name) {
        this.x = x; // need to flip x and y to make the coord system cartesian
        this.y = y;

        this.name = name;
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get theta() {
        let t = Math.atan2(this.y, this.x);
        return Math.atan2(this.y, this.x);
    }

    /*
    draw(ctx, start) {

        //let start = {"x": this.x - this.magnitude, "y": this.y - this.magnitude};

        ctx.fillStyle = "#00FF00";
        ctx.beginPath();
        ctx.moveTo(start.y*ZOOM, start.x*ZOOM);  // flip x and y while drawing to draw in cartesian
        ctx.lineTo((start.y+this.y)*ZOOM, (start.x+this.x)*ZOOM);
        ctx.stroke();

        this.drawArrowhead(ctx, start, this, 10);
    }
    */

    drawArrowhead(context, from, to, radius) {
        let x_center = to.x;
        let y_center = to.y;
    
        let angle;
        let x;
        let y;
    
        context.beginPath();
    
        angle = Math.atan2(to.y - from.y, to.x - from.x)
        x = radius * Math.cos(angle) + x_center;
        y = radius * Math.sin(angle) + y_center;
    
        context.moveTo(y, x);
    
        angle += (1.0/3.0) * (2 * Math.PI)
        x = radius * Math.cos(angle) + x_center;
        y = radius * Math.sin(angle) + y_center;
    
        context.lineTo(y, x);
    
        angle += (1.0/3.0) * (2 * Math.PI)
        x = radius *Math.cos(angle) + x_center;
        y = radius *Math.sin(angle) + y_center;
    
        context.lineTo(y, x);
    
        context.closePath();
    
        context.fill();
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    static Add(v1, v2) {
        let v1Copy = {"x": v1.x, "y": v1.y};
        v1Copy.x += v2.x;
        v1Copy.y += v2.y;

        return v1Copy;
    }

    static Sub(v1, v2) {
        let v1Copy = {"x": v1.x, "y": v1.y};
        v1Copy.x -= v2.x;
        v1Copy.y -= v2.y;

        return v1Copy;
    }

    multScalar(n) {
        this.x *= n;
        this.y *= n;
    }

    static DotProduct(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
}

class Joint {
    constructor(x, y, name) {
        this.sticks = [];
        this.exForces = [];
        this.pos = new Vector(x, y);

        this.name = name;
    }

    addSticksToGroup(sticks) {
        for (let i = 0; i < sticks.length; i++) {
            this.sticks.push(sticks[i]);
        }
    }

    addStickToGroup(s) {
        this.sticks.push(s);
    }
    
    addExForceToGroup(v) {
        this.exForces.push(v);
    }

    draw(ctx) {
        ctx.fillStyle = "#0000FF";
        ctx.beginPath();
        ctx.arc(this.pos.y*ZOOM, this.pos.x*ZOOM, 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    solveJoint() {
        let mRows = []; // variables are the keys and coefficients are the values (makes it easier to line up matrix later)
        // two rows that make up the matrix rows of this joint (horizontal vector equation and vertical vector equation)
        let horizRow = {}; 
        let vertRow = {};

        for (let i = 0; i < this.exForces.length; i++) {
            if (this.exForces[i].x == 0) { // vertical
                if (this.exForces[i].y == "+y" || this.exForces[i].y == "-y") {
                    let mult = (this.exForces[i].y == "-y") ? -1 : 1;
                    vertRow[this.exForces[i].name] = 1 * mult;
                } else {
                    vertRow["result"] = -this.exForces[i].y;
                }
            } 
            else if (this.exForces[i].y == 0) { // horizontal
                if (this.exForces[i].x == "+x" || this.exForces[i].x == "-x") {
                    let mult = (this.exForces[i].x == "-x") ? -1 : 1;
                    horizRow[this.exForces[i].name] = 1 * mult;
                } else {
                    horizRow["result"] = -this.exForces[i].x;
                }
            }
        }

        for (let j = 0; j < this.sticks.length; j++) {
            let name = "";
            if (this.name == this.sticks[j].joints[0]) { // starting joint of stick is this joint
                name = "F_" + this.sticks[j].joints[0] + this.sticks[j].joints[1];

                horizRow[name] = Math.cos(this.sticks[j].vectorReg.theta);
                vertRow[name] = Math.sin(this.sticks[j].vectorReg.theta);
            }
            else { // starting joint of this stick is the other joint
                name = "F_" + this.sticks[j].joints[1] + this.sticks[j].joints[0];
                
                horizRow[name] = Math.cos(this.sticks[j].vectorBack.theta);
                vertRow[name] = Math.sin(this.sticks[j].vectorBack.theta);
            }
            /*
            horizRow[name] = Math.cos(this.sticks[j].vector.theta);
            vertRow[name] = Math.sin(this.sticks[j].vector.theta);
            */
            // console.log(name + "       " + (this.sticks[j].vector.theta * (180/Math.PI)));
        }

        mRows.push(horizRow);
        mRows.push(vertRow);

        return mRows;
    }
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

class Stick {
    constructor (x1, y1, x2, y2, joints) {
        this.p1 = new Vector(x1, y1);
        this.p2 = new Vector(x2, y2);

        this.vel = new Vector(0, 0);
        this.accel = new Vector(0, 0);

        this.joints = joints; // in the form "AB" where A and B are the joint names (strings have indexes)
    }

    get width() {
        return Math.abs(this.p2.x - this.p1.x);
    }

    get height() {
        return Math.abs(this.p2.y - this.p1.y);
    }

    get length() {
        return Math.sqrt(Math.pow((this.p1.x - this.p2.x), 2)+ Math.pow((this.p1.y - this.p2.y), 2));
    }

    get vectorReg() { // returns vector towards second joint (this.joints[0] => this.joints[1])
        return new Vector(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
    }

    get vectorBack() { // returns vector towards first joint (this.joints[1] => this.joints[0])
        return new Vector(this.p1.x - this.p2.x, this.p1.y - this.p2.y);
    }

    draw(ctx) {
        let value = finalValues["F_"+this.joints+",F_"+this.joints[1]+this.joints[0]];
        let percent;
        if (value > 0) {
            percent = Math.abs(value / tensileStrength);
        } else if (value < 0) {
            percent = Math.abs(value / compressiveStrength);
        } else {
            percent = 0;
        }
        let color;
        if (percent > 1) {
            percent = 1;
            color = "#00FFFF";
        } else {
            color = rgbToHex(255*percent, 255*(1-percent), 0);
        }

        console.log(color);

        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(this.p1.y*ZOOM, this.p1.x*ZOOM);  // flip x and y while drawing to draw in cartesian
        ctx.lineTo(this.p2.y*ZOOM, this.p2.x*ZOOM);
        ctx.stroke();
    }

    applyForce(v) {
        this.accel.add(v);
    }

    update() {
        this.vel.add(this.accel);
        this.p1.add(this.vel);
        this.p2.add(this.vel);

        this.accel.multScalar(0);
    }
}

function findAllVarNames(sticks, exForces) {
    let allVars = [];
    for (let i = 0; i < sticks.length; i++) {
        let n1 = "F_" + sticks[i].joints[0] + sticks[i].joints[1];
        let n2 = "F_" + sticks[i].joints[1] + sticks[i].joints[0];

        if (!allVars.includes([n1, n2] && !allVars.includes[n2, n1])) allVars.push([n1, n2]);
        //if (!allVars.includes(n2)) allVars.push(n2);
    }

    
    for (let i = 0; i < exForces.length; i++) {
        let n1 = exForces[i].name;

        if (!allVars.includes([n1]) 
            && (exForces[i].x == "+x" || exForces[i].x == "-x" || exForces[i].y == "+y" || exForces[i].y == "-y")) {
            allVars.push([n1]);
        }
    }
    

    allVars.push(["result"]);
    return allVars;
}

function formBigMatrix(rows, varNames) {
    let bigBoi = []; 
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < varNames.length; j++) {
            if (!bigBoi[i]) bigBoi[i] = [];

            let value = rows[i][varNames[j][0]];
            if (!value) {
                // try the other name (applicable to sticks)
                value = rows[i][varNames[j][1]];
                if (!value) {
                    value = 0; // if undefined on both, then value must be 0
                }
            }

            bigBoi[i][j] = value; // inserts based on order of vars in varNames 
        }
    }
    return bigBoi;
}

function drawExternalVector(ctx, start, vector) {
    ctx.fillStyle = "#00FF00";
    ctx.beginPath();
    ctx.moveTo(start.y*ZOOM, start.x*ZOOM);  // flip x and y while drawing to draw in cartesian
    ctx.lineTo((start.y+vector.y)*ZOOM, (start.x+vector.x)*ZOOM);
    ctx.stroke();
}