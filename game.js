let player1Cards = [];
let player2Cards = [];
let cardBank = [];
let currentPlayer = "1";
let selectedCardIndex = null; // To track the selected card

// Define separate card pools based on rarity
const commonCards = [
  createCard("Sakura", 300000, 200000),
  createCard("Kakashi", 350000, 220000),
  createCard("Hinata", 320000, 240000),
  createCard("Shikamaru", 300000, 320000),
  createCard("Rock Lee", 420000, 300000),
  createCard("Neji", 340000, 310000),
  createCard("Temari", 310000, 300000),
  // Add more common cards as needed
];

const rareCards = [
  createCard("Sasuke", 400000, 300000, "rare"),
  createCard("Itachi Uchiha", 500000, 450000, "rare"),
  createCard("Gaara", 350000, 400000, "rare"),
  // Add more rare cards as needed
];

const veryRareCards = [
  createCard("Naruto Uzumaki", 450000, 250000, "very-rare"),
  createCard("Tsunade Senju", 440000, 420000, "very-rare"),
  createCard("Madara Uchiha", 600000, 550000, "very-rare"),
  createCard("Minato Namikaze", 550000, 500000, "very-rare"),
  createCard("Obito Uchiha", 520000, 480000, "very-rare"),
  // Add more very-rare cards as needed
];

// Utility to create a card
function createCard(character, attack, defense, rarity = "common") {
  return { character, attack, defense, rarity };
}

// Initialize card bank
function initializeCardBank() {
  cardBank = [...commonCards, ...rareCards, ...veryRareCards];
  shuffleArray(cardBank); // Shuffle the card bank initially
}

// Shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Draw a card with rarity probabilities
function drawRandomCard() {
  if (cardBank.length === 0) {
    alert("No cards left in the card bank!");
    return null;
  }

  const rand = Math.random() * 100;
  let card = null;

  if (rand < 35) { // 35% chance for very-rare
    if (veryRareCards.length > 0) {
      card = veryRareCards.splice(Math.floor(Math.random() * veryRareCards.length), 1)[0];
    } else {
      // Fallback to rare if no very-rare cards left
      card = rareCards.splice(Math.floor(Math.random() * rareCards.length), 1)[0];
    }
  } else if (rand < 50) { // Next 15% for rare
    if (rareCards.length > 0) {
      card = rareCards.splice(Math.floor(Math.random() * rareCards.length), 1)[0];
    } else {
      // Fallback to common if no rare cards left
      card = commonCards.splice(Math.floor(Math.random() * commonCards.length), 1)[0];
    }
  } else { // 50% for common
    if (commonCards.length > 0) {
      card = commonCards.splice(Math.floor(Math.random() * commonCards.length), 1)[0];
    } else {
      // If no common cards left, fallback to any available card
      if (rareCards.length > 0) {
        card = rareCards.splice(Math.floor(Math.random() * rareCards.length), 1)[0];
      } else if (veryRareCards.length > 0) {
        card = veryRareCards.splice(Math.floor(Math.random() * veryRareCards.length), 1)[0];
      }
    }
  }

  if (card) {
    if (card.rarity === "rare" || card.rarity === "very-rare") {
      showRareCardAnimation(card);
    }
  }

  return card;
}

// Show animation for rare and very rare cards
function showRareCardAnimation(card) {
  const overlay = document.getElementById("rare-card-overlay");
  const overlayText = document.getElementById("rare-card-text");

  if (card.rarity === "very-rare") {
    overlayText.innerHTML = `YOU GOT A VERY RARE CARD!<br>${card.character}`;
  } else if (card.rarity === "rare") {
    overlayText.innerHTML = `YOU GOT A RARE CARD!<br>${card.character}`;
  }

  overlay.classList.add("active");
}

// Hide the overlay after animation
function hideRareCardAnimation() {
  const overlay = document.getElementById("rare-card-overlay");
  overlay.classList.remove("active");
}

// Take cards
function takeCards(player) {
  if (player === "1" && player1Cards.length === 0) {
    for (let i = 0; i < 7; i++) {
      const card = drawRandomCard();
      if (card) {
        player1Cards.push(card);
      }
    }
    alert("Player 1 has received their cards!");
  } else if (player === "2" && player2Cards.length === 0) {
    for (let i = 0; i < 7; i++) {
      const card = drawRandomCard();
      if (card) {
        player2Cards.push(card);
      }
    }
    alert("Player 2 has received their cards!");
  } else {
    alert(`Player ${player} already has their cards!`);
  }
  renderCards();
}

// Render player cards
function renderCards() {
  const player1Container = document.getElementById("player1-cards");
  const player2Container = document.getElementById("player2-cards");

  // Render cards for the current player
  if (currentPlayer === "1") {
    player1Container.innerHTML = player1Cards
      .map((card, index) =>
        `<div class="card ${card.rarity}" data-index="${index}">
          <strong>${card.character}</strong><br>
          ATK: ${card.attack}<br>
          DEF: ${card.defense}
        </div>`
      )
      .join("");
    player2Container.innerHTML = `<div class="card hidden">Hidden</div>`.repeat(player2Cards.length);
  } else {
    player1Container.innerHTML = `<div class="card hidden">Hidden</div>`.repeat(player1Cards.length);
    player2Container.innerHTML = player2Cards
      .map((card, index) =>
        `<div class="card ${card.rarity}" data-index="${index}">
          <strong>${card.character}</strong><br>
          ATK: ${card.attack}<br>
          DEF: ${card.defense}
        </div>`
      )
      .join("");
  }

  // Add click events to cards for selection
  const cards = document.querySelectorAll(".card:not(.hidden)");
  cards.forEach(card => {
    card.addEventListener("click", function () {
      selectCard(this);
    });
  });
}

// Select a card
function selectCard(cardElement) {
  const index = cardElement.getAttribute("data-index");
  selectedCardIndex = index;

  // Highlight the selected card
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => card.classList.remove("selected"));
  cardElement.classList.add("selected");
}

// Handle "Throw Card" button
function throwCard() {
  if (selectedCardIndex === null) {
    alert("Please select a card to throw!");
    return;
  }

  const currentPlayerCards = currentPlayer === "1" ? player1Cards : player2Cards;
  const thrownCard = currentPlayerCards.splice(selectedCardIndex, 1)[0];

  // Redirect to throw-card.html with card details
  window.location.href = `throw-card.html?name=${encodeURIComponent(thrownCard.character)}&attack=${thrownCard.attack}&defense=${thrownCard.defense}`;
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
  renderCards();
  document.getElementById("current-turn").textContent = "Player 1's Turn";

  // Hide overlay after showing it
  const overlay = document.getElementById("rare-card-overlay");
  overlay.addEventListener("animationend", hideRareCardAnimation);
}

// Add event listeners
document.getElementById("player1-take-cards").addEventListener("click", () => {
  if (currentPlayer === "1") {
    takeCards("1");
  } else {
    alert("It's not Player 1's turn!");
  }
});

document.getElementById("player2-take-cards").addEventListener("click", () => {
  if (currentPlayer === "2") {
    takeCards("2");
  } else {
    alert("It's not Player 2's turn!");
  }
});

document.getElementById("throw-card").addEventListener("click", throwCard);

initializeGame();
