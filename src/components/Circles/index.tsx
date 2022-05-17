import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  withRepeat,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import Arc from "../Arc";
import { Container, Circle } from "./styles";

const Circles = ({ color }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const translate = useSharedValue({ x: 0, y: 0 });

  const dragGesture = Gesture.Pan()
    .onBegin((e) => {
      opacity.value = 1;
      scale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true);
      translate.value = {
        x: e.absoluteX - 50,
        y: e.absoluteY - 50,
      };
    })
    .onUpdate((e) => {
      translate.value = {
        x: e.absoluteX - 50,
        y: e.absoluteY - 50,
      };
    })
    .onFinalize(() => {
      opacity.value = 0;
      scale.value = 1;
    });

  const aes = useAnimatedStyle(() => ({
    // opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateX: translate.value.x / scale.value },
      { translateY: translate.value.y / scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={dragGesture}>
      <Container>
        <Arc
          color="red"
          size={130}
          startAngle={0}
          endAngle={350}
          strokeWidth={10}
        />
        {/* <Circle color={"blue"} style={aes} /> */}
      </Container>
    </GestureDetector>
  );
};

export default Circles;
