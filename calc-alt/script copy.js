
function sum(a,b) {
    return a + b;
};

function subtract(a,b) {
    return a - b;
};

function multiply(a,b) {
    return a*b;
};

function divide(a,b) {
    return a/b;
};

function operate(a, operator, b) {
    if( operator === "+" ) { 
        return sum(a,b);
    } else if( operator === "-" ) {
        return subtract(a,b);
    } else if( operator === "*") {
        return multiply(a,b);
    } else if( operator === "/") {
        return divide(a,b);
    }
}

const output = document.querySelector("p#output");
const Ans = document.querySelector("p#Ans");

const buttons = Array.from(document.querySelectorAll("button"));
let newNumber = "";
let result = "";
for( let button of buttons) {
    if( button.className === "digit" ) {
        button.addEventListener("click", (e) => {
            if(e.target.textContent === "." && output.textContent.includes(".") ) { 
                return; 
            } else {
                getInput(e);
            }
        } );
    } else if( button.className === "operator" ) {
        button.addEventListener("click", (e) => {
            getInput(e);
        } );
    } else if( button.className === "execute" ) {
        button.addEventListener("click", execute );
    } else if( button.id === "clear" ) {
        button.addEventListener("click", clear );
    } else if( button.id === "delete" ) {
        button.addEventListener("click", del );
    }
}

function getInput(e) {
    if( output.textContent.length === 28 ) return; // to prevent overflow
    if( output.textContent === "" && !isNaN(e.target.textContent) ) {
        newNumber = "";
    }
    output.textContent = newNumber;
    if( isNaN(e.target.textContent) && e.target.textContent !== "." ) {
        output.textContent += " " + e.target.textContent + " ";
        newNumber += " " + e.target.textContent + " ";
    } else { 
        output.textContent += e.target.textContent;
        newNumber += e.target.textContent;
    }
}

function clear() {
    output.textContent = "";
    Ans.textContent = "";
    newNumber = "";
    result = "";
}

function del() {
    let outputArray = output.textContent.split("");
    outputArray.pop();
    let newOutput = outputArray.join("");
    output.textContent = newOutput;
    newNumber = newOutput;
}

function execute() {
    const inputArray = newNumber.split(" ");
    if( inputArray.includes("Ans") ) {
        inputArray[ inputArray.indexOf("Ans") ] = Ans.textContent;
    }
    let partResult = "";
    while( inputArray.length > 2 ) {
        if( inputArray.includes("*") ) {
            let ix = inputArray.indexOf("*");
            partResult = operate(+inputArray[ix-1], inputArray[ix], +inputArray[ix+1]);
            inputArray.splice(ix, 2);
            inputArray[ix-1] = partResult;
        } else if( inputArray.includes("/") ) {
            let ix = inputArray.indexOf("/");
            partResult = operate(+inputArray[ix-1], inputArray[ix], +inputArray[ix+1]);
            inputArray.splice(ix, 2);
            inputArray[ix-1] = partResult;
        } else if( inputArray.includes("+") ) {
            let ix = inputArray.indexOf("+");
            partResult = operate(+inputArray[ix-1], inputArray[ix], +inputArray[ix+1]);
            inputArray.splice(ix, 2);
            inputArray[ix-1] = partResult;
        } else if( inputArray.includes("-") ) {
            let ix = inputArray.indexOf("-");
            partResult = operate(+inputArray[ix-1], inputArray[ix], +inputArray[ix+1]);
            inputArray.splice(ix, 2);
            inputArray[ix-1] = partResult;
        }
    };
    console.log(inputArray);
    Ans.textContent = inputArray[0];
    output.textContent = "";
    newNumber = "Ans";
}


window.addEventListener("keydown", (e) => {
    document.querySelector("[key=\'"+ e.key + "\']").click();
    document.querySelector("[key=\'"+ e.key + "\']").classList.add("clicked");
})
window.addEventListener("keyup", (e) => {
    document.querySelector("[key=\'"+ e.key + "\']").classList.remove("clicked");
})