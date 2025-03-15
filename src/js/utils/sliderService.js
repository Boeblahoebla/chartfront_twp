let noUiSliderInstance = null;

/**
 * Function to pass a shared library from the host to the MFE & be able to use it as a normal import
 ***/
export const noUiSlider = (() => {
    if (!noUiSliderInstance) {
        if (window.noUiSlider) {
            noUiSliderInstance = window.noUiSlider;
        } else {
            console.error("noUiSlider is not available from the host.");
        }
    }
    return noUiSliderInstance;
})();