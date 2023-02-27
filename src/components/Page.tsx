import { ReactNode } from "react";

export interface PageProps {
  children: ReactNode | undefined;
}
export default function Page(props: PageProps) {
  return (
    <main
      className={
        "flex justify-center h-full min-h-screen bg-gradient-to-br from-third to-thirdGradient overflow-auto"
      }
    >
      <div className="flex flex-col w-full pt-4 px-6 sm:px-0 lg:max-w-4xl">
        {props.children}
      </div>
    </main>
  );
}
