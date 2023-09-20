import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Text, View, Button } from "react-native";
import mainStyles from "../styles/mainStyles";

export default function LeaderBoard({ navigation }) {
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>LeaderBoard</Text>
    </View>
  );
}
