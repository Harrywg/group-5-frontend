import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import mainStyles from "../styles/mainStyles";
import { postPlace, getUsers } from "../api";
import Map from "./Map";
import { useAuth } from "../context";

export default function PostPlace() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [submittedImage, setSubmittedImage] = useState(false);
  const cameraRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [userData, setUserData] = useState({});

  const currentLocation = location;

  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData.coords);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const submitPicture = async () => {
    if (image) {
      try {
        setSubmittedImage(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePlaceSubmit = async () => {
    try {
      alert("Place submitted! 🎉");
      postPlace({
        placeName: `${user.username}'s Place`,
        coordinates: [location.latitude, location.longitude],
        creator: `${user.username}`,
        imgURL: image,
      });
      setSubmittedImage(false);
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!submittedImage) {
    return (
      <View style={styles.container}>
        {!image ? (
          <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef}
            flashMode={flash}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 30,
              }}
            >
              <Button
                title=""
                icon="retweet"
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              />
              <Button
                onPress={() =>
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  )
                }
                icon="flash"
                color={
                  flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"
                }
              />
            </View>
          </Camera>
        ) : (
          <Image source={{ uri: image }} style={styles.camera} />
        )}

        <View style={styles.controls}>
          {image ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 50,
              }}
            >
              <Button
                title="  Re-take"
                onPress={() => setImage(null)}
                icon="retweet"
              />
              <Button title="  Submit" onPress={submitPicture} icon="check" />
            </View>
          ) : (
            <Button
              title="  Take a picture"
              onPress={takePicture}
              icon="camera"
            />
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={formStyles.container}>
        <Text style={formStyles.title}>Post your place</Text>
        <Text style={formStyles.text}>{user.username}'s Place</Text>
        <Image source={{ uri: image }} style={formStyles.image} />
        <View style={formStyles.mapContainer}>
          <Map style={formStyles.map} currentLocation={currentLocation} />
        </View>
        <TouchableOpacity style={formStyles.button} onPress={handlePlaceSubmit}>
          <Button
            style={formStyles.button}
            onPress={handlePlaceSubmit}
            title="Post Place"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

function Button({ title, onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Entypo name={icon} size={28} color={color ? color : "#f1f1f1"} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
//camera stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  image: {
    width: 20,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 10,
  },
});

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
  text: {
    fontSize: 18,
    color: "black",
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 20,
  },
  button: {
    color: "#3FC1C0",
    marginTop: 20,
    backgroundColor: "#3FC1C0",
    fontWeight: 800,
    borderRadius: 1000,
    padding: 10,
    paddingHorizontal: 20,
    width: "auto",
    zIndex: 100,
  },
  mapContainer: {
    flex: 3,
    alignItems: "center",
    marginTop: 20,
    height: 250,
    width: 250,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
