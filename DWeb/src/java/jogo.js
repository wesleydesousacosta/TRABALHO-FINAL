const codeSnippets = [
    { 
        code: `prnt("Hello, World!")`, 
        error: "prnt", 
        correct: "print" 
    },
    { 
        code: `for i in rnage(10):\n    print(i)`, 
        error: "rnage", 
        correct: "range" 
    },
    { 
        code: `x = input("Enter a number:")\nif x > 10:\nprint("Maior que 10!")`, 
        error: "print", 
        correct: "    print" // indentifica erro
    },
    { 
        code: `y = int(input("Digite um número:")\nif y == 5:\n    priint("Número é 5!")`, 
        error: "priint", 
        correct: "print" 
    },
    { 
        code: `my_list = [1, 2, 3, 4\nprint(my_list)`, 
        error: "[1, 2, 3, 4", 
        correct: "[1, 2, 3, 4]" 
    }
];

let currentSnippetIndex = 0;
let score = 0;
let round = 1;
const maxRounds = 10;
const scoreList = [];
const players = []; // Array para armazenar jogadores e suas pontuações
let currentPlayer = null;

const codeSnippetElement = document.getElementById("code-snippet");
const userInputElement = document.getElementById("prompt");
const submitBtn = document.getElementById("submit-btn");
const nextRoundBtn = document.getElementById("next-round-btn");
const scoreElement = document.getElementById("score");
const roundsElement = document.getElementById("rounds");
const scoreListElement = document.getElementById("score-list");
const playerNameInput = document.getElementById("player-name");
const registerBtn = document.getElementById("register-btn");
const registrationMessage = document.getElementById("registration-message");
const rankingListElement = document.getElementById("ranking-list");

function startGame() {
    registerBtn.addEventListener('click', registerPlayer);
}

function registerPlayer() {
    const playerName = playerNameInput.value.trim();
    if (playerName === "") {
        registrationMessage.textContent = "Por favor, insira um nome válido.";
        return;
    }

    currentPlayer = { name: playerName, score: 0 };
    players.push(currentPlayer);
    registrationMessage.textContent = `Jogador ${playerName} cadastrado!`;
    
    // Habilitar o início do jogo
    displayCodeSnippet();
    submitBtn.addEventListener('click', submitCorrection);
    nextRoundBtn.addEventListener('click', nextRound);
}

function displayCodeSnippet() {
    const currentSnippet = codeSnippets[currentSnippetIndex];
    codeSnippetElement.innerHTML = currentSnippet.code.replace(currentSnippet.error, `<span class="error">${currentSnippet.error}</span>`);
    userInputElement.innerHTML = ''; 
    nextRoundBtn.style.display = 'none'; 
}

function submitCorrection() {
    const userAnswer = userInputElement.innerText.trim();
    const currentSnippet = codeSnippets[currentSnippetIndex];

    if (userAnswer === currentSnippet.correct) {
        alert("Correto! +10 pontos");
        currentPlayer.score += 10; // Adiciona pontos ao jogador atual
        score += 10;
    } else {
        alert(`Errado! A correção correta era: ${currentSnippet.correct}`);
    }
    
    scoreElement.textContent = score;

    // Atualiza o ranking
    updateRanking();

    nextRoundBtn.style.display = 'block';
    submitBtn.disabled = true; 
}

function nextRound() {
    if (round >= maxRounds) {
        endGame();
        return;
    }
    
    round++;
    roundsElement.textContent = `${round}/${maxRounds}`;
    currentSnippetIndex = (currentSnippetIndex + 1) % codeSnippets.length;
    submitBtn.disabled = false; 
    displayCodeSnippet();
}

function endGame() {
    scoreList.push(currentPlayer.score);
    updateScoreList();
    resetGame();
}

function resetGame() {
    score = 0;
    round = 1;
    currentSnippetIndex = 0;
    scoreElement.textContent = score;
    roundsElement.textContent = `${round}/${maxRounds}`;
    displayCodeSnippet();
}

function updateScoreList() {
    scoreListElement.innerHTML = "";
    scoreList.forEach((score, index) => {
        const li = document.createElement("li");
        li.textContent = `Partida ${index + 1}: ${score} pontos`;
        scoreListElement.appendChild(li);
    });
}

function updateRanking() {
    rankingListElement.innerHTML = "";
    players.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name}: ${player.score} pontos`;
        rankingListElement.appendChild(li);
    });
}

startGame();
