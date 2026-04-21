import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import NavigationTab from "./NavigationTab";
import DetailScreen from "../Screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function NavigationStack({ users, setUsers, setCurrentUser }) {
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

      <Stack.Screen name="MainTabs" component={NavigationTab} />
    {<Stack.Screen name="Detail" component={DetailScreen} />}
    </Stack.Navigator>
  );
}