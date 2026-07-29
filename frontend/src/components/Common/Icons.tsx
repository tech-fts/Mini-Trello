/**
 * Inline SVG icons — Lucide-style, minimal 24px strokes.
 * DRY: Single source for icon SVGs; components import only what they need.
 * SOLID: Each icon is a pure function component (SRP).
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function icon(paths: string | string[], displayName: string) {
  const d = Array.isArray(paths) ? paths : [paths];
  const Component = ({ size = 20, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {d.map((path, i) => (
        <path key={i} d={path} />
      ))}
    </svg>
  );
  Component.displayName = displayName;
  return Component;
}

export const PlusIcon = icon(
  "M12 5v14M5 12h14",
  "PlusIcon",
);

export const TrashIcon = icon(
  ["M3 6h18", "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"],
  "TrashIcon",
);

export const LogOutIcon = icon(
  ["M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4", "M16 17l5-5-5-5", "M21 12H9"],
  "LogOutIcon",
);

export const CloseIcon = icon(
  ["M18 6L6 18", "M6 6l12 12"],
  "CloseIcon",
);

export const SunIcon = icon(
  [
    "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42",
  ],
  "SunIcon",
);

export const MoonIcon = icon(
  "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
  "MoonIcon",
);

export const ClipboardIcon = icon(
  ["M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"],
  "ClipboardIcon",
);

export const ColumnsIcon = icon(
  ["M4 6h16M4 10h16M4 14h16M4 18h16"],
  "ColumnsIcon",
);

export const LayoutIcon = icon(
  ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"],
  "LayoutIcon",
);
