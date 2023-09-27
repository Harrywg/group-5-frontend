import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useMemo, useContext } from "react";
import { getUsersByUsername, postUsers, getUsers } from "../api";
import { useAuth } from "../context";
import Logo from "./Logo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [username, setUsername] = useState("");
  const [userExists, setUserExists] = useState(false);
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userData = await getUsersByUsername(username);
      if (userData) {
        login(userData);
        navigation.navigate("MainPages");
        setUserExists(true);
      } else {
        setUserExists(false);
      }
    } catch (error) {
      console.error("Error checking user", error);
    }
    setUserExists(false);
    setLoading(false);
  };

  const handleRegister = async () => {
    try {
      setRegisterLoading(true);
      const allUsers = await getUsers();
      const mappedUser = allUsers.map((user) => user.username);
      if (mappedUser.includes(newUser)) {
        console.error("Username already exists. Please choose another.");
        setUserExists(true);
      } else {
        setUserExists(false);
        const newUserObject = { username: newUser };
        await postUsers(newUserObject);
        const userData = await getUsersByUsername(newUser);
        if (userData) {
          login(userData);
          navigation.navigate("MainPages");
        }
      }
    } catch (error) {
      console.error("Error registering user", error);
      if (error.response.data) {
        console.error("Error response:", error.response.data);
      }
    }
    setRegisterLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#DBDBDB" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <Logo style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={userExists ? styles.inputError : styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          {loading ? (
            <Text style={styles.buttonText}>Logging In...</Text>
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="New Username"
          value={newUser}
          onChangeText={(text) => setNewUser(text)}
          style={userExists ? styles.inputError : styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.button, styles.buttonOutline]}
        >
          {registerLoading ? (
            <Text style={styles.buttonOutlineText}>Registering...</Text>
          ) : (
            <Text style={styles.buttonOutlineText}>Register</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "60%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  inputError: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "red",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3FC1C0",
    width: "100%",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 10,
    borderColor: "#3FC1C0",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#3FC1C0",
    fontWeight: "700",
    fontSize: 16,
  },
});
