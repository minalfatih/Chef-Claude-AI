import { InferenceClient } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page add suitable food emojis before each item
`

const hf = new InferenceClient(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ")
  try {
    // Using a model that should be available on Hugging Face Inference API
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
    })
    return response.choices[0].message.content
  } catch (err) {
    // If chatCompletion fails, fall back to textGeneration
    if (err.message?.includes("inference provider information")) {
      // console.warn("chatCompletion not available, falling back to textGeneration")
      const prompt = `${SYSTEM_PROMPT}\n\nUser: I have ${ingredientsString}. Please give me a recipe you'd recommend I make!\n\nAssistant:`
      const response = await hf.textGeneration({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        inputs: prompt,
        parameters: {
          max_new_tokens: 1024,
          return_full_text: false,
        },
      })
      return response.generated_text
    }
    console.error("Error details:", err)
    console.error("Error message:", err.message)
    throw err
  }
}
