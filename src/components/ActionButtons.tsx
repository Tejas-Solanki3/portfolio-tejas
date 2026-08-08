"use client";

import { Smile, BriefcaseBusiness, Layers, UserRoundSearch, FileText, Trophy } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

interface ActionButtonsProps {
  isChatMode: boolean;
  onActionClick: (action: string) => void;
}

export default function ActionButtons({ isChatMode, onActionClick }: ActionButtonsProps) {
  const buttons = [
    { label: "Me", icon: Smile },
    { label: "Projects", icon: BriefcaseBusiness },
    { label: "Skills", icon: Layers },
    { label: "Achievements", icon: Trophy },
    { label: "Contact", icon: UserRoundSearch },
    { label: "Resume", icon: FileText },
  ];

  if (isChatMode) {
    return (
      <div className="flex w-full max-w-2xl gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 px-1 justify-start sm:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => onActionClick(btn.label)}
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-xs font-medium transition-all focus-visible:ring-ring/50 h-8 px-3 rounded-full border border-neutral-200/90 bg-white/90 shadow-sm backdrop-blur-md active:scale-95 hover:bg-white hover:border-neutral-300"
          >
            <btn.icon size={14} className="text-neutral-700" />
            <span className="text-[11px] sm:text-xs text-neutral-700 font-medium">{btn.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-3 sm:flex sm:flex-row sm:flex-nowrap justify-center items-center gap-2 sm:gap-3 w-full max-w-xs sm:max-w-4xl md:max-w-5xl px-2">
      {buttons.map((btn) => (
        <LiquidButton
          key={btn.label}
          onClick={() => onActionClick(btn.label)}
          className="w-full sm:w-28 md:w-32 h-20 sm:h-24"
        >
          <btn.icon size={20} className="text-neutral-700 mb-1" />
          <span className="text-[11px] sm:text-xs font-semibold text-neutral-800 truncate px-1">{btn.label}</span>
        </LiquidButton>
      ))}
    </div>
  );
}
