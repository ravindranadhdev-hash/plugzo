import axios from 'axios';

const API_BASE = "https://darkgray-butterfly-916686.hostingersite.com/api/v1/customer";

export const StationService = {
  // Fetch all stations for list/map
  getStations: async (params = {}) => {
    const response = await axios.get(`${API_BASE}/stations`, { params });
    // Laravel typically returns { status: true, data: { data: [...] } }
    return response.data;
  },

  // Fetch GMB-style details for a specific station
  getStationDetails: async (id: number) => {
    const response = await axios.get(`${API_BASE}/stations/${id}`);
    // This returns the full JSON: { status: true, message: "...", data: { id: 8, ... } }
    return response.data;
  }
};