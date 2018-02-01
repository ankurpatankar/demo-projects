function loadJSON(callback) {

    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', '../data/products.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}

function loadProductsByType(products) {
    products.forEach(function(product) {
        const productType = product.type.toLowerCase();

        if (!productTypes[productType]) {
            productTypes[productType] = 1;
        } else {
            productTypes[productType] += 1;
        }

        if (!productsByType[productType]) {
            productsByType[productType] = [];
        }

        productsByType[productType].push(product);
    });
}

let products = {};
const productsByType = {};
const productTypes = {};

(function() {
    loadJSON(function(response) {
        products = JSON.parse(response);
        loadProductsByType(products["products"]);
    });
})();
