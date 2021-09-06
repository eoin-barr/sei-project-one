# SEI Project One: Tetris

## Goal:

To create a fully functioning browser-based game of your choice using vanilla JavaScript

**Timeframe:** 9 days

## Technologies Used
* HTML5 with HTML5 audio
* CSS3 wuth animation
* JavaScript (ES6)
* Git
* GitHub

## Tetris 

Out of the options we were given for this project, Tetris ranked as the highest in difficulty, which is why I decided that Tetris would be the best project to challenge my programming abilities.

### Play Deployed Version

https://eoin-barr.github.io/sei-project-one/

![tetris-gif](assets/tetris8.gif)

### Controls

* Click the Start Button to start the game
* Use the left and right arrow keys to move the Tetriminoes left and right, respectively
* Up arrow rotates the Tetrimino in play
* Down arrow key accelerates the Tetrimino's downward motion
* Click the Reset Game Button to restart the game while in play

## Development Process

### Day 1:

I spent the first day of the project plaaning and trying to break down the game into mangeable components. I created a list of features that I wanted the game to have, splitting them into MVP and "nice-to-haves". Knowing that this game was grid focussed, I spent a large portion of the day thinking and sudo-coding how an individual block would navigate throughout the grid.

### Day 2-4: 

During these days I implemented functionality so that a single block would fall down throught the grid, respect the grid boudaries and other blocks, as well as be able to move left, right and down. By the end of day 4 I esentially had a working game (without rotations) with single blocks.

### Day 5:

It was on this day that I realised that my approach of getting it to work for one block was the wrong one take as the code was very rigid and wold have to be duplicated and altered for each block. I decided it was best to overhaul my intial attemp and restart.
 

### Day 6: 

Despite only starting with a few lines of code, it was a very different experience from the first attempt. All the mistakes and learnings I had taken from the first iteration proved usefujl in the development of my second iteration. Another key difference this time was I was aware of placing the shapes of each tetrimino and its subsequent rotations in arrays, something which would greatly reduce the total amount of code needed to be written later on.


    const jBlock = [
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


### Day 7:
I made consistent progress and managed to complete the main `blockFall()` function which the central to the  project. 


    function blockFall() {
      if (checkForBottom() && !checkBlockBelow()) {
        removeBlock()
        currentCell += width
        generateBlock()
      } else if (checkIfGameOver()) {
          clearInterval(intervalId)
          gameOver()
          return
      } else {
          addToFilledCells()
          anotherBlock()
          fullRowCheck()
      }
    }

This function comprised of smaller functions that would dictate the progress of a tetrimino through the grid. I attempted to utilise pragmatic naming of functinos so that it was self evident the process each function was performing to reduce the need for comments.

### Day 8: 

On this day I improved upon the MVP by adding in the 'Up Next' block, the restart and reset game functionality and the level and scoring system.

<img src="https://res.cloudinary.com/dk0r9bcxy/image/upload/v1630914829/READMEs/up_next_tjmrqm.png" alt="rotation-guide" height="300px">

### Day 9:

This was the final day of the project. I spent most of the day refactoring code and renaming funcitons to make the code as readable as possible. I also completed the remaining styling of the project.

## Bugs

* I was unable to detect if the next block rotation would collide with the a wall or another block and so there are some instances where a block that should be able to rotate will be unable to do so.

## Challenges & Wins

* The biggest challenge and blocker for me was realizing that the blocks and their subsequent rotations should be contained within arrays. We were discouraged from reading any completed tutorial game code which ultimately led me to spend a large amount of time trying to figure out how to configure the tetriminoes.

* A big win for me in this project was my increased understanding of JavaScript. The challenge of building a game really took me out of my comfort zone and I am very happy with the end result.

## Future Content & Improvements

* Differing block fall speeds depending on the level
* The ability for players to switch between the current and next block
* More concise and DRY code in certain areas

## Key Learnings

* I have learned the need to do more code refactoring as I am working on the project. I made a conscious effort to write understandable and clean code, however, there are certainly section that could be improved upon.

* I also learned the importance of rigorous planning. My planning for this project was rushed and I made bad predictions which ultimately led me to restarting the project. Giong forward I will put more emphasis on the planning phase.

