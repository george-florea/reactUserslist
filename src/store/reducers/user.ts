import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../pages/Users/interfaces/IUser";

const initialState = {
  users: [] as IUser[],
  total: 0,
  skip: 0,
  limit: 30,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: any, action) {
      for (let key of Object.keys(action.payload)) {
        state[key] = action.payload[key];
      }
    },
    setSkip(state, action) {
      state.skip = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
