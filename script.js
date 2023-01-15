/*The meat of this code is to make divs as a canvas to sketch with*/
var MOUSE_DOWN_FLAG = 0,
  mouseDown = 1,
  mouseUp = 0;
var SELECTED_AREA = 16;
var MODE_FLAG = 0,
  eraseMode = 1,
  sketchMode = 0;

var RAINBOW_MODE = false;

//Setter: mouse down flag
function setMouseDownFlag(val) {
  MOUSE_DOWN_FLAG = val;
}

//Clone then append divs, add click listener to divs
function pushToDom(divs, selectedArea) {
  for (let i = 0; i < selectedArea ** 2; i++) {
    let tmp = divs.cloneNode(true);
    drawContainer.appendChild(tmp);
  }

  sketchSquares = document.querySelectorAll('.sketch-squares');
  sketchSquares.forEach((square) => {
    square.addEventListener('click', (e) => divClickHandler(e));
    square.addEventListener('mouseover', (e) => divClickHandler(e));
  });
}

//Initialise the first divs
function initArea(divs) {
  let initArea = SELECTED_AREA;
  widthVal.textContent = SELECTED_AREA;

  let initDimensions = Math.floor((800 / initArea) * 100) / 100;

  divs.style.cssText = `width: ${initDimensions}px; height: ${initDimensions}px; background-color: white; cursor: crosshair;`;
  pushToDom(divs, initArea);
}

//Remove previous divs, change css, make new sketching divs
function changeArea(e) {
  SELECTED_AREA = parseInt(e.value); //Work out new dimensions
  widthVal.textContent = SELECTED_AREA;
  let selectedDimensions =
    Math.floor((800 / SELECTED_AREA) * 10) / 10;
  console.log(selectedDimensions * SELECTED_AREA);
  sketchDivs.style.width = `${selectedDimensions}px`; //Add dimensions to css
  sketchDivs.style.maxWidth = `${selectedDimensions}px`;
  sketchDivs.style.height = `${selectedDimensions}px`;
  sketchDivs.style.maxHeight = `${selectedDimensions}px`;
  sketchDivs.style.display = 'block';
  sketchDivs.setAttribute('draggable', false);

  while (drawContainer.firstChild) {
    //Remove previous divs
    drawContainer.removeChild(drawContainer.lastChild);
  }
  pushToDom(sketchDivs, SELECTED_AREA); //Append new divs
}

/*MAIN*/
//Assign variables to nodes for easier access
const sketchDivs = document.createElement('div');
sketchDivs.classList.add('sketch-squares');
sketchDivs.setAttribute('draggable', false);

const drawContainer = document.querySelector('.draw-container');
const eraser = document.querySelector('#eraser');
const sketcher = document.querySelector('#sketcher');
const rainbow = document.querySelector('.rainbow-mode');
const areaNode = document.querySelector('#area');
const widthVal = document.querySelector('#widthVal');

let sketchSquares = [];
initArea(sketchDivs);
document
  .querySelector('body')
  .addEventListener('mousedown', () => setMouseDownFlag(mouseDown));
document
  .querySelector('body')
  .addEventListener('mouseup', () => setMouseDownFlag(mouseUp));
/*END MAIN*/

/*Event Listeners and Click Handlers*/
//Handles: changing sketch divs color
function divClickHandler(e) {
  if (MOUSE_DOWN_FLAG) {
    if (!MODE_FLAG) {
      if (!RAINBOW_MODE) {
        e.target.style.backgroundColor = 'black';
      } else {
        let bgc = Math.floor(Math.random() * 16777215).toString(16);
        console.log(bgc);
        e.target.style.backgroundColor = `#${bgc}`;
      }
    } else {
      e.target.style.backgroundColor = 'white';
    }
  }
}

//Handles: clear button click
document.querySelector('#clear').addEventListener('click', () => {
  sketchSquares.forEach((sq) => (sq.style.backgroundColor = 'white'));
  MODE_FLAG = sketchMode;
  eraser.classList.remove('active-mode');
  sketcher.classList.add('active-mode');
});

//Sets initial area to 16
document.querySelector('body').onload = () => {
  areaNode.value = SELECTED_AREA;
};

//Click listener: change area
areaNode.addEventListener('mouseup', (e) => changeArea(e.target));

//Click listener: erase mode
eraser.addEventListener('click', () =>
  !MODE_FLAG
    ? ((MODE_FLAG = eraseMode),
      eraser.classList.toggle('active-mode'),
      sketcher.classList.toggle('active-mode'))
    : null
);

//Click listener: sketch mode
sketcher.addEventListener('click', () =>
  MODE_FLAG
    ? ((MODE_FLAG = sketchMode),
      eraser.classList.toggle('active-mode'),
      sketcher.classList.toggle('active-mode'))
    : null
);

//Click listener: rainbow mode
rainbow.addEventListener('click', () => {
  rainbow.classList.toggle('rainbow-active');
  RAINBOW_MODE = !RAINBOW_MODE;
});
