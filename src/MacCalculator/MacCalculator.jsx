import { useState } from 'react';
import './App.css';

export default function MacCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperator = (op) => {
    setPreviousValue(parseFloat(display));
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const calculate = () => {
    if (operator === null || previousValue === null) return;

    const current = parseFloat(display);
    let result = 0;

    switch (operator) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '×':
        result = previousValue * current;
        break;
      case '÷':
        result = current === 0 ? 'Error' : previousValue / current;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>

      <div className="buttons">
        <button className="gray" onClick={handleClear}>
          AC
        </button>
        <button className="gray" onClick={toggleSign}>
          ±
        </button>
        <button className="gray" onClick={percentage}>
          %
        </button>
        <button className="orange" onClick={() => handleOperator('÷')}>
          ÷
        </button>

        <button onClick={() => handleNumber(7)}>7</button>
        <button onClick={() => handleNumber(8)}>8</button>
        <button onClick={() => handleNumber(9)}>9</button>
        <button className="orange" onClick={() => handleOperator('×')}>
          ×
        </button>

        <button onClick={() => handleNumber(4)}>4</button>
        <button onClick={() => handleNumber(5)}>5</button>
        <button onClick={() => handleNumber(6)}>6</button>
        <button className="orange" onClick={() => handleOperator('-')}>
          −
        </button>

        <button onClick={() => handleNumber(1)}>1</button>
        <button onClick={() => handleNumber(2)}>2</button>
        <button onClick={() => handleNumber(3)}>3</button>
        <button className="orange" onClick={() => handleOperator('+')}>
          +
        </button>

        <button className="zero" onClick={() => handleNumber(0)}>
          0
        </button>
        <button onClick={() => handleNumber('.')}>.</button>
        <button className="orange" onClick={calculate}>
          =
        </button>
      </div>
    </div>
  );
}
