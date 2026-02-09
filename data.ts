
import { Station, Vehicle, BlogPost } from './types';

// Updated CHARGERS to use Station interface and match the required properties
export const CHARGERS: Station[] = [
  {
    id: 1,
    name: 'Tata Power EZ Charge - Gachibowli',
    overall_rating: 4.8,
    distance_km: 1.2,
    eta_minutes: 8,
    media: [{ id: 1, type: 'primary', file_path: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800' }],
    address: 'DLF Cyber City, Phase 2, Gachibowli, Hyderabad',
    locality: 'Gachibowli',
    status: 'AVAILABLE',
    lat: 17.4450,
    lng: 78.3490,
    powerKW: 60,
    rating_breakdown: { "1": 0, "2": 2, "3": 8, "4": 20, "5": 70 }
  },
  {
    id: 2,
    name: 'Statiq Charging Station - Jubilee Hills',
    overall_rating: 4.5,
    distance_km: 3.5,
    eta_minutes: 15,
    media: [{ id: 2, type: 'primary', file_path: 'https://images.unsplash.com/photo-1620218175919-f308822f36a9?auto=format&fit=crop&q=80&w=800' }],
    address: 'Road No. 36, Near Metro Station, Jubilee Hills',
    locality: 'Jubilee Hills',
    status: 'AVAILABLE',
    lat: 17.4350,
    lng: 78.4050,
    powerKW: 120,
    rating_breakdown: { "1": 1, "2": 4, "3": 12, "4": 25, "5": 58 }
  },
  {
    id: 3,
    name: 'Zeon Charging - HITEC City',
    overall_rating: 4.9,
    distance_km: 0.8,
    eta_minutes: 4,
    media: [{ id: 3, type: 'primary', file_path: 'https://images.unsplash.com/photo-1647416348421-50e56598375e?auto=format&fit=crop&q=80&w=800' }],
    address: 'Inorbit Mall Basement, Madhapur, HITEC City',
    locality: 'HITEC City',
    status: 'OCCUPIED',
    lat: 17.4340,
    lng: 78.3860,
    powerKW: 50,
    rating_breakdown: { "1": 0, "2": 1, "3": 5, "4": 10, "5": 84 }
  },
  {
    id: 4,
    name: 'Fortum Charge & Drive - Banjara Hills',
    overall_rating: 4.2,
    distance_km: 5.1,
    eta_minutes: 22,
    media: [{ id: 4, type: 'primary', file_path: 'https://images.unsplash.com/photo-1632823467900-51179727407a?auto=format&fit=crop&q=80&w=800' }],
    address: 'GVK One Mall, Road No. 1, Banjara Hills',
    locality: 'Banjara Hills',
    status: 'AVAILABLE',
    lat: 17.4190,
    lng: 78.4480,
    powerKW: 22,
    rating_breakdown: { "1": 3, "2": 7, "3": 20, "4": 30, "5": 40 }
  }
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    model: 'Tesla Model 3 Performance 2026',
    brand: 'Tesla',
    range: 620,
    topSpeed: 261,
    batteryTech: 'Next-Gen LFP High Density',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1200',
    showroom_avail: ['Gachibowli', 'Financial District'],
    price: '₹ 72,00,000'
  },
  {
    id: 'v2',
    model: 'Audi e-tron GT RS+',
    brand: 'Audi',
    range: 580,
    topSpeed: 250,
    batteryTech: '800V Ultra-Fast Charging',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1200',
    showroom_avail: ['Jubilee Hills', 'Banjara Hills'],
    price: '₹ 1,80,00,000'
  },
  {
    id: 'v3',
    model: 'Hyundai IONIQ 6 N-Line',
    brand: 'Hyundai',
    range: 515,
    topSpeed: 210,
    batteryTech: 'E-GMP Dedicated Platform',
    image: 'https://images.unsplash.com/photo-1653303102450-4d402b88126b?auto=format&fit=crop&q=80&w=1200',
    showroom_avail: ['Kondapur', 'Secunderabad'],
    price: '₹ 55,00,000'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How Hyderabad is Leading the EV Infrastructure Boom',
    category: 'City Insights',
    readTime: '5 Min Read',
    image: 'https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&q=80&w=800',
    content: 'Hyderabad has seen a 300% growth in public charging stations over the last 18 months...'
  },
  {
    id: 'b2',
    title: 'Top 5 EV Road Trips from Hyderabad You Must Take',
    category: 'Lifestyle',
    readTime: '8 Min Read',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    content: 'From Srisailam to Ananthagiri Hills, we map out the perfect EV-friendly weekend getaways...'
  },
  {
    id: 'b3',
    title: 'The Future of Solid State Batteries in 2026',
    category: 'Tech Intel',
    readTime: '6 Min Read',
    image: 'https://images.unsplash.com/photo-1548333341-97d4160ee44a?auto=format&fit=crop&q=80&w=800',
    content: 'Why the next generation of EV batteries will double the range of your current vehicle...'
  }
];
