import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context";
import { useRoute } from "@react-navigation/native";
import { postGuess } from "../api";

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

const medals = {
  bronze: require("./img/bronze-medal.png"),
  silver: require("./img/silver-medal.png"),
  gold: require("./img/gold-medal.png"),
};

const messages = {
  none: "Not this time 😞",
  bronze: "Nice Job 👍",
  silver: "Great! 😬",
  gold: "Perfect! 🎉",
};

export default function SubmittedGuess() {
  const route = useRoute();
  const { userLocation, selectedPlace } = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [submittedGuess, setSubmittedGuess] = useState(null);

  useEffect(() => {
    console.log({ selectedPlace });

    postGuess(selectedPlace._id, {
      username: user.username,
      avatarURL: user.avatarURL,
      guessCoordinates: userLocation,
    })
      .then((res) => {
        console.log(res.yourGuess);
        setIsLoading(false);
        setSubmittedGuess(res.yourGuess);
      })
      .catch(console.warn);
  }, []);

  if (!isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          src={medals[submittedGuess?.medal] || ""}
          style={{ height: 30, width: 30 }}
        ></Image>
        <Text style={{ fontSize: 25, fontWeight: 800 }}>
          {submittedGuess?.medal
            ? messages[submittedGuess?.medal]
            : messages.none}
        </Text>
        <Text>
          You were{" "}
          {calculateDistance(
            userLocation[0],
            userLocation[1],
            selectedPlace.coordinates[0],
            selectedPlace.coordinates[1]
          )}
          km away.
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: "#3FC1C0",
            fontWeight: 800,
            borderRadius: 1000,
            padding: 10,
            paddingHorizontal: 20,
            width: "auto",
            zIndex: 100,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ color: "white" }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: "#3FC1C0",
            fontWeight: 800,
            borderRadius: 1000,
            padding: 10,
            paddingHorizontal: 20,
            width: "auto",
            zIndex: 100,
          }}
          onPress={() => {
            navigation.navigate("HomePage");
          }}
        >
          <Text style={{ color: "white" }}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Submitting...</Text>
      <TouchableOpacity
        style={{
          marginTop: 20,

          backgroundColor: "#3FC1C0",
          fontWeight: 800,
          borderRadius: 1000,
          padding: 10,
          paddingHorizontal: 20,
          width: "auto",
          zIndex: 100,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={{ color: "white" }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}
