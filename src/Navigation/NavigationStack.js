import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import NavigationTab from "./NavigationTab";
import DetailScreen from "../Screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function NavigationStack({ users, setUsers, currentUser, setCurrentUser, cart, setCart, orders, setOrders }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen
            {...props}
            users={users}
            setUsers={setUsers}
            setCurrentUser={setCurrentUser}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Register">
        {(props) => (
          <RegisterScreen
            {...props}
            users={users}
            setUsers={setUsers}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="MainTabs">
        {(props) => (
          <NavigationTab
            {...props}
            currentUser={currentUser}
            cart={cart}
            setCart={setCart}
            orders={orders}
            setOrders={setOrders}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Detail">
        {(props) => (
          <DetailScreen
            {...props}
            cart={cart}
            setCart={setCart}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}