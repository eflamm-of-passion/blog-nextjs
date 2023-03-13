import { ReactNode } from "react";
import Text from "./Text";

interface ParagraphProps {
  size?: "normal" | "big";
  children?: ReactNode | undefined;
  className?: string;
}
function Paragraph({ size, children, className }: ParagraphProps) {
  let sizeClass = " text-sm sm:text-lg ";
  switch (size) {
    case "normal":
      sizeClass = " text-sm sm:text-lg ";
      break;
    case "big":
      sizeClass = " text-lg sm:text-xl ";
      break;
  }
  return (
    <Text
      className={sizeClass + " mt-5 sm:mt-8 whitespace-pre-wrap " + className}
    >
      {children}
    </Text>
  );
}

export default Paragraph;
