import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import mainStyles from "../styles/mainStyles";

export default function LeaderBoard() {
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>LeaderBoard</Text>
    </View>
  );
}
