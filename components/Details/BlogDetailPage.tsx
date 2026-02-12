import React, { useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowLeft, Share2, Bookmark, Clock, 
  Zap, MapPin, ArrowRight, Calendar, 
  Battery, ChevronRight, User 
} from 'lucide-react';
import { BlogPost } from '../../types';
import { CHARGERS } from '../../data';

// --- MOCK COMPONENT FOR CHARGERS ---
const MiniChargerCard = ({ station }: { station: any }) => (
  <div className="group relative bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 items-center">
    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
      <Zap size={20} fill="currentColor" />
    </div>
    <div className="flex-1 min-w-0">
      <h5 className="font-bold text-gray-900 text-sm truncate">{station.name}</h5>
      <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
        <MapPin size={10} /> {station.locality}
      </p>
    </div>
    <ChevronRight size={16} className="text-gray-300" />
  </div>
);

interface BlogDetailPageProps {
  blog: BlogPost;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ blog }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Scroll Animations
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Parallax: Slower movement on mobile to prevent jitter
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  // Logic to find chargers
  const relevantChargers = useMemo(() => {
    const localityMatch = CHARGERS.filter(c => 
      blog.content.toLowerCase().includes(c.locality.toLowerCase()) || 
      blog.title.toLowerCase().includes(c.locality.toLowerCase())
    );
    return (localityMatch.length >= 2 ? localityMatch : CHARGERS).slice(0, 3);
  }, [blog]);

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* 1. PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-green-500"
        style={{ scaleX }}
      />

      {/* 2. MOBILE-OPTIMIZED NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6 md:py-6 flex justify-between items-center pointer-events-none">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="pointer-events-auto flex items-center justify-center w-10 h-10 md:w-auto md:px-5 md:py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg text-white md:text-gray-800 md:bg-white/90 transition-all"
        >
          <ArrowLeft size={20} />
          <span className="hidden md:inline ml-2 font-bold text-sm">Back</span>
        </motion.button>

        <div className="pointer-events-auto flex gap-3">
          <button 
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md md:bg-white/90 flex items-center justify-center text-white md:text-gray-700 border border-white/20 shadow-lg"
          >
            <Share2 size={18} />
          </button>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-md md:bg-white/90 flex items-center justify-center border border-white/20 shadow-lg transition-colors ${isBookmarked ? 'text-green-400 md:text-green-600' : 'text-white md:text-gray-700'}`}
          >
            <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </nav>

      {/* 3. COMPACT HERO SECTION */}
      {/* Changed height from 85vh to 55vh on mobile, keeping 85vh on desktop */}
      <header className="relative h-[55vh] md:h-[85vh] min-h-[400px] w-full overflow-hidden">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          {/* Darker gradient at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10" />
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover" 
          />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-16 md:pb-24 container mx-auto md:px-12">
            
            {/* Category Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="px-3 py-1 rounded-full bg-green-500 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg shadow-green-500/30">
                {blog.category || "Insight"}
              </span>
            </motion.div>

            {/* Title - Scaled down for mobile */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-xl max-w-4xl"
            >
              {blog.title}
            </motion.h1>
        </div>
      </header>

      {/* 4. OVERLAPPING INFO CARD (The Redesign) */}
      <div className="relative z-30 px-4 md:px-12 container mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="-mt-12 md:-mt-20 bg-white rounded-2xl md:rounded-[2rem] shadow-xl shadow-gray-200/50 p-5 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-gray-100"
        >
            {/* Author Info */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                        alt="Author" 
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-md bg-gray-100"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full border-2 border-white">
                        <Zap size={10} fill="currentColor" />
                    </div>
                </div>
                <div>
                    <p className="text-gray-900 font-bold text-sm md:text-lg">Vandit Shah</p>
                    <p className="text-gray-500 text-xs md:text-sm font-medium">Lead Grid Analyst</p>
                </div>
            </div>

            {/* Divider (Hidden on mobile) */}
            <div className="hidden md:block w-px h-12 bg-gray-100" />

            {/* Stats Grid */}
            <div className="flex items-center justify-between md:gap-12 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Calendar size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Published</p>
                        <p className="text-xs md:text-sm font-bold text-gray-900">Oct 14, 2025</p>
                    </div>
                </div>
                
                <div className="w-px h-8 bg-gray-100 md:hidden" />

                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                        <Clock size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Read Time</p>
                        <p className="text-xs md:text-sm font-bold text-gray-900">6 Mins</p>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>

      {/* 5. MAIN CONTENT LAYOUT */}
      <main className="container mx-auto px-4 md:px-12 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* ARTICLE BODY */}
          <article className="flex-1">
            <p className="text-lg md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
              As the silicon heart of India pulsates with new energy, the infrastructure of Hyderabad is undergoing a radical digital transformation.
            </p>

            <div className="prose prose-lg prose-indigo max-w-none text-gray-600 leading-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4">The Deccan Grid Renaissance</h2>
              <p>
                Walking through HITEC City today, you'll notice a distinct change. The low hum of diesel generators is being replaced by the silent efficiency of high-voltage DC terminals. Hyderabad has successfully integrated over 1,500 verified charging nodes.
              </p>

              {/* Mobile-Friendly Blockquote */}
              <blockquote className="my-8 md:my-12 pl-6 border-l-4 border-green-500 italic text-gray-800 bg-gray-50 py-4 pr-4 rounded-r-xl">
                "The future of charging isn't about finding a plug; it's about the intelligence that happens while you're parked."
              </blockquote>

              <p>
                This expansion isn't accidental. It's the result of strategic partnerships between private property owners and the Plugzo energy network. By transforming standard parking bays into "Digital Assets," we've unlocked a secondary revenue stream.
              </p>

              <figure className="my-8 md:my-12">
                <img 
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full rounded-2xl shadow-lg" 
                  alt="EV Charging Connector" 
                />
              </figure>

              <p>
                 You shouldn't have to think about where to charge. Like Wi-Fi, the Plugzo network will simply be everywhere you need it to be.
              </p>
            </div>
          </article>

          {/* SIDEBAR (Stacks below on mobile) */}
          <aside className="w-full lg:w-[380px] space-y-8">
            
            {/* Sidebar Widget 1 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <MapPin size={18} className="text-green-500"/> Nearby Hubs
                </h3>
                <div className="space-y-3">
                    {relevantChargers.map((station) => (
                        <MiniChargerCard key={station.id} station={station} />
                    ))}
                </div>
            </div>

            {/* Sidebar Widget 2 */}
            <div className="bg-gray-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full blur-[50px] opacity-20" />
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Power Up.</h3>
                    <p className="text-gray-400 text-sm mb-6">Get alerts for new fast chargers.</p>
                    <button className="w-full bg-green-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
                        Subscribe <Zap size={16} fill="currentColor"/>
                    </button>
                </div>
            </div>

          </aside>
          
        </div>
      </main>
    </div>
  );
};

