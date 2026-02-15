import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Zap, Users, AlertCircle, CheckCircle, Clock, Award, Scale } from 'lucide-react';

const TermsOfService: React.FC = () => {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Service Agreement",
      content: [
        "By using Plugzo, you agree to these terms and conditions",
        "The service is available to users 18 years and older",
        "You must provide accurate and complete information",
        "One account per person or business entity",
        "We reserve the right to suspend accounts for violations"
      ]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Charging Services",
      content: [
        "Real-time availability of charging stations",
        "Secure payment processing for charging sessions",
        "24/7 customer support for charging issues",
        "Refund policy for failed charging sessions",
        "Pricing transparency with no hidden fees"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Responsibilities",
      content: [
        "Maintain accurate account information",
        "Use charging stations responsibly and safely",
        "Report any issues or damages immediately",
        "Respect other users and station owners",
        "Comply with all applicable laws and regulations"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Station Owner Terms",
      content: [
        "Accurate station information and availability",
        "Maintain equipment in working condition",
        "Fair pricing and transparent fee structure",
        "Timely response to customer inquiries",
        "Compliance with safety and accessibility standards"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Prohibited Activities",
      content: [
        "Using the service for illegal purposes",
        "Attempting to hack or disrupt our systems",
        "Sharing false or misleading information",
        "Spamming or harassing other users",
        "Violating intellectual property rights"
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Dispute Resolution",
      content: [
        "All disputes governed by Indian law",
        "Arbitration preferred for faster resolution",
        "Mumbai courts have exclusive jurisdiction",
        "30-day limitation for filing claims",
        "Good faith negotiation encouraged first"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0F3D2E] to-[#1DB954] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Clear terms for a trusted EV charging ecosystem. Our rules ensure fair, safe, 
              and reliable service for everyone in the Plugzo community.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Last Updated: January 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Legally Binding</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-[#0F3D2E] mb-4">Our Service Commitment</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Welcome to Plugzo! These Terms of Service govern your use of our EV charging platform. 
            By creating an account or using our services, you agree to these terms. We've designed 
            them to be fair, transparent, and protective of all community members.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-[#1DB954]/10 rounded-xl">
              <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#0F3D2E] mb-2">Fair</h3>
              <p className="text-sm text-gray-600">Equal treatment for all users</p>
            </div>
            <div className="text-center p-6 bg-[#0F3D2E]/10 rounded-xl">
              <div className="w-12 h-12 bg-[#0F3D2E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#0F3D2E] mb-2">Safe</h3>
              <p className="text-sm text-gray-600">Protected transactions and data</p>
            </div>
            <div className="text-center p-6 bg-[#1DB954]/10 rounded-xl">
              <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#0F3D2E] mb-2">Reliable</h3>
              <p className="text-sm text-gray-600">Consistent service quality</p>
            </div>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954] to-[#0F3D2E] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">{section.title}</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#1DB954] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Key Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-[#0F3D2E] mb-6">Important Policies</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-[#0F3D2E] mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#1DB954]" />
                Refund Policy
              </h4>
              <p className="text-gray-600 mb-4">
                Full refund for charging sessions that fail due to technical issues. 
                Partial refunds available for interrupted sessions.
              </p>
              
              <h4 className="font-semibold text-[#0F3D2E] mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                Cancellation Policy
              </h4>
              <p className="text-gray-600">
                Free cancellation up to 1 hour before booking time. 
                50% refund for cancellations within 1 hour.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#0F3D2E] mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#1DB954]" />
                Liability Limitation
              </h4>
              <p className="text-gray-600 mb-4">
                Our liability is limited to the cost of the charging session. 
                We're not responsible for vehicle damage or theft.
              </p>
              
              <h4 className="font-semibold text-[#0F3D2E] mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1DB954]" />
                Service Availability
              </h4>
              <p className="text-gray-600">
                We strive for 99.9% uptime but cannot guarantee uninterrupted service. 
                Scheduled maintenance will be announced in advance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Acceptance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-r from-[#0F3D2E] to-[#1DB954] rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">By Using Plugzo, You Agree To:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
              <span>Read and understand these terms</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
              <span>Use the service responsibly</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
              <span>Respect other community members</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
              <span>Comply with applicable laws</span>
            </div>
          </div>
          <div className="mt-8 p-4 bg-white/20 backdrop-blur-sm rounded-lg">
            <p className="text-sm">
              <strong>Need Help?</strong> Contact our support team at support@plugzo.in or call +91 8080-123-456
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
