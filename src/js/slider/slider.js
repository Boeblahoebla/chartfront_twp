import { generateForecastRange } from "../helpers/foreCastRange";
import noUiSlider from "nouislider";

/**
 * Function to initialize the Time Slider
 * **/
export const initializeTimeSlider = (timeSlider, image, myGFSData) => {
    const forecastHours = generateForecastRange(myGFSData)

    generateTimeSlider(timeSlider, forecastHours, image)
    initSliderHandlers(timeSlider, image )
    setSliderStartPosition(timeSlider)
}


/** Function to initiate the slider handlers
 *
 *  Sliding the sliders from left to right changes the source of the image
 *  corresponding with the forecast hour
 * **/
export const initSliderHandlers = (timeSlider, image) => {
    // Slider update handler
    timeSlider.noUiSlider.on('update', (values, handle) => {

        console.log(handle);

        // Find the value of the active handle as it changes
        const value = Number(values[handle]);

        // Format as "fXXX"
        const formattedValue = `f${String(value).padStart(3, '0')}`;

        // Update the image with the new slider value
        image.src = image.src.replace(/f\d{3}/, formattedValue);
    });

}


/**
 * Function to generate the slider and set the ranges for the slide elements
 * **/
export const generateTimeSlider = (timeSlider, forecastHours) => {

    // Get min and max forecast hour
    const minHour = Math.min(...forecastHours);
    const maxHour = Math.max(...forecastHours);

    // Initialize noUiSlider with the processed range
    noUiSlider.create(timeSlider, {
        start: [minHour, minHour, maxHour],
        connect: [false, true, false, false],
        step: 3,
        range: {
            'min': minHour,
            'max': maxHour
        }
    })
}


/**
 * Function to set the slider to it's starting position
 * **/
export const setSliderStartPosition = timeSlider => {
    const firstValue = timeSlider.noUiSlider.options.range.min;
    timeSlider.noUiSlider.setHandle(0, firstValue.toString(), true);
}