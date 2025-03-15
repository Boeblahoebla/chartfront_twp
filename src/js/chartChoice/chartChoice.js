/**
 * Function to initialize the Chart dropdown with the standard domain (Full Europe)
 * **/
export const initializeChartDropdown = (chartDropdown, image, myGFSData, domain) => {
  generateChartDropdown(
      chartDropdown, myGFSData, domain, 'mslp'
  )
  generateChartDropDownHandler(
      chartDropdown, image
  )
}

/**
 * Function to generate the Chart dropdown showing all available charts
 * for the given domain (Full Europe - Central West Europe
 * **/
export const generateChartDropdown = (dropdown, myGFSData, domain, product) => {

    let currentValue;

    if(dropdown.innerHTML !== "") {
        currentValue = dropdown.value
    }

    dropdown.innerHTML = "";

    myGFSData && myGFSData[domain].forEach(chart => {

        let option

        option = document.createElement('option');
        option.value = chart
        option.textContent = chart
        dropdown.appendChild(option)
    })

    if (currentValue) {
        dropdown.value = currentValue
    } else {
        dropdown.value ='mslp'
    }
}

/**
 * Function to generate the chart dropdown handler
 * **/
export const generateChartDropDownHandler = (dropdown, image) => {
    dropdown.addEventListener('change', function () {
        const selectedValue = this.value;

        image.src = image.src
            // Match everything between `images/eur/` (or `images/meur/`) and `_eur_` (or `_meur_`)
            .replace(/(images\/(eur|meur)\/)[^_]+(?:_[^_]+)?(_(eur|meur)_)/, `$1${selectedValue}$3`);
    });
};