input2 =  "357, 59\n" + 
"312, 283\n" + 
"130, 47\n" + 
"89, 87\n" + 
"87, 58\n" + 
"158, 169\n" + 
"182, 183\n" + 
"300, 318\n" + 
"82, 257\n" + 
"200, 194\n" + 
"71, 259\n" + 
"112, 67\n" + 
"82, 163\n" + 
"107, 302\n" + 
"58, 194\n" + 
"40, 88\n" + 
"288, 339\n" + 
"64, 245\n" + 
"243, 302\n" + 
"41, 43\n" + 
"147, 276\n" + 
"143, 116\n" + 
"103, 178\n" + 
"262, 226\n" + 
"253, 157\n" + 
"313, 71\n" + 
"202, 236\n" + 
"353, 192\n" + 
"96, 74\n" + 
"167, 50\n" + 
"125, 132\n" + 
"90, 315\n" + 
"174, 232\n" + 
"185, 237\n" + 
"126, 134\n" + 
"152, 191\n" + 
"104, 315\n" + 
"283, 90\n" + 
"95, 193\n" + 
"252, 286\n" + 
"48, 166\n" + 
"69, 75\n" + 
"48, 349\n" + 
"59, 124\n" + 
"334, 95\n" + 
"263, 134\n" + 
"50, 314\n" + 
"196, 66\n" + 
"342, 221\n" + 
"60, 217\n"

function numbers(str) {
  return (str.match(/-?[0-9]+/g) || []).map(Number);
}
function inc(table, key, amt = 1) {
  table[key] = (table[key] || 0) + amt;
}
function sortBy(array, criterion = a => a) {
  return array.sort((a, b) => {
    const aBy = criterion(a);
    const bBy = criterion(b);
    if (aBy == bBy) return 0;
    return (aBy > bBy ? 1 : -1);
  });
}

function dist(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
function pointId([a, b]) {
  return `${a},${b}`;
}

input = input2.split('\n').map(r => numbers(r));

let closest = {};

for (let i = -400; i < 800; i++) {
  for (let j = -400; j < 800; j++) {
    let curPoint = [i, j];
    let distances = [];
    for (const point of input) {
      distances.push([pointId(point), dist(point, curPoint)]);
    }
    sortBy(distances, a => a[1]);
    if (distances[0][1] === distances[1][1]) continue;
    inc(closest, distances[0][0]);
  }
}

let closest2 = {};
for (let i = -450; i < 850; i++) {
  for (let j = -450; j < 850; j++) {
    let curPoint = [i, j];
    let distances = [];
    for (const point of input) {
      distances.push([pointId(point), dist(point, curPoint)]);
    }
    sortBy(distances, a => a[1]);
    if (distances[0][1] === distances[1][1]) continue;
    inc(closest2, distances[0][0]);
  }
}

closest = sortBy(Object.entries(closest), en => en[1]);
closest2 = sortBy(Object.entries(closest2), en => en[1]);
for (let i = closest2.length - 1; i >= 0; i--) {
  if (closest[i][1] === closest2[i][1]) {
    console.log(closest[i][1]);
    break;
  }
}

