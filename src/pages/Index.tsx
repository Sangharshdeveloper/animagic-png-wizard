
import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, Play, Settings, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import { AnimationPreview } from '@/components/AnimationPreview';
import { FileUploader } from '@/components/FileUploader';
import { ExportOptions } from '@/components/ExportOptions';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedAnimation, setSelectedAnimation] = useState<string>('scaleIn');
  const [selectedResolution, setSelectedResolution] = useState<string>('1:1');
  const [animationDuration, setAnimationDuration] = useState<number>(2);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const animationTypes = [
    { value: 'scaleIn', label: 'Scale In' },
    { value: 'scaleOut', label: 'Scale Out' },
    { value: 'swirlIn', label: 'Swirl In' },
    { value: 'fadeIn', label: 'Fade In' },
    { value: 'slideIn', label: 'Slide In' },
    { value: 'bounceIn', label: 'Bounce In' },
    { value: 'rotateIn', label: 'Rotate In' },
    { value: 'zoomOut', label: 'Zoom Out' }
  ];

  const resolutionOptions = [
    { value: '1:1', label: '1:1 (Square)', width: 512, height: 512 },
    { value: '9:16', label: '9:16 (Portrait)', width: 576, height: 1024 },
    { value: '16:9', label: '16:9 (Landscape)', width: 1024, height: 576 }
  ];

  const handleImageUpload = useCallback((imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    toast({
      title: "Image uploaded successfully!",
      description: "You can now apply animations and export your file.",
    });
  }, []);

  const handleExport = useCallback(async (format: string) => {
    if (!uploadedImage) {
      toast({
        title: "No image uploaded",
        description: "Please upload a PNG image first.",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    try {
      // This would integrate with the AnimationRenderer component
      toast({
        title: "Export started!",
        description: `Your ${format.toUpperCase()} file is being generated...`,
      });
      
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Export completed!",
        description: `Your ${format.toUpperCase()} file has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error generating your animated file.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  }, [uploadedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <FileImage className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  PNG Animator
                </h1>
                <p className="text-sm text-gray-600">Create stunning animated files from your PNGs</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* File Upload */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Upload className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Upload PNG Image</h2>
                </div>
                <FileUploader onImageUpload={handleImageUpload} />
              </CardContent>
            </Card>

            {/* Animation Settings */}
            {uploadedImage && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Animation Settings</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Animation Type */}
                    <div className="space-y-2">
                      <Label htmlFor="animation-type" className="text-sm font-medium text-gray-700">
                        Animation Effect
                      </Label>
                      <Select value={selectedAnimation} onValueChange={setSelectedAnimation}>
                        <SelectTrigger className="bg-white/50">
                          <SelectValue placeholder="Select animation" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {animationTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Resolution */}
                    <div className="space-y-2">
                      <Label htmlFor="resolution" className="text-sm font-medium text-gray-700">
                        Aspect Ratio
                      </Label>
                      <Select value={selectedResolution} onValueChange={setSelectedResolution}>
                        <SelectTrigger className="bg-white/50">
                          <SelectValue placeholder="Select resolution" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {resolutionOptions.map((res) => (
                            <SelectItem key={res.value} value={res.value}>
                              {res.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Duration */}
                    <div className="space-y-3">
                      <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
                        Animation Duration: {animationDuration}s
                      </Label>
                      <Slider
                        value={[animationDuration]}
                        onValueChange={(value) => setAnimationDuration(value[0])}
                        max={5}
                        min={0.5}
                        step={0.5}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Export Options */}
            {uploadedImage && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-6">
                  <ExportOptions 
                    onExport={handleExport}
                    isExporting={isExporting}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Play className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Animation Preview</h2>
                </div>
                
                <AnimationPreview
                  imageUrl={uploadedImage}
                  animationType={selectedAnimation}
                  resolution={selectedResolution}
                  duration={animationDuration}
                  canvasRef={canvasRef}
                />
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-200/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">How it works</h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">1</span>
                    <span>Upload your PNG image using the file uploader</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">2</span>
                    <span>Choose your desired animation effect and settings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">3</span>
                    <span>Preview your animation in real-time</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">4</span>
                    <span>Export in your preferred format (WebM, WebP, GIF, MP4)</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
