const getColorBtn = document.getElementById("get-color");
const colorModesEl = document.querySelector(".color-modes");
const colorPalletteEl = document.querySelector(".color-pallete");
const colorModes = ["monochrome","monochrome-dark","monochrome-light","analogic","complement","analogic-complement","triad","quad"];

getColorBtn.addEventListener("click", callColorApi);

async function callColorApi() {

    // Need to remove the # for the api
    const color = document.getElementById("color-input").value.substring(1);
    const mode = colorModesEl.value;

    const res = await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=5`);
    const data = await res.json();

    renderColors(data.colors);
};

function renderColors(colorArr) {

    const templateEl = document.getElementById("color-template");
  
    colorPalletteEl.innerHTML = "";

    colorArr.forEach(color => {

        const { hex: { value } } = color;

        // Clone the template so we can add it to the dom
        let clonedTemplate = templateEl.content.cloneNode(true);

        clonedTemplate.querySelector(".color").id = value;
        clonedTemplate.querySelector(".hex-label").textContent = value;
        clonedTemplate.querySelector(".tooltiptext").id = `my-tooltip-${value}`;

        colorPalletteEl.appendChild(clonedTemplate);

        document.getElementById(value).style.backgroundColor = value;

        // Create a click event on every color item
        document.getElementById(value).addEventListener("click", (e) => {
            copyToClipboard(e.target.id);

            document.getElementById(`my-tooltip-${value}`).textContent = "Copied";
        });

        // When the user moves off the color item then reset the text incase it changed
        document.getElementById(value).addEventListener("mouseout", () => {
            document.getElementById(`my-tooltip-${value}`).textContent = "Copy to clipboard";
        });
    });
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

}

populateColorModes();