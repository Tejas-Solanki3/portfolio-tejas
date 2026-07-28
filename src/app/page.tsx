"use client";

import ActionButtons from "@/components/ActionButtons";
import ChatInterface from "@/components/ChatInterface";
import FluidBackground from "@/components/FluidBackground";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: 'user' | 'bot';
  content: string;
  type?: string;
  data?: any;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatMode, setIsChatMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    if (!isChatMode) {
      setIsChatMode(true);
    }

    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsLoading(true);

    // Artificial typing delay for 1.5 seconds
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.response, type: data.type, data: data.data }]);
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I couldn't process that right now. Could you try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBotMessage = (msg: Message) => {
    if (msg.type === "projects" && msg.data) {
      return (
        <div className="flex flex-col gap-4 w-full">
          <p className="whitespace-pre-line px-5 py-3.5 bg-white/90 backdrop-blur-md border border-neutral-200 text-neutral-800 rounded-3xl rounded-tl-sm w-fit text-[15px] leading-relaxed shadow-sm">
            {msg.content}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {msg.data.map((project: any, idx: number) => (
              <div key={idx} className="bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col">
                <h3 className="font-bold text-lg text-neutral-900 mb-1.5">{project.title}</h3>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techstack.map((tech: string, i: number) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-neutral-100 border border-neutral-200/70 text-neutral-700 rounded-md font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (msg.type === "skills" && msg.data) {
      return (
        <div className="flex flex-col gap-6 w-full sm:max-w-[600px] py-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-2">Skills & Expertise</h2>

          <div className="flex flex-col gap-8">
            {msg.data.map((cat: any, idx: number) => (
              <div key={idx} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#0070f3]">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 12 12 17 22 12"></polyline>
                    <polyline points="2 17 12 22 22 17"></polyline>
                  </svg>
                  <h3 className="text-[22px] font-bold text-black">{cat.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5 mt-1">
                  {cat.skills.map((skill: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-black text-white rounded-full text-[14px] font-medium leading-none flex items-center">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (msg.type === "me" && msg.data) {
      return (
        <div className="flex flex-col gap-3 w-full sm:max-w-[600px] py-2">
          <p className="whitespace-pre-line text-neutral-800 text-[16px] leading-relaxed">
            {msg.content}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {msg.data.tags.map((tag: string, i: number) => (
              <span key={i} className="px-3.5 py-1.5 bg-neutral-100/80 text-neutral-700 rounded-full text-xs font-semibold">
                {tag}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (msg.type === "resume" && msg.data) {
      return (
        <div className="flex flex-col gap-4 w-full sm:max-w-[500px] py-2">
          <p className="text-neutral-800 text-[15px] leading-relaxed">{msg.content}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-[#f7f7f7] rounded-[1.25rem] w-full border border-neutral-200/50 gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto overflow-hidden">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm border border-neutral-200/50 flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-red-500">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-bold text-neutral-900 text-[14px] sm:text-[15px] truncate">Tejas_Solanki_Resume</h4>
                <p className="text-neutral-500 text-[11px] sm:text-xs mt-0.5 truncate">PDF • Updated July 2026 • 0.05 MB</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 w-full sm:w-auto sm:ml-4 flex-shrink-0">
              <button onClick={() => setPreviewUrl(msg.data.url)} className="flex items-center justify-center flex-1 sm:flex-none w-auto sm:w-12 h-10 sm:h-12 bg-white text-neutral-700 rounded-xl sm:rounded-full shadow-sm hover:bg-neutral-50 transition-colors border border-neutral-200 px-4 sm:px-0" title="Preview Resume">
                <span className="sm:hidden font-medium text-sm mr-2">Preview</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
              <a href={msg.data.url} download className="flex items-center justify-center flex-1 sm:flex-none w-auto sm:w-12 h-10 sm:h-12 bg-[#0070f3] text-white rounded-xl sm:rounded-full shadow-sm hover:bg-[#0060df] transition-colors px-4 sm:px-0" title="Download Resume">
                <span className="sm:hidden font-medium text-sm mr-2">Download</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </a>
            </div>
          </div>
        </div>
      );
    }

    if (msg.type === "contact" && msg.data) {
      return (
        <div className="flex flex-col w-full sm:max-w-[550px] py-2">
          <div className="bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-[1.5rem] rounded-tl-sm p-5 sm:p-6 shadow-sm flex flex-col gap-6">
            <p className="whitespace-pre-line text-neutral-800 text-[15px] leading-relaxed">
              {msg.content}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a href={msg.data.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0077b5] text-white rounded-xl hover:bg-[#0077b5]/90 transition-colors shadow-sm font-medium text-[14px]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                LinkedIn
              </a>
              <a href={msg.data.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#24292e] text-white rounded-xl hover:bg-[#24292e]/90 transition-colors shadow-sm font-medium text-[14px]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </a>
            </div>

            <div className="bg-neutral-50/80 rounded-2xl p-4 sm:p-5 border border-neutral-200/60">
              <form className="flex flex-col gap-3" onSubmit={(e: any) => {
                e.preventDefault();
                const name = e.target.elements[0].value;
                const replyTo = e.target.elements[1].value;
                const prompt = e.target.elements[2].value;
                window.location.href = `mailto:${msg.data.email}?subject=Message from ${name} (${replyTo})&body=${encodeURIComponent(prompt)}`;
              }}>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Your Name</label>
                  <input type="text" placeholder="John Doe" className="bg-white border border-neutral-200/80 rounded-xl px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors shadow-sm w-full min-w-0" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Reply To</label>
                  <input type="email" placeholder="you@example.com" className="bg-white border border-neutral-200/80 rounded-xl px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors shadow-sm w-full min-w-0" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Message</label>
                  <textarea placeholder="Tell me about the role..." rows={3} className="bg-white border border-neutral-200/80 rounded-xl px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors resize-none shadow-sm w-full min-w-0" required></textarea>
                </div>
                <button type="submit" className="mt-2 w-full bg-neutral-900 text-white font-medium text-[14px] px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors active:scale-95 shadow-sm">
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    // Default text response
    return (
      <div className="max-w-[90%] text-[16px] leading-relaxed text-neutral-800 py-2">
        <p className="whitespace-pre-line">{msg.content}</p>
      </div>
    );
  };

  return (
    <main className={`flex flex-col font-sans relative bg-transparent ${isChatMode ? 'h-[100dvh] overflow-hidden' : 'min-h-[100dvh] overflow-x-hidden'}`}>
      <FluidBackground />

      {/* Container without pointer-events-none to fix iOS Safari touch bug */}
      <div className={`relative flex flex-col items-center w-full z-10 transition-all duration-700 ${isChatMode ? 'h-full pt-4 pb-4 px-4' : 'flex-1 justify-center px-4 py-8 md:py-16'}`}>

        {/* Background text (hidden in chat mode) */}
        <div className={`absolute inset-x-0 bottom-0 flex justify-center overflow-hidden transition-opacity duration-500 pointer-events-none ${isChatMode ? 'opacity-0' : 'opacity-100'}`}>
          <div className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]" style={{ marginBottom: "-2.5rem" }}>
            Portfolio
          </div>
        </div>

        {/* Header/Memoji Area */}
        <div className={`flex flex-col-reverse items-center transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] shrink-0 z-20 ${isChatMode ? 'flex-row gap-3 w-full max-w-3xl justify-start items-center mb-6 bg-transparent' : 'mt-4 md:mt-12 mb-6 md:mb-8 text-center relative'}`}>

          {/* Memoji */}
          <div
            onClick={() => { window.location.href = '/'; }}
            className={`relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] bg-white/10 cursor-pointer title="Back to home" ${isChatMode ? 'h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white/50 shadow-md transform-none hover:scale-110' : 'h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56 mt-6 md:mt-8 shadow-none rounded-none hover:scale-105'}`}
          >
            <img
              src="/memoji.png"
              alt="Tejas Memoji"
              className="w-full h-full object-contain scale-[1.0]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="w-full h-full bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-900 dark:to-blue-950 flex items-center justify-center relative"><span class="' + (isChatMode ? 'text-2xl' : 'text-8xl') + '">👤</span></div>';
                }
              }}
            />
          </div>

          {/* Hero text */}
          <div className={`transition-all duration-700 pointer-events-none ${isChatMode ? 'text-left' : 'flex flex-col items-center text-center md:mb-6 animate-fade-in-up'}`} style={!isChatMode ? { opacity: 0, animationFillMode: 'forwards' } : {}}>
            <h2 className={`text-neutral-800 font-bold transition-all duration-700 ${isChatMode ? 'text-sm' : 'mt-1 text-2xl md:text-3xl'}`}>
              {isChatMode ? "Tejas Solanki" : "Hey, I'm Tejas Solanki"}
            </h2>
            <h1 className={`font-black tracking-tight text-neutral-900 transition-all duration-700 ${isChatMode ? 'text-lg tracking-normal' : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-1'}`}>
              {isChatMode ? "Software Developer" : "Software Developer & AI/ML"}
            </h1>
          </div>
        </div>

        {/* Chat Results Area */}
        {isChatMode && (
          <div className="flex-1 min-h-0 w-full max-w-3xl overflow-y-auto px-2 flex flex-col gap-6 mb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'user' ? (
                  <div className="px-5 py-3.5 bg-blue-500 text-white rounded-3xl rounded-tr-sm max-w-[85%] text-[15px] leading-relaxed shadow-sm">
                    {msg.content}
                  </div>
                ) : (
                  renderBotMessage(msg)
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex w-full justify-start">
                <div className="px-5 py-4 bg-white/60 dark:bg-neutral-800/80 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-700/50 rounded-3xl rounded-tl-sm flex gap-1 items-center h-[52px]">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* Interactive area (Input & Buttons) */}
        <div className={`z-10 flex w-full flex-col items-center justify-center transition-all duration-700 shrink-0 ${isChatMode ? 'mt-auto pb-4' : 'mt-2 md:px-0 animate-fade-in-up delay-200'} `} style={!isChatMode ? { opacity: 0, animationFillMode: 'forwards' } : {}}>
          {isChatMode ? (
            <ChatInterface isChatMode={isChatMode} onSearch={handleSearch} isLoading={isLoading} />
          ) : (
            <>
              <ChatInterface isChatMode={isChatMode} onSearch={handleSearch} isLoading={isLoading} />
              <ActionButtons isChatMode={isChatMode} onActionClick={handleSearch} />
            </>
          )}
        </div>
      </div>

      {/* PDF Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setPreviewUrl(null)}>
          <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="absolute top-4 right-6 flex items-center gap-3 z-10">
              <a href={previewUrl} download className="px-4 py-2 bg-blue-600/90 backdrop-blur-md hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-colors shadow-lg flex items-center gap-2 border border-white/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download
              </a>
              <button onClick={() => setPreviewUrl(null)} className="p-2 bg-neutral-900/80 backdrop-blur-md text-white hover:bg-black rounded-full transition-colors shadow-lg border border-white/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="flex-1 w-full bg-neutral-100">
              <iframe src={previewUrl} className="w-full h-full border-none" title="Resume PDF Preview" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
