import { apiSlice } from "../api/apiSlice";
import { Results, Result, CategoryParams } from "../../types/Category";

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

export const initialState: Category = {
  id: "",
  name: "",
  description: "",
  is_active: false,
  deleted_at: null,
  created_at: "",
  updated_at: "",
}

const parseQueryParams = (params: CategoryParams) => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.perPage) query.append("per_page", params.perPage.toString());
  if (params.search) query.append("search", params.search);
  if (params.isActive !== undefined) query.append("is_active", params.isActive.toString());
  return query.toString() ? `?${query.toString()}` : "";
};

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = parseQueryParams({ page, perPage, search, isActive: true });
  return `${endpointUrl}${params}`;
}

function deleteCategory(category: Category){
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  }
}

function createCategory(category: Category) {
  return {
    url: endpointUrl,
    method: "POST",
    body: category,
  };
}

function updateCategory(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category,
  };
}

function getCategory({ id }: {id: string}) {
  return `${endpointUrl}/${id}`;
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({  
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategory: query<Result, {id: string}>({
      query: getCategory,
      providesTags: ["Categories"],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategory,
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, {id: string}>({
      query: deleteCategory,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategory,
      invalidatesTags: ["Categories"],
    })
  }),
});

export const { 
  useGetCategoriesQuery, 
  useGetCategoryQuery,
  useDeleteCategoryMutation, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation 
} = categoriesApiSlice;