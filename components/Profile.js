import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useEffect, useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../context";
import { deleteUser, updateUsers, getUsersByUsername } from "../api";

const medals = {
  bronze: require("./img/bronze-medal.png"),
  silver: require("./img/silver-medal.png"),
  gold: require("./img/gold-medal.png"),
};

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
  function calcPoints(medals) {
    const { gold, silver, bronze } = medals;
    return gold * 100 + silver * 50 + bronze * 25;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image src={user.avatar_URL} style={styles.avatar} />

        <Text style={styles.username}>{user.username}</Text>
        <Text>
          Joined {new Date(user.createdAt).toLocaleString().split(",")[0]}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#3FC1C0" }}>
          {calcPoints(user.achievements)} Points
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View style={styles.medalWrap}>
            <Image style={styles.medal} source={medals.gold} />
            <Text style={styles.medalNumber}>{user?.achievements?.gold}</Text>
          </View>
          <View style={styles.medalWrap}>
            <Image style={styles.medal} source={medals.silver} />
            <Text style={styles.medalNumber}>{user?.achievements?.gold}</Text>
          </View>
          <View style={styles.medalWrap}>
            <Image style={styles.medal} source={medals.bronze} />
            <Text style={styles.medalNumber}>{user?.achievements?.gold}</Text>
          </View>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#3FC1C0",
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
    height: 41,
  },
  medal: {
    height: 50,
    width: 50,
  },
  medalWrap: {
    flex: 1,
    flexDirection: "column",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  medalNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonWrap: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    position: "absolute",
    bottom: 20,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 1000,
    padding: 10,
    paddingHorizontal: 20,
    height: 41,
  },
});
