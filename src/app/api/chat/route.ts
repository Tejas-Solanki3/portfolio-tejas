import { NextResponse } from 'next/server';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject } from 'ai';
import { z } from 'zod';
import { portfolioData } from '@/data/portfolioData';
import fs from 'fs';
import path from 'path';
import { extractText } from 'unpdf';

// Helper function to dynamically read and parse resume.pdf in realtime
async function getRealtimeResumeText(): Promise<string> {
  try {
    const resumePath = path.join(process.cwd(), 'public', 'resume.pdf');
    if (fs.existsSync(resumePath)) {
      const buffer = fs.readFileSync(resumePath);
      const { text } = await extractText(new Uint8Array(buffer));
      if (Array.isArray(text)) {
        return text.join('\n\n');
      }
      return text || '';
    }
  } catch (err) {
    console.warn("Could not parse realtime resume.pdf, using static fallback:", err);
  }
  return '';
}

export async function POST(req: Request) {
  try {
    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY || '',
    });

    const { message } = await req.json();
    const cleanMsg = (message || '').trim().toLowerCase();

    // Fetch realtime text from public/resume.pdf
    const resumeText = await getRealtimeResumeText();

    // Check for explicit keywords to guarantee fast & accurate card rendering
    const isResumeQuery = cleanMsg === 'resume' || cleanMsg.includes('resume') || cleanMsg.includes(' cv') || cleanMsg === 'cv' || cleanMsg.includes('download resume');

    // Generate intelligent response using OpenRouter
    const { object } = await generateObject({
      model: openrouter('meta-llama/llama-3.1-8b-instruct'),
      schema: z.object({
        type: z.enum(["text", "projects", "skills", "me", "resume", "contact"]),
        response: z.string().describe("The conversational text to show the user. Be helpful, concise, and friendly. Answer questions about Tejas using the provided context."),
      }),
      system: `${portfolioData.systemPrompt}
      
      REALTIME EXTRACTED RESUME DATA (LIVE FROM public/resume.pdf):
      ${resumeText || 'See structured context below.'}
      
      STRUCTURED CONTEXT (TEJAS'S PORTFOLIO DATA):
      ${JSON.stringify(portfolioData, null, 2)}
      
      INSTRUCTIONS FOR TYPE:
      - If the user asks for resume, CV, or downloading/viewing his resume, ALWAYS set type to 'resume'.
      - If the user asks to see or learn about projects, set type to 'projects'.
      - If they ask for skills or technologies, set type to 'skills'.
      - If they ask for contact info or how to hire/reach, set type to 'contact'.
      - If they ask about Tejas generally (who is he, bio), set type to 'me'.
      - For all other conversational questions, set type to 'text'.
      
      CRITICAL FORMATTING RULE: 
      Do NOT use any markdown formatting in your response. Do not use **bold**, do not use ## headers, do not use bullet points. Write everything in plain, natural text.`,
      prompt: message,
    });

    const finalType = isResumeQuery ? 'resume' : object.type;

    // Attach the corresponding structured data based on the AI's chosen type
    let data = null;
    switch (finalType) {
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
      case 'resume':
        data = { url: "/resume.pdf", title: "Tejas_Solanki_Resume.pdf" };
        break;
    }

    return NextResponse.json({ 
      type: finalType, 
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
