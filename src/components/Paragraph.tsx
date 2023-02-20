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
        " mt-3 font-mono text-sm sm:text-base lg:text-lg text-secondary whitespace-pre-wrap drop-shadow-white"
      }
    >
      {children}
    </p>
  );
}

export default Paragraph;
