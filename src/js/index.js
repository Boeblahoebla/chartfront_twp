import { initializeDomainDropdown } from "./domainChoice/domainChoice";
import { initializeChartDropdown } from "./chartChoice/chartChoice";
import { initializePlayPause } from "./slider/controls";
import { initializeTimeSlider } from "./slider/slider";
import { fetchGFSData } from "./api/API";

import 'nouislider/dist/nouislider.css';

import '../styles/main.scss'

// DOM Elements
///////////////

const domainDropdown = document.getElementById('domain-dropdown')
const chartDropdown = document.getElementById('chart-dropdown')

const image = document.getElementById('my-chart');
const timeSlider = document.getElementById('time-slider');
const playPause = document.getElementById('playpause');
const speedSlider = document.getElementById("speedSlider");



/** Function to fetch the GFS metadata for the run
 *  With that data it generates all the forecast hours &
 *  initializes the Time Slider, Domain Dropdown & Chart Dropdown
 *
 *  Timeslider:
 *  The first slider is the first forecast hour, "fhr000"
 *  The second slider is the first forecast hour (looping purposes)
 *  The third slider is the last forecast hour, "fhr384
 *
 *  Domain Dropdown:
 *  Shows all available domains for which charts are available
 *
 *  Chart Dropdown:
 *  Shows all available charts for the chose domain
 *  Standard domain = "Full Europe"
 *
 *  **/
fetchGFSData().then(myGFSData => {

    console.log(myGFSData)

    initializeTimeSlider(timeSlider, image, myGFSData)
    initializeDomainDropdown(domainDropdown, image, myGFSData)
    initializeChartDropdown(chartDropdown, image, myGFSData, "eur")
    initializePlayPause(timeSlider, playPause, speedSlider);

})