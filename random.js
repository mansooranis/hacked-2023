const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomString() {
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

console.log(randomString());