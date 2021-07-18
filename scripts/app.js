//* DOM VARIABLES
const grid = document.querySelector('.grid')
const resetGame = document.querySelector('.reset')
const gameOverPopUp = document.querySelector('.game-over')


//* GRID VARIABLES
const width = 10
const height = width * 2
const gridCellCount = width * height
const cells = []


//* GAMES VARIABLES
let points = 0
let blockPosition = 15
let filledCells = []

let isSquare = false
let isLine = false
let isT = false
let isS = false
let isZ = false
let isL = false
let isJ = false


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

function addBlock(position) {
  cells[position].classList.add('block')
}

function removeBlock(position) {
  cells[position].classList.remove('block')
}


for (let i = 0; i < filledCells.length; i++) {
  addSquareBlock(filledCells[i])
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
  fallingInterval()
}

function handleResetGameClick() {
  resetGame.innerHTML = 'Restart Game'
  tetris()
}

function randomNumber() {
  return Math.floor(Math.random() * 7)
  // return 6
}


const indivDiv = document.querySelectorAll('.grid div')



function tetris() {
  const randNum = randomNumber()
  if (randNum === 0) {
    fallingSquareBlock()
  } else if (randNum === 1) {
    fallingLineBlock()
  } else if (randNum === 2) {
    fallingTBlock()
  } else if (randNum === 3) {
    fallingSBlock()
  } else if (randNum === 4) {
    fallingZBlock()
  } else if (randNum === 5) {
    fallingLBlock()
  } else if (randNum === 6) {
    fallingJBlock()
  }


}


//! HANDLEING KEY UP FOR DIFFERENT BLOCK TYPES ///////////////////////////////////////////////////////////////////////////////////////////////////////

function handleKeyUp(event) {
  const x = blockPosition % width
  const y = Math.floor(blockPosition / height)
  if (isSquare) {
    removeSquareBlock(blockPosition)
    if (y < height - 1) {
      switch (event.keyCode) {
        case 39:
          if (x < width - 1 && !squareCheckIfBlockRight()) blockPosition++
          break
        case 37:
          if (x > 1 && !squareCheckIfBlockLeft()) blockPosition--
          break
        case 38:
          if (y > 0) blockPosition -= width
          break
        case 40:
          if (y < width - 1 && !squareCheckIfBlockBelow()) blockPosition += width
          break
        default:
          console.log('invalid key do nothing')
      }
      addSquareBlock(blockPosition)
    } else {
      console.log('it works')
    }
  } else if (isLine) {
    removeLineBlock(blockPosition)
    if (y < height - 1) {
      switch (event.keyCode) {
        case 39:
          if (x < width - 1 && !lineCheckIfBlockRight()) blockPosition++
          break
        case 37:
          if (x >= 1 && !lineCheckIfBlockLeft()) blockPosition--
          break
        case 38:
          if (y > 0) blockPosition -= width
          break
        case 40:
          if (y < width - 1 && !lineCheckIfBlockBelow()) blockPosition += width
          break
        default:
          console.log('invalid key do nothing')
      }
      addLineBlock(blockPosition)
    } else {
      console.log('it works')
    }
  } else if (isT) {
    removeTBlock(blockPosition)
    if (y < height - 1) {
      switch (event.keyCode) {
        case 39:
          if (x < width - 2 && !tCheckIfBlockRight()) blockPosition++
          break
        case 37:
          if (x > 1 && !tCheckIfBlockLeft()) blockPosition--
          break
        case 38:
          if (y > 0) blockPosition -= width
          break
        case 40:
          if (y < width - 1 && !tCheckIfBlockBelow()) blockPosition += width
          break
        default:
          console.log('invalid key do nothing')
      }
      addTBlock(blockPosition)
    } else {
      console.log('it works')
    }
  } else if (isS) {
    removeSBlock(blockPosition)
    if (y < height - 1) {
      switch (event.keyCode) {
        case 39:
          if (x < width - 2 && !sCheckIfBlockRight()) blockPosition++
          break
        case 37:
          if (x > 1 && !sCheckIfBlockLeft()) blockPosition--
          break
        case 38:
          if (y > 0) blockPosition -= width
          break
        case 40:
          if (y < width - 1 && !sCheckIfBlockBelow()) blockPosition += width
          break
        default:
          console.log('invalid key do nothing')
      }
      addSBlock(blockPosition)
    } else {
      console.log('it works')
    }
  } else if (isZ) {
    removeZBlock(blockPosition)
    if (y < height - 1) {
      switch (event.keyCode) {
        case 39:
          if (x < width - 2 && !zCheckIfBlockRight()) blockPosition++
          break
        case 37:
          if (x > 1 && !zCheckIfBlockLeft()) blockPosition--
          break
        case 38:
          if (y > 0) blockPosition -= width
          break
        case 40:
          if (y < width - 1 && !zCheckIfBlockBelow()) blockPosition += width
          break
        default:
          console.log('invalid key do nothing')
      }
      addZBlock(blockPosition)
    } else {
      console.log('it works')
    }
  } else if (isL) {
    removeLBlock(blockPosition)
    if (y < height - 1) {
      switch (event.keyCode) {
        case 39:
          if (x < width - 2 && !lCheckIfBlockRight()) blockPosition++
          break
        case 37:
          if (x >= 1 && !lCheckIfBlockLeft()) blockPosition--
          break
        case 38:
          if (y > 0) blockPosition -= width
          break
        case 40:
          if (y < width - 1 && !lCheckIfBlockBelow()) blockPosition += width
          break
        default:
          console.log('invalid key do nothing')
      }
      addLBlock(blockPosition)
    } else {
      console.log('it works')
    }
  } else if (isJ) {
    removeJBlock(blockPosition)
    if (y < height - 1) {
      switch (event.keyCode) {
        case 39:
          if (x < width - 1 && !jCheckIfBlockRight()) blockPosition++
          break
        case 37:
          if (x > 1 && !jCheckIfBlockLeft()) blockPosition--
          break
        case 38:
          if (y > 0) blockPosition -= width
          break
        case 40:
          if (y < width - 1 && !jCheckIfBlockBelow()) blockPosition += width
          break
        default:
          console.log('invalid key do nothing')
      }
      addJBlock(blockPosition)
    } else {
      console.log('it works')
    }
  }
}

