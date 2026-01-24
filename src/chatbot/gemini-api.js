// Gemini API Integration for Yaikh Dashboard
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = "AIzaSyD3MuHo_dmXQdGjMVz6WX7HXZ0OuWbY1yY";

const GEMINI_MODEL = "gemini-2.5-flash";

// Initialize GoogleGenAI instance
const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

/**
 * Generate response using Gemini API
 * @param {string} userMessage - The user's message
 * @param {string} botName - Name of the bot (for Yai 1) or 'Yai 2' (for Yai 2)
 * @param {string} botContext - Context about the bot's role
 * @param {Array} chatHistory - Previous messages in the conversation
 * @returns {Promise<string>} - The AI-generated response
 */
export const generateGeminiResponse = async (
  userMessage,
  botName = "Yai 2",
  botContext = "",
  chatHistory = [],
) => {
  try {
    // Build context about Yaikh platform
    const yaikhContext = `You are ${botName}, an AI assistant for Yaikh (Yaikh.com), an AI platform developed by TexLink Technologies Co., Ltd. 

Yaikh specializes in:
- Yai Digitalization: Digital transformation solutions
- Yai AiOT: AI and Internet of Things integration
- Yai Bots: AI-powered chatbot solutions
- Yai E-com: E-commerce solutions
- Yai Gov: Government digitalization solutions

The platform website: https://yaikh.com/ (demo/portfolio site)
The main application: https://ym.yaikh.com/ (real production system)

${botContext ? `Your specific role: ${botContext}` : "You are a general assistant helping users with the Yaikh platform."}

Provide helpful, professional, and accurate responses. Be concise but informative. Use emojis appropriately for better readability.`;

    // Build conversation history for context
    const recentHistory = chatHistory.slice(-10); // Keep last 10 messages for context

    // Build the full conversation context
    // Start with system context
    let conversationContent = yaikhContext;

    // Add conversation history if available
    if (recentHistory.length > 0) {
      conversationContent += "\n\nPrevious conversation:\n";
      recentHistory.forEach((msg) => {
        const role = msg.from === "user" ? "User" : "Assistant";
        conversationContent += `${role}: ${msg.text}\n`;
      });
    }

    // Add current user message
    conversationContent += `\nUser: ${userMessage}\nAssistant:`;

    // Generate response using GoogleGenAI
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: conversationContent,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Extract the response text
    if (response && response.text) {
      return response.text.trim();
    } else {
      throw new Error("Invalid response format from Gemini API");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a fallback response
    return `I apologize, but I'm having trouble processing your request right now. Please try again or rephrase your question. If the issue persists, you can contact support at [email protected] or call +855 96 575 4574.`;
  }
};

/**
 * Check if a message should use Gemini API (when no predefined response matches)
 * @param {string} message - The user's message
 * @param {boolean} hasPredefinedResponse - Whether a predefined response was found
 * @returns {boolean} - Whether to use Gemini API
 */
export const shouldUseGemini = (message, hasPredefinedResponse) => {
  // Use Gemini for general questions, complex queries, or when no predefined response exists
  if (hasPredefinedResponse) {
    return false; // Use predefined response
  }

  // Use Gemini for questions, general inquiries, or complex queries
  const questionWords = [
    "what",
    "how",
    "why",
    "when",
    "where",
    "who",
    "which",
    "can",
    "could",
    "would",
    "should",
    "tell",
    "explain",
    "describe",
    "help",
  ];
  const lowerMessage = message.toLowerCase();

  return (
    questionWords.some((word) => lowerMessage.includes(word)) ||
    lowerMessage.length > 20 || // Longer messages likely need AI
    !hasPredefinedResponse
  );
};
