let playerScore = 0;
let computerScore = 0;
let roundCount = 0;

const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
const results = document.querySelector("#results");

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);

    return choices[randomIndex];
}

function playRound(playerSelection) {
    // Stop the game after 5 rounds
    if (roundCount >= 5) {
        return;
    }

    const computerSelection = getComputerChoice();

    if (playerSelection === computerSelection) {
        results.textContent = `It's a tie! You chose ${playerSelection}.`;
    } 
    else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        playerScore++;
        results.textContent = `You win! ${playerSelection} beats ${computerSelection}.`;
    } 
    else {
        computerScore++;
        results.textContent = `You lose! ${computerSelection} beats ${playerSelection}.`;
    }

    roundCount++;

    results.textContent += ` Player: ${playerScore} | Computer: ${computerScore}`;

    // End the game after 5 rounds
    if (roundCount === 5) {
        if (playerScore > computerScore) {
            results.textContent += " 🎉 You won the game!";
        } 
        else if (computerScore > playerScore) {
            results.textContent += " 💻 Computer won the game!";
        } 
        else {
            results.textContent += " 🤝 The game is a tie!";
        }

        rockButton.disabled = true;
        paperButton.disabled = true;
        scissorsButton.disabled = true;
    }
}

rockButton.addEventListener("click", () => {
    playRound("rock");
});

paperButton.addEventListener("click", () => {
    playRound("paper");
});

scissorsButton.addEventListener("click", () => {
    playRound("scissors");
});