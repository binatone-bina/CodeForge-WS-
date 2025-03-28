import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { decodePolyline } from '../../utils/polylineDecoder';
import { getNearbyReviews } from '../../services/forum';

const RouteDisplay = ({ route }) => {
  const map = useMap();
  const [routeLayer, setRouteLayer] = useState(null);
  const [reviewPoints, setReviewPoints] = useState([]);
  
  useEffect(() => {
    if (!route || !route.paths || route.paths.length === 0) return;
    
    // Clean up previous layers
    if (routeLayer) {
      if (Array.isArray(routeLayer)) {
        routeLayer.forEach(layer => map.removeLayer(layer));
      } else {
        map.removeLayer(routeLayer);
      }
    }
    
    try {
      const path = route.paths[0];
      const decodedPointsArray = decodePolyline(path.points);
      
      console.log('Points decoded from polyline:', decodedPointsArray.length);
      
      // The polyline decoder returns [lat, lng] arrays, not {lat, lng} objects
      // This is fine for the Leaflet polyline, but we need to convert for the review fetch
      
      // Create the polyline directly with the array format
      const polyline = L.polyline(decodedPointsArray, {
        color: '#0066ff',
        weight: 5,
        opacity: 0.8,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);
      
      // Fit the map to the route
      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
      
      setRouteLayer(polyline);
      
      // Get reviews along the route area
      const routeBounds = polyline.getBounds();
      const center = routeBounds.getCenter();
      
      // Calculate an appropriate radius that covers the route
      const northEast = routeBounds.getNorthEast();
      const southWest = routeBounds.getSouthWest();
      
      // Calculate distance from center to furthest corner
      const distanceInMeters = Math.max(
        center.distanceTo(L.latLng(northEast.lat, northEast.lng)),
        center.distanceTo(L.latLng(southWest.lat, southWest.lng))
      );
      
      // Add a buffer
      const searchRadius = Math.ceil(distanceInMeters) + 200; // meters
      
      console.log(`Searching reviews within ${searchRadius}m of route center: ${center.lat}, ${center.lng}`);
      
      // Fetch all reviews within the route's bounding area
      const fetchReviewsInArea = async () => {
        try {
          const reviews = await getNearbyReviews(
            center.lat,
            center.lng,
            searchRadius
          );
          
          console.log(`Found ${reviews.length} reviews near the route`);
          setReviewPoints(reviews);
          
        } catch (error) {
          console.error('Error fetching reviews near route:', error);
        }
      };
      
      fetchReviewsInArea();
      
      return () => {
        map.removeLayer(polyline);
      };
    } catch (error) {
      console.error('Error displaying route:', error);
    }
  }, [map, route]);
  
  // Display review points
  useEffect(() => {
    const markers = [];
    
    reviewPoints.forEach(review => {
      if (!review.location?.coordinates || review.location.coordinates.length !== 2) {
        return;
      }
      
      try {
        // Get color based on rating
        const getMarkerColor = () => {
          if (review.rating >= 4) return "#22c55e"; // Green for safe
          if (review.rating >= 3) return "#eab308"; // Yellow for caution
          return "#ef4444"; // Red for danger
        };
        
        // Create marker
        const reviewMarker = L.circleMarker(
          [review.location.coordinates[1], review.location.coordinates[0]],
          {
            radius: 8,
            color: 'white',
            weight: 2,
            fillColor: getMarkerColor(),
            fillOpacity: 0.8
          }
        ).addTo(map);
        
        // Add popup
        const popupContent = `
          <div class="review-popup">
            <div class="font-medium">${review.routeName || 'Area Review'}</div>
            <div class="text-sm my-1">${review.content.substring(0, 100)}${review.content.length > 100 ? '...' : ''}</div>
            <div class="flex items-center text-xs">
              <span>Rating: </span>
              <span class="ml-1 text-yellow-500">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
              </span>
            </div>
          </div>
        `;
        
        reviewMarker.bindPopup(popupContent);
        markers.push(reviewMarker);
      } catch (error) {
        console.error(`Error adding marker for review:`, error);
      }
    });
    
    return () => {
      markers.forEach(marker => {
        if (map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      });
    };
  }, [map, reviewPoints]);
  
  return null;
};

export default RouteDisplay;