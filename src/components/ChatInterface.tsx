"use client";

import { ArrowRight, ArrowUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface ChatInterfaceProps {
  isChatMode: boolean;
  onSearch: (query: string) => void;
  isLoading: boolean;
  initialQuery?: string;
}

export default function ChatInterface({ isChatMode, onSearch, isLoading, initialQuery = "" }: ChatInterfaceProps) {
  const [input, setInput] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setInput(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSearch(input);
    setInput("");
  };

  return (
    <div className={`w-full max-w-xl transition-all duration-500 ${isChatMode ? '' : 'mb-6'}`}>
      <form className="relative w-full" onSubmit={handleSubmit}>
        <div className={`mx-auto flex items-center rounded-full border border-neutral-200 bg-white py-2.5 pr-2 pl-6 shadow-sm transition-all focus-within:border-neutral-400 ${isChatMode ? 'bg-white shadow-md' : ''}`}>
          <input
            type="text"
            placeholder="Ask me anything..."
            className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!input || isLoading}
            aria-label="Submit question"
            className="flex items-center justify-center rounded-full bg-[#525252] hover:bg-[#404040] p-2.5 text-white transition-colors disabled:opacity-70 ml-2"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isChatMode ? (
              <ArrowUp className="h-5 w-5" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
