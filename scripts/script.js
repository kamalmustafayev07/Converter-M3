const fromInput = document.getElementById('input-from');
const resultInput = document.getElementById('input-to');


const getCurrencyData = async () => {
    const buttonSelectedFrom = document.querySelector("#currency-from .selected-button").textContent;
    const buttonSelectedTo = document.querySelector("#currency-to .selected-button").textContent;
    if(buttonSelectedFrom===buttonSelectedTo) {
            resultInput.value = fromInput.value;
            const currencyDescription = document.querySelectorAll('.currency-description');
            currencyDescription.forEach((item)=>{
                item.textContent = `1 ${buttonSelectedFrom} = 1 ${buttonSelectedTo}`;
            })
    }else{
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${buttonSelectedFrom.toLowerCase()}.min.json`);
        const data = await response.json();
        resultInput.value = Number(fromInput.value) * data[`${buttonSelectedFrom.toLowerCase()}`][`${buttonSelectedTo.toLowerCase()}`]
        const currencyDescriptionFrom = document.getElementById('currency-description-from')
        currencyDescriptionFrom.textContent = `1 ${buttonSelectedFrom} = ${data[buttonSelectedTo.toLowerCase()]} ${buttonSelectedTo}`;
        getInverseCurrencyData();
    }  
}

const getInverseCurrencyData = async () => {
    const buttonSelectedFrom=document.querySelector('#currency-from .selected-button').textContent;
    const buttonSelectedTo = document.querySelector('#currency-to .selected-button').textContent;
    const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${buttonSelectedTo.toLowerCase()}.min.json`);
    const data = await response.json();
    const currencyDescriptionTo = document.getElementById('currency-description-to')
    currencyDescriptionTo.textContent = `1 ${buttonSelectedTo} = ${data[`${buttonSelectedTo.toLowerCase()}`][buttonSelectedFrom.toLowerCase()]} ${buttonSelectedFrom}` 
}

function currencyHandler(){
    getCurrencyData()
    .catch(error => {
        console.log(error)
    })
}

let [flag1, flag2] = [true, true];  //FLAGS
const buttonsFrom = document.querySelectorAll('#currency-from button');  //FROM BUTTONS WORK

buttonsFrom.forEach((item) => {
    item.addEventListener('click', () => {
        if (flag1 === true) {
            buttonsFrom.forEach((item) => {
                item.classList.remove("selected-button")
            })
            item.classList.add("selected-button")
            flag1 = false;
        }else {
            item.classList.remove("selected-button")
            flag1 = true;
        }
        currencyHandler();
    })
})

const buttonsResult = document.querySelectorAll('#currency-to .currency-buttons button')  //TO BUTTONS WORK

buttonsResult.forEach((item) => {
    item.addEventListener('click', () => {
        if (flag2 === true) {
            buttonsResult.forEach((item) => {
                item.classList.remove("selected-button")
            })
            item.classList.add("selected-button")
            flag2 = false
        } else {
            item.classList.remove("selected-button")
            flag2 = true
        }
        currencyHandler();
    })
})

fromInput.addEventListener('keyup',currencyHandler);