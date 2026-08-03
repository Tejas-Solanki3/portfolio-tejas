export const portfolioData = {
  about: {
    name: "Tejas Solanki",
    role: "AI Engineer | Software Developer | AI/ML Developer",
    location: "India",
    education: "ITM Skills University '28",
    email: "tejassolanki176@gmail.com",
    summary: "AI Engineer and Software Developer building production-ready applications in computer vision, automation, and applied machine learning. Experienced across Python and the MERN stack, with end-to-end ownership from backend architecture and REST API design through deployment. Actively expanding into Generative AI, LLMs, and prompt engineering to ship intelligent, automation-driven products.",
    tags: ["Python", "MERN Stack", "Computer Vision", "GUI Automation", "Generative AI", "LLMs", "MediaPipe"]
  },
  experience: [
    {
      role: "Software Developer Intern",
      company: "8bits Technologies",
      period: "April 2026 - Present, Sept 2025 - Dec 2025",
      highlights: [
        "Engineered GUI automation solutions for Windows desktop applications in Python using the pywinauto library, streamlining repetitive client workflows",
        "Designed and shipped custom automation scripts that reduced manual work and improved operational efficiency across client projects, applying strong software engineering and debugging practices"
      ]
    },
    {
      role: "EdTech Platform Intern",
      company: "LetsUpgrade",
      period: "Dec 2024 - Jan 2025",
      highlights: [
        "Gained hands-on exposure to EdTech platform development, contributing to user engagement strategies and feature planning",
        "Applied platform design principles, technology integration, and scalability considerations to support product development decisions"
      ]
    }
  ],
  achievements: [
    "Winner – IMAGINE Hackathon (PIWOT 2025), a national-level hackathon organized by PanIIT Alumni India (Prize: ₹50,000)",
    "Winner – ITM Buildathon 3.0, the college's flagship hackathon (Prize: ₹7,000)",
    "Recognized as Hackathon Champion by ITM Group of Institutions for consistent hackathon performance"
  ],
  contact: {
    linkedin: "https://linkedin.com/in/tejas-solanki",
    github: "https://github.com/Tejas-Solanki3",
    email: "tejassolanki176@gmail.com"
  },
  skills: [
    { category: "AI / ML & Automation", skills: ["Computer Vision", "OpenCV", "MediaPipe", "Face Recognition", "Generative AI & LLMs", "pywinauto", "pynput"] },
    { category: "Backend & APIs", skills: ["Node.js", "Express.js", "Python", "Flask", "REST APIs", "API Integrations"] },
    { category: "Database & Languages", skills: ["MySQL", "MongoDB", "Python", "Java", "C++"] },
    { category: "Frontend", skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js"] }
  ],
  projects: [
    {
      title: "Gesture-Controlled Combat",
      category: "AI-Powered Gaming",
      description: "Built a real-time gesture-recognition system enabling controller-free gameplay of Street Fighter IV using live body-movement tracking. Combined MediaPipe pose tracking with OpenCV frame processing for low-latency computer vision inference, then mapped gestures to in-game actions using pynput.",
      techstack: ["MediaPipe", "OpenCV", "pynput", "Python", "Computer Vision"]
    },
    {
      title: "SaveState",
      category: "AI-Powered Attendance Automation",
      description: "Built an automated attendance system that eliminates proxy check-ins using facial recognition, powered by a Python Flask backend, with a Next.js and MongoDB frontend for classroom scheduling and student email whitelisting. Optimized the pipeline with frame downscaling and garbage collection to prevent memory crashes and improve runtime stability in production.",
      techstack: ["Python", "Flask", "Next.js", "MongoDB", "Facial Recognition", "OpenCV"]
    },
    {
      title: "SecureExam Lite",
      category: "EdTech & Proctoring",
      description: "Built a browser-based AI proctoring tool using Flask, MediaPipe, and computer vision for real-time exam monitoring. Implemented selfie-based identity authentication and continuous face-activity tracking to detect and flag suspicious exam behavior.",
      techstack: ["Flask", "MediaPipe", "Computer Vision", "Python"]
    }
  ],
  resume: {
    url: "/resume.pdf",
    filename: "Tejas_Solanki_Resume.pdf",
    lastUpdated: "August 2026"
  },
  systemPrompt: `You are Tejas Solanki's personal AI assistant embedded in his portfolio website. Your job is to answer questions about Tejas using his live resume and portfolio context. 

Guidelines:
- Be friendly, professional, and concise.
- Accurately detail his projects (Gesture-Controlled Combat, SaveState, SecureExam Lite), experience (8bits Technologies, LetsUpgrade), achievements (PIWOT IMAGINE Hackathon winner ₹50,000, ITM Buildathon 3.0 winner ₹7,000, Hackathon Champion), and technical skills.
- If asked about contact or hiring, encourage them to reach out and use the contact form.
- If a user asks something unrelated to Tejas, politely steer the conversation back to his portfolio.`
};
