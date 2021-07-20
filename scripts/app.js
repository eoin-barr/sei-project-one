//* DOM VARIABLES
const grid = document.querySelector('.grid')
const resetGame = document.querySelector('.reset')
const gameOverPopUp = document.querySelector('.game-over')
const scoreDisplay = document.querySelector('#score-display')
const music = document.querySelector('audio')
const musicBtn = document.querySelector('.music')


//* GRID VARIABLES
const width = 10
const height = width * 2
const gridCellCount = width * height
const cells = []


//* GAMES VARIABLES
let score = 0
let filledCells = []


//! GLOBAL FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.setAttribute('data-index', i)
    cells.push(cell)
    grid.appendChild(cell)
  }
}
createGrid()

const lBlock = [
  [1, 2, 1 + width, 1 + width * 2],
  [width, 1 + width, 2 + width, 2 + width * 2],
  [width * 2, 1 + width * 2, 1 + width, 1],
  [width, width * 2, 1 + width * 2, 2 + width * 2]
]

const iBlock = [
  [1, 1 + width, 1 + width * 2, 1 + width * 3],
  [width, 1 + width, 2 + width, 3 + width],
  [1, 1 + width, 1 + width * 2, 1 + width * 3],
  [width, 1 + width, 2 + width, 3 + width]
]

const tBlock = [
  [1, width, 1 + width, 2 + width],
  [1, 1 + width, 2 + width, 1 + width * 2],
  [width, 1 + width, 1 + width * 2, 2 + width],
  [width, 1 + width, 1, 1 + width * 2]
]

const sBlock = [
  [width * 2, 1 + width, 1 + width * 2, 2 + width],
  [0, width, 1 + width, 1 + width * 2],
  [width * 2, 1 + width, 1 + width * 2, 2 + width],
  [0, width, 1 + width, 1 + width * 2]
]

const zBlock = [
  [width, 1 + width, 1 + width * 2, 2 + width * 2],
  [1 + width, 1 + width * 2, 2 + width, 2],
  [width, 1 + width, 1 + width * 2, 2 + width * 2],
  [1 + width, 1 + width * 2, 2 + width, 2]
]

const oBlock = [
  [0, 1, width, 1 + width],
  [0, 1, width, 1 + width],
  [0, 1, width, 1 + width],
  [0, 1, width, 1 + width]
]
const blocks = [lBlock, iBlock, tBlock, sBlock, zBlock, oBlock]

let currentRotation = 0
let rand = Math.floor(Math.random() * blocks.length)

let currentShape = blocks[rand][currentRotation]


let currentCell = 4

const x = currentCell % width



function generateBlock() {
  return currentShape.forEach(index => {
    cells[currentCell + index].classList.add('block')
  })
}

function removeBlock() {
  return currentShape.forEach(index => {
    cells[currentCell + index].classList.remove('block')
  })
}

// let intervalId = setInterval(blockFall, 1000)

function blockFall() {
  if (checkForBottom() && !checkBlockBelow()) {
    removeBlock()
    currentCell += width
    generateBlock()
  } else {
    // addingBlocks()
    addToFilledCells()
    // addingFilledCellsToGrid()
    console.log(filledCells)
    anotherBlock()
  }
}


function addToFilledCells() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.value === 'block' && !filledCells.includes(parseInt(cells[i].dataset.index))) {
      filledCells.push(i)
    }
  }
}

function anotherBlock() {
  rand = Math.floor(Math.random() * blocks.length)
  currentShape = blocks[rand][currentRotation]
  currentCell = 4
  generateBlock()
}

function checkForBottom() {
  const below = currentShape.map(block => {
    return block + currentCell + width
  })
  return below.every(block => {
    return (Math.floor(block / height)) < width
  })
}

function checkBlockBelow() {
  const belowBlock = currentShape.map(block => {
    return block + currentCell + width
  })
  return filledCells.some(item => belowBlock.includes(item))
}

function checkBlockRight() {
  const blockRight = currentShape.map(block => {
    return block + currentCell + 1
  })
  return filledCells.some(item => blockRight.includes(item))
}

function checkBlockLeft() {
  const blockLeft = currentShape.map(block => {
    return block + currentCell - 1
  })
  return filledCells.some(item => blockLeft.includes(item))
}

