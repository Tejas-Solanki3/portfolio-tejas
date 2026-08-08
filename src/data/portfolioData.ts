export const portfolioData = {
  about: {
    name: "Tejas Solanki",
    role: "AI / ML Engineer & Problem Solver",
    location: "India",
    education: "ITM Skills University '28",
    email: "tejassolanki176@gmail.com",
    summary: "AI / ML Engineer and Problem Solver focused on Applied Computer Vision, LLM Orchestration, and intelligent automation. I design and build production-grade AI systems — ranging from real-time biometric verification pipelines and sub-frame gesture inference to multi-service LLM agent workflows and desktop automation. Driven by tackling complex engineering challenges and delivering performant, high-impact products.",
    tags: ["Applied AI / ML", "Computer Vision", "LLM Orchestration", "MediaPipe & OpenCV", "FastAPI & Python", "Intelligent Automation", "Problem Solving"]
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
    {
      title: "4th Runner-Up – IMAGINE Hackathon (PIWOT 2025)",
      description: "National-level hackathon organized by PanIIT Alumni India. Secured 4th Runner-Up with ₹50,000 cash prize.",
      badge: "4th Runner-Up (₹50,000)",
      postUrl: "https://www.linkedin.com/posts/tejas-solanki2006_piwot2025-paniit-piwot-activity-7287469181233463297-UBkX?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCWA4gB2R3sDQHcQenTUy7gk2tIfsC18cA"
    },
    {
      title: "Winner – ITM Buildathon 3.0",
      description: "Flagship institutional hackathon victory competing among top engineering talent. Awarded ₹7,000 prize.",
      badge: "1st Place Winner (₹7,000)",
      postUrl: "https://www.linkedin.com/posts/tejas-solanki2006_winning-my-first-ever-hackathon-that-too-activity-7271488622648872960-qBZB?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCWA4gB2R3sDQHcQenTUy7gk2tIfsC18cA"
    },
    {
      title: "Recognized as Hackathon Champion",
      description: "Honored by ITM Group of Institutions for consistent excellence, engineering leadership, and innovation across competitive hackathons.",
      badge: "Institutional Honor",
      postUrl: "https://www.linkedin.com/posts/tejas-solanki2006_hackathon-technology-innovation-activity-7358092851802427392-fWgi?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCWA4gB2R3sDQHcQenTUy7gk2tIfsC18cA"
    }
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
      title: "SaveState",
      category: "Applied AI & Biometrics",
      description: "Automated attendance system eliminating proxy check-ins via real-time facial verification using dlib ResNet-34 (99.38% accuracy). Designed an optimized ML inference pipeline with frame downscaling and manual garbage collection on Python Flask to operate within tight memory constraints, paired with a Next.js/MongoDB dashboard.",
      techstack: ["Computer Vision", "Facial Recognition", "dlib ResNet-34", "Python", "Flask", "MongoDB", "Next.js"],
      liveUrl: "https://save-state-ai.vercel.app",
      demoUrl: "https://www.linkedin.com/posts/tejas-solanki2006_artificialintelligence-machinelearning-computervision-activity-7476485001300230144-wYX7?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCWA4gB2R3sDQHcQenTUy7gk2tIfsC18cA"
    },
    {
      title: "OttoAI",
      category: "LLM Agent & Automation",
      description: "Intelligent personal operations AI agent consolidating scattered daily workflows into an AI-orchestrated dashboard. Built with a FastAPI backend coordinating LLM pipelines across 4+ Google services (Gmail, Docs, Calendar, Fit) with full OAuth token flows for automated summarization and task execution.",
      techstack: ["LLMs", "Generative AI", "FastAPI", "Python", "OAuth 2.0", "Workflow Automation"],
      liveUrl: "https://otto-ai.vercel.app",
      demoUrl: "https://www.linkedin.com/posts/tejas-solanki2006_buildinpublic-aiproducts-productengineering-activity-7464898309061599232-Kv75?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCWA4gB2R3sDQHcQenTUy7gk2tIfsC18cA"
    },
    {
      title: "SecureExam Lite",
      category: "AI Vision Proctoring",
      description: "Browser-based AI proctoring prototype using Flask, MediaPipe, and OpenCV for real-time exam monitoring. Implemented multi-face anomaly detection and continuous face-presence tracking to flag suspicious exam behavior alongside auto-grading.",
      techstack: ["MediaPipe", "Computer Vision", "OpenCV", "Flask", "Python"],
      demoUrl: "https://www.linkedin.com/posts/tejas-solanki2006_edtech-ai-flask-activity-7363871384864727040-F9Dv?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCWA4gB2R3sDQHcQenTUy7gk2tIfsC18cA"
    },
    {
      title: "Gesture-Controlled Combat",
      category: "Pose Estimation & AI Gaming",
      description: "Real-time gesture-recognition system enabling controller-free gameplay of Street Fighter IV using webcam body tracking. Combines MediaPipe 33-point pose estimation with OpenCV frame processing and pynput for sub-frame latency game move execution.",
      techstack: ["MediaPipe", "OpenCV", "Pose Estimation", "pynput", "Python", "HCI"],
      demoUrl: "https://www.linkedin.com/posts/tejas-solanki2006_artificialintelligence-computervision-gesturerecognition-activity-7346047514065707009-0B0E?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCWA4gB2R3sDQHcQenTUy7gk2tIfsC18cA"
    }
  ],
  resume: {
    url: "/resume.pdf",
    filename: "Tejas_Solanki_Resume.pdf",
    lastUpdated: "August 2026"
  },
  systemPrompt: `You are Tejas Solanki's personal AI assistant embedded in his portfolio website. Your job is to answer questions about Tejas using his live resume, in-depth project knowledge, and portfolio context.

Guidelines:
- Be friendly, professional, and concise.
- Core Identity & Priority: Tejas is primarily an AI / ML Engineer and Problem Solver specializing in Applied AI/ML, Computer Vision, LLMs, and Automation. Never describe him simply as a generic full-stack developer; highlight his deep problem-solving in AI/ML systems and engineering.
- Accurately detail his projects (SaveState, OttoAI, SecureExam Lite, Gesture-Controlled Combat), experience (8bits Technologies, LetsUpgrade), achievements (PIWOT IMAGINE Hackathon 4th Runner-Up ₹50,000, ITM Buildathon 3.0 winner ₹7,000, Hackathon Champion), and technical skills.
- DO NOT mention that any projects were "built at a hackathon" or "won a hackathon". Discuss all projects strictly as professional engineering work.
- When describing projects, you can share their live product links or LinkedIn video demo links if relevant.
- If asked about contact or hiring, encourage them to reach out and use the contact form.
- If a user asks something unrelated to Tejas, politely steer the conversation back to his portfolio.`
};
