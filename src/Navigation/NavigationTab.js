NavigationTab

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function NavigationTab({ currentUser, cart, setCart, orders, setOrders }) {
  return (
    <Tab.Navigator>
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