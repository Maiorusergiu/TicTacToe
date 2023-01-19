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
 //global variable for tracking the players turn
 const Player = (name, marker, isWinner, score) => {

    return {name, marker, isWinner, score};
};

//create the two players
const playerOne = Player("PlayerOne", "X", false, 0);
const playerTwo = Player("PlayerTwo", "O", false, 0);

//helper functions
const addFadeIn = (element) => {
    element.classList.add("fade-in");
}
const removeFadeIn = (element) => {
    element.classList.remove("fade-in");
}
const hide = (element) => {
    element.style.display = "none";
}
const displayBlock = (element) => {
    element.style.display = "block";
}

const incrementAndDisplayScore = () => {
    const playerOneNameAndScore = document.querySelector(".player-one-score");
    const playerTwoNameAndScore = document.querySelector(".player-two-score");
    if(playerOne.isWinner){
    playerOne.score++;
    playerOneNameAndScore.textContent = `${playerOne.name}: ${playerOne.score}`;
    } else if(playerTwo.isWinner){
        playerTwo.score++;
        playerTwoNameAndScore.textContent = `${playerTwo.name}: ${playerTwo.score}`;
    }
}
const displayScoreAndName = () => {
    const playerOneNameAndScore = document.querySelector(".player-one-score");
    const playerTwoNameAndScore = document.querySelector(".player-two-score");
    const robotIcon = `<i class="bi bi-robot"></i>`;
    const personIcon = `<i class="bi bi-people-fill"></i>`;
    if(GameBoard.playerVsAi) {
        playerOne.name = "You";
        playerTwo.name = "Robot";
    }
    playerOneNameAndScore.innerHTML = `${personIcon}${playerOne.name}: ${playerOne.score}`;
    playerTwoNameAndScore.innerHTML = `${robotIcon}${playerTwo.name}: ${playerTwo.score}`;
}

const setGameToStart = (cells, mark) => {
    GameBoard.existsWinner = false;
    GameBoard.itsTie = false;
    GameBoard.gameBoard = ["", "", "", "", "", "", "", "", ""];
    GameBoard.countPlayerTurn = 1;
    for(let i = 0 ; i < cells.length; i++){
        mark[i].textContent = "";
        removeFadeIn(mark[i]);
        
    }
    playerOne.isWinner = false;
    playerTwo.isWinner = false;
}

const startGame = (() => {
    const startGameButton = document.querySelector(".start-game");
    const playerVersusPlayer = document.querySelector(".player-player");
    const playerVersusAi = document.querySelector(".player-ai");
    const container = document.querySelector('.container');
    const playerOneName = document.querySelector('.player-one-name');
    const playerTwoName = document.querySelector('.player-two-name');
    const submitButton = document.querySelector('.submit-names');
    const labelOne = document.querySelector(".label-name-one");
    const labelTwo = document.querySelector(".label-name-two");
    const goBackButton = document.querySelector('.go-back');
   
    hide(container);
    hide(playerVersusPlayer);
    hide(playerVersusAi);
    hide(playerOneName);
    hide(playerTwoName);
    hide(submitButton);
    hide(labelOne);
    hide(labelTwo);
    hide(goBackButton);
    addFadeIn(startGameButton);

    const cells = document.querySelectorAll(".cells");
    const mark = document.querySelectorAll(".mark");
    const playerTurn = document.querySelector(".player");
    
    
    startGameButton.addEventListener("click", () => {
       
        hide(startGameButton);
        displayBlock(playerVersusPlayer);
        displayBlock(playerVersusAi);
        addFadeIn(playerVersusPlayer);
        addFadeIn(playerVersusAi);


    })
    playerVersusPlayer.addEventListener('click', () => {
        hide(playerVersusPlayer);
        hide(playerVersusAi);
        GameBoard.playerVsPlayer = true;
        // container.style.display = "block";
        playGame(cells, mark, playerTurn);
        inputPlayerNames();
       
    })
    playerVersusAi.addEventListener('click', () => {
        const player = document.querySelector(".player");
        const goBackButton = document.querySelector(".go-back");
        displayBlock(goBackButton);
        displayBlock(container);
        hide(playerVersusPlayer);
        hide(playerVersusAi);
        GameBoard.playerVsAi = true;
        addFadeIn(container);
       // playGame(cells, mark, playerTurn);
        //set first text
        playGame(cells, mark, playerTurn);
        displayScoreAndName();
        player.textContent = "Make your best move with mark X!";
    })
 

})();

