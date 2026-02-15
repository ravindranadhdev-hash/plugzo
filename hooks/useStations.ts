import { useState, useEffect, useCallback, useRef } from 'react';
import { Station } from '../types';
import { StationService } from '../services/StationService';

// Extended interface for stations with distance
interface StationWithDistance extends Omit<Station, 'lat' | 'lng'> {
  lat: number; // Override to be number instead of string
  lng: number; // Override to be number instead of string
  distance_km?: number;
}

// Helper function to calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
};


export const useStations = (initialParams: { lat?: number; lng?: number; search?: string; radius?: number; isRoot?: boolean } = {}) => {
  const [stations, setStations] = useState<StationWithDistance[]>([]);
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

      const transformed: StationWithDistance[] = (Array.isArray(rawList) ? rawList : []).map((s: any) => ({
        ...s,
        // Standardize coordinate parsing - ensure they are valid numbers
        lat: parseFloat(s.lat.toString()) || 17.3850, // Default to Hyderabad center
        lng: parseFloat(s.lng.toString()) || 78.4867, // Default to Hyderabad center
        status: s.status || 'AVAILABLE',
        powerKW: s.powerKW || 60,
        overall_rating: Number(s.overall_rating ?? 0),
        rating_breakdown: s.rating_breakdown ?? { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
      }));

      // Calculate distance and sort by distance if user location is available
      let stationsWithDistance = transformed;
      if (params.lat && params.lng) {
        stationsWithDistance = transformed.map(station => ({
          ...station,
          distance_km: calculateDistance(params.lat, params.lng, station.lat, station.lng)
        }));
        
        // Sort by distance (nearest first)
        stationsWithDistance.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));
      }

      // If API returns empty data, use fallback stations
      if (stationsWithDistance.length === 0) {
        const fallbackStations: StationWithDistance[] = [
          {
            id: 1,
            vendor_id: 1,
            name: "Gachibowli Elite Hub",
            address: "Gachibowli, Hyderabad",
            locality: "Gachibowli",
            lat: 17.4456,
            lng: 78.3768,
            is_active: 1,
            total_chargers: 4,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
            status: "AVAILABLE",
            powerKW: 60,
            overall_rating: 4.5,
            rating_breakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
            vendor: {} as any,
            media: [],
            reviews: [],
            chargers: []
          },
          {
            id: 2,
            vendor_id: 1,
            name: "HITEC City Central",
            address: "HITEC City, Hyderabad",
            locality: "HITEC City",
            lat: 17.4475,
            lng: 78.3786,
            is_active: 1,
            total_chargers: 6,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
            status: "AVAILABLE",
            powerKW: 60,
            overall_rating: 4.3,
            rating_breakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
            vendor: {} as any,
            media: [],
            reviews: [],
            chargers: []
          }
        ];
        
        // Add distance to fallback stations if user location is available
        let fallbacksWithDistance = fallbackStations;
        if (params.lat && params.lng) {
          fallbacksWithDistance = fallbackStations.map(station => ({
            ...station,
            distance_km: calculateDistance(params.lat, params.lng, station.lat, station.lng)
          }));
          fallbacksWithDistance.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));
        }
        
        setStations(fallbacksWithDistance);
      } else {
        setStations(stationsWithDistance);
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
      const fallbackStations: StationWithDistance[] = [
        {
          id: 1,
          vendor_id: 1,
          name: "Gachibowli Elite Hub",
          address: "Gachibowli, Hyderabad",
          locality: "Gachibowli",
          lat: 17.4456,
          lng: 78.3768,
          is_active: 1,
          total_chargers: 4,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
          status: "AVAILABLE",
          powerKW: 60,
          overall_rating: 4.5,
          rating_breakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
          vendor: {} as any,
          media: [],
          reviews: [],
          chargers: []
        },
        {
          id: 2,
          vendor_id: 1,
          name: "HITEC City Central",
          address: "HITEC City, Hyderabad", 
          locality: "HITEC City",
          lat: 17.4475,
          lng: 78.3786,
          is_active: 1,
          total_chargers: 6,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
          status: "AVAILABLE",
          powerKW: 60,
          overall_rating: 4.3,
          rating_breakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
          vendor: {} as any,
          media: [],
          reviews: [],
          chargers: []
        }
      ];
      
      // Add distance to fallback stations if user location is available
      let fallbacksWithDistance = fallbackStations;
      if (params.lat && params.lng) {
        fallbacksWithDistance = fallbackStations.map(station => ({
          ...station,
          distance_km: calculateDistance(params.lat, params.lng, station.lat, station.lng)
        }));
        fallbacksWithDistance.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));
      }
      
      setStations(fallbacksWithDistance);
    } finally {
      setLoading(false);
    }
  }, [stations.length]);

  useEffect(() => {
    fetchStations(initialParams);
  }, [initialParams, fetchStations]);

  return { stations, loading, error, isNearbyView, refresh: fetchStations };
};