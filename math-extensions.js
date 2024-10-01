// Helpful Math Functions

function randomDec(start, end){
  let rand = Math.random()*(end - start) + start;
  return rand;
}

function randomInt(start, end){
  return Math.round(randomDec(start,end));
}