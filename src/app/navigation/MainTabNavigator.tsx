import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MainTabParamList } from "./types";
import { theme } from "@/app/theme";

const Tab = createBottomTabNavigator<MainTabParamList>();

const HomeTabPlaceholder: React.FC = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.title}>Khám Phá Địa Điểm</Text>
    <Text style={styles.subtitle}>Danh sách homestay & villa nổi bật</Text>
  </View>
);

const MapTabPlaceholder: React.FC = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.title}>Bản Đồ Trực Quan</Text>
    <Text style={styles.subtitle}>Tìm homestay xung quanh khu vực</Text>
  </View>
);

const WishlistTabPlaceholder: React.FC = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.title}>Địa Điểm Yêu Thích</Text>
    <Text style={styles.subtitle}>Các phòng bạn đã lưu lại</Text>
  </View>
);

const ProfileTabPlaceholder: React.FC = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.title}>Tài Khoản Cá Nhân</Text>
    <Text style={styles.subtitle}>Quản lý thông tin & lịch sử đặt phòng</Text>
  </View>
);

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          elevation: 2,
        },
        headerTitleStyle: {
          fontWeight: "700",
          color: theme.colors.primary,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeTabPlaceholder}
        options={{
          title: "Khám phá",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MapTab"
        component={MapTabPlaceholder}
        options={{
          title: "Bản đồ",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WishlistTab"
        component={WishlistTabPlaceholder}
        options={{
          title: "Yêu thích",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTabPlaceholder}
        options={{
          title: "Cá nhân",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.mutedForeground,
  },
});
