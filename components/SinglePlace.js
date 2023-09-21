import { useNavigation } from "@react-navigation/native";
import { Text, View, Button } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useRoute } from "@react-navigation/native";
import Map from "./Map";
export default function SinglePlace() {
  const route = useRoute();
  const selectedPlace = route.params.place;
  const coords = route.params.place.coordinates;
  const navigation = useNavigation();

  return (
    <View style={mainStyles.container}>
      <Map
        specificLocation={{
          latitude: coords[0],
          longitude: coords[1],
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}
