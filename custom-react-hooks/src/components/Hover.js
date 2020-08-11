import React from 'react';
import { Card } from '../Elements';
import black from '../black.png';
import { useHover, useWindowWidth, useMesure } from '../hooks';

export const Hover = () => {
  const [isHovered, bind] = useHover();
  // const [bounds, {ref}] = useMesure();
  // console.log("Hover -> bounds", bounds)
  const windowWidth = useWindowWidth();
  console.log('Hover -> windowWidth', windowWidth);
  if (windowWidth < 500) {
    return null;
  }

  return (
    <div>
      <p>{isHovered ? 'Hovered' : 'Not Hovered'}</p>
      <Card {...bind} style={{ background: 'var(--black)' }}>
        {/* ref={ref} */}
        <h3>Some card</h3>
        <img src={black} />
      </Card>
    </div>
  );
};
