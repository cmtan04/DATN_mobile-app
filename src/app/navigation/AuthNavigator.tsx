import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { theme } from "@/app/theme";

const Stack = createNativeStackNavigator<AuthStackParamList>();

type SignInProps = NativeStackScreenProps<AuthStackParamList, "SignIn">;
const SignInPlaceholder: React.FC<SignInProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Đăng Nhập</Text>
    <Text style={styles.subtitle}>Khám phá homestay và khách sạn lý tưởng</Text>
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={() => navigation.navigate("SignUp")}
    >
      <Text style={styles.buttonText}>Chưa có tài khoản? Đăng ký</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.secondaryButton}
      onPress={() => navigation.navigate("ForgotPassword")}
    >
      <Text style={styles.secondaryButtonText}>Quên mật khẩu?</Text>
    </TouchableOpacity>
  </View>
);

type SignUpProps = NativeStackScreenProps<AuthStackParamList, "SignUp">;
const SignUpPlaceholder: React.FC<SignUpProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Đăng Ký Tài Khoản</Text>
    <Text style={styles.subtitle}>Tạo tài khoản để bắt đầu trải nghiệm</Text>
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={() => navigation.navigate("SignIn")}
    >
      <Text style={styles.buttonText}>Đã có tài khoản? Đăng nhập</Text>
    </TouchableOpacity>
  </View>
);

type ForgotProps = NativeStackScreenProps<AuthStackParamList, "ForgotPassword">;
const ForgotPasswordPlaceholder: React.FC<ForgotProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Quên Mật Khẩu</Text>
    <Text style={styles.subtitle}>Nhập email để nhận mã xác minh OTP</Text>
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={() => navigation.navigate("OtpVerify", { email: "test@example.com" })}
    >
      <Text style={styles.buttonText}>Gửi mã OTP</Text>
    </TouchableOpacity>
  </View>
);

type OtpProps = NativeStackScreenProps<AuthStackParamList, "OtpVerify">;
const OtpVerifyPlaceholder: React.FC<OtpProps> = ({ navigation, route }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Xác Minh OTP</Text>
    <Text style={styles.subtitle}>Mã OTP gửi đến: {route.params.email}</Text>
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={() =>
        navigation.navigate("ResetPassword", {
          resetToken: "sample-token",
          email: route.params.email,
        })
      }
    >
      <Text style={styles.buttonText}>Tiếp tục đổi mật khẩu</Text>
    </TouchableOpacity>
  </View>
);

type ResetProps = NativeStackScreenProps<AuthStackParamList, "ResetPassword">;
const ResetPasswordPlaceholder: React.FC<ResetProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Đặt Lại Mật Khẩu</Text>
    <Text style={styles.subtitle}>Nhập mật khẩu mới của bạn</Text>
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={() => navigation.navigate("SignIn")}
    >
      <Text style={styles.buttonText}>Lưu & Đăng nhập lại</Text>
    </TouchableOpacity>
  </View>
);

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: { fontWeight: "600" },
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignInPlaceholder}
        options={{ title: "Đăng nhập" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpPlaceholder}
        options={{ title: "Đăng ký" }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordPlaceholder}
        options={{ title: "Quên mật khẩu" }}
      />
      <Stack.Screen
        name="OtpVerify"
        component={OtpVerifyPlaceholder}
        options={{ title: "Xác thực OTP" }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordPlaceholder}
        options={{ title: "Đổi mật khẩu mới" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.mutedForeground,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.md,
    width: "100%",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  buttonText: {
    ...theme.typography.bodyLarge,
    color: theme.colors.surface,
  },
  secondaryButton: {
    paddingVertical: theme.spacing.sm,
  },
  secondaryButtonText: {
    ...theme.typography.body,
    color: theme.colors.accent,
    fontWeight: "600",
  },
});
