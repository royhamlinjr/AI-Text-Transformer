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

export async function POST(req: Request) {

    try {
        const { input, mode, tone, target } = await req.json();

        const cleanedInput = input ? input.trim() : "";

        if (!cleanedInput) {
            return new Response(JSON.stringify({ error: "Input text is required." }), { status: 400 });
        } 

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const interaction = await ai.interactions.create({
            model: "gemini-3.8-flash",
            system_instruction: buildInstructions(mode, tone, target),
            input: cleanedInput,
        });

        return Response.json({ output : interaction.output_text || ""});
    } catch (error) {
        console.error("Error in /transform route:", error);
        return new Response(JSON.stringify({ error: "An error occurred while processing the request." }), { status: 500 });
    }     
}