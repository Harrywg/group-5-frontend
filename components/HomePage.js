import React, { useCallback, useMemo, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import mainStyles from "../styles/mainStyles";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, {
  useBottomSheetSpringConfigs,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

export default function HomePage() {
  const bottomSheetRef = useRef(null);
  const data = useMemo(
    () =>
      Array(20)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["10%", "50%"], []);
  const navigation = useNavigation();
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );
  const goToSinglePlace = () => {
    navigation.navigate("SinglePlace");
  };

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>HomePage</Text>
      <TouchableOpacity title="Go to SinglePlace" onPress={goToSinglePlace}>
        <Text style={mainStyles.text}>Single Place</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animationConfigs={animationConfigs}
        enableContentPanningGesture={true}
      >
        <View style={styles.contentContainer}>
          <Text>Swipe up for places 🎉</Text>
        </View>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {data.map(renderItem)}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
     },
  itemContainer: {
    padding: 7,
    margin: 2,
    backgroundColor: "#eee",
  },
});
