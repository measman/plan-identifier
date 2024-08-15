"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!
);

export default function ImageUpload({ setPlantInfo, setImageUrl }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const imageData = await readFileAsBase64(file);
      setImageUrl(URL.createObjectURL(file));

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent([
        "Identify this plant and provide the following information: " +
          "Common Name, Scientific Name, Brief Description, Origin, Growth Habit, Sunlight Requirements, Water Requirements. " +
          "Format the response as a JSON object with these keys. Do not include any markdown formatting.",
        { inlineData: { data: imageData, mimeType: file.type } },
      ]);

      let plantInfo = result.response.text();
      console.log("AI Response:", plantInfo); // For debugging

      // Clean up the response
      plantInfo = plantInfo.replace(/```json|\```/g, "").trim();

      try {
        const parsedInfo = JSON.parse(plantInfo);
        setPlantInfo(parsedInfo);
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        setError("Error parsing AI response. Please try again.");
        setPlantInfo(null);
      }
    } catch (error) {
      console.error("Error identifying plant:", error);
      setError(`Error identifying plant: ${error.message}`);
      setPlantInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className='mb-8'>
      <label
        htmlFor='image-upload'
        className='bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full cursor-pointer transition-colors text-lg'
      >
        {loading ? "Analyzing..." : "📷 Upload Plant Image"}
      </label>
      <input
        id='image-upload'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className='hidden'
        disabled={loading}
      />
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
}
