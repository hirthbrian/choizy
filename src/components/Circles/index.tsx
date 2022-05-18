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
      scale.value = 1;
      rotation.value = withTiming(360, { duration: 1000 });
      progress.value = withTiming(100, { duration: 1000 });
      scale.value = withRepeat(withTiming(1.1, { duration: 500 }), -1, true);
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
      const toZero = () => withTiming(0, { duration: 700 });

      scale.value = toZero();
      opacity.value = toZero();
      rotation.value = toZero();
      progress.value = toZero();
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
            size={110}
            color={color}
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
