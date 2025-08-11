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
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          16% { 
            background-color: hsl(142, 100%, 35%); 
            transform: rotate(90deg) scale(1.1);
            opacity: 0.7;
          }
          33% { 
            background-color: hsl(214, 100%, 50%); 
            transform: rotate(180deg) scale(1);
            opacity: 1;
          }
          50% { 
            background-color: hsl(214, 100%, 50%); 
            transform: rotate(270deg) scale(1.1);
            opacity: 0.7;
          }
          66% { 
            background-color: hsl(347, 100%, 60%); 
            transform: rotate(360deg) scale(1);
            opacity: 1;
          }
          83% { 
            background-color: hsl(347, 100%, 60%); 
            transform: rotate(450deg) scale(1.1);
            opacity: 0.7;
          }
          100% { 
            background-color: hsl(142, 100%, 35%); 
            transform: rotate(540deg) scale(1);
            opacity: 1;
          }
        }
        
        .animate-popcycle-loader {
          animation: popcycle-loader 3s ease-in-out infinite;
        }
      `}</style>
      <div className={cn("text-center", className)}>
        <div 
          className={cn(
            sizeClasses[size],
            "border-2 border-pop-black mx-auto mb-4",
            "animate-popcycle-loader"
          )}
        ></div>
        <p className="systematic-caps text-pop-black animate-pulse">{text}</p>
      </div>
    </>
  );
}