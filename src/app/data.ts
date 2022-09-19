import { RootState } from "./store";

export const selectIsLoaded = (state: RootState) => state.loaded;
export const selectIsLoading = (state: RootState) => state.loading;
export const selectAdjectives = (state: RootState) => state.adjectives;
export const selectNames = (state: RootState) => state.names;
