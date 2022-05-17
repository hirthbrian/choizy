import Animated from "react-native-reanimated";
import styled from "styled-components";

export const Container = styled.View`
  /* top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute; */
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Circle = styled(Animated.View)`
  width: 100px;
  height: 100px;
  position: absolute;
  border-radius: 50px;
  background-color: ${(props) => props.color};
`;
