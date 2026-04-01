"use client";

import { LucideIcon } from "lucide-react";

interface GloriousLoaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  colorClass?: string;
  gradientClass?: string;
}

export function GloriousLoader({
  title,
  subtitle,
  icon: Icon,
  colorClass = "text-primary",
  gradientClass = "from-primary/30 to-blue-500/30"
}: GloriousLoaderProps) {
  return (
    <div className="flex-1 w-full h-full min-h-[80vh] flex flex-col items-center justify-center p-8">
      <div className="relative group">
        {/* Glow behind the icon */}
        <div className={`absolute -inset-4 bg-gradient-to-r ${gradientClass} blur-2xl rounded-full opacity-100 animate-pulse`} />

        <div className="relative size-20 md:size-24 rounded-3xl glass-strong dark:bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-xl overflow-hidden">
          {/* Animated border gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1),transparent)] -translate-x-full animate-[shimmer_2s_infinite]" />

          <Icon strokeWidth={1.5} className={`size-10 md:size-12 transition-all duration-500 ${colorClass} animate-pulse`} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground animate-fade-in flex items-center gap-2">
          {title}
        </h2>

        <div className="h-6 flex items-center justify-center overflow-hidden">
          <p className="text-sm text-muted-foreground font-medium animate-slide-up-fade">
            {subtitle}
          </p>
        </div>

        {/* Continuous Progress bar */}
        <div className="w-48 h-1 bg-white/10 dark:bg-white/5 rounded-full overflow-hidden mt-4 relative">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-primary rounded-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
