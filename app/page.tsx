"use client";

import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import PlantInfo from "./components/PlantInfo";

export default function Home() {
  const [plantInfo, setPlantInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className='bg-gradient-to-b from-green-100 to-green-300 min-h-screen py-12'>
      <div className='container mx-auto px-4'>
        <h1 className='text-5xl font-bold mb-4 text-green-800 text-center'>
          Plant Identifier
        </h1>
        <p className='text-xl text-green-700 mb-8 text-center max-w-2xl mx-auto'>
          Discover the wonders of nature! Upload an image of a plant, and let
          our AI identify it for you.
        </p>
        <div className='flex justify-center mb-8'>
          <ImageUpload setPlantInfo={setPlantInfo} setImageUrl={setImageUrl} />
        </div>
        {plantInfo && imageUrl && (
          <div className='flex justify-center'>
            <PlantInfo info={plantInfo} imageUrl={imageUrl} />
          </div>
        )}
        {(!plantInfo || !imageUrl) && (
          <p className='text-gray-600 mt-4 text-center'>
            Upload an image to see plant information.
          </p>
        )}
      </div>
    </div>
  );
}
