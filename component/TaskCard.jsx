import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import AddTask from "./AddTask";
import { MaterialIcons } from '@expo/vector-icons';
import { removeTask, updateStatus } from "../features/TaskManagementSlics";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleStatusChange = (newStatus) => {
    dispatch(updateStatus({ taskId: task.id, newStatus }));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleArrowClick = (newStatus) => () => {
    handleStatusChange(newStatus);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
    dispatch(removeTask({ id: task.id }));
  };

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleArrowClick(getPreviousStatus(task.status))}>
            <MaterialIcons name="arrow-back" size={24} color={task.status === "Pending" ? "gray" : "black"} />
          </TouchableOpacity>
          <Text style={styles.title}>{task.title}</Text>
          <TouchableOpacity onPress={handleArrowClick(getNextStatus(task.status))}>
            <MaterialIcons name="arrow-forward" size={24} color={task.status === "Completed" ? "gray" : "black"} />
          </TouchableOpacity>
        </View>
        {isExpanded && (
          <View style={styles.content}>
            <Text style={styles.description}>{task.description}</Text>
            <Text style={styles.detail}>Due Date: {new Date(task.dueDate).toLocaleDateString()}</Text>
            <Text style={[styles.detail, { color: getStatusColor(task.status) }]}>Status: {task.status}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={handleEditClick} style={[styles.actionButton, { backgroundColor: "#1976D2" }]}>
                <Text style={{ color: "#fff" }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteClick} style={[styles.actionButton, { backgroundColor: "#D32F2F" }]}>
                <Text style={{ color: "#fff" }}>Delete</Text>
              </TouchableOpacity>
            </View>
            {isDeleteModalOpen && <DeleteModal task={task} handleDelete={handleDelete} handleClose={() => setIsDeleteModalOpen(false)} />}
            {isEditModalOpen && <AddTask task={task} onClose={() => setIsEditModalOpen(false)} />}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    marginTop: 10,
  },
  description: {
    marginBottom: 5,
  },
  detail: {
    marginBottom: 5,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

const getNextStatus = (currentStatus) => {
  switch (currentStatus) {
    case "Pending":
      return "InProgress";
    case "InProgress":
      return "Completed";
    default:
      return currentStatus;
  }
};

const getPreviousStatus = (currentStatus) => {
  switch (currentStatus) {
    case "Completed":
      return "InProgress";
    case "InProgress":
      return "Pending";
    default:
      return currentStatus;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "#FF5722"; // Orange
    case "InProgress":
      return "#FFC107"; // Yellow
    case "Completed":
      return "#4CAF50"; // Green
    default:
      return "#666";
  }
};

export default TaskCard;
