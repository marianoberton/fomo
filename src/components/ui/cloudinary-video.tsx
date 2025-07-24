"use client";

import React, { useRef, useEffect, useState } from 'react';
import { getDemoVideoUrl, getVideoThumbnail, DEMO_VIDEOS } from '@/lib/cloudinary';

interface CloudinaryVideoProps {
  demoId: keyof typeof DEMO_VIDEOS;
  className?: string;
  autoPlayOnHover?: boolean;
  showThumbnail?: boolean;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
}

export default function CloudinaryVideo({
  demoId,
  className = "",
  autoPlayOnHover = true,
  showThumbnail = true,
  onVideoStart,
  onVideoEnd
}: CloudinaryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const videoUrl = getDemoVideoUrl(demoId);
  const thumbnailUrl = getVideoThumbnail(demoId);

  const handleMouseEnter = async () => {
    if (!autoPlayOnHover || !videoRef.current || hasError) return;

    try {
      await videoRef.current.play();
      setIsPlaying(true);
      onVideoStart?.();
    } catch (error) {
      console.warn('Error playing video:', error);
      setHasError(true);
    }
  };

  const handleMouseLeave = () => {
    if (!videoRef.current || hasError) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
    onVideoEnd?.();
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    console.error(`Failed to load video for demo: ${demoId}`);
  };

  // Preload video on component mount for better performance
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={handleLoadedData}
        onError={handleError}
        style={{ 
          opacity: isLoaded && !hasError ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Thumbnail Fallback */}
      {showThumbnail && (!isLoaded || hasError) && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-gray-200"
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
            opacity: hasError ? 1 : (isLoaded ? 0 : 1),
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Video no disponible</p>
          </div>
        </div>
      )}

      {/* Play State Indicator */}
      {isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none"
          style={{
            opacity: isPlaying ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
} 