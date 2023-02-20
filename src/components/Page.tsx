import { ReactNode } from "react";

export interface PageProps {
  align?: "start" | "center" | "end";
  children: ReactNode | undefined;
}
export default function Page(props: PageProps) {
  let flexAlignment = "start";
  switch (props.align) {
    case "start":
      flexAlignment = "items-start ";
      break;
    case "center":
      flexAlignment = "items-center ";
      break;
    case "end":
      flexAlignment = "items-end ";
      break;
  }
  return (
    <main
      className={
        flexAlignment +
        "light h-screen flex flex-col justify-between bg-gradient-to-br from-third to-thirdGradient overflow-auto"
      }
    >
      {props.children}
    </main>
  );
}
