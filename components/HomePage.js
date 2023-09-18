import { Text, View, Button } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Places from "./Places";

const Tab = createMaterialTopTabNavigator();

export default function HomePage() {
  
  return (
    <Tab.Navigator>
      {/* <View style={mainStyles.container}>
        <Text style={mainStyles.text}>HomePage</Text> */}
        <Tab.Screen name="Places" component={Places} />
        {/* <Button title="Places" onPress={() => navigation.navigate("Places")} />
        <Button
          style={mainStyles.profile}
          title="Profile"
          onPress={() => navigation.navigate("Profile")}
        />
        <Button
          title="LeaderBoard"
          onPress={() => navigation.navigate("LeaderBoard")}
        /> */}
    </Tab.Navigator>
  );
}

