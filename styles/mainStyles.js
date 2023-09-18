import { StyleSheet } from "react-native";

const mainColour = "#180131";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColour,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
  profile: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: "flex-end",
    marginTop: -5,
    position: "absolute",
  },
});
