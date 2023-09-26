import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import mainStyles from "../styles/mainStyles";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Map from "./Map";
import SubmittedGuess from "./SubmittedGuess";
import * as Location from "expo-location";

const medals = {
  bronze: require("./img/bronze-medal.png"),
  silver: require("./img/silver-medal.png"),
  gold: require("./img/gold-medal.png"),
};

export default function SinglePlace() {
  const route = useRoute();
  const selectedPlace = route.params.place;
  const { currentLocation } = route.params;
  const coords = route.params.place.coordinates;
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState([
    currentLocation.latitude,
    currentLocation.longitude,
  ]);
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

  function onPositionChange({ coords }) {
    const { latitude, longitude } = coords;
    setUserLocation([latitude, longitude]);
  }

  const [timeLeft, setTimeLeft] = useState(calculateTime(selectedPlace));

  useEffect(() => {
    Location.watchPositionAsync({ enableHighAccuracy: true }, onPositionChange);
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
          bottom: "45%",
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
          selectedPlace={selectedPlace}
        />
      </View>
      <View style={styles.details}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            navigation.navigate("SubmittedGuess", {
              userLocation,
              selectedPlace,
            });
          }}
        >
          <Text style={{ color: "white" }}>Submit Guess</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ color: "white" }}>⟵ Back</Text>
        </TouchableOpacity>
        <View style={styles.detailsText}>
          <Text style={{ fontWeight: 800 }}>{selectedPlace.creator}</Text>
          <Text>
            {calculateDistance(
              currentLocation.latitude,
              currentLocation.longitude,
              coords[0],
              coords[1]
            )}{" "}
            km
          </Text>
          <Text>{timeLeft}</Text>
          <Text style={{ marginBottom: 5 }}>
            Guesses : {selectedPlace.guesses.length}
          </Text>
          <ScrollView
            style={{
              marginTop: 5,
              width: "100%",
              flex: 1,
            }}
          >
            {selectedPlace.guesses.map((guess, i) => {
              return (
                <View
                  key={i}
                  style={{
                    borderStyle: "solid",
                    borderWidth: 1,
                    padding: 10,
                    marginVertical: 5,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    maxWidth: 120,
                  }}
                >
                  <Text
                    style={{
                      maxWidth: 90,
                    }}
                    numberOfLines={1}
                  >
                    {guess.username}
                  </Text>
                  <Image
                    source={medals[guess.medal]}
                    style={{ height: 15, width: 10 }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        <Image
          style={{ height: "100%", width: "60%" }}
          src={selectedPlace.imgURL}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#3FC1C0",
    fontWeight: 800,
    borderRadius: 1000,
    padding: 10,
    paddingHorizontal: 20,
    width: "auto",
    zIndex: 100,
  },
  submitButton: {
    position: "absolute",
    left: "50%",
    top: -50,
    transform: [{ translateX: -65 }],
    backgroundColor: "#3FC1C0",
    width: 130,
    fontWeight: 800,
    borderRadius: 1000,
    padding: 10,
    paddingHorizontal: 20,
    zIndex: 100,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    flex: 1,
    padding: 0,
  },
  detailsText: {
    padding: 20,
  },
});
