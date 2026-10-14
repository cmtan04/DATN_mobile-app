// ==========================================
// PAYMENT & SSE STREAM TYPES
// ==========================================

export const PAYMENT_STATUS = {
  UNPAID: "UNPAID",
  PAID: "PAID",
  FAILED: "FAILED",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
  REFUND_PENDING: "REFUND_PENDING",
  REFUNDED: "REFUNDED",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export interface CheckoutPaymentRequest {
  bookingCode: string;
  note?: string;
}

export interface CheckoutPaymentResponse {
  orderCode: number;
  qrCode: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ammount: number;
  description: string;
  expiredAt?: number;
}

export interface CancelBookingRequest {
  bookingCode: string;
  reason?: string;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
}

export interface CancelBookingResponse {
  bookingCode: string;
  bookingStatus: number | string;
  paymentStatus: number | string;
  refundAmount: number;
  cancellationFee: number;
  refundPercentage: number;
  refundRequestId?: number | null;
  message: string;
}

/** Payload sự kiện SSE nhận từ Server khi trạng thái thanh toán thay đổi */
export interface PaymentStreamEvent {
  paymentId: number;
  bookingId: number;
  paymentStatus: PaymentStatus | number; // 1: PAID
  bookingStatus: string | number; // 2: CONFIRMED
}

/** State truyền vào màn hình PaymentQRCodeScreen qua Navigation */
export interface PaymentQRCodeState {
  qrCode: string;
  orderCode: number;
  bookingCode: string;
  amount: number;
  currency: string;
  locationId?: number | string;
  accountName: string;
  accountNumber: string;
  bankName?: string;
  description?: string;
}

/** State truyền vào màn hình PaymentResultScreen qua Navigation */
export interface PaymentResultState {
  status: "success" | "failed" | "cancelled" | "expired";
  bookingCode?: string;
  orderCode?: number;
  message?: string;
}
