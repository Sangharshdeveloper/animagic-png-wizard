
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Info, Shield } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Disclaimer
          </h1>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Info className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">General Information</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Last updated: January 2025
              </p>
              <p className="text-gray-600 leading-relaxed">
                The information on PNG Animator is provided on an "as is" basis. To the fullest extent permitted by law, 
                this Company excludes all representations, warranties, undertakings, and guarantees relating to this website 
                and its use.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-semibold text-gray-800">Service Limitations</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Technical Limitations</h3>
                  <ul className="space-y-1">
                    <li>• File size restrictions may apply to uploaded images</li>
                    <li>• Processing time may vary based on image complexity and server load</li>
                    <li>• Some browsers may not support all animation formats</li>
                    <li>• Export quality depends on original image resolution and format</li>
                    <li>• Service availability may be affected by maintenance or technical issues</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Content Accuracy</h3>
                  <p>While we strive to provide accurate and up-to-date information, we make no representations or warranties regarding the completeness, accuracy, or reliability of any content on this website.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">User Responsibility</h2>
              <div className="text-gray-600 space-y-3">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Copyright Compliance</h3>
                  <p>Users are solely responsible for ensuring they have the legal right to use, modify, and distribute any images uploaded to our service. We do not verify the copyright status of uploaded content.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Content Appropriateness</h3>
                  <ul className="space-y-1">
                    <li>• Users must ensure uploaded content is appropriate and legal</li>
                    <li>• We reserve the right to remove content that violates our terms</li>
                    <li>• Users are responsible for compliance with local laws and regulations</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Data Backup</h3>
                  <p>Users should maintain backups of their original files. We are not responsible for any loss of user data or content.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-800">Third-Party Content</h2>
              </div>
              
              <div className="text-gray-600 space-y-3">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">External Links</h3>
                  <p>Our website may contain links to external websites. We have no control over the content, privacy policies, or practices of third-party sites and assume no responsibility for them.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Advertisements</h3>
                  <p>Third-party advertisements displayed on our site are not endorsed by us. We are not responsible for the content, accuracy, or opinions expressed in such advertisements.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Analytics and Tracking</h3>
                  <p>We use third-party analytics services to understand user behavior. These services have their own privacy policies and data collection practices.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Professional Advice</h2>
              <div className="text-gray-600 space-y-3">
                <p>PNG Animator is designed for general animation creation purposes. It is not intended to replace professional design software or services.</p>
                <ul className="space-y-1">
                  <li>• For commercial projects, consider consulting with professional designers</li>
                  <li>• Verify export quality meets your specific requirements before use</li>
                  <li>• Test animations across different platforms and devices</li>
                  <li>• Consider accessibility requirements for your target audience</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
              <div className="text-gray-600 space-y-3">
                <p>To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from:</p>
                <ul className="space-y-1">
                  <li>• Use or inability to use our service</li>
                  <li>• Any errors or omissions in content</li>
                  <li>• Loss of data or corrupted files</li>
                  <li>• Service interruptions or technical failures</li>
                  <li>• Any actions taken based on information from our service</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Changes and Updates</h2>
              <div className="text-gray-600 space-y-3">
                <p>We reserve the right to modify this disclaimer at any time without prior notice. Changes will be effective immediately upon posting on this page.</p>
                <p>By continuing to use PNG Animator after changes are posted, you accept the updated disclaimer.</p>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm">
                    <strong>Contact Information:</strong><br />
                    Developer: Sangharsh<br />
                    Location: Pune, Maharashtra, India<br />
                    Email: sangharshdeveloper@gmail.com
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

export default Disclaimer;
