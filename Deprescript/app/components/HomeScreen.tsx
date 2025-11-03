import { Text, View, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={style.container}
      nativeID="container"
    >
      <Text nativeID="titulo">Deprescript</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    }
});

