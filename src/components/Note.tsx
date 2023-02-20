import { ReactNode } from "react";

interface NoteProps {
  align?: "start" | "end" | "center" | "justify";
  children?: ReactNode | undefined;
}
function Note({ align, children }: NoteProps) {
  const alignClass = align ? "text-" + align : "text-start";
  return (
    <p
      className={
        alignClass +
        " mt-3 font-mono text-sm sm:text-base lg:text-lg text-secondary whitespace-pre-wrap drop-shadow-white italic"
      }
    >
      {children}
    </p>
  );
}

export default Note;
