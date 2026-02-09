import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, Clock, Hash } from 'lucide-react';
import React from 'react';
import { COLORS } from '../../constants';
import { BLOGS } from '../../data';

const BlogGrid: React.FC = () => {
  // Use Variants type to fix TypeScript inference for animation properties
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Use Variants type to fix TypeScript inference for animation properties
  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-luxury mb-6" style={{ backgroundColor: `${COLORS.primary}10`, color: COLORS.primary }}>
            Grid Intel
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#0F3D2E] font-display leading-[0.9]">
            The Intelligence <br />
            <span className="text-[#1DB954]">Feed.</span>
          </h2>
        </motion.div>
        
        <motion.button 
          whileHover={{ x: 5 }}
          className="text-[11px] font-black uppercase tracking-luxury text-[#4287f5] border-b-2 border-[#4287f5]/20 hover:border-[#4287f5] transition-all pb-2 font-sans"
        >
          View Full Archive
        </motion.button>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-10"
      >
        {BLOGS.map((blog, idx) => {
          // Asymmetrical Layout Logic
          // Card 0: Featured (Wide)
          // Card 1: Standard
          // Card 2: Medium/Narrow
          const gridClasses = idx === 0 
            ? "md:col-span-12 lg:col-span-7" 
            : idx === 1 
              ? "md:col-span-6 lg:col-span-5" 
              : "md:col-span-6 lg:col-span-4";

          return (
            <motion.div 
              key={blog.id} 
              variants={itemVariants}
              className={`${gridClasses} group cursor-pointer`}
              onClick={() => window.location.hash = `#/blog/${blog.id}`}
            >
              <div className="relative bg-white rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(15,61,46,0.05)] border border-white h-full flex flex-col transition-all duration-500 hover:shadow-[0_40px_80px_rgba(15,61,46,0.12)]">
                
                {/* 1. IMAGE WITH VIGNETTE OVERLAY */}
                <div className={`relative overflow-hidden ${idx === 0 ? 'h-[400px]' : 'h-80'}`}>
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                  />
                  {/* Vignette Overlay for 3D depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E] via-transparent to-transparent opacity-60" />
                  
                  {/* Glass-Pill Category Badge */}
                  <div className="absolute top-8 left-8">
                    <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-luxury font-sans">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                {/* 2. CONTENT AREA */}
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-6 text-[10px] font-black text-gray-400 uppercase tracking-luxury font-sans opacity-60">
                    <div className="flex items-center gap-2"><Clock size={12} className="text-[#1DB954]" /> {blog.readTime}</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1DB954]/20" />
                    <div className="flex items-center gap-2"><Hash size={12} className="text-[#4287f5]" /> {blog.category.split(' ')[0]}</div>
                  </div>

                  <h3 className={`font-black leading-[1.1] text-[#0F3D2E] tracking-tighter group-hover:text-[#1DB954] transition-colors font-display mb-6 ${idx === 0 ? 'text-4xl' : 'text-2xl'}`}>
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-500 text-base leading-relaxed line-clamp-2 font-sans font-light mb-10">
                    {blog.content}
                  </p>

                  {/* 3. MAGNETIC-STYLE CTA */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-luxury text-[#0F3D2E] font-sans">Read Intel</span>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      className="w-14 h-14 rounded-full bg-[#0F3D2E] text-white flex items-center justify-center shadow-xl group-hover:bg-[#1DB954] transition-all duration-500"
                    >
                      <ArrowUpRight size={22} />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#1DB954]/10 rounded-[40px] pointer-events-none transition-colors duration-500" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default BlogGrid;