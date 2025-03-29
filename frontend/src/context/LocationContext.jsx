import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { updateLocationInDB } from '../services/auth'; // Import your API function

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permissionState, setPermissionState] = useState('prompt'); // 'granted', 'denied', or 'prompt'
  const timeoutRef = useRef(null);
  const { user } = useAuth(); 

  useEffect(() => {
    // Fallback function to use if geolocation fails
    const setFallbackLocation = (errorMessage) => {
      // ^^^ Renamed from useFallbackLocation to setFallbackLocation
      console.log(`Using fallback location. Reason: ${errorMessage}`);
      setError(errorMessage);
      setCurrentLocation({
        lat: 40.7128, // New York City coordinates as fallback
        lng: -74.0060,
        isFallback: true // Flag to indicate this is not the user's real location
      });
      setLoading(false);
    };

    // Set a timeout in case geolocation permission dialog is ignored
    timeoutRef.current = setTimeout(() => {
      if (loading) {
        setFallbackLocation('Location request timed out. Using default location.');
      }
    }, 10000); // 10 seconds timeout

    // Check if permission was previously denied
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(result => {
          setPermissionState(result.state);
          
          // If already denied, use fallback immediately
          if (result.state === 'denied') {
            setFallbackLocation('Location permission denied. Using default location.');
            return;
          }
          
          // Listen for permission changes
          result.addEventListener('change', () => {
            setPermissionState(result.state);
          });
        });
    }

    // Only try to get location if we haven't determined it's denied
    if (navigator.geolocation && permissionState !== 'denied') {
      // Store the watch ID so we can clear it later
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          // Clear the timeout since we got a position
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            isFallback: false
          };
          
          setCurrentLocation(newLocation);
          setLoading(false);
          setError(null);
          // Save location to database if user is logged in
          if (user && user.userId) {
            updateLocationInDB(user.userId, newLocation.lat, newLocation.lng)
              .then(() => console.log('Location updated in database'))
              .catch(err => console.error('Failed to update location in DB:', err));
          }
        },
        (err) => {
          // Handle specific geolocation errors
          let errorMessage;
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = 'Location permission denied';
              break;
            case err.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case err.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
            default:
              errorMessage = `Error getting location: ${err.message}`;
          }
          setFallbackLocation(errorMessage);
        },
        { 
          enableHighAccuracy: true,
          maximumAge: 30000,       // Accept positions no older than 30 seconds
          timeout: 27000           // Time to wait for a position
        }
      );
      
      // Clean up by stopping location watching when component unmounts
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        navigator.geolocation.clearWatch(watchId);
      };
    } else if (permissionState !== 'denied') {
      // Browser doesn't support geolocation
      setFallbackLocation('Geolocation is not supported by this browser');
    }
  }, [permissionState, loading, user]);

  const value = {
    currentLocation,
    loading,
    error,
    permissionState,
    isFallbackLocation: currentLocation?.isFallback || false
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

export default LocationContext;