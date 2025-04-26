import { openai } from "@ai-sdk/openai"
import { google } from "@ai-sdk/google"
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from "ai"

import { neon } from '@neondatabase/serverless';
import { auth } from "@/auth"

const sql = neon(process.env.DATABASE_URL!);
// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Update the API route to handle both reasoning and search modes
export async function POST(req: Request) {
  const session = await auth()
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const email = session.user?.email
  
  
  // const { messages, model = "gpt-4o", isReasoningMode = false, isSearchMode = false } = await req.json()

  const { messages, model, isReasoningMode, isSearchMode } = await req.json()
  

;

  // Configure the model based on the selected provider
  let aiModel
let systemPrompt = "You are Genie, a helpful AI assistant. Please respond with plain text only. Do not use any formatting like Markdown, HTML, or similar markup."
  // Add mode context to system prompt
  if (isReasoningMode && isSearchMode) {
    systemPrompt +=
      " You have access to search the web for the most up-to-date information and will use your reasoning capabilities to analyze complex problems. Combine search results with your reasoning to provide comprehensive answers."
  } else if (isSearchMode) {
    systemPrompt +=
      " You have access to search the web for the most up-to-date information. When answering, make sure to search for relevant information first."
  } else if (isReasoningMode) {
    systemPrompt +=
      " You will use your reasoning capabilities to analyze complex problems and provide step-by-step explanations."
  } else {
    systemPrompt += " You will provide concise and helpful responses based on your knowledge."
  }

  // Select the appropriate model based on the provider
  if (model.startsWith("o") || model.startsWith("gpt")) {
   
    aiModel = openai(model)
    
  } 
  else if (model.startsWith("gemini")) {
   
    aiModel = google(model)
    
  } 
  else if (model.startsWith("deepseek") || model.startsWith("qwen") || model.startsWith("meta")) {
   
    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY!, // Make sure you have this in your environment
    });
  
    aiModel = openrouter(model);

  } 

  else {
    return new Response('Invalid model', { status: 400 });
  }
  

  const result = streamText({
    model: aiModel,
    messages,
    system: systemPrompt,
  })

  return result.toDataStreamResponse()
}