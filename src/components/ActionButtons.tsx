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
      <div className="flex w-full max-w-2xl gap-2 overflow-x-auto pb-2 mb-2 mt-4 px-1 justify-start md:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => onActionClick(btn.label)}
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-all focus-visible:ring-ring/50 h-8 px-3 rounded-full border border-neutral-200 bg-white/80 shadow-sm backdrop-blur-lg active:scale-95 hover:bg-white"
          >
            <btn.icon size={16} className="text-neutral-700" />
            <span className="text-xs text-neutral-700">{btn.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-3xl">
      {buttons.map((btn) => (
        <LiquidButton
          key={btn.label}
          onClick={() => onActionClick(btn.label)}
          className="w-[28%] sm:w-32 h-20 sm:h-24"
        >
          <btn.icon size={20} className="text-neutral-700 mb-1" />
          <span className="text-xs font-semibold text-neutral-800">{btn.label}</span>
        </LiquidButton>
      ))}
    </div>
  );
}
