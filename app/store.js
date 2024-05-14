import { configureStore } from "@reduxjs/toolkit";
import TaskManagementSlics, { taskManagementSlice } from "../features/TaskManagementSlics.js";
export const store = configureStore({
  reducer: TaskManagementSlics,
});

//  Create a store using the configureStore function from the @reduxjs/toolkit package.
// Pass the taskManagementReducer as the reducer to the store.
// Export the store.