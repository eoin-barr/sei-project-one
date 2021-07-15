//* DOM VARIABLES
const grid = document.querySelector('.grid')






//* GRID VARIABLES
const width = 10
const gridCellCount = width * width
const cells = []





//* GAMES VARIABLES







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





//* EVENTS