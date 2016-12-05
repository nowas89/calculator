
////////////////////adding new value to vat ~input ////////////////////////////////////
document.getElementById('vat').addEventListener('change', function(){
    if (this.value === 'other') {
        var changeClass = document.getElementById('vatInputId').classList.remove('vatInput');
        var inputClassChange = document.getElementById('vatInputId').classList.add('vatInputvisibility');
        var inputField = document.getElementById('vatInputId');

          inputField.onchange = function(){
            if (isNaN(inputField.value)) {

                alert('Serio? nie wiesz nawet jak zapisać Wysokość Podatku?');

            } else {
                var vatTaxSum = Number(inputField.value) / 100;
                var x = document.getElementById('vat');
                var option = document.createElement("option");
                option.value = Number(vatTaxSum);
                x.value = Number(vatTaxSum);
                x.insertBefore(option, x.childNodes[0]);
                option.text =  Number(inputField.value) + "%";
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

        inputTax.onchange = function(){
            if (isNaN(inputTax.value)) {
                // user pressed OK, but the input field was empty
                alert('Serio? nie wiesz nawet jak zapisać Wysokość Podatku?');

            } else {
                var taxSum = inputTax.value / 100;
                var x = document.getElementById('tax');
                var option = document.createElement("option");
                option.value = Number(taxSum);
                x.value = Number(taxSum);
                x.insertBefore(option, x.childNodes[0]);
                option.text =  Number(inputTax.value) + "%";
                document.getElementById("taxInputId").className = "taxInput";

            }
        }
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

        var result = {
            nett: netto,
            gross: bruttoValue.value,
            incomeTax: taxValue,
            vat: vatValue,
            total: totalCost
        };

        displayResults(result);
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

        var result = {
            nett: placeholderValue.value,
            gross: bruttoPrice,
            incomeTax: taxValueNetto,
            vat: vatValueNettoFunction,
            total: totalCost
        };

        displayResults(result);
    }
}


function displayResults(result) {
        document.getElementById('price-netto').innerHTML = result.nett;
        document.getElementById('tax-value').innerHTML = result.incomeTax;
        document.getElementById('vat-value').innerHTML = result.vat;
        document.getElementById('price-brutto').innerHTML = result.gross;
        document.getElementById('total-cost').innerHTML = result.total;
}
