interface ArrowButtonProps {
  className?: string;
  direction?: "right" | "left" | "top" | "bottom";
  shape?: "rectangular" | "square";
  onClick: Function;
  borderLess?: boolean;
}
export default function ArrowButton({
  className,
  direction,
  shape,
  onClick,
  borderLess = false,
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
      shapeContainerClasses = "flex w-24 h-12 my-2 text-4xl ";
      break;
    case "square":
      shapeContainerClasses =
        "flex w-10 sm:w-12 h-10 sm:h-12 m-2 text-3xl sm:text-4xl ";
      break;
    default:
      shapeContainerClasses = "flex w-20 sm:w-24 h-10 sm:h-12 my-2  ";
  }

  return (
    <div
      onClick={() => onClick()}
      className={
        className +
        " " +
        shapeContainerClasses +
        `items-center justify-center p-1 rounded-xl cursor-pointer select-none ${
          !borderLess
            ? "border-2 bg-gradient-to-br from-primary to-primaryGradient"
            : " "
        }`
      }
    >
      <div
        className={`flex items-center justify-center w-full h-full ${
          !borderLess ? "bg-third hover:bg-gray-900 rounded-lg" : null
        }`}
      >
        <span
          className={
            "text-transparent bg-clip-text bg-gradient-to-br from-primary to-primaryGradient"
          }
        >
          {arrow}
        </span>
      </div>
    </div>
  );
}
