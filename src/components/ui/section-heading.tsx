
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({ 
  title, 
  description, 
  children,
  className
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4", className)}>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight group">
          <span className="group-hover:animate-text-flicker">{title}</span>
        </h2>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