//////!     SQUARE BLOCK   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function squareCheckIfBlockBelow() {
  return filledCells.some(num => {
    if (num === blockPosition + width || num === blockPosition + width - 1) {
      return num
    }
  })
}

function squareCheckIfBlockRight() {
  return filledCells.some(num => {
    if (num === blockPosition + 1 || num === blockPosition - width + 1) {
      return num
    }
  })
}

function squareCheckIfBlockLeft() {
  return filledCells.some(num => {
    if (num === blockPosition - 2 || num === blockPosition - width - 2) {
      return num
    }
  })
}

function addSquareBlock(position) {
  cells[position].classList.add('block')
  cells[position - 1].classList.add('block')
  cells[position - width - 1].classList.add('block')
  cells[position - width].classList.add('block')
}

function removeSquareBlock(position) {
  cells[position].classList.remove('block')
  cells[position - 1].classList.remove('block')
  cells[position - width - 1].classList.remove('block')
  cells[position - width].classList.remove('block')
}

function addSquareFilledCells() {
  filledCells.push(blockPosition)
  filledCells.push(blockPosition - 1)
  filledCells.push(blockPosition - width - 1)
  filledCells.push(blockPosition - width)
}

function fallingSquareBlock() {
  isSquare = true
  blockPosition = 15
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeSquareBlock(blockPosition - width)
    addSquareBlock(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (checkIfGameOver()) {
      console.log('GAME OVER')
      return gameOver()
    } else if (y === height - 1 || squareCheckIfBlockBelow()) {
      clearInterval(intervalId)
      addSquareFilledCells()
      isSquare = false
      // fullRowCheck(filledCells)
      return tetris()
    }
  }, 1000)
}

//////!  LINE BLOCK  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function lineCheckIfBlockBelow() {
  return filledCells.some(num => {
    if (num === (blockPosition + (width * 3))) {
      return num
    }
  })
}

