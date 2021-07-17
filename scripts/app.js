//* DOM VARIABLES
const grid = document.querySelector('.grid')
const resetGame = document.querySelector('.reset')
const gameOverPopUp = document.querySelector('.game-over')


//* GRID VARIABLES
const width = 10
const gridCellCount = width * width
const cells = []


//* GAMES VARIABLES
let points = 0
let blockPosition = 5
let filledCells = []


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
    if (num <= width + 10) {
      return num
    }
  })
}

function gameOver() {
  gameOverPopUp.classList.add('pop-up')
  grid.style.display = 'none'
}

function checkIfBlockBelow() {
  return filledCells.some(num => {
    if (num === blockPosition + width) {
      return num
    }
  })
}



const indivDiv = document.querySelectorAll('.grid div')

function fullRowCheck(arrToCheck) {
  const getFirstDigit = arrToCheck.map(num => {
    const str = String(num)
    return parseInt(str[0])
  })
  const objOfFirstDigits = getFirstDigit.reduce((obj, item) => {
    if (!obj[item]) {
      obj[item] = 0
    }
    obj[item]++
    return obj
  }, {})
  const arrOfObjValues = Object.values(objOfFirstDigits)
  const arrOfObjKeys = Object.keys(objOfFirstDigits)
  const testForFullRow = arrOfObjValues.findIndex(item => {
    return item === width
  })
  if (testForFullRow >= 0) {
    points += 1000
    const finalString = arrOfObjKeys[testForFullRow]
    const finalNumber = parseInt(finalString)
    const finalArr = []
    for (let i = 0; i < width; i++) {
      finalArr.push((finalNumber * 10) + i)
      for (let i = 0; i < finalArr.length; i++) {
        removeBlock(finalArr[i])
        filledCells = filledCells.filter(item => {
          if (item !== finalArr[i]) {
            return item
          }
        })
      }
    } filledCells = filledCells.map(item => {
      if (indivDiv[item + width].classList.contains('block')) {
        return item
      } else {
        removeBlock(item)
        return item + width
      }
    })
    const iterator = filledCells.values()
    for (let value of iterator) {
      addBlock(value)
    }
    return filledCells
  } else {
    return filledCells
  }
}




function fallingInterval() {
  blockPosition = 5
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeBlock(blockPosition - width)
    addBlock(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (checkIfGameOver()) {
      console.log('GAME OVER')
      return gameOver()
    } else if (y === width - 1 || checkIfBlockBelow()) {
      clearInterval(intervalId)
      filledCells.push(blockPosition)
      fullRowCheck(filledCells)
      return fallingInterval()
    }
  }, 1000)
}

function handleKeyUp(event) {
  removeBlock(blockPosition) // * remove block from the current position
  const x = blockPosition % width
  const y = Math.floor(blockPosition / width)

  if (y < width - 1 || checkIfBlockBelow() === false) {
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
    console.log('it works')
  }
}

function handleResetGameClick() {
  fallingInterval()
}



//* EVENTS
resetGame.addEventListener('click', handleResetGameClick)
window.addEventListener('keyup', handleKeyUp)