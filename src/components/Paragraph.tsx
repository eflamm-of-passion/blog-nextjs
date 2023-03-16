import { ReactNode } from "react";
import Text from "./Text";

interface ParagraphProps {
  size?: "normal" | "big";
  align?: "start" | "justify" | "end";
  children?: ReactNode | undefined;
  className?: string;
}
function Paragraph({
  size = "normal",
  align = "justify",
  children,
  className,
}: ParagraphProps) {
  let sizeClass;
  switch (size) {
    case "normal":
      sizeClass = " text-sm sm:text-lg ";
      break;
    case "big":
      sizeClass = " text-base sm:text-xl ";
      break;
  }
  let alignClass;
  switch (align) {
    case "start":
      alignClass = " text-start ";
      break;
    case "justify":
      alignClass = " text-justify ";
      break;
    case "end":
      alignClass = " text-end ";
      break;
  }
  return (
    <p
      className={
        sizeClass + align + " mt-5 sm:mt-8 whitespace-pre-wrap " + className
      }
    >
      <Text>{children}</Text>
    </p>
  );
}

export default Paragraph;
