import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { Station } from '../../types';
import { COLORS } from '../../constants';
import { redirectToGoogleMaps } from '../../utils/navigation';

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

/* -------------------- MAP CONTROLLER -------------------- */
const MapController = ({
  activeChargerId,
  userLocation,
  stations
}: {
  activeChargerId?: string;
  userLocation?: { lat: number; lng: number } | null;
  stations: Station[];
}) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();

    let target: [number, number] | null = null;
    let zoom = 13;

    if (activeChargerId) {
      const charger = stations.find(
        c => c.id.toString() === activeChargerId.toString()
      );
      if (charger) {
        const lat = toNum(charger.lat);
        const lng = toNum(charger.lng);
        if (isValidLatLng(lat, lng)) {
          target = [lat, lng];
          zoom = 15;
        }
      }
    } else if (userLocation) {
      const lat = toNum(userLocation.lat);
      const lng = toNum(userLocation.lng);
      if (isValidLatLng(lat, lng)) {
        target = [lat, lng];
        zoom = 14;
      }
    }

    if (!target) return;

    try {
      map.flyTo(target, zoom, { duration: 1.2 });
    } catch {
      map.setView(DEFAULT_MAP_CENTER, zoom);
    }
  }, [activeChargerId, userLocation, map, stations]);

  return null;
};

/* -------------------- MODERN MARKER -------------------- */
const customMarkerHtml = (
  power: number,
  isAvailable: boolean,
  isActive: boolean
) => `
  <div style="
    display:flex;
    flex-direction:column;
    align-items:center;
    transform:${isActive ? 'scale(1.2)' : 'scale(1)'};
    transition:0.3s;
  ">
    <div style="
      background:white;
      padding:6px 12px;
      border-radius:30px;
      box-shadow:0 6px 20px rgba(0,0,0,0.15);
      border:2px solid ${isAvailable ? COLORS.primary : '#ccc'};
      font-weight:700;
      font-size:12px;
      color:${COLORS.dark};
      display:flex;
      align-items:center;
      gap:6px;
    ">
      ⚡ ${power} kW
      ${
        isAvailable
          ? `<span style="
              width:8px;
              height:8px;
              background:${COLORS.primary};
              border-radius:50%;
              box-shadow:0 0 8px ${COLORS.primary};
            "></span>`
          : ''
      }
    </div>
    <div style="
      width:0;
      height:0;
      border-left:8px solid transparent;
      border-right:8px solid transparent;
      border-top:12px solid ${COLORS.primary};
      margin-top:-2px;
    "></div>
  </div>
`;

const HyderabadMap: React.FC<HyderabadMapProps> = ({
  activeChargerId,
  userLocation,
  stations,
  onMarkerClick
}) => {
  /* -------------------- MAP LOADING GUARD -------------------- */
  // Map Loading Guard: Don't render if stations are empty or invalid
  if (!stations || stations.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#F4FFF8] rounded-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F4FFF8] rounded-full flex items-center justify-center mb-4 mx-auto">
            <div className="w-8 h-8 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-500 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  const getSafeCenter = (): [number, number] => {
    if (!userLocation) return [...DEFAULT_MAP_CENTER];
    const lat = toNum(userLocation.lat);
    const lng = toNum(userLocation.lng);
    if (isValidLatLng(lat, lng)) return [lat, lng];
    return [...DEFAULT_MAP_CENTER];
  };

  /* -------------------- USER ICON -------------------- */
  const userIcon = L.divIcon({
    className: '',
    html: `
      <div style="
        width:20px;
        height:20px;
        background:${COLORS.secondary};
        border-radius:50%;
        border:3px solid white;
        box-shadow:0 0 15px ${COLORS.secondary};
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  return (
    <div
      className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl"
      style={{ minHeight: '400px' }}
    >
      <MapContainer
        center={getSafeCenter()}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        {/* FREE & CLEAN MAP STYLE */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Floating Zoom Controls */}
        <ZoomControl position="bottomright" />

        <MapController
          activeChargerId={activeChargerId}
          userLocation={userLocation}
          stations={stations}
        />

        {/* USER LOCATION */}
        {(() => {
          const uLat = toNum(userLocation?.lat);
          const uLng = toNum(userLocation?.lng);
          if (isNaN(uLat) || isNaN(uLng) || uLat === 0 || uLng === 0) return null;
          return (
          <Marker position={[uLat, uLng]} icon={userIcon}>
            <Popup>
              <div style={{ textAlign: 'center', fontWeight: 600 }}>
                📍 You are here
              </div>
            </Popup>
          </Marker>
          );
        })()}

        {/* STATIONS */}
        {stations.filter(charger => {
          const lat = toNum(charger.lat);
          const lng = toNum(charger.lng);
          return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
        }).map(charger => {
          const lat = toNum(charger.lat);
          const lng = toNum(charger.lng);
          if (isNaN(lat) || isNaN(lng)) return null;
          const isActive = activeChargerId === charger.id.toString();

          const icon = L.divIcon({
            html: customMarkerHtml(
              charger.powerKW || 60,
              (charger.status || 'AVAILABLE') === 'AVAILABLE',
              isActive
            ),
            className: '',
            iconSize: [90, 40],
            iconAnchor: [45, 40]
          });

          return (
            <Marker
              key={charger.id}
              position={[lat, lng]}
              icon={icon}
              eventHandlers={{
                click: () =>
                  onMarkerClick(charger.id.toString())
              }}
            >
              <Popup>
                <div
                  style={{
                    minWidth: 180,
                    backdropFilter: 'blur(10px)',
                    borderRadius: 12
                  }}
                >
                  <h4
                    style={{
                      fontWeight: 800,
                      fontSize: 14,
                      marginBottom: 4,
                      color: COLORS.dark
                    }}
                  >
                    {charger.name}
                  </h4>

                  <p
                    style={{
                      fontSize: 11,
                      color: '#777',
                      marginBottom: 10
                    }}
                  >
                    {charger.locality}
                  </p>

                  <button
                    onClick={() =>
                      redirectToGoogleMaps(lat, lng)
                    }
                    style={{
                      width: '100%',
                      background: COLORS.primary,
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: 10,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Navigate Now
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        }).filter(Boolean)}
      </MapContainer>
    </div>
  );
};

export default HyderabadMap;
