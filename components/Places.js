import { useNavigation } from "@react-navigation/native";
import { Text, View, Button } from "react-native";
import mainStyles from "../styles/mainStyles";
// import SinglePlace from "./SinglePlace";

export default function Places({navigation}) {
    return (
      <View style={mainStyles.container}>
        <Text style={mainStyles.text}>Places</Text>
        <Button
          title="SinglePlace"
          onPress={() => navigation.navigate("SinglePlace")}
        />
        <Button title="Home" onPress={() => navigation.navigate("HomePage")} />
        <Button
          style={mainStyles.profile}
          title="Profile"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    );
}