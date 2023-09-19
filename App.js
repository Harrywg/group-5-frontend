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
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

export const navigationRef = createNavigationContainerRef();

const Stack = createNativeStackNavigator();

// function HomeStackScreen() {
//   return (
//     <View>
//       <HomeStack.Navigator>
//         <HomeStack.Screen
//           style={mainStyles}
//           name="HomePage"
//           options={{ headerShown: true }}
//           component={HomePage}
//         />
//         <HomeStack.Screen
//           style={mainStyles}
//           name="SinglePlace"
//           options={{ headerShown: false }}
//           component={SinglePlace}
//         />
//       </HomeStack.Navigator>
//     </View>
//   );
// }

function root() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          style={mainStyles}
          name="SinglePlace"
          options={{ headerShown: false }}
          component={SinglePlace}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
