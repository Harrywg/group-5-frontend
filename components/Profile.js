import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../context";
import { deleteUser, updateUsers } from "../api";

export default function Profile({ navigation }) {
  const { user } = useAuth();
  console.log(user, "USER");

  const handleLogout = () => {
    navigation.navigate("Login");
  };
  const handleDelete = async () => {
    try {
      const loggedInUser = user;
      console.log(loggedInUser._id, "LIU");
      const userDeleted = await deleteUser(loggedInUser._id);
      if (userDeleted) {
        console.log("User deleted");
        navigation.navigate("Login");
      } else {
        console.log("User deletion failed");
      }
    } catch (error) {
      console.error("Error deleting user", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  const handleEdit = async () => {};

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          style={styles.avatar}
        />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={mainStyles.text}>Gold: {user?.achievements?.gold}</Text>
        <Text style={mainStyles.text}>
          Silver: {user?.achievements?.silver}
        </Text>
        <Text style={mainStyles.text}>
          Bronze: {user?.achievements?.bronze}
        </Text>
        <Text style={mainStyles.text}>
          Joined {new Date(user.createdAt).toLocaleString().split(",")[0]}
        </Text>
        <TouchableOpacity onPress={handleLogout} style={""}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={""}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={""}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
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
  buttonText: {
    color: "black",
    fontWeight: "bold",
    borderWidth: 2,
    backgroundColor: "white",
    paddingLeft: 5,
    paddingRight: 5,
  },
});
