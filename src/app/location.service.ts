import { Injectable } from '@angular/core';

export type LocationType = 'home' | 'work' | 'other';

export interface UserLocation {
  id?: string;
  type: LocationType;
  address: string;
  isDefault?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations: UserLocation[] = [];
  private storageKey = 'userLocations';

  constructor() {
    this.loadLocationsFromStorage();
  }

  addLocation(location: UserLocation): void {
    const newLocation: UserLocation = {
      id: 'loc-' + Math.random().toString(36).substr(2, 9),
      ...location
    };

    // If it's the first location, set as default
    if (this.locations.length === 0) {
      newLocation.isDefault = true;
    }

    this.locations.push(newLocation);
    this.saveLocationsToStorage();
  }

  updateLocation(id: string, location: UserLocation): void {
    const index = this.locations.findIndex(loc => loc.id === id);
    if (index !== -1) {
      this.locations[index] = { ...location, id };
      this.saveLocationsToStorage();
    }
  }

  deleteLocation(id: string): void {
    this.locations = this.locations.filter(loc => loc.id !== id);
    
    // Ensure at least one default location
    if (this.locations.length > 0 && !this.locations.find(loc => loc.isDefault)) {
      this.locations[0].isDefault = true;
    }
    
    this.saveLocationsToStorage();
  }

  getLocations(): UserLocation[] {
    return this.locations;
  }

  getLocationById(id: string): UserLocation | undefined {
    return this.locations.find(loc => loc.id === id);
  }

  getDefaultLocation(): UserLocation | undefined {
    return this.locations.find(loc => loc.isDefault) || this.locations[0];
  }

  setDefaultLocation(id: string): void {
    this.locations.forEach(loc => {
      loc.isDefault = loc.id === id;
    });
    this.saveLocationsToStorage();
  }

  private saveLocationsToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.locations));
  }

  private loadLocationsFromStorage(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.locations = JSON.parse(stored);
    }
  }
}
