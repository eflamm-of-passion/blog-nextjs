import { PropsWithChildren } from "react";

function SectionTitle(props: PropsWithChildren) {
  return (
    <h2 className="mt-2 sm:mt-7 sm:mb-5 text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-primary to-primaryGradient">
      ▮ {props.children}
    </h2>
  );
}

export default SectionTitle;
