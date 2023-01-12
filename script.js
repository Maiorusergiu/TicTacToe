/* eslint-disable no-unused-vars */
//TASKS
//1.Set up your project with HTML, CSS and Javascript files and get the Git repo all set up.

//2.You’re going to store the gameboard as an array inside of a Gameboard object, so start there!
//Your players are also going to be stored in objects… and you’re probably going to want an object
//to control the flow of the game itself.

//2.1.Your main goal here is to have as little global code as possible.
//Try tucking everything away inside of a module or factory.
//Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module.
//If you need multiples of something (players!), create them with factories.
////The concepts are exactly the same as the factory function.
//However, instead of creating a factory that we can use over and over again to create multiple objects,
//the module pattern wraps the factory in an IIFE (Immediately Invoked Function Expression).

//3. Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage
//(for now you can just manually fill in the array with "X"s and "O"s)

//4. Build the functions that allow players to add marks to a specific spot on the board,
//and then tie it to the DOM, letting players click on the gameboard to place their marker.
//Don’t forget the logic that keeps players from playing in spots that are already taken!

//4.1 Think carefully about where each bit of logic should reside.
//Each little piece of functionality should be able to fit in the game, player or gameboard objects..
//but take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

//6. Clean up the interface to allow players to put in their names,
//include a button to start/restart the game and add a display element that congratulates the winning player!

//Project
//Fill the cells with X's
//even = par
//odd = prim
    //1 => x
    //2 => O
    //3 => x
    //4 => O
    //5 => X
    //6 => O
    //7 => X
    //8 => O
    //9 => X
    //counter

//Input for players
//Update players names
//AI
let countPlayerTurn = 1; //global variable for tracking the players turn
const Player = (name, marker, isWinner) => {

    return {name, marker, isWinner};
};

//create the two players
const playerOne = Player("PlayerOne", "X", false);
const playerTwo = Player("PlayerTwo", "O", false);



const startGame = (() => {
    const startGameButton = document.querySelector(".start-game");
    const playerVersusPlayer = document.querySelector(".player-player");
    const playerVersusAi = document.querySelector(".player-ai");
    const container = document.querySelector('.container');
    container.style.display = "none";
    playerVersusPlayer.style.display = "none";
    playerVersusAi.style.display = "none";
    startGameButton.addEventListener("click", () => {
        startGameButton.style.display = "none";
        
        playerVersusPlayer.style.display = "block";
        playerVersusAi.style.display = "block";

    })
    playerVersusPlayer.addEventListener('click', () => {
        playerVersusPlayer.style.display = "none";
        playerVersusAi.style.display = "none";
        GameBoard.playerVsPlayer = true;
        container.style.display = "block";
    })

})();

const GameBoard = {
    gameBoard: ["", "", "", "", "", "", "", "", ""],
    existsWinner: Boolean(false),
    itsTie: Boolean(false),
    playerVsPlayer: Boolean(false),
    playerVsAi: Boolean(false),
}
const displayWinner = (result) => {
    if(playerOne.isWinner){
        result.textContent = "Player X wins!";
    } else if(playerTwo.isWinner){
        result.textContent = "Player O wins!";
    } else if(!playerOne.isWinner && !playerTwo.isWinner && GameBoard.itsTie){
        result.textContent = "It's a tie!";
    } 
}
const displayRestartButton = () => {
    const restartButton = document.querySelector(".restart-button");
    if(!!GameBoard.existsWinner || !!GameBoard.itsTie){
        restartButton.style.visibility = "visible";
    }
    

};



