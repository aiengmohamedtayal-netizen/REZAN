import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "standard" | "wide" | "full";
  children: React.ReactNode;
}

export function Container({ size = "standard", className = "", children, ...props }: ContainerProps) {
  const sizeClasses = {
    narrow: "max-w-[960px]",
    standard: "max-w-[1240px]",
    wide: "max-w-[1440px]",
    full: "max-w-full",
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "dark" | "charcoal" | "ivory" | "white" | "transparent";
  borderBottom?: boolean;
  children: React.ReactNode;
}

export function Section({
  spacing = "lg",
  background = "transparent",
  borderBottom = false,
  className = "",
  children,
  ...props
}: SectionProps) {
  const spacingClasses = {
    none: "py-0",
    sm: "py-6 sm:py-8",
    md: "py-10 sm:py-14",
    lg: "py-16 sm:py-24",
    xl: "py-20 sm:py-32",
  };

  const bgClasses = {
    dark: "bg-[#111111] text-[#F7F3EA]",
    charcoal: "bg-[#1A1A1A] text-[#F7F3EA]",
    ivory: "bg-[#F7F3EA] text-[#1A1A1A]",
    white: "bg-white text-[#1A1A1A]",
    transparent: "",
  };

  const borderClass = borderBottom
    ? background === "dark" || background === "charcoal"
      ? "border-b border-[#2A2A2A]"
      : "border-b border-[#E8E4DB]"
    : "";

  return (
    <section className={`${spacingClasses[spacing]} ${bgClasses[background]} ${borderClass} ${className}`} {...props}>
      {children}
    </section>
  );
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: "start" | "center" | "end" | "stretch";
  children: React.ReactNode;
}

export function Stack({ gap = 4, align = "stretch", className = "", children, ...props }: StackProps) {
  const gapClasses: Record<number, string> = {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  return (
    <div className={`flex flex-col ${gapClasses[gap] || "gap-4"} ${alignClasses[align]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: 1 | 2 | 3 | 4 | 6 | 8;
  align?: "start" | "center" | "end" | "baseline";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  children: React.ReactNode;
}

export function Cluster({
  gap = 4,
  align = "center",
  justify = "start",
  wrap = true,
  className = "",
  children,
  ...props
}: ClusterProps) {
  const gapClasses: Record<number, string> = {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    baseline: "items-baseline",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  };

  return (
    <div
      className={`flex ${wrap ? "flex-wrap" : "flex-nowrap"} ${gapClasses[gap] || "gap-4"} ${alignClasses[align]} ${justifyClasses[justify]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SplitProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: "50-50" | "60-40" | "40-60" | "70-30" | "30-70";
  gap?: 4 | 6 | 8 | 12;
  children: [React.ReactNode, React.ReactNode];
}

export function Split({ ratio = "50-50", gap = 8, className = "", children, ...props }: SplitProps) {
  const ratioClasses = {
    "50-50": "grid-cols-1 lg:grid-cols-2",
    "60-40": "grid-cols-1 lg:grid-cols-[1.5fr_1fr]",
    "40-60": "grid-cols-1 lg:grid-cols-[1fr_1.5fr]",
    "70-30": "grid-cols-1 lg:grid-cols-[2.3fr_1fr]",
    "30-70": "grid-cols-1 lg:grid-cols-[1fr_2.3fr]",
  };

  const gapClasses: Record<number, string> = {
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
    12: "gap-12",
  };

  return (
    <div className={`grid ${ratioClasses[ratio]} ${gapClasses[gap]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 2 | 4 | 6 | 8;
  children: React.ReactNode;
}

export function Grid({ cols = 4, gap = 6, className = "", children, ...props }: GridProps) {
  const colClasses: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  };

  const gapClasses: Record<number, string> = {
    2: "gap-2",
    4: "gap-4",
    6: "gap-4 sm:gap-6",
    8: "gap-6 sm:gap-8",
  };

  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`} {...props}>
      {children}
    </div>
  );
}
