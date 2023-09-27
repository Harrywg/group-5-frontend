import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useEffect, useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../context";
import { deleteUser, updateUsers, getUsersByUsername } from "../api";

export default function Profile({ navigation }) {
  const { user, login } = useAuth();
  console.log(user, "USER");

  const handleLogout = () => {
    navigation.navigate("Login");
  };
  const handleDelete = async () => {
    try {
      const loggedInUser = user;
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
        <Text>
          Joined {new Date(user.createdAt).toLocaleString().split(",")[0]}
        </Text>
        <Text>Gold: {user?.achievements?.gold}</Text>
        <Text>Silver: {user?.achievements?.silver}</Text>
        <Text>Bronze: {user?.achievements?.bronze}</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  profile: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    marginTop: 30,
  },
  username: {
    fontWeight: "bold",
    fontSize: 30,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  button: {
    backgroundColor: "#3FC1C0",
    borderRadius: 1000,
    padding: 10,
    paddingHorizontal: 20,
  },
});
