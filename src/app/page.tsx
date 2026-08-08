"use client";

import ActionButtons from "@/components/ActionButtons";
import ChatInterface from "@/components/ChatInterface";
import FluidBackground from "@/components/FluidBackground";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ExternalLink, Play } from "lucide-react";

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

  const handleReset = () => {
    setIsChatMode(false);
    setMessages([]);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    if (!isChatMode) {
      setIsChatMode(true);
    }

    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsLoading(true);

    // Artificial typing delay for 1.2 seconds for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1200));

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
            {Array.isArray(msg.data) && msg.data.map((project: any, idx: number) => (
              <div key={idx} className="bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  {project.category && (
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1 block">
                      {project.category}
                    </span>
                  )}
                  <h3 className="font-bold text-lg text-neutral-900 mb-1.5">{project.title}</h3>
                  <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{project.description}</p>
                </div>

                <div>
                  {project.techstack && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techstack.map((tech: string, i: number) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 bg-neutral-100 border border-neutral-200/70 text-neutral-700 rounded-md font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {(project.liveUrl || project.demoUrl) && (
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
                        >
                          <ExternalLink size={12} />
                          Live App
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-black active:scale-95 transition-all shadow-sm"
                        >
                          <Play size={11} className="fill-white" />
                          Video Demo
                        </a>
                      )}
                    </div>
                  )}
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
          <p className="whitespace-pre-line px-5 py-3.5 bg-white/90 backdrop-blur-md border border-neutral-200 text-neutral-800 rounded-3xl rounded-tl-sm w-fit text-[15px] leading-relaxed shadow-sm">
            {msg.content}
          </p>
          <div className="flex flex-col gap-4">
            {msg.data.map((cat: any, idx: number) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                  <span className="text-[14px] font-bold text-neutral-600 tracking-wide uppercase">{cat.category}</span>
                </div>
                <div className="flex flex-wrap gap-2.5 mt-1">
                  {cat.skills && cat.skills.map((skill: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-black text-white rounded-full text-[13px] font-medium shadow-sm hover:scale-105 transition-transform cursor-default">
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

    if (msg.type === "achievements" && msg.data) {
      return (
        <div className="flex flex-col gap-4 w-full sm:max-w-[620px] py-4">
          <p className="whitespace-pre-line px-5 py-3.5 bg-white/90 backdrop-blur-md border border-neutral-200 text-neutral-800 rounded-3xl rounded-tl-sm w-fit text-[15px] leading-relaxed shadow-sm">
            {msg.content}
          </p>
          <div className="flex flex-col gap-3">
            {Array.isArray(msg.data) && msg.data.map((item: any, idx: number) => {
              const isObj = typeof item === 'object' && item !== null;
              const title = isObj ? item.title : item;
              const description = isObj ? item.description : null;
              const badge = isObj ? item.badge : null;
              const postUrl = isObj ? item.postUrl : null;

              return (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-amber-600">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                        <path d="M4 22h16"></path>
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-[15px] font-bold text-neutral-900 leading-snug">
                          {title}
                        </h4>
                        {badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full">
                            {badge}
                          </span>
                        )}
                      </div>
                      {description && (
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>

                  {postUrl && (
                    <a
                      href={postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-black active:scale-95 transition-all shadow-sm flex-shrink-0 self-start sm:self-center ml-11 sm:ml-0"
                    >
                      <ExternalLink size={12} />
                      View Post
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (msg.type === "me" && msg.data) {
      return (
        <div className="flex flex-col gap-4 w-full sm:max-w-[620px] py-3">
          <div className="bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full overflow-hidden border border-neutral-200/80 bg-blue-100/60 shadow-sm flex-shrink-0">
                <img src="/memoji.png" alt="Tejas Solanki" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-neutral-900 leading-tight">{msg.data.name || "Tejas Solanki"}</h3>
                <span className="text-xs font-semibold text-blue-600">{msg.data.role || "AI / ML Engineer & Problem Solver"}</span>
              </div>
            </div>

            <p className="whitespace-pre-line text-neutral-700 text-[14px] sm:text-[15px] leading-relaxed">
              {msg.content}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100 text-xs text-neutral-600">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 border border-neutral-200/60 rounded-md font-medium text-neutral-700">
                🎓 {msg.data.education || "ITM Skills University '28"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 border border-neutral-200/60 rounded-md font-medium text-neutral-700">
                📍 {msg.data.location || "India"}
              </span>
            </div>

            {msg.data.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {msg.data.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 bg-blue-50 border border-blue-200/60 text-blue-800 rounded-md text-[11px] font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (msg.type === "resume") {
      const resumeUrl = msg.data?.url || "/resume.pdf";
      return (
        <div className="flex flex-col gap-4 w-full sm:max-w-[500px] py-2">
          <p className="text-neutral-800 text-[15px] leading-relaxed">{msg.content || "Here is Tejas Solanki's resume:"}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-[#f7f7f7] rounded-[1.25rem] w-full border border-neutral-200/50 gap-4 shadow-sm">
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
                <h4 className="font-bold text-neutral-900 text-[14px] sm:text-[15px] truncate">Tejas_Solanki_Resume.pdf</h4>
                <p className="text-neutral-500 text-[11px] sm:text-xs mt-0.5 truncate">PDF • Live Resume Document</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 w-full sm:w-auto sm:ml-4 flex-shrink-0">
              <button 
                onClick={() => setPreviewUrl(resumeUrl)} 
                className="flex items-center justify-center flex-1 sm:flex-none w-auto sm:w-12 h-10 sm:h-12 bg-white text-neutral-700 rounded-xl sm:rounded-full shadow-sm hover:bg-neutral-50 transition-colors border border-neutral-200 px-4 sm:px-0" 
                title="Preview Resume"
              >
                <span className="sm:hidden font-medium text-sm mr-2">Preview</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
              <a 
                href={resumeUrl} 
                download="Tejas_Solanki_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 sm:flex-none w-auto sm:w-12 h-10 sm:h-12 bg-[#0070f3] text-white rounded-xl sm:rounded-full shadow-sm hover:bg-[#0060df] transition-colors px-4 sm:px-0" 
                title="Download Resume"
              >
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
        <div className="flex flex-col w-full sm:max-w-[750px] py-2">
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

    return (
      <div className="max-w-[90%] text-[16px] leading-relaxed text-neutral-800 py-2">
        <p className="whitespace-pre-line">{msg.content}</p>
      </div>
    );
  };

  return (
    <main className="flex flex-col font-sans relative bg-transparent h-[100dvh] overflow-hidden">
      <FluidBackground />

      <AnimatePresence mode="wait">
        {!isChatMode ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center justify-center w-full h-full z-10 px-4 py-6 overflow-y-auto"
          >
            <div className="absolute inset-x-0 bottom-0 flex justify-center overflow-hidden pointer-events-none opacity-100">
              <div className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]" style={{ marginBottom: "-2.5rem" }}>
                Portfolio
              </div>
            </div>

            <div className="flex flex-col items-center text-center z-20 w-full max-w-4xl">
              <div className="relative overflow-hidden bg-white/10 rounded-[2rem] h-32 w-32 sm:h-44 sm:w-44 md:h-52 md:w-52 mb-4 hover:scale-105 transition-transform duration-300">
                <img
                  src="/memoji.png"
                  alt="Tejas Memoji"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-900 dark:to-blue-950 flex items-center justify-center relative"><span class="text-7xl sm:text-8xl">👤</span></div>';
                    }
                  }}
                />
              </div>

              <div className="pointer-events-none flex flex-col items-center text-center mb-6">
                <h2 className="text-neutral-800 font-bold text-xl sm:text-2xl md:text-3xl">
                  Hey, I'm Tejas Solanki
                </h2>
                <h1 className="font-black tracking-tight text-neutral-900 text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-1">
                  Software Developer & AI/ML
                </h1>
              </div>

              <div className="w-full flex flex-col items-center justify-center z-30">
                <ChatInterface isChatMode={false} onSearch={handleSearch} isLoading={isLoading} />
                <ActionButtons isChatMode={false} onActionClick={handleSearch} />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center w-full h-full z-10 px-3 sm:px-4 py-3 max-w-3xl mx-auto"
          >
            <div className="w-full flex items-center justify-between py-2 px-3 sm:px-4 bg-white/70 backdrop-blur-md rounded-2xl border border-neutral-200/70 shadow-sm shrink-0 mb-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity text-left group"
                title="Return to Home"
              >
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden border border-white/60 bg-blue-100 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                  <img src="/memoji.png" alt="Tejas" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-neutral-900 leading-tight">Tejas Solanki</span>
                  <span className="text-[11px] text-neutral-500 font-medium">Software Developer & AI/ML</span>
                </div>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 text-xs font-medium transition-colors border border-neutral-200/60 shadow-2xs"
                title="New Chat / Home"
              >
                <RotateCcw size={13} className="text-neutral-600" />
                <span className="hidden sm:inline">New Chat</span>
              </button>
            </div>

            <div className="flex-1 min-h-0 w-full overflow-y-auto px-1 sm:px-2 flex flex-col gap-5 mb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'user' ? (
                      <div className="px-5 py-3.5 bg-blue-500 text-white rounded-3xl rounded-tr-sm max-w-[85%] text-[15px] leading-relaxed shadow-sm">
                        {msg.content}
                      </div>
                    ) : (
                      renderBotMessage(msg)
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div 
                    key="loader"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex w-full justify-start"
                  >
                    <div className="px-5 py-4 bg-white/80 backdrop-blur-md border border-neutral-200/70 rounded-3xl rounded-tl-sm flex gap-1.5 items-center h-[50px] shadow-sm">
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            <div className="w-full flex flex-col items-center justify-center shrink-0 gap-1.5">
              <ActionButtons isChatMode={true} onActionClick={handleSearch} />
              <ChatInterface isChatMode={true} onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setPreviewUrl(null)}>
          <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="absolute top-4 right-6 flex items-center gap-3 z-10">
              <a href={previewUrl} download="Tejas_Solanki_Resume.pdf" className="px-4 py-2 bg-blue-600/90 backdrop-blur-md hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-colors shadow-lg flex items-center gap-2 border border-white/20">
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
