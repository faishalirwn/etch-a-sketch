const gridContainer = document.querySelector('.grid-container'),
      resetBtn = document.querySelector('.reset'),
      clearBtn = document.querySelector('.clear'),
      colorBtn = document.querySelector('.color-change'),
      eraserBtn = document.querySelector('.eraser');

let blackActive = true,
    eraserActive = false;

function createGrid(gridSize) {
  gridContainer.innerHTML = '';
  for (let i = 0; i < gridSize * gridSize; i++) {
    const createdGrid = document.createElement('div');
    const gridWidth = 720 / gridSize;
  
    createdGrid.classList.add('grid')
    createdGrid.style.width = `${gridWidth}px`;
    createdGrid.style.height = `${gridWidth}px`;
  
    gridContainer.appendChild(createdGrid);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

resetBtn.addEventListener('click', function(e) {
  const grid = document.querySelectorAll('.grid')
  let gridSize = prompt('How many squares wide would you like the new grid?')

  if (gridSize === null) {
    return
  } else if (isNaN(gridSize) || gridSize <= 0) {
    return alert('Please enter a valid number')
  } else if (gridSize > 100) {
    return alert('Please enter number below 100')
  } else {
    gridSize = Number(gridSize)
  }
  
  createGrid(gridSize)

  grid.forEach(function(el) {
    el.classList.remove('black')
  })

  blackActive = true
  eraserActive = false
  
})

clearBtn.onclick = function() {
  const grid = document.querySelectorAll('.grid')
  
  grid.forEach(function(el) {
    el.classList.remove('black'); el.classList.remove('colorful');
    el.style.backgroundColor = 'rgb(255, 255, 255)'
  })

  eraserActive = false;
}

colorBtn.onclick = function() {
  if (blackActive) {
    blackActive = false
  } else if (!blackActive) {
    blackActive = true
    eraserActive = false
  }
}

eraserBtn.onclick = function() {
  if (!eraserActive) {
    eraserActive = true
    blackActive = false
  }
}

gridContainer.addEventListener('mouseover', function(e) {
  
  if (e.target.classList[0] === 'grid' && blackActive && !eraserActive) {    
    e.target.style.backgroundColor = ''
    e.target.classList.remove('colorful')
    e.target.classList.add('black')
  } else if (e.target.classList[0] === 'grid' && !blackActive && !eraserActive) {
    e.target.classList.remove('black')
    e.target.classList.add('colorful')
    e.target.style.backgroundColor = `rgb(${getRandomInt(0, 220)}, ${getRandomInt(0, 220)}, ${getRandomInt(0, 220)})`
  } else if (e.target.classList[0] === 'grid' && eraserActive) {
    e.target.classList.remove('black')
    e.target.classList.remove('colorful')
    e.target.style.backgroundColor = 'rgb(255, 255, 255)'
  }
  
})

createGrid(32)