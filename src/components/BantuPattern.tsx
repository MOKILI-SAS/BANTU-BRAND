import React from "react";

interface BantuPatternProps {
  className?: string;
  variant?: "horizontal" | "corner" | "full" | "divider";
  opacity?: number;
  color?: "default" | "gold" | "red" | "subtle";
}

export function BantuPattern({
  className = "",
  variant = "horizontal",
  opacity = 1,
  color = "default",
}: BantuPatternProps) {
  const getFillColors = () => {
    switch (color) {
      case "gold":
        return { p1: "#FFBF00", p2: "#F36F09", p3: "#D9230F" };
      case "red":
        return { p1: "#D9230F", p2: "#F36F09", p3: "#A01505" };
      case "subtle":
        return { p1: "rgba(255, 191, 0, 0.15)", p2: "rgba(243, 111, 9, 0.15)", p3: "rgba(217, 35, 15, 0.15)" };
      default:
        // Charte officielle Bantu Brand : Rouge, Orange, Jaune
        return { p1: "#D9230F", p2: "#F36F09", p3: "#FFBF00" };
    }
  };

  const { p1, p2, p3 } = getFillColors();

  if (variant === "divider") {
    return (
      <div className={`w-full overflow-hidden leading-none flex items-center justify-center ${className}`} style={{ opacity }}>
        <svg
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          className="w-full h-3 md:h-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="bantu-chevron" width="60" height="24" patternUnits="userSpaceOnUse">
              {/* Chevron 1 - Rouge */}
              <polygon points="0,12 15,0 30,12 15,24" fill={p1} />
              {/* Inner Diamond - Orange */}
              <polygon points="15,4 25,12 15,20 5,12" fill={p2} />
              {/* Chevron 2 - Jaune */}
              <polygon points="30,12 45,0 60,12 45,24" fill={p3} />
              {/* Center point */}
              <circle cx="15" cy="12" r="2.5" fill="#FAF7F2" />
              <circle cx="45" cy="12" r="2.5" fill="#FAF7F2" />
            </pattern>
          </defs>
          <rect width="100%" height="24" fill="url(#bantu-chevron)" />
        </svg>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className={`overflow-hidden ${className}`} style={{ opacity }}>
        <svg
          viewBox="0 0 600 32"
          className="w-full h-4 md:h-6"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="bantu-band" width="48" height="32" patternUnits="userSpaceOnUse">
              <polygon points="0,0 24,16 0,32" fill={p1} />
              <polygon points="24,16 48,0 48,32" fill={p2} />
              <polygon points="12,8 24,16 12,24" fill="#FFBF00" />
              <polygon points="36,8 48,16 36,24" fill={p3} />
            </pattern>
          </defs>
          <rect width="100%" height="32" fill="url(#bantu-band)" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ opacity }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="0,0 100,0 50,50" fill={p1} opacity="0.9" />
        <polygon points="100,0 100,100 50,50" fill={p2} opacity="0.9" />
        <polygon points="100,100 0,100 50,50" fill={p3} opacity="0.9" />
        <polygon points="0,100 0,0 50,50" fill={p1} opacity="0.9" />
        <circle cx="50" cy="50" r="12" fill="#FAF7F2" />
        <circle cx="50" cy="50" r="6" fill={p2} />
      </svg>
    </div>
  );
}
