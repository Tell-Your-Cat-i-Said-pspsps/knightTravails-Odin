let board = [];
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    board.push([i, j]);
  }
}
let edges = [];
function possibleMoves(vertex) {
  let edges = [
    [vertex[0] + 2, vertex[1] + 1],
    [vertex[0] + 2, vertex[1] - 1],
    [vertex[0] - 2, vertex[1] + 1],
    [vertex[0] - 2, vertex[1] - 1],
    [vertex[0] + 1, vertex[1] + 2],
    [vertex[0] + 1, vertex[1] - 2],
    [vertex[0] - 1, vertex[1] + 2],
    [vertex[0] - 1, vertex[1] - 2],
  ];
  let possibleMove = edges.filter((elem) => {
    if (elem[0] >= 0 && elem[0] < 8 && elem[1] >= 0 && elem[1] < 8) {
      return true;
    }
  });
  let possibleMovesIndex = [];
  for (let i = 0; i < possibleMove.length; i++) {
    possibleMovesIndex.push(getIndex(possibleMove[i]));
  }
  return possibleMovesIndex;
}

for (let i = 0; i < board.length; i++) {
  let vertexEdges = possibleMoves(board[i]);
  edges.push(vertexEdges);
}

function getIndex(possition) {
  let index = board.findIndex((elem) => {
    if (elem[0] === possition[0] && elem[1] === possition[1]) {
      return true;
    }
  });
  return index;
}
function knightTravails(start, end) {
  let startIndex = getIndex(start);
  let endIndex = getIndex(end);
  if (startIndex == -1 || endIndex == -1) {
    return new Error("Not a possible Position");
  }
  let queue = [startIndex];
  let visited = new Array(64).fill(false);
  visited[startIndex] = true;
  let prev = new Array(64).fill(null);
  let found = false;
  while (queue.length > 0 && found == false) {
    let current = queue[0];
    let currentEdges = edges[current];
    let currentEdgesLength = currentEdges.length;
    for (let i = 0; i < currentEdgesLength; i++) {
      if (!visited[currentEdges[i]]) {
        queue.push(currentEdges[i]);
        visited[currentEdges[i]] = true;
        prev[currentEdges[i]] = current;
        if (currentEdges[i] == endIndex) {
          found = true;
        }
      }
    }
    queue.shift();
  }
  return reconstructePath(startIndex, endIndex, prev);
}
function reconstructePath(startIndex, endIndex, prev) {
  let path = [board[endIndex]];
  let current = endIndex;
  while (prev[current] !== null) {
    path.unshift(board[prev[current]]);
    current = prev[current];
  }
  return path;
}
console.log(knightTravails([0, 0], [7, 7]));
