

var PuzzleBoard, DepthPuzzle;
var PriorityQueue, ParentIndex, DepthPuzzleIndex, ManathanDistance, ManathanDisVal, puzzleBoardIndex, MD, PQ;
var puzzleSteps;
var puzzle;

function Main() {

    PuzzleBoard = []; DepthPuzzle = [];
    PriorityQueue = []; ParentIndex = []; DepthPuzzleIndex = []; ManathanDistance = []; ManathanDisVal = []; puzzleBoardIndex = []; MD = []; PQ = [];

    //var puzzle = [[8, 6, 0], [2, 3, 7], [5, 4, 1]];
    //var puzzle = [[1, 8, 2], [0, 4, 3], [7, 6, 5]];
    puzzle = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (var i = 0, k = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++ , k++) {
            // alert(puzzleBoard[k]);
            puzzle[i][j] = puzzleBoard[k];
        }
    }
    //  alert(puzzleBoard);
    //var puzzle = puzzleBoard;

    var goalState = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    if (twodArraySequentiallyEqual(goalState, puzzle)) {
        btnEnable();
        clickEvent =true; 
       return;
    }
    
    //  PuzzleBoard = new List<int[,]>();
    //  PriorityQueue = new List<int>();
    //  ManathanDistance = new List<int>();
    //  puzzleBoardIndex = new List<int>();
    //  DepthPuzzleIndex = new List<int>();
    //  ParentIndex = new List<int>();
    //  ManathanDisVal = new List<int>();
    //  MD = new List<int>();
    //  PQ = new List<int>();

    PuzzleBoard.push(puzzle);
    puzzleBoardIndex.push(0);
    PriorityQueue.push(0);
    DepthPuzzleIndex.push(0);
    ParentIndex.push(-1);
    puzzleSteps = [];

    while (!twodArraySequentiallyEqual(goalState, PuzzleBoard[PriorityQueue[0]])) {
        slideMoves(PuzzleBoard[PriorityQueue[0]], PriorityQueue[0], DepthPuzzleIndex[PriorityQueue[0]]);
    }
    if (PuzzleBoard.length > 1) {
        for (var i = PriorityQueue[0], j = 0; i != 0; i = ParentIndex[i]) {
            console.log(ParentIndex[i] + " " + j++ + " " + PuzzleBoard[i] + " ");

            for (var l = 0, m = 1; l < 3; l++) {
                for (var n = 0; n < 3; n++ , m++) {
                    // alert(puzzleBoard[k]);
                    if (PuzzleBoard[i][l][n] == 9) {
                        puzzleSteps[j] = m;
                    }
                }
            }
        }
        stepsShow();
        //  alert(puzzleSteps);

        // for (var id = puzzleSteps.length - 1; id > 0; id--) {
        //           setInterval(slide('img' + Number(imagePos.indexOf(puzzleSteps[id]) +1)), 2000)
        //           ;
        //     }

        if (!checkSteps) {
            var id = puzzleSteps.length - 1;

            (function theLoop(id) {
                setTimeout(function () {
                    slide('img' + Number(imagePos.indexOf(puzzleSteps[id]) + 1));
                    if (--id) {          // If i > 0, keep going
                        theLoop(id);       // Call the loop again, and pass it the current value of i
                    }
                    else {
                        // console.log("goal");
                        clickEvent = true;
                        btnEnable();
                    }
                }, 500);
            })(puzzleSteps.length - 1);
        }
        checkSteps = false;
        //alert("goal");
        //alert(puzzleSteps);
        //  alert("goal");
        // clickEvent = true;
    }
    else{
        clickEvent=true;
        console.log(clickEvent);
    }

}
function twodArraySequentiallyEqual(Array1, Array2) {
    // console.log(Array1);
    // console.log(Array2);
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (Array1[i][j] != Array2[i][j]) {
                return false;
            }

        }
    }

    return true;
}
function slideMoves(board, parentIndex, depthIndex) {
    if (ManathanDisVal.length > 1) {

        ManathanDisVal.splice(ManathanDisVal.indexOf(ManathanDisVal[0]), 1);

    }

    PriorityQueue.splice(PriorityQueue.indexOf(PriorityQueue[0]), 1);


    // var tempBoard =[[0,0,0],[0,0,0],[0,0,0]];
    var flag = false;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] == 9) {
                if (i > 0) {
                    var tempBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                    Copy(board, tempBoard, board.length);
                    tempBoard[i][j] = tempBoard[i - 1][j];
                    tempBoard[i - 1][j] = 9;
                    //     console.log(tempBoard);
                    for (var k = 0; k < PuzzleBoard.length; k++) {
                        if (twodArraySequentiallyEqual(tempBoard, PuzzleBoard[k])) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag == false) {
                        PuzzleBoard.push(tempBoard);
                        ParentIndex.push(parentIndex);
                        manathanDistance(tempBoard, DepthPuzzleIndex[parentIndex] + 1);
                        DepthPuzzleIndex.push(DepthPuzzleIndex[parentIndex] + 1);
                    }
                    flag = false;
                }
                if (i < board.length - 1) {
                    var tempBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                    Copy(board, tempBoard, board.length);
                    //  console.log(tempBoard);
                    tempBoard[i][j] = tempBoard[i + 1][j];
                    tempBoard[i + 1][j] = 9;
                    for (var k = 0; k < PuzzleBoard.length; k++) {
                        if (twodArraySequentiallyEqual(tempBoard, PuzzleBoard[k])) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag == false) {
                        PuzzleBoard.push(tempBoard);
                        ParentIndex.push(parentIndex);
                        manathanDistance(tempBoard, DepthPuzzleIndex[parentIndex] + 1);
                        DepthPuzzleIndex.push(DepthPuzzleIndex[parentIndex] + 1);
                    }
                    flag = false;
                }
                if (j > 0) {
                    var tempBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                    Copy(board, tempBoard, board.length);
                    tempBoard[i][j] = tempBoard[i][j - 1];
                    tempBoard[i][j - 1] = 9;
                    for (var k = 0; k < PuzzleBoard.length; k++) {
                        if (twodArraySequentiallyEqual(tempBoard, PuzzleBoard[k])) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag == false) {
                        PuzzleBoard.push(tempBoard);
                        ParentIndex.push(parentIndex);
                        manathanDistance(tempBoard, DepthPuzzleIndex[parentIndex] + 1);
                        DepthPuzzleIndex.push(DepthPuzzleIndex[parentIndex] + 1);
                    }
                    flag = false;
                }
                if (j < board[0].length - 1) {
                    var tempBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                    Copy(board, tempBoard, board.length);
                    tempBoard[i][j] = tempBoard[i][j + 1];
                    tempBoard[i][j + 1] = 9;
                    for (var k = 0; k < PuzzleBoard.length; k++) {
                        if (twodArraySequentiallyEqual(tempBoard, PuzzleBoard[k])) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag == false) {
                        PuzzleBoard.push(tempBoard);
                        ParentIndex.push(parentIndex);
                        manathanDistance(tempBoard, DepthPuzzleIndex[parentIndex] + 1);
                        DepthPuzzleIndex.push(DepthPuzzleIndex[parentIndex] + 1);
                    }
                    flag = false;
                }
                // for break outer loop
                i = 9;
                break;

            }
        }
    }
    sort();
}

