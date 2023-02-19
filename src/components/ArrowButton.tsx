interface ArrowButtonProps {
  direction: "right" | "left" | "top" | "bottom";
  onClick: Function;
}
export default function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  let arrow = "right";
  switch (direction) {
    case "right":
      arrow = ">";
      break;
    case "left":
      arrow = "<";
      break;
    case "top":
      arrow = "^";
      break;
    case "bottom":
      arrow = "v";
      break;
  }
  return (
    <div
      onClick={() => onClick()}
      className="flex items-center justify-center w-24 h-12 p-1 my-8 rounded-xl border-2 bg-gradient-to-br from-primary to-primaryGradient cursor-pointer"
    >
      <div className="flex items-center justify-center w-full h-full bg-third rounded-lg">
        <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-primary to-primaryGradient">
          {arrow}
        </span>
      </div>
    </div>
  );
}