const inputPlayerNames = () => {
    const playerOneName = document.querySelector('.player-one-name');
    const playerTwoName = document.querySelector('.player-two-name');
    const submitButton = document.querySelector('.submit-names');
    const form = document.querySelector("form");
    const container = document.querySelector(".container");
    const labelOne = document.querySelector(".label-name-one");
    const labelTwo = document.querySelector(".label-name-two");
    const goBackButton = document.querySelector('.go-back');
    const player = document.querySelector('.player');
    displayBlock(playerOneName);
    displayBlock(playerTwoName);
    displayBlock(submitButton);
    displayBlock(labelOne);
    displayBlock(labelTwo);
    addFadeIn(form);
   

    form.addEventListener('submit', (e) => {
        const playerOneScore = document.querySelector(".player-one-score");
        const playerTwoScore = document.querySelector(".player-two-score");
        const personIcon = `<i class="bi bi-people-fill"></i>`;
        e.preventDefault();
        e.stopImmediatePropagation();
        playerOne.name = playerOneName.value;
        playerTwo.name = playerTwoName.value;
        hide(playerOneName)
        hide(playerTwoName)
        hide(submitButton)
        hide(labelOne)
        hide(labelTwo)
        displayBlock(container);
        addFadeIn(container);
        displayBlock(goBackButton);
        //set the first text
        player.textContent = `Player ${playerOne.name} turn with mark X!`;
        playerOneScore.innerHTML = `<h3 class="player-one-score">${personIcon}${playerOne.name}: ${playerOne.score}</h3>`
        playerTwoScore.innerHTML = `<h3 class="player-two-score">${personIcon}${playerTwo.name}: ${playerTwo.score}</h3>`
        form.reset();
        
    })
};



const GameBoard = {
    gameBoard: ["", "", "", "", "", "", "", "", ""],
    existsWinner: Boolean(false),
    itsTie: Boolean(false),
    playerVsPlayer: Boolean(false),
    playerVsAi: Boolean(false),
    countPlayerTurn: 1,
}
const displayWinner = (result) => {
    if(GameBoard.playerVsPlayer){
    if(playerOne.isWinner){
        result.textContent = `Congratulations! Player ${playerOne.name} wins!`;
    } else if(playerTwo.isWinner){
        result.textContent = `Congratulations! Player ${playerTwo.name} wins!`;
    } else if(!playerOne.isWinner && !playerTwo.isWinner && GameBoard.itsTie){
        result.textContent = "It's a tie!";
    } 
} else if(GameBoard.playerVsAi){
    if(playerOne.isWinner){
        result.textContent = `Congratulations! You beat AI!`;
    } else if(playerTwo.isWinner){
        result.textContent = `AI wins!`;
    } else if(!playerOne.isWinner && !playerTwo.isWinner && GameBoard.itsTie){
        result.textContent = "It's a tie!";
    } 
}
}
const displayRestartButton = () => {
    const restartButton = document.querySelector(".restart-button");
    if(GameBoard.existsWinner || GameBoard.itsTie){
        displayBlock(restartButton);
    }
    

};



