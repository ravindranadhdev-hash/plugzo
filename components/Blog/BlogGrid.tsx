import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, Clock, Hash } from 'lucide-react';
import React from 'react';
import { COLORS } from '../../constants';
import { BLOGS } from '../../data';

const BlogGrid: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto py-24 px-6">
      {/* HEADER: Minimalist & Fixed */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0F3D2E] mb-2">
            Intelligence <span className="text-[#1DB954]">Feed.</span>
          </h2>
          <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">Curated Industry Insights</p>
        </div>
        <button className="mt-6 md:mt-0 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 border border-gray-200 rounded-full hover:bg-[#0F3D2E] hover:text-white transition-all">
          Archive / 2024
        </button>
      </div>

      {/* GRID: Fixed Aspect Ratios & Heights */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {BLOGS.map((blog) => (
          <motion.div 
            key={blog.id} 
            variants={itemVariants}
            className="group cursor-pointer"
            onClick={() => window.location.hash = `#/blog/${blog.id}`}
          >
            {/* FIXED BOX: Using aspect-square or fixed height for total consistency */}
            <div className="flex flex-col h-[520px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#0F3D2E]/5 transition-all duration-500">
              
              {/* FIXED IMAGE HEIGHT */}
              <div className="h-[240px] relative overflow-hidden bg-gray-100">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[9px] font-black text-[#0F3D2E] uppercase tracking-tighter">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* FIXED CONTENT AREA */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={12} className="text-[#1DB954]" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{blog.readTime}</span>
                </div>

                <h3 className="text-xl font-black text-[#0F3D2E] leading-tight mb-4 line-clamp-2 group-hover:text-[#1DB954] transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-auto">
                  {blog.content}
                </p>

                <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0F3D2E]/40 group-hover:text-[#0F3D2E] transition-colors">
                    Read Report
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#1DB954] group-hover:text-white transition-all">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BlogGrid;