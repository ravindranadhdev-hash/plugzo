
export interface StationMedia {
  id: number;
  station_id: number;
  file_path: string;
  type: 'primary' | 'exterior' | 'plug' | 'interior';
  alt_text?: string;
  created_at: string;
  updated_at: string;
}

export interface ChargerType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface VoltageLevel {
  id: number;
  voltage: string;
  created_at: string;
  updated_at: string;
}

export interface Charger {
  id: number;
  station_id: number;
  charger_type_id: number;
  voltage_level_id: number;
  power_kw: number;
  is_active: number; // 0 or 1
  created_at: string;
  updated_at: string;
  charger_type: ChargerType;
  voltage_level: VoltageLevel;
}

export interface Vendor {
  id: number;
  user_id: number;
  business_name: string;
  business_type: string;
  gst_no: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface RatingBreakdown {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export interface Station {
  id: number;
  vendor_id: number;
  name: string;
  address: string;
  locality: string;
  lat: string; // API returns string, convert to number
  lng: string; // API returns string, convert to number
  phone?: string;
  about?: string;
  is_active: number; // 0 or 1
  total_chargers: number;
  created_at: string;
  updated_at: string;
  reviews_avg_rating?: number | null;
  
  // Nested objects
  vendor: Vendor;
  media: StationMedia[];
  reviews: any[]; // Define based on actual review structure
  chargers: Charger[];
  
  // Computed fields (not from API)
  distance_km?: number | null;
  eta_minutes?: number | null;
  overall_rating?: number; // Computed from reviews_avg_rating
  rating_breakdown?: RatingBreakdown; // May need separate API call
  status?: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE'; // Computed from is_active
  powerKW?: number; // Max power from chargers array
}

export interface StationResponse {
  status: boolean;
  message: string;
  data: {
    data: Station[];
    current_page: number;
    per_page: number;
    total: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url?: string;
    prev_page_url?: string;
    from: number;
    to: number;
    last_page: number;
    path: string;
    links: Array<{
      url?: string;
      label: string;
      active: boolean;
    }>;
  };
}

export interface Vehicle {
  id: string;
  model: string;
  brand: string;
  range: number;
  topSpeed: number;
  batteryTech: string;
  image: string;
  showroom_avail: string[];
  price: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  content: string;
}
