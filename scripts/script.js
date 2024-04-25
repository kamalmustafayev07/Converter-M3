const fromInput = document.getElementById('input-from');
const resultInput = document.getElementById('input-to');
const buttonsFrom = document.querySelectorAll('#currency-from .currency-buttons button'); 
const buttonsResult = document.querySelectorAll('#currency-to .currency-buttons button');

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
        const response1 = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${buttonSelectedFrom.toLowerCase()}.min.json`);
        const data1 = await response1.json();
        resultInput.value = Number(fromInput.value) * data1[`${buttonSelectedFrom.toLowerCase()}`][`${buttonSelectedTo.toLowerCase()}`]
        const currencyDescriptionFrom = document.getElementById('currency-description-from')
        currencyDescriptionFrom.textContent = `1 ${buttonSelectedFrom} = ${data1[`${buttonSelectedFrom.toLowerCase()}`][buttonSelectedTo.toLowerCase()]} ${buttonSelectedTo}` ;
        const response2 = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${buttonSelectedTo.toLowerCase()}.min.json`);
        const data2 = await response2.json();
        const currencyDescriptionTo = document.getElementById('currency-description-to')
        currencyDescriptionTo.textContent = `1 ${buttonSelectedTo} = ${data2[`${buttonSelectedTo.toLowerCase()}`][buttonSelectedFrom.toLowerCase()]} ${buttonSelectedFrom}` ;
    }  
}

function currencyHandler(){
    getCurrencyData()
    .catch(error => {
        alert(`${error}! Something went wrong!`);
    })
}

buttonsFrom.forEach((item) =>{
    item.addEventListener('click', function() {
       buttonsFrom.forEach((item) =>{
                       item.classList.remove('selected-button');
                       this.classList.add('selected-button');
                   });
                   currencyHandler();
    })
});
buttonsResult.forEach((item) =>{
    item.addEventListener('click', function() {
       buttonsResult.forEach((item) =>{
                       item.classList.remove('selected-button');
                       this.classList.add('selected-button');
                   });
                   currencyHandler();
    })
});
fromInput.addEventListener('keyup',currencyHandler);