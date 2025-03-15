/**
 * Function to generate the forecast range
 * **/
export const generateForecastRange = myGFSData => {
    const myForeCastRange = [];

    const { forecast_hours } = myGFSData.gfsRunMetadata;

    // Fill myForeCastRange with sorted forecast hour keys
    for (const [key, value] of Object.entries(forecast_hours)) {
        myForeCastRange.push({ [key]: value });
    }

    // Extract numeric forecast hours from the object keys
    // ("fhr000", "fhr003", "fhr006", ...)
    const forecastHours = myForeCastRange.map(obj => {
        const key = Object.keys(obj)[0];
        // Convert "fhr000" to 0, "fhr003" to 3 en kuile
        return parseInt(key.replace("fhr", ""), 10);
    });

    return forecastHours
}

