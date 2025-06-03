
import React, { useEffect, useRef } from 'react';

interface AnimationPreviewProps {
  imageUrl: string | null;
  animationType: string;
  resolution: string;
  duration: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const AnimationPreview: React.FC<AnimationPreviewProps> = ({
  imageUrl,
  animationType,
  resolution,
  duration,
  canvasRef
}) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageUrl || !previewRef.current) return;

    const preview = previewRef.current;
    const img = preview.querySelector('img');
    
    if (!img) return;

    // Remove existing animation classes
    img.className = 'w-full h-full object-contain transition-all';
    
    // Apply animation based on type
    const animationClass = getAnimationClass(animationType);
    
    // Force reflow and apply animation
    void img.offsetWidth;
    img.style.animationDuration = `${duration}s`;
    img.className += ` ${animationClass}`;

  }, [imageUrl, animationType, duration]);

  const getAnimationClass = (type: string): string => {
    const animations = {
      scaleIn: 'animate-[scale-in_var(--duration)_ease-out_infinite]',
      scaleOut: 'animate-[scale-out_var(--duration)_ease-out_infinite]',
      swirlIn: 'animate-[swirl-in_var(--duration)_ease-out_infinite]',
      fadeIn: 'animate-[fade-in_var(--duration)_ease-out_infinite]',
      slideIn: 'animate-[slide-in_var(--duration)_ease-out_infinite]',
      bounceIn: 'animate-[bounce-in_var(--duration)_ease-out_infinite]',
      rotateIn: 'animate-[rotate-in_var(--duration)_ease-out_infinite]',
      zoomOut: 'animate-[zoom-out_var(--duration)_ease-out_infinite]'
    };
    return animations[type as keyof typeof animations] || animations.scaleIn;
  };

  const getAspectRatio = (resolution: string): string => {
    const ratios = {
      '1:1': 'aspect-square',
      '9:16': 'aspect-[9/16]',
      '16:9': 'aspect-[16/9]'
    };
    return ratios[resolution as keyof typeof ratios] || ratios['1:1'];
  };

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎬</span>
          </div>
          <p className="text-gray-500 text-sm">Upload an image to see the preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 rounded-xl p-4">
        <div 
          ref={previewRef}
          className={`mx-auto max-w-sm bg-white rounded-lg overflow-hidden ${getAspectRatio(resolution)}`}
          style={{ '--duration': `${duration}s` } as React.CSSProperties}
        >
          <img
            src={imageUrl}
            alt="Animation Preview"
            className="w-full h-full object-contain transition-all"
          />
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-600">
        <p>Animation: <span className="font-medium">{animationType}</span></p>
        <p>Resolution: <span className="font-medium">{resolution}</span></p>
        <p>Duration: <span className="font-medium">{duration}s</span></p>
      </div>

      {/* Hidden canvas for export */}
      <canvas
        ref={canvasRef}
        className="hidden"
        width={512}
        height={512}
      />
    </div>
  );
};
