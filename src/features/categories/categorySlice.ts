import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: null | string;
  created_at: null | string;
  updated_at: null | string;
}

const category: Category = {
  id: "1cb2f8c-4d3e-4f5a-8b1c-9e0f1a2b3c4d",
  name: "Olive",
  description: "A small, oval fruit with a hard pit and a smooth, oily flesh.",
  is_active: true,
  deleted_at: null,
  created_at:  new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const initialState = [
   category,
  {...category, id: "2cb2f8c-4d3e-4f5a-8b1c-9e0f1a2b3c4d", name: "Apple" },
  {...category, id: "3cb2f8c-4d3e-4f5a-8b1c-9e0f1a2b3c4d", name: "Banana" },
  {...category, id: "4cb2f8c-4d3e-4f5a-8b1c-9e0f1a2b3c4d", name: "Cherry" },
  {...category, id: "5cb2f8c-4d3e-4f5a-8b1c-9e0f1a2b3c4d", name: "Date" },
]

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory(state, action) {},
    updadeCategory(state, action) {},
    deleteCategory(state, action) {}
  }
})


// Selectors
export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;