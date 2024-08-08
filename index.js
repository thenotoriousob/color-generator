const getColorBtn = document.getElementById("get-color");
const colorModesEl = document.querySelector(".color-modes");
const colorPalletteEl = document.querySelector(".color-pallete");
const colorModes = ["monochrome","monochrome-dark","monochrome-light","analogic","complement","analogic-complement","triad","quad"];

getColorBtn.addEventListener("click", callColorApi);

function callColorApi() {

    // Need to remove the # for the api
    const color = document.getElementById("color-input").value.substring(1);
    const mode = colorModesEl.value;

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=5`)
      .then(res => res.json())
      .then(data => renderColors(data.colors));
};

function renderColors(colorArr) {
  
    colorPalletteEl.innerHTML = "";

    colorArr.forEach(color => {

        const { hex: { value } } = color;

        colorPalletteEl.innerHTML += `
              <div class="color-container">
                  <div class="color" id="${value}"></div>
                  <div class="hex-label">${value}</div>
              </div>
        `;

        document.getElementById(value).style.backgroundColor = value;
    });
};

function populateColorModes() {

    colorModes.forEach((mode) => {

        colorModesEl.innerHTML += `
            <option id="${mode}" data-content="<i class='fa-solid fa-check' aria-hidden='true'></i>">${mode}</option>
        `;
    });

};

populateColorModes();