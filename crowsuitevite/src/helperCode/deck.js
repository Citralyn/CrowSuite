class Card {
    value;
    number; 
    suit;

    constructor(value, number, suit) {
        this.value = value;
        this.number = number;
        this.suit = suit;
    }
}

function generateDeck() {
    let cards = [];
    let birds = ["pigeon", "duck", "seagull", "crow"];

    let card_index = 1; 

    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < 4; j++) {
            let card = new Card(card_index, i, birds[j]);
            cards.push(card); 
        
            card_index += 1;
        }
    }

    return cards; 
}

function shuffleCards(given_cards) {
  let c = given_cards.length;

  while (c != 0) {
    let r = Math.floor(Math.random() * c);
    c--; 

    [given_cards[c], given_cards[r]] = [given_cards[r], given_cards[c]];
  }
}

export { generateDeck, shuffleCards };