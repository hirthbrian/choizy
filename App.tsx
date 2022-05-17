import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";

import { Main } from "./src/screens";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Main />
    </View>
  );
};

export default App;
