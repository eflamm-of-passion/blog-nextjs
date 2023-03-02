import { ReactNode } from "react";

interface ParagraphProps {
  align?: "start" | "end" | "center" | "justify";
  children?: ReactNode | undefined;
}
function Paragraph({ align, children }: ParagraphProps) {
  const alignClass = align ? "text-" + align : "text-start";
  return (
    <p
      className={
        alignClass +
        " mt-5 sm:mt-10 font-mono text-sm sm:text-xl lg:text-xl text-secondary whitespace-pre-wrap"
      }
    >
      {children}
    </p>
  );
}

export default Paragraph;
