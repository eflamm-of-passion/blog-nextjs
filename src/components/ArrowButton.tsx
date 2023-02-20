interface ArrowButtonProps {
  direction?: "right" | "left" | "top" | "bottom";
  shape?: "rectangular" | "square";
  onClick: Function;
}
export default function ArrowButton({
  direction,
  shape,
  onClick,
}: ArrowButtonProps) {
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
  let shapeContainerClasses;
  switch (shape) {
    case "rectangular":
      shapeContainerClasses = "flex m-2 w-24 h-12  text-4xl ";
      break;
    case "square":
      shapeContainerClasses =
        "flex m-2 w-10 sm:w-12 h-10 sm:h-12  text-2xl sm:text-4xl ";
      break;
    default:
      shapeContainerClasses = "flex m-2 w-20 sm:w-24 h-10 sm:h-12  ";
  }

  return (
    <div
      onClick={() => onClick()}
      className={
        shapeContainerClasses +
        "items-center justify-center p-1 rounded-xl border-2 bg-gradient-to-br from-primary to-primaryGradient cursor-pointer"
      }
    >
      <div className="flex items-center justify-center w-full h-full bg-third rounded-lg">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primaryGradient">
          {arrow}
        </span>
      </div>
    </div>
  );
}
