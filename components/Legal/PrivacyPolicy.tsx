import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Cookie, Globe, Mail, Phone } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal identification information (name, email, phone number)",
        "Location data for finding nearby charging stations",
        "Payment information for charging sessions",
        "Device information and usage patterns",
        "Communication preferences and feedback"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Protect Your Data",
      content: [
        "256-bit SSL encryption for all data transmissions",
        "Secure cloud storage with regular backups",
        "Two-factor authentication for sensitive operations",
        "Regular security audits and penetration testing",
        "Compliance with international data protection standards"
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Data Usage & Sharing",
      content: [
        "We never sell your personal information to third parties",
        "Data is shared only with charging station providers for service delivery",
        "Analytics data is anonymized and aggregated",
        "Law enforcement requests are reviewed by our legal team",
        "You can request data deletion at any time"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Your Rights & Control",
      content: [
        "Access and download your personal data",
        "Correct inaccurate information about you",
        "Request deletion of your account and data",
        "Opt-out of marketing communications",
        "Data portability to other services"
      ]
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: "Cookies & Tracking",
      content: [
        "Essential cookies for core functionality",
        "Analytics cookies to improve our service",
        "Marketing cookies for personalized content",
        "You can control cookie preferences in settings",
        "Cookie consent is required for non-essential cookies"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "International Data Transfers",
      content: [
        "Data is stored primarily on secure servers in India",
        "Some services may require international data processing",
        "All transfers comply with GDPR and local regulations",
        "Standard contractual clauses protect your data",
        "You can choose data storage preferences"
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
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Your privacy is our priority. We're committed to protecting your personal information 
              and being transparent about how we use it.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Last Updated: January 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span className="text-sm">GDPR Compliant</span>
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
          <h2 className="text-3xl font-bold text-[#0F3D2E] mb-4">Our Privacy Commitment</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            At Plugzo, we believe privacy is a fundamental right. This Privacy Policy explains how we 
            collect, use, protect, and share your information when you use our EV charging platform. 
            We're committed to being transparent about our practices and giving you control over your data.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-[#1DB954]/10 rounded-xl">
              <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#0F3D2E] mb-2">Secure</h3>
              <p className="text-sm text-gray-600">Bank-level encryption protects your data</p>
            </div>
            <div className="text-center p-6 bg-[#0F3D2E]/10 rounded-xl">
              <div className="w-12 h-12 bg-[#0F3D2E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#0F3D2E] mb-2">Transparent</h3>
              <p className="text-sm text-gray-600">Clear explanation of data practices</p>
            </div>
            <div className="text-center p-6 bg-[#1DB954]/10 rounded-xl">
              <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#0F3D2E] mb-2">Your Control</h3>
              <p className="text-sm text-gray-600">Manage your data preferences anytime</p>
            </div>
          </div>
        </motion.div>

        {/* Policy Sections */}
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

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-[#0F3D2E] to-[#1DB954] rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h3>
          <p className="text-white/90 mb-6">
            Our privacy team is here to help. Contact us with any questions about your data or our practices.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span>privacy@plugzo.in</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <span>+91 8080-123-456</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
