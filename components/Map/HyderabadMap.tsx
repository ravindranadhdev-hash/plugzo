import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { 
  Zap, 
  MapPin, 
  Clock, 
  Star, 
  Navigation, 
  Info, 
  Gauge, 
  CheckCircle2, 
  AlertCircle,
  Crosshair,
  X
} from 'lucide-react';
import { Station } from '../../types';
import { COLORS } from '../../constants';

/* -------------------- HELPERS -------------------- */
const DEFAULT_MAP_CENTER: [number, number] = [17.385, 78.4867];

const toNum = (v: any): number => {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
  return typeof n === 'number' && !isNaN(n) ? n : NaN;
};

const isValidLatLng = (lat: number, lng: number): boolean =>
  !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;

interface HyderabadMapProps {
  activeChargerId?: string;
  userLocation?: { lat: number; lng: number } | null;
  stations: Station[];
  onMarkerClick: (id: string) => void;
}

/* -------------------- FIND ME BUTTON -------------------- */
const FindMeButton: React.FC<{ userLocation?: { lat: number; lng: number } | null; onFindMe: () => void }> = ({ userLocation, onFindMe }) => {
  const [isLocating, setIsLocating] = useState(false);

  const handleClick = () => {
    setIsLocating(true);
    onFindMe();
    setTimeout(() => setIsLocating(false), 2000);
  };

  return (
    <div 
      className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
      style={{ top: '16px', right: '16px' }}
    >
      <button
        onClick={handleClick}
        disabled={!userLocation || isLocating}
        className={`p-3 rounded-lg transition-all ${
          userLocation && !isLocating 
            ? 'hover:bg-blue-50 text-blue-600 hover:text-blue-700' 
            : 'text-gray-400 cursor-not-allowed'
        }`}
        title={userLocation ? "Find my location" : "Location not available"}
      >
        <Crosshair 
          size={20} 
          className={`${isLocating ? 'animate-pulse' : ''}`}
        />
      </button>
    </div>
  );
};

/* -------------------- MAP CONTROLLER -------------------- */
const MapController = ({ activeChargerId, userLocation, stations, findMeTrigger }: any) => {
  const map = useMap();
  
  useEffect(() => {
    map.invalidateSize();
    let target: [number, number] | null = null;
    let zoom = 13;

    if (activeChargerId) {
      const charger = stations.find((c: any) => c.id.toString() === activeChargerId.toString());
      if (charger) {
        const lat = toNum(charger.lat);
        const lng = toNum(charger.lng);
        if (isValidLatLng(lat, lng)) { target = [lat, lng]; zoom = 15; }
      }
    } else if (userLocation) {
      const lat = toNum(userLocation.lat);
      const lng = toNum(userLocation.lng);
      if (isValidLatLng(lat, lng)) { target = [lat, lng]; zoom = 14; }
    }

    if (target) {
      try { map.flyTo(target, zoom, { duration: 1.2 }); } 
      catch { map.setView(target, zoom); }
    }
  }, [activeChargerId, userLocation, map, stations]);

  // Handle find me trigger
  useEffect(() => {
    if (findMeTrigger && userLocation) {
      const lat = toNum(userLocation.lat);
      const lng = toNum(userLocation.lng);
      if (isValidLatLng(lat, lng)) {
        try { 
          map.flyTo([lat, lng], 15, { duration: 1.5 }); 
        } catch { 
          map.setView([lat, lng], 15); 
        }
      }
    }
  }, [findMeTrigger, userLocation, map]);

  return null;
};

