import React from "react";
import { View, Text } from "react-native";
import Loading from "../../../assets/animations/24337-law.json";
import LottieView from "lottie-react-native";

export default ({ width, height, style }) => {
  return (
    <View style={style}>
      <LottieView
        style={{
          width: width,
          height: height,
        }}
        resizeMode="contain"
        autoPlay
        loop
        source={Loading}
      />
    </View>
  );
};
