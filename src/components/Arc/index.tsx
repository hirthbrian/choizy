import { useEffect } from "react";
import Animated, {
  withTiming,
  useSharedValue,
  useDerivedValue,
  useAnimatedProps,
  withRepeat,
} from "react-native-reanimated";
import Svg, { Path, Circle } from "react-native-svg";

import { Props } from "./types";
import { makeArcPath, degreesToRadians } from "./utils";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Arc = ({ startAngle, endAngle, size, strokeWidth, color }: Props) => {
  const theta = useSharedValue(2 * Math.PI);

  const path = makeArcPath(
    strokeWidth / 2,
    strokeWidth / 2,
    degreesToRadians(startAngle),
    degreesToRadians(endAngle),
    size / 2 - strokeWidth / 2
  );

  const innerRadius = size / 2 - strokeWidth / 2;
  const circumfrence = 2 * Math.PI * innerRadius;

  const invertedCompletion = (percentage: number) => (100 - percentage) / 100;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: withRepeat(
      withTiming(theta.value * innerRadius, { duration: 500 }),
      -1,
      true
    ),
  }));

  useEffect(() => {
    theta.value = 2 * Math.PI * invertedCompletion(80);
  }, []);

  return (
    <Svg width={size} height={size}>
      <AnimatedCircle
        cx={size / 2}
        cy={size / 2}
        r={innerRadius}
        stroke={color}
        strokeDasharray={`${circumfrence} ${circumfrence}`}
        strokeWidth={strokeWidth}
        strokeDashoffset={2 * Math.PI * (innerRadius * 0.5)}
        strokeLinecap="round"
        animatedProps={animatedProps}
      />
      {/* <Animated.View>
        <Path
          d={path}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
        />
      </Animated.View> */}
    </Svg>
  );
};

export default Arc;
