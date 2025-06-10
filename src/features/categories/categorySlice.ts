import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { Results, Result } from "../../types/Category";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: null | string;
  created_at: null | string;
  updated_at: null | string;
}

const endpointUrl = "/categories";

const deleteCategoryMutation = (category: Category) => ({
  url: `${endpointUrl}/${category.id}`,
  method: "DELETE",
});

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({  
    getCategories: query<Results, void>({
      query: () => `${endpointUrl}`,
      providesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, {id: string}>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    })
  }),
});

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
    createCategory(state, action) {
      state.push(action.payload);
    },
    updadeCategory(state, action) {
      // Find the index of the category to update
      const index = state.findIndex(category => category.id === action.payload.id);
      // Update category on state 
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      // Find the index of the category to update
      const index = state.findIndex(category => category.id === action.payload.id);
      // Remove category from state
      state.splice(index, 1);
    }
  }
})


// Selectors
export const selectCategories = (state: RootState) => state.categories;
// select category by id
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find(category => category.id === id);
  return category || {
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: "",
    updated_at: "",
  }
}

export default categoriesSlice.reducer;
export const { createCategory, updadeCategory, deleteCategory } = categoriesSlice.actions;

export const { useGetCategoriesQuery, useDeleteCategoryMutation } = categoriesApiSlice;