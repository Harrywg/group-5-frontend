import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import MapView, { Circle } from "react-native-maps";
import { View, StyleSheet, Text } from "react-native";
import { getPlaces } from "../api";
export default function Map(props) {
  const { specificLocation } = props;

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [places, setPlaces] = useState([]);

  //just for logging any location changes
  useEffect(() => console.log(currentLocation), [currentLocation]);

  const onPositionChange = (arg) => {
    console.log("position changed");
    const { coords } = arg;
    const { latitude, longitude } = coords;
    const newRegion = { ...currentLocation, latitude, longitude };
    if (coords) setCurrentLocation(newRegion);
    if (newRegion) mapRef.current.animateToRegion(newRegion, 0);
  };

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

  const mapRef = useRef(null);
  const circleRef = useRef(null);

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
      >
        {places.map(({ coordinates, _id }) => {
          const [latitude, longitude] = coordinates;
          return (
            <Circle
              key={_id}
              ref={circleRef}
              center={{
                latitude,
                longitude,
              }}
              radius={100}
              fillColor="blue"
            ></Circle>
          );
        })}
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
});
