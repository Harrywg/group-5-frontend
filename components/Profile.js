import { useNavigation } from "@react-navigation/native";
import { Text, View, Button } from "react-native";
import mainStyles from "../styles/mainStyles";

export default function Profile({navigation}) {
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>Profile</Text>
      <Button title="Home" onPress={() => navigation.navigate("HomePage")} />
      
    </View>
  );
}