function lineCheckIfBlockRight() {
  return filledCells.some(num => {
    if (num === blockPosition + 1 || num === blockPosition - width + 1 || num === blockPosition + width + 1 || num === blockPosition + (width * 2) + 1 || num === blockPosition + (width * 3) + 1) {
      return num
    }
  })
}

function lineCheckIfBlockLeft() {
  return filledCells.some(num => {
    if (num === blockPosition - 1 || num === blockPosition - width - 1 || num === blockPosition + width - 1 || num === blockPosition + (width * 2) - 1 || num === blockPosition + (width * 3) - 1) {
      return num
    }
  })
}

function addLineBlock(position) {
  cells[position].classList.add('block')
  cells[position - width].classList.add('block')
  cells[position + width].classList.add('block')
  cells[position + width + width].classList.add('block')
}

function removeLineBlock(position) {
  cells[position].classList.remove('block')
  cells[position - width].classList.remove('block')
  cells[position + width].classList.remove('block')
  cells[position + width + width].classList.remove('block')
}

function addLineFilledCells() {
  filledCells.push(blockPosition)
  filledCells.push(blockPosition - width)
  filledCells.push(blockPosition + width)
  filledCells.push(blockPosition + width + width)
}

function fallingLineBlock() {
  isLine = true
  blockPosition = 15
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeLineBlock(blockPosition - width)
    addLineBlock(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (checkIfGameOver()) {
      console.log('GAME OVER')
      return gameOver()
    } else if (y === height - 3 || lineCheckIfBlockBelow()) {
      clearInterval(intervalId)
      addLineFilledCells()
      isLine = false
      return tetris()
    }
  }, 1000)
}

//! T BLOCK  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function tCheckIfBlockBelow() {
  return filledCells.some(num => {
    if (num === blockPosition + width || num === blockPosition - 1 || num === blockPosition + 1) {
      return num
    }
  })
}

function tCheckIfBlockRight() {
  return filledCells.some(num => {
    if (num === blockPosition + 1 || num === blockPosition - width + 2) {
      return num
    }
  })
}

function tCheckIfBlockLeft() {
  return filledCells.some(num => {
    if (num === blockPosition - 1 || num === blockPosition - width - 2) {
      return num
    }
  })
}

function addTBlock(position) {
  cells[position].classList.add('block')
  cells[position - width].classList.add('block')
  cells[position - width - 1].classList.add('block')
  cells[position - width + 1].classList.add('block')
}

function removeTBlock(position) {
  cells[position].classList.remove('block')
  cells[position - width].classList.remove('block')
  cells[position - width - 1].classList.remove('block')
  cells[position - width + 1].classList.remove('block')
}

function addTFilledCells() {
  filledCells.push(blockPosition)
  filledCells.push(blockPosition - width)
  filledCells.push(blockPosition - width - 1)
  filledCells.push(blockPosition - width + 1)
}

function fallingTBlock() {
  isT = true
  blockPosition = 15
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeTBlock(blockPosition - width)
    addTBlock(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (checkIfGameOver()) {
      console.log('GAME OVER')
      return gameOver()
    } else if (y === height - 1 || tCheckIfBlockBelow()) {
      clearInterval(intervalId)
      addTFilledCells()
      isT = false
      // fullRowCheck(filledCells)
      return tetris()
    }
  }, 1000)
}


//! S BLOCK  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sCheckIfBlockBelow() {
  return filledCells.some(num => {
    if (num === blockPosition + width || num === blockPosition + width - 1 || num === blockPosition + 1) {
      return num
    }
  })
}

function sCheckIfBlockRight() {
  return filledCells.some(num => {
    if (num === blockPosition + 1 || num === blockPosition - width + 2) {
      return num
    }
  })
}

function sCheckIfBlockLeft() {
  return filledCells.some(num => {
    if (num === blockPosition - 2 || num === blockPosition - width - 1) {
      return num
    }
  })
}

function addSBlock(position) {
  cells[position].classList.add('block')
  cells[position - 1].classList.add('block')
  cells[position - width].classList.add('block')
  cells[position - width + 1].classList.add('block')
}

