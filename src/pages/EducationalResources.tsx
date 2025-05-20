import React from 'react';
import { Book, Heart, AlertTriangle, Clock, CheckCircle, HelpCircle } from 'lucide-react';

const EducationalResources: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Learn About Blood Donation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about blood donation, eligibility, and the donation process.
          </p>
        </div>
        
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold ml-2">Eligibility Requirements</h3>
            </div>
            <p className="text-gray-600">Learn if you're eligible to donate blood and what conditions might affect your ability to donate.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-semibold ml-2">Donation Process</h3>
            </div>
            <p className="text-gray-600">Understand what happens during a blood donation, from registration to post-donation care.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <HelpCircle className="h-6 w-6 text-purple-500" />
              <h3 className="text-lg font-semibold ml-2">FAQs</h3>
            </div>
            <p className="text-gray-600">Find answers to commonly asked questions about blood donation and the donation process.</p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Eligibility Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Blood Donation Eligibility</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Requirements</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Be at least 17 years old (16 with parental consent in some states)</li>
                      <li>Weigh at least 110 pounds</li>
                      <li>Be in good general health</li>
                      <li>Have not donated whole blood in the last 56 days</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Temporary Deferrals</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Cold, flu, or other acute infections</li>
                      <li>Recent travel to certain countries</li>
                      <li>Recent major surgery</li>
                      <li>Pregnancy or recent childbirth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Donation Process Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Donation Process</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-semibold">1</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Registration</h3>
                      <p className="text-gray-600">Sign in, show ID, and complete basic health history questions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-semibold">2</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Health Screening</h3>
                      <p className="text-gray-600">Quick physical examination including blood pressure, pulse, and hemoglobin test.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-semibold">3</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Blood Donation</h3>
                      <p className="text-gray-600">The actual donation takes about 8-10 minutes. You'll be seated comfortably while approximately one pint of blood is collected.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-semibold">4</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Refreshments</h3>
                      <p className="text-gray-600">Enjoy light refreshments while resting for 10-15 minutes before leaving.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Blood Types Info */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Blood Types Guide</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Type O</h3>
                    <p className="text-sm text-gray-600">O negative is the universal donor. O positive is the most common blood type.</p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Type A</h3>
                    <p className="text-sm text-gray-600">Can donate to A and AB types. Second most common blood type.</p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Type B</h3>
                    <p className="text-sm text-gray-600">Can donate to B and AB types. Less common than types O and A.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Type AB</h3>
                    <p className="text-sm text-gray-600">Universal recipient. Can receive blood from all types but can only donate to AB.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Preparation Tips */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Preparation Tips</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="ml-2 text-gray-600">Get a good night's sleep</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="ml-2 text-gray-600">Eat a healthy meal before donating</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="ml-2 text-gray-600">Drink plenty of water</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="ml-2 text-gray-600">Bring ID and list of medications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="ml-2 text-gray-600">Wear comfortable clothing</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Download Resources */}
            <div className="bg-red-50 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Resources</h2>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="block p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center">
                      <Book className="h-5 w-5 text-red-500" />
                      <span className="ml-2 text-gray-900">Donor Guide PDF</span>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="block p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <span className="ml-2 text-gray-900">Eligibility Checklist</span>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="block p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="ml-2 text-gray-900">Post-Donation Care</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalResources;