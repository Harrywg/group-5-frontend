import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context";
import { useRoute } from "@react-navigation/native";
export default function SubmittedGuess() {
  const route = useRoute();
  const { userLocation } = route.params;

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    console.log({ userLocation });
  }, []);

  if (!isLoading) {
    return <View></View>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Submitting...</Text>
    </View>
  );
}
