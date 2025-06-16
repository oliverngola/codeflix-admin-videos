import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import { categoriesApiSlice } from '../features/categories/categorySlice';
import { castMembersApiSlice } from '../features/cast/castMembersSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // @ts-ignore
    [categoriesApiSlice.reducerPath]: apiSlice.reducer,
    // @ts-ignore
    [castMembersApiSlice.reducerPath]: castMembersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
