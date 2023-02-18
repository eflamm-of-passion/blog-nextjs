import { PropsWithChildren, ReactComponentElement } from "react";

export default function Page(props: PropsWithChildren) {
  return (
    <main className="light h-screen flex flex-col justify-between items-center bg-gradient-to-br from-third to-thirdGradient">
      {props.children}
    </main>
  );
}
