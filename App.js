import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionic from "react-native-vector-icons/Ionicons";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import LeaderBoard from "./components/LeaderBoard";
import SinglePlace from "./components/SinglePlace";
import PostPlace from "./components/Post";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MainPages() {
  return (
    <Tab.Navigator
      style={{
        flex: 1,
        position: "absolute",
        bottom: "-2.8%",
        top: 0,
        right: 0,
        left: 0,
      }}
      screenOptions={({ route }) => ({
        tabBarActiveBackgroundColor: "yellow",
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          let adjustedSize = size;

          if (route.name === "HomePage") {
            iconName = focused ? "home" : "home-outline";
            adjustedSize = focused ? (size = 26) : (size = 22);
          } else if (route.name === "LeaderBoard") {
            iconName = focused ? "bar-chart-sharp" : "bar-chart-outline";
            adjustedSize = focused ? (size = 26) : (size = 22);
          } else if (route.name === "Post") {
            iconName = focused ? "add-circle" : "add-circle-outline";
            adjustedSize = focused ? (size = 26) : (size = 22);
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            adjustedSize = focused ? (size = 26) : (size = 22);
          }
          return <Ionic name={iconName} size={adjustedSize} color={color} />;
        },
        tabBarLabel: false,
      })}
    >
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
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
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
            name="SinglePlace"
            options={{ headerShown: false }}
            component={SinglePlace}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
