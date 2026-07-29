export const portfolioData = {
  about: {
    name: "Tejas Solanki",
    role: "Software Developer & AI/ML",
    location: "India",
    summary: "I am a Software & AI/ML Developer with experience building full-stack applications and experimenting with intelligent systems using computer vision and automation. I enjoy building practical solutions that combine strong backend systems, intuitive interfaces, and applied AI. I'm currently a Software Developer Intern at 8bits Technologies and study at ITM Skills University '28.",
    tags: ["MERN stack", "Python", "Computer Vision", "Automated Solutions", "AI Tools"]
  },
  contact: {
    linkedin: "https://linkedin.com/in/tejas-solanki",
    github: "https://github.com/Tejas-Solanki3",
    email: "tejassolanki176@gmail.com"
  },
  skills: [
    { category: "Frontend", items: ["React JS", "Next JS", "JavaScript", "HTML5", "CSS3"] },
    { category: "Backend & Frameworks", items: ["Node.js", "Express.js", "Python (Flask)"] },
    { category: "Databases & Tools", items: ["MySQL", "MongoDB", "REST API Integration"] },
    { category: "AI & Computer Vision", items: ["MediaPipe", "OpenCV", "pywinauto", "pynput"] }
  ],
  projects: [
    {
      title: "Gesture-Controlled Combat",
      description: "An AI-powered gaming project that built a gesture-recognition system to play Street Fighter IV without controllers using real-time body movements.",
      techstack: ["MediaPipe", "OpenCV", "pynput"]
    },
    {
      title: "SecureExam Lite",
      description: "A browser-based proctoring tool built using Flask, MediaPipe, and Computer Vision, implementing selfie-based authentication and real-time face activity monitoring.",
      techstack: ["Flask", "MediaPipe", "Computer Vision"]
    },
    {
      title: "MedRush",
      description: "An emergency-care platform featuring a Dark Ambulance model, integrating AI-driven symptom checks, doctor connection, and bed reservation system.",
      techstack: ["AI Tools"]
    },
    {
      title: "Recipe AI",
      description: "A voice-assisted recipe guide created in Hindi to promote accessibility in cooking.",
      techstack: ["Voice Recognition", "AI Tools"]
    }
  ],
  systemPrompt: `You are Tejas's personal AI assistant embedded in his portfolio website. Your job is to answer questions about Tejas using the provided context. 

Guidelines:
- Be friendly, professional, and concise.
- If asked about projects, list them or answer specific questions about them.
- If asked about skills, mention his expertise.
- If asked about contact or hiring, encourage them to reach out and use the contact form.
- If a user asks something unrelated to Tejas, politely steer the conversation back to his portfolio.`
};
