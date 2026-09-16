import { apiClient } from "./client";

export interface Paper {
  id: number;
  title: string;
  abstract: string;
  authors: string;
  publication_year: number;
  journal: string;
  doi: string;
  category: string;
  pdf_url: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

export interface PapersResponse {
  items: Paper[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface GetPapersParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  publication_year?: number;
  sort_by?: "title" | "publication_year" | "created_at";
  order?: "asc" | "desc";
}

export async function getPapers(
  params: GetPapersParams = {},
): Promise<PapersResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.category) {
    searchParams.set("category", params.category);
  }

  if (params.publication_year !== undefined) {
    searchParams.set(
      "publication_year",
      String(params.publication_year),
    );
  }

  if (params.sort_by) {
    searchParams.set("sort_by", params.sort_by);
  }

  if (params.order) {
    searchParams.set("order", params.order);
  }

  const query = searchParams.toString();

  const endpoint = query
    ? `/papers/?${query}`
    : "/papers/";

  const token = localStorage.getItem("access_token");

  return apiClient<PapersResponse>(endpoint, {
    method: "GET",
    token: token ?? undefined,
  });
}