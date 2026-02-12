import React from 'react';
import { ArrowRight, Clock, Navigation } from 'lucide-react';
import { Station } from '../../types';
import { redirectToGoogleMaps } from '../../utils/navigation';

interface ChargerCardProps {
  station: Station;
  onClick: () => void;
}

const ChargerCard: React.FC<ChargerCardProps> = ({ station, onClick }) => {
  const handleQuickNav = (e: React.MouseEvent) => {
    e.stopPropagation();
    const lat = parseFloat(String(station.lat ?? 0));
    const lng = parseFloat(String(station.lng ?? 0));
    if (!isNaN(lat) && !isNaN(lng)) {
      redirectToGoogleMaps(lat, lng);
    }
  };

  const name = station?.name ?? 'Charging station';

  const primaryImage = station.media?.find((m: any) => m.type === 'primary')?.file_path ||
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800';

  const isAvailable = (station as any).status === 'AVAILABLE' || station.is_active === 1;

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-[32px] p-4 shadow-sm border border-slate-100 cursor-pointer transition-all duration-200 hover:border-[#1DB954]/40 hover:shadow-xl hover:bg-[#F4FFF8]/30 active:bg-white"
    >
      {/* Image Container - Fixed 3:2 Aspect Ratio, No Zoom */}
      <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden bg-slate-100 mb-3">
        <img 
          src={primaryImage} 
          alt={name}
          className="w-full h-full object-cover" // Zoom animation removed
        />
        
        {/* Available Badge - Top Left */}
        {isAvailable && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#1DB954] rounded-full animate-pulse" />
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">Available</span>
          </div>
        )}
        
        {/* Rating Badge - Bottom Right */}
        <div className="absolute bottom-3 right-3 bg-[#1DB954] text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-lg">
          {Number((station as any).overall_rating ?? station.reviews_avg_rating ?? 4.5).toFixed(1)} ★
        </div>
      </div>

      {/* Content Section */}
      <div className="px-1 space-y-1">
        <h3 className="text-lg font-bold text-[#0F3D2E] truncate leading-tight group-hover:text-[#1DB954] transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
          <Clock size={12} className="text-slate-400" />
          <span>{station.eta_minutes ?? '8'} MIN</span>
          <span className="text-slate-300">•</span>
          <Navigation size={12} className="text-slate-400" />
          <span>{station.distance_km ?? '1.2'} KM</span>
        </div>
        
        <p className="text-[#4287f5] text-[10px] font-black uppercase tracking-widest pt-1">
          ⚡ {(station as any).powerKW ?? station.chargers?.[0]?.power_kw ?? '60'} KW Fast Charging
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-[#1DB954] text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-green-500/10 hover:brightness-105 active:scale-[0.98]">
          Reserve Slot
        </button>
        <button 
          onClick={handleQuickNav}
          className="w-14 bg-[#0F3D2E] text-white flex items-center justify-center rounded-2xl shadow-lg transition-all hover:bg-[#1a2f44] active:scale-90"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChargerCard;
// import React from 'react';
// import { Star, ArrowRight, Clock, Navigation } from 'lucide-react';
// import { Station } from '../../types';
// import { redirectToGoogleMaps } from '../../utils/navigation';

// interface ChargerCardProps {
//   station: Station;
//   onClick: () => void;
// }

// const ChargerCard: React.FC<ChargerCardProps> = ({ station, onClick }) => {
//   const handleQuickNav = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     redirectToGoogleMaps(station.lat, station.lng);
//   };

//   const primaryImage = station.media?.find(m => m.type === 'primary')?.file_path || 
//     'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800';

//   const isAvailable = (station.status || 'AVAILABLE') === 'AVAILABLE';

//   return (
//     <div 
//       onClick={onClick}
//       className="bg-white rounded-[32px] p-4 shadow-xl border border-slate-100 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
//     >
//       {/* Image Container - 3:2 Aspect Ratio */}
//       <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden bg-slate-100 mb-3">
//         <img 
//           src={primaryImage} 
//           alt={station.name}
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
//         />
        
//         {/* Available Badge - Top Left */}
//         {isAvailable && (
//           <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1.5">
//             <div className="w-1.5 h-1.5 bg-[#1DB954] rounded-full animate-pulse" />
//             <span className="text-white text-[10px] font-bold uppercase tracking-wider">Available</span>
//           </div>
//         )}
        
//         {/* Rating Badge - Bottom Right */}
//         <div className="absolute bottom-3 right-3 bg-[#1DB954] text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-lg">
//           {Number(station.overall_rating ?? 4.5).toFixed(1)} ★
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="px-1 space-y-1">
//         <h3 className="text-lg font-bold text-[#0F3D2E] truncate leading-tight">
//           {station.name}
//         </h3>
        
//         <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
//           <Clock size={12} className="text-slate-400" />
//           <span>{station.eta_minutes || '8'} MIN</span>
//           <span className="text-slate-300">•</span>
//           <Navigation size={12} className="text-slate-400" />
//           <span>{station.distance_km || '1.2'} KM</span>
//         </div>
        
//         <p className="text-[#4287f5] text-[10px] font-black uppercase tracking-widest pt-1">
//           ⚡ {station.powerKW || '60'} KW Fast Charging
//         </p>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-2 mt-4">
//         <button className="flex-1 bg-[#1DB954] text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-transform active:scale-95 shadow-lg shadow-green-500/20 hover:shadow-green-500/30">
//           Reserve Slot
//         </button>
//         <button 
//           onClick={handleQuickNav}
//           className="w-14 bg-[#0F3D2E] text-white flex items-center justify-center rounded-2xl shadow-lg transition-all active:scale-90 hover:bg-[#1a2f44]"
//         >
//           <ArrowRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChargerCard;