import React, { useState, useMemo } from 'react';
import { 
  Zap, Battery, ShieldCheck, Gauge, ArrowLeft, 
  Box, CheckCircle2, Phone 
} from 'lucide-react';
import { Vehicle } from '../../types';
import { COLORS } from '../../constants';

interface CarDetailPageProps {
  vehicle: Vehicle;
}

const CarDetailPage: React.FC<CarDetailPageProps> = ({ vehicle }) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'performance'>('specs');

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-black overflow-hidden">
        <img 
          src={vehicle.image} 
          alt={`${vehicle.model} Hyderabad - Official Showcase`} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="absolute top-10 left-8 sm:left-20">
            <button 
                onClick={() => window.location.hash = '#/'}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
                <ArrowLeft size={20} /> Back to Discover
            </button>
        </div>

        <div className="absolute bottom-20 left-8 sm:left-20 max-w-2xl text-white">
            <span className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block" style={{ backgroundColor: COLORS.primary }}>
                2026 FLEET
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">{vehicle.model}</h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                The pinnacle of urban electrification. Designed specifically for the tech-hubs of Hyderabad.
            </p>
        </div>

        <button className="absolute bottom-20 right-8 sm:right-20 flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all">
           <Box size={24} /> 360° View
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1 space-y-16">
                {/* Specs Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="p-6 rounded-3xl bg-[#F4FFF8] flex flex-col items-center text-center">
                        <Battery size={32} style={{ color: COLORS.primary }} className="mb-3" />
                        <p className="text-[10px] uppercase font-bold text-gray-400">WLTP Range</p>
                        <p className="text-2xl font-bold" style={{ color: COLORS.dark }}>{vehicle.range} km</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-[#F4FFF8] flex flex-col items-center text-center">
                        <Gauge size={32} style={{ color: COLORS.primary }} className="mb-3" />
                        <p className="text-[10px] uppercase font-bold text-gray-400">0-100 km/h</p>
                        <p className="text-2xl font-bold" style={{ color: COLORS.dark }}>3.4s</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-[#F4FFF8] flex flex-col items-center text-center">
                        <Zap size={32} style={{ color: COLORS.primary }} className="mb-3" />
                        <p className="text-[10px] uppercase font-bold text-gray-400">Peak Power</p>
                        <p className="text-2xl font-bold" style={{ color: COLORS.dark }}>450 kW</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-[#F4FFF8] flex flex-col items-center text-center">
                        <ShieldCheck size={32} style={{ color: COLORS.primary }} className="mb-3" />
                        <p className="text-[10px] uppercase font-bold text-gray-400">Safety</p>
                        <p className="text-2xl font-bold" style={{ color: COLORS.dark }}>5 Star</p>
                    </div>
                </div>

                {/* Information Tabs */}
                <div className="space-y-8">
                    <div className="flex gap-10 border-b border-gray-100 pb-2">
                        <button 
                            onClick={() => setActiveTab('specs')}
                            className={`pb-4 text-xl font-bold transition-all relative ${activeTab === 'specs' ? 'text-[#0F3D2E]' : 'text-gray-300'}`}
                        >
                            Overview
                            {activeTab === 'specs' && <div className="absolute bottom-0 left-0 right-0 h-1 rounded-full" style={{ backgroundColor: COLORS.primary }} />}
                        </button>
                        <button 
                             onClick={() => setActiveTab('performance')}
                            className={`pb-4 text-xl font-bold transition-all relative ${activeTab === 'performance' ? 'text-[#0F3D2E]' : 'text-gray-300'}`}
                        >
                            Comparison
                            {activeTab === 'performance' && <div className="absolute bottom-0 left-0 right-0 h-1 rounded-full" style={{ backgroundColor: COLORS.primary }} />}
                        </button>
                    </div>

                    {activeTab === 'specs' ? (
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <h2 className="text-2xl font-bold text-[#0F3D2E]">Engineering for the Deccan Plateau</h2>
                            <p>
                                The {vehicle.model} is engineered to thrive in Hyderabad's evolving landscape. With a battery architecture optimized for high ambient temperatures, it maintains consistent performance even during peak summer months.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mt-8">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={20} style={{ color: COLORS.primary }} />
                                    <span>Home Charging Box Included</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={20} style={{ color: COLORS.primary }} />
                                    <span>8-Year Battery Warranty</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={20} style={{ color: COLORS.primary }} />
                                    <span>OTA Software Updates</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={20} style={{ color: COLORS.primary }} />
                                    <span>Level 4 Autonomous Pilot</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-3xl border border-gray-100">
                             <table className="w-full text-left">
                                <thead className="bg-[#F4FFF8]">
                                    <tr>
                                        <th className="px-6 py-4 font-bold" style={{ color: COLORS.dark }}>Feature</th>
                                        <th className="px-6 py-4 font-bold" style={{ color: COLORS.secondary }}>{vehicle.model}</th>
                                        <th className="px-6 py-4 font-bold text-gray-400">Competitor X</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr>
                                        <td className="px-6 py-4 font-medium">Battery Tech</td>
                                        <td className="px-6 py-4 font-bold" style={{ color: COLORS.secondary }}>{vehicle.batteryTech}</td>
                                        <td className="px-6 py-4 text-gray-400">Standard NMC</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium">Charge Speed</td>
                                        <td className="px-6 py-4 font-bold" style={{ color: COLORS.secondary }}>10-80% in 18m</td>
                                        <td className="px-6 py-4 text-gray-400">10-80% in 45m</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium">Drive System</td>
                                        <td className="px-6 py-4 font-bold" style={{ color: COLORS.secondary }}>Quad Motor AWD</td>
                                        <td className="px-6 py-4 text-gray-400">Dual Motor AWD</td>
                                    </tr>
                                </tbody>
                             </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Showroom Widget */}
            <div className="w-full lg:w-[400px]">
                <div className="sticky top-32 p-8 rounded-[32px] shadow-2xl space-y-8 bg-white border border-gray-100">
                    <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Estimated Price Hyderabad</p>
                        <p className="text-4xl font-extrabold" style={{ color: COLORS.dark }}>{vehicle.price}</p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                           <MapPin size={18} style={{ color: COLORS.primary }} /> Nearby EV Showrooms
                        </p>
                        <div className="space-y-3">
                            {vehicle.showroom_avail.map((city, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[#F4FFF8] border border-[#1DB954]/10">
                                    <span className="font-semibold text-gray-700">{city}</span>
                                    <button className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: COLORS.primary }}>
                                        Book Drive
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex gap-4">
                        <button className="flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition-all hover:scale-105" style={{ backgroundColor: COLORS.dark }}>
                           Reserve Now
                        </button>
                        <button className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all hover:bg-gray-50" style={{ borderColor: COLORS.dark }}>
                           <Phone size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const MapPin = ({ size, style, className }: any) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
        style={style}
    >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
)

export default CarDetailPage;