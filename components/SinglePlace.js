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
import { useEffect, useState } from "react";
import Map from "./Map";
export default function SinglePlace() {
  const route = useRoute();
  const selectedPlace = route.params.place;
  const { currentLocation } = route.params;
  const coords = route.params.place.coordinates;
  const navigation = useNavigation();

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;

    const latDiff = lat2Rad - lat1Rad;
    const lonDiff = lon2Rad - lon1Rad;

    const a =
      Math.sin(latDiff / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    const roundedDistance = distance.toFixed(2);

    return parseFloat(roundedDistance);
  }

  function calculateTime(place) {
    const createdAtTime = new Date(place.createdAt).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = createdAtTime + 24 * 60 * 60 * 1000 - currentTime;
    if (timeDifference <= 0) {
      return "Event has finished";
    } else {
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      return `${hours}h ${minutes}m ${seconds}s`;
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTime(selectedPlace));

  useEffect(() => {
    setInterval(() => {
      setTimeLeft(calculateTime(selectedPlace));
    }, 1000);
  }, []);

  return (
    <View style={mainStyles.container}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: "35%",
        }}
      >
        <Map
          specificLocation={{
            latitude: coords[0],
            longitude: coords[1],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          placeCoords={selectedPlace.coordinates}
        />
      </View>
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
          <Text>
            Distance :{" "}
            {calculateDistance(
              currentLocation.latitude,
              currentLocation.longitude,
              coords[0],
              coords[1]
            )}{" "}
            km
          </Text>
          <Text>Time Left : {timeLeft}</Text>
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
    height: "35%",
    backgroundColor: "white",
    flex: 1,
  },
  detailsText: {
    padding: 20,
  },
});
