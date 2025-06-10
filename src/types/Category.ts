export interface Results {
  meta: Meta;
  links: Links;
  data: Category[];
}

export interface Result {
  data: Category;
  meta: Meta;
  links: Links;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface Meta {
  to: number;
  from: number;
  path: string;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
}

export interface Links {
  first: string;
  last: string;
  prev:  null;
  next: string;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}
