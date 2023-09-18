import { Text, View, Button } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

// const navigation = useNavigation();

export default function HomePage({navigation}) {
console.log(navigation)
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>HomePage</Text>
      <Button title="Places" onPress={() => navigation.navigate("Places")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <Button title="LeaderBoard" onPress={() => navigation.navigate("LeaderBoard")} />
    </View>
  );
}
