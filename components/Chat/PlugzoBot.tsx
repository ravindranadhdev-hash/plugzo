import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Zap } from 'lucide-react';

declare const puter: any; // Puter.js global declaration

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const PlugzoBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Namaste! I am Plugzo Assistant, your Hyderabad EV expert. I can help you find charging stations in Gachibowli, HITEC City, Madhapur and more. Ask me about CCS2, Type 2, or GB/T charging options!', 
      timestamp: new Date() 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('plugzo_chat_history');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 1) { // Don't save initial message
      localStorage.setItem('plugzo_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChat = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { 
      role: 'user', 
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Puter.js Free AI API Call with Hyderabad EV expert system prompt
      const systemPrompt = `You are Plugzo Assistant, a Hyderabad EV charging expert. 
        Knowledge: 
        - Charging types: CCS2, Type 2, GB/T
        - Hyderabad localities: Gachibowli, HITEC City, Madhapur, Kondapur, Financial District, Banjara Hills
        - Plugzo 2026 features: Verified Hubs, Fast DC Charging, Real-time availability
        
        Guidelines:
        - Be professional, fast, and helpful
        - Mention specific Hyderabad locations when relevant
        - Explain charging types clearly
        - Be concise but thorough
        - Focus on Plugzo's enterprise features
        
        User message: ${input.trim()}`;

      const response = await puter.ai.chat(systemPrompt);
      
      const assistantMsg: Message = {
        role: 'assistant',
        content: response.toString(),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Puter.js API Error:', err);
      const errorMsg: Message = {
        role: 'assistant',
        content: "I'm having trouble connecting to the Plugzo grid right now. Please try again in a moment or check our app for station availability!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Chat cleared! How can I help you with EV charging in Hyderabad?',
      timestamp: new Date()
    }]);
    localStorage.removeItem('plugzo_chat_history');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-[#1DB954] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-200 hover:shadow-[#1DB954]/25"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <MessageSquare size={24} fill="currentColor" strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-[380px] h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0F3D2E] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Zap size={20} className="text-[#1DB954]" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-[#1DB954] rounded-full animate-pulse" />
                </div>
                <div>
                  <span className="font-bold text-sm">Plugzo Assistant</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#1DB954] rounded-full" />
                    <span className="text-[10px] text-green-400">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <X size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F4FFF8]/30 no-scrollbar">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    message.role === 'user' 
                      ? 'bg-[#4287f5] text-white rounded-br-none' 
                      : 'bg-white border border-slate-100 text-[#0F3D2E] rounded-bl-none shadow-sm'
                  }`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="flex gap-2">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about EV charging in Hyderabad..."
                  disabled={isTyping}
                  className="flex-1 bg-slate-50 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:bg-white transition-all disabled:opacity-50"
                />
                <button 
                  onClick={handleChat}
                  disabled={isTyping || !input.trim()}
                  className="bg-[#1DB954] text-white p-2.5 rounded-full hover:bg-[#16a34a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => setInput("Where are CCS2 chargers in Gachibowli?")}
                  className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  CCS2 in Gachibowli
                </button>
                <button 
                  onClick={() => setInput("Fast charging in HITEC City?")}
                  className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  Fast DC in HITEC
                </button>
                <button 
                  onClick={() => setInput("Verified Hubs near Madhapur?")}
                  className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  Verified Hubs
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlugzoBot;