function checkRight() {
  const x = currentShape.map(index => {
    return (index + currentCell + 1) % width
  })
  return x.every(item => {
    if (item < width) {
      return item
    }
  })
}

function checkLeft() {
  const x = currentShape.map(index => {
    return (index + currentCell) % width
  })
  return x.every(item => {
    if (item >= 0) {
      return item
    }
  })
}

function handleKeyUp(e) {
  removeBlock()
  switch (e.keyCode) {
    case 39:
      if (checkRight() && !checkBlockRight()) currentCell++
      break
    case 37:
      if (checkLeft() && !checkBlockLeft()) currentCell--
      break
    case 40:
      if (checkForBottom() && !checkBlockBelow()) currentCell += width
      break
    default:
      console.log('unable to move')
  }
  generateBlock()
}










































// function rotateBlock() {
//   if (currentRotation < currentShape.length) {
//     currentRotation++
//   } else {
//     currentRotation === 0
//   }
// }






// function addingFilledCellsToGrid() {
//   return filledCells.forEach(num => {
//     return cells[num].classList.add('block')
//   })
// }

// function checkLeft() {
//   const x = currentShape.map(index => {
//     return (index + currentCell) % width
//   })
//   console.log(x)
//   return x.every(item => {
//     if (item > 1) {
//       return item
//     }
//   })
// }


// function addingBlocks() {
//   return currentShape.forEach(block => {
//     cells[block + currentCell].classList.add('block')
//   })
// }



//! HANDLEING KEY UP FOR DIFFERENT BLOCK TYPES ///////////////////////////////////////////////////////////////////////////////////////////////////////

// function handleKeyUp(event) {
//   const x = blockPosition % width
//   const y = Math.floor(blockPosition / height)
//   if (isSquare) {
//     removeSquareBlock(blockPosition)
//     if (y < height - 1) {
//       switch (event.keyCode) {
//         case 39:
//           if (x < width - 1 && !squareCheckIfBlockRight()) blockPosition++
//           break
//         case 37:
//           if (x > 1 && !squareCheckIfBlockLeft()) blockPosition--
//           break
//         case 38:
//           if (y > 0) console.log('rotated')
//           break
//         case 40:
//           if (y < width - 1 && !squareCheckIfBlockBelow()) blockPosition += width
//           break
//         default:
//           console.log('invalid key do nothing')
//       }
//       addSquareBlock(blockPosition)
//     } else {
//       console.log('it works')
//     }
//   } else if (isLine) {

//! CHECKS FOR FULL ROW, REMOVES AND MOVES ABOVE BLOCKS DOWN ///////////////////////////////////////////////////////////////////////////////////////////////////////

// function fullRowCheck() {
//   const sortedArr = filledCells.sort((a, b) => {
//     return a - b
//   })
//   let finalArr = []
//   let newRowCheckArr = []
//   for (let i = 0; i < sortedArr.length; i++) {
//     if (sortedArr[i] % width === 0 && ((sortedArr[i] + (width - 1)) === (sortedArr[i + (width - 1)]))) {
//       newRowCheckArr.push(sortedArr[i])
//     }
//   } if (newRowCheckArr.length < 0) {
//     console.log('hopefully this is not printed')
//   } else {
//     score += (1000 * newRowCheckArr.length)
//     scoreDisplay.textContent = score
//     for (let i = 0; i < newRowCheckArr.length; i++) {
//       for (let j = 0; j < width; j++) {
//         finalArr.push(newRowCheckArr[i] + j)
//       }
//     }
//     finalArr.forEach(item => removeBlock(item))
//     const removeFullRows = sortedArr.filter(item => {
//       return !finalArr.includes(item)
//     })
//     filledCells = removeFullRows.map(item => {
//       if (item < newRowCheckArr[0]) {
//         removeBlock(item)
//         return item + (width * newRowCheckArr.length)
//       } else {
//         return item
//       }
//     })
//     filledCells.forEach(item => addBlock(item))
//   }
// }





//! EVENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// resetGame.addEventListener('click', handleResetGameClick)
window.addEventListener('keyup', handleKeyUp)
// musicBtn.addEventListener('click', handleMusicClick)
