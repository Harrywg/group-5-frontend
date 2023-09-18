import { Text, View } from "react-native";
import mainStyles from "../styles/mainStyles";

export default function HomePage(props) {
  const { route } = props;
  console.log(route);
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>1234</Text>
    </View>
  );
}
