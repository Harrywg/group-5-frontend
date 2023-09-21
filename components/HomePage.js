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

export default function HomePage() {
  const [places, setPlaces] = useState([]);
  const [countdownData, setCountdownData] = useState([]);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["8%", "50%"], []);
  const navigation = useNavigation();
  const handleSheetChanges = useCallback((index) => {
  }, []);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  //just for logging any location changes
  useEffect(() => console.log(currentLocation), [currentLocation]);

  const onPositionChange = (arg) => {
    console.log("position changed");
    const { coords } = arg;
    const { latitude, longitude } = coords;
    const newRegion = { ...currentLocation, latitude, longitude };
    if (coords) setCurrentLocation(newRegion);
    mapRef.current.animateToRegion(newRegion, 0);
  };
  const mapRef = useRef(null);

  useEffect(() => {
    function calculateCountdown(place) {
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

  const goToSinglePlace = (selectedPlace) => {
    navigation.navigate("SinglePlace", { place: selectedPlace });
  };

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 800,
  });

  return (
    <View style={mainStyles.container}>
      <Map
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        onPositionChange={onPositionChange}
        mapRef={mapRef}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animationConfigs={animationConfigs}
        enableContentPanningGesture={true}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Swipe up for places 🎉</Text>
        </View>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {countdownData.map((place) => {
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
                onPress={() => goToSinglePlace(place)}
              >
                <View style={styles.itemContent}>
                  <View style={styles.leftContent}>
                    <Text style={styles.placeName}>{place.placeName}</Text>
                    <Text style={styles.countdown}>
                      {place.countdown === "Event has finished"
                        ? "Event has finished"
                        : `Time remaining:  ${place.countdown}`}
                    </Text>
                    <Text
                      style={styles.distance}
                    >{`Distance: ${distance} km`}</Text>
                  </View>
                  <Image style={styles.image} source={{ uri: place.imgURL }} />
                </View>
              </TouchableOpacity>
            );
          })}
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
    shadowColor: "#000",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7,
    margin: 2,
    backgroundColor: "#eee",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
  },
  expiredCountdown: {
    backgroundColor: "red",
    borderWidth: 5,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    padding: 7,
    margin: 2,
  },
  countdown: {
    fontSize: 14,
    color: "black",
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
  },
});
