import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counter-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