export default BlogDetailPage;
// import React, { useState, useEffect, useMemo } from 'react';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { ArrowLeft, Share2, Bookmark, Clock, MessageSquare, Zap, MapPin, ArrowRight } from 'lucide-react';
// import { BlogPost, Station } from '../../types';
// import { COLORS } from '../../constants';
// import { CHARGERS } from '../../data';
// import ChargerCard from '../Hero/ChargerCard';

// interface BlogDetailPageProps {
//   blog: BlogPost;
// }

// const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ blog }) => {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   // Parallax effect for the hero image
//   const y = useTransform(scrollYProgress, [0, 0.4], [0, 200]);

//   // "Smart" Sidebar logic: Find chargers matching locality or just the first two
//   const relevantChargers = useMemo(() => {
//     const localityMatch = CHARGERS.filter(c => 
//       blog.content.toLowerCase().includes(c.locality.toLowerCase()) || 
//       blog.title.toLowerCase().includes(c.locality.toLowerCase())
//     );
//     return (localityMatch.length >= 2 ? localityMatch : CHARGERS).slice(0, 2);
//   }, [blog]);

//   return (
//     <div className="relative bg-white min-h-screen">
//       {/* 1. READING PROGRESS BAR */}
//       <motion.div 
//         className="fixed top-0 left-0 right-0 h-1 z-[1000] origin-left"
//         style={{ scaleX, backgroundColor: COLORS.primary }}
//       />

//       {/* 2. PARALLAX HERO SECTION */}
//       <section className="relative h-[75vh] md:h-[85vh] min-h-[480px] w-full overflow-hidden flex flex-col justify-center items-center px-4 md:px-6 lg:px-12 bg-black">
//         <motion.div 
//           style={{ y }}
//           className="absolute inset-0 z-0 overflow-hidden"
//         >
//           <img 
//             src={blog.image} 
//             alt={blog.title} 
//             className="w-full h-full object-cover opacity-60 scale-110" 
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/40" />
//         </motion.div>
        
