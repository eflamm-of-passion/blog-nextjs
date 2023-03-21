import styled, { keyframes } from "styled-components";

export default function EmberAnimation() {
  const duration = 5 * (1 + Math.random());
  const delay = Math.random() * duration;
  const rangeAndDirectionFactor =
    (1 + Math.random() * 0.5) * (Math.round(Math.random()) ? 1 : -1);
  const rangeFactorOdd = 1 + Math.random() * 0.7;
  const rangeFactorEven = 1 + Math.random() * 0.7;
  const width = 1 * (1 + Math.random());
  const height = 1 * (1 + Math.random());

  let color;
  switch (Math.floor(Math.random() * 3) + 1) {
    case 1:
      color = "bg-red-600";
      break;
    case 2:
      color = "bg-yellow-300";
      break;
    case 3:
      color = "bg-orange-500";
      break;
  }

  const emberAnimation = keyframes`
      0% {
        transform: translateX(0) translateY(0) scale(1) rotate(${
          40 * rangeAndDirectionFactor
        }deg) rotatey(0)
          skew(${15 * rangeAndDirectionFactor}deg, ${
    15 * rangeAndDirectionFactor
  }deg);
        opacity: 0.8;
      }
      5% {
        transform: translateX(${-6 * rangeAndDirectionFactor}vw) translateY(${
    -25 * rangeFactorEven
  }vh) scale(0.8) rotate(${-30 * rangeAndDirectionFactor}deg)
          rotatey(${90 * rangeAndDirectionFactor}deg) skew(0deg, 0deg);
        opacity: 0.75;
      }
      10% {
        transform: translateX(0vw) translateY(${
          -50 * rangeFactorOdd
        }vh) scale(0.6) rotate(${30 * rangeAndDirectionFactor}deg)
          rotatey(0deg) skew(${5 * rangeAndDirectionFactor}deg, ${
    5 * rangeAndDirectionFactor
  }deg);
        opacity: 0.5;
      }
      15% {
        transform: translateX(${5 * rangeAndDirectionFactor}vw) translateY(${
    -75 * rangeFactorEven
  }vh) scale(0.4) rotate(${-20 * rangeAndDirectionFactor}deg)
          rotatey(${90 * rangeAndDirectionFactor}deg) skew(0deg, 0deg);
        opacity: 0.4;
      }
      20% {
        transform: translateX(${2.5 * rangeAndDirectionFactor}vw) translateY(${
    -90 * rangeFactorOdd
  }vh) scale(0) rotate(${45 * rangeAndDirectionFactor}deg)
          rotatey(0deg) skew(${10 * rangeAndDirectionFactor}deg, ${
    10 * rangeAndDirectionFactor
  }deg);
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
  `;
  const EmberDiv = styled.div`
    animation: ${emberAnimation} ${duration}s linear infinite;
    animation-delay: ${delay}s;
    opacity: 0;
    width: ${width}rem;
    height: ${height}rem;
  `;
  return <EmberDiv className={color + " rounded-sm blur-sm xs:blur-lg "} />;
}
