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

  return (
    <>
      <style jsx global>{`
        @keyframes popcycle-loader {
          0% { 
            background-color: hsl(142, 100%, 35%); 
            transform: rotate(0deg) scale(1) skew(0deg);
            opacity: 1;
            filter: hue-rotate(0deg) brightness(1);
          }
          8% { 
            background-color: hsl(142, 100%, 35%); 
            transform: rotate(45deg) scale(1.15) skew(-5deg);
            opacity: 0.8;
            filter: hue-rotate(10deg) brightness(1.1);
          }
          16% { 
            background-color: hsl(142, 100%, 35%); 
            transform: rotate(90deg) scale(1.2) skew(0deg);
            opacity: 0.6;
            filter: hue-rotate(20deg) brightness(1.2);
          }
          25% { 
            background-color: hsl(214, 100%, 50%); 
            transform: rotate(135deg) scale(1.15) skew(5deg);
            opacity: 0.8;
            filter: hue-rotate(0deg) brightness(1.1);
          }
          33% { 
            background-color: hsl(214, 100%, 50%); 
            transform: rotate(180deg) scale(1) skew(0deg);
            opacity: 1;
            filter: hue-rotate(0deg) brightness(1);
          }
          41% { 
            background-color: hsl(214, 100%, 50%); 
            transform: rotate(225deg) scale(1.15) skew(-5deg);
            opacity: 0.8;
            filter: hue-rotate(-10deg) brightness(1.1);
          }
          50% { 
            background-color: hsl(214, 100%, 50%); 
            transform: rotate(270deg) scale(1.2) skew(0deg);
            opacity: 0.6;
            filter: hue-rotate(-20deg) brightness(1.2);
          }
          58% { 
            background-color: hsl(347, 100%, 60%); 
            transform: rotate(315deg) scale(1.15) skew(5deg);
            opacity: 0.8;
            filter: hue-rotate(0deg) brightness(1.1);
          }
          66% { 
            background-color: hsl(347, 100%, 60%); 
            transform: rotate(360deg) scale(1) skew(0deg);
            opacity: 1;
            filter: hue-rotate(0deg) brightness(1);
          }
          74% { 
            background-color: hsl(347, 100%, 60%); 
            transform: rotate(405deg) scale(1.15) skew(-5deg);
            opacity: 0.8;
            filter: hue-rotate(10deg) brightness(1.1);
          }
          83% { 
            background-color: hsl(347, 100%, 60%); 
            transform: rotate(450deg) scale(1.2) skew(0deg);
            opacity: 0.6;
            filter: hue-rotate(20deg) brightness(1.2);
          }
          91% { 
            background-color: hsl(142, 100%, 35%); 
            transform: rotate(495deg) scale(1.15) skew(5deg);
            opacity: 0.8;
            filter: hue-rotate(0deg) brightness(1.1);
          }
          100% { 
            background-color: hsl(142, 100%, 35%); 
            transform: rotate(540deg) scale(1) skew(0deg);
            opacity: 1;
            filter: hue-rotate(0deg) brightness(1);
          }
        }
        
        .animate-popcycle-loader {
          animation: popcycle-loader 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          transform-origin: center center;
        }
      `}</style>
      <div className={cn("text-center", className)}>
        <div 
          className={cn(
            sizeClasses[size],
            "border-2 border-pop-black mx-auto mb-4 bg-pop-green",
            "animate-popcycle-loader"
          )}
        ></div>
        <p className="systematic-caps text-pop-black animate-pulse">{text}</p>
      </div>
    </>
  );
}