const gameOver = (result) => {
    const cellPosition = GameBoard.gameBoard;
    
    //upper horizontal
    if(cellPosition[0] === playerOne.marker && cellPosition[1] === playerOne.marker && cellPosition[2] === playerOne.marker){
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } 
    else if(cellPosition[0] === playerTwo.marker && cellPosition[1] === playerTwo.marker && cellPosition[2] === playerTwo.marker)
    {
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    }  //vertical right
    else if(cellPosition[2] === playerOne.marker && cellPosition[5] === playerOne.marker && cellPosition[8] === playerOne.marker){
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } 
    else if(cellPosition[2] === playerTwo.marker && cellPosition[5] === playerTwo.marker && cellPosition[8] === playerTwo.marker)
    {
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    }//down horizontal 
    else if(cellPosition[6] === playerOne.marker && cellPosition[7] === playerOne.marker && cellPosition[8] === playerOne.marker){
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } 
    else if(cellPosition[6] === playerTwo.marker && cellPosition[7] === playerTwo.marker && cellPosition[8] === playerTwo.marker)
    {
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } //vertical left
    else if(cellPosition[0] === playerOne.marker && cellPosition[3] === playerOne.marker && cellPosition[6] === playerOne.marker){
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } 
    else if(cellPosition[0] === playerTwo.marker && cellPosition[3] === playerTwo.marker && cellPosition[6] === playerTwo.marker)
    {
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } //middle
    else if(cellPosition[3] === playerOne.marker && cellPosition[4] === playerOne.marker && cellPosition[5] === playerOne.marker){
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } 
    else if(cellPosition[3] === playerTwo.marker && cellPosition[4] === playerTwo.marker && cellPosition[5] === playerTwo.marker)
    {
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } //diag left to right
    else if(cellPosition[0] === playerOne.marker && cellPosition[4] === playerOne.marker && cellPosition[8] === playerOne.marker){
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } 
    else if(cellPosition[0] === playerTwo.marker && cellPosition[4] === playerTwo.marker && cellPosition[8] === playerTwo.marker)
    {
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } //diag right to left
    else if(cellPosition[2] === playerOne.marker && cellPosition[4] === playerOne.marker && cellPosition[6] === playerOne.marker){
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } 
    else if(cellPosition[2] === playerTwo.marker && cellPosition[4] === playerTwo.marker && cellPosition[6] === playerTwo.marker)
    {
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } //vertical middle
    else if(cellPosition[1] === playerOne.marker && cellPosition[4] === playerOne.marker && cellPosition[7] === playerOne.marker){
        playerOne.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
    } 
    else if(cellPosition[1] === playerTwo.marker && cellPosition[4] === playerTwo.marker && cellPosition[7] === playerTwo.marker)
    {
        playerTwo.isWinner = true;
        GameBoard.existsWinner = true;
        displayWinner(result);
        displayRestartButton();
        incrementAndDisplayScore();
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
        setGameToStart(cells, mark);
        hide(restartButton);
        if(GameBoard.playerVsPlayer){
        playerTurn.textContent = `Player ${playerOne.name} turn with mark X!`;
        } else if(GameBoard.playerVsAi){
            playerTurn.textContent = `Make your best move with mark X!`;
            displayScoreAndName();
        }
    })
}
const goBack = (cells, mark) => {
    const goBackButton = document.querySelector(".go-back");
    const restartButton = document.querySelector(".restart-button");
    goBackButton.addEventListener('click', () => {
        const container = document.querySelector('.container');
        const startGameButton = document.querySelector(".start-game");

        hide(container);
        displayBlock(startGameButton)
        hide(goBackButton);
        setGameToStart(cells, mark);
        playerOne.score = 0;
        playerTwo.score = 0;
        GameBoard.playerVsPlayer = false;
        GameBoard.playerVsAi = false;
        displayScoreAndName();
        
        hide(restartButton);
       
       
     
        
    })
}


const playGame = (cells, mark, playerTurn) => {
    goBack(cells, mark);
    restartGame(cells, mark, playerTurn);
    for(let i = 0; i < cells.length; i++){
        let cell = cells[i];
        cell.addEventListener('click', () => {
        if(GameBoard.playerVsPlayer && !GameBoard.existsWinner && !GameBoard.playerVsAi){
            if(GameBoard.countPlayerTurn % 2 !== 0 && GameBoard.gameBoard[i] === ""){
                GameBoard.countPlayerTurn++;
                playerTurn.textContent = `Player ${playerTwo.name} turn with mark O!`; //after click change text
                mark[i].textContent = playerOne.marker; //mark with x
                addFadeIn(mark[i]);  //add fade-in
                GameBoard.gameBoard[i] = playerOne.marker; //add x to the game flow
                gameOver(playerTurn); //check if the game is over
            } else if (GameBoard.countPlayerTurn % 2 === 0 && GameBoard.gameBoard[i] === ""){
                GameBoard.countPlayerTurn++;
                playerTurn.textContent = `Player ${playerOne.name} turn with mark X!`; //after click change text
                mark[i].textContent = playerTwo.marker; //mark with O
                addFadeIn(mark[i]); //add fade-in
                GameBoard.gameBoard[i] = playerTwo.marker; //add o to array
                gameOver(playerTurn); //check if the game is over
            } 
        } else if (!GameBoard.playerVsPlayer && !GameBoard.existsWinner && GameBoard.playerVsAi){
            if(GameBoard.gameBoard[i] === ""){
                addFadeIn(mark[i]);
                mark[i].textContent = playerOne.marker;
                GameBoard.gameBoard[i] = playerOne.marker

                let emptyPosition = GameBoard.gameBoard.findIndex((x) => x === ""); //find first empty spot
                    if(emptyPosition !== -1 && !GameBoard.existsWinner){
                    addFadeIn(mark[emptyPosition]);
                    mark[emptyPosition].textContent = playerTwo.marker;
                    GameBoard.gameBoard[emptyPosition] = playerTwo.marker;
                }
                gameOver(playerTurn);
            }
               
           
        }
        })
}
} 