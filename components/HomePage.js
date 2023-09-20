import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useNavigation } from "@react-navigation/native";
import SinglePlace from "./SinglePlace";
import SwipeUpDown from "react-native-swipe-up-down";
import Map from "./Map";

export default function HomePage() {
  const navigation = useNavigation();

  const goToSinglePlace = () => {
    navigation.navigate("SinglePlace");
  };

  return (
    <View style={mainStyles.container}>
      <Map />
      <Text style={mainStyles.text}>HomePage</Text>
      <TouchableOpacity title="Go to SinglePlace" onPress={goToSinglePlace}>
        <Text style={mainStyles.text}>Single Place</Text>
      </TouchableOpacity>
      {/* <SwipeUpDown
        itemMini={(show) => <ItemFull show={show} />}
        itemFull={(hide) => <ItemFull hide={hide} />}
        onShowMini={() => console.log("mini")}
        onShowFull={() => console.log("full")}
        animation="spring"
        disableSwipeIcon
        extraMarginTop={100}
        iconColor="yellow"
        iconSize={30}
        style={{ backgroundColor: "#000" }} // style for swipe
      /> */}
    </View>
  );
}
