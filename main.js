//Tic Tac Toe Game object that has players and a gameboard. 1 is x and -1 is o
const TTTGame = (() => {
    //gameboard array
    let gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    let movesMade = 0;
    let playerTurn = 1 //x always goes first

    //Makes move
    function playMove(playerSign, location) {
        if(playerSign == playerTurn){
            if(gameBoard[location[0]][location[1]] == 0){
                gameBoard[location[0]][location[1]] = playerSign;
                playerTurn = playerTurn * -1;
                movesMade += 1;
                let winner = checkWinner(gameBoard, movesMade);
                if(winner != 0){
                    winnerFunction(winner);
                }
            }
        }
    }

    function winnerFunction(winner){
        resetGame();
        return winner;
    }

    const resetGame = () => {
        gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    }

    const getMoveNumber = () => {
        return movesMade;
    }
    const getPlayerTurn = () => {
        return playerTurn;
    }
    
    const getGameBoard = () => {
        return gameBoard;
    }

    return {checkWinner, playMove, getMoveNumber, getPlayerTurn, getGameBoard};
})();

//Player objects
const player1 = (() => {
    let playerSign = 0;
    let isAI = false;
    let wins = 0;

    function playMove(location) {
        if(isAI == false){
            TTTGame.playMove(playerSign, location);

        } else { //if player is AI, plays AI move
            TTTGame.playMove(playerSign, aiRandomMoveGenerator(TTTGame.getGameBoard()));
        }
    };

    //Allows player to choose sign. Once sign is chosen for player1, player2 is automatically other sign
    const setPlayerSign = (sign) => {
        playerSign = sign;
        player2.setPlayerSign(sign * -1);
    }

    const setAI = (ai) => {
        isAI = ai;
    }

    
    return {playerSign, isAI, wins, playMove, setPlayerSign, setAI};
})();

const player2 = (() => {
    let playerSign = 0;
    let isAI = false;
    let wins = 0;

    function playMove(location) {
        if(isAI == false){
            TTTGame.playMove(playerSign, location);

        } else {
            TTTGame.playMove(playerSign, aiRandomMoveGenerator(TTTGame.getGameBoard()));
        }
    };

    const setPlayerSign = (sign) => {
        playerSign = sign;
    }

    const setAI = (ai) => {
        isAI = ai;
    }

    
    return {playerSign, isAI, wins, playMove, setPlayerSign, setAI};
})();

//checks game for winner. return winning sign, 0 if tie
function checkWinner(gameBoard, movesMade){
    //possible winning games
    let winningGames = [
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]
    ];

    let sum = 0;
    for(let i in winningGames){
        sum = gameBoard[winningGames[i][0][0]][winningGames[i][0][1]] + 
            gameBoard[winningGames[i][1][0]][winningGames[i][1][1]] + 
            gameBoard[winningGames[i][2][0]][winningGames[i][2][1]]
        if(sum == 3){
            return 1;
        }else if(sum == -3){
            return -1
        }
    }
    if(movesMade == 9){
        return 0;
    } else{
        return 2;
    }
}

//plays random move
function aiRandomMoveGenerator(gameBoard){
    let validMove = false;
    while(validMove == false){
        let x = Math.floor(Math.random() * 3);
        let y = Math.floor(Math.random() * 3);
        if(gameBoard[x][y] == 0){
            validMove = true;
            return [x,y];
        }
    }
}

//smart AI
let counter = 0;
function smartAIMoveGenerator(gameBoard, playerSign, movesMade){
    let bestMoveValue = 0
    let bestMove = [0,0];

    for(let i in gameBoard){
        for(let j in gameBoard){
            if(gameBoard[i][j] == 0){
                let move = [i,j];
                let moveValue = findMoveValue(gameBoard, move, playerSign);
                if(moveValue > bestMoveValue){
                    bestMoveValue = moveValue;
                    bestMove = location;
                }
            }
        }
    }
    return [bestMove, playerSign];
}

function findMoveValue(gameBoard, move, playerSign){
    let mockGameBoard = copyBoard(gameBoard)
    let moveValue = 0
    mockGameBoard[move[0]][move[1]] = playerSign;
    let winner = checkWinner(mockGameBoard);
    if(winner == 2){
        
        moveValue += findMoveValue(mockGameBoard, move, playerSign)
    } else{
        return winner;
    } 
}

//copy board
function copyBoard(gameBoard){
    let boardCopy = [[0,0,0],[0,0,0],[0,0,0]];
    for(let i in gameBoard){
        for(let j in gameBoard[i]){
            boardCopy[i][j] = gameBoard[i][j];
        }
    }
    return boardCopy
}

let gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
let movesMade = 0;
let playerSign = 1;
smartAIMoveGenerator(gameBoard, playerSign, movesMade);

//UI

//export {TTTGame, player1, player2, smartAIMoveGenerator}