function Copy(board, tempBoard, boardLength) {

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            tempBoard[i][j] = board[i][j];

        }
    }

}

function manathanDistance(tempPuzzleBoard, PathCost) {


    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            if (tempPuzzleBoard[row][col] == 1) {
                ManathanDistance.push(Math.abs(row - 0) + Math.abs(col - 0));
            }
            else if (tempPuzzleBoard[row][col] == 2) {
                ManathanDistance.push(Math.abs(row - 0) + Math.abs(col - 1));
            }
            else if (tempPuzzleBoard[row][col] == 3) {
                ManathanDistance.push(Math.abs(row - 0) + Math.abs(col - 2));
            }
            else if (tempPuzzleBoard[row][col] == 4) {
                ManathanDistance.push(Math.abs(row - 1) + Math.abs(col - 0));
            }
            else if (tempPuzzleBoard[row][col] == 5) {
                ManathanDistance.push(Math.abs(row - 1) + Math.abs(col - 1));
            }
            else if (tempPuzzleBoard[row][col] == 6) {
                ManathanDistance.push(Math.abs(row - 1) + Math.abs(col - 2));
            }
            else if (tempPuzzleBoard[row][col] == 7) {
                ManathanDistance.push(Math.abs(row - 2) + Math.abs(col - 0));
            }
            else if (tempPuzzleBoard[row][col] == 8) {
                ManathanDistance.push(Math.abs(row - 2) + Math.abs(col - 1));
            }

        }

    }

    MD.push(getSum() + PathCost);
    ManathanDistance = [];
}
function getSum() {

    var total = 0;
    for (var i = 0; i < ManathanDistance.length; i++) {
        total += ManathanDistance[i];
    }
    return total;
}
function sort() {

    for (var i = 0, j; i < MD.length; i++) {
        for (j = ManathanDisVal.length - 1; j > -1; j--) {
            if (MD[i] < ManathanDisVal[j]) {

                continue;
            }
            break;

        }
        if (ManathanDisVal.length != 0) {
            ManathanDisVal.splice(j + 1, 0, MD[i]);
            PriorityQueue.splice(j + 1, 0, PuzzleBoard.length - MD.length + i);
        }
        else {
            ManathanDisVal.splice(0, 0, MD[i]);
            PriorityQueue.splice(0, 0, 1);
        }

    }
    //console.log(PriorityQueue);
    MD = [];
    //alert(ManathanDisVal + "\n" + PriorityQueue);
}
function stepsShow() {
    var count=1;
    document.getElementById("txtPS").innerHTML = "";
    for (var i = puzzleSteps.length - 1; i > 0; i--) {
        document.getElementById("txtPS").innerHTML += "Step "+count++ +" --> Click on position no. " + puzzleSteps[i] + " tile\n";
    }
}