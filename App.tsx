import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from './src/store/authStore';
import { useThemeStore } from './src/store/themeStore';
import {
  GraduationCap,
  Map,
  AlertCircle,
  Search,
  Calendar,
  Book,
} from 'lucide-react-native';

// Screens
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import CampusMap from './src/screens/CampusMap';
import Issues from './src/screens/Issues';
import LostFound from './src/screens/LostFound';
import Events from './src/screens/Events';
import Teaching from './src/screens/Teaching';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const isDark = useThemeStore((state) => state.isDark);
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
          borderTopColor: isDark ? '#374151' : '#E5E7EB',
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#6B7280',
        headerStyle: {
          backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
        },
        headerTintColor: isDark ? '#FFFFFF' : '#000000',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => <GraduationCap size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={CampusMap}
        options={{
          tabBarIcon: ({ color }) => <Map size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Issues"
        component={Issues}
        options={{
          tabBarIcon: ({ color }) => <AlertCircle size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Lost & Found"
        component={LostFound}
        options={{
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Teaching"
        component={Teaching}
        options={{
          tabBarIcon: ({ color }) => <Book size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { user, loading } = useAuthStore();
  const isDark = useThemeStore((state) => state.isDark);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}