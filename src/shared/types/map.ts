// ==========================================
// MAP & GEOLOCATION TYPES
// ==========================================

export interface MapCoordinates {
  lat: number;
  lng: number;
}

export interface LocationSearchResult {
  id: string;
  displayName: string;
  position: MapCoordinates;
}

export interface StructuredAddress {
  fullAddress: string;
  province: string;
  district: string;
  country: string;
}

export interface GoongPrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export interface GoongPlaceDetail {
  result: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    formatted_address: string;
  };
}
