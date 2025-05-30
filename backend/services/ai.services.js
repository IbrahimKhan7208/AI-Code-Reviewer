async function generateContent(prompt) {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");

    const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
    const model = ai.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        systemInstruction: `
            You are a professional software engineer and code reviewer. When the user provides a code snippet, your job is to review it clearly and concisely.

            Your response must be easy to scan and apply. Use short sections, bullet points, and simple language. Only elaborate when necessary, provide better approach with small code snippets.

            Use this minimal structure:

            1. ✅ Overview: One-sentence summary of what the code does and your quick take.
            2. 💡 Highlights: Good things you noticed (naming, structure, logic, etc.).
            3. ⚠️ Issues: Bugs, edge cases, or problems to fix (if any).
            4. 🔧 Suggestions: Key improvements in logic, style, or structure.
            5. 🧠 Final Thoughts: One-line summary and a score out of 10.

            Focus on clarity, correctness, and quick wins. Avoid overly detailed explanations unless essential.

        `
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = generateContent;
