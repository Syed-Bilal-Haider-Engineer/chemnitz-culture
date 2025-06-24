import { useState } from 'react';
export const useLocation = () => {
  const [locationName, setLocationName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const fetchLocationName = async (lat: number, lng: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setLocationName(data.display_name);
      return data.display_name;
    } catch (err) {
      setError('Failed to fetch location name');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
 const getLocationNameFromLatLng = async (address:string) => {  
  try {
    const response = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=685aca2a6e153277629928wkdba20a8`);
    const data = await response.json();
    return data[0];
  } catch (error) {
     setError('Failed to fetch location name to cords');
  }
}

const getCurrentLocation = () => {
    return new Promise<{lat: number; lng: number}>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  return {
    locationName,
    isLoading,
    error,
    fetchLocationName,
    getCurrentLocation,
    getLocationNameFromLatLng
  };
};