import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Zap, Shield, Clock, MapPin, Users, TrendingUp } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I find charging stations near me?",
      answer: "Use our interactive map to locate charging stations in your area. You can filter by charger type, availability, and distance. The app shows real-time availability and pricing.",
      icon: <MapPin className="w-5 h-5" />
    },
    {
      question: "What types of EV chargers are available?",
      answer: "We support all major charger types including CCS, CHAdeMO, Type 2, and Bharat AC/DC standards. Each station listing shows compatible charger types and power output.",
      icon: <Zap className="w-5 h-5" />
    },
    {
      question: "How do I book a charging slot?",
      answer: "Simply select a station, choose your preferred time slot, and confirm your booking. You'll receive a QR code for access. Payment can be made through the app or at the station.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      question: "Is the platform free to use?",
      answer: "Yes! Searching for stations and checking availability is completely free. You only pay for the charging sessions you use. Premium features like advanced analytics are available for station owners.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      question: "How can I list my charging station?",
      answer: "Station owners can list their charging stations by filling out our registration form. We offer free basic listings and premium options with enhanced visibility and booking management tools.",
      icon: <Users className="w-5 h-5" />
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept UPI, credit/debit cards, net banking, and digital wallets. Some stations also support RFID cards and membership plans for regular users.",
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#0F3D2E] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about EV charging and our platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#1DB954] rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1DB954]/10 rounded-lg flex items-center justify-center flex-shrink-0 text-[#1DB954]">
                    {faq.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#0F3D2E] mb-2 pr-8">
                      {faq.question}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {faq.answer}
                      </p>
                      <div className="ml-2 flex-shrink-0">
                        {openIndex === index ? (
                          <ChevronUp className="w-5 h-5 text-[#1DB954]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="pl-14">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-[#1DB954] to-[#17a045] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.hash = '#/contact'}
                className="bg-white text-[#1DB954] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </button>
              <button
                onClick={() => window.location.hash = '#/collections'}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
              >
                Browse Stations
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
