const fromInput = document.getElementById('input-from');
const resultInput = document.getElementById('input-to');

const getCurrencyData = async () => {
    console.log()
    const buttonSelectedFrom = document.querySelector("#currency-from .selected-button").textContent;
    
    const buttonSelectedTo = document.querySelector("#currency-to .selected-button").textContent;
    switch (buttonSelectedFrom) {
        case buttonSelectedTo:
            resultInput.value = fromInput.value;
            const currencyDescription = document.querySelectorAll('.currency-description');

            currencyDescription.forEach((item)=>{
                item.textContent = `1 ${buttonSelectedFrom} = 1 ${buttonSelectedTo}`;
            })
            break;
        default:
            const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${buttonSelectedFrom.toLowerCase()}.min.json`);
            const data = await response.json();
            return data[`${buttonSelectedFrom.toLowerCase()}`];
    }
}

const getInverseCurrencyData = async () => {
    const buttonSelectedFrom=document.querySelector('#currency-from .selected-button').textContent;
    const buttonSelectedTo = document.querySelector('#currency-to .selected-button').textContent;
    const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${buttonSelectedTo.toLowerCase()}.min.json`);
    const data = await response.json();
    return data[`${buttonSelectedTo.toLowerCase()}`];
}




let [flag1, flag2] = [false, false];  //FLAGS

const buttonsFrom = document.querySelectorAll('#currency-from button');  //FROM BUTTONS WORK

buttonsFrom.forEach((item) => {
    item.addEventListener('click', () => {
        if (flag1 === true) {
            buttonsFrom.forEach((item) => {
                item.classList.remove("selected-button")
            })
            item.classList.add("selected-button")
            flag1 = false
        } else {
            item.classList.remove("")
            flag1 = true
        }
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
    })
})


fromInput.addEventListener('keyup', () => {
    getCurrencyData()
    .then((data) => {
        const buttonSelectedTo = document.querySelector('#currency-to .selected-button').textContent;
        const buttonSelectedFrom = document.querySelector('#currency-from .selected-button').textContent;
        resultInput.value = Number(fromInput.value) * data[`${buttonSelectedTo.toLowerCase()}`]
        const currencyDescriptionFrom = document.getElementById('currency-description-from')
        currencyDescriptionFrom.textContent = `1 ${buttonSelectedFrom} = ${data[buttonSelectedTo.toLowerCase()]} ${buttonSelectedTo}`

        getInverseCurrencyData()
            .then((data) => {
                const currencyDescriptionTo = document.getElementById('currency-description-to')
                currencyDescriptionTo.textContent = `1 ${buttonSelectedTo} = ${data[buttonSelectedFrom.toLowerCase()]} ${buttonSelectedFrom}` 
            })
            .catch(error => {
                console.log(error)
            })
        })
    .catch(error => {
        console.log(error)
    })
})