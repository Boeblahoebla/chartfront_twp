import { generateChartDropdown } from "../chartChoice/chartChoice";

// DOM Elements
///////////////

const chartDropdown = document.getElementById('chart-dropdown');

/**
 * Function to initialize the Domain Dropdown
 * Hardcoded for now(Full Europe & Central West Europe)
 *
 * TODO: Should come from API
 * **/

export const initializeDomainDropdown = (domainDropdown, image, myGFSData) => {
    generateDomainDropdown(domainDropdown)
    generateDomainDropDownHandler(domainDropdown, image, myGFSData)
}


/**
 * Function to generate the Domain dropdown
 * Hardcoded for now
 *
 * TODO: Should come from API
 * **/
export const generateDomainDropdown = (domainDropdown) => {

    let option

    option = document.createElement('option');
    option.value = "eur"
    option.textContent = "Full Europe"
    domainDropdown.appendChild(option)

    option = document.createElement('option');
    option.value = "meur"
    option.textContent = "Central West Europe"
    domainDropdown.appendChild(option)
}


/**
 * Function to generate the domain dropdown handler
 * **/
export const generateDomainDropDownHandler = (dropdown, image, myGFSData) => {

    dropdown.addEventListener('change', function () {
        const domain = this.value;

        // Replace the region part (_eur_ or _meur_) in the image source
        image.src = image.src
            // Folder
            .replace(/images\/(eur|meur)/, `images/${domain}`)
            // Filename
            .replace(/_(eur|meur)_/, `_${domain}_`);


        generateChartDropdown(chartDropdown, myGFSData, domain)
    });
}
