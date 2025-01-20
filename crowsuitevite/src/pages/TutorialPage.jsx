import '../css/Pages.css'

export default function TutorialPage() { 
  return (
    <div className="tutorial">
        <hr></hr>
        <h1>CrowSuite - Rules</h1>
        <hr></hr>
        <h2>Players: 4 Players</h2>`

        <h2>Objective:</h2>
        <p>The goal of the game is to be the first player to get rid of all your cards by playing combinations in a specific order and adhering to the game's rules.</p>

        <h2>Card Deck:</h2>
        <p>Deck: A standard 52-card deck</p>

        <h2>Card Ranking:</h2>
        <p>Ace is the highest card.</p>
        <p>The cards are ranked from 2 - the lowest - to Ace - the highest.</p>

        <h2>Suits are ranked in the following order:</h2>
        <p>Crows - Seagulls - Ducks - Pigeons.</p>

        <p>The 2 of Pigeons is the lowest card.</p>

        <h2>Game Setup:</h2>
        <p>Deal: The dealer shuffles the deck and deals 13 cards to each player.</p>
        <p>The first player plays a card or combination of cards, and play proceeds in a clockwise direction.</p>

        <h2>Types of Card Combinations:</h2>
        <p>Here are the valid combinations that players can play:</p>

        <h2>Single Card:</h2>
        <p>A single card of any value. For example, a 7 of Ducks or an Ace of Crows.</p>

        <h2>Pair:</h2>
        <p>Two cards of the same rank. For example, a King of Seagulls and King of Ducks.</p>

        <h2>Triple:</h2>
        <p>Three cards of the same rank. For example, a 3 of Pigeons, 3 of Seagulls, and 3 of Ducks.</p>

        <h2>Straight:</h2>
        <p>A sequence of 5 consecutive cards of any suit. For example, 4 of Ducks, 5 of Pigeons, 6 of Ducks, 7 of Ducks, 8 of Crows.</p>

        <h2>Flush:</h2>
        <p>Five cards of the same suit, but not in sequence. For example, 5 of Crows, King of Crows, 9 of Crows, Jack of Crows, 2 of Crows.</p>

        <h2>Straight Flush:</h2>
        <p>Five cards that are both a straight and a flush.</p>

        <h2>Gameplay:</h2>

        <h2>Turn Sequence:</h2>
        <p>Players take turns in clockwise order, playing a card or combination of cards that is higher than the one played previously.</p>

        <p>For example, if the first player plays a 3 of Pigeons, the next player must play a higher 3 - e.g., 3 of Ducks, 3 of Seagulls, or 3 of Crows - or a higher card - like a 4, a 10, or a King.</p>
        <p>If a player cannot play a higher card or combination, they must pass their turn.</p>

        <h2>Passing:</h2>
        <p>If a player does not have a valid card or combination to play that beats the previous one, they pass their turn. Passing means you do not participate in that round until a valid play can be made.</p>

        <h2>Winning a Round:</h2>
        <p>The round ends when a player has played all their cards. This player is the winner of that round.</p>

        <h2>Continue Playing:</h2>
        <p>The game continues until one player has played all of their cards. Players can keep track of points or rounds depending on the version they are playing.</p>

        <h2>Card Ranking:</h2>

        <h2>Single Cards:</h2>
        <p>Rank by value: Ace - King - Queen - Jack - 10 - 9 - ... - 3 - 2, with Ace of Crows as the highest and 2 of Pigeons as the lowest.</p>

        <h2>Combinations:</h2>
        <p>Rank combinations by the highest card in the combination: For example, a Straight of 4 of Crows, 5 of Pigeons, 6 of Seagulls, 7 of Crows, 8 of Ducks beats a Straight of 3 of Ducks, 4 of Ducks, 5 of Pigeons, 6 of Crows, 7 of Ducks, because 8 is higher than 7.</p>

        <p>If two players play the same type of combination - e.g., both play a pair of Kings - the one with the higher-ranked suit wins. So, the pair with the King of Crows wins.</p>
`
    </div>
    
  );
}; 