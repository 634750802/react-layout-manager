import { useMemo, useState } from 'react';
import { Rect } from '../../src/core/types.js';
import { ComponentWrapper } from '../../src/index.js';

interface BoxProps {
  initialRect: Rect
  onReady (id: string): void
}

export default function Box ({ initialRect, onReady }: BoxProps) {
  const color = useMemo(randomColor, []);
  const [rect, setRect] = useState(initialRect);
  return (
    <ComponentWrapper draggable rect={rect} onRectChange={setRect} onReady={onReady}>
      {(dragging, draggableProps) => (
        <div className="box" style={{ backgroundColor: color }} {...draggableProps}></div>
      )}
    </ComponentWrapper>
  );
}

function randomColor () {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  return `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`;
}