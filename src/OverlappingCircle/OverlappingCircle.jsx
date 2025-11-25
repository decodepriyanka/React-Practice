import React, { useState } from 'react';

export default function OverlappingCircle() {
  const RADIUS = 100;
  const [circles, setCircles] = useState([]);

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check overlap with previous circles
    let overlaps = false;
    for (const c of circles) {
      const dx = x - c.x;
      const dy = y - c.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < RADIUS * 2) {
        // overlap condition
        overlaps = true;
        break;
      }
    }

    const newCircle = { x, y, overlaps };
    setCircles((prev) => [...prev, newCircle]);
  }

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100vw',
        height: '100vh',
        background: '#222',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {circles.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: c.x,
            top: c.y,
            width: RADIUS * 2,
            height: RADIUS * 2,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: c.overlaps ? 'red' : 'green',
          }}
        />
      ))}
    </div>
  );
}
