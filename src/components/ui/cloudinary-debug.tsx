"use client";

import React from 'react';
import { getDemoVideoUrl, getVideoThumbnail, DEMO_VIDEOS } from '@/lib/cloudinary';

export default function CloudinaryDebug() {
  const testVideo = (demoId: keyof typeof DEMO_VIDEOS) => {
    const videoUrl = getDemoVideoUrl(demoId);
    const thumbnailUrl = getVideoThumbnail(demoId);
    
    console.log(`Testing ${demoId}:`);
    console.log(`  Video URL: ${videoUrl}`);
    console.log(`  Thumbnail URL: ${thumbnailUrl}`);
    
    // Test if video loads
    const video = document.createElement('video');
    video.src = videoUrl;
    video.onloadeddata = () => {
      console.log(`✅ ${demoId} video loads successfully`);
    };
    video.onerror = (e) => {
      console.error(`❌ ${demoId} video failed to load:`, e);
    };
  };

  const testAllVideos = () => {
    console.log('🔍 Testing all Cloudinary videos...');
    console.log('Expected videos in Cloudinary:');
    
    Object.entries(DEMO_VIDEOS).forEach(([demoId, publicId]) => {
      console.log(`  ${demoId}: ${publicId}`);
      testVideo(demoId as keyof typeof DEMO_VIDEOS);
    });
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg z-50 max-w-md">
      <h3 className="font-bold mb-2">🛠️ Cloudinary Debug</h3>
      <button 
        onClick={testAllVideos}
        className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
      >
        Test All Videos
      </button>
      <div className="mt-2 text-xs">
        <p>Cloud Name: {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'Not set'}</p>
        <p className="text-yellow-400">Check console for results</p>
      </div>
      
      <div className="mt-3 space-y-1">
        <h4 className="font-semibold text-sm">Expected videos:</h4>
        {Object.entries(DEMO_VIDEOS).map(([demoId, publicId]) => (
          <div key={demoId} className="text-xs">
            <span className="text-green-400">{demoId}:</span> {publicId}
          </div>
        ))}
      </div>
    </div>
  );
} 