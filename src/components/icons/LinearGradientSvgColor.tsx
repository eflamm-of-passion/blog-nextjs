interface LinearGradientSvgColorProps {
  colors: [string, string];
}
export default function LinearGradientSvgColor({
  colors,
}: LinearGradientSvgColorProps) {
  return (
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors[0]} />
        <stop offset="100%" stopColor={colors[1]} />
      </linearGradient>
    </defs>
  );
}
