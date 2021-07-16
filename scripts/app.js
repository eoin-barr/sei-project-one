//* DOM VARIABLES
const grid = document.querySelector('.grid')
const resetGame = document.querySelector('.reset')





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

function checkIfGameOver() {
  return filledCells.some(num => {
    if (num <= width - 1) {
      return num
    }
  })
}




function fallingInterval() {
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeBlock(blockPosition - width)
    addBlock(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (y === width - 1) {
      clearInterval(intervalId)
      filledCells.push(blockPosition)
      console.log(filledCells)
      if (checkIfGameOver) {
        isFalling === false
      } else {
        isFalling === true
      }
      // return isFalling = window.confirm('Would you like another block?')
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
  let isFalling = true
  while (isFalling) {
    fallingInterval()
  }
}




//* EVENTS
resetGame.addEventListener('click', handleResetGameClick)
window.addEventListener('keyup', handleKeyUp)