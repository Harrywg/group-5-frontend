import { useNavigation } from "@react-navigation/native";
import { Text, View, Button } from "react-native";
import mainStyles from "../styles/mainStyles";

export default function SinglePlace() {
  const navigation = useNavigation();

  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>Single Place</Text>
       </View>
  );
}
