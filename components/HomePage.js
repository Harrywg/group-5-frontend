import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, {
  useBottomSheetSpringConfigs,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Map from "./Map";
import { getPlaces } from "../api";

export default function HomePage() {
  const [places, setPlaces] = useState([]);
  const [countdownData, setCountdownData] = useState([]);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["5%", "50%"], []);
  const navigation = useNavigation();

  useEffect(() => {
    function calculateCountdown(place) {
      const createdAtTime = new Date(place.createdAt).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = createdAtTime + 24 * 60 * 60 * 1000 - currentTime;
      if (timeDifference <= 0) {
        return "Expired";
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
    const countdownData = places.map((place) => ({
      ...place,
      countdown: calculateCountdown(place),
    }));
    setCountdownData(countdownData);
    const intervalId = setInterval(() => {
      const updatedCountdownData = countdownData.map((place) => ({
        ...place,
        countdown: calculateCountdown(place),
      }));
      setCountdownData(updatedCountdownData);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [places]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const fetchedPlaces = await getPlaces();
        setPlaces(fetchedPlaces);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const goToSinglePlace = (selectedPlace) => {
    navigation.navigate("SinglePlace", { place: selectedPlace });
  };

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  return (
    <View style={mainStyles.container}>
      <Map />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animationConfigs={animationConfigs}
        enableContentPanningGesture={true}
      >
        <View style={styles.contentContainer}>
          <Text>Swipe up for places 🎉</Text>
        </View>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {countdownData.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={styles.itemContainer}
              onPress={() => goToSinglePlace(place)}
            >
              <Text>{place.placeName}</Text>
              {place.imgURL ? (
                <Image source={{ uri: place.imgURL }} style={styles.image} />
              ) : (
                <Text>No Image Available</Text>
              )}
              <Text>{place.countdown}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
  },
  itemContainer: {
    padding: 7,
    margin: 2,
    backgroundColor: "#eee",
  },
});
