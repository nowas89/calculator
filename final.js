var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhttp.responseText),
            vatJSON = response.vat,
            taxJSON = response.tax,
            outputVat = "",
            outputTax = "";

        (function vatIteration() {
            for (var i = 0; i < vatJSON.length; i++) {
                outputVat += `<option value=${vatJSON[i].value}>${vatJSON[i].name}</option>`;
            }
            var vatId = document.getElementById('vat').innerHTML = outputVat;
        })();
        (function taxIteration() {
            for (var i = 0; i < taxJSON.length; i++) {
                outputTax += `<option value=${taxJSON[i].value}>${taxJSON[i].name}</option>`;
            }
            var taxId = document.getElementById('tax').innerHTML = outputTax;

        })();
    }
};
xhttp.open("GET", "ajax.json", true);
xhttp.send();

////////////////////adding new value to vat ~input ////////////////////////////////////
document.getElementById('vat').addEventListener('change', function() {
    if (this.value === 'other') {
        var changeClass = document.getElementById('vatInputId').classList.remove('vatInput');
        var inputClassChange = document.getElementById('vatInputId').classList.add('vatInputvisibility');
        var inputField = document.getElementById('vatInputId');

        inputField.onchange = function() {
            if (isNaN(inputField.value)) {

                alert('Serio? nie wiesz nawet jak zapisać Wysokość Podatku?');

            } else {
                var vatTaxSum = Number(inputField.value) / 100;
                var x = document.getElementById('vat');
                var option = document.createElement("option");
                option.value = Number(vatTaxSum);
                x.value = Number(vatTaxSum);
                x.insertBefore(option, x.childNodes[0]);
                option.text = Number(inputField.value) + "%";
                document.getElementById("vatInputId").className = "vatInput";
            }
        };
    }
});
/////////////////////////////////////////////adding new value to ~input///////////////////////////////////////////////////////////////
document.getElementById('tax').addEventListener('change', function() {
    if (this.value === 'other') {
        var changeTaxClass = document.getElementById('taxInputId').classList.remove('taxInput');
        var inputTaxClassChange = document.getElementById('taxInputId').classList.add('taxInputvisibility');
        var inputTax = document.getElementById('taxInputId');

        inputTax.onchange = function() {
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
                option.text = Number(inputTax.value) + "%";
                document.getElementById("taxInputId").className = "taxInput";

            }
        };
    }
});
var calcState = 'brutto';
document.getElementById("myonoffswitch").addEventListener("change", function() {
    calcState = (this.checked) ? 'brutto' : 'netto';
});
document.getElementById('count').addEventListener('click', function() {
    calcState === 'brutto' ? bruttoCalc() : nettoCalc();

});

function visible() { //when you pushed submit button that function will check what value you just entered, or is not entered;
    var item = document.getElementById('item');
    if (item.value.length == 0) {
        alert('powinieneś wpisać kwote ktorą chcesz obliczyc');
    } else {
        document.getElementById('count-container').className = "visible";
    }
}

