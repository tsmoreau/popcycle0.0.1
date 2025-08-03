import * as React from "react";
import { cn } from "@/lib/utils";

interface PopArtContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "green" | "blue" | "red" | "black";
  pattern?: "dots" | "stripes" | "geometric";
  shadow?: boolean;
}

export function PopArtContainer({
  className,
  color = "green",
  pattern,
  shadow = false,
  children,
  ...props
}: PopArtContainerProps) {
  const colorClasses = {
    green: shadow ? "pop-shadow-green" : "",
    blue: shadow ? "pop-shadow-blue" : "",
    red: shadow ? "pop-shadow-red" : "",
    black: shadow ? "pop-shadow-black" : "",
  };

  return (
    <div
      className={cn("relative", shadow && colorClasses[color], className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface QRCodeElementProps extends React.HTMLAttributes<HTMLDivElement> {
  qrCode: string;
  size?: "sm" | "md" | "lg";
}

export function QRCodeElement({
  qrCode,
  size = "md",
  className,
  ...props
}: QRCodeElementProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div
      className={cn(
        "bg-white border-2 border-pop-black flex items-center justify-center",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <div className="text-xs systematic-caps text-center">
        <div>{qrCode}</div>
      </div>
    </div>
  );
}
