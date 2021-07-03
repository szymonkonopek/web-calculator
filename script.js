class Calculator {
    constructor(PreviousTextElement,CurrentTextElement){
        this.PreviousTextElement = PreviousTextElement
        this.CurrentTextElement = CurrentTextElement
        this.clear()
    }


    clear(){
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }
    
    delete(){
        
    }

    appendNumber(number){
        if(number === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString()
    }

    popNumber(){
        console.log(this.current)
        let OldCurrent = this.current.toString().split("");
        OldCurrent.pop();
        
        this.current = OldCurrent.join("")
        

    }

    chooseOperation(operation){
        if(this.current === '') return
        if(this.previous !== ''){
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ""

    }

    compute(){
        let computation
        const prev = parseFloat(this.previous)
        const cur = parseFloat(this.current)
        if (isNaN(prev) || isNaN(cur)) return
        switch (this.operation){
            case '+':
                computation = prev + cur
                break
            case '-':
                computation = prev - cur
                break
            case 'x':
                computation = prev * cur
                break
            case '÷':
                computation = prev / cur
                break
            default:
                return
        }

        this.current = computation
        this.operation = undefined
        this.previous = ''
    }

    updateDisplay(){
        this.CurrentTextElement.innerText = this.current
        this.PreviousTextElement.innerText = this.previous
    }



}


const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const AllClearButton = document.querySelector('[data-all-clear]')
const PreviousTextElement = document.querySelector('[data-previous]')
const CurrentTextElement = document.querySelector('[data-current]')

const calculator = new Calculator(PreviousTextElement,CurrentTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click',()=> {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',()=> {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click",() =>{
    calculator.compute()
    calculator.updateDisplay()
})

AllClearButton.addEventListener("click",() =>{
    calculator.clear();
    calculator.updateDisplay()
})

deleteButton.addEventListener("click",() =>{
    
    calculator.popNumber();
    calculator.updateDisplay()
})
