// ==========================================
// AUTH & USER REQUEST & RESPONSE TYPES
// ==========================================

export interface UserProfile {
  fullName: string;
  phoneNumber: string;
  avatarUrl?: string;
}

export interface User {
  id: number;
  email: string;
  userRole?: number; // 0: Admin, 1: Owner, 2: Customer
  ownerRequestStatus?: number; // 0: None, 1: Pending, 2: Approved, 3: Rejected
  status?: string; // "ACTIVE" | "INACTIVE" | "BLOCKED"
  profile?: UserProfile | null;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface LogoutRequest {
  refreshToken?: string;
}

export interface GetOtpRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  password: string;
}

export interface AuthMessageResponse {
  status?: boolean;
  message?: string;
  resetToken?: string;
}

export interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  message?: string;
}

export interface SignUpFormValues extends RegisterRequest {
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface AuthRedirectLocation {
  pathname?: string;
  search?: string;
  hash?: string;
}

export type LoginRequiredSource = "intercept" | "protected-route";

export interface SignInLocationState {
  from?: AuthRedirectLocation;
  email?: string;
}

export interface UpdateCurrentUserPayload {
  fullName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  userId: number;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
