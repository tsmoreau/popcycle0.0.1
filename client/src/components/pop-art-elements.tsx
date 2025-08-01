import { ReactNode } from "react";

interface PopArtContainerProps {
  children: ReactNode;
  color?: "green" | "blue" | "red";
  pattern?: "dots" | "diagonal" | "geometric";
  shadow?: boolean;
  className?: string;
  id?: string;
}

export function PopArtContainer({ 
  children, 
  color = "green", 
  pattern, 
  shadow = false,
  className = "",
  id
}: PopArtContainerProps) {
  const colorClasses = {
    green: "border-pop-green text-pop-green",
    blue: "border-pop-blue text-pop-blue", 
    red: "border-pop-red text-pop-red",
  };

  const patternClasses = {
    dots: `dots-pattern-${color}`,
    diagonal: "diagonal-cut",
    geometric: "geometric-border",
  };

  const shadowClasses = {
    green: "pop-shadow-green",
    blue: "pop-shadow-blue", 
    red: "pop-shadow-red",
  };

  return (
    <div 
      id={id}
      className={`
        transform-pop
        ${pattern ? patternClasses[pattern] : ""}
        ${shadow ? shadowClasses[color] : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface QRCodeElementProps {
  code: string;
  size?: "sm" | "md" | "lg";
  color?: "green" | "blue" | "red";
}

export function QRCodeElement({ code, size = "md", color = "green" }: QRCodeElementProps) {
  const sizeClasses = {
    sm: "w-16 h-16 text-sm",
    md: "w-24 h-24 text-lg",
    lg: "w-32 h-32 text-xl",
  };

  const colorClasses = {
    green: "border-pop-green",
    blue: "border-pop-blue",
    red: "border-pop-red",
  };

  return (
    <div className={`
      qr-pop-art
      ${sizeClasses[size]}
      ${colorClasses[color]}
      flex items-center justify-center helvetica-bold
    `}>
      <span className="sr-only">QR Code: {code}</span>
    </div>
  );
}

interface MetricCardProps {
  value: string | number;
  label: string;
  color?: "green" | "blue" | "red";
}

export function MetricCard({ value, label, color = "green" }: MetricCardProps) {
  const colorClasses = {
    green: "text-pop-green",
    blue: "text-pop-blue",
    red: "text-pop-red",
  };

  return (
    <div className="text-center">
      <div className={`text-5xl helvetica-bold ${colorClasses[color]} mb-2`}>
        {value}
      </div>
      <div className="systematic-caps text-sm text-pop-gray">
        {label}
      </div>
    </div>
  );
}

interface TransformationVisualizerProps {
  steps: { title: string; description: string; color: "green" | "blue" | "red" }[];
}

export function TransformationVisualizer({ steps }: TransformationVisualizerProps) {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className={`w-4 h-4 rounded-full bg-pop-${step.color}`} />
          <div className="flex-1">
            <div className="helvetica-bold">{step.title}</div>
            <div className="text-pop-gray">{step.description}</div>
          </div>
          <div className="text-pop-gray text-sm">
            Step {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
}
