"use client";

import { useState } from "react";
import Image from "next/image";
import ImageUpload from "./components/ImageUpload";
import PlantInfo from "./components/PlantInfo";
import { FaUpload, FaLeaf, FaInfoCircle, FaSeedling } from "react-icons/fa";

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
        <div className='flex justify-center mb-12'>
          <ImageUpload setPlantInfo={setPlantInfo} setImageUrl={setImageUrl} />
        </div>

        {/* How to Use Section */}
        <div className='mb-12'>
          <h2 className='text-3xl font-bold mb-4 text-green-800 text-center'>
            How It Works
          </h2>
          <p className='text-lg text-green-700 mb-8 text-center max-w-2xl mx-auto'>
            Our plant identification app is easy to use and provides valuable
            information about the plants you discover.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              {
                icon: <FaUpload className='text-4xl mb-4 text-green-600' />,
                title: "Upload Image",
                description:
                  "Take a clear photo of the plant you want to identify and upload it to our app.",
              },
              {
                icon: <FaLeaf className='text-4xl mb-4 text-green-600' />,
                title: "AI Analysis",
                description:
                  "Our advanced AI analyzes the image to identify the plant species.",
              },
              {
                icon: <FaInfoCircle className='text-4xl mb-4 text-green-600' />,
                title: "Get Information",
                description:
                  "Receive detailed information about the plant, including its name and characteristics.",
              },
              {
                icon: <FaSeedling className='text-4xl mb-4 text-green-600' />,
                title: "Learn More",
                description:
                  "Discover care tips, growing conditions, and interesting facts about the identified plant.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className='bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center'
              >
                {item.icon}
                <h3 className='text-xl font-semibold mb-2 text-green-800'>
                  {item.title}
                </h3>
                <p className='text-gray-600'>{item.description}</p>
              </div>
            ))}
          </div>
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
