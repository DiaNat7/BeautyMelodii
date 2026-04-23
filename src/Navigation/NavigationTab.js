import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; 
import HomeScreen from "../Screens/HomeScreen";
import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function NavigationTab({ currentUser, cart, setCart, orders, setOrders }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#E75480", 
        tabBarInactiveTintColor: "gray",  
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Products") {
            iconName = focused ? "bag-handle" : "bag-handle-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Products">
        {(props) => (
          <HomeScreen
            {...props}
            cart={cart}
            setCart={setCart}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Cart">
        {(props) => (
          <CartScreen
            {...props}
            cart={cart}
            setCart={setCart}
            orders={orders}
            setOrders={setOrders}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Profile">
        {(props) => (
          <ProfileScreen
            {...props}
            currentUser={currentUser}
            orders={orders}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}