import { Text, View } from "react-native";
import mainStyles from "../styles/mainStyles";

export default function HomePage(props) {
  const { route } = props;
  console.log(route);
  return (
    <View style={mainStyles.container}>
      <Text>1234</Text>
    </View>
  );
}

// Routing

// Learning about the react native components
