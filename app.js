const cells = document.querySelectorAll(".cell")

let gameBoard = {
    board : [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]],
    printBoard: function() {console.log(this.board)},
    setBoard: function(y, x, shape){
        if (this.board[y][x] == 0){
            this.board[y][x] = shape
        } else {
            alert("already inputted")
        }
    }
}

function player(name, shape){
    return {name, shape}
}

let moves = 1
function playerMove(p1, p2, ycor, xcor, cellIndex){
    let shape
    if(moves % 2 == 1){
        shape = p1.shape
        cells[cellIndex].textContent = shape 
    } else{
        shape = p2.shape
        cells[cellIndex].textContent = shape
    }
    moves++
    gameBoard.setBoard(ycor, xcor, shape)
}

const p1 = player("josh", "x")
const p2 = player("bob", "o")

gameBoard.printBoard()

let gameOver = false

function checkWinner(shape){
    for (let i = 0; i<3; i++){
        if (gameBoard.board[i][0] == shape && gameBoard.board[i][1] == shape && gameBoard.board[i][2] == shape){
            gameOver = true
            console.log("WINNER" + shape)
        }
    }
    for (let i = 0; i<3; i++){
        if (gameBoard.board[0][i] == shape && gameBoard.board[1][i] == shape && gameBoard.board[2][i] == shape){
            gameOver = true
            console.log("WINNER IS " + shape)
        }
    }
    if(gameBoard.board[1][1] ==shape && gameBoard.board[0][0] == shape && gameBoard.board[2][2]){
        gameOver= true
        console.log("WINNER IS " + shape)
    }
    if(gameBoard.board[1][1] ==shape && gameBoard.board[0][2] == shape && gameBoard.board[2][0]){
        gameOver= true
        console.log("WINNER" + shape)
    }
    if(moves == 9){
        gameOver= true
        console.log("Draw")
    }
}

cells.forEach((cell)=>{
    cell.addEventListener(("click"), ()=>{
        let cellIndex = Array.from(cells).indexOf(cell)
        let ycor = Math.floor(cellIndex/3)
        let xcor = (cellIndex%3)
        console.log(ycor, xcor)
        playerMove(p1, p2, ycor, xcor, cellIndex)
        checkWinner("x")
        checkWinner("o")
    })
})
