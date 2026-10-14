import { NavigatorScreenParams } from "@react-navigation/native";
import { PaymentQRCodeState, PaymentResultState } from "@/shared/types";

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: { email?: string } | undefined;
  OtpVerify: { email: string };
  ResetPassword: { resetToken: string; email: string };
};

export type MainTabParamList = {
  HomeTab: undefined;
  MapTab: undefined;
  WishlistTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  LocationList: { keyword?: string; locationTypeId?: number } | undefined;
  LocationDetail: { locationId: number };
  LocationBooking: { locationId: number };
  PaymentQRCode: PaymentQRCodeState;
  PaymentResult: PaymentResultState;
  MyBookings: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  Notifications: undefined;
  Support: undefined;
  OwnerRequest: undefined;
};
