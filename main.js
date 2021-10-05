//Tic Tac Toe Game object that has players and a gameboard. 1 is x and -1 is o
const TTTGame = (() => {
    //gameboard array
    let gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    let movesMade = 0;
    let playerTurn = 1 //x always goes first

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
    
    //determines winner of tictactoe game
    function checkWinner(){
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
        return 0;
    }

    //Makes move
    function playMove(playerSign, location) {
        if(playerSign == playerTurn){
            if(gameBoard[location[0]][location[1]] == 0){
                gameBoard[location[0]][location[1]] = playerSign;
                playerTurn = playerTurn * -1;
                movesMade += 1;
            }
        }
    }

    const getMoveNumber = () => {
        return movesMade;
    }
    const getPlayerTurn = () => {
        return playerTurn;
    }

    return {gameBoard, checkWinner, playMove, getMoveNumber, getPlayerTurn};
})();

//Player objects
const player1 = (() => {
    let playerSign = 0;
    let isAI = false;
    let wins = 0;

    function playMove(location) {
        if(isAI == false){
            TTTGame.playMove(playerSign, location);

        } else {
            TTTGame.playMove(playerSign, aiRandomMoveGenerator(TTTGame.gameBoard));
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
            TTTGame.playMove(playerSign, aiRandomMoveGenerator(TTTGame.gameBoard));
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

//plays random move
function aiRandomMoveGenerator(gameBoard){
    let validMove = false;
    while(validMove == false){
        let x = Math.floor(Math.random() * 3);
        let y = Math.floor(Math.random() * 3);
        console.log(x + ', ' + y)
        if(gameBoard[x][y] == 0){
            validMove = true;
            return [x,y];
        } else {
            console.log('already played');
        }
    }
}

//UI

export {TTTGame, player1, player2}