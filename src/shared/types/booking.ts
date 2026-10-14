// ==========================================
// BOOKING TYPES & ENUMS
// ==========================================

export const BookingStatus = {
  CREATED: 0,
  PENDING_PAYMENT: 1,
  CONFIRMED: 2,
  CANCELLED: 3,
  COMPLETED: 4,
} as const;

export type BookingStatusType = (typeof BookingStatus)[keyof typeof BookingStatus];

export type BookingStatusString =
  | "CREATED"
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "CANCELLED"
  | "EXPIRED"
  | "COMPLETED";

export interface GetAvailableRoomsRequest {
  locationId: number | string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

export interface GetAvailableRoomsResponse {
  availableRooms: number;
}

export interface CreateBookingRequest {
  locationId: number;
  startDate: string;
  endDate: string;
  roomNumber: number;
  totalAmount: number;
  currency: string;
}

export interface CreateBookingResponse {
  bookingCode: string;
  locationId: number;
  startDate: string;
  endDate: string;
  roomNumber: number;
  status: BookingStatusString | number;
  totalAmount: number;
  currency: string;
}

export interface Booking {
  id: number;
  bookingCode: string;
  locationId: number;
  startDate: string;
  endDate: string;
  roomNumber: number;
  note?: string;
  status: BookingStatusString;
  totalAmount: number;
  currency: string;
}

export interface LocationSummary {
  id: number;
  name: string;
  price: number;
  priceUnit: string;
  area: number;
  address: string;
  thumbnailUrl: string;
}

export interface UserBookingItem {
  id: number;
  bookingCode: string;
  startDate: string;
  endDate: string;
  roomNumber: number;
  note?: string;
  status: BookingStatusType;
  totalAmount: number;
  currency: string;
  createdAt: string;
  location: LocationSummary;
}

export interface BookingSummaryDto {
  allCount: number;
  confirmedCount: number;
  completedCount: number;
  cancelledCount: number;
}

export interface BookingMetaDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetUserBookingsParams {
  page?: number;
  limit?: number;
  status?: BookingStatusType;
  search?: string;
}

export interface GetUserBookingsResponse {
  data: UserBookingItem[];
  meta: BookingMetaDto;
  summary: BookingSummaryDto;
}
