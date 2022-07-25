const blackboard = document.getElementById('blackboard');
const colortypebutton =  document.getElementById('colortypebutton');
const erasebutton = document.getElementById('erasebutton')
const resetbutton = document.getElementById('resetbutton');
const slider = document.getElementById('slider');
const sizeLabel = document.getElementById('sizeLabel');

let blackboardPixels = blackboard.children;
let blackboardSide = 16;
let pixelArray = Array.from(blackboardPixels);

resetbutton.addEventListener('click', updateGrid);
colortypebutton.addEventListener('click', changeButtonText);
slider.addEventListener('input', updateGrid);
erasebutton.addEventListener('click', activeButton);

//on page load
function updateGrid() {
    while (blackboard.firstChild) {blackboard.firstChild.remove()};
    blackboardSide = slider.value;
    sizeLabel.textContent = slider.value;
    createPixels(blackboardSide);
    blackboardPixels = blackboard.children;
    pixelArray = Array.from(blackboardPixels)
    addPixelsClass();
    changeColor();
    columnsRows()
}

function createPixels(blackboardSide) {
    for(let i = 0; i < blackboardSide**2; i++) {
        let pixel = document.createElement('div');
        blackboard.appendChild(pixel);
    }
}

function addPixelsClass() {
    for(let i=0; i<blackboardPixels.length; i++) {
    blackboardPixels[i].classList.add('pixels');
    }
}

function columnsRows() {
    document.getElementById("blackboard").style.gridTemplateColumns = `repeat(${slider.value}, minmax(5px, 1fr))`;
    document.getElementById("blackboard").style.gridTemplateRows = `repeat(${slider.value}, minmax(5px, 1fr))`;
}

function changeButtonText() {
    if (colortypebutton.textContent == "RGB") {
        colortypebutton.textContent = "B&W";
        colortypebutton.style.backgroundColor = "Black";
        colortypebutton.style.color = "White"; 
    }
    else if(colortypebutton.textContent == "B&W") {
        colortypebutton.textContent = "RGB";
        colortypebutton.style.backgroundColor = "rgba(229, 68, 156)";
        colortypebutton.style.color = "Black"; 
    }
    erasebutton.classList.remove('activebutton');
}

function activeButton() {
    if (this.className === '') {
        this.className = 'activebutton';
    }
    else if (this.className = 'activebutton') {
        this.classList.remove('activebutton');
    }
}

function changeColor() {
        pixelArray.forEach((pixel) => pixel.addEventListener('mouseover', (e)=> {
            if (erasebutton.className === 'activebutton') {erase(e)}
            else if(colortypebutton.textContent == "RGB") {blackWhite(e)}
            else if (colortypebutton.textContent == "B&W") {randomRgb(e)}
        }));
}

function erase(e) {
    e.target.style.backgroundColor= "white";
}

function blackWhite(e) {
    e.target.style.backgroundColor="black";
}

function randomRgb(e) {
    e.target.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');;
}










