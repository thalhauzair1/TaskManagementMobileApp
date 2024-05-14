import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AddTask from "./component/AddTask";
import TaskCard from "./component/TaskCard";
import Header from "./component/Header";
import { useSelector } from "react-redux";

const Main = () => {
  const tasks = useSelector((state) => state.tasks);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "pending", title: "Pending" },
    { key: "inProgress", title: "In Progress" },
    { key: "completed", title: "Completed" },
  ]);

  // Filter tasks based on status
  const pendingTasks = tasks.filter((task) => task.status === "Pending");
  const inProgressTasks = tasks.filter((task) => task.status === "InProgress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  const onClose = () => {
    setVisible(false);
  };

  const renderScene = SceneMap({
    pending: () => (
      <View style={styles.scene}>
        {pendingTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </View>
    ),
    inProgress: () => (
      <View style={styles.scene}>
        {inProgressTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </View>
    ),
    completed: () => (
      <View style={styles.scene}>
        {completedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </View>
    ),
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.topRow}>
        <Button title="Add Task" onPress={() => setVisible(true)} />
        {visible && <AddTask visible={visible} onClose={onClose} />}
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#FFFFFF",
  },
  indicator: {
    backgroundColor: "#007AFF",
  },
  label: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Main;
