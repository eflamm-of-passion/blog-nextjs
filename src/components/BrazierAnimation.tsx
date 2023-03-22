import styled, { keyframes } from "styled-components";

const glowAnimation = keyframes`
    from {
        box-shadow: 0 0 130px 80px #efff44;
    }
    to {
        box-shadow: 0 0 160px 80px #efff44;
    }
`;

const BrazierDiv = styled.div`
  animation: ${glowAnimation} 4s infinite alternate;
`;

type BrazierAnimationProps = {
  className: string;
};
export default function BrazierAnimation({ className }: BrazierAnimationProps) {
  return <BrazierDiv className={className} />;
}
