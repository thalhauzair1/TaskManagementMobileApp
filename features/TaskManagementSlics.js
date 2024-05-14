import { createSlice, nanoid } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a helper function to fetch tasks from AsyncStorage
const fetchTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('tasks');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch tasks from AsyncStorage:', e);
    return [];
  }
};

// Create a slice for task management
export const taskManagementSlice = createSlice({
  name: "taskManagement",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        dueDate: action.payload.dueDate.toString(),
        status: "Pending",
      };
      state.tasks.push(newTask);
      AsyncStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask: (state, action) => {
      console.log(state);
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      console.log(state.tasks + "state.tasks");
      AsyncStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const { id, title, description, dueDate, status } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.title = title;
        taskToUpdate.description = description;
        taskToUpdate.dueDate = dueDate;
        taskToUpdate.status = status;
        AsyncStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    updateStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.status = newStatus;
        AsyncStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
  // Implement extra reducers for initializing tasks from AsyncStorage
  extraReducers: (builder) => {
    builder.addCase('taskManagement/init', async (state) => {
      const tasks = await fetchTasks();
      state.tasks = tasks;
    });
  },
});

// Export the slice reducers and actions
export const { addTask, removeTask, updateTask, updateStatus } = taskManagementSlice.actions;

// Export the taskManagement slice reducer
export default taskManagementSlice.reducer;
