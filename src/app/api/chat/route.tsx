import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { neon } from '@neondatabase/serverless';
import { auth } from "@/auth"

const sql = neon(process.env.DATABASE_URL!);
// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Update the API route to handle both reasoning and search modes
export async function POST(req: Request) {
  const session = await auth()
  if(!session) return null

  const email = session.user?.email
  
  
  const { messages, model = "gpt-4o", isReasoningMode = false, isSearchMode = false } = await req.json()



  // await sql`
  // UPDATE conversations
  // SET messages = ${JSON.stringify(messages)}::jsonb
  // WHERE email = ${email}`
;

  // Configure the model based on the selected provider
  let aiModel
  let systemPrompt = "You are Genie, a helpful AI assistant."

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
  if (model.startsWith("gemini")) {
    // This would use the Google provider in a real implementation
    // For now, we'll use OpenAI as a fallback
    aiModel = openai("gpt-4o")
  } else if (model.startsWith("llama")) {
    // This would use a Llama provider in a real implementation
    aiModel = openai("gpt-4o")
  } else if (model.startsWith("deepseek")) {
    // This would use the DeepSeek provider in a real implementation
    aiModel = openai("gpt-4o")
  } else if (model.startsWith("qwen")) {
    // This would use the Qwen provider in a real implementation
    aiModel = openai("gpt-4o")
  } else {
    // Default to OpenAI
    aiModel = openai(model)
  }

  const result = streamText({
    model: aiModel,
    messages,
    system: systemPrompt,
  })

  return result.toDataStreamResponse()
}