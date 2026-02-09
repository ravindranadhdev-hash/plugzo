export const mapApiToStation = (apiData: any) => ({
  id: apiData?.id || 0,
  name: apiData?.name || apiData?.station_name || 'Unnamed Station',
  address: apiData?.address || 'Address not available',
  locality: apiData?.locality || 'Hyderabad',
  lat: parseFloat(apiData?.lat) || 17.4483,
  lng: parseFloat(apiData?.lng) || 78.3489,
  power: apiData?.chargers?.[0]?.power_kw || apiData?.powerKW || apiData?.power_kw || '60',
  status: apiData?.status || (apiData?.is_active ? 'Available' : 'In-Use'),
  media: Array.isArray(apiData?.media) ? apiData.media : [],
  reviews: Array.isArray(apiData?.reviews) ? apiData.reviews : [],
  overall_rating: parseFloat(apiData?.overall_rating) || 0,
});