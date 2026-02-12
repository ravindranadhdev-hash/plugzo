import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap, Gauge, ChevronRight, Sparkle } from 'lucide-react';
import { VEHICLES } from '../../data';
import { COLORS } from '../../constants';

const VehicleShowcase: React.FC = () => {
  return (
    <div className="space-y-10 md:space-y-16 px-4 md:px-0 py-8 md:py-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
            <span className="text-xs font-bold tracking-widest text-[#1DB954] uppercase">NEW COLLECTION</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0F3D2E] to-[#1DB954]">
            Electrify Your Journey
          </h2>
        </div>
        <div className="flex items-center text-[#1DB954] font-medium hover:text-[#17a045] transition-colors group cursor-pointer">
          <span>Explore All Models</span>
          <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {VEHICLES.map((v, index) => (
          <motion.div 
            key={v.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100/70 hover:border-[#1DB954]/30 hover:shadow-[0_10px_40px_-15px_rgba(29,185,84,0.35)] transition-all duration-500 relative"
            onClick={() => window.location.hash = `#/vehicle/${v.id}`}
          >
            {/* Premium Badge */}
            {v.isNew && (
              <div className="absolute top-4 right-4 z-10 flex items-center px-3 py-1.5 bg-gradient-to-r from-[#1DB954] to-[#25d966] rounded-full">
                <Sparkle size={12} className="text-white mr-1.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">New Arrival</span>
              </div>
            )}
            
            <div className="relative h-56 md:h-72 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E]/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={v.image} 
                alt={v.model} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#0F3D2E] text-xs font-bold rounded-full border border-white/20">
                  {v.model}
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-7 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-2xl font-bold text-[#0D1E3A] leading-tight">{v.model}</h3>
                  <p className="text-gray-500 mt-1 text-sm">{v.manufacturer}</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1DB954]/10 to-[#25d966]/10 flex items-center justify-center">
                    <Zap size={18} className="text-[#1DB954]" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-1">
                <SpecBar 
                  label="WLTP Range" 
                  value={`${v.range} km`} 
                  icon={<Battery size={14} className="text-[#1DB954]" />} 
                  progress={Math.min(100, (v.range / 700) * 100)} 
                />
                <SpecBar 
                  label="Top Speed" 
                  value={`${v.topSpeed} km/h`} 
                  icon={<Gauge size={14} className="text-[#0F3D2E]" />} 
                  progress={Math.min(100, (v.topSpeed / 300) * 100)} 
                />
                <SpecBar 
                  label="Architecture" 
                  value={v.batteryTech} 
                  icon={<Zap size={14} className="text-[#FFA500]" />} 
                  isTech={true}
                />
              </div>
              
              <div className="pt-3 flex justify-between items-center border-t border-gray-100">
                <div>
                  <span className="text-xs font-medium text-gray-500">Starting at</span>
                  <div className="text-lg md:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#0F3D2E] to-[#1DB954]">
                    {v.price}
                  </div>
                </div>
                <motion.div 
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1DB954] to-[#17a045] flex items-center justify-center text-white"
                >
                  <ChevronRight size={18} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SpecBar = ({ 
  label, 
  value, 
  icon, 
  progress = 80, 
  isTech = false 
}: { 
  label: string, 
  value: string, 
  icon: React.ReactNode, 
  progress?: number,
  isTech?: boolean 
}) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center text-xs font-medium">
      <div className="flex items-center text-gray-600">
        {icon}
        <span className="ml-2">{label}</span>
      </div>
      <span className={`font-bold ${isTech ? 'text-[#0F3D2E]' : 'text-[#1DB954]'}`}>
        {value}
      </span>
    </div>
    {isTech ? (
      <div className="flex flex-wrap gap-1.5 py-1.5">
        {value.split(', ').map((tech, i) => (
          <span 
            key={i} 
            className="px-2 py-0.5 bg-[#1DB954]/5 text-[#1DB954] text-[10px] font-medium rounded-full border border-[#1DB954]/10"
          >
            {tech}
          </span>
        ))}
      </div>
    ) : (
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#1DB954] to-[#25d966] rounded-full"
        />
      </div>
    )}
  </div>
);

export default VehicleShowcase;
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Battery, Zap, Gauge, ChevronRight } from 'lucide-react';
// import { VEHICLES } from '../../data';
// import { COLORS } from '../../constants';

// const VehicleShowcase: React.FC = () => {
//   return (
//     <div className="space-y-8 md:space-y-16 px-4 md:px-0">
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
//         <div>
//           <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-3 md:mb-4" style={{ backgroundColor: `${COLORS.secondary}10`, color: COLORS.secondary }}>
//             EV Launchpad
//           </span>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-[#0F3D2E]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
//             New Arrivals
//           </h2>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
//         {VEHICLES.map((v) => (
//           <motion.div 
//             key={v.id}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="group cursor-pointer bg-white rounded-[40px] overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500"
//             onClick={() => window.location.hash = `#/vehicle/${v.id}`}
//           >
//             <div className="relative h-48 md:h-64 overflow-hidden">
//               <img src={v.image} alt={v.model} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//             </div>
//             <div className="p-5 md:p-8 space-y-4 md:space-y-6">
//               <h3 className="text-xl md:text-2xl font-black text-[#0D1E3A] tracking-tighter" style={{ fontFamily: 'Plus Jakarta Sans' }}>{v.model}</h3>
//               <div className="space-y-4">
//                  <SpecBar label="WLTP Range" value={`${v.range} km`} icon={<Battery size={14} />} />
//                  <SpecBar label="Top Speed" value={`${v.topSpeed} km/h`} icon={<Gauge size={14} />} />
//                  <SpecBar label="Architecture" value={v.batteryTech} icon={<Zap size={14} />} />
//               </div>
//               <div className="pt-4 md:pt-6 flex justify-between items-center border-t border-gray-50">
//                 <span className="text-[10px] font-black uppercase text-[#4287f5]">{v.price}</span>
//                 <ChevronRight size={18} className="md:w-5 md:h-5 text-[#0D1E3A] group-hover:translate-x-1 transition-transform" />
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const SpecBar = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
//   <div className="space-y-2">
//     <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-400">
//       <div className="flex items-center gap-2">{icon}{label}</div>
//       <span className="text-[#4287f5]">{value}</span>
//     </div>
//     <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
//        <motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} className="h-full bg-[#4287f5]" />
//     </div>
//   </div>
// );

// export default VehicleShowcase;