let grid = []
let score = 0
let size = 4
let width = 800
let height = 640
let tileWidth = height / (size + 1)
let penSize = 2
let colors = [
  'red',
  'orange',
  'green',
  'yellow',
  'blue',
  'violet',
  'Chartreuse',
  'CadetBlue',
  'Coral',
  'Cyan',
  'Crimson',
  'DarkOrchid',
  'Khaki',
  'SeaGreen',
  'Thistle',
  'Wheat',
  'RoyalBlue',
  'Magenta',
  'purple',
  'red',
  'orange',
  'green',
  'yellow',
  'blue',
  'violet',
  'Chartreuse',
  'CadetBlue',
  'Coral',
  'Cyan',
  'Crimson',
  'DarkOrchid',
  'Khaki',
  'SeaGreen',
  'Thistle',
  'Wheat',
  'RoyalBlue',
  'Magenta',
  'purple'
]
/* eslint-disable no-unused-vars */
function setup () {
  /* eslint-enable no-unused-vars */
  createCanvas(width, height)
  setupGrid()
  addNumber()
  addNumber()
  addNumber()
  addNumber()
  addNumber()
}

/* eslint-disable no-unused-vars */
function draw () {
  /* eslint-enable no-unused-vars */
  createCanvas(width, height)
  background(255)
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let x = i * tileWidth
      let y = j * tileWidth

      let value = grid[i][j]
      if (value != null && value !== 0) {
        let color = Math.log2(value)
        fill(colors[color])
        rect(x, y, tileWidth, tileWidth)
        textAlign(CENTER, CENTER)
        fill(0)
        strokeWeight(penSize)
        stroke(0)
        textSize(tileWidth / String(value).length)
        text(value, x, y, tileWidth, tileWidth)
      } else {
        noFill()
        strokeWeight(penSize)
        stroke(0)
        rect(x, y, tileWidth, tileWidth)
      }
    }
  }
  textSize(tileWidth / 2)
  fill(0)
  textAlign(CENTER, CENTER)
  text(
    'Score : '.concat(score),
    0,
    size * tileWidth,
    size * tileWidth,
    tileWidth
  )
}

// get blank tiles
function getBlank () {
  let blanks = []
  for (var i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === 0) {
        blanks.push({
          x: i,
          y: j
        })
      }
    }
  }
  return blanks
}

/* eslint-disable no-unused-vars */
function keyPressed () {
  /* eslint-enable no-unused-vars */
  if (key === 'W') {
    for (let i = 0; i < size; i++) {
      grid[i] = slide(grid[i])
    }
    addNumber()
  }

  if (key === 'S') {
    for (let i = 0; i < size; i++) {
      grid[i] = slide(grid[i], false)
    }
    addNumber()
  }

  if (key === 'A') {
    for (let i = 0; i < size; i++) {
      let newColumn = slide(getColumn(grid, i))
      grid = setColumn(grid, newColumn, i)
    }
    addNumber()
  }

  if (key === 'D') {
    for (let i = 0; i < size; i++) {
      let newColumn = slide(getColumn(grid, i), false)
      grid = setColumn(grid, newColumn, i)
    }
    addNumber()
  }
}

// sile a row or column
function slide (row, left = true) {
  let s = row.reduce((a, b) => a + b)
  // skip the 0 tiles
  let values = row.filter(value => value !== 0)
  // combine
  values = combine(values, left)
  // skip the 0 tiles
  values = values.filter(value => value !== 0)
  // number of the 0 tiles
  let blanks = size - values.length
  let zeros = Array(blanks).fill(0)
  let s2 = 0
  // just debug
  try {
    s2 = values.reduce((a, b) => a + b)
  } catch (e) {}
  if (s !== s2) {
    print(s, s2)
    print(row)
    print(values)
  }
  // insert the zeros in the left or right
  if (left) {
    return values.concat(zeros)
  }
  return zeros.concat(values)
}

function combine (array, left = true) {
  let i = 0
  // combine to the left the reverse the array
  if (!left) {
    array.reverse()
  }
  while (i < array.length - 1) {
    // two tile with the same value
    if (array[i] !== 0 && array[i] === array[i + 1]) {
      // add score
      score += array[i]

      // combine
      array[i] *= 2

      // push the other element forward
      if (i !== array.length - 1) {
        let j = i + 1
        while (j < array.length - 1) {
          array[j] = array[j + 1]
          j += 1
        }
        array[array.length - 1] = 0
        // combine only one pair at a time
        break
      }

      // recheck
      if (i !== 0) {
        i -= 1
      }
    } else {
      // next
      i += 1
    }
  }

  // reverse back
  if (!left) {
    array.reverse()
  }
  return array
}

// add a value to a random blank tile
function addNumber () {
  let blanks = getBlank()
  let tile = random(blanks)
  if (tile === undefined) {
    return
  }
  grid[tile.x][tile.y] = random([2, 4])
}

// get a column out of a array
function getColumn (anArray, columnNumber) {
  return anArray.map(function (row) {
    return row[columnNumber]
  })
}

// set a column of an array
function setColumn (anArray, newColumn, columnNumber) {
  for (let i = 0; i < anArray.length; i++) {
    anArray[i][columnNumber] = newColumn[i]
  }
  return anArray
}

// create the grid
function setupGrid () {
  for (let i = 0; i < size; i++) {
    let row = []
    for (let j = 0; j < size; j++) {
      row.push(0)
    }
    grid.push(row)
  }
}
