import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useRoute } from "@react-navigation/native";
import Map from "./Map";
export default function SinglePlace() {
  const route = useRoute();
  const selectedPlace = route.params.place;

  return (
    <View style={mainStyles.container}>
      <Map />
      <Text style={mainStyles.text}>{selectedPlace.placeName}</Text>
    </View>
  );
}
