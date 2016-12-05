
////////////////////adding new value to vat ~input ////////////////////////////////////
document.getElementById('vat').addEventListener('change', function classChange(){
    if (this.value === 'other') {
        var changeClass = document.getElementById('vatInputId').classList.remove('vatInput');
        var inputClassChange = document.getElementById('vatInputId').classList.add('vatInputvisibility');
        var inputField = document.getElementById('vatInputId');

          inputField.onchange = function(){
            if (isNaN(inputField.value)) {

                alert('Serio? nie wiesz nawet jak zapisać Wysokość Podatku?');

            } else {
                document.getElementById('vat').removeEventListener("change", classChange());
                var vatTaxSum = inputField.value / 100;
                var x = document.getElementById('vat');
                x.value = Number(vatTaxSum);
                var option = document.createElement("option");
                x.insertBefore(option, x.childNodes[0]);
                option.text =  Number(inputField.value) + "%";;
                document.getElementById("vatInputId").className = "vatInput";
            }
          }
        }
    });



/////////////////////////////////////////////adding new value to ~input///////////////////////////////////////////////////////////////
document.getElementById('tax').addEventListener('change', function() {
    if (this.value === 'other') {
        var changeTaxClass = document.getElementById('taxInputId').classList.remove('taxInput');
        var inputTaxClassChange = document.getElementById('taxInputId').classList.add('taxInputvisibility');
        var inputTax = document.getElementById('taxInputId');

        inputTax.addEventListener('change', function() {
            if (isNaN(inputTax.value)) {
                // user pressed OK, but the input field was empty
                alert('Serio? nie wiesz nawet jak zapisać Wysokość Podatku?');

            } else {
                var taxSum = inputTax.value / 100;
                var x = document.getElementById('tax');
                x.value = Number(taxSum);
                var option = document.createElement("option");
                option.text =  inputTax.value + "%";;
                x.add(option);
                document.getElementById("taxInputId").className = "taxInput";

            }
        });
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var calcState = 'brutto';
document.getElementById("myonoffswitch").addEventListener("change", function() {
    calcState = (this.checked) ? 'brutto' : 'netto';
});
document.getElementById('count').addEventListener('click', function() {
    if (calcState === 'brutto') {
        brutto();
    } else {
        netto();
    }
});

//////////////calculation if you entered the brutto/////////////////////////////
function brutto() {
    var incomeTax = document.getElementById('tax');
    var bruttoValue = document.getElementById("item");
    var vatTax = document.getElementById('vat');
    if (isNaN(bruttoValue.value)) {
        alert('wprowadz poprawną kwote Netto lub Brutto');
    } else {
        var netto = (Number(bruttoValue.value) / (Number(vatTax.value) + 1)).toFixed(2);
        var taxValue = (Number(netto) * Number(incomeTax.value)).toFixed(2);
        var vatValue = (Number(bruttoValue.value) - Number(netto)).toFixed(2);
        var totalCost = (Number(bruttoValue.value) - (Number(vatValue) + Number(taxValue))).toFixed(2);

        document.getElementById('price-netto').innerHTML = 'Cena Netto: ' + netto + ' zł';
        document.getElementById('tax-value').innerHTML = 'Wartość podatku dochodowego:  ' + taxValue + ' zł';
        document.getElementById('vat-value').innerHTML = 'Wartość podatku Vat:  ' + vatValue + ' zł';
        document.getElementById('price-brutto').innerHTML = 'Cena brutto: ' + bruttoValue.value + ' zł';
        document.getElementById('total-cost').innerHTML = 'Całkowity koszt dla przedsiębiorcy ' + totalCost + ' zł';
    }

}
//////////////calculation if you entered the netto/////////////////////////////
function netto() {
    var incomeTax = document.getElementById('tax');
    var placeholderValue = document.getElementById("item");
    var vatTax = document.getElementById('vat');

    if (isNaN(placeholderValue.value)) {
        alert('wprowadz poprawną kwote Netto lub Brutto');
    } else {

        var taxValueNetto = (Number(placeholderValue.value) * Number(incomeTax.value)).toFixed(2);
        var bruttoPrice = (Number(placeholderValue.value) + (Number(placeholderValue.value) * (Number(vatTax.value)))).toFixed(2);
        var vatValueNettoFunction = (Number(bruttoPrice) - Number(placeholderValue.value)).toFixed(2);
        var totalCost = (Number(bruttoPrice) - (Number(vatValueNettoFunction) + Number(taxValueNetto))).toFixed(2);

        document.getElementById('price-netto').innerHTML = 'Cena Netto: ' + placeholderValue.value + ' zł';
        document.getElementById('tax-value').innerHTML = 'Wartość podatku dochodowego:  ' + taxValueNetto + ' zł';
        document.getElementById('vat-value').innerHTML = 'Wartość podatku Vat:  ' + vatValueNettoFunction + ' zł';
        document.getElementById('price-brutto').innerHTML = 'Cena brutto: ' + bruttoPrice + ' zł';
        document.getElementById('total-cost').innerHTML = 'Całkowity koszt dla przedsiębiorcy ' + totalCost + ' zł';
    }
}
