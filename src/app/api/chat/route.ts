import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const query = message.toLowerCase();
    
    // Check for Projects
    if (query.includes("project")) {
      return NextResponse.json({
        type: "projects",
        response: "Here are some of my key projects:",
        data: [
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
        ]
      });
    }

    // Check for Skills
    if (query.includes("skill") || query.includes("tech")) {
      return NextResponse.json({
        type: "skills",
        response: "Skills & Expertise",
        data: [
          { category: "Frontend", skills: ["React JS", "Next JS", "JavaScript", "HTML5", "CSS3"] },
          { category: "Backend & Frameworks", skills: ["Node.js", "Express.js", "Python (Flask)"] },
          { category: "Databases & Tools", skills: ["MySQL", "MongoDB", "REST API Integration"] },
          { category: "AI & Computer Vision", skills: ["MediaPipe", "OpenCV", "pywinauto", "pynput"] }
        ]
      });
    }

    // Check for Me / About
    if (query === "me" || query.match(/\bme\b/) || query.includes("about") || query.includes("who")) {
      return NextResponse.json({
        type: "me",
        response: "I am a Software & AI/ML Developer with experience building full-stack applications and experimenting with intelligent systems using computer vision and automation. I enjoy building practical solutions that combine strong backend systems, intuitive interfaces, and applied AI. I'm currently a Software Developer Intern at 8bits Technologies and study at ITM Skills University '28.",
        data: {
          location: "India",
          role: "Software Developer",
          tags: ["MERN stack", "Python", "Computer Vision", "Automated Solutions", "AI Tools"]
        }
      });
    }

    // Check for Resume
    if (query.includes("resume") || query.includes("cv")) {
      return NextResponse.json({
        type: "resume",
        response: "Here is my resume. You can preview it below or download it directly.",
        data: { url: "/resume.pdf" }
      });
    }

    // Check for Contact
    if (query.includes("contact") || query.includes("reach") || query.includes("email") || query.includes("hire")) {
      return NextResponse.json({
        type: "contact",
        response: "Here's how you can reach me. Feel free to connect or send a message!",
        data: {
          linkedin: "https://linkedin.com/in/tejas-solanki",
          github: "https://github.com/Tejas-Solanki3",
          email: "tejassolanki176@gmail.com"
        }
      });
    }

    // Default
    return NextResponse.json({ 
      type: "text", 
      response: "I'm Tejas's AI assistant! You can reach Tejas at tejassolanki176@gmail.com, or check out his LinkedIn and GitHub." 
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
