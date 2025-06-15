import { apiSlice } from "../api/apiSlice";
import { Results, Result, CastMemberParams, CastMember } from "../../types/CastMembers";

const endpointUrl = "/cast_members";

export const initialState: CastMember = {
  id: "",
  name: "",
  type: 0,
  created_at: "",
  updated_at: "",
  deleted_at: null,
}

function parseQueryParams(params: CastMemberParams): string {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.perPage) query.append("per_page", params.perPage.toString());
  if (params.search) query.append("search", params.search.toString());
  if (params.type) query.append("type", params.type.toString());
  return query.toString() ? `?${query.toString()}` : "";
}

function getCastMembers(params: CastMemberParams): string {
  const { page = 1, perPage = 10, search = "", type } = params;
  return `${endpointUrl}${parseQueryParams({ page, perPage, search, type })}`;
}

function deleteCastMember({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
}

function createCastMember(castMember: CastMember) {
  return {
    url: endpointUrl,
    method: "POST",
    body: castMember,
  };
}

function updateCastMember(castMember: CastMember) {
  return {
    url: `${endpointUrl}/${castMember.id}`,
    method: "PUT",
    body: castMember,
  };
}

function getCastMember({ id }: { id: string }): string {
  return `${endpointUrl}/${id}`;
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) =>  ({
    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),
    getCastMember: query<Result, { id: string }>({
      query: getCastMember,
      providesTags: ["CastMembers"],
    }),
    createCastMember: mutation<Result, CastMember>({
      query: createCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    updateCastMember: mutation<Result, CastMember>({
      query: updateCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    deleteCastMember: mutation<Result, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ["CastMembers"],
    }),
  })
});

export const {
  useGetCastMembersQuery,
  useGetCastMemberQuery,
  useCreateCastMemberMutation,
  useUpdateCastMemberMutation,
  useDeleteCastMemberMutation,
} = castMembersApiSlice;