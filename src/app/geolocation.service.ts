import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  address?: string;
  isLoading: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private locationData = new BehaviorSubject<LocationData | null>(null);
  public locationData$ = this.locationData.asObservable();

  constructor() {
    this.initializeLocation();
  }

  /**
   * Initialize geolocation detection
   */
  initializeLocation(): void {
    this.getCurrentLocation();
  }

  /**
   * Get user's current location
   */
  getCurrentLocation(): void {
    if ('geolocation' in navigator) {
      const currentLocation: LocationData = {
        latitude: 0,
        longitude: 0,
        city: '',
        state: '',
        country: '',
        isLoading: true
      };

      this.locationData.next(currentLocation);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.reverseGeocode(latitude, longitude);
        },
        (error) => {
          this.handleLocationError(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      const location: LocationData = {
        latitude: 0,
        longitude: 0,
        city: 'Unknown',
        state: 'Unknown',
        country: 'Unknown',
        isLoading: false,
        error: 'Geolocation is not supported by this browser'
      };
      this.locationData.next(location);
    }
  }

  /**
   * Convert coordinates to readable address using OpenStreetMap API
   */
  private reverseGeocode(latitude: number, longitude: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'twiggy-ecommerce'
      }
    })
      .then(response => response.json())
      .then(data => {
        const address = data.address || {};
        const location: LocationData = {
          latitude,
          longitude,
          city: address.city || address.town || address.village || 'Unknown City',
          state: address.state || address.province || 'Unknown State',
          country: address.country || 'Unknown Country',
          postalCode: address.postcode,
          address: data.display_name,
          isLoading: false
        };
        this.locationData.next(location);
        this.saveLocationToStorage(location);
      })
      .catch(error => {
        console.error('Reverse geocoding error:', error);
        this.handleReverseGeocodeError(latitude, longitude);
      });
  }

  /**
   * Fallback: Use approximate city from coordinates (using mock data)
   */
  private handleReverseGeocodeError(latitude: number, longitude: number): void {
    // Mock city lookup for common coordinates
    const mockCities: { [key: string]: { city: string; state: string; country: string } } = {
      '28.7041_77.1025': { city: 'Delhi', state: 'Delhi', country: 'India' },
      '31.5497_74.3436': { city: 'Lahore', state: 'Punjab', country: 'Pakistan' },
      '30.7333_76.7667': { city: 'Chandigarh', state: 'Chandigarh', country: 'India' },
      '28.6139_77.209': { city: 'Gurgaon', state: 'Haryana', country: 'India' },
      '19.0760_72.8777': { city: 'Mumbai', state: 'Maharashtra', country: 'India' }
    };

    const key = `${latitude.toFixed(4)}_${longitude.toFixed(4)}`;
    const mockData = mockCities[key] || {
      city: `Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
      state: 'Unknown',
      country: 'Unknown'
    };

    const location: LocationData = {
      latitude,
      longitude,
      ...mockData,
      isLoading: false
    };

    this.locationData.next(location);
    this.saveLocationToStorage(location);
  }

  /**
   * Handle geolocation errors
   */
  private handleLocationError(error: GeolocationPositionError): void {
    let errorMsg = 'Unknown error';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMsg = 'Permission denied. Please enable location access.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMsg = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorMsg = 'Location request timed out.';
        break;
    }

    // Set default location when permission denied
    const defaultLocation: LocationData = {
      latitude: 28.7041,
      longitude: 77.1025,
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      isLoading: false,
      error: errorMsg
    };

    this.locationData.next(defaultLocation);
    this.saveLocationToStorage(defaultLocation);
  }

  /**
   * Get current location data
   */
  getLocation(): LocationData | null {
    return this.locationData.value;
  }

  /**
   * Get formatted location string
   */
  getFormattedLocation(): string {
    const location = this.locationData.value;
    if (!location) return 'Loading location...';
    if (location.isLoading) return 'Fetching location...';
    return `${location.city}, ${location.state}`;
  }

  /**
   * Save location to storage
   */
  private saveLocationToStorage(location: LocationData): void {
    localStorage.setItem('userLocation', JSON.stringify(location));
  }

  /**
   * Load location from storage
   */
  loadLocationFromStorage(): void {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      try {
        this.locationData.next(JSON.parse(storedLocation));
      } catch (error) {
        console.error('Error loading location from storage:', error);
      }
    }
  }

  /**
   * Update location manually
   */
  updateLocation(latitude: number, longitude: number): void {
    this.reverseGeocode(latitude, longitude);
  }
}
