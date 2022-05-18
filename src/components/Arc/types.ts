import { SharedValue } from "react-native-reanimated";

export interface Props {
  size: number;
  strokeWidth: number;
  color: string;
  rotation: SharedValue<number>;
  progress: SharedValue<number>;
}
