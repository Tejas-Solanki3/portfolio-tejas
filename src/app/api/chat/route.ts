import { NextResponse } from 'next/server';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject } from 'ai';
import { z } from 'zod';
import { portfolioData } from '@/data/portfolioData';

// Initialize OpenRouter provider
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Generate intelligent response using OpenRouter
    const { object } = await generateObject({
      model: openrouter('meta-llama/llama-3.1-8b-instruct'), // Standard Llama 3.1 8B (very cheap/fast)
      schema: z.object({
        type: z.enum(["text", "projects", "skills", "me", "resume", "contact"]),
        response: z.string().describe("The conversational text to show the user. Be helpful, concise, and friendly. Answer questions about Tejas using the provided context."),
      }),
      system: `${portfolioData.systemPrompt}
      
      CONTEXT (TEJAS'S PORTFOLIO DATA):
      ${JSON.stringify(portfolioData, null, 2)}
      
      INSTRUCTIONS FOR TYPE:
      - If the user asks to see or learn about projects, set type to 'projects'.
      - If they ask for skills or technologies, set type to 'skills'.
      - If they ask for contact info or how to hire/reach, set type to 'contact'.
      - If they ask for resume or CV, set type to 'resume'.
      - If they ask about Tejas generally (who is he, bio), set type to 'me'.
      - For all other conversational questions, set type to 'text'.
      
      CRITICAL FORMATTING RULE: 
      Do NOT use any markdown formatting in your response. Do not use **bold**, do not use ## headers, do not use bullet points. Write everything in plain, natural text.`,
      prompt: message,
    });

    // Attach the corresponding structured data based on the AI's chosen type
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
      case 'resume':
        data = { url: "/resume.pdf" };
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
