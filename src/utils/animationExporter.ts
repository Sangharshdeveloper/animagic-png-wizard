
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
  // For GIF, we'll create the first frame as a sample
  // Note: Real GIF creation would require a GIF encoder library
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Apply animation at mid-point
  ctx.save();
  applyAnimationTransform(ctx, animationType, 0.5, canvas.width, canvas.height, img);
  ctx.restore();
  
  canvas.toBlob((blob) => {
    if (blob) {
      downloadBlob(blob, 'animation.gif');
    }
  }, 'image/gif');
};

const exportAsWebP = async (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: HTMLImageElement, animationType: string, duration: number) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Apply animation at mid-point
  ctx.save();
  applyAnimationTransform(ctx, animationType, 0.5, canvas.width, canvas.height, img);
  ctx.restore();
  
  canvas.toBlob((blob) => {
    if (blob) {
      downloadBlob(blob, 'animation.webp');
    }
  }, 'image/webp', 0.9);
};

const exportAsVideo = async (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: HTMLImageElement, animationType: string, duration: number, format: string) => {
  // Check if MediaRecorder is supported
  if (!('MediaRecorder' in window)) {
    throw new Error('MediaRecorder not supported');
  }
  
  const stream = canvas.captureStream(30); // 30 FPS
  const mimeType = format === 'webm' ? 'video/webm;codecs=vp8' : 'video/mp4';
  
  // Check if the mime type is supported
  if (!MediaRecorder.isTypeSupported(mimeType)) {
    console.warn(`${mimeType} not supported, falling back to webm`);
  }
  
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : 'video/webm'
  });
  
  const chunks: BlobPart[] = [];
  
  return new Promise<void>((resolve, reject) => {
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const actualMimeType = MediaRecorder.isTypeSupported(mimeType) ? mimeType : 'video/webm';
      const blob = new Blob(chunks, { type: actualMimeType });
      const extension = actualMimeType.includes('mp4') ? 'mp4' : 'webm';
      downloadBlob(blob, `animation.${extension}`);
      resolve();
    };
    
    mediaRecorder.onerror = (event) => {
      reject(new Error('MediaRecorder error'));
    };
    
    // Start recording
    mediaRecorder.start(100); // Collect data every 100ms
    
    // Animate and record
    let startTime = Date.now();
    const totalDuration = duration * 1000; // Convert to milliseconds
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % totalDuration) / totalDuration;
      
      // Clear canvas with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Apply animation
      ctx.save();
      applyAnimationTransform(ctx, animationType, progress, canvas.width, canvas.height, img);
      ctx.restore();
      
      // Continue animation for specified duration * 2 (2 complete cycles)
      if (elapsed < totalDuration * 2) {
        requestAnimationFrame(animate);
      } else {
        // Stop recording after animation completes
        setTimeout(() => {
          mediaRecorder.stop();
        }, 200);
      }
    };
    
    animate();
  });
};

const applyAnimationTransform = (ctx: CanvasRenderingContext2D, animationType: string, progress: number, width: number, height: number, img: HTMLImageElement) => {
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Move to center for transformations
  ctx.translate(centerX, centerY);
  
  switch (animationType) {
    case 'scaleIn':
      const scaleIn = 0.1 + (Math.sin(progress * Math.PI * 2) * 0.45 + 0.45);
      ctx.scale(scaleIn, scaleIn);
      ctx.globalAlpha = 0.3 + (Math.sin(progress * Math.PI * 2) * 0.35 + 0.35);
      break;
      
    case 'scaleOut':
      const scaleOut = 1.5 - (Math.sin(progress * Math.PI * 2) * 0.45 + 0.45);
      ctx.scale(scaleOut, scaleOut);
      ctx.globalAlpha = 0.4 + (Math.cos(progress * Math.PI * 2) * 0.3 + 0.3);
      break;
      
    case 'rotateIn':
      const rotation = progress * Math.PI * 4; // 2 full rotations
      const rotateScale = 0.2 + (Math.sin(progress * Math.PI * 2) * 0.4 + 0.4);
      ctx.rotate(rotation);
      ctx.scale(rotateScale, rotateScale);
      ctx.globalAlpha = 0.2 + (Math.sin(progress * Math.PI * 2) * 0.4 + 0.4);
      break;
      
    case 'fadeIn':
      ctx.globalAlpha = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;
      break;
      
    case 'swirlIn':
      const swirlScale = 0.1 + (Math.sin(progress * Math.PI * 2) * 0.45 + 0.45);
      const swirlRotation = progress * Math.PI * 6; // 3 full rotations
      ctx.scale(swirlScale, swirlScale);
      ctx.rotate(swirlRotation);
      ctx.globalAlpha = 0.2 + (Math.sin(progress * Math.PI * 2) * 0.4 + 0.4);
      break;
      
    case 'slideIn':
      const slideX = Math.sin(progress * Math.PI * 2) * width * 0.8;
      ctx.translate(slideX, 0);
      ctx.globalAlpha = 0.3 + (Math.cos(progress * Math.PI * 2) * 0.35 + 0.35);
      break;
      
    case 'bounceIn':
      // Create a bouncing effect with easing
      const bounceProgress = progress * Math.PI * 2;
      const bounceScale = 0.2 + Math.abs(Math.sin(bounceProgress)) * 0.8;
      const bounceY = Math.sin(bounceProgress) * 20;
      ctx.scale(bounceScale, bounceScale);
      ctx.translate(0, bounceY);
      ctx.globalAlpha = 0.3 + (Math.sin(progress * Math.PI * 2) * 0.35 + 0.35);
      break;
      
    case 'zoomOut':
      const zoomScale = 0.5 + (Math.cos(progress * Math.PI * 2) * 0.5 + 0.5);
      ctx.scale(zoomScale, zoomScale);
      ctx.globalAlpha = 0.4 + (Math.sin(progress * Math.PI * 2) * 0.3 + 0.3);
      break;
      
    default:
      // Default to scale in
      const defaultScale = 0.3 + (Math.sin(progress * Math.PI * 2) * 0.35 + 0.35);
      ctx.scale(defaultScale, defaultScale);
      break;
  }
  
  // Draw the image centered
  const aspectRatio = img.width / img.height;
  let drawWidth = width;
  let drawHeight = height;
  
  if (aspectRatio > 1) {
    drawHeight = width / aspectRatio;
  } else {
    drawWidth = height * aspectRatio;
  }
  
  ctx.drawImage(img, -drawWidth/2, -drawHeight/2, drawWidth, drawHeight);
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
