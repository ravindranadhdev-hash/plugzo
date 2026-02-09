/**
 * AdminService handles the interaction with the Plugzo Admin API.
 * Specifically designed to handle Multi-part Form Data for Station Onboarding.
 */

export const StationOnboarding = async (formData: any, token: string) => {
  const data = new FormData();

  // 1. Identity & Location Meta
  data.append('vendor_id', formData.vendor_id || '1');
  data.append('name', formData.name);
  data.append('address', formData.address);
  data.append('locality', formData.locality);
  data.append('lat', formData.lat.toString());
  data.append('lng', formData.lng.toString());
  data.append('is_active', '1');
  data.append('phone', formData.phone || '');
  data.append('about', formData.about || '');

  // 2. Nested Chargers Logic (Mapping to Laravel Array Validation)
  formData.chargers.forEach((charger: any, index: number) => {
    data.append(`chargers[${index}][charger_type_id]`, charger.type_id || '1');
    data.append(`chargers[${index}][voltage_level_id]`, charger.voltage_id || '1');
    data.append(`chargers[${index}][power_kw]`, charger.power || '60');
    data.append(`chargers[${index}][is_active]`, '1');
  });

  // 3. Media Logic (Mapping Files with Type Metadata)
  formData.images.forEach((img: any, index: number) => {
    if (img.file) {
      data.append(`media[${index}][file]`, img.file); 
      data.append(`media[${index}][type]`, img.type); // 'primary', 'entrance', 'exterior', 'plug'
    }
  });

  const response = await fetch('https://darkgray-butterfly-916686.hostingersite.com/api/v1/admin/stations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
    body: data,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Grid Synchronization Failed.');
  }

  return response.json();
};