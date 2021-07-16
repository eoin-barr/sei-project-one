//* DOM VARIABLES
const grid = document.querySelector('.grid')
const resetGame = document.querySelector('.reset')
const gameOverPopUp = document.querySelector('.game-over')






//* GRID VARIABLES
const width = 10
const gridCellCount = width * width
const cells = []





//* GAMES VARIABLES
let blockPosition = 5
let filledCells = []
let isFalling = true



//* FUNCTIONS
function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.setAttribute('data-index', i)
    cells.push(cell)
    grid.appendChild(cell)
  }
}
createGrid()

function addBlock(position) {
  cells[position].classList.add('block')
}

function removeBlock(position) {
  cells[position].classList.remove('block')
}

for (let i = 0; i < filledCells.length; i++) {
  addBlock(filledCells[i])
}

function checkIfGameOver() {
  return filledCells.some(num => {
    if (num <= width - 1) {
      return num
    }
  })
}

function gameOver() {
  gameOverPopUp.classList.add('pop-up')
  grid.style.display = 'none'
  fallingInterval = false
}




function fallingInterval() {
  blockPosition = 5
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeBlock(blockPosition - width)
    addBlock(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (filledCells.some(num => {
      if (num <= width + 10) {
        return num
      }
    })) {
      console.log('GAME OVER')
      return gameOver()
    } else if (y === width - 1 || filledCells.some(num => {
      if (num === blockPosition + width) {
        return num
      }
    })) {
      clearInterval(intervalId)
      filledCells.push(blockPosition)
      console.log(filledCells)
      return fallingInterval()
      // if (checkIfGameOver === true) {
      //   return isFalling === false
      // } else {
      //   return isFalling = true
      // }
    }
  }, 1000)
}
fallingInterval()

function handleKeyUp(event) {
  removeBlock(blockPosition) // * remove block from the current position
  const x = blockPosition % width
  const y = Math.floor(blockPosition / width)

  if (y < width - 1) {
    switch (event.keyCode) { // * calculate the next position and update it
      case 39:
        if (x < width - 1) blockPosition++
        break
      case 37:
        if (x > 0) blockPosition--
        break
      case 38:
        if (y > 0) blockPosition -= width
        break
      case 40:
        if (y < width - 1) blockPosition += width
        break
      default:
        console.log('invalid key do nothing')
    }
    addBlock(blockPosition) // * add block back at the new position
  } else {
    let blockToRemain = blockPosition
    addBlock(blockToRemain)
    console.log('it works')
  }
}




function handleResetGameClick() {
  while (isFalling) {
    fallingInterval()
    blockPosition = 5
  }
}




//* EVENTS
resetGame.addEventListener('click', handleResetGameClick)
window.addEventListener('keyup', handleKeyUp)