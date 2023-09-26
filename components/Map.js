import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import MapView, { Circle } from "react-native-maps";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { getPlaces } from "../api";

export default function Map(props) {
  const {
    specificLocation,
    currentLocation,
    setCurrentLocation,
    onPositionChange,
    mapRef,
    placeCoords,
    calculateDistance,
  } = props;

  const [places, setPlaces] = useState([]);
  const [userHasScrolled, setUserHasScrolled] = useState(false);

  //just for logging any location changes
  useEffect(() => console.log(currentLocation), [currentLocation]);

  useEffect(() => {
    if (specificLocation) return;
    console.log("effect");
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status !== "granted") throw new Error("permission not granted");
        return Location.watchPositionAsync(
          { enableHighAccuracy: true },
          onPositionChange
        );
      })
      .catch(console.warn);

    getPlaces().then(setPlaces);
  }, []);

  const circleRef = useRef(null);

  const handleRegionChangeComplete = (region) => {
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      region.latitude,
      region.longitude
    );

    if (distance > 1) {
      setUserHasScrolled(true);
    } else {
      setUserHasScrolled(false);
    }

    console.log("Scrolled away:", userHasScrolled);
  };

  const returnToCurrentLocation = () => {
    console.log("Return to current location button pressed");
    mapRef.current.animateToRegion(currentLocation, 500);
    setUserHasScrolled(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={
          !specificLocation
            ? {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
            : specificLocation
        }
        scrollEnabled={specificLocation ? false : true}
        zoomEnabled={specificLocation ? false : true}
        style={{ height: "100%", aspectRatio: "1/1" }}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {userHasScrolled ? (
          <TouchableOpacity
            onPress={returnToCurrentLocation}
            style={styles.returnButton}
          >
            <Text style={styles.text}>Return</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {places.map(({ coordinates, _id }) => {
          const [latitude, longitude] = coordinates;
          return (
            <Circle
              key={_id}
              center={{
                latitude,
                longitude,
              }}
              radius={100}
              fillColor="blue"
            />
          );
        })}

        {currentLocation && (
          <Circle
            center={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            radius={10}
            fillColor="green"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
  },
  text: {
    color: "white",
  },
  returnButton: {
    position: "absolute",
    top: "10%",
    left: "30%",
    zIndex: 1000,
    height: 50,
    width: 100,
    backgroundColor: "blue",
    justifyContent: "center",
  },
});
