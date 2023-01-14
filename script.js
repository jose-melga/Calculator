const calculatorDisplay = document.querySelector("h1"); // calculatorDisplay es igual al unico
const inputBtns = document.querySelectorAll("button"); // inputBtns toma un array con los valores de todos los botones.
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;



function sendNumberValue(cualquiercosa) {

  //replace current display value if first value is entered
  if(awaitingNextValue){//true?
    calculatorDisplay.textContent = cualquiercosa;
    awaitingNextValue = false;
  }else{
    //if current display value es 0, replace it, if not add number

    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? cualquiercosa:displayValue + cualquiercosa;


  }
}

function addDecimal(){


  //If operator pressed, dont add decimal
if(awaitingNextValue) return;//si es true nos salimos de la funcion y no arrancamos nada

  //if not decimal, add one
  if (!calculatorDisplay.textContent.includes('.')){
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`

  }

}

// calculate first and second values
const calculate = {
  '/':(firsNumber, secondNumber) => firsNumber/secondNumber,
  '*':(firsNumber, secondNumber) => firsNumber*secondNumber,
  '+':(firsNumber, secondNumber) => firsNumber+secondNumber,
  '-':(firsNumber, secondNumber) => firsNumber-secondNumber,
  '=':(firsNumber, secondNumber) => secondNumber,



};



//function number convert letter to real number
function useOperator(operator){
  const currentValue = Number(calculatorDisplay.textContent);

  //Prevent multiple operators
  if(operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;

  }
  
  // Assign firstValue if no value, !name, minds cero or null

  if(!firstValue){
    firstValue = currentValue;
  }else{
    const calculation = calculate[operatorValue](firstValue, currentValue); // lo mismo que poner calculate.operatorValue(firstValue,currentValue)
    calculatorDisplay.textContent = calculation;
    firstValue= calculation;

  }

  //Ready for next value, store operator

  awaitingNextValue=true;
  operatorValue = operator;
  
}



// Adding events Listeners for numbers, operator and decima buttons

//seleccionamos los botones sin clase osea solo numeros
inputBtns.forEach( cualquierhuevada => {
	if (cualquierhuevada.classList.length === 0) {
		cualquierhuevada.addEventListener("click", () =>
			sendNumberValue(cualquierhuevada.value)
		);
	} else if (cualquierhuevada.classList.contains("operator")) {
		cualquierhuevada.addEventListener("click", () =>
			useOperator(cualquierhuevada.value)
		);
	} else if (cualquierhuevada.classList.contains("decimal")) {
		cualquierhuevada.addEventListener("click", () => addDecimal());
	}
});


//reset display

function resetAll() {
  firstValue=0;
  operatorValue='';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

//Event Listener

clearBtn.addEventListener('click', resetAll);