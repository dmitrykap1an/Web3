const xButtons = [document.getElementById("j_idt8:x-select:0"), document.getElementById("j_idt8:x-select:1"),
        document.getElementById("j_idt8:x-select:2"), document.getElementById("j_idt8:x-select:3"),
        document.getElementById("j_idt8:x-select:4"), document.getElementById("j_idt8:x-select:5"),
        document.getElementById("j_idt8:x-select:6"), document.getElementById("j_idt8:x-select:7"),
        document.getElementById("j_idt8:x-select:8")],
    rButtons = [document.getElementById("j_idt8:r-select:0"), document.getElementById("j_idt8:r-select:1"),
        document.getElementById("j_idt8:r-select:2"), document.getElementById("j_idt8:r-select:3"),
        document.getElementById("j_idt8:r-select:4")],
    yButton = document.getElementById("j_idt8:y-text"),
    dotSpider = document.getElementById("j_idt8:dot-spider-text"),
    dotAnt = document.getElementById("j_idt8:dot-ant-text"),
    submit = document.getElementById("j_idt8:form")




submit.addEventListener("click", onsubmit)

function onsubmit(){
    let dots = validateDots()
    let x = checkX()
    let y = validateY()
    let r = checkR()
    let array = [x, y, r, dots]
    if(!x.status || !y.status || !r.status || !dots.status){
        let errorString = ""
        array.forEach(function (input){
            if(!input.status){
                errorString += input.errorMessage + "\n"
            }
        })

        alert(errorString)
    }
    else{
        chooseGraph(x, y, r.val)
    }

    return false;
}

function validateDots(){
    let spider = validateField(dotSpider)
    let ant = validateField(dotAnt)
    let bool = spider.status ^ ant.status
    if(bool){
        return {
            status: bool,
            errorMessage: ""
        }
    }
    else{
        dotSpider.value = ""
        dotAnt.value = ""
        return{
            status: bool,
            errorMessage: "Поле о точке должно быть пустым или представлять из себя число"
        }
    }
}

function validateField(field){
    let value = field.value.replace(",", ".")
    if(!isNaN(value) && value !== ""){
        return{
            status: true,
            val: Math.round(parseFloat(value)),
            errorMessage: ""
        }
    }
    else{
        return {
            status: false,
            val: 404,
            errorMessage: "Поле с вводом данных о точке должно быть заполнено!"
        }
    }

}

function validateY(){
    let yVal = yButton.value.replace(",", ".")
    if(!isNaN(yVal) && yVal !== ""){
        return checkY(Number.parseFloat(yVal).toFixed(3))
    }
    else{
        return {
            status: false,
            val: 404,
            errorMessage: "Y должен быть представлен числом"
        }
    }
}

function checkY(yVal){
    if(yVal >= -5 && yVal <= 5){
        return {
            status: true,
            val: yVal,
            errorMessage: ""
        }
    }
    else{
        return {
            status: false,
            val: 404,
            errorMessage: "Число Y должно быть в промежутке от -5 до 3"
        }
    }

}

function checkX(){
    let number = 404;
    xButtons.forEach(function (input){
        if(input.checked){
            number = Number.parseFloat(input.value)
        }
    })

    if(number === 404){
        return {
            status: false,
            val: number,
            errorMessage: "Выберете X!"
        }
    }
    else return {
        status: true,
        val:  number,
        errorMessage: ""
    }


}

function checkR(){
    let number = 404;
    rButtons.forEach(function (input){
        if(input.checked){
            number = Number.parseFloat(input.value);
        }
    })

    if(number === 404){
        return {
            status: false,
            val: number,
            errorMessage: "Выберете R!"
        }
    }
    else return {
        status: true,
        val: number,
        errorMessage: ""
    }
}

let validateData = function (x, y, r){
    return (x <= 0 && x >= -r && y  >= 0 && y  <= r /2) ||
    (x  >= 0 && y  <= 0 && x  * x  + y  * y  <= (r /2) * (r /2)) ||
    (y  >= -x  - r  && y  <= 0 && x  <= 0)
}

let chooseGraph = function (x, y, r){
    clearCanvas()
    drawGraph()
    parseTable(r)
    let match = validateData(x,y, r)
    addDots(x, y, r, match)
}