import { ReactNode } from "react";

interface OutlineButtonProps {
  children: ReactNode | undefined;
  onClick?: Function;
}
export default function OutlineButton({
  children: label,
  onClick,
}: OutlineButtonProps) {
  return (
    <div
      onClick={() => (onClick ? onClick() : "")}
      className={
        "items-center justify-center p-1 rounded-xl border-2 bg-gradient-to-br from-primary to-primaryGradient cursor-pointer"
      }
    >
      <div className="flex items-center justify-center w-full h-full bg-third hover:bg-gray-900 rounded-lg text-lg">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primaryGradient">
          {label}
        </span>
      </div>
    </div>
  );
}