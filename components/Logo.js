import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const logoImage = require("./img/logo-color.png");

const Logo = () => {
  return (
    <View>
      <Image style={Styles.logo} source={logoImage} />
    </View>
  );
};

const Styles = StyleSheet.create({
  logo: {
    marginTop: -50,
    height: 125,
    width: 250,
    margin: 40,
    borderRadius: 10,
  },
});
export default Logo;
