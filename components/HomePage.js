import { Text, View, Button } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function HomePage({navigation}) {
  
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>HomePage</Text>
      <Button title="SinglePlace" onPress={() => navigation.navigate("SinglePlace")} />
    </View>
  );
}

