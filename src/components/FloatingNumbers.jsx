import React, { useMemo } from 'react';

const SYMBOLS = ['360°', '180°', '90°', '∠x', '∠y', '🧭', '📐', '✂️', '🍕', '55°', '125°', '∠a=∠c', '110°+70°=180°', '360°=120°+150°+90°', '45°', '135°'];

export default function FloatingNumbers() {
  const items = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      left: `${(i * 6.5 + 4) % 92}%`,
      delay: `${(i * 1.5) % 18}s`,
      size: `${1.6 + (i % 3) * 0.5}rem`
    }));
  }, []);

  return (
    <div className="floating-numbers">
      {items.map(item => (
        <span
          key={item.id}
          className="floating-number"
          style={{
            left: item.left,
            animationDelay: item.delay,
            fontSize: item.size
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}
