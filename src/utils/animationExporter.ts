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
  // Create animated GIF using multiple frames
  const frames = 30; // 30 frames for animation
  const frameDelay = (duration * 1000) / frames; // Delay between frames in ms
  
  // For now, create a single frame as browsers don't support animated GIF creation natively
  // In a real implementation, you'd use a library like gif.js
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Apply animation at mid-point for static GIF
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
  // Create animated WebP (browsers support this better than GIF)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Apply animation at mid-point for static WebP
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
    // Attention Seekers
    case 'bounceIn':
      const bounceProgress = progress * Math.PI * 2;
      const bounceScale = 0.2 + Math.abs(Math.sin(bounceProgress)) * 0.8;
      const bounceY = Math.sin(bounceProgress) * 20;
      ctx.scale(bounceScale, bounceScale);
      ctx.translate(0, bounceY);
      ctx.globalAlpha = 0.3 + (Math.sin(progress * Math.PI * 2) * 0.35 + 0.35);
      break;
      
    case 'flashIn':
      ctx.globalAlpha = Math.sin(progress * Math.PI * 8) * 0.5 + 0.5;
      break;
      
    case 'rubberbandIn':
      const rubberScale = 1 + Math.sin(progress * Math.PI * 6) * 0.3;
      ctx.scale(rubberScale, 1 / rubberScale);
      break;
      
    case 'shakeXIn':
      const shakeX = Math.sin(progress * Math.PI * 16) * 10;
      ctx.translate(shakeX, 0);
      break;
      
    case 'shakeYIn':
      const shakeY = Math.sin(progress * Math.PI * 16) * 10;
      ctx.translate(0, shakeY);
      break;
      
    case 'headShakeIn':
      const headRotation = Math.sin(progress * Math.PI * 4) * 0.1;
      ctx.rotate(headRotation);
      break;
      
    case 'swingIn':
      const swingRotation = Math.sin(progress * Math.PI * 3) * 0.3;
      ctx.rotate(swingRotation);
      break;
      
    case 'tadaIn':
      const tadaScale = 1 + Math.sin(progress * Math.PI * 4) * 0.2;
      const tadaRotation = Math.sin(progress * Math.PI * 8) * 0.1;
      ctx.scale(tadaScale, tadaScale);
      ctx.rotate(tadaRotation);
      break;
      
    case 'wobbleIn':
      const wobbleX = Math.sin(progress * Math.PI * 6) * 15;
      const wobbleRotation = Math.sin(progress * Math.PI * 6) * 0.1;
      ctx.translate(wobbleX, 0);
      ctx.rotate(wobbleRotation);
      break;
      
    case 'jelloIn':
      const jelloScaleX = 1 + Math.sin(progress * Math.PI * 8) * 0.3;
      const jelloScaleY = 1 + Math.cos(progress * Math.PI * 8) * 0.3;
      ctx.scale(jelloScaleX, jelloScaleY);
      break;
      
    case 'heartBeatIn':
      const heartScale = 1 + Math.sin(progress * Math.PI * 4) * 0.1;
      ctx.scale(heartScale, heartScale);
      break;

    // Back Entrances
    case 'backInBottom':
      const backBottomY = Math.sin(progress * Math.PI) * height;
      const backBottomScale = 0.7 + Math.sin(progress * Math.PI) * 0.3;
      ctx.translate(0, backBottomY);
      ctx.scale(backBottomScale, backBottomScale);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'backInLeft':
      const backLeftX = -Math.sin(progress * Math.PI) * width;
      const backLeftScale = 0.7 + Math.sin(progress * Math.PI) * 0.3;
      ctx.translate(backLeftX, 0);
      ctx.scale(backLeftScale, backLeftScale);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'backInRight':
      const backRightX = Math.sin(progress * Math.PI) * width;
      const backRightScale = 0.7 + Math.sin(progress * Math.PI) * 0.3;
      ctx.translate(backRightX, 0);
      ctx.scale(backRightScale, backRightScale);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'backInTop':
      const backTopY = -Math.sin(progress * Math.PI) * height;
      const backTopScale = 0.7 + Math.sin(progress * Math.PI) * 0.3;
      ctx.translate(0, backTopY);
      ctx.scale(backTopScale, backTopScale);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;

    // Bouncing Entrances
    case 'bounceInBottom':
      const bounceBottomY = (1 - Math.sin(progress * Math.PI)) * height * 0.8;
      const bounceBottomScale = 0.3 + Math.sin(progress * Math.PI) * 0.7;
      ctx.translate(0, bounceBottomY);
      ctx.scale(bounceBottomScale, bounceBottomScale);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'bounceInLeft':
      const bounceLeftX = -(1 - Math.sin(progress * Math.PI)) * width * 0.8;
      const bounceLeftScale = 0.3 + Math.sin(progress * Math.PI) * 0.7;
      ctx.translate(bounceLeftX, 0);
      ctx.scale(bounceLeftScale, bounceLeftScale);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'bounceInRight':
      const bounceRightX = (1 - Math.sin(progress * Math.PI)) * width * 0.8;
      const bounceRightScale = 0.3 + Math.sin(progress * Math.PI) * 0.7;
      ctx.translate(bounceRightX, 0);
      ctx.scale(bounceRightScale, bounceRightScale);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'bounceInTop':
      const bounceTopY = -(1 - Math.sin(progress * Math.PI)) * height * 0.8;
      const bounceTopScale = 0.3 + Math.sin(progress * Math.PI) * 0.7;
      ctx.translate(0, bounceTopY);
      ctx.scale(bounceTopScale, bounceTopScale);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;

    // Fading Entrances
    case 'fadeIn':
      ctx.globalAlpha = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;
      break;
      
    case 'fadeInBottom':
      const fadeBottomY = (1 - Math.sin(progress * Math.PI)) * 30;
      ctx.translate(0, fadeBottomY);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'fadeInBottomBig':
      const fadeBottomBigY = (1 - Math.sin(progress * Math.PI)) * height * 0.5;
      ctx.translate(0, fadeBottomBigY);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'fadeInLeft':
      const fadeLeftX = -(1 - Math.sin(progress * Math.PI)) * 30;
      ctx.translate(fadeLeftX, 0);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'fadeInLeftBig':
      const fadeLeftBigX = -(1 - Math.sin(progress * Math.PI)) * width * 0.5;
      ctx.translate(fadeLeftBigX, 0);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'fadeInRight':
      const fadeRightX = (1 - Math.sin(progress * Math.PI)) * 30;
      ctx.translate(fadeRightX, 0);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'fadeInRightBig':
      const fadeRightBigX = (1 - Math.sin(progress * Math.PI)) * width * 0.5;
      ctx.translate(fadeRightBigX, 0);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'fadeInTop':
      const fadeTopY = -(1 - Math.sin(progress * Math.PI)) * 30;
      ctx.translate(0, fadeTopY);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'fadeInTopBig':
      const fadeTopBigY = -(1 - Math.sin(progress * Math.PI)) * height * 0.5;
      ctx.translate(0, fadeTopBigY);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'fadeInTL':
      const fadeTLX = -(1 - Math.sin(progress * Math.PI)) * width * 0.3;
      const fadeTLY = -(1 - Math.sin(progress * Math.PI)) * height * 0.3;
      ctx.translate(fadeTLX, fadeTLY);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'fadeInTR':
      const fadeTRX = (1 - Math.sin(progress * Math.PI)) * width * 0.3;
      const fadeTRY = -(1 - Math.sin(progress * Math.PI)) * height * 0.3;
      ctx.translate(fadeTRX, fadeTRY);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'fadeInBL':
      const fadeBLX = -(1 - Math.sin(progress * Math.PI)) * width * 0.3;
      const fadeBLY = (1 - Math.sin(progress * Math.PI)) * height * 0.3;
      ctx.translate(fadeBLX, fadeBLY);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'fadeInBR':
      const fadeBRX = (1 - Math.sin(progress * Math.PI)) * width * 0.3;
      const fadeBRY = (1 - Math.sin(progress * Math.PI)) * height * 0.3;
      ctx.translate(fadeBRX, fadeBRY);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;

    // Flippers
    case 'flipIn':
      const flipScale = Math.abs(Math.cos(progress * Math.PI));
      ctx.scale(flipScale, 1);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'flipInX':
      const flipXScale = Math.abs(Math.cos(progress * Math.PI));
      ctx.scale(1, flipXScale);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'flipInY':
      const flipYScale = Math.abs(Math.cos(progress * Math.PI));
      ctx.scale(flipYScale, 1);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;

    // Lightspeed
    case 'lightSpeedInRight':
      const lightRightX = (1 - progress) * width;
      const lightRightSkew = (1 - progress) * 0.3;
      ctx.translate(-lightRightX, 0);
      ctx.transform(1, 0, lightRightSkew, 1, 0, 0);
      ctx.globalAlpha = progress;
      break;
      
    case 'lightSpeedInLeft':
      const lightLeftX = (1 - progress) * -width;
      const lightLeftSkew = (1 - progress) * -0.3;
      ctx.translate(-lightLeftX, 0);
      ctx.transform(1, 0, lightLeftSkew, 1, 0, 0);
      ctx.globalAlpha = progress;
      break;

    // Rotating Entrances
    case 'rotateIn':
      const rotation = progress * Math.PI * 4; // 2 full rotations
      const rotateScale = 0.2 + (Math.sin(progress * Math.PI * 2) * 0.4 + 0.4);
      ctx.rotate(rotation);
      ctx.scale(rotateScale, rotateScale);
      ctx.globalAlpha = 0.2 + (Math.sin(progress * Math.PI * 2) * 0.4 + 0.4);
      break;
      
    case 'rotateInBL':
      const rotateBLRotation = -(1 - progress) * Math.PI;
      ctx.translate(-centerX * 0.5, centerY * 0.5);
      ctx.rotate(rotateBLRotation);
      ctx.translate(centerX * 0.5, -centerY * 0.5);
      ctx.globalAlpha = progress;
      break;
      
    case 'rotateInBR':
      const rotateBRRotation = (1 - progress) * Math.PI;
      ctx.translate(centerX * 0.5, centerY * 0.5);
      ctx.rotate(rotateBRRotation);
      ctx.translate(-centerX * 0.5, -centerY * 0.5);
      ctx.globalAlpha = progress;
      break;
      
    case 'rotateInTL':
      const rotateTLRotation = (1 - progress) * Math.PI;
      ctx.translate(-centerX * 0.5, -centerY * 0.5);
      ctx.rotate(rotateTLRotation);
      ctx.translate(centerX * 0.5, centerY * 0.5);
      ctx.globalAlpha = progress;
      break;
      
    case 'rotateInTR':
      const rotateTRRotation = -(1 - progress) * Math.PI;
      ctx.translate(centerX * 0.5, -centerY * 0.5);
      ctx.rotate(rotateTRRotation);
      ctx.translate(-centerX * 0.5, centerY * 0.5);
      ctx.globalAlpha = progress;
      break;

    // Specials
    case 'jackInTheBox':
      const jackScale = 0.1 + Math.sin(progress * Math.PI) * 0.9;
      const jackRotation = (1 - progress) * Math.PI * 0.5;
      ctx.scale(jackScale, jackScale);
      ctx.rotate(jackRotation);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'rollIn':
      const rollX = -(1 - progress) * width;
      const rollRotation = -(1 - progress) * Math.PI * 3;
      ctx.translate(rollX, 0);
      ctx.rotate(rollRotation);
      ctx.globalAlpha = progress;
      break;

    // Zooming Entrances
    case 'zoomIn':
      const zoomScale = 0.3 + progress * 0.7;
      ctx.scale(zoomScale, zoomScale);
      ctx.globalAlpha = progress;
      break;
      
    case 'zoomInBottom':
      const zoomBottomScale = 0.1 + Math.sin(progress * Math.PI) * 0.9;
      const zoomBottomY = (1 - Math.sin(progress * Math.PI)) * height * 0.6;
      ctx.scale(zoomBottomScale, zoomBottomScale);
      ctx.translate(0, zoomBottomY);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'zoomInLeft':
      const zoomLeftScale = 0.1 + Math.sin(progress * Math.PI) * 0.9;
      const zoomLeftX = -(1 - Math.sin(progress * Math.PI)) * width * 0.6;
      ctx.scale(zoomLeftScale, zoomLeftScale);
      ctx.translate(zoomLeftX, 0);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'zoomInRight':
      const zoomRightScale = 0.1 + Math.sin(progress * Math.PI) * 0.9;
      const zoomRightX = (1 - Math.sin(progress * Math.PI)) * width * 0.6;
      ctx.scale(zoomRightScale, zoomRightScale);
      ctx.translate(zoomRightX, 0);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'zoomInTop':
      const zoomTopScale = 0.1 + Math.sin(progress * Math.PI) * 0.9;
      const zoomTopY = -(1 - Math.sin(progress * Math.PI)) * height * 0.6;
      ctx.scale(zoomTopScale, zoomTopScale);
      ctx.translate(0, zoomTopY);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;

    // Sliding Entrances
    case 'slideInBottom':
      const slideBottomY = (1 - progress) * height;
      ctx.translate(0, slideBottomY);
      break;
      
    case 'slideInLeft':
      const slideLeftX = -(1 - progress) * width;
      ctx.translate(slideLeftX, 0);
      break;
      
    case 'slideInRight':
      const slideRightX = (1 - progress) * width;
      ctx.translate(slideRightX, 0);
      break;
      
    case 'slideInTop':
      const slideTopY = -(1 - progress) * height;
      ctx.translate(0, slideTopY);
      break;

    // Custom Complex Animations
    case 'scaleIn':
      const scaleIn = 0.1 + (Math.sin(progress * Math.PI * 2) * 0.45 + 0.45);
      ctx.scale(scaleIn, scaleIn);
      ctx.globalAlpha = 0.3 + (Math.sin(progress * Math.PI * 2) * 0.35 + 0.35);
      break;
      
    case 'swirlIn':
      const swirlScale = 0.1 + (Math.sin(progress * Math.PI * 2) * 0.45 + 0.45);
      const swirlRotation = progress * Math.PI * 6; // 3 full rotations
      ctx.scale(swirlScale, swirlScale);
      ctx.rotate(swirlRotation);
      ctx.globalAlpha = 0.2 + (Math.sin(progress * Math.PI * 2) * 0.4 + 0.4);
      break;
      
    case 'flipSlitIn':
      const slitScale = Math.abs(Math.cos(progress * Math.PI * 2));
      const slitRotation = progress * Math.PI * 2;
      ctx.scale(slitScale, 1);
      ctx.rotate(slitRotation);
      ctx.globalAlpha = Math.sin(progress * Math.PI);
      break;
      
    case 'slideIn':
      const slideX = Math.sin(progress * Math.PI * 2) * width * 0.8;
      ctx.translate(slideX, 0);
      ctx.globalAlpha = 0.3 + (Math.cos(progress * Math.PI * 2) * 0.35 + 0.35);
      break;
      
    case 'bounceRollIn':
      const brScale = 0.2 + Math.abs(Math.sin(progress * Math.PI * 4)) * 0.8;
      const brRotation = progress * Math.PI * 8;
      const brY = Math.sin(progress * Math.PI * 4) * 30;
      ctx.scale(brScale, brScale);
      ctx.rotate(brRotation);
      ctx.translate(0, brY);
      ctx.globalAlpha = 0.3 + (Math.sin(progress * Math.PI * 2) * 0.35 + 0.35);
      break;
      
    case 'tiltIn':
      const tiltRotation = (1 - progress) * Math.PI * 0.25;
      const tiltScale = 0.5 + progress * 0.5;
      ctx.rotate(tiltRotation);
      ctx.scale(tiltScale, tiltScale);
      ctx.globalAlpha = progress;
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
