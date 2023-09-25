import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useMemo, useContext } from "react";
import { getUsersByUsername } from "../api";
import { useAuth } from "../context";
import Logo from "./Logo";
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
  const [username, setUsername] = useState("MrDEVastation");
  const { login } = useAuth();
  
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userExists = await getUsersByUsername(username);
      if (userExists) {
        login(username);
        navigation.navigate("MainPages");
      }
    } catch (error) {
      console.error("Error checking user", error);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Logo />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
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
        <TouchableOpacity
          onPress={() => navigation.navigate("HomePage")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
