import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  withRepeat,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import Arc from "../Arc";
import { Container, ShapeContainer, Circle } from "./styles";

const Circles = ({ color }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);
  const translate = useSharedValue({ x: 0, y: 0 });

  const dragGesture = Gesture.Pan()
    .onBegin((e) => {
      opacity.value = 1;
      rotation.value = withTiming(360, { duration: 1000 });
      progress.value = withTiming(100, { duration: 1000 });
      scale.value = withRepeat(withTiming(1.2, { duration: 500 }), -1, true);
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
      rotation.value = withTiming(0, { duration: 700 });
      progress.value = withTiming(0, { duration: 700 });
      // opacity.value = 0;
      scale.value = 1;
    });

  const aes = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateX: translate.value.x / scale.value },
      { translateY: translate.value.y / scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={dragGesture}>
      <Container>
        <ShapeContainer style={aes}>
          <Circle color={color} />
          <Arc
            color={color}
            size={110}
            strokeWidth={10}
            rotation={rotation}
            progress={progress}
          />
        </ShapeContainer>
      </Container>
    </GestureDetector>
  );
};

export default Circles;
