import { PropsWithChildren } from "react";

function PageTitle(props: PropsWithChildren) {
  return (
    <h1 className="w-full h-12 sm:h-20 text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-primary to-primaryGradient">
      {props.children}
    </h1>
  );
}

export default PageTitle;
