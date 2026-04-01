"use client";

import { useEffect, useState } from "react";
import { CopyleftIcon, BlocksIcon, BotMessageSquareIcon, DatabaseZapIcon, WebhookIcon } from "lucide-react";

const loadingMessages = [
  { text: "Authenticating credentials...", icon: CopyleftIcon, color: "text-blue-500" },
  { text: "Loading visual editor...", icon: BlocksIcon, color: "text-primary" },
  { text: "Connecting native integrations...", icon: WebhookIcon, color: "text-emerald-500" },
  { text: "Syncing AI models...", icon: BotMessageSquareIcon, color: "text-purple-500" },
  { text: "Preparing execution engine...", icon: DatabaseZapIcon, color: "text-rose-500" },
  { text: "Almost there...", icon: BlocksIcon, color: "text-primary" },
];

export default function DashboardLoading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 1200); // Change text every 1.2s

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingMessages[messageIndex].icon;

  return (
    <div className="flex-1 w-full h-full min-h-[80vh] flex flex-col items-center justify-center p-8">
      <div className="relative group">
        {/* Glow behind the icon */}
        <div className={`absolute -inset-4 bg-gradient-to-r from-primary/30 to-blue-500/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse`} />

        <div className="relative size-24 md:size-32 rounded-3xl glass-strong dark:bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-2xl overflow-hidden">
          {/* Animated border gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1),transparent)] -translate-x-full animate-[shimmer_2s_infinite]" />

          <CurrentIcon strokeWidth={1.5} className={`size-12 md:size-16 transition-all duration-500 ${loadingMessages[messageIndex].color} animate-pulse`} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground animate-fade-in">
          Entering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">CogniFlow</span>
        </h2>

        <div className="h-8 flex items-center justify-center overflow-hidden">
          <p className="text-muted-foreground font-medium animate-slide-up-fade">
            {loadingMessages[messageIndex].text}
          </p>
        </div>

        {/* Continuous Progress bar */}
        <div className="w-64 h-1.5 bg-white/10 dark:bg-white/5 rounded-full overflow-hidden mt-6 relative">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-primary rounded-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
