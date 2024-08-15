import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent([
        "Identify this plant and provide its name, scientific name, and brief description.",
        {
          inlineData: { data: req.body.imageData, mimeType: req.body.mimeType },
        },
      ]);

      res.status(200).json({ plantInfo: result.response.text() });
    } catch (error) {
      console.error("Error in API route:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
