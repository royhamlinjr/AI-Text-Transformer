import { GoogleGenAI } from "@google/genai";

function buildInstructions(mode : string, tone : string, target : string) {
    const base = "You are a helpful assistant that can rewrite or translate text based on the user's instructions.Do not add any extra commentary or explanations. Only provide the transformed text in your response.";
    
    if (mode === "summarize") {
        return `${base} Summarize the text in a concise manner for 5 bullet points.`;
    }
    else if (mode === "rewrite") {
        return `${base} Rewrite the text in a ${tone.toLowerCase()} tone.You should not change the meaning of the text.`;
    }
    else if (mode === "translate") {
        return `${base} Translate the text to ${target.toLowerCase()}.Do change the proper nouns and names to the target language.`;
    }
}
