import { Leaf } from "lucide-react";

interface GreenSparkLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
}

const GreenSparkLogo = ({ variant = "light", size = "md", iconOnly = false }: GreenSparkLogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
  };

  const textColor = variant === "light" ? "text-primary-foreground" : "text-primary";

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Leaf size={iconSizes[size]} className="text-primary" strokeWidth={2.5} />
        <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
      </div>
      {!iconOnly && (
        <span className={`font-bold tracking-tight ${sizeClasses[size]} ${textColor}`}>
          Green<span className="text-primary">Spark</span>
        </span>
      )}
    </div>
  );
};

export default GreenSparkLogo;
