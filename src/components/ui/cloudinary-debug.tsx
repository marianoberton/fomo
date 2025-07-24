"use client";

import React, { useState, useEffect } from 'react';
import { DEMO_VIDEOS, getDemoVideoUrl, getVideoThumbnail, isCloudinaryConfigured } from '@/lib/cloudinary';

export default function CloudinaryDebug() {
  const [isVisible, setIsVisible] = useState(false);
  const [configStatus, setConfigStatus] = useState<any>(null);

  useEffect(() => {
    // Solo mostrar en desarrollo
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    // Verificar configuración
    const checkConfig = () => {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;
      
      setConfigStatus({
        cloudName: cloudName || 'No configurado',
        apiKey: apiKey ? 'Configurado' : 'No configurado',
        apiSecret: apiSecret ? 'Configurado' : 'No configurado',
        isConfigured: !!(cloudName && apiKey && apiSecret)
      });
    };

    checkConfig();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-sm mb-2">🔧 Cloudinary Debug</h3>
      
      <div className="space-y-2 text-xs">
        <div>
          <strong>Cloud Name:</strong> {configStatus?.cloudName}
        </div>
        <div>
          <strong>API Key:</strong> {configStatus?.apiKey}
        </div>
        <div>
          <strong>API Secret:</strong> {configStatus?.apiSecret}
        </div>
        <div>
          <strong>Estado:</strong> 
          <span className={configStatus?.isConfigured ? 'text-green-600' : 'text-red-600'}>
            {configStatus?.isConfigured ? ' ✅ Configurado' : ' ❌ No configurado'}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <h4 className="font-semibold text-xs mb-2">🎥 Videos Configurados:</h4>
        <div className="space-y-1 text-xs">
          {Object.entries(DEMO_VIDEOS).map(([demoId, publicId]) => (
            <div key={demoId} className="flex justify-between">
              <span>{demoId}:</span>
              <span className="text-gray-600">{publicId}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <h4 className="font-semibold text-xs mb-2">🔗 URLs de Ejemplo:</h4>
        <div className="space-y-1 text-xs">
          {Object.keys(DEMO_VIDEOS).slice(0, 2).map((demoId) => (
            <div key={demoId}>
              <div className="font-medium">{demoId}:</div>
              <div className="text-gray-600 break-all">
                {getDemoVideoUrl(demoId as keyof typeof DEMO_VIDEOS)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 