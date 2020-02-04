
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

let output = document.querySelector("p#output");

const buttons = Array.from(document.querySelectorAll("button"));
let newNumber = "";
let storedNumber = "";
let operator = "";
let result = "";
for( let button of buttons) {
    if( button.className === "digit" ) {
        button.addEventListener("click", (e) => {
            if(e.target.textContent === "." && output.textContent.includes(".") ) { 
                return; 
            } else {
                getDigit(e);
            }
        } );
    } else if( button.className === "operator" ) {
        button.addEventListener("click", (e) => {
            getOperator(e);
        } );
    } else if( button.className === "execute" ) {
        button.addEventListener("click", () => {
            execute();
        } );
    } else if( button.id === "clear" ) {
        button.addEventListener("click", () => {
            clear();
        } );
    } else if( button.id === "delete" ) {
        button.addEventListener("click", () => {
            del();
        } );
    }
}

function getDigit(e) {
    if( newNumber.length === 30 ) return;
    output.textContent = newNumber;
    output.textContent += e.target.textContent;
    newNumber += e.target.textContent;
}

function getOperator(e) {
    if( operator !== "" && newNumber !== "" ) {
        operator = e.target.textContent;
        execute();
        //operator = "";
        newNumber = "";
    } else if( newNumber !== "" ){
        operator = e.target.textContent;
        storedNumber = newNumber;
        console.log(storedNumber);
        output.textContent = storedNumber;
        newNumber = "";
    } else operator = e.target.textContent;
}

function clear() {
    output.textContent = "";
    newNumber = "";
    storedNumber = "";
    result = "";
    operator = "";
}

function del() {
    let outputArray = output.textContent.split("");
    outputArray.pop();
    let newOutput = outputArray.join("");
    output.textContent = newOutput;
    newNumber = newOutput;
}

function execute() {
    if( storedNumber !== "" && operator !== "" && newNumber !== "" ){
        result = operate(+storedNumber, operator,  +newNumber);
        console.log(result);
    } else return;
    
    console.log(result);
    if( !isFinite(result) && result ) { 
        output.textContent = "ERROR: DIVISION BY 0";
    } else {
        output.textContent = result;
        storedNumber = result;
        newNumber = "";
    };
}


window.addEventListener("keydown", (e) => {
    document.querySelector("[key=\'"+ e.key + "\']").click();
    document.querySelector("[key=\'"+ e.key + "\']").classList.add("clicked");
})
window.addEventListener("keyup", (e) => {
    document.querySelector("[key=\'"+ e.key + "\']").classList.remove("clicked");
})