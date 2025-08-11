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
        @keyframes popcycle-spin {
          0% { 
            transform: rotate(0deg) scale(1);
          }
          25% { 
            transform: rotate(90deg) scale(1.1);
          }
          50% { 
            transform: rotate(180deg) scale(1);
          }
          75% { 
            transform: rotate(270deg) scale(1.1);
          }
          100% { 
            transform: rotate(360deg) scale(1);
          }
        }
        
        @keyframes popcycle-colors {
          0%, 25% { 
            background-color: hsl(142, 100%, 35%);
          }
          30%, 55% { 
            background-color: hsl(214, 100%, 50%);
          }
          60%, 85% { 
            background-color: hsl(347, 100%, 60%);
          }
          90%, 100% { 
            background-color: hsl(142, 100%, 35%);
          }
        }
        
        @keyframes popcycle-pulse {
          0%, 100% { 
            opacity: 1;
          }
          50% { 
            opacity: 0.8;
          }
        }
        
        .animate-popcycle-loader {
          animation: 
            popcycle-spin 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite,
            popcycle-colors 2s ease-in-out infinite,
            popcycle-pulse 1s ease-in-out infinite;
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