import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap, Gauge, ChevronRight } from 'lucide-react';
import { VEHICLES } from '../../data';
import { COLORS } from '../../constants';

const VehicleShowcase: React.FC = () => {
  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ backgroundColor: `${COLORS.secondary}10`, color: COLORS.secondary }}>
            EV Launchpad
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0F3D2E]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            New Arrivals
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {VEHICLES.map((v) => (
          <motion.div 
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer bg-white rounded-[40px] overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500"
            onClick={() => window.location.hash = `#/vehicle/${v.id}`}
          >
            <div className="relative h-64 overflow-hidden">
              <img src={v.image} alt={v.model} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8 space-y-6">
              <h3 className="text-2xl font-black text-[#0D1E3A] tracking-tighter" style={{ fontFamily: 'Plus Jakarta Sans' }}>{v.model}</h3>
              <div className="space-y-4">
                 <SpecBar label="WLTP Range" value={`${v.range} km`} icon={<Battery size={14} />} />
                 <SpecBar label="Top Speed" value={`${v.topSpeed} km/h`} icon={<Gauge size={14} />} />
                 <SpecBar label="Architecture" value={v.batteryTech} icon={<Zap size={14} />} />
              </div>
              <div className="pt-6 flex justify-between items-center border-t border-gray-50">
                <span className="text-[10px] font-black uppercase text-[#4287f5]">{v.price}</span>
                <ChevronRight size={20} className="text-[#0D1E3A] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SpecBar = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-400">
      <div className="flex items-center gap-2">{icon}{label}</div>
      <span className="text-[#4287f5]">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
       <motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} className="h-full bg-[#4287f5]" />
    </div>
  </div>
);

export default VehicleShowcase;