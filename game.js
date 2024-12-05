let player1Cards = [];
let player2Cards = [];
let cardBank = [];
let currentPlayer = "1";

// Utility to create a card
function createCard(character, attack, defense) {
  return { character, attack, defense };
}

// Initialize card bank
function initializeCardBank() {
  cardBank.push(createCard("Naruto", 450000, 250000));
  cardBank.push(createCard("Sasuke", 400000, 300000));
  cardBank.push(createCard("Sakura", 300000, 200000));
  cardBank.push(createCard("Kakashi", 350000, 220000));
  cardBank.push(createCard("Hinata", 320000, 240000));
  cardBank.push(createCard("Itachi", 500000, 450000));
  cardBank.push(createCard("Gaara", 350000, 400000));
  cardBank.push(createCard("Shikamaru", 300000, 320000));
  cardBank.push(createCard("Rock Lee", 420000, 300000));
  cardBank.push(createCard("Jiraiya", 480000, 450000));
  cardBank.push(createCard("Orochimaru", 460000, 430000));
  cardBank.push(createCard("Tsunade", 440000, 420000));
  cardBank.push(createCard("Madara", 600000, 550000));
  cardBank.push(createCard("Minato", 550000, 500000));
  cardBank.push(createCard("Obito", 520000, 480000));
}

// Shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Draw a card
function drawRandomCard() {
  if (cardBank.length === 0) {
    alert("No cards left in the card bank!");
    return null;
  }
  return cardBank.splice(Math.floor(Math.random() * cardBank.length), 1)[0];
}

// Distribute 7 cards to a player
function distributeCardsToPlayer(player) {
  for (let i = 0; i < 7; i++) {
    const card = drawRandomCard();
    if (card) {
      if (player === "1") player1Cards.push(card);
      else player2Cards.push(card);
    }
  }
  renderCards();
}

// Render player cards
function renderCards() {
  const player1Container = document.getElementById("player1-cards");
  const player2Container = document.getElementById("player2-cards");

  if (currentPlayer === "1") {
    player1Container.innerHTML = player1Cards
      .map(card => `<div class="card">${card.character}<br>ATK: ${card.attack}<br>DEF: ${card.defense}</div>`)
      .join("");
    player2Container.innerHTML = `<div class="card hidden">Hidden</div>`.repeat(player2Cards.length);
  } else {
    player1Container.innerHTML = `<div class="card hidden">Hidden</div>`.repeat(player1Cards.length);
    player2Container.innerHTML = player2Cards
      .map(card => `<div class="card">${card.character}<br>ATK: ${card.attack}<br>DEF: ${card.defense}</div>`)
      .join("");
  }
}

// Handle "Take Cards" button
function handleTakeCards(player) {
  if (player === "1" && player1Cards.length === 0) {
    distributeCardsToPlayer("1");
    alert("Player 1 has received their cards!");
  } else if (player === "2" && player2Cards.length === 0) {
    distributeCardsToPlayer("2");
    alert("Player 2 has received their cards!");
  } else {
    alert(`Player ${player} already has their cards!`);
  }
}

// End turn
function endTurn() {
  currentPlayer = currentPlayer === "1" ? "2" : "1";
  document.getElementById("current-turn").textContent = `Player ${currentPlayer}'s Turn`;
  renderCards();
}

// Initialize the game
function initializeGame() {
  initializeCardBank();
  renderCards(); // Render empty card slots
  document.getElementById("current-turn").textContent = "Player 1's Turn";
}

// Attach event listeners
document.getElementById("player1-take-cards").addEventListener("click", () => {
  handleTakeCards("1");
});

document.getElementById("player2-take-cards").addEventListener("click", () => {
  handleTakeCards("2");
});

document.getElementById("end-turn").addEventListener("click", endTurn);

// Start the game
initializeGame();