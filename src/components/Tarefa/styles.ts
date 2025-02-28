import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    backgroundColor: "#333333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
    marginTop: 30,
    borderRadius: 10
  },
  button: {},
  text: {
    width: "80%",
    fontSize: 16,
    color: "#ccc",
  },
  text2: {
    width: "80%",
    fontSize: 16,
    color: "#808080",
    textDecorationLine: "line-through"
  },
  textData: {
    fontSize: 10,
    color: "#808080",
    alignSelf: "flex-end"
  },
});
