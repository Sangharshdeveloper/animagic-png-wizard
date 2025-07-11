
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-8 h-8 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Agreement to Terms</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Last updated: January 2025
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using PNG Animator ("Service," "we," "us," or "our"), you agree to be bound by these 
                Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-800">Acceptable Use</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">You May:</h3>
                  <ul className="space-y-1">
                    <li>• Upload PNG images that you own or have permission to use</li>
                    <li>• Create animations for personal, educational, or commercial purposes</li>
                    <li>• Download and use the generated animated files</li>
                    <li>• Share our service with others</li>
                    <li>• Provide feedback and suggestions for improvement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-800">Prohibited Activities</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p>You agree NOT to:</p>
                <ul className="space-y-1">
                  <li>• Upload copyrighted images without proper authorization</li>
                  <li>• Create content that is illegal, harmful, or offensive</li>
                  <li>• Upload malicious files or attempt to compromise our systems</li>
                  <li>• Use the service for spam or unauthorized marketing</li>
                  <li>• Reverse engineer or attempt to extract our source code</li>
                  <li>• Overload our servers with excessive requests</li>
                  <li>• Violate any applicable laws or regulations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
              <div className="text-gray-600 space-y-3">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Your Content</h3>
                  <p>You retain all rights to the images you upload and the animated files you create. You represent that you have the necessary rights to use the uploaded content.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Our Service</h3>
                  <p>PNG Animator, including its design, functionality, and underlying technology, is protected by intellectual property laws. You may not copy, modify, or redistribute our service without permission.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Availability</h2>
              <div className="text-gray-600 space-y-3">
                <ul className="space-y-2">
                  <li>• We strive to maintain 99% uptime but cannot guarantee uninterrupted service</li>
                  <li>• Scheduled maintenance will be announced in advance when possible</li>
                  <li>• We reserve the right to modify or discontinue features with notice</li>
                  <li>• File size limits and usage restrictions may apply</li>
                  <li>• We may temporarily limit access during high-traffic periods</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-semibold text-gray-800">Disclaimers</h2>
              </div>
              
              <div className="text-gray-600 space-y-3">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Service "As Is"</h3>
                  <p>PNG Animator is provided "as is" without warranties of any kind. We do not guarantee that the service will meet your specific requirements or be error-free.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Limitation of Liability</h3>
                  <p>We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Data Loss</h3>
                  <p>While we implement security measures, we recommend keeping backups of your original files. We are not responsible for any data loss.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacy and Data</h2>
              <div className="text-gray-600 space-y-2">
                <p>Your privacy is important to us. Our data practices are governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
                <ul className="space-y-1 mt-3">
                  <li>• Uploaded images are processed temporarily and not stored permanently</li>
                  <li>• We may collect anonymous usage statistics to improve our service</li>
                  <li>• Contact information is used only for customer support purposes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Termination</h2>
              <div className="text-gray-600 space-y-3">
                <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or our service.</p>
                <p>You may discontinue using our service at any time. Upon termination, your right to use the service will cease immediately.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact & Changes</h2>
              <div className="text-gray-600 space-y-3">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Questions</h3>
                  <p>If you have questions about these Terms, please contact us at sangharshdeveloper@gmail.com</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Updates</h3>
                  <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of the updated Terms.</p>
                </div>
                
                <p className="text-sm">
                  <strong>Developer:</strong> Sangharsh<br />
                  <strong>Location:</strong> Pune, Maharashtra, India<br />
                  <strong>Email:</strong> sangharshdeveloper@gmail.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
