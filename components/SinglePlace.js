import { useNavigation } from "@react-navigation/native";
import { Text, View, Button } from "react-native";
import mainStyles from "../styles/mainStyles";

export default function SinglePlace({ navigation }) {
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>Single Place</Text>
      <Button title="Home" onPress={() => navigation.navigate("HomePage")} />
      <Button
        style={mainStyles.profile}
        title="Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}
