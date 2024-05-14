import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Task Management App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#1976d2",
    height: 60, // Adjust height as needed
    padding: 10,
    // Android
    elevation: 3,
    // iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff", // Text color
  },
});

export default Header;
