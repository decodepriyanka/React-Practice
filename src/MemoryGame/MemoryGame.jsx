import { useEffect, useState } from 'react';
import './App.css';

function MemoryGame() {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]); // cant click on it again they should be disabled
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);
  console.log(cards);
  const handleGrisSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) {
      setGridSize(size);
    }
  };

  //logic for generating random cards
  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [
      ...Array(pairCount)
        .keys()
        .map((n) => n + 1),
    ];
    //{id:,number:} --> keep array like this to uniquely identify the numbers
    const suffledCard = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));
    setCards(suffledCard);
    //whenever new game start these will be reset
    setFlipped([]);
    setSolved([]);
    setWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };
  const handleClick = (id) => {
    if (disabled || won) return;
    if (flipped.length === 0) {
      // no card flipped yet
      setFlipped([id]);
      return;
    }
    if (flipped.length === 1) {
      setDisabled(true); // not able to flip third card
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        //check match logic
        checkMatch(id);
      } else {
        // if clicked on same button twice
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  //when a card is flipped , if a card is flipped or not
  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);
  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      // when all the numbers are in solved
      setWon(true);
    }
  }, [solved, cards]);
  return (
    <div className="container">
      <h1 className="title"> Memory Game</h1>
      <div className="input-parent">
        <label htmlFor="gridSize" className="input-label">
          Grid size (max 10)
        </label>
        <input
          type="number"
          id="gridSize"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGrisSizeChange}
          className="user-input"
        />
      </div>
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0,1fr))`,
          width: `min(100%,${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => {
          return (
            <div
              className={`cards ${
                isFlipped(card.id)
                  ? isSolved(card.id)
                    ? 'solved-card'
                    : 'flipped-card'
                  : 'not-Flipped'
              }`}
              key={card.id}
              onClick={() => handleClick(card.id)}
            >
              {isFlipped(card.id) ? card.number : '?'}
            </div>
          );
        })}
      </div>
      {won && <div className="winner-message"> You Won!</div>}
      <button onClick={initializeGame} className="reset-btn">
        {won ? 'Play Again !' : 'Reset the Game'}
      </button>
    </div>
  );
}

export default MemoryGame;
