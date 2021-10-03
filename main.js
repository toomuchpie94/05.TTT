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

    //determines which moves are left to prevent double moves
    let validMoves = [
        [0,0], [0,1], [0,1],
        [1,0], [1,1], [1,2],
        [2,0], [2,1], [2,2]
    ];
    function isValidMove(move){
        for(let i in validMoves){
            if(JSON.stringify(validMoves[i]) === JSON.stringify(move)){
                return true;
            }
        }
        return false;
    }

    //determines winner of tictactoe game
    function winner(){
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
            if(isValidMove(location) == true){
                gameBoard[location[0]][location[1]] = playerSign;
                playerTurn = playerTurn * -1;
                movesMade += 1
                
            } else{
                console.log("Not a valid move")
            }
        } else{
            console.log("Not your turn")
        }
    }

    return {gameBoard, winner, playMove};
})();

//Player objects
const player = (playerSign, isAI) => {
    let wins = 0;

    function playMove(location) {
        if(isAI == false){
            TTTGame.playMove(playerSign, location);
        } else {
            location = aiMoveGenerator(TTTGame.gameBoard, playerSign);
        }
        
    };

    function aiMoveGenerator(gameBoard, sign){

    }

    return {playerSign, isAI, wins, playMove};
}

//UI

export {TTTGame, player}