function removeSBlock(position) {
  cells[position].classList.remove('block')
  cells[position - 1].classList.remove('block')
  cells[position - width].classList.remove('block')
  cells[position - width + 1].classList.remove('block')
}

function addSFilledCells() {
  filledCells.push(blockPosition)
  filledCells.push(blockPosition - 1)
  filledCells.push(blockPosition - width)
  filledCells.push(blockPosition - width + 1)
}

function fallingSBlock() {
  isS = true
  blockPosition = 15
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeSBlock(blockPosition - width)
    addSBlock(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (checkIfGameOver()) {
      console.log('GAME OVER')
      return gameOver()
    } else if (y === height - 1 || sCheckIfBlockBelow()) {
      clearInterval(intervalId)
      addSFilledCells()
      isS = false
      // fullRowCheck(filledCells)
      return tetris()
    }
  }, 1000)
}


//! Z BLOCK  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function zCheckIfBlockBelow() {
  return filledCells.some(num => {
    if (num === blockPosition + width || num === blockPosition + width + 1 || num === blockPosition - 1) {
      return num
    }
  })
}

function zCheckIfBlockRight() {
  return filledCells.some(num => {
    if (num === blockPosition + 2 || num === blockPosition - width + 1) {
      return num
    }
  })
}

function zCheckIfBlockLeft() {
  return filledCells.some(num => {
    if (num === blockPosition - 1 || num === blockPosition - width - 2) {
      return num
    }
  })
}

function addZBlock(position) {
  cells[position].classList.add('block')
  cells[position + 1].classList.add('block')
  cells[position - width].classList.add('block')
  cells[position - width - 1].classList.add('block')
}

function removeZBlock(position) {
  cells[position].classList.remove('block')
  cells[position + 1].classList.remove('block')
  cells[position - width].classList.remove('block')
  cells[position - width - 1].classList.remove('block')
}

function addZFilledCells() {
  filledCells.push(blockPosition)
  filledCells.push(blockPosition + 1)
  filledCells.push(blockPosition - width)
  filledCells.push(blockPosition - width - 1)
}

function fallingZBlock() {
  isZ = true
  blockPosition = 15
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeZBlock(blockPosition - width)
    addZBlock(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (checkIfGameOver()) {
      console.log('GAME OVER')
      return gameOver()
    } else if (y === height - 1 || zCheckIfBlockBelow()) {
      clearInterval(intervalId)
      addZFilledCells()
      isZ = false
      // fullRowCheck(filledCells)
      return tetris()
    }
  }, 1000)
}


//! L BLOCK  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function lCheckIfBlockBelow() {
  return filledCells.some(num => {
    if (num === blockPosition + width + width || num === blockPosition + width + width + 1) {
      return num
    }
  })
}

function lCheckIfBlockRight() {
  return filledCells.some(num => {
    if (num === blockPosition + 1 || num === blockPosition - width + 1 || num === blockPosition + width + 2) {
      return num
    }
  })
}

function lCheckIfBlockLeft() {
  return filledCells.some(num => {
    if (num === blockPosition - 1 || num === blockPosition - width - 1 || num === blockPosition + width - 1) {
      return num
    }
  })
}

function addLBlock(position) {
  cells[position].classList.add('block')
  cells[position - width].classList.add('block')
  cells[position + width].classList.add('block')
  cells[position + width + 1].classList.add('block')
}

function removeLBlock(position) {
  cells[position].classList.remove('block')
  cells[position - width].classList.remove('block')
  cells[position + width].classList.remove('block')
  cells[position + width + 1].classList.remove('block')
}

function addLFilledCells() {
  filledCells.push(blockPosition)
  filledCells.push(blockPosition - width)
  filledCells.push(blockPosition + width)
  filledCells.push(blockPosition + width + 1)
}

function fallingLBlock() {
  isL = true
  blockPosition = 15
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeLBlock(blockPosition - width)
    addLBlock(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (checkIfGameOver()) {
      console.log('GAME OVER')
      return gameOver()
    } else if (y === height - 2 || lCheckIfBlockBelow()) {
      clearInterval(intervalId)
      addLFilledCells()
      isL = false
      // fullRowCheck(filledCells)
      return tetris()
    }
  }, 1000)
}


