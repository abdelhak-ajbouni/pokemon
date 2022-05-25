import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pokemon from './slices/pokemon';
import modal from './slices/modal';

export const store = configureStore({
  reducer: {
    pokemon,
    modal
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
