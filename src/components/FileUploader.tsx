
import React, { useCallback, useState } from 'react';
import { Upload, FileImage, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onImageUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (!file.type.includes('png')) {
      alert('Please upload a PNG file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onImageUpload(result);
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  const clearPreview = useCallback(() => {
    setPreview(null);
  }, []);

  return (
    <div className="w-full">
      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive
              ? 'border-purple-400 bg-purple-50'
              : 'border-gray-300 hover:border-purple-300 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/png"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file-upload"
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-purple-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Drop your PNG image here
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                or click to browse your files
              </p>
              <Button
                type="button"
                variant="outline"
                className="bg-white/50 hover:bg-white/80"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <FileImage className="w-4 h-4 mr-2" />
                Choose PNG File
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="border-2 border-gray-200 rounded-xl p-4 bg-white/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Uploaded Image</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearPreview}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="aspect-square w-full max-w-xs mx-auto rounded-lg overflow-hidden bg-gray-100">
              <img
                src={preview}
                alt="Uploaded PNG"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
