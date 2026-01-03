import { useState, useEffect } from "react";
import "./App.css"

function Cell({ color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cell"
      style={{ backgroundColor: color }}
    />
  );
}

export default function BlinkingGrid() {
  const [gridSize] = useState(3);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [cellColors, setCellColors] = useState(Array(9).fill("transparent"));

  const allCells = Array.from({ length: gridSize * gridSize });

  const randomIndex = () => Math.floor(Math.random() * allCells.length);

  // play blinking sequence
  const playSequence = async (seq) => {
    setIsPlayingSequence(true);
    for (let i = 0; i < seq.length; i++) {
      setActiveIndex(seq[i]);
      setCellColors((prev) =>
        prev.map((_, idx) => (idx === seq[i] ? "yellow" : "transparent")),
      );
      await new Promise((r) => setTimeout(r, 600));
      setCellColors(Array(9).fill("transparent"));
      await new Promise((r) => setTimeout(r, 200));
    }
    setIsPlayingSequence(false);
    setActiveIndex(null);
  };

  const startGame = async () => {
    setScore(0);
    const firstSeq = [randomIndex()];
    setSequence(firstSeq);
    setUserInput([]);
    await playSequence(firstSeq);
  };

  const nextRound = async () => {
    const newSeq = [...sequence, randomIndex()];
    setSequence(newSeq);
    setUserInput([]);
    await new Promise((r) => setTimeout(r, 2000));
    await playSequence(newSeq);
  };

  const handleCellClick = async (index) => {
    if (isPlayingSequence) return;

    const nextInput = [...userInput, index];
    setUserInput(nextInput);

    const expected = sequence[nextInput.length - 1];

    if (index === expected) {
      setCellColors((prev) =>
        prev.map((_, i) => (i === index ? "green" : prev[i])),
      );
      await new Promise((r) => setTimeout(r, 300));
      setCellColors(Array(9).fill("transparent"));

      if (nextInput.length === sequence.length) {
        setScore((s) => s + 1);
        nextRound();
      }
    } else {
      // wrong click
      setCellColors((prev) =>
        prev.map((_, i) => (i === index ? "red" : prev[i])),
      );
      await new Promise((r) => setTimeout(r, 1000));
      setCellColors(Array(9).fill("transparent"));
      setScore(0);
      setSequence([]);
      setUserInput([]);
    }
  };

  return (
    <div className="wrapper">
      <h2>Memory Blink Game</h2>
      <p>Score: {score}</p>
      <button onClick={startGame} disabled={isPlayingSequence}>
        Start
      </button>

      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {allCells.map((_, index) => (
          <Cell
            key={index}
            color={cellColors[index]}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
