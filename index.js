const getColorBtn = document.getElementById("get-color");
const colorModesEl = document.querySelector(".color-modes");
const colorPalletteEl = document.querySelector(".color-pallete");
const colorModes = ["monochrome","monochrome-dark","monochrome-light","analogic","complement","analogic-complement","triad","quad"];

async function callColorApi() {

    try {
        // Need to remove the # for the api
        const color = document.getElementById("color-input").value.substring(1);
        const mode = colorModesEl.value;

        const res = await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=5`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        renderColors(data.colors);

    }

    catch(error) {
        console.error("failed...");
    }
};

function renderColors(colorArr) {

    colorPalletteEl.innerHTML = "";

    colorArr.forEach(color => {

        // This decontructs a value from the hex object within the color object
        const { hex: { value } } = color;

        const colorItemHTML = `
        <div class="color-container" data-color="${value}" tabindex="0">
            <span class="tooltiptext" id="my-tooltip-${value}">Copy to clipboard</span>
            <div class="color" id="${value}" style="background-color: ${value}">
                
            </div>
            
            <div class="hex-label">${value}</div>
        </div>
        `;

        colorPalletteEl.innerHTML += colorItemHTML

    });

    setUpEvenListeners();
};

function setUpEvenListeners() {

    addGlobalEventListener("click",".color-container", e => copyToClipboard(e.target.dataset.color));

    addGlobalEventListener("keydown",".color-container", e => {
        if (e.key === "Enter") {
            copyToClipboard(e.target.dataset.color);
        };
    });

    // When the user moves off the color item then reset the text incase it changed
    addGlobalEventListener("mouseout",".color-container", e => resetTooltipText(e));


    // When the user moves off the color item then reset the text incase it changed
    addGlobalEventListener("focusout",".color-container", e => resetTooltipText(e));

};

function addGlobalEventListener(type, selector, callback) {

    colorPalletteEl.addEventListener(type, e => {

        if (e.target.matches(selector)) {
            callback(e);
        };
    });

}

function resetTooltipText(e) {

    const myTooltipEl = document.getElementById(`my-tooltip-${e.target.dataset.color}`);

    myTooltipEl.textContent = "Copy to clipboard";
    /* Need to remove focus from the container so the tooltip goes away,
    it needs the on focus css for keyboard users, but this causes an issue
    with it not hiding for mouse users */
    e.target.blur();

};

function populateColorModes() {

    colorModes.forEach((mode) => {

        const option = document.createElement("option");
        option.id = mode;
        option.textContent = mode;

        colorModesEl.appendChild(option);
    });

};

/* This works in chrome but doesn't appear to work in the mini browser */
function copyToClipboard(copyText) {

    navigator.clipboard.writeText(copyText);

    document.getElementById(`my-tooltip-${copyText}`).textContent = "Copied";

};

getColorBtn.addEventListener("click", callColorApi);

populateColorModes();
callColorApi();