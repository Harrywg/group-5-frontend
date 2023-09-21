import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import LeaderBoard from "./components/LeaderBoard";
import SinglePlace from "./components/SinglePlace";
import PostPlace from "./components/Post";
import mainStyles from "./styles/mainStyles";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MainPages() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
      <Tab.Screen name="Post" component={PostPlace} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? "HomePage" : "Login"}
        >
          {isAuthenticated ? (
            <Stack.Screen
              name="MainPages"
              component={MainPages}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={() => (
                <Login setIsAuthenticated={setIsAuthenticated}></Login>
              )}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            style={mainStyles}
            name="SinglePlace"
            options={{ headerShown: false }}
            component={SinglePlace}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