//         <div className="relative z-10 w-full max-w-[1440px] mx-auto text-center md:text-left">
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="mb-8"
//           >
//             <button 
//                 onClick={() => window.location.hash = '#/blog'}
//                 className="group flex items-center gap-3 text-white font-black text-[11px] uppercase tracking-luxury bg-black/30 backdrop-blur-xl px-6 py-3 rounded-full hover:bg-[#1DB954] transition-all font-sans"
//             >
//                 <ArrowLeft size={16} /> editorial_feed
//             </button>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="max-w-5xl"
//           >
//             <span className="inline-block px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-luxury bg-[#1DB954] text-white mb-4 md:mb-6 font-sans">
//                 {blog.category}
//             </span>
//             <h1 
//               className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl italic font-display"
//             >
//               {blog.title.split(' ').map((word, i) => (
//                 <span key={i} className="inline-block mr-4">
//                   {word === 'Charging' || word === 'Hyderabad' ? (
//                     <span className="text-[#1DB954]">{word}</span>
//                   ) : word}
//                 </span>
//               ))}
//             </h1>
//           </motion.div>
//         </div>

//         {/* Floating Author Stats */}
//         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[1440px] px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8 z-20 font-sans">
//             <div className="flex items-center gap-6">
//                 <div className="w-16 h-16 rounded-[24px] overflow-hidden border-2 border-[#1DB954] shadow-2xl">
//                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Author" className="w-full h-full bg-[#F4FFF8]" />
//                 </div>
//                 <div className="text-white md:text-black">
//                     <p className="font-black text-lg tracking-tight leading-none">Vandit Shah</p>
//                     <p className="text-[10px] font-bold uppercase tracking-luxury text-gray-400 mt-1">Lead Grid Analyst • Oct 2025</p>
//                 </div>
//             </div>
//             <div className="flex gap-4">
//                 <div className="flex flex-col items-center">
//                     <p className="text-white md:text-black font-black text-2xl leading-none tabular-nums">12</p>
//                     <p className="text-[9px] font-bold uppercase tracking-luxury text-gray-400">Min Read</p>
//                 </div>
//                 <div className="w-px h-8 bg-gray-200" />
//                 <div className="flex flex-col items-center">
//                     <p className="text-white md:text-black font-black text-2xl leading-none tabular-nums">4.9k</p>
//                     <p className="text-[9px] font-bold uppercase tracking-luxury text-gray-400">Syncs</p>
//                 </div>
//             </div>
//         </div>
//       </section>

//       {/* 3. MAIN CONTENT WITH SMART SIDEBAR */}
//       <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 py-16 md:py-24 lg:py-32">
//         <div className="flex flex-col lg:flex-row gap-20">
          
//           {/* Article Body (65%) */}
//           <article className="flex-1 max-w-4xl font-sans">
//             <div 
//               className="text-base md:text-lg leading-relaxed text-[#0D1E3A]/80 space-y-10"
//             >
//               <p className="text-xl md:text-2xl font-black text-[#0D1E3A] leading-[1.1] tracking-tight font-display">
//                 As the silicon heart of India pulsates with new energy, the infrastructure of Hyderabad is undergoing a radical digital transformation. The shift to electric mobility is no longer a choice—it is the city's new operating system.
//               </p>

//               <h2 className="text-2xl md:text-3xl font-black text-[#0D1E3A] tracking-tighter pt-4 font-display italic leading-none">
//                 The Deccan Grid Renaissance
//               </h2>
              
//               <p className="font-light">
//                 Walking through HITEC City today, you'll notice a distinct change. The low hum of diesel generators is being replaced by the silent efficiency of high-voltage DC terminals. Hyderabad has successfully integrated over 1,500 verified charging nodes into its urban fabric, making it the most power-dense city in Southern India.
//               </p>

//               <blockquote className="my-12 md:my-16 pl-6 md:pl-10 py-8 md:py-10 rounded-r-[40px] border-l-[12px] border-[#4287f5] bg-[#A3C9F7]/10">
//                 <p className="text-2xl italic font-medium text-[#0D1E3A] leading-relaxed font-sans">
//                   "The future of charging isn't about finding a plug; it's about the intelligence that happens while you're parked. We are building a neural network of energy."
//                 </p>
//                 <cite className="block mt-6 text-[10px] font-black uppercase tracking-luxury text-[#4287f5] font-sans">
//                    — N. Rama Rao, Infrastructure Lead
//                 </cite>
//               </blockquote>

//               <p className="font-light">
//                 This expansion isn't accidental. It's the result of strategic partnerships between private property owners and the Plugzo energy network. By transforming standard parking bays into "Digital Assets," we've unlocked a secondary revenue stream for local businesses while solving the range anxiety puzzle.
//               </p>

