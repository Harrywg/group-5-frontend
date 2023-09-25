import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import mainStyles from "../styles/mainStyles";
import { postPlace, getUsers } from "../api";

export default function PostPlace() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [submittedImage, setSubmittedImage] = useState(false);
  const cameraRef = useRef(null);
  const [placeName, setPlaceName] = useState(null);
  const [location, setLocation] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUsers().then((res) => {
      setUserData(res[0]);
    });
  }, []);

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
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const submitPicture = async () => {
    if (image) {
      try {
        setSubmittedImage(true);
        console.log("saved successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePlaceSubmit = async () => {
    try {
      alert("Place submitted! 🎉");
      console.log(image, "image");
      postPlace({
        placeName: placeName,
        coordinates: [location.latitude, location.longitude],
        creator: "DevUser1",
        imgURL: image,
      });
      setSubmittedImage(false);
      setImage(null);
    } catch (error) {
      console.log(error);
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
                title="Re-take"
                onPress={() => setImage(null)}
                icon="retweet"
              />
              <Button title="Submit" onPress={submitPicture} icon="check" />
            </View>
          ) : (
            <Button
              title="Take a picture"
              onPress={takePicture}
              icon="camera"
            />
          )}
        </View>
      </View>
    );
  } else {
    console.log(image, "image");
    return (
      <View style={formStyles.container}>
        <Text style={formStyles.title}>Post your place</Text>
        <Text style={formStyles.text}>{userData.username}'s Place</Text>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity style={formStyles.button} onPress={handlePlaceSubmit}>
          <Button title="Post Place" />
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
    marginLeft: 10,
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
    width: 200,
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
    alignItems: "center", // Center the content horizontally
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    padding: 16, // Increased padding for better spacing
  },
  title: {
    fontSize: 32, // Larger font size for the title
    fontWeight: "bold",
    color: "#3FC1C0", // White text color
    marginBottom: 10, // Add spacing between title and text
  },
  text: {
    fontSize: 18, // Smaller font size for the text
    color: "#3FC1C0", // White text color
    marginBottom: 20, // Add spacing between text and image
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20, 
  },
  button: {
    color: "#3FC1C0",
    backgroundColor: "#3FC1C0",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
