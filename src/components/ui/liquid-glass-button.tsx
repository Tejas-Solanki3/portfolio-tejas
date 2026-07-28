"use client";

import React from "react";

export function LiquidButton({
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <button
        data-slot="button"
        className={`group relative inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-[color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-transparent hover:-translate-y-1 duration-300 text-neutral-800 ${className}`}
        {...props}
      >
        <div className="absolute top-0 left-0 z-0 h-full w-full rounded-2xl 
            bg-white border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]
            transition-all duration-300 
            group-hover:bg-white/40 group-hover:backdrop-blur-md group-hover:border-white/60 
            group-hover:shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.5),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.4),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.3),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.3),inset_0_0_6px_6px_rgba(0,0,0,0.06),inset_0_0_2px_2px_rgba(0,0,0,0.03),0_8px_30px_rgb(0,0,0,0.08)]" />
        <div className="pointer-events-none z-10 w-full h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </button>
    </>
  );
}
