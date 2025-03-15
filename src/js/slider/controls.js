import noUiSlider from "nouislider";

let isAnimating = false;
let animationTimeout;
let animationSpeed = 100;


/** Function to initiate the play pause functionality
 *  It generates both the play pause controls as well as the speed slider
 ***/
export const initializePlayPause = (slider, playPause, speedSlider) => {
    generateControlsHandler(slider, playPause);
    generateSpeedControl(speedSlider);
};


/** Function to generate the controls handler
 *  Clicking play loops the middle slider from left to right, set by the bounds of the outermost sliders
 ***/
const generateControlsHandler = (slider, playPause) => {
    playPause.addEventListener("click", () => {
        toggleSliderAnimation(slider, playPause);
    });
};


/** Function to generate the speed slider control
 *  Sliding from left to right speeds up the loop
 ***/
const generateSpeedControl = (speedSlider) => {
    noUiSlider.create(speedSlider, {
        start: [100],
        connect: [false, true],
        range: {
            min: 50,
            max: 800,
        },
        step: 10,
        direction: "rtl",
    });

    speedSlider.noUiSlider.on("update", (values) => {
        animationSpeed = Number(values[0]);
    });
};


/** Function to animate the slider
 *  The slider moves from left right. When it reaches the end, it adds a pause of 1 second before restarting
 ***/
const animateMiddleSlider = (slider) => {
    isAnimating = true;

    const moveMiddleHandle = () => {
        if (!isAnimating) return;

        const values = slider.noUiSlider.get().map(Number);
        const lowerLimit = values[0];
        const upperLimit = values[2];
        let middle = values[1];

        // Move forward in steps
        middle += 3;

        if (middle >= upperLimit) {
            slider.noUiSlider.setHandle(1, upperLimit, true);

            // Stop and wait for 1 second before restarting
            setTimeout(() => {
                if (isAnimating) {
                    slider.noUiSlider.setHandle(1, lowerLimit, true);
                    moveMiddleHandle();
                }
            }, 1000);
            return;
        }

        slider.noUiSlider.setHandle(1,middle,true);

        animationTimeout = setTimeout(moveMiddleHandle, animationSpeed);
    };

    moveMiddleHandle(); // Start animation
};


/** Function to toggle the loop
 *  Toggling the loop changes the controls from play to pause & back again
 ***/
const toggleSliderAnimation = (slider, playPause) => {
    if (isAnimating) {
        clearTimeout(animationTimeout);
        isAnimating = false;
        playPause.innerHTML = `<i class="fa-solid fa-play fa-2xl"></i>`;
    } else {
        animateMiddleSlider(slider);
        playPause.innerHTML = `<i class="fa-solid fa-pause fa-2xl"></i>`;
    }
};
