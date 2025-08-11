import { cn } from "@/lib/utils";

interface LoadingSquareProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'blue' | 'red' | 'black';
  text?: string;
  className?: string;
}

export function LoadingSquare({ 
  size = 'md', 
  color = 'green', 
  text = 'Loading...', 
  className 
}: LoadingSquareProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const colorClasses = {
    green: 'bg-pop-green',
    blue: 'bg-pop-blue',
    red: 'bg-pop-red',
    black: 'bg-pop-black'
  };

  return (
    <div className={cn("text-center", className)}>
      <div className={cn(
        sizeClasses[size],
        colorClasses[color],
        "border-2 border-pop-black mx-auto mb-4 animate-pulse"
      )}></div>
      <p className="systematic-caps text-pop-black">{text}</p>
    </div>
  );
}