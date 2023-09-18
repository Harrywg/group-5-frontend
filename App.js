import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Places from "./components/Places";
import Profile from "./components/Profile";
import LeaderBoard from "./components/LeaderBoard";
import SinglePlace from "./components/SinglePlace";
import mainStyles from "./styles/mainStyles";

// Remember to install with expo command instead of npm i

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
        
          name="HomePage"
          component={HomePage}
        />
        {/* <Stack.Screen
          name="Places"
          options={{ headerShown: false }}
          component={Places}
        />
        <Stack.Screen
          name="LeaderBoard"
          options={{ headerShown: false }}
          component={LeaderBoard}
        />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Profile}
        />
        <Stack.Screen
          name="SinglePlace"
          options={{ headerShown: false }}
          component={SinglePlace}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
