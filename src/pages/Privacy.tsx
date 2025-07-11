
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Lock, Database } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Your Privacy Matters</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Last updated: January 2025
              </p>
              <p className="text-gray-600 leading-relaxed">
                PNG Animator ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, and safeguard your information when you use our web application.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-800">Information We Collect</h2>
              </div>
              
              <h3 className="font-medium text-gray-800 mb-2">Information You Provide</h3>
              <ul className="text-gray-600 mb-4 space-y-1">
                <li>• PNG images you upload for animation processing</li>
                <li>• Contact form submissions (name, email, message)</li>
                <li>• Animation preferences and settings</li>
              </ul>
              
              <h3 className="font-medium text-gray-800 mb-2">Automatically Collected Information</h3>
              <ul className="text-gray-600 mb-4 space-y-1">
                <li>• Device and browser information</li>
                <li>• IP address and location data</li>
                <li>• Usage statistics and performance metrics</li>
                <li>• Cookies and similar tracking technologies</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-800">How We Use Your Information</h2>
              </div>
              
              <ul className="text-gray-600 space-y-2">
                <li>• <strong>Image Processing:</strong> To convert your PNG images into animated formats</li>
                <li>• <strong>Service Improvement:</strong> To enhance our application's functionality and user experience</li>
                <li>• <strong>Communication:</strong> To respond to your inquiries and provide customer support</li>
                <li>• <strong>Analytics:</strong> To understand usage patterns and optimize performance</li>
                <li>• <strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-800">Data Security & Retention</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Security Measures</h3>
                  <ul className="space-y-1">
                    <li>• HTTPS encryption for all data transmission</li>
                    <li>• Secure servers with industry-standard protection</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Limited access to personal information</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Data Retention</h3>
                  <ul className="space-y-1">
                    <li>• Uploaded images are processed immediately and not stored permanently</li>
                    <li>• Temporary files are automatically deleted after processing</li>
                    <li>• Contact form data is retained for customer service purposes</li>
                    <li>• Analytics data is anonymized and aggregated</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Cookies and Tracking</h2>
              <div className="text-gray-600 space-y-3">
                <p>We use cookies and similar technologies to:</p>
                <ul className="space-y-1">
                  <li>• Remember your preferences and settings</li>
                  <li>• Analyze website traffic and usage patterns</li>
                  <li>• Improve our services and user experience</li>
                  <li>• Provide relevant content and advertisements</li>
                </ul>
                <p>You can control cookie settings through your browser preferences.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Third-Party Services</h2>
              <div className="text-gray-600 space-y-3">
                <p>Our website may include integrations with third-party services:</p>
                <ul className="space-y-1">
                  <li>• Google Analytics for usage statistics</li>
                  <li>• Google AdSense for advertisements</li>
                  <li>• Cloud storage providers for temporary file processing</li>
                </ul>
                <p>These services have their own privacy policies, which we encourage you to review.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Rights</h2>
              <div className="text-gray-600 space-y-3">
                <p>You have the right to:</p>
                <ul className="space-y-1">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate data</li>
                  <li>• Request deletion of your data</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Data portability where applicable</li>
                </ul>
                <p>To exercise these rights, please contact us at sangharshdeveloper@gmail.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="text-gray-600 space-y-2">
                <p>If you have questions about this Privacy Policy, please contact us:</p>
                <p><strong>Email:</strong> sangharshdeveloper@gmail.com</p>
                <p><strong>Location:</strong> Pune, Maharashtra, India</p>
                <p className="text-sm mt-4">
                  We reserve the right to update this Privacy Policy. Changes will be posted on this page 
                  with an updated revision date.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