//               {/* 4. PLUGZO PULSE CTA (Creative Interruption) */}
//               <div className="my-16 md:my-24 relative overflow-hidden rounded-[40px] bg-[#0D1E3A] p-8 md:p-12 text-white">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#1DB954] rounded-full blur-[100px] opacity-20" />
//                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
//                     <div className="max-w-md">
//                         <div className="flex items-center gap-3 mb-4">
//                             <Zap size={24} className="text-[#1DB954]" fill="currentColor" />
//                             <span className="text-[10px] font-black uppercase tracking-luxury text-[#1DB954]">Plugzo Pulse</span>
//                         </div>
//                         <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4 font-display">Ready to Charge?</h3>
//                         <p className="text-white/60 text-base font-sans">Find this hub on our interactive 3D map and book your slot in real-time.</p>
//                     </div>
//                     <button 
//                         onClick={() => window.location.hash = '#/'}
//                         className="btn-tech-pulse whitespace-nowrap bg-[#1DB954] text-white px-10 py-5 rounded-2xl font-black text-[12px] uppercase tracking-luxury flex items-center gap-3 hover:scale-105 transition-all font-sans"
//                     >
//                         Locate this hub <ArrowRight size={18} />
//                     </button>
//                 </div>
//               </div>

//               <h3 className="text-2xl md:text-3xl font-black text-[#0D1E3A] tracking-tighter pt-4 font-display">
//                 Architecture of the 800V Era
//               </h3>

//               <p className="font-light">
//                 The next frontier is speed. By 2026, most of our Tier-1 terminals in Banjara Hills and the Financial District will support 800V architectures. This means adding 300km of range in less time than it takes to brew an artisanal coffee.
//               </p>

//               <img 
//                 src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200" 
//                 className="w-full h-auto rounded-[32px] md:rounded-[48px] shadow-2xl my-12 md:my-16 border border-gray-100" 
//                 alt="Tech Charging"
//               />

//               <p className="font-light">
//                 As we look toward the horizon, the goal is invisible infrastructure. You shouldn't have to think about where to charge. Like Wi-Fi, the Plugzo network will simply be everywhere you need it to be.
//               </p>
//             </div>

//             {/* Post Tags */}
//             <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap gap-3 font-sans">
//               {['EV Infrastructure', 'Smart City', 'Hyderabad Hubs', 'Tesla India', 'Green Energy'].map(tag => (
//                 <span key={tag} className="px-5 py-2 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-luxury text-gray-400 hover:text-[#1DB954] cursor-pointer transition-colors">
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           </article>

//           {/* 5. SMART SIDEBAR (35%) */}
//           <aside className="w-full lg:w-[400px] font-sans">
//             <div className="sticky top-24 md:top-32 space-y-12">
              
//               {/* Live Grid Widget */}
//               <div className="bg-white rounded-[40px] border border-gray-100 p-6 md:p-8 shadow-2xl shadow-gray-100/50">
//                 <div className="flex items-center justify-between mb-8">
//                   <div>
//                     <h4 className="text-[10px] font-black uppercase tracking-luxury text-gray-400 mb-1">Grid Intelligence</h4>
//                     <p className="text-2xl font-black text-[#0D1E3A] tracking-tighter font-display">Live Grid Widget</p>
//                   </div>
//                   <div className="w-10 h-10 rounded-2xl bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954]">
//                     <Zap size={20} fill="currentColor" />
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <p className="text-xs font-bold text-gray-400 leading-relaxed italic">
//                     Based on your reading, we've synced the nearest hubs for this location.
//                   </p>
                  
//                   {relevantChargers.map((station) => (
//                     <ChargerCard 
//                       key={station.id} 
//                       station={station} 
//                       onClick={() => window.location.hash = '#/'} 
//                     />
//                   ))}
                  
//                   <button 
//                     onClick={() => window.location.hash = '#/'}
//                     className="w-full py-5 border-2 border-gray-50 rounded-[28px] text-[10px] font-black uppercase tracking-luxury text-gray-400 hover:bg-[#F4FFF8] hover:border-[#1DB954]/20 hover:text-[#1DB954] transition-all"
//                   >
//                     view full deccan grid
//                   </button>
//                 </div>
//               </div>

//               {/* Newsletter Sub */}
//               <div className="bg-gradient-to-br from-[#4287f5] to-[#0D1E3A] rounded-[40px] p-8 md:p-10 text-white shadow-2xl shadow-[#4287f5]/20">
//                 <h4 className="text-3xl font-black tracking-tighter mb-4 font-display">Sync with the Grid.</h4>
//                 <p className="text-white/60 text-sm mb-8 leading-relaxed font-sans font-light">Join 12k+ owners getting weekly intel on new hyper-hubs and hardware updates.</p>
//                 <div className="space-y-4">
//                   <input 
//                     type="email" 
//                     placeholder="E-mail address" 
//                     className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-white/5 transition-all placeholder:text-white/30" 
//                   />
//                   <button className="w-full py-4 bg-[#1DB954] text-white rounded-2xl font-black uppercase tracking-luxury text-[11px] font-sans">
//                     Register Device
//                   </button>
//                 </div>
//               </div>

//             </div>
//           </aside>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetailPage;