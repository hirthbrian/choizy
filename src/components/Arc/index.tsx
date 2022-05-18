import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { CIRCLE } from "./consts";
import { Props } from "./types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Arc = ({ size, strokeWidth, color, rotation, progress }: Props) => {
  const radius = (size - strokeWidth) / 2;
  const circumfrence = CIRCLE * radius;
  const halfSize = size / 2;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: radius * CIRCLE * ((100 - progress.value) / 100),
  }));

  const aes = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value - 90}deg` }],
  }));

  return (
    <AnimatedSvg width={size} height={size} style={aes}>
      <AnimatedCircle
        r={radius}
        cx={halfSize}
        cy={halfSize}
        stroke={color}
        strokeWidth={strokeWidth}
        animatedProps={animatedProps}
        origin={`${halfSize}, ${halfSize}`}
        strokeDasharray={`${circumfrence} ${circumfrence}`}
        strokeDashoffset={radius * CIRCLE * (100 - progress.value / 100)}
      />
    </AnimatedSvg>
  );
};

export default Arc;
