// script.js
const player1Cards = [];
const player2Cards = [];
const cardBank = [];

function createCard(character, attack, defense) {
  return { character, attack, defense };
}

function initializeGame() {
  cardBank.push(createCard("Naruto", 450000, 250000));
  cardBank.push(createCard("Sasuke", 400000, 300000));
  cardBank.push(createCard("Sakura", 300000, 200000));
  cardBank.push(createCard("Kakashi", 350000, 220000));
  cardBank.push(createCard("Hinata", 320000, 240000));

  for (let i = 0; i < 7; i++) {
    player1Cards.push(drawRandomCard());
    player2Cards.push(drawRandomCard());
  }
  renderCards();
}

function drawRandomCard() {
  if (cardBank.length === 0) {
    alert("No more cards in the bank!");
    return null;
  }
  return cardBank.splice(Math.floor(Math.random() * cardBank.length), 1)[0];
}

function renderCards() {
  const player1Container = document.getElementById("player1-cards");
  const player2Container = document.getElementById("player2-cards");
  player1Container.innerHTML = player1Cards.map(card => `<div class="card">${card.character}<br>Atk: ${card.attack}<br>Def: ${card.defense}</div>`).join("");
  player2Container.innerHTML = player2Cards.map(card => `<div class="card">${card.character}<br>Atk: ${card.attack}<br>Def: ${card.defense}</div>`).join("");
}

function setPlayerNames() {
  const player1Name = document.getElementById("player1-name").value || "Player 1";
  const player2Name = document.getElementById("player2-name").value || "Player 2";

  document.getElementById("player1-title").innerText = player1Name;
  document.getElementById("player2-title").innerText = player2Name;
}

document.getElementById("set-names").addEventListener("click", setPlayerNames);

document.getElementById("draw-card").addEventListener("click", () => {
  const newCard = drawRandomCard();
  if (newCard) {
    player1Cards.push(newCard);
    logAction("Player 1 drew a card!");
    renderCards();
  }
});

document.getElementById("player2-draw-card").addEventListener("click", () => {
  const newCard = drawRandomCard();
  if (newCard) {
    player2Cards.push(newCard);
    logAction("Player 2 drew a card!");
    renderCards();
  }
});

function logAction(action) {
  const logList = document.getElementById("log");
  const logItem = document.createElement("li");
  logItem.textContent = action;
  logList.appendChild(logItem);
}

initializeGame();
