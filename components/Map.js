import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import MapView, { Circle, Marker } from "react-native-maps";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import markerImage from "../assets/marker.png";
import { getPlaces } from "../api";
import { useAuth } from "../context";

export default function Map(props) {
  const {
    specificLocation,
    currentLocation,
    setCurrentLocation,
    onPositionChange,
    mapRef,
    placeCoords,
    calculateDistance,
    selectedPlace,
  } = props;

  const [places, setPlaces] = useState([]);
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const { user } = useAuth();

  //just for logging any location changes
  useEffect(() => console.log(user, "USER"), []);

  useEffect(() => {
    if (specificLocation) return;
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
  };

  const returnToCurrentLocation = () => {
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
        {places.map(({ coordinates, _id }) => {
          const [latitude, longitude] = coordinates;
          return (
            <Circle
              key={_id}
              center={{
                latitude,
                longitude,
              }}
              radius={600}
              fillColor="rgba(63, 193, 192, 0.5)"
            />
          );
        })}

        {selectedPlace && (
          <Circle
            center={{
              latitude: selectedPlace.coordinates[0],
              longitude: selectedPlace.coordinates[1],
            }}
            radius={600}
            fillColor="rgba(63, 193, 192, 0.5)"
          />
        )}

        {currentLocation && (
          <Marker coordinate={currentLocation} anchor={currentLocation}>
            <Image src={user.avatar_URL} style={styles.marker} />
          </Marker>
        )}
      </MapView>
      {userHasScrolled && (
        <TouchableOpacity
          onPress={returnToCurrentLocation}
          style={styles.returnButton}
        >
          <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>
      )}
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
    textAlign: "center",
  },
  returnButton: {
    position: "absolute",
    top: "10%",
    left: "30%",
    zIndex: 1000,
    height: 50,
    width: 100,
    backgroundColor: "#3FC1C0",
    justifyContent: "center",
    borderRadius: 1000,
  },
  marker: {
    width: 50,
    height: 50,
    borderRadius: 1000,
    backgroundColor: "#3FC1C0",
    borderColor: "white",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
//tryng to show merge