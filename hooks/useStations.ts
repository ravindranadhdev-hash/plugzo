import { useState, useEffect, useCallback, useRef } from 'react';
import { Station } from '../types';
import { StationService } from '../services/StationService';


export const useStations = (initialParams: { lat?: number; lng?: number; search?: string; radius?: number; isRoot?: boolean } = {}) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isNearbyView, setIsNearbyView] = useState<boolean>(false);
  
  const lastParamsRef = useRef<string>('');
  const locationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchStations = useCallback(async (params: any) => {
    const paramString = JSON.stringify(params);
    if (paramString === lastParamsRef.current && stations.length > 0) return;
    
    // Mobile sorting guard: If we're at root and waiting for location, set a timeout
    if (params.isRoot && params.lat && params.lng) {
      locationTimeoutRef.current = setTimeout(() => {
        setLoading(false); // Stop loading after 2.5 seconds even if GPS hasn't responded
      }, 2500);
    }
    
    setLoading(true);
    try {
      const result = await StationService.getStations(params);
      
      // Clear timeout if we got a successful response
      if (locationTimeoutRef.current) {
        clearTimeout(locationTimeoutRef.current);
        locationTimeoutRef.current = null;
      }

      // Support both { data: [...] } and { data: { data: [...] } } API shapes
      const rawList = Array.isArray(result?.data)
        ? result.data
        : (result?.data?.data ?? []);

      const transformed = (Array.isArray(rawList) ? rawList : []).map((s: any) => ({
        ...s,
        // Standardize coordinate parsing - ensure they are valid numbers
        lat: parseFloat(s.lat.toString()) || 17.3850, // Default to Hyderabad center
        lng: parseFloat(s.lng.toString()) || 78.4867, // Default to Hyderabad center
        status: s.status || 'AVAILABLE',
        powerKW: s.powerKW || 60,
        overall_rating: Number(s.overall_rating ?? 0),
        rating_breakdown: s.rating_breakdown ?? { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
      }));

      // If API returns empty data, use fallback stations
      if (transformed.length === 0) {
        const fallbackStations = [
          {
            id: 1,
            name: "Gachibowli Elite Hub",
            address: "Gachibowli, Hyderabad",
            lat: 17.4456,
            lng: 78.3768,
            status: "AVAILABLE",
            powerKW: 60,
            overall_rating: 4.5,
            rating_breakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
          },
          {
            id: 2,
            name: "HITEC City Central",
            address: "HITEC City, Hyderabad", 
            lat: 17.4475,
            lng: 78.3786,
            status: "AVAILABLE",
            powerKW: 60,
            overall_rating: 4.3,
            rating_breakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
          }
        ];
        setStations(fallbackStations);
      } else {
        setStations(transformed);
      }
      setIsNearbyView(!!(params.lat && params.lng));
      setError(null);
      lastParamsRef.current = paramString;
    } catch (err) {
      // Clear timeout on error
      if (locationTimeoutRef.current) {
        clearTimeout(locationTimeoutRef.current);
        locationTimeoutRef.current = null;
      }
      
      setError("Failed to load NearVolt charging network.");
      console.error(err);
      
      // Fallback to default stations on error
      const fallbackStations = [
        {
          id: 1,
          name: "Gachibowli Elite Hub",
          address: "Gachibowli, Hyderabad",
          lat: 17.4456,
          lng: 78.3768,
          status: "AVAILABLE",
          powerKW: 60,
          overall_rating: 4.5,
          rating_breakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
        },
        {
          id: 2,
          name: "HITEC City Central",
          address: "HITEC City, Hyderabad", 
          lat: 17.4475,
          lng: 78.3786,
          status: "AVAILABLE",
          powerKW: 60,
          overall_rating: 4.3,
          rating_breakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
        }
      ];
      
      setStations(fallbackStations);
    } finally {
      setLoading(false);
    }
  }, [stations.length]);

  useEffect(() => {
    fetchStations(initialParams);
  }, [initialParams, fetchStations]);

  return { stations, loading, error, isNearbyView, refresh: fetchStations };
};