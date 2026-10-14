import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { AuthNavigator } from "./AuthNavigator";
import { MainTabNavigator } from "./MainTabNavigator";
import { useAuthStore } from "@/shared/stores/authStore";
import { theme } from "@/app/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Placeholder screen component for secondary stack routes
const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.centerContainer}>
    <Text style={styles.screenTitle}>{title}</Text>
    <Text style={styles.screenSubtitle}>Tính năng đang trong lộ trình hoàn thiện</Text>
  </View>
);

export const RootNavigator: React.FC = () => {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.splashText}>Đang nạp ứng dụng...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.primary,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LocationList"
          component={() => <PlaceholderScreen title="Danh Sách Địa Điểm" />}
          options={{ title: "Tìm kiếm homestay" }}
        />
        <Stack.Screen
          name="LocationDetail"
          component={() => <PlaceholderScreen title="Chi Tiết Homestay" />}
          options={{ title: "Chi tiết" }}
        />
        <Stack.Screen
          name="LocationBooking"
          component={() => <PlaceholderScreen title="Đặt Phòng" />}
          options={{ title: "Xác nhận đặt phòng" }}
        />
        <Stack.Screen
          name="PaymentQRCode"
          component={() => <PlaceholderScreen title="Thanh Toán VietQR" />}
          options={{ title: "Quét mã thanh toán" }}
        />
        <Stack.Screen
          name="PaymentResult"
          component={() => <PlaceholderScreen title="Kết Quả Giao Dịch" />}
          options={{ title: "Kết quả đặt phòng" }}
        />
        <Stack.Screen
          name="MyBookings"
          component={() => <PlaceholderScreen title="Đơn Đặt Của Tôi" />}
          options={{ title: "Lịch sử đặt phòng" }}
        />
        <Stack.Screen
          name="EditProfile"
          component={() => <PlaceholderScreen title="Cập Nhật Thông Tin" />}
          options={{ title: "Chỉnh sửa hồ sơ" }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={() => <PlaceholderScreen title="Đổi Mật Khẩu" />}
          options={{ title: "Đổi mật khẩu" }}
        />
        <Stack.Screen
          name="Notifications"
          component={() => <PlaceholderScreen title="Thông Báo" />}
          options={{ title: "Thông báo cá nhân" }}
        />
        <Stack.Screen
          name="Support"
          component={() => <PlaceholderScreen title="Trung Tâm Trợ Giúp" />}
          options={{ title: "Hỗ trợ khách hàng" }}
        />
        <Stack.Screen
          name="OwnerRequest"
          component={() => <PlaceholderScreen title="Đăng Ký Chủ Nhà" />}
          options={{ title: "Trở thành chủ nhà" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  splashText: {
    ...theme.typography.body,
    color: theme.colors.mutedForeground,
    marginTop: theme.spacing.md,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  screenTitle: {
    ...theme.typography.h2,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  screenSubtitle: {
    ...theme.typography.body,
    color: theme.colors.mutedForeground,
    textAlign: "center",
  },
});
