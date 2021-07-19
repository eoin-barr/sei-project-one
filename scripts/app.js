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

let musicClick = 0

function handleMusicClick() {
  musicClick += 1
  console.log(musicClick)
  if (musicClick % 2 === 0) {
    musicBtn.innerHTML = 'Music Off &#128264;'
    music.src = ''
  } else {
    musicBtn.innerHTML = 'Music On &#128264;'
    music.src = './sounds/tetris_theme_a.mp3'
    music.play()
  }
}

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
  // return Math.floor(Math.random() * 7)
  return 2
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

  fullRowCheck()
  console.log(filledCells)
}

//! CHECKS FOR FULL ROW, REMOVES AND MOVES ABOVE BLOCKS DOWN ///////////////////////////////////////////////////////////////////////////////////////////////////////

function fullRowCheck() {
  const sortedArr = filledCells.sort((a, b) => {
    return a - b
  })
  let finalArr = []
  let newRowCheckArr = []
  for (let i = 0; i < sortedArr.length; i++) {
    if (sortedArr[i] % width === 0 && ((sortedArr[i] + (width - 1)) === (sortedArr[i + (width - 1)]))) {
      newRowCheckArr.push(sortedArr[i])
    }
  } if (newRowCheckArr.length < 0) {
    console.log('hopefully this is not printed')
  } else {
    score += (1000 * newRowCheckArr.length)
    scoreDisplay.textContent = score
    for (let i = 0; i < newRowCheckArr.length; i++) {
      for (let j = 0; j < width; j++) {
        finalArr.push(newRowCheckArr[i] + j)
      }
    }
    finalArr.forEach(item => removeBlock(item))
    const removeFullRows = sortedArr.filter(item => {
      return !finalArr.includes(item)
    })
    filledCells = removeFullRows.map(item => {
      if (item < newRowCheckArr[0]) {
        removeBlock(item)
        return item + (width * newRowCheckArr.length)
      } else {
        return item
      }
    })
    filledCells.forEach(item => addBlock(item))
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
          if (y > 0) console.log('rotated')
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
          if (y > 0) return fallingTRot90Block()
          break
        case 40:
          if (y < width - 2 && !tCheckIfBlockBelow()) blockPosition += width
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
  } else if (isTRot90) {
    removeTRot90Block(blockPosition)
    if (y < height - 2) {
      switch (event.keyCode) {
        case 39:
          if (x < width - 2 && !tRot90CheckIfBlockRight()) blockPosition++
          break
        case 37:
          if (x >= 1 && !tRot90CheckIfBlockLeft()) blockPosition--
          break
        case 38:
          if (y > 0) blockPosition -= width
          break
        case 40:
          if (y < width - 2 && !tRot90CheckIfBlockBelow()) blockPosition += width
          break
        default:
          console.log('invalid key do nothing')
      }
      addTRot90Block(blockPosition)
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
    if (num === blockPosition + width + width || num === blockPosition + width - 1 || num === blockPosition + width + 1) {
      return num
    }
  })
}

function tCheckIfBlockRight() {
  return filledCells.some(num => {
    if (num === blockPosition + 2 || num === blockPosition + width + 1) {
      return num
    }
  })
}

function tCheckIfBlockLeft() {
  return filledCells.some(num => {
    if (num === blockPosition - 2 || num === blockPosition + width - 1) {
      return num
    }
  })
}

function addTBlock(position) {
  cells[position].classList.add('block')
  cells[position - 1].classList.add('block')
  cells[position + 1].classList.add('block')
  cells[position + width].classList.add('block')
}

function removeTBlock(position) {
  cells[position].classList.remove('block')
  cells[position - 1].classList.remove('block')
  cells[position + 1].classList.remove('block')
  cells[position + width].classList.remove('block')
}

function addTFilledCells() {
  filledCells.push(blockPosition)
  filledCells.push(blockPosition - 1)
  filledCells.push(blockPosition + 1)
  filledCells.push(blockPosition + width)
}

function fallingTBlock() {
  isT = true
  blockPosition = 15
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeTBlock(blockPosition - width)
    addTBlock(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (isTRot90) {
      console.log('TRotators')
      clearInterval(intervalId)

      // addTRot90Block(blockPosition)
      removeTBlock(blockPosition)
    } else if (checkIfGameOver()) {
      console.log('GAME OVER')
      return gameOver()
    } else if (y === height - 2 || tCheckIfBlockBelow()) {
      clearInterval(intervalId)
      addTFilledCells()
      isT = false
      // fullRowCheck(filledCells)
      return tetris()
    }
  }, 1000)
}

//! T ROTATE 90 BLOCK  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let isTRot90 = false

function tRot90CheckIfBlockBelow() {
  return filledCells.some(num => {
    if (num === blockPosition + width + width || num === blockPosition + width + 1) {
      return num
    }
  })
}

function tRot90CheckIfBlockRight() {
  return filledCells.some(num => {
    if (num === blockPosition + width + width || num === blockPosition - width + 1 || num === blockPosition + width + 1) {
      return num
    }
  })
}

function tRot90CheckIfBlockLeft() {
  return filledCells.some(num => {
    if (num === blockPosition - 1 || num === blockPosition - width - 1 || num === blockPosition + width - 1) {
      return num
    }
  })
}

function addTRot90Block(position) {
  cells[position].classList.add('block')
  cells[position - width].classList.add('block')
  cells[position + width].classList.add('block')
  cells[position + 1].classList.add('block')
}

function removeTRot90Block(position) {
  cells[position].classList.remove('block')
  cells[position - width].classList.remove('block')
  cells[position + width].classList.remove('block')
  cells[position + 1].classList.remove('block')
}

function addTRot90FilledCells() {
  filledCells.push(blockPosition)
  filledCells.push(blockPosition - width)
  filledCells.push(blockPosition + width)
  filledCells.push(blockPosition + 1)
}

function fallingTRot90Block() {
  isT = false
  isTRot90 = true
  console.log(blockPosition)
  addTRot90Block(blockPosition)

  // isT = true
  // blockPosition = 15
  const intervalId = setInterval(() => {
    blockPosition = blockPosition + width
    removeTRot90Block(blockPosition - width)
    addTRot90Block(blockPosition)
    const y = Math.floor(blockPosition / width)
    if (checkIfGameOver()) {
      console.log('GAME OVER')
      return gameOver()
    } else if (y === height - 2 || tRot90CheckIfBlockBelow()) {
      clearInterval(intervalId)
      addTRot90FilledCells()
      isTRot90 = false
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


//! EVENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

resetGame.addEventListener('click', handleResetGameClick)
window.addEventListener('keyup', handleKeyUp)
musicBtn.addEventListener('click', handleMusicClick)

