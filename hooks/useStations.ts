import { useState, useEffect, useCallback, useRef } from 'react';
import { Station } from '../types';
import { StationService } from '../services/stationService';


export const useStations = (initialParams: { lat?: number; lng?: number; search?: string; radius?: number } = {}) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isNearbyView, setIsNearbyView] = useState<boolean>(false);
  
  const lastParamsRef = useRef<string>('');

  const fetchStations = useCallback(async (params: any) => {
    const paramString = JSON.stringify(params);
    if (paramString === lastParamsRef.current && stations.length > 0) return;
    
    setLoading(true);
    try {
      const result = await StationService.getStations(params);
      
      const transformed = result.data.data.map(s => ({
        ...s,
        status: s.status || 'AVAILABLE',
        powerKW: s.powerKW || 60,
        overall_rating: Number(s.overall_rating ?? 0),
        rating_breakdown: s.rating_breakdown ?? { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
      }));

      setStations(transformed);
      setIsNearbyView(!!(params.lat && params.lng));
      setError(null);
      lastParamsRef.current = paramString;
    } catch (err) {
      setError("Failed to load NearVolt charging network.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [stations.length]);

  useEffect(() => {
    fetchStations(initialParams);
  }, [initialParams, fetchStations]);

  return { stations, loading, error, isNearbyView, refresh: fetchStations };
};