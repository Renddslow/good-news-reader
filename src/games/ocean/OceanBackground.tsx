import React from 'react';
import styled, { keyframes } from 'styled-components';

const ANIMATION_DURATION = '90s';

const gradientMovement = keyframes`
  0% {
    bottom: 0;
  }

  100% {
    bottom: calc(-7000px + 100vh - 50px);
  }
`;

const BackgroundGradient = styled.div`
  background: linear-gradient(
    #fffa,
    #20b2ab 10%,
    #1aa3a6,
    #1395a1,
    #0d869d,
    #067898,
    #006993,
    #002
  );
  width: 120%;
  left: -10%;
  height: 7000px;
  display: block;
  position: absolute;
  animation-name: ${gradientMovement};
  animation-duration: ${ANIMATION_DURATION};
  animation-fill-mode: forwards;
  z-index: 12;
  filter: url(#filter);
`;

const noiseMovement = keyframes`
  0% {
    top: 0;
  }

  100% {
    top: -100%;
  }
`;

const OceanNoise = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 271 271' xmlns='http://www.w3.org/2000/svg' %3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.55' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  position: absolute;
  width: 200%;
  height: 200%;
  top: 0;
  display: block;
  z-index: 26;
  mix-blend-mode: screen;
  filter: url(#filter) contrast(10%) saturation(0);
  opacity: 0.2;
  animation-name: ${noiseMovement};
  animation-duration: ${ANIMATION_DURATION};
`;

const volumetricMovement = keyframes`
  0% {
    transform: perspective(10px) rotatex(5deg) rotatez(0deg);
  }

  30% {
    top: -300px;
  }

  30% {
    opacity: 0.2;
  }

  42% {
    opacity: 0;
  }

  65% {
    top: 200px;
  }


  100% {
    top: 200px;
    transform: rotate(45deg);
    opacity: 0;
  }
`;

const VolumetricLight = styled.div`
  width: 100%;
  position: absolute;
  top: -300px;
  height: 110%;
  display: block;
  z-index: 25;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 1%,
    rgba(255, 255, 255, 1) 7%,
    rgba(255, 255, 255, 1) 8%,
    rgba(0, 0, 0, 1) 12%,
    rgba(0, 0, 0, 1) 14%,
    rgba(255, 255, 255, 1) 16%,
    rgba(255, 255, 255, 1) 18%,
    rgba(0, 0, 0, 1) 21%,
    rgba(0, 0, 0, 1) 25%,
    rgba(255, 255, 255, 1) 27%,
    rgba(255, 255, 255, 1) 28%,
    rgba(0, 0, 0, 1) 30%,
    rgba(0, 0, 0, 1) 33%,
    rgba(255, 255, 255, 1) 36%,
    rgba(255, 255, 255, 1) 39%,
    rgba(193, 187, 187, 1) 40%,
    rgba(0, 0, 0, 1) 43%,
    rgba(0, 0, 0, 1) 60%,
    rgba(255, 255, 255, 1) 61%,
    rgba(255, 255, 255, 1) 62%,
    rgba(0, 0, 0, 1) 64%,
    rgba(0, 0, 0, 1) 67%,
    rgba(0, 0, 0, 1) 68%,
    rgba(255, 255, 255, 1) 69%,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 1) 89%,
    rgba(235, 231, 231, 1) 90%,
    rgba(255, 255, 255, 1) 91%,
    rgba(0, 0, 0, 1) 93%
  );
  transform: perspective(10px) rotatex(5deg) rotatez(0deg);
  transform-style: flat;
  mix-blend-mode: screen;
  opacity: 0.2;
  animation-name: ${volumetricMovement};
  animation-duration: ${ANIMATION_DURATION};
  animation-fill-mode: forwards;
  transform-origin: 0 0;
  filter: url(#filter);
`;

const Filter = styled.svg`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  height: 100vh;
  display: block;
  overflow-y: hidden;
  margin: 0 auto;
`;

const OceanBackground = ({ children }) => (
  <>
    <Container>
      <VolumetricLight />
      <OceanNoise />
      <BackgroundGradient />
      {children}
    </Container>
    <Filter>
      <defs>
        <filter id="filter">
          <feTurbulence
            id="turbulence"
            type="fractalNoise"
            baseFrequency="0.0025"
            numOctaves="5"
            result="NOISE"
          />
          <feGaussianBlur in="SourceGraphic" result="BLURRED" stdDeviation="1" />
          <feDisplacementMap
            id="displacer"
            in2="NOISE"
            in="BLURRED"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="R"
            result="DISPLACED"
          />
        </filter>
      </defs>
    </Filter>

    <Filter viewBox="0 0 271 271" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.55"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>

      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </Filter>
  </>
);

export default OceanBackground;
