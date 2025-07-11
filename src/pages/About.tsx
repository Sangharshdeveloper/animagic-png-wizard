
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, User } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About PNG Animator
          </h1>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                PNG Animator is a powerful, user-friendly web application designed to transform static PNG images into stunning animated files. 
                Our mission is to make animation creation accessible to everyone, from professional designers to casual users who want to 
                add life to their images.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">What We Offer</h2>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• 67+ professional animation effects including bounces, fades, rotations, and more</li>
                <li>• Multiple export formats: WebM, WebP, GIF, and MP4</li>
                <li>• Customizable animation duration and resolution settings</li>
                <li>• Real-time preview of your animations</li>
                <li>• No registration required - start creating immediately</li>
                <li>• Free to use with high-quality output</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Perfect For</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="text-gray-600">
                  <h3 className="font-medium mb-2">Content Creators</h3>
                  <p className="text-sm">Create engaging animated content for social media, websites, and presentations.</p>
                </div>
                <div className="text-gray-600">
                  <h3 className="font-medium mb-2">Web Designers</h3>
                  <p className="text-sm">Add dynamic elements to websites and user interfaces.</p>
                </div>
                <div className="text-gray-600">
                  <h3 className="font-medium mb-2">Marketers</h3>
                  <p className="text-sm">Create eye-catching animated graphics for campaigns and advertisements.</p>
                </div>
                <div className="text-gray-600">
                  <h3 className="font-medium mb-2">Educators</h3>
                  <p className="text-sm">Enhance learning materials with animated visual elements.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">About the Developer</h2>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Sangharsh</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Pune, Maharashtra, India</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>sangharshdeveloper@gmail.com</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    PNG Animator was created with the vision of making animation tools accessible to everyone. 
                    As a developer passionate about creating useful web applications, I built this tool to help 
                    users easily transform their static images into dynamic, engaging animations without the need 
                    for complex software or technical expertise.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
