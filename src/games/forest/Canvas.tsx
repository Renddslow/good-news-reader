import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {}, []);

  return <canvas ref={ref} />;
};

export default Canvas;
