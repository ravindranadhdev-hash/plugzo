import { useState, useEffect } from 'react';

export const useUserLocation = () => {
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [error, setError] = useState<boolean>(false);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setError(false);
          localStorage.setItem('nearvolt_location_requested', 'true');
        },
        (err) => {
          console.error("User denied location access", err);
          setError(true);
          localStorage.setItem('nearvolt_location_requested', 'true');
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError(true);
    }
  };

  return { coords, error, requestLocation };
};