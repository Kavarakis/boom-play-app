export const emojiCodes = {
  boom: String.fromCodePoint(0x1f4a5),
  cyclone: String.fromCodePoint(0x1f300),
  smiley: String.fromCodePoint(0x1f600),
  default: String.fromCodePoint(0x2757),
};

/**
 *  Function for retrieving positions of emojis in array
 *  Retrieves positions for Smiley and Boom Emojis
 * @param {Array} arr - array of emojis
 * @returns {Object} - {smiley:[],boom:[]}
 */
export function getPositionForEmoji(arr) {
  let smileyPos = [];
  let boomPos = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];

    if (element == emojiCodes.boom) {
      boomPos.push(index);
    }
    if (element == emojiCodes.smiley) {
      smileyPos.push(index);
    }
  }
  return { smiley: smileyPos, boom: boomPos };
}
/**
 * Function for randomized shuffle of Array
 * @param {Array} arr
 * @returns {Array} arr
 */
export function shuffleArray(arr) {
  const length = arr.length;

  for (let i = length; i > 0; i--) {
    let rI = Math.floor(Math.random() * i);
    let cI = i - 1;
    const temp = arr[cI];
    arr[cI] = arr[rI];
    arr[rI] = temp;
  }
  return arr;
}
/**
 *  Function for converting 1d index to matrix coordinates
 * @param {number} i - index of 1d Array
 * @param {number} w - square matrix width (e.g. 4 -> 4x4)
 * @returns {Object} {x,y}
 */
function getCoordinatesFrom1dArray(i, w) {
  return {
    x: Math.floor(i / w),
    y: i % w,
  };
}

/**
 * Function for neighbour indices of matrix.
 * Converts 1d array index to matrix notation and calculates neighbours indices.
 * @param {number} index - index of 1d Array
 * @param {number} width - square matrix width (e.g. 4 -> 4x4)
 * @returns {Array} - Neighbours in 1d array indices
 */
export function getIndicesOfNeighbours(index, width) {
  let { x, y } = getCoordinatesFrom1dArray(index, width);

  let res = [];
  //north
  if (x - 1 >= 0) {
    res.push({ x: x - 1, y });
  }
  //south
  if (x + 1 < width) {
    res.push({ x: x + 1, y });
  }
  //east
  if (y - 1 >= 0) {
    res.push({ x, y: y - 1 });
  }
  //west
  if (y + 1 < width) {
    res.push({ x, y: y + 1 });
  }
  //north-west
  if (y + 1 < width && x - 1 >= 0) {
    res.push({ x: x - 1, y: y + 1 });
  }
  //north-east
  if (y - 1 >= 0 && x - 1 >= 0) {
    res.push({ x: x - 1, y: y - 1 });
  }
  //south-west
  if (y + 1 < width && x + 1 < width) {
    res.push({ x: x + 1, y: y + 1 });
  }
  //south-east
  if (y - 1 >= 0 && x + 1 < width) {
    res.push({ x: x + 1, y: y - 1 });
  }

  return res.map((o) => o.x * width + o.y);
}
