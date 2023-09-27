import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import BottomSheet, {
  useBottomSheetSpringConfigs,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Map from "./Map";
import ListedSinglePlace from "./ListedSinglePlace";
import { getPlaces, getOrderedPlaces } from "../api";


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
  const handleSheetChanges = useCallback((index) => {}, []);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  //just for logging any location changes
  useEffect(() => console.log(currentLocation), [currentLocation]);

  const onPositionChange = (arg) => {
    const { coords } = arg;
    const { latitude, longitude } = coords;
    const newRegion = { ...currentLocation, latitude, longitude };
    if (coords) setCurrentLocation(newRegion);
    if (newRegion) mapRef?.current?.animateToRegion(newRegion, 0);
  };
  const mapRef = useRef(null);

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

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const fetchedPlaces = await getOrderedPlaces(
          currentLocation.latitude,
          currentLocation.longitude
        );
        setPlaces(fetchedPlaces);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, [currentLocation]);

    useFocusEffect(
      useCallback(() => {
        const fetchPlaces = async () => {
          try {
            const fetchedPlaces = await getOrderedPlaces(
              currentLocation.latitude,
              currentLocation.longitude
            );
            setPlaces(fetchedPlaces);
          } catch (error) {
            console.error("Error fetching places:", error);
          }
        };
        fetchPlaces();
      }, [currentLocation])
    );

  const goToSinglePlace = (selectedPlace, currentLocation) => {
    navigation.navigate("SinglePlace", {
      place: selectedPlace,
      currentLocation,
    });
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
        calculateDistance={calculateDistance}
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
          {places.map((place, i) => {
            return (
              <ListedSinglePlace
                key={i}
                place={place}
                styles={styles}
                calculateDistance={calculateDistance}
                currentLocation={currentLocation}
                calculateCountdown={calculateCountdown}
                goToSinglePlace={goToSinglePlace}
              />
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
    gap: 20,
    paddingTop: 20,
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
    margin: 7,
    backgroundColor: "#3FC1C0",
    // borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
    flexDirection:'',
    padding: 25,
  },
  expiredCountdown: {
    backgroundColor: "red",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    padding: 7,
    margin: 2,
  },
  distance: {
    fontSize: 16,
    color: "white",
  },
  attempt: {
    fontSize: 16,
    color: "white",
  },
  countdown: {
    color: "white",
    fontSize: 16,
  },
  placeName: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 18,
    color: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
  },
  userAvatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
});
