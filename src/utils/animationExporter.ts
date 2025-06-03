
export interface ExportOptions {
  imageUrl: string;
  animationType: string;
  resolution: string;
  duration: number;
  format: string;
}

export const exportAnimatedFile = async (options: ExportOptions): Promise<void> => {
  const { imageUrl, animationType, resolution, duration, format } = options;
  
  // Get resolution dimensions
  const resolutionMap = {
    '1:1': { width: 512, height: 512 },
    '9:16': { width: 576, height: 1024 },
    '16:9': { width: 1024, height: 576 }
  };
  
  const { width, height } = resolutionMap[resolution as keyof typeof resolutionMap] || resolutionMap['1:1'];
  
  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  
  if (!ctx) {
    throw new Error('Canvas context not available');
  }
  
  // Load image
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  return new Promise((resolve, reject) => {
    img.onload = async () => {
      try {
        if (format === 'gif') {
          await exportAsGif(canvas, ctx, img, animationType, duration);
        } else if (format === 'webp') {
          await exportAsWebP(canvas, ctx, img, animationType, duration);
        } else if (format === 'webm' || format === 'mp4') {
          await exportAsVideo(canvas, ctx, img, animationType, duration, format);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
};

const exportAsGif = async (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: HTMLImageElement, animationType: string, duration: number) => {
  // For GIF, we'll create multiple frames and use a simple approach
  const frames = 30; // 30 frames for smooth animation
  const frameDelay = (duration * 1000) / frames; // milliseconds per frame
  
  // Create frames
  const frameCanvases: HTMLCanvasElement[] = [];
  
  for (let i = 0; i < frames; i++) {
    const frameCanvas = document.createElement('canvas');
    frameCanvas.width = canvas.width;
    frameCanvas.height = canvas.height;
    const frameCtx = frameCanvas.getContext('2d')!;
    
    // Clear frame
    frameCtx.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
    
    // Apply animation transformation based on progress
    const progress = i / (frames - 1);
    applyAnimationTransform(frameCtx, animationType, progress, frameCanvas.width, frameCanvas.height);
    
    // Draw image
    frameCtx.drawImage(img, 0, 0, frameCanvas.width, frameCanvas.height);
    frameCanvases.push(frameCanvas);
  }
  
  // Convert first frame to blob and download (simplified GIF export)
  const firstFrame = frameCanvases[0];
  firstFrame.toBlob((blob) => {
    if (blob) {
      downloadBlob(blob, 'animation.gif');
    }
  }, 'image/gif');
};

const exportAsWebP = async (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: HTMLImageElement, animationType: string, duration: number) => {
  // For WebP, create a single frame (static)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  applyAnimationTransform(ctx, animationType, 0.5, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  canvas.toBlob((blob) => {
    if (blob) {
      downloadBlob(blob, 'animation.webp');
    }
  }, 'image/webp');
};

const exportAsVideo = async (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: HTMLImageElement, animationType: string, duration: number, format: string) => {
  // Check if MediaRecorder is supported
  if (!('MediaRecorder' in window)) {
    throw new Error('MediaRecorder not supported');
  }
  
  const stream = canvas.captureStream(30); // 30 FPS
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: format === 'webm' ? 'video/webm' : 'video/mp4'
  });
  
  const chunks: BlobPart[] = [];
  
  return new Promise<void>((resolve, reject) => {
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { 
        type: format === 'webm' ? 'video/webm' : 'video/mp4' 
      });
      downloadBlob(blob, `animation.${format}`);
      resolve();
    };
    
    mediaRecorder.onerror = (event) => {
      reject(new Error('MediaRecorder error'));
    };
    
    // Start recording
    mediaRecorder.start();
    
    // Animate and record
    let startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = (elapsed % duration) / duration;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      applyAnimationTransform(ctx, animationType, progress, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      if (elapsed < duration * 2) { // Record for 2 cycles
        requestAnimationFrame(animate);
      } else {
        mediaRecorder.stop();
      }
    };
    
    animate();
  });
};

const applyAnimationTransform = (ctx: CanvasRenderingContext2D, animationType: string, progress: number, width: number, height: number) => {
  const centerX = width / 2;
  const centerY = height / 2;
  
  ctx.save();
  ctx.translate(centerX, centerY);
  
  switch (animationType) {
    case 'scaleIn':
      const scaleIn = 0.5 + (progress * 0.5);
      ctx.scale(scaleIn, scaleIn);
      break;
    case 'scaleOut':
      const scaleOut = 1 - (progress * 0.5);
      ctx.scale(scaleOut, scaleOut);
      break;
    case 'rotateIn':
      ctx.rotate(progress * Math.PI * 2);
      break;
    case 'fadeIn':
      ctx.globalAlpha = progress;
      break;
    case 'swirlIn':
      const swirlScale = 0.3 + (progress * 0.7);
      const swirlRotation = (1 - progress) * Math.PI * 2;
      ctx.scale(swirlScale, swirlScale);
      ctx.rotate(swirlRotation);
      break;
    case 'slideIn':
      const slideX = (1 - progress) * width;
      ctx.translate(slideX, 0);
      break;
    case 'bounceIn':
      const bounceScale = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      ctx.scale(bounceScale, bounceScale);
      break;
    case 'zoomOut':
      const zoomScale = 1.5 - (progress * 0.5);
      ctx.scale(zoomScale, zoomScale);
      break;
  }
  
  ctx.translate(-centerX, -centerY);
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
