import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

const initialState: ModalState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const selectIsOpen = (state: RootState) => state.modal.isOpen;

export const { setIsOpen } = modalSlice.actions;
export default modalSlice.reducer;

export interface ModalState {
  isOpen: boolean;
}