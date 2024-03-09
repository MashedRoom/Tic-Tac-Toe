const cells = document.querySelectorAll(".cell")
const turn = document.querySelector(".turn")
const restartBtn = document.querySelector(".restartBtn")

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

let moves = 0
function playerMove(p1, p2, ycor, xcor, cellIndex){
    let shape
    if(moves % 2 == 0){
        shape = p1.shape
        turn.textContent = p2.shape + " turn"
    } else{
        shape = p2.shape
        turn.textContent = p1.shape+ " turn"
    }
    cells[cellIndex].textContent = shape 
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
            turn.textContent = shape + " IS THE WINNER"
            updateListener()
        }
    }
    for (let i = 0; i<3; i++){
        if (gameBoard.board[0][i] == shape && gameBoard.board[1][i] == shape && gameBoard.board[2][i] == shape){
            gameOver = true
            turn.textContent = shape + " IS THE WINNER"
            updateListener()
        }
    }
    if(gameBoard.board[1][1] ==shape && gameBoard.board[0][0] == shape && gameBoard.board[2][2]){
        gameOver= true
        turn.textContent = shape + " IS THE WINNER"
        updateListener()
    }
    if(gameBoard.board[1][1] ==shape && gameBoard.board[0][2] == shape && gameBoard.board[2][0]){
        gameOver= true
        turn.textContent = shape + " IS THE WINNER"
        updateListener()
    }
    if(moves == 9){
        gameOver= true
        turn.textContent = "DRAW"
        updateListener()
    }
}

function cellClicked(event){
    let cellIndex = Array.from(cells).indexOf(event.target)
    let ycor = Math.floor(cellIndex/3)
    let xcor = (cellIndex%3)
    console.log(ycor, xcor)
    playerMove(p1, p2, ycor, xcor, cellIndex)
    checkWinner("x")
    checkWinner("o")
}

function updateListener(){
    if (!gameOver){
        cells.forEach((cell)=>{
            cell.addEventListener(("click"), cellClicked)
        })
    }
    else{
        cells.forEach((cell)=>{
            cell.removeEventListener(("click"), cellClicked)
        })
    }
}
updateListener()

function restartGame(){
    gameOver = false
    moves = 0
    cells.forEach((cell)=>{
        cell.textContent = ""
    })
    turn.textContent = "x turn"
    gameBoard.board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]]
    updateListener()
}

restartBtn.addEventListener(("click"), restartGame)
