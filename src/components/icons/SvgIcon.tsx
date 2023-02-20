import { ReactNode } from "react";
import LinearGradientSvgColor from "./LinearGradientSvgColor";

interface SvgIconProps {
  size?: number;
  colors?: [string, string];
  children: ReactNode | undefined;
}
export function SvgIcon({ size, colors, children }: SvgIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={colors ? "url(#gradient)" : "#fff"}
      width={size ?? 18}
      height={size ?? 18}
      viewBox="0 0 24 24"
    >
      {colors ? <LinearGradientSvgColor colors={colors} /> : ""}
      {children}
    </svg>
  );
}
