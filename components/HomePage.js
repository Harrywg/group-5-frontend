import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useNavigation } from "@react-navigation/native";
import SinglePlace from "./SinglePlace";

export default function HomePage() {
  const navigation = useNavigation();

  const goToSinglePlace = () => {
    navigation.navigate("SinglePlace");
  };

  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>HomePage</Text>
      <TouchableOpacity title="Go to SinglePlace" onPress={goToSinglePlace}>
        <Text>Single Place</Text>
      </TouchableOpacity>
    </View>
  );
}