const gameOver = (result) => {
    const cellPosition = GameBoard.gameBoard;
    
    //upper horizontal
    if(cellPosition[0] === playerOne.marker && cellPosition[1] === playerOne.marker && cellPosition[2] === playerOne.marker){
        console.log("X Wins");
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        
    } 
    else if(cellPosition[0] === playerTwo.marker && cellPosition[1] === playerTwo.marker && cellPosition[2] === playerTwo.marker)
    {
        console.log("O Wins");
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    }  //vertical right
    else if(cellPosition[2] === playerOne.marker && cellPosition[5] === playerOne.marker && cellPosition[8] === playerOne.marker){
        console.log("X Wins");
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } 
    else if(cellPosition[2] === playerTwo.marker && cellPosition[5] === playerTwo.marker && cellPosition[8] === playerTwo.marker)
    {
        console.log("O Wins");
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    }//down horizontal 
    else if(cellPosition[6] === playerOne.marker && cellPosition[7] === playerOne.marker && cellPosition[8] === playerOne.marker){
        console.log("X Wins");
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } 
    else if(cellPosition[6] === playerTwo.marker && cellPosition[7] === playerTwo.marker && cellPosition[8] === playerTwo.marker)
    {
        console.log("O Wins");
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } //vertical left
    else if(cellPosition[0] === playerOne.marker && cellPosition[3] === playerOne.marker && cellPosition[6] === playerOne.marker){
        console.log("X Wins");
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } 
    else if(cellPosition[0] === playerTwo.marker && cellPosition[3] === playerTwo.marker && cellPosition[6] === playerTwo.marker)
    {
        console.log("O Wins");
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } //middle
    else if(cellPosition[3] === playerOne.marker && cellPosition[4] === playerOne.marker && cellPosition[5] === playerOne.marker){
        console.log("X Wins");
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } 
    else if(cellPosition[3] === playerTwo.marker && cellPosition[4] === playerTwo.marker && cellPosition[5] === playerTwo.marker)
    {
        console.log("O Wins");
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } //diag left to right
    else if(cellPosition[0] === playerOne.marker && cellPosition[4] === playerOne.marker && cellPosition[8] === playerOne.marker){
        console.log("X Wins");
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } 
    else if(cellPosition[0] === playerTwo.marker && cellPosition[4] === playerTwo.marker && cellPosition[8] === playerTwo.marker)
    {
        console.log("O Wins");
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } //diag right to left
    else if(cellPosition[2] === playerOne.marker && cellPosition[4] === playerOne.marker && cellPosition[6] === playerOne.marker){
        console.log("X Wins");
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } 
    else if(cellPosition[2] === playerTwo.marker && cellPosition[4] === playerTwo.marker && cellPosition[6] === playerTwo.marker)
    {
        console.log("O Wins");
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } //vertical middle
    else if(cellPosition[1] === playerOne.marker && cellPosition[4] === playerOne.marker && cellPosition[7] === playerOne.marker){
        console.log("X Wins");
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    } 
    else if(cellPosition[1] === playerTwo.marker && cellPosition[4] === playerTwo.marker && cellPosition[7] === playerTwo.marker)
    {
        console.log("O Wins");
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
    }
    else if(cellPosition[1] !== ""
    && cellPosition[2] !== "" && cellPosition[3] !== "" && cellPosition[4] !== ""
    && cellPosition[5] !== "" && cellPosition[6] !== "" && cellPosition[7] !== ""
    && cellPosition[8] !== "" && !GameBoard.existsWinner){
        GameBoard.itsTie = true;
        displayWinner(result);
        displayRestartButton();
    }
}

const restartGame = (cells, mark, playerTurn) => {
    const restartButton = document.querySelector(".restart-button");
    restartButton.addEventListener('click', () => {
        GameBoard.existsWinner = false;
        GameBoard.itsTie = false;
        GameBoard.gameBoard = ["", "", "", "", "", "", "", "", ""];
        playerOne.isWinner = false;
        playerTwo.isWinner = false;
        restartButton.style.visibility = "hidden";
        playerTurn.textContent = "Player's X turn!";
        for(let i = 0 ; i < cells.length; i++){
            mark[i].textContent = "";
            
        }
        countPlayerTurn = 1;
        
    })
}

const playGame = (cells, mark, playerTurn) => {
    for(let i = 0; i < cells.length; i++){
        let cell = cells[i];
        restartGame(cells, mark, playerTurn);
        cell.addEventListener('click', () => {
        if(!GameBoard.existsWinner && !!GameBoard.playerVsPlayer){
            if(countPlayerTurn % 2 !== 0 && GameBoard.gameBoard[i] === ""){
                countPlayerTurn++;
                playerTurn.textContent = "Player's O turn!"; //after click change text
                mark[i].textContent = playerOne.marker; //mark with x
                mark[i].classList.add("fade-in"); //add fade-in
                GameBoard.gameBoard[i] = playerOne.marker; //add x to the game flow
                console.log(GameBoard.gameBoard);
                gameOver(playerTurn); //check if the game is over
            } else if (countPlayerTurn % 2 === 0 && GameBoard.gameBoard[i] === ""){
                countPlayerTurn++;
                playerTurn.textContent = "Player's X turn!"; //after click change text
                mark[i].textContent = playerTwo.marker; //mark with O
                mark[i].classList.add("fade-in"); //add fade-in
                GameBoard.gameBoard[i] = playerTwo.marker; //add o to array
                console.log(GameBoard.gameBoard);
                gameOver(playerTurn); //check if the game is over
            } 
        }
        })
    }
}

const displayController = (() => {
    const cells = document.querySelectorAll(".cells");
    const mark = document.querySelectorAll(".mark");
    const playerTurn = document.querySelector(".player");
    playGame(cells, mark, playerTurn);
    
   
})();


