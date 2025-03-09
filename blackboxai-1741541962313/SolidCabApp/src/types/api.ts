// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  rating?: number;
}

// Location Types
export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  placeId?: string;
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
  features?: string[];
}

// Booking Types
export type TripType = 'ONE_WAY' | 'ROUND_TRIP';

export interface BookingRequest {
  pickupLocation: Location;
  dropLocation: Location;
  date: string;
  time: string;
  carType: string;
  tripType: TripType;
  passengers: number;
  notes?: string;
}

export interface Booking {
  id: string;
  userId: string;
  pickupLocation: Location;
  dropLocation: Location;
  date: string;
  time: string;
  carType: CarType;
  tripType: TripType;
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
  breakdown: FareBreakdownItem[];
  distance?: number;
  duration?: number;
}

export interface FareBreakdownItem {
  description: string;
  amount: number;
}

// Driver Types
export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  totalRides: number;
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
  error?: ApiError;
}

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
export interface SearchParams {
  query: string;
  limit?: number;
  offset?: number;
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

// Payment Types
export interface PaymentMethod {
  id: string;
  type: 'CARD' | 'WALLET' | 'CASH';
  title: string;
  last4?: string;
  expiryDate?: string;
  isDefault?: boolean;
}

export interface PaymentRequest {
  bookingId: string;
  amount: number;
  paymentMethodId: string;
  currency: string;
}

export interface PaymentResponse {
  id: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  transactionId: string;
  amount: number;
  currency: string;
  timestamp: string;
}