//////////////calculation if you entered the brutto/////////////////////////////
function bruttoCalc() {
    visible();
    var incomeTax = document.getElementById('tax');
    var bruttoValue = document.getElementById("item");
    var vatTax = document.getElementById('vat');
    if (isNaN(bruttoValue.value)) {
        alert('wprowadz poprawną kwote Netto lub Brutto');
    } else {
        var netto = (Number(bruttoValue.value) / (Number(vatTax.value) + 1)).toFixed(2).replace(".00", "");
        var taxValue = (Number(netto) * Number(incomeTax.value)).toFixed(2).replace(".00", "");
        var vatValue = (Number(bruttoValue.value) - Number(netto)).toFixed(2).replace(".00", "");
        var totalCost = (Number(bruttoValue.value) - (Number(vatValue) + Number(taxValue))).toFixed(2).replace(".00", "");

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
function nettoCalc() {
    visible();
    var incomeTax = document.getElementById('tax');
    var placeholderValue = document.getElementById("item");
    var vatTax = document.getElementById('vat');

    if (isNaN(placeholderValue.value)) {
        alert('wprowadz poprawną kwote Netto lub Brutto');
    } else {

        var taxValueNetto = (Number(placeholderValue.value) * Number(incomeTax.value)).toFixed(2).replace(".00", "");
        var bruttoPrice = (Number(placeholderValue.value) + (Number(placeholderValue.value) * (Number(vatTax.value)))).toFixed(2).replace(".00", "");
        var vatValueNettoFunction = (Number(bruttoPrice) - Number(placeholderValue.value)).toFixed(2).replace(".00", "");
        var totalCost = (Number(bruttoPrice) - (Number(vatValueNettoFunction) + Number(taxValueNetto))).toFixed(2).replace(".00", "");

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
    document.getElementById('price-netto').innerHTML = result.nett + " zł";
    document.getElementById('tax-value').innerHTML = result.incomeTax + " zł";
    document.getElementById('vat-value').innerHTML = result.vat + " zł";
    document.getElementById('price-brutto').innerHTML = result.gross + " zł";
    document.getElementById('total-cost').innerHTML = result.total + " zł";

}

///////////////////// add results to array /////////////////////
var resultsArr = (localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : {
    results: []
};

renderArray();
reset();

document.querySelector(".addResults").addEventListener("click", function() {
    var price = document.getElementById('price-netto').outerHTML,
        tax = document.getElementById('tax-value').outerHTML,
        vat = document.getElementById('vat-value').outerHTML,
        brutto = document.getElementById('price-brutto').outerHTML,
        total = document.getElementById('total-cost').outerHTML;


    createItem(price, tax, vat, brutto, total);
    dataObjectUpdated();

}, false);

function createItem(price, tax, vat, brutto, total) {
    var createResultsTable = document.createElement('div');
    createResultsTable.classList.add("col-md-12", "col-lg-5");

    var setInArray = createResultsTable.innerHTML = `
        <div  class="card card-block d-flex flex-column resultContent ">
                    <div class="hiddenForToggle">
                    <div class="d-flex flex-row"><h6>Cena brutto: ${price}</h6></div>
                    <div class="d-flex flex-row"><h6>Cena netto:  ${tax} </h6></div>
                    <div class="d-flex flex-row"><h6>Wartość podatku Vat: ${vat} </h6></div>
                    <div class="d-flex flex-row"><h6>Wartość podatku dochodowego: ${brutto} </h6></div>
                    <div class="d-flex flex-row"><h6>Całkowity koszt przedsiębiorcy: ${total} </h6></div>
                    <hr>
                    <div class="d-flex flex-row justify-content-center"><button id="" class="removeButton btn btn-danger text-center">Usuń</button></div>
                     </div>
        </div>
                `;

    var createValue = document.getElementById("outputResults");
    createValue.insertBefore(createResultsTable, createValue.childNodes[0]);
    document.getElementById("item").value = "";
    resultsArr.results.push(setInArray);
    reset();
};

function reset() {
    var button = document.querySelectorAll('.removeButton');
    for (var i = 0; i < button.length; i++) {
        button[i].addEventListener('click', deleteItem, false);

    }
};

function deleteItem() {
    var arry = resultsArr.results;
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var parentDiv = parent.parentNode;
    var value = item.innerText;

    arry.splice(arry.indexOf(parent), 1);
    parentDiv.removeChild(parent);
    dataObjectUpdated();
};


function dataObjectUpdated() {
    var JSONarray = JSON.stringify(resultsArr);
    localStorage.setItem('items', JSONarray);

};

function renderArray() {
    if (!resultsArr.results.length) return;
    var value = resultsArr.results;
    value.forEach(function(i, v) {
        var createResultsTable = document.createElement('div');
        createResultsTable.classList.add("col-lg-5", "col-md-12");
        createResultsTable.innerHTML = [i];
        var createValue = document.getElementById("outputResults").appendChild(createResultsTable);
    }, this);
};