//! L BLOCK  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function jCheckIfBlockBelow() {
  return filledCells.some(num => {
    if (num === blockPosition + width + width || num === blockPosition + width + width - 1) {
      return num
    }
  })
}

function jCheckIfBlockRight() {
  return filledCells.some(num => {
    if (num === blockPosition + 1 || num === blockPosition - width + 1 || num === blockPosition + width + 1) {
      return num
    }
  })
}

function jCheckIfBlockLeft() {
  return filledCells.some(num => {
    if (num === blockPosition - 1 || num === blockPosition - width - 1 || num === blockPosition + width - 2) {
      return num
    }
  })
}

function addJBlock(position) {
  cells[position].classList.add('block')
  cells[position - width].classList.add('block')
  cells[position + width].classList.add('block')
  cells[position + width - 1].classList.add('block')
}

function removeJBlock(position) {
  cells[position].classList.remove('block')
  cells[position - width].classList.remove('block')
  cells[position + width].classList.remove('block')
  cells[position + width - 1].classList.remove('block')
}

function addJFilledCells() {
  filledCells.push(blockPosition)
  filledCells.push(blockPosition - width)
  filledCells.push(blockPosition + width)
  filledCells.push(blockPosition + width - 1)
}

function fallingJBlock() {
  isJ = true
  blockPosition = 15
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeJBlock(blockPosition - width)
    addJBlock(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (checkIfGameOver()) {
      console.log('GAME OVER')
      return gameOver()
    } else if (y === height - 2 || jCheckIfBlockBelow()) {
      clearInterval(intervalId)
      addJFilledCells()
      isJ = false
      // fullRowCheck(filledCells)
      return tetris()
    }
  }, 1000)
}



//! TEST BLOCK  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//! FUNCTION FOR FULL CHECKING FULL ROW WORKED FOR HEIGHT OF 10 WILL NOT WORK FOR HEIGHT > 10 /////////////////////////////////////////////////////////////////////

// function fullRowsCheck(arrToCheck) {
//   const getFirstDigit = arrToCheck.map(num => {
//     const str = String(num)
//     return parseInt(str[0])
//   })
//   const objOfFirstDigits = getFirstDigit.reduce((obj, item) => {
//     if (!obj[item]) {
//       obj[item] = 0
//     }
//     obj[item]++
//     return obj
//   }, {})
//   let arrOfObject = Object.entries(objOfFirstDigits)
//   const rowFilled = arrOfObject.filter(item => {
//     if (item[1] === 10) {
//       return item
//     }
//   })
//   console.log(arrOfObject)
//   if (rowFilled.length > 0) {
//     const numOfRowFilled = rowFilled.map(item => {
//       return item[0]
//     })
//     const arrOfRowFilled = []
//     for (let i = 0; i < numOfRowFilled.length; i++) {
//       for (let j = 0; j < width; j++) {
//         arrOfRowFilled.push((numOfRowFilled[i] * 10) + j)
//         for (let index = 0; index < arrOfRowFilled.length; index++) {
//           removeBlock(arrOfRowFilled[index])
//           filledCells = filledCells.filter(item => {
//             if (item !== arrOfRowFilled[index]) {
//               return item
//             }
//           })
//         }
//       }
//       //? Output from above is filled cells of any cells above the emptied rows
//       //!TRYING TO PUSH DOWN CELLS THAT NOW DON'T HAVE BLOCKS BELOW THEM (if square blocks returns botom)
//       //! REFECTOR CODE
//     }
//     filledCells = filledCells.map(item => {
//       if (!indivDiv[item + width + width].classList.contains('block')) {
//         addBlock(item + width + width)
//         removeBlock(item)
//         return item + width + width
//       } else if (!indivDiv[item + width].classList.contains('block')) {
//         addBlock(item + width)
//         removeBlock(item)
//         return item + width
//       } else {
//         return item
//       }
//     })
//   } else {
//     return filledCells
//   }
// }




//! EVENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

resetGame.addEventListener('click', handleResetGameClick)
window.addEventListener('keyup', handleKeyUp)
