import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, model = "gpt-4o", isSearchMode = false } = await req.json()

  // Configure the model based on the selected provider
  let aiModel
  let systemPrompt = "You are Genie, a helpful AI assistant."

  // Add search mode context to system prompt if enabled
  if (isSearchMode) {
    systemPrompt +=
      " You have access to search the web for the most up-to-date information. When answering, make sure to search for relevant information first."
  } else {
    systemPrompt += " You will use your knowledge to answer questions without searching the web."
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

