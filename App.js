import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store.js";
import Main from "./Main.js";
export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
