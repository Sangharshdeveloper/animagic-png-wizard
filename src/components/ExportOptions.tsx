
import React from 'react';
import { Download, FileVideo, Image, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExportOptionsProps {
  onExport: (format: string) => void;
  isExporting: boolean;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ onExport, isExporting }) => {
  const exportFormats = [
    {
      format: 'webm',
      label: 'WebM',
      description: 'High quality, small file size',
      icon: FileVideo,
      color: 'bg-green-500'
    },
    // {
    //   format: 'webp',
    //   label: 'WebP',
    //   description: 'Modern image format',
    //   icon: Image,
    //   color: 'bg-blue-500'
    // },
    // {
    //   format: 'gif',
    //   label: 'GIF',
    //   description: 'Universal compatibility',
    //   icon: Film,
    //   color: 'bg-purple-500'
    // },
    {
      format: 'mp4',
      label: 'MP4',
      description: 'Video format',
      icon: FileVideo,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Download className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Export Options</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {exportFormats.map((format) => (
          <Button
            key={format.format}
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2 bg-white/50 hover:bg-white/80 border-gray-200 hover:border-purple-300 transition-all duration-200"
            onClick={() => onExport(format.format)}
            disabled={isExporting}
          >
            <div className={`w-10 h-10 ${format.color} rounded-lg flex items-center justify-center`}>
              <format.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-800">{format.label}</div>
              <div className="text-xs text-gray-500">{format.description}</div>
            </div>
          </Button>
        ))}
      </div>

      {isExporting && (
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-700 font-medium">Generating your animated file...</span>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 space-y-1">
        <p>• WebM: Best for web, modern browsers</p>
        <p>• WebP: Animated images, good compression</p>
        <p>• GIF: Universal support, larger file size</p>
        <p>• MP4: Video format, excellent compatibility</p>
      </div>
    </div>
  );
};
