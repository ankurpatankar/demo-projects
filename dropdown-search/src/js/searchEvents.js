function autoComplete(event) {
    const searchTerm = event.target.value;
    const keys = Object.keys(productTypes);
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    let totalResults = 0;
    keys.forEach(function(key) {
        if (key.replace(/_/ig, ' ').indexOf(searchTerm) !== -1) {
            totalResults += showSearchResults(key, searchResults);
        }
    });

    if (!totalResults) {
        totalResults = searchByName(searchTerm);
    }

    const searchMeta = document.getElementsByClassName('search-metadata')[0];
    searchMeta.innerText = `Found ${totalResults} results`;
}

function searchByName(searchTerm) {
    const searchResults = [];
    const items = products["products"];
    items.forEach(item => {
        if (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            searchResults.push(item);
        }
    });
    const searchResultsContainer = document.getElementById('search-results');
    addToSearchResults(searchResults, searchResultsContainer);
    return searchResults.length;
}

function showFinancialProductTypesDropdown() {
    const keys = Object.keys(productTypes);
    const datalist = document.getElementById('financial-products');
    datalist.innerHTML = '';
    keys.forEach(function(key) {
        let option = document.createElement('option');
        option.value = key.replace(/_/ig, ' ');
        datalist.appendChild(option);
    });
}

function showSearchResults(key, searchResults) {
    const products = productsByType[key];
    addToSearchResults(products, searchResults);
    return products.length;
}

function addToSearchResults(products, searchResults) {
    products.forEach(function(product) {
        let liElement = document.createElement('li');
        let anchorElement = document.createElement('a');
        anchorElement.innerText = `${product.name} (${product.type})`;
        anchorElement.href = product.url;
        liElement.appendChild(anchorElement);
        searchResults.appendChild(liElement);
    });
}
