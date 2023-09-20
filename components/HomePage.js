import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
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
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["5%", "50%"], []);
  const navigation = useNavigation();


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
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animationConfigs={animationConfigs}
        enableContentPanningGesture={true}
      >
        <View style={styles.contentContainer}>
          <Text>Swipe up for places 🎉</Text>
        </View>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {places.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={styles.itemContainer}
              onPress={() => goToSinglePlace(place)}
            >
              <Text>{place.placeName}</Text>
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
