/**
 * Redirects the user to Google Maps with the specified coordinates.
 * Uses Universal Deep Linking for native app support on mobile.
 */
export const redirectToGoogleMaps = (lat: number, lng: number) => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
  window.open(url, '_blank', 'noopener,noreferrer');
};