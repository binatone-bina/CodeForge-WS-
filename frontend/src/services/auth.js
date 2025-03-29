import api from './api'

export const register = async (userData) => {
  const response = await api.post('/users/register', userData)
  return response.data
}

export const login = async (email, password) => {
  const response = await api.post('/users/login', { email, password })
  return response.data
}

export const getProfile = async (userId) => {
  const response = await api.get(`/users/${userId}`)
  return response.data
}

export const updateProfile = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData)
  return response.data
}

export const updateEmergencyContacts = async (userId, contacts) => {
  const response = await api.put(`/users/${userId}/emergency-contacts`, { emergencyContacts: contacts })
  return response.data
}

export const sendSOS = async (userId, location) => {
  const response = await api.post(`/users/${userId}/sos`, { location })
  return response.data
}
// Update user location in database
export const updateLocationInDB = async (userId, lat, lng) => {
  try {
    const response = await api.post(`/users/${userId}/update-location`, {
      latitude: lat,
      longitude: lng
    });
    return response.data;
  } catch (error) {
    console.error('Error updating location in database:', error);
    throw error;
  }
};

// Get user's stored location from database
export const getStoredLocation = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/location`);
    if (response.data.success && response.data.location) {
      return {
        lat: response.data.location.latitude,
        lng: response.data.location.longitude,
        lastUpdated: response.data.location.lastUpdated
      };
    }
    throw new Error('Location not found in database');
  } catch (error) {
    console.error('Error fetching stored location:', error);
    throw error;
  }
};