// Location Types
export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

// Car Types
export interface CarType {
  id: string;
  name: string;
  description: string;
  capacity: number;
  basePrice: number;
  pricePerKm: number;
  image: string;
}

// Booking Types
export interface BookingRequest {
  pickupLocation: Location;
  dropLocation: Location;
  date: string;
  time: string;
  carType: string;
  tripType: 'ONE_WAY' | 'ROUND_TRIP';
  passengers: number;
}

export interface Booking {
  id: string;
  userId: string;
  pickupLocation: Location;
  dropLocation: Location;
  date: string;
  time: string;
  carType: CarType;
  status: BookingStatus;
  fare: FareDetails;
  driver?: Driver;
  createdAt: string;
  updatedAt: string;
}

// Fare Types
export interface FareDetails {
  baseFare: number;
  distanceFare: number;
  tax: number;
  total: number;
  currency: string;
  breakdown: {
    description: string;
    amount: number;
  }[];
}

// Driver Types
export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  carDetails: {
    model: string;
    color: string;
    plateNumber: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
}

// Status Types
export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'DRIVER_ASSIGNED'
  | 'PICKED_UP'
  | 'COMPLETED'
  | 'CANCELLED';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// Pagination Types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Search Types
export interface LocationSearchParams {
  query: string;
  limit?: number;
}

// Filter Types
export interface BookingFilters {
  status?: BookingStatus;
  startDate?: string;
  endDate?: string;
  carType?: string;
}

// Sort Types
export type SortOrder = 'asc' | 'desc';
export interface SortParams {
  field: string;
  order: SortOrder;
}
