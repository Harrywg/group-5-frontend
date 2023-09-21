import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
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
        placeCoords={selectedPlace.coordinates}
      />
      <View style={styles.details}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ color: "white" }}>Back</Text>
        </TouchableOpacity>
        <View style={styles.detailsText}>
          <Text>Distance : </Text>
          <Text>Time Left : </Text>
          <Text>Guesses : {selectedPlace.guesses.length}</Text>
        </View>
        <Image
          style={{ height: "100%", width: "50%" }}
          src={selectedPlace.imgURL}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(64, 147, 249, 1)",
    borderRadius: 1000,
    padding: 10,
    width: "auto",
    zIndex: 100,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 250,
    backgroundColor: "white",
    flex: 1,
  },
  detailsText: {
    padding: 20,
  },
});
