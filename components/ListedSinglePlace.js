import { TouchableOpacity, View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { getUsersByUsername } from "../api";

export default function ListedSinglePlace({
  place,
  styles,
  calculateDistance,
  currentLocation,
  calculateCountdown,
  goToSinglePlace,
}) {
  const [timeLeft, setTimeLeft] = useState(calculateCountdown(place));
  const [userAvatar, setUserAvatar] = useState('')

  useEffect(() => {
    setInterval(() => {
      setTimeLeft(calculateCountdown(place));
    }, 1000);
  }, []);

  useEffect(() => {
    getUsersByUsername(place.creator).then(({ avatar_URL }) => {
      console.log(avatar_URL)
      setUserAvatar(avatar_URL);
    }).catch((err) => {
      console.error(err)
    })
  }, []);

  const distance = calculateDistance(
    currentLocation.latitude,
    currentLocation.longitude,
    place.coordinates[0],
    place.coordinates[1]
  );
  return (
    <TouchableOpacity
      key={place.id}
      style={
        place.countdown === "Event has finished"
          ? styles.expiredCountdown
          : styles.itemContainer
      }
      onPress={() => goToSinglePlace(place, currentLocation)}
    >
      <View style={styles.itemContent}>
        <View style={styles.leftContent}>
          <Image style={styles.userAvatar} source={{uri: userAvatar}}/>
          <Text style={styles.placeName}>{place.creator}</Text>
          <Text style={styles.countdown}>
            {place.countdown === "Event has finished"
              ? "Event has finished"
              : `${timeLeft}`}
          </Text>
          <Text style={styles.distance}>{`${distance} km`}</Text>
          <Text style={styles.attempt}>{place.guesses.length} attempts</Text>
        </View>
        <Image style={styles.image} source={{ uri: place.imgURL }} />
      </View>
    </TouchableOpacity>
  );
}
