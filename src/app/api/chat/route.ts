import { NextResponse } from 'next/server';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject } from 'ai';
import { z } from 'zod';
import { portfolioData } from '@/data/portfolioData';
import fs from 'fs';
import path from 'path';
import { extractText } from 'unpdf';

// Polyfill Math.sumPrecise if not available in runtime
if (typeof (Math as any).sumPrecise !== 'function') {
  (Math as any).sumPrecise = (values: Iterable<number>) => {
    let sum = 0;
    for (const v of values) {
      sum += v;
    }
    return sum;
  };
}

let cachedResumeMtime = 0;
let cachedResumeText = '';

// Helper function to dynamically read and parse resume.pdf in realtime with caching
async function getRealtimeResumeText(): Promise<string> {
  try {
    const resumePath = path.join(process.cwd(), 'public', 'resume.pdf');
    if (fs.existsSync(resumePath)) {
      const stats = fs.statSync(resumePath);
      if (stats.mtimeMs === cachedResumeMtime && cachedResumeText) {
        return cachedResumeText;
      }

      // Temporarily silence internal pdfjs font substitution warnings
      const originalWarn = console.warn;
      console.warn = () => {};
      try {
        const buffer = fs.readFileSync(resumePath);
        const { text } = await extractText(new Uint8Array(buffer));
        cachedResumeText = Array.isArray(text) ? text.join('\n\n') : (text || '');
        cachedResumeMtime = stats.mtimeMs;
      } finally {
        console.warn = originalWarn;
      }
      return cachedResumeText;
    }
  } catch (err) {
    // fallback gracefully
  }
  return '';
}

// Helper function to read project knowledge/documentation markdown in realtime
function getProjectKnowledgeText(): string {
  const possiblePaths = [
    path.join(process.cwd(), 'public', 'project_knowledge.md'),
    path.join(process.cwd(), 'public', 'documentation.md'),
    path.join(process.cwd(), 'public', 'projects.md'),
    path.join(process.cwd(), 'public', 'docs.md'),
    path.join(process.cwd(), 'project_knowledge.md'),
    path.join(process.cwd(), 'documentation.md'),
    path.join(process.cwd(), 'docs.md'),
  ];

  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(p)) {
        return fs.readFileSync(p, 'utf8');
      }
    } catch (err) {
      // fallback gracefully
    }
  }
  return '';
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const cleanMsg = (message || '').trim().toLowerCase();

    // Fast and 100% reliable handling for action buttons & exact queries
    if (cleanMsg === 'projects' || cleanMsg === 'show projects' || cleanMsg === 'view projects') {
      return NextResponse.json({
        type: 'projects',
        response: "Here are the featured projects Tejas has built across AI engineering, LLMs, computer vision, and intelligent automation:",
        data: portfolioData.projects
      });
    }

    if (cleanMsg === 'skills' || cleanMsg === 'show skills' || cleanMsg === 'view skills') {
      return NextResponse.json({
        type: 'skills',
        response: "Here is a breakdown of Tejas's technical skills and expertise across AI/ML, backend, databases, and frontend:",
        data: portfolioData.skills
      });
    }

    if (cleanMsg === 'achievements' || cleanMsg === 'show achievements' || cleanMsg === 'victories' || cleanMsg === 'awards') {
      return NextResponse.json({
        type: 'achievements',
        response: "Here are some of Tejas's notable achievements and competitive victories:",
        data: portfolioData.achievements
      });
    }

    if (cleanMsg === 'me' || cleanMsg === 'about' || cleanMsg === 'who are you') {
      return NextResponse.json({
        type: 'me',
        response: portfolioData.about.summary,
        data: portfolioData.about
      });
    }

    if (cleanMsg === 'contact' || cleanMsg === 'contact me' || cleanMsg === 'hire' || cleanMsg === 'reach out') {
      return NextResponse.json({
        type: 'contact',
        response: "You can reach out to Tejas directly via email or connect with him on LinkedIn and GitHub:",
        data: portfolioData.contact
      });
    }

    if (cleanMsg === 'resume' || cleanMsg === 'cv' || cleanMsg.includes('download resume') || cleanMsg.includes('view resume')) {
      return NextResponse.json({
        type: 'resume',
        response: "Here is Tejas Solanki's resume. You can preview it directly or download a copy below:",
        data: { url: "/resume.pdf", title: "Tejas_Solanki_Resume.pdf" }
      });
    }

    // Fetch realtime text from public/resume.pdf and project_knowledge.md
    const resumeText = await getRealtimeResumeText();
    const projectKnowledge = getProjectKnowledgeText();

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY || '',
    });

    // Generate intelligent response using OpenRouter
    const { object } = await generateObject({
      model: openrouter('meta-llama/llama-3.1-8b-instruct'),
      schema: z.object({
        type: z.enum(["text", "projects", "skills", "me", "resume", "contact", "achievements"]),
        response: z.string().describe("The conversational text to show the user. Be helpful, concise, and friendly. Answer questions about Tejas using the provided context."),
      }),
      system: `${portfolioData.systemPrompt}
      
      REALTIME EXTRACTED RESUME DATA (LIVE FROM public/resume.pdf):
      ${resumeText || 'See structured context below.'}
      
      ADDITIONAL IN-DEPTH PROJECT KNOWLEDGE:
      ${projectKnowledge || 'No additional project knowledge provided.'}
      
      STRUCTURED CONTEXT (TEJAS'S PORTFOLIO DATA):
      ${JSON.stringify(portfolioData, null, 2)}
      
      INSTRUCTIONS FOR TYPE:
      - If the user asks for resume, CV, or downloading/viewing his resume, set type to 'resume'.
      - If the user asks to see all projects or list his portfolio projects, set type to 'projects'.
      - If they ask for skills or technical stack, set type to 'skills'.
      - If they ask for contact info or how to reach/hire him, set type to 'contact'.
      - If they ask about Tejas's achievements or victories, set type to 'achievements'.
      - If they ask about Tejas generally (who is he, bio), set type to 'me'.
      - For all other detailed project explanations or questions, set type to 'text'.
      
      CRITICAL FORMATTING RULE: 
      Do NOT use any markdown formatting in your response. Do not use **bold**, do not use ## headers, do not use bullet points. Write everything in plain, natural text.`,
      prompt: message,
    });

    let data = null;
    switch (object.type) {
      case 'projects':
        data = portfolioData.projects;
        break;
      case 'skills':
        data = portfolioData.skills;
        break;
      case 'me':
        data = portfolioData.about;
        break;
      case 'contact':
        data = portfolioData.contact;
        break;
      case 'achievements':
        data = portfolioData.achievements;
        break;
      case 'resume':
        data = { url: "/resume.pdf", title: "Tejas_Solanki_Resume.pdf" };
        break;
    }

    return NextResponse.json({ 
      type: object.type, 
      response: object.response, 
      data 
    });

  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { type: "text", response: "Sorry, my AI brain is experiencing a hiccup right now. Please try again!" }, 
      { status: 500 }
    );
  }
}
