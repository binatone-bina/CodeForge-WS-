import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ensuring safety should never be a challenge. Our platform empowers women with real-time safety solutions.
        </p>
      </div>
      
      {/* Mission Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599.8a1 1 0 01-.798 1.833l-2.031-.805-3.1-1.24v1.927l3.184 1.274 1.368.684a1 1 0 11-.894 1.788l-1.658-.829L10 9.172V13h4a1 1 0 110 2h-4v1a1 1 0 11-2 0v-1H4a1 1 0 110-2h4V9.172l-2.724 1.095-1.658.83a1 1 0 01-.894-1.789l1.368-.684 3.184-1.274V5.48l-3.1 1.24-2.031.805a1 1 0 01-.798-1.833l1.599-.8L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Our mission is simple: to make safety accessible, proactive, and reliable. We strive to create a safer environment for everyone through technology-driven safety measures and community awareness.
        </p>
      </div>
      
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-primary-500">
          <div className="text-primary-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Safe Route Mapping</h3>
          <p className="text-gray-600">
            We provide a Safe Route Mapping System that suggests the safest paths based on real-time data, ensuring users avoid high-risk areas.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-primary-500">
          <div className="text-primary-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">SOS Feature</h3>
          <p className="text-gray-600">
            Our SOS Feature enables instant alerts via SMS, email, and VoIP calls to emergency contacts, ensuring help is always just a click away.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-primary-500">
          <div className="text-primary-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Real-time Tracking</h3>
          <p className="text-gray-600">
            With technology-driven safety measures like real-time tracking and instant alerts, we empower users to navigate their surroundings confidently.
          </p>
        </div>
      </div>
      
      {/* Closing Section */}
      <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Together, let's build a safer world</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We believe in creating a community where everyone feels secure and empowered. Join us in our mission to make safety accessible to all.
        </p>
        <button className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
          Join Our Community
        </button>
      </div>
    </div>
  );
};

export default AboutPage;