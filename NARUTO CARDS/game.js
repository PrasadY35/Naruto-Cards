// Variables to track players and cards
let player1Cards = [];
let player2Cards = [];
let usedCards = []; // Tracks played or discarded cards
let cardBank = [
  { name: "Naruto", attack: 300, defense: 200 },
  { name: "Sasuke", attack: 400, defense: 300 },
  { name: "Kakashi", attack: 350, defense: 250 },
  { name: "Gaara", attack: 330, defense: 270 },
  { name: "Sakura", attack: 280, defense: 300 },
  { name: "Shikamaru", attack: 310, defense: 290 },
  { name: "Hinata", attack: 250, defense: 310 },
  { name: "Rock Lee", attack: 290, defense: 280 },
  { name: "Itachi", attack: 450, defense: 350 },
  { name: "Jiraiya", attack: 420, defense: 360 },
  // Add more cards here
];

let currentPlayer = 1;

// Helper function to draw a random card from the bank
function drawCard() {
  if (cardBank.length === 0) {
    if (usedCards.length > 0) {
      // Replenish the bank with shuffled used cards
      cardBank = [...usedCards];
      usedCards = [];
      alert("Card bank replenished with used cards!");
    } else {
      alert("No cards left in the bank or discard pile!");
      return null;
    }
  }

  const randomIndex = Math.floor(Math.random() * cardBank.length);
  return cardBank.splice(randomIndex, 1)[0];
}

// Function to distribute initial 7 cards to each player
function distributeCards() {
  for (let i = 0; i < 7; i++) {
    player1Cards.push(drawCard());
    player2Cards.push(drawCard());
  }
  renderCards();
}

// Function to render cards for both players
function renderCards() {
  const player1Container = document.getElementById("player1-cards");
  const player2Container = document.getElementById("player2-cards");
  player1Container.innerHTML = "";
  player2Container.innerHTML = "";

  player1Cards.forEach((card, index) => {
    const cardElement = createCardElement(card, index, 1);
    player1Container.appendChild(cardElement);
  });

  player2Cards.forEach((card, index) => {
    const cardElement = createCardElement(card, index, 2);
    player2Container.appendChild(cardElement);
  });
}

// Function to create card HTML
function createCardElement(card, index, player) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.innerHTML = `<strong>${card.name}</strong><br>ATK: ${card.attack}<br>DEF: ${card.defense}`;
  cardDiv.dataset.index = index;
  cardDiv.dataset.player = player;
  return cardDiv;
}

// Function to handle "Take Card" button
function takeCard() {
  const newCard = drawCard();
  if (!newCard) return;

  if (currentPlayer === 1) {
    player1Cards.push(newCard);
  } else {
    player2Cards.push(newCard);
  }
  renderCards();
  switchTurn();
}

// Function to switch turns
function switchTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  const turnIndicator = document.getElementById("current-turn");
  turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
}

// Function to simulate card usage
function useCard(player, cardIndex) {
  const card = player === 1 ? player1Cards.splice(cardIndex, 1)[0] : player2Cards.splice(cardIndex, 1)[0];
  usedCards.push(card); // Move card to used pile
  renderCards();
}

// Attach event listeners
document.getElementById("take-card").addEventListener("click", takeCard);

// Initial card distribution when the game starts
window.onload = () => {
  distributeCards();
  const turnIndicator = document.getElementById("current-turn");
  turnIndicator.textContent = "Player 1's Turn";
};
