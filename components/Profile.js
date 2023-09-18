import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import mainStyles from "../styles/mainStyles";

export default function Profile() {
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>Profile</Text>
    </View>
  );
}
