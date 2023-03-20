import styled, { keyframes } from "styled-components";

const emberAnimation = keyframes`
    0% {
      transform: translateX(0) translateY(0) scale(1) rotate(40deg) rotatey(0)
        skew(15deg, 15deg);
      opacity: 0.8;
    }
    4% {
      transform: translateX(-6vw) translateY(-25vh) scale(0.8) rotate(-30deg)
        rotatey(90deg) skew(0deg, 0deg);
      opacity: 0.75;
    }
    8% {
      transform: translateX(0vw) translateY(-50vh) scale(0.6) rotate(30deg)
        rotatey(0deg) skew(5deg, 5deg);
      opacity: 0.5;
    }
    13% {
      transform: translateX(5vw) translateY(-75vh) scale(0.4) rotate(-20deg)
        rotatey(90deg) skew(0deg, 0deg);
      opacity: 0.4;
    }
    15% {
      transform: translateX(2.5vw) translateY(-90vh) scale(0) rotate(45deg)
        rotatey(0deg) skew(10deg, 10deg);
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
`;
const EmberDiv = styled.div`
  animation: ${emberAnimation} 5s linear infinite;
`;

export default function EmberAnimation() {
  return (
    <div className="flex flex-col justify-end items-center h-full w-full blur-sm">
      <EmberDiv className={"h-20 w-20 bg-yellow-300 rounded-2xl  "} />
    </div>
  );
}
