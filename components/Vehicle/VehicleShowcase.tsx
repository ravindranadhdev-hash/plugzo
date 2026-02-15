import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Zap, Gauge, ChevronRight, Sparkle, X, ExternalLink, Globe, MapPin, Calendar } from 'lucide-react';
import { EV_BUSINESSES, EVBusiness, EVModel } from '../../data/evBusinesses';
import { COLORS } from '../../constants';

const VehicleShowcase: React.FC = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<EVBusiness | null>(null);

  const openBusinessDetails = (business: EVBusiness) => {
    setSelectedBusiness(business);
  };

  const closeBusinessDetails = () => {
    setSelectedBusiness(null);
  };

  return (
    <>
      <div className="space-y-10 md:space-y-16 px-4 md:px-0 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
              <span className="text-xs font-bold tracking-widest text-[#1DB954] uppercase">EV BRANDS</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0F3D2E] to-[#1DB954]">
              Leading EV Manufacturers
            </h2>
          </div>
          <div className="flex items-center text-[#1DB954] font-medium hover:text-[#17a045] transition-colors group cursor-pointer">
            <span>Explore All Brands</span>
            <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EV_BUSINESSES.map((business, index) => (
            <motion.div 
              key={business.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100/70 hover:border-[#1DB954]/30 hover:shadow-[0_10px_40px_-15px_rgba(29,185,84,0.35)] transition-all duration-500 relative"
              onClick={() => openBusinessDetails(business)}
            >
              {/* Category Badge */}
              <div className="absolute top-4 right-4 z-10 flex items-center px-3 py-1.5 bg-gradient-to-r from-[#1DB954] to-[#25d966] rounded-full">
                <Sparkle size={12} className="text-white mr-1.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">{business.category}</span>
              </div>
              
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E]/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src={business.logo} 
                  alt={business.name} 
                  className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#0F3D2E] text-xs font-bold rounded-full border border-white/20">
                    {business.models.length} Models
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0D1E3A] leading-tight">{business.name}</h3>
                    <p className="text-gray-500 mt-1 text-sm line-clamp-2">{business.description}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1DB954]/10 to-[#25d966]/10 flex items-center justify-center">
                      <Zap size={18} className="text-[#1DB954]" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin size={12} className="mr-2 text-[#1DB954]" />
                    <span>{business.headquarters}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-2 text-[#1DB954]" />
                    <span>Founded {business.founded}</span>
                  </div>
                </div>
                
                <div className="pt-3 flex justify-between items-center border-t border-gray-100">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Popular Models</span>
                    <div className="text-sm font-bold text-[#0F3D2E]">
                      {business.models.slice(0, 2).map(model => model.name).join(', ')}
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

      {/* Business Details Modal */}
      <AnimatePresence>
        {selectedBusiness && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeBusinessDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-32 bg-gradient-to-br from-[#1DB954]/10 to-[#25d966]/10 p-6">
                <button
                  onClick={closeBusinessDetails}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedBusiness.logo} 
                    alt={selectedBusiness.name} 
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h2 className="text-3xl font-bold text-[#0F3D2E]">{selectedBusiness.name}</h2>
                    <p className="text-gray-600 mt-1">{selectedBusiness.description}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {/* Company Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin size={16} className="text-[#1DB954]" />
                    <div>
                      <div className="text-xs text-gray-500">Headquarters</div>
                      <div className="text-sm font-semibold">{selectedBusiness.headquarters}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Calendar size={16} className="text-[#1DB954]" />
                    <div>
                      <div className="text-xs text-gray-500">Founded</div>
                      <div className="text-sm font-semibold">{selectedBusiness.founded}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Globe size={16} className="text-[#1DB954]" />
                    <div>
                      <div className="text-xs text-gray-500">Website</div>
                      <a 
                        href={selectedBusiness.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#1DB954] hover:underline flex items-center gap-1"
                      >
                        Visit <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Models Grid */}
                <h3 className="text-xl font-bold text-[#0F3D2E] mb-4">Available Models</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedBusiness.models.map((model) => (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="h-32 bg-white">
                        <img 
                          src={model.image} 
                          alt={model.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-bold text-[#0F3D2E]">{model.name}</h4>
                        <div className="text-xs text-gray-500 space-y-1">
                          <div className="flex items-center gap-2">
                            <Battery size={10} />
                            <span>Range: {model.range}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Gauge size={10} />
                            <span>Top Speed: {model.topSpeed}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-bold text-[#1DB954]">{model.price}</span>
                          <div className="flex gap-2">
                            {model.amazonLink && (
                              <a
                                href={model.amazonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
                              >
                                Amazon
                              </a>
                            )}
                            <a
                              href={selectedBusiness.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-[#1DB954] text-white text-xs rounded hover:bg-[#17a045] transition-colors"
                            >
                              Official
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Amazon Affiliate Section */}
                {selectedBusiness.amazonAffiliate && (
                  <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-sm font-bold text-orange-800">Shop on Amazon</span>
                    </div>
                    <p className="text-xs text-orange-700 mb-3">
                      Find accessories and merchandise for {selectedBusiness.name} vehicles on Amazon
                    </p>
                    <a
                      href={selectedBusiness.amazonAffiliate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Browse on Amazon <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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