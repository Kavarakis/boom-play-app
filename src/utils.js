export const emojiCodes = {
  boom: String.fromCodePoint(0x1f4a5),
  cyclone: String.fromCodePoint(0x1f300),
  smiley: String.fromCodePoint(0x1f600),
};

export function randomProperty(o) {
  let keys = Object.keys(o);
  return o[keys[(keys.length * Math.random()) << 0]];
}

export function shuffleCards(arr) {
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
