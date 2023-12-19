let computerScore = 0, playerScore = 0;
let roundCounter = 0;

let playerSide, computerSide;

let resultStory;let resetDiv;

let playerScoreOut, computerScoreOut;

let choices = ["rock", "paper", "scissors"];

const buttons = document.querySelectorAll('.rpc');

const btnContainer = document.querySelector('#rpc');

const commentary = document.querySelector('.comentary');

const scoreDiv = document.querySelector('.scr');
scoreDiv.style.display = 'none';

const sidePickerButtons = document.querySelectorAll('.side');
const sidePickerDiv = document.querySelector('.picker');

buttons.forEach((button) => {

    // and for each one we add a 'click' listener
    button.addEventListener('click', () => {
        game(button.textContent.toLowerCase());
    });
  });

sidePickerButtons.forEach((button) => {

    // and for each one we add a 'click' listener
    button.addEventListener('click', () => {
        playerSide = button.id;
        playerScoreOut= document.querySelector('.'+playerSide);

        if(playerSide=='sushi'){
            computerSide = 'grapefruit';
            computerScoreOut = document.querySelector('.grapefruit');
        }else{
            computerSide = 'sushi';
            computerScoreOut = document.querySelector('.sushi');
        }

        console.log(playerSide);
        sidePickerDiv.style.display = 'none';
        btnContainer.style.display = 'flex'
    });
  });


function game(playerSelection){
    roundCounter++;
    let computerSelection = getComputerChoice();

    let result = playRound(playerSelection, computerSelection);
    commentary.textContent = result;
    scoreDiv.style.display = 'flex';
    playerScoreOut.textContent = playerScore;
    computerScoreOut.textContent = computerScore;

    if(roundCounter==5){
        if(playerScore>computerScore){
            createFinalStory(1);
        }else if(computerScore>playerScore){
            createFinalStory(2);
        }else{
            createFinalStory(0);
        }
    }
}

function createFinalStory(result){
    scoreDiv.style.display = 'none';

    btnContainer.style.display = 'none';

    let body = scoreDiv.parentElement;
    resultStory = document.createElement('div');
    resultStory.classList.add('story');
    resultStory.classList.add('container');
    resultStory.style.backgroundColor = 'antiqueWhite'
    
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('character');
    imgDiv.classList.add('left');
    const img = document.createElement('img')

    let winner;
    if(result == 1)winner = playerSide;
    else if (result == 2) winner = computerSide;

    if(winner=='sushi'){
            img.setAttribute('src', 'res/sushi-small.gif');
            outText = "Woohoo! Hawaiian pizza for dinner tonight!!";
    }else if(winner == 'grapefruit'){
            img.setAttribute('src', 'res/juicebox.gif');
            img.style.transform = 'scaleX(-1)';
            outText = "Toldya!! Now get that disgusting pineapple off my pizza!";
    }else{
        img.setAttribute('src', 'res/sushi-small.gif');
        outText = "Ummm...5 more rounds?";
    }
    
    imgDiv.appendChild(img);

    const textDiv = document.createElement('div');
    textDiv.classList.add('dialog');
    textDiv.classList.add('left');
    const p = document.createElement('p');
    p.textContent = outText;
    p.style.color = '#e35153'
    p.style.fontWeight = 600;
    textDiv.appendChild(p);

    resetDiv = document.createElement('div');
    let reset = document.createElement('button');
    let form = document.createElement('button');

    reset.style.padding = '10px 5px';
    reset.style.backgroundColor =  '#bd89de';
    reset.style.color = 'antiquewhite';
    reset.style.fontFamilly=  'Source Code Pro';
    reset.style.boxShadow=  '2px 2px antiquewhite';
    reset.style.border = 'none';
    reset.textContent = 'Play Again';

    form.style.padding = '10px 5px';
    form.style.backgroundColor =  '#bd89de';
    form.style.color = 'antiquewhite';
    form.style.fontFamilly=  'Source Code Pro';
    form.style.boxShadow=  '2px 2px antiquewhite';
    form.style.border = 'none';
    form.textContent = 'Submit your controversial opinion';
    form.addEventListener('click', () => {
        document.location.href= "./submitOpinion.html"
    });


    resetDiv.classList.add('btn');
    resetDiv.classList.add('container');
    resetDiv.append(reset);
    resetDiv.append(form);
    reset.addEventListener('click', () => {
        resetGame();
    });

    resultStory.appendChild(imgDiv);
    resultStory.appendChild(textDiv);
    body.append(resultStory);
    body.append(resetDiv);
}

function resetGame(){
    computerScore = 0;
    playerScore = 0;
    roundCounter = 0;

    scoreDiv.style.display = 'none';

    sidePickerDiv.style.display = 'flex';

    resultStory.remove();
    resetDiv.remove();
}


function getComputerChoice(){
    return choices[Math.floor(Math.random()*choices.length)];
}

function playRound(playerSelection, computerSelection) {
    if(playerSelection == computerSelection){
        return "it's a draw"
    }
    if(playerSelection == "rock"){
        if(computerSelection == "paper"){
            computerScore++;
            return "Paper beats Rock";
        }else{
            playerScore++;
            return "Rock beats Scissors";
        }
    }else if(playerSelection == "paper"){
        if(computerSelection == "scissors"){
            computerScore++;
            return "Scissors beats Paper";
        }else{
            playerScore++;
            return "Paper beats Rock";
        }
    }else if(playerSelection == "scissors"){
        if(computerSelection == "rock"){
            computerScore++;
            return "Rock beats Scissors";
        }else{
            playerScore++;
            return "Scissors beats Paper";
        }
    }
}