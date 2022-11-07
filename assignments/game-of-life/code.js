

//if the sum of all nine fields in a given neighbourhood is three, 
//the inner field state for the next generation will be life; if the all-field sum is four, 
//the inner field retains its current state; and every other sum sets the inner field to death.



//idea
//create 2d array that stores data for all cells, size of array based off how many cells 
//can be fit on screen
//size of cells will be changeable

//convert 2d array pos to screen pos: (width/sizeOfCell*arX), (height/sizeOfCell*arY)

//need to get all neighbors of a certain cell, maybe func?

//change state to 0 if dead or 1 if alive

//animate each state

//speed var?


const pixSizeFactor = 10

const declareAr = (pixSizeFactor) => {
  const array = []
  for (let y = 0; y < height / pixSizeFactor; y++) {
    array.push([])
    for (let x = 0; x < width / pixSizeFactor; x++) {
      array[y].push([0])
    }
  }
  return array
}

const randomPopulate = (percent, screenAr) => {
  for (let y = 0; y < screenAr.length; y++) {
    for (let x = 0; x < screenAr[0].length; x++) {
      if (Math.random() <= percent) {
        screenAr[y][x] = 1
      }
    }
  }
}

const display = (screenAr) =>{
  const widthPix = pixSizeFactor;
  const heightPix = pixSizeFactor;
  for (let y = 0; y < screenAr.length; y++) {
    for (let x = 0; x < screenAr[0].length; x++) {
      if(screenAr[y][x]===1){
        drawFilledRect(x*pixSizeFactor, y*pixSizeFactor, widthPix, heightPix, 'black')
      }
    }
  }
}

const screenAr = declareAr(pixSizeFactor)
randomPopulate(0.8, screenAr)
display(screenAr)

