import { PropsWithChildren } from "react";

function Paragraph(props: PropsWithChildren) {
  return (
    <p className="mt-3 font-mono text-sm sm:text-base lg:text-lg text-justify text-secondary whitespace-pre-wrap drop-shadow-white ">
      {props.children}
    </p>
  );
}

export default Paragraph;