/* -------------------- DYNAMIC FLAT MARKER -------------------- */
const customMarkerHtml = (power: number, isAvailable: boolean, isActive: boolean) => {
  // Use renderToString to convert the Lucide Zap icon to an HTML string
  const iconHtml = renderToString(
    <Zap size={14} fill={isAvailable ? COLORS.primary : "#94a3b8"} color={isAvailable ? COLORS.primary : "#94a3b8"} />
  );

  return `
    <div style="display:flex; flex-direction:column; align-items:center; transform:${isActive ? 'scale(1.15)' : 'scale(1)'}; transition:0.3s;">
      <div style="
        background:white; padding:5px 10px; border-radius:12px; 
        box-shadow:0 4px 12px rgba(0,0,0,0.15); 
        border:2px solid ${isActive ? COLORS.primary : (isAvailable ? '#e2e8f0' : '#f1f5f9')};
        display:flex; align-items:center; gap:6px; font-weight:700; font-size:12px; color:#1e293b;
      ">
        ${iconHtml} <span>${power}kW</span>
      </div>
      <div style="width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent; border-top:8px solid ${isActive ? COLORS.primary : 'white'}; margin-top:-1px;"></div>
    </div>
  `;
};

/* -------------------- MAIN COMPONENT -------------------- */
const HyderabadMap: React.FC<HyderabadMapProps> = ({ activeChargerId, userLocation, stations, onMarkerClick }) => {
  const [findMeTrigger, setFindMeTrigger] = useState(0);
  const [googleMapsPopup, setGoogleMapsPopup] = useState<{ station: Station; lat: number; lng: number } | null>(null);
  
  const getCurrentStatus = (openingTime?: string, closingTime?: string) => {
    if (!openingTime || !closingTime) return { label: 'Check hours', color: '#64748b' };
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [oH, oM] = openingTime.split(':').map(Number);
    const [cH, cM] = closingTime.split(':').map(Number);
    const isOpen = currentTime >= (oH * 60 + oM) && currentTime <= (cH * 60 + cM);
    return isOpen ? { label: 'Open Now', color: COLORS.primary } : { label: 'Closed', color: '#ef4444' };
  };

  const getSafeCenter = (): [number, number] => {
    const lat = toNum(userLocation?.lat);
    const lng = toNum(userLocation?.lng);
    return isValidLatLng(lat, lng) ? [lat, lng] : DEFAULT_MAP_CENTER;
  };

  const handleFindMe = () => {
    setFindMeTrigger(prev => prev + 1);
  };

  const openGoogleMaps = (station: Station) => {
    const lat = toNum(station.lat);
    const lng = toNum(station.lng);
    if (isValidLatLng(lat, lng)) {
      setGoogleMapsPopup({ station, lat, lng });
    }
  };

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-xl border border-slate-200" style={{ minHeight: '500px' }}>
      {/* Find Me Button */}
      <FindMeButton userLocation={userLocation} onFindMe={handleFindMe} />
      
      <MapContainer center={getSafeCenter()} zoom={13} scrollWheelZoom={true} zoomControl={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <ZoomControl position="bottomright" />
        <MapController activeChargerId={activeChargerId} userLocation={userLocation} stations={stations} findMeTrigger={findMeTrigger} />

        {/* Markers & Popups */}
        {stations.map(charger => {
          const lat = toNum(charger.lat);
          const lng = toNum(charger.lng);
          if (isNaN(lat) || isNaN(lng)) return null;

          const isActive = activeChargerId === charger.id.toString();
          const isAvailable = charger.status === 'AVAILABLE';
          const statusInfo = getCurrentStatus(charger.opening_time, charger.closing_time);

          const customIcon = L.divIcon({
            html: customMarkerHtml(charger.powerKW || 60, isAvailable, isActive),
            className: '',
            iconSize: [80, 42],
            iconAnchor: [40, 42]
          });

          return (
            <Marker 
              key={charger.id} 
              position={[lat, lng]} 
              icon={customIcon}
              eventHandlers={{ mouseover: (e) => e.target.openPopup(), click: () => onMarkerClick(charger.id.toString()) }}
            >
              <Popup closeButton={false} minWidth={280} className="custom-popup-modern">
                <div style={{ padding: 0, overflow: 'hidden', borderRadius: '12px', background: 'white' }}>
                  {/* Header */}
                  <div style={{ background: isAvailable ? COLORS.primary : '#475569', padding: '12px 16px', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '-0.3px' }}>{charger.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700 }}>
                        {isAvailable ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {isAvailable ? 'AVAILABLE' : 'BUSY'}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '16px' }}>
                    {/* Location Row */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                      <div style={{ background: '#f1f5f9', padding: '8px', borderRadius: '8px' }}>
                        <MapPin size={18} color="#64748b" />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{charger.locality}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{charger.address}</div>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                      <div style={{ border: '1px solid #f1f5f9', padding: '10px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>
                          <Clock size={12} /> HOURS
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>{charger.opening_time || '09:00'} - {charger.closing_time || '21:00'}</div>
                        <div style={{ fontSize: '10px', color: statusInfo.color, fontWeight: 600 }}>{charger.is_24x7 ? 'Open 24/7' : statusInfo.label}</div>
                      </div>
                      <div style={{ border: '1px solid #f1f5f9', padding: '10px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>
                          <Gauge size={12} /> POWER
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: COLORS.primary }}>{charger.powerKW || 60} kW</div>
                        <div style={{ fontSize: '10px', color: '#64748b' }}>DC Fast Charger</div>
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={18} fill="#fbbf24" color="#fbbf24" />
                        <span style={{ fontWeight: 800, fontSize: '16px', color: '#1e293b' }}>{Number(charger.overall_rating || 4.5).toFixed(1)}</span>
                      </div>
                      <button 
                        onClick={() => openGoogleMaps(charger)}
                        style={{
                          background: COLORS.primary, color: 'white', border: 'none', padding: '10px 18px',
                          borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '6px'
                        }}
                      >
                        Navigate <Navigation size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Google Maps Popup Modal */}
      {googleMapsPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]"
          onClick={() => setGoogleMapsPopup(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-2xl max-h-[90%] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{googleMapsPopup.station.name}</h3>
                <p className="text-sm text-gray-500">{googleMapsPopup.station.address}</p>
              </div>
              <button
                onClick={() => setGoogleMapsPopup(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            {/* Google Maps iframe */}
            <div className="p-4">
              <iframe
                src={`https://www.google.com/maps?q=${googleMapsPopup.lat},${googleMapsPopup.lng}&z=15&output=embed`}
                className="w-full h-96 rounded-lg border border-gray-300"
                style={{ minHeight: '400px' }}
                title="Google Maps Navigation"
                allowFullScreen
                loading="lazy"
              />
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Coordinates:</span> {googleMapsPopup.lat.toFixed(6)}, {googleMapsPopup.lng.toFixed(6)}
                </div>
                <button
                  onClick={() => setGoogleMapsPopup(null)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HyderabadMap;
// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
// import L from 'leaflet';
// import { Station } from '../../types';
// import { COLORS } from '../../constants';

// import { redirectToGoogleMaps } from '../../utils/navigation';

// const DEFAULT_MAP_CENTER: [number, number] = [17.385, 78.4867];

// const toNum = (v: any): number => {
//   const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
//   return typeof n === 'number' && !isNaN(n) ? n : NaN;
// };

// const isValidLatLng = (lat: number, lng: number): boolean =>
//   !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;

// interface HyderabadMapProps {
//   activeChargerId?: string;
//   userLocation?: { lat: number; lng: number } | null;
//   stations: Station[];
//   onMarkerClick: (id: string) => void;
// }

// /* -------------------- MAP CONTROLLER -------------------- */
// const MapController = ({
//   activeChargerId,
//   userLocation,
//   stations
// }: {
//   activeChargerId?: string;
//   userLocation?: { lat: number; lng: number } | null;
//   stations: Station[];
// }) => {
//   const map = useMap();

//   useEffect(() => {
//     map.invalidateSize();

//     let target: [number, number] | null = null;
//     let zoom = 13;

//     if (activeChargerId) {
//       const charger = stations.find(
//         c => c.id.toString() === activeChargerId.toString()
//       );
//       if (charger) {
//         const lat = toNum(charger.lat);
//         const lng = toNum(charger.lng);
//         if (isValidLatLng(lat, lng)) {
//           target = [lat, lng];
//           zoom = 15;
//         }
//       }
//     } else if (userLocation) {
//       const lat = toNum(userLocation.lat);
//       const lng = toNum(userLocation.lng);
//       if (isValidLatLng(lat, lng)) {
//         target = [lat, lng];
//         zoom = 14;
//       }
//     }

//     if (!target) return;

//     try {
//       map.flyTo(target, zoom, { duration: 1.2 });
//     } catch {
//       map.setView(DEFAULT_MAP_CENTER, zoom);
//     }
//   }, [activeChargerId, userLocation, map, stations]);

//   return null;
// };

// /* -------------------- MODERN MARKER -------------------- */
// const customMarkerHtml = (
//   power: number,
//   isAvailable: boolean,
//   isActive: boolean
// ) => `
//   <div style="
//     display:flex;
//     flex-direction:column;
//     align-items:center;
//     transform:${isActive ? 'scale(1.2)' : 'scale(1)'};
//     transition:0.3s;
//   ">
//     <div style="
//       background:white;
//       padding:6px 12px;
//       border-radius:30px;
//       box-shadow:0 6px 20px rgba(0,0,0,0.15);
//       border:2px solid ${isAvailable ? COLORS.primary : '#ccc'};
//       font-weight:700;
//       font-size:12px;
//       color:${COLORS.dark};
//       display:flex;
//       align-items:center;
//       gap:6px;
//     ">
//       ⚡ ${power} kW
//       ${
//         isAvailable
//           ? `<span style="
//               width:8px;
//               height:8px;
//               background:${COLORS.primary};
//               border-radius:50%;
//               box-shadow:0 0 8px ${COLORS.primary};
//             "></span>`
//           : ''
//       }
//     </div>
//     <div style="
//       width:0;
//       height:0;
//       border-left:8px solid transparent;
//       border-right:8px solid transparent;
//       border-top:12px solid ${COLORS.primary};
//       margin-top:-2px;
//     "></div>
//   </div>
// `;

// const HyderabadMap: React.FC<HyderabadMapProps> = ({
//   activeChargerId,
//   userLocation,
//   stations,
//   onMarkerClick
// }) => {
//   // Helper function to check current status
//   const getCurrentStatus = (openingTime?: string, closingTime?: string) => {
//     if (!openingTime || !closingTime) return '⏰ Check hours';
    
//     const now = new Date();
//     const currentHour = now.getHours();
//     const currentMinute = now.getMinutes();
//     const currentTime = currentHour * 60 + currentMinute;
    
//     const [openHour, openMinute] = openingTime.split(':').map(Number);
//     const [closeHour, closeMinute] = closingTime.split(':').map(Number);
//     const openTime = openHour * 60 + openMinute;
//     const closeTime = closeHour * 60 + closeMinute;
    
//     if (currentTime >= openTime && currentTime <= closeTime) {
//       return '🟢 Open Now';
//     } else {
//       return '🔴 Closed';
//     }
//   };

//   /* -------------------- MAP LOADING GUARD -------------------- */
//   // Map Loading Guard: Don't render if stations are empty or invalid
//   if (!stations || stations.length === 0) {
//     return (
//       <div className="w-full h-full flex items-center justify-center bg-[#F4FFF8] rounded-2xl">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-[#F4FFF8] rounded-full flex items-center justify-center mb-4 mx-auto">
//             <div className="w-8 h-8 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
//           </div>
//           <p className="text-gray-500 text-sm">Loading map...</p>
//         </div>
//       </div>
//     );
//   }

//   const getSafeCenter = (): [number, number] => {
//     if (!userLocation) return [...DEFAULT_MAP_CENTER];
//     const lat = toNum(userLocation.lat);
//     const lng = toNum(userLocation.lng);
//     if (isValidLatLng(lat, lng)) return [lat, lng];
//     return [...DEFAULT_MAP_CENTER];
//   };

//   /* -------------------- USER ICON -------------------- */
//   const userIcon = L.divIcon({
//     className: '',
//     html: `
//       <div style="
//         width:20px;
//         height:20px;
//         background:${COLORS.secondary};
//         border-radius:50%;
//         border:3px solid white;
//         box-shadow:0 0 15px ${COLORS.secondary};
//       "></div>
//     `,
//     iconSize: [20, 20],
//     iconAnchor: [10, 10]
//   });

//   return (
//     <div
//       className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl"
//       style={{ minHeight: '400px' }}
//     >
//       <MapContainer
//         center={getSafeCenter()}
//         zoom={13}
//         scrollWheelZoom={true}
//         zoomControl={false}
//         style={{ height: '100%', width: '100%' }}
//       >
//         {/* FREE & CLEAN MAP STYLE */}
//         <TileLayer
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//         />

//         {/* Floating Zoom Controls */}
//         <ZoomControl position="bottomright" />

//         <MapController
//           activeChargerId={activeChargerId}
//           userLocation={userLocation}
//           stations={stations}
//         />

//         {/* USER LOCATION */}
//         {(() => {
//           const uLat = toNum(userLocation?.lat);
//           const uLng = toNum(userLocation?.lng);
//           if (isNaN(uLat) || isNaN(uLng) || uLat === 0 || uLng === 0) return null;
//           return (
//           <Marker position={[uLat, uLng]} icon={userIcon}>
//             <Popup>
//               <div style={{ textAlign: 'center', fontWeight: 600 }}>
//                 📍 You are here
//               </div>
//             </Popup>
//           </Marker>
//           );
//         })()}

//         {/* STATIONS */}
//         {stations.filter(charger => {
//           const lat = toNum(charger.lat);
//           const lng = toNum(charger.lng);
//           return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
//         }).map(charger => {
//           const lat = toNum(charger.lat);
//           const lng = toNum(charger.lng);
//           if (isNaN(lat) || isNaN(lng)) return null;
//           const isActive = activeChargerId === charger.id.toString();

//           const icon = L.divIcon({
//             html: customMarkerHtml(
//               charger.powerKW || 60,
//               (charger.status || 'AVAILABLE') === 'AVAILABLE',
//               isActive
//             ),
//             className: '',
//             iconSize: [90, 40],
//             iconAnchor: [45, 40]
//           });

//           return (
//             <Marker
//               key={charger.id}
//               position={[lat, lng]}
//               icon={icon}
//               eventHandlers={{
//                 mouseover: (e) => {
//                   // Open popup on hover
//                   e.target.openPopup();
//                 },
//                 mouseout: (e) => {
//                   // Close popup on mouse out
//                   e.target.closePopup();
//                 },
//                 click: () =>
//                   onMarkerClick(charger.id.toString())
//               }}
//             >
//               <Popup
//                 autoPan={false}
//                 closeOnClick={false}
//                 closeButton={false}
//               >
//                 <div
//                   style={{
//                     minWidth: 280,
//                     backdropFilter: 'blur(20px)',
//                     borderRadius: 16,
//                     padding: 0,
//                     overflow: 'hidden'
//                   }}
//                 >
//                   {/* Header with status */}
//                   <div
//                     style={{
//                       background: charger.status === 'AVAILABLE' ? COLORS.primary : '#6B7280',
//                       padding: '12px 16px',
//                       borderTopLeftRadius: 16
//                     }}
//                   >
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                       <h4
//                         style={{
//                           fontWeight: 700,
//                           fontSize: 16,
//                           margin: 0,
//                           color: 'white'
//                         }}
//                       >
//                         {charger.name}
//                       </h4>
//                       <div
//                         style={{
//                           background: 'rgba(255, 255, 255, 0.2)',
//                           padding: '4px 8px',
//                           borderRadius: 20,
//                           fontSize: 10,
//                           fontWeight: 600,
//                           color: 'white'
//                         }}
//                       >
//                         {charger.status === 'AVAILABLE' ? '✓ Available' : '⚠ Busy'}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Content Section */}
//                   <div style={{ padding: '16px' }}>
//                     {/* Location */}
//                     <div style={{ marginBottom: '12px' }}>
//                       <div style={{ 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         color: '#666', 
//                         fontSize: 12, 
//                         marginBottom: '4px',
//                         fontWeight: 500
//                       }}>
//                         📍 {charger.address}
//                       </div>
//                       <div style={{ 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         color: '#999', 
//                         fontSize: 11 
//                       }}>
//                         <span style={{ marginRight: '4px' }}>•</span>
//                         {charger.locality}
//                       </div>
//                     </div>

//                     {/* Timing Information */}
//                     <div style={{ 
//                       marginBottom: '12px',
//                       padding: '8px 12px',
//                       background: '#f8f9fa',
//                       borderRadius: 8,
//                       border: '1px solid #e9ecef'
//                     }}>
//                       <div style={{ 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         marginBottom: '4px',
//                         fontSize: 10,
//                         color: '#666',
//                         textTransform: 'uppercase',
//                         letterSpacing: '0.5px',
//                         fontWeight: 600
//                       }}>
//                         🕐 Operating Hours
//                       </div>
//                       <div style={{ 
//                         fontSize: 13, 
//                         fontWeight: 600, 
//                         color: COLORS.dark,
//                         marginBottom: '2px'
//                       }}>
//                         {charger.opening_time || '09:00'} - {charger.closing_time || '21:00'}
//                       </div>
//                       <div style={{ 
//                         fontSize: 11, 
//                         color: charger.is_24x7 ? COLORS.primary : '#666',
//                         fontWeight: 500
//                       }}>
//                         {charger.is_24x7 ? '🟢 Open 24/7' : getCurrentStatus(charger.opening_time, charger.closing_time)}
//                       </div>
//                     </div>

//                     {/* Charging Info */}
//                     <div style={{ 
//                       display: 'flex', 
//                       justifyContent: 'space-between', 
//                       marginBottom: '12px',
//                       padding: '8px 0',
//                       borderTop: '1px solid #f0f0f0',
//                       borderBottom: '1px solid #f0f0f0'
//                     }}>
//                       <div>
//                         <div style={{ 
//                           fontSize: 10, 
//                           color: '#666', 
//                           marginBottom: '2px',
//                           textTransform: 'uppercase',
//                           letterSpacing: '0.5px'
//                         }}>
//                           Power
//                         </div>
//                         <div style={{ 
//                           fontSize: 18, 
//                           fontWeight: 700, 
//                           color: COLORS.primary 
//                         }}>
//                           ⚡ {charger.powerKW || 60}KW
//                         </div>
//                       </div>
//                       <div style={{ textAlign: 'right' }}>
//                         <div style={{ 
//                           fontSize: 10, 
//                           color: '#666', 
//                           marginBottom: '2px',
//                           textTransform: 'uppercase',
//                           letterSpacing: '0.5px'
//                         }}>
//                           Chargers
//                         </div>
//                         <div style={{ 
//                           fontSize: 18, 
//                           fontWeight: 700, 
//                           color: COLORS.dark 
//                         }}>
//                           {charger.total_chargers || 1}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Rating */}
//                     {(charger.overall_rating || charger.reviews_avg_rating) && (
//                       <div style={{ 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         marginBottom: '12px',
//                         padding: '8px 12px',
//                         background: '#f8f9fa',
//                         borderRadius: 8
//                       }}>
//                         <span style={{ 
//                           fontSize: 24, 
//                           fontWeight: 700, 
//                           color: '#fbbf24',
//                           marginRight: '8px'
//                         }}>
//                           ★
//                         </span>
//                         <span style={{ 
//                           fontSize: 16, 
//                           fontWeight: 600, 
//                           color: COLORS.dark 
//                         }}>
//                           {Number(charger.overall_rating || charger.reviews_avg_rating || 4.5).toFixed(1)}
//                         </span>
//                       </div>
//                     )}

//                     {/* Action Button */}
//                     <button
//                       onClick={() => onMarkerClick(charger.id.toString())}
//                       style={{
//                         width: '100%',
//                         background: COLORS.primary,
//                         color: 'white',
//                         border: 'none',
//                         padding: '12px',
//                         borderRadius: 8,
//                         fontWeight: 600,
//                         fontSize: 14,
//                         cursor: 'pointer',
//                         transition: 'all 0.2s ease'
//                       }}
//                       onMouseOver={(e) => {
//                         e.currentTarget.style.background = '#17a045';
//                       }}
//                       onMouseOut={(e) => {
//                         e.currentTarget.style.background = COLORS.primary;
//                       }}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </Popup>
//             </Marker>
//           );
//         }).filter(Boolean)}
//       </MapContainer>
//     </div>
//   );
// };

// export default HyderabadMap;
