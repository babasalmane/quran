import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: LayoutProps) {
  return (
    <div className={`container mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}

export function PageWrapper({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-neutral ${className}`}>
      {children}
    </div>
  );
}

export function ScrollArea({ children, className = "" }: LayoutProps) {
  return (
    <div className={`h-full overflow-y-auto ${className}`}>
      {children}
    </div>
  );
}
