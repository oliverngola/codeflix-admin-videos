import {
  Action,
  combineReducers,
  configureStore,
  PreloadedState,
  ThunkAction,
} from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import { castMembersApiSlice } from "../features/cast/castMembersSlice";
import { categoriesApiSlice } from "../features/categories/categorySlice";
import { videosSlice } from "../features/videos/videoSlice";
import { genreSlice } from "../features/genre/genreSlice";
import { uploadReducer } from "../features/uploads/uploadSlice";
import { uploadQueue } from "../middleware/uploadQueue";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  // @ts-ignore
  [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  // @ts-ignore
  [castMembersApiSlice.reducerPath]: apiSlice.reducer,
  // @ts-ignore
  [genreSlice.reducerPath]: apiSlice.reducer,
  // @ts-ignore
  [videosSlice.reducerPath]: apiSlice.reducer,
  uploadSlice: uploadReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["uploads/addUpload, uploads/updateUpload"],
          ignoredPaths: ["uploadSlice.file"],
        },
      })
      .concat(uploadQueue.middleware)
      .concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
