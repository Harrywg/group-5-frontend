import { useNavigation } from "@react-navigation/native";
import { Text, View ,Button } from "react-native";
import mainStyles from "../styles/mainStyles";

export default function LeaderBoard({navigation}) {
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>LeaderBoard</Text>
      <Button title="Home" onPress={() => navigation.navigate("HomePage")} />
      <Button
        style={mainStyles.profile}
        title="Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}
