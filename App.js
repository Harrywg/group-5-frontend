import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import {
  NavigationContainer,
  useNavigation,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import LeaderBoard from "./components/LeaderBoard";
import SinglePlace from "./components/SinglePlace";
import mainStyles from "./styles/mainStyles";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { useState, useEffect } from "react";


export const navigationRef = createNavigationContainerRef();


const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  if (navigationRef.isReady()) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        style={mainStyles}
        name="HomePage"
        options={{ headerShown: false }}
        component={HomePage}
      />
      <HomeStack.Screen
        style={mainStyles}
        name="SinglePlace"
        options={{ headerShown: false }}
        component={SinglePlace}
      />
    </HomeStack.Navigator>
  );
}
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
  );
}
