import { ReactNode } from "react";

interface TextProps {
  style?: "note" | "basic" | "highlight";
  children?: ReactNode | undefined;
  className?: string;
}
export default function Text({ style, children, className }: TextProps) {
  let styleClass = " font-mono text-secondary ";
  switch (style) {
    case "note":
      styleClass = " font-mono text-gray300 ";
      break;
    case "basic":
      styleClass = " font-mono text-secondary ";
      break;
    case "highlight":
      styleClass =
        " text-transparent bg-clip-text bg-gradient-to-br from-primary to-primaryGradient ";
      break;
  }
  return <span className={styleClass + className}>{children}</span>;
}
