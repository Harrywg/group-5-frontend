import { useNavigation } from "@react-navigation/native";
import { Text, View, Button, Image } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useEffect } from "react";
import { getUsers } from "../api";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function Profile({ navigation }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUsers().then((res) => {
      setUserData(res[0]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          style={styles.avatar}
        />
        <Text style={styles.username}>{userData.username}</Text>
        <Text style={mainStyles.text}>
          Gold: {userData?.achievements?.gold}
        </Text>
        <Text style={mainStyles.text}>
          Silver: {userData?.achievements?.silver}
        </Text>
        <Text style={mainStyles.text}>
          Bronze: {userData?.achievements?.bronze}
        </Text>
        <Text style={mainStyles.text}>
          Joined {new Date(userData.createdAt).toLocaleString().split(",")[0]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#180131",
    height: "100%",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  profile: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    marginTop: 30,
  },
  username: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
});
