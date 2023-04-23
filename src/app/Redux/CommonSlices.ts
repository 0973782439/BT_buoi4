import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAlbum } from "../../interface/IAlbum";
interface CommonState {
  isLoading: boolean;
  dataAlbum: IAlbum[];
  editableItemIds: [];
  editedTitles: {};
  confirmUpdateDisabled: boolean;
  resetDisabled: boolean;
}
const initialState: CommonState = {
  isLoading: false,
  dataAlbum: [],
  editableItemIds: [],
  editedTitles: {},
  confirmUpdateDisabled: true,
  resetDisabled: true,
};
export const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    displayLoading: (state, actions: PayloadAction) => {
      state.isLoading = true;
    },
    hideLoading: (state, actions: PayloadAction) => {
      state.isLoading = false;
    },
    fetchData: (state, actions: PayloadAction<any>) => {},
    setData: (state, actions: PayloadAction<IAlbum[]>) => {
      state.dataAlbum = actions.payload;
    },
    // editData: (state, actions: PayloadAction<IAlbum>) => {
    //   const test = actions.payload;
    //   const tests = [...state.dataAlbum, test];
    //   state.dataAlbum = tests;
    //   console.log(tests);
    // },

    updateData: (state, action) => {
      const { id, title } = action.payload;
      const index = state.dataAlbum.findIndex((data) => data.id === id);
      if (index !== -1) {
        state.dataAlbum[index].title = title;
      }
    },
    resetData: (state, action) => {
      const { id, title } = action.payload;
      const index = state.dataAlbum.findIndex((data) => data.id === id);
      if (index !== -1) {
        // state.dataAlbum[index].title = title;
      }
    },
  },
});
export const CommonActions = CommonSlice.actions;
export default CommonSlice.reducer;
