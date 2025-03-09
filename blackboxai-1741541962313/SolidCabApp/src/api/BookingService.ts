import { 
  ApiResponse, 
  Booking, 
  BookingRequest, 
  CarType, 
  FareDetails, 
  Location,
  PaginatedResponse,
  BookingFilters
} from '../types/api';

class BookingService {
  private static BASE_URL = 'https://api.solidcab.com/v1';

  // Get available car types
  static async getCarTypes(): Promise<ApiResponse<CarType[]>> {
    try {
      const response = await fetch(`${this.BASE_URL}/car-types`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch car types'
        }
      };
    }
  }

  // Search locations
  static async searchLocations(query: string): Promise<ApiResponse<Location[]>> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/locations/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to search locations'
        }
      };
    }
  }

  // Calculate fare
  static async calculateFare(
    pickupLocation: Location,
    dropLocation: Location,
    carType: string
  ): Promise<ApiResponse<FareDetails>> {
    try {
      const response = await fetch(`${this.BASE_URL}/calculate-fare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pickupLocation,
          dropLocation,
          carType
        })
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'CALCULATION_ERROR',
          message: 'Failed to calculate fare'
        }
      };
    }
  }

  // Create booking
  static async createBooking(
    bookingRequest: BookingRequest
  ): Promise<ApiResponse<Booking>> {
    try {
      const response = await fetch(`${this.BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingRequest)
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'BOOKING_ERROR',
          message: 'Failed to create booking'
        }
      };
    }
  }

  // Get booking details
  static async getBooking(bookingId: string): Promise<ApiResponse<Booking>> {
    try {
      const response = await fetch(`${this.BASE_URL}/bookings/${bookingId}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch booking details'
        }
      };
    }
  }

  // Get user bookings with pagination and filters
  static async getUserBookings(
    page: number = 1,
    limit: number = 10,
    filters?: BookingFilters
  ): Promise<ApiResponse<PaginatedResponse<Booking>>> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters || {})
      });

      const response = await fetch(
        `${this.BASE_URL}/bookings?${queryParams.toString()}`
      );
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch user bookings'
        }
      };
    }
  }

  // Cancel booking
  static async cancelBooking(bookingId: string): Promise<ApiResponse<void>> {
    try {
      await fetch(`${this.BASE_URL}/bookings/${bookingId}/cancel`, {
        method: 'POST'
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'CANCELLATION_ERROR',
          message: 'Failed to cancel booking'
        }
      };
    }
  }

  // Mock data for development
  static getMockFareDetails(): FareDetails {
    return {
      baseFare: 100,
      distanceFare: 50,
      tax: 15,
      total: 165,
      currency: 'USD',
      breakdown: [
        { description: 'Base Fare', amount: 100 },
        { description: 'Distance (5 km)', amount: 50 },
        { description: 'Tax', amount: 15 }
      ]
    };
  }

  static getMockCarTypes(): CarType[] {
    return [
      {
        id: '1',
        name: 'Economy',
        description: 'Affordable and comfortable rides',
        capacity: 4,
        basePrice: 100,
        pricePerKm: 10,
        image: 'economy-car.png'
      },
      {
        id: '2',
        name: 'Premium',
        description: 'Luxury vehicles for a premium experience',
        capacity: 4,
        basePrice: 150,
        pricePerKm: 15,
        image: 'premium-car.png'
      },
      {
        id: '3',
        name: 'SUV',
        description: 'Spacious vehicles for group travel',
        capacity: 6,
        basePrice: 200,
        pricePerKm: 20,
        image: 'suv-car.png'
      }
    ];
  }
}

export default BookingService;
