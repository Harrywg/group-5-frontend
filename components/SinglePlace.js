import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import mainStyles from "../styles/mainStyles";

export default function SinglePlace() {
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>Single Place</Text>
    </View>
  );
}
