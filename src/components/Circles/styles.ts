import Animated from "react-native-reanimated";
import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
`;

export const ShapeContainer = styled(Animated.View)`
  width: 100px;
  height: 100px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const Circle = styled.View`
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 50px;
  background-color: ${(props) => props.color};
`;
