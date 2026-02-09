import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Station } from '../../types';
import { COLORS } from '../../constants';
import { redirectToGoogleMaps } from '../../utils/navigation';

interface HyderabadMapProps {
  activeChargerId?: string;
  userLocation?: { lat: number, lng: number } | null;
  stations: Station[];
  onMarkerClick: (id: string) => void;
}

const MapController = ({ 
  activeChargerId, 
  userLocation,
  stations
}: { 
  activeChargerId?: string;
  userLocation?: { lat: number, lng: number } | null;
  stations: Station[];
}) => {
  const map = useMap();
  
  useEffect(() => {
    // Invalidate size on first render
    map.invalidateSize();
    
    /**
     * FLY-TO DISABLED TEMPORARILY
     * To prevent potential map crashes during rapid state updates.
     */
    /*
    if (activeChargerId && map) {
      const charger = stations.find(c => c.id.toString() === activeChargerId.toString());
      if (charger) {
        map.flyTo([charger.lat, charger.lng], 15, {
          duration: 2,
          easeLinearity: 0.25
        });
      }
    } else if (userLocation && map) {
      map.flyTo([userLocation.lat, userLocation.lng], 14, {
        duration: 2
      });
    }
    */
  }, [activeChargerId, userLocation, map, stations]);

  return null;
};

const customMarkerHtml = (power: number, isAvailable: boolean, isActive: boolean) => `
  <div class="relative flex flex-col items-center group ${isActive ? 'scale-125 z-[1000]' : 'z-10'} transition-transform duration-300">
    <div class="flex items-center gap-1.5 bg-white border-2 px-3 py-1 rounded-full shadow-lg whitespace-nowrap" style="border-color: ${COLORS.primary}">
      <span class="text-[11px] font-black" style="color: ${COLORS.dark}">${power} kW</span>
      ${isAvailable ? `<span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style="background-color: ${COLORS.primary}"></span>
        <span class="relative inline-flex rounded-full h-2 w-2" style="background-color: ${COLORS.primary}"></span>
      </span>` : ''}
    </div>
    <div class="w-3 h-2 clip-triangle -mt-[1px]" style="background-color: ${COLORS.primary}"></div>
  </div>
`;

const HyderabadMap: React.FC<HyderabadMapProps> = ({ activeChargerId, userLocation, stations, onMarkerClick }) => {
  const userIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="user-marker-pulse"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <div className="w-full h-full relative" style={{ minHeight: '300px' }}>
      <MapContainer 
        center={[17.4483, 78.3489]} 
        zoom={13} 
        scrollWheelZoom={true}
        className="leaflet-container"
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController activeChargerId={activeChargerId} userLocation={userLocation} stations={stations} />

        {/* User Location Marker */}
        {userLocation && (
          <Marker 
            position={[userLocation.lat, userLocation.lng]} 
            icon={userIcon}
            zIndexOffset={1000}
          >
            <Popup className="nearvolt-popup">
              <div className="p-1 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: COLORS.secondary }}>You are here</p>
              </div>
            </Popup>
          </Marker>
        )}

        {stations.map((charger) => {
          const isActive = activeChargerId === charger.id.toString();
          const icon = L.divIcon({
            html: customMarkerHtml(charger.powerKW || 60, (charger.status || 'AVAILABLE') === 'AVAILABLE', isActive),
            className: 'custom-div-icon',
            iconSize: [80, 40],
            iconAnchor: [40, 40],
          });

          return (
            <Marker 
              key={charger.id} 
              position={[charger.lat, charger.lng]} 
              icon={icon}
              eventHandlers={{
                click: () => onMarkerClick(charger.id.toString()),
              }}
            >
              <Popup className="nearvolt-popup">
                 <div className="p-2 min-w-[160px]">
                   <h4 className="font-extrabold text-[#0F3D2E] text-sm mb-1">{charger.name}</h4>
                   <p className="text-[10px] text-gray-400 mb-3 leading-tight">{charger.locality}</p>
                   <button 
                     onClick={() => redirectToGoogleMaps(charger.lat, charger.lng)}
                     className="w-full text-white text-[11px] font-bold py-2.5 rounded-xl uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                     style={{ backgroundColor: COLORS.primary }}
                   >
                      Navigate Now
                   </button>
                 </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default HyderabadMap;