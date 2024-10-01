// Line Analyzer

// Add Event Listener
document.getElementById("analyze").addEventListener("click", analyzeLine);

// Event Function
function analyzeLine() {
  // Get Inputted Point Data (pt1x, pt1y) and (pt2x, pt2y)
  let pt1x = Number(document.getElementById("pt1x").value);
  let pt1y = Number(document.getElementById("pt1y").value);
  let pt2x = Number(document.getElementById("pt2x").value);
  let pt2y = Number(document.getElementById("pt2y").value);

  let length = getLength(pt1x, pt1y, pt2x, pt2y);
  let slope = getSlope(pt1x, pt1y, pt2x, pt2y);
  let description = getDescription(slope);
  let locationP1 = getPointLocation(pt1x, pt1y);
  let locationP2 = getPointLocation(pt2x, pt2y);

  // Call Analyze Functions and Display results
  document.getElementById("length").innerHTML = length;
  document.getElementById("slope").innerHTML = slope;
  document.getElementById("description").innerHTML = description;

  document.getElementById("location-1").innerHTML = locationP1;
  document.getElementById("location-2").innerHTML = locationP2;
  document.getElementById("equation").innerHTML = getEquation(
    pt1x,
    pt1y,
    pt2x,
    pt2y
  );
  document.getElementById("slope-point").innerHTML = getSlopePointForm(
    pt1x,
    pt1y,
    pt2x,
    pt2y
  );
}

// Line Analyzer Functions
// length
function getLength(x1, y1, x2, y2) {
  let l = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  return l.toFixed(2);
}

// slope
function getSlope(x1, y1, x2, y2) {
  if (x2 - x1 === 0) {
    return "slope is undefined";
  }
  let slope = (y2 - y1) / (x2 - x1);
  return slope.toFixed(2);
}

// description
function getDescription(elSlope) {
  if (elSlope === "slope is undefined") {
    return "there is no direction of the slope, 'cause it's undefined";
  } else if (elSlope > 0) {
    return "increasing";
  } else if (elSlope < 0) {
    return "decreasing";
  } else {
    return "horizontal";
  }
}

// point location
function getPointLocation(x, y) {
  if (x > 0 && y > 0) {
    return "quadrant 1";
  } else if (x < 0 && y > 0) {
    return "quadrant 2";
  } else if (x < 0 && y < 0) {
    return "quadrant 3";
  } else if (x > 0 && y < 0) {
    return "quadrant 4";
  } else if (x === 0 && y !== 0) {
    return "y-axis";
  } else if (y === 0 && x !== 0) {
    return "x-axis";
  } else {
    return "origin";
  }
}

// Coef b
function coefB(x, y, elSlope) {
  if (elSlope === "slope is undefined") return 0; 
  return y - x * elSlope;
}

// Get the equation in slope-intercept form
function getEquation(x1, y1, x2, y2) {
  let k = getSlope(x1, y1, x2, y2);
  if (k === "slope is undefined") {
    return "x = " + x1; // For vertical lines
  }

  let b = coefB(x1, y1, k);

  if (b < 0) {
    b = Math.abs(b); // absolute value for positive display
    return `y = ${k}x - ${b}`;
  } else if (b === 0) {
    return `y = ${k}x`;
  }
  return `y = ${k}x + ${b}`;
}

// Get the equation in slope-point form
function getSlopePointForm(x1, y1, x2, y2) {
  let k = getSlope(x1, y1, x2, y2);
  // k = Math.abs(k);
  if (k === "slope is undefined") {
    return "x = " + x1; // vertical lines
  } else if (k === 0) {
    return `y - ${y1} = 0`;
  }
  if (y1 === 0) return `y = ${k}(x - ${x1})`;
  else if (y1 < 0) {
    y1 = y1 * -1;
    return `y + ${y1} = ${k}(x - ${x1})`;
  }

  if (x1 === 0) return `y - ${y1} = ${k}x`;
  else if (x1 < 0) {
    x1 = x1 * -1;
    return `y - ${y1} = ${k}(x + ${x1})`;
  } else if (y1 === 0 && x1 === 0) return `y = ${k}x`;

  return `y - ${y1} = ${k}(x - ${x1})`;
}
