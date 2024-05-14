import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../features/TaskManagementSlics";
import { MaterialIcons } from '@expo/vector-icons';

const AddTask = ({ task, visible, onClose }) => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    status:"Pending",
    dueDate: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  // Function to handle input changes
  const handleInputChange = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!input.title || !input.description) {
      alert("Please fill in all fields");
      return;
    }

    const serializedDueDate = input.dueDate.toISOString(); 
    if (task) {
      dispatch(updateTask({ id: task.id, ...input, dueDate: serializedDueDate, status: task.status}));
    } else {
      dispatch(addTask({...input, dueDate: serializedDueDate}));
    }
    setInput({ title: "", description: "", dueDate: new Date() });
    onClose();
  };

  // Function to handle date change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    // Check if a date is selected
    if (selectedDate) {
      setInput({ ...input, dueDate: selectedDate });
    }
  };

  // Function to format the date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options.toString());
  };

  // Set input values when task prop changes
  useEffect(() => {
    if (task) {
      setInput({
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate),
      });
    }
  }, [task]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{task ? "Edit Task" : "Add Task"}</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={input.title}
          onChangeText={(text) => handleInputChange("title", text)}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          value={input.description}
          onChangeText={(text) => handleInputChange("description", text)}
          multiline
        />
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
          <MaterialIcons name="date-range" size={24} color="black" />
          <Text>{formatDate(input.dueDate)}</Text> 
        </TouchableOpacity>
        {showDatePicker && <DatePicker value={input.dueDate} mode="date" display="default" onChange={handleDateChange} />}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{task ? "Update Task" : "Add Task"}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  descriptionInput: {
    height: 100,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddTask;
