import { initializeDomainDropdown } from "./domainChoice/domainChoice";
import { initializeChartDropdown } from "./chartChoice/chartChoice";
import { initializePlayPause } from "./slider/controls";
import { initializeTimeSlider } from "./slider/slider";
import { fetchGFSData } from "./api/API";

import mainStyles from '../styles/main.scss';

class ChartExplorer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Inject processed SCSS styles into Shadow DOM
        const style = document.createElement('style');
        style.textContent = mainStyles;
        this.shadowRoot.appendChild(style);

        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
        this.shadowRoot.appendChild(fontAwesomeLink);

        const noUiSliderLink = document.createElement('link');
        noUiSliderLink.rel = 'stylesheet';
        noUiSliderLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.8.1/nouislider.min.css';
        this.shadowRoot.appendChild(noUiSliderLink);

    }

    async connectedCallback() {
        this.render();

        // Fetch the GFS data and initialize components
        fetchGFSData().then(myGFSData => {
            console.log(myGFSData);

            const domainDropdown = this.shadowRoot.getElementById('domain-dropdown');
            const chartDropdown = this.shadowRoot.getElementById('chart-dropdown');
            const image = this.shadowRoot.getElementById('my-chart');
            const timeSlider = this.shadowRoot.getElementById('time-slider');
            const playPause = this.shadowRoot.getElementById('playpause');
            const speedSlider = this.shadowRoot.getElementById("speedSlider");

            initializeTimeSlider(timeSlider, image, myGFSData);
            initializeDomainDropdown(domainDropdown, image, myGFSData);
            initializeChartDropdown(chartDropdown, image, myGFSData, "eur");
            initializePlayPause(timeSlider, playPause, speedSlider);
        });
    }

    render() {
        this.shadowRoot.innerHTML += `
            <div class="container">
                <div class="domain-container">
                    <select id="domain-dropdown" class="domain-select"></select>
                </div>
                <div class="product-container">
                    <select id="chart-dropdown" class="chart"></select>
                </div>
                <div class="model-container">
                    <div class="img-container">
                        <div class="chart-container">
                            <img src="images/eur/mslp_eur_f000.png" alt="chart" id="my-chart">
                        </div>
                        <div class="slider-container">
                            <div id="time-slider"></div>
                        </div>
                        <div id="playpause" class="slider-controls">
                            <i class="fa-solid fa-play fa-2xl"></i>
                        </div>
                        <div id="speedSlider"></div>
                    </div>
                </div>
                <div class="forecasthour-container">
                    <div class="start-hour"></div>
                    <div class="end-hour"></div>
                </div>
            </div>
        `;
    }
}

// Register the Web Component
customElements.define('chart-explorer', ChartExplorer);
