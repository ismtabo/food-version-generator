import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./services/data";

export interface DataState {
  adjectives: string[];
  names: string[];
  loaded: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: DataState = {
  adjectives: [],
  names: [],
  loaded: false,
  loading: false,
  error: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.status === "ok") {
        const { adjectives, names } = payload.data;
        state.adjectives = adjectives;
        state.names = names;
      } else {
        state.error = true;
      }
    });
  },
});

export const { reset } = dataSlice.actions;
export default dataSlice.reducer;
