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

export interface CreatePaperRequest {
  title: string;
  abstract: string;
  authors: string;
  publication_year: number;
  journal: string;
  doi?: string;
  category: string;
}

export async function createPaper(
  data: CreatePaperRequest,
): Promise<any> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient(
    "/papers/",
    {
      method: "POST",
      token: token ?? undefined,
      body: JSON.stringify(data),
    },
  );
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
    searchParams.set(
      "sort_by",
      params.sort_by,
    );
  }

  if (params.order) {
    searchParams.set(
      "order",
      params.order,
    );
  }

  const query = searchParams.toString();

  const endpoint = query
    ? `/papers/?${query}`
    : "/papers/";

  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<PapersResponse>(
    endpoint,
    {
      method: "GET",
      token: token ?? undefined,
    },
  );
}

export async function getPaper(
  paperId: number,
): Promise<Paper> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<Paper>(
    `/papers/${paperId}`,
    {
      method: "GET",
      token: token ?? undefined,
    },
  );
}


// ==============================
// Ask Paper
// ==============================

export interface PaperAskSource {
  chunk_id: number;
  chunk_index: number;
  content: string;
  similarity_score: number;
}

export interface PaperAskResponse {
  paper_id: number;
  document_id: number;
  question: string;
  answer: string;
  sources: PaperAskSource[];
}

export async function askPaper(
  paperId: number,
  question: string,
): Promise<PaperAskResponse> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<PaperAskResponse>(
    `/papers/${paperId}/ask`,
    {
      method: "POST",
      token: token ?? undefined,
      body: JSON.stringify({
        question,
      }),
    },
  );
}


// ==============================
// Paper Summary
// ==============================

export interface PaperSummaryResponse {
  paper_id: number;
  document_id: number;
  summary: string;
}

export async function summarizePaper(
  paperId: number,
): Promise<PaperSummaryResponse> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<PaperSummaryResponse>(
    `/papers/${paperId}/summarize`,
    {
      method: "POST",
      token: token ?? undefined,
    },
  );
}


// ==============================
// Paper Analysis
// ==============================

export interface PaperAnalysis {
  research_domain: string;
  key_topics: string[];
  methodology: string;
  key_findings: string[];
  limitations: string;
  future_work: string;
}

export interface PaperAnalysisResponse {
  paper_id: number;
  document_id: number;
  analysis: PaperAnalysis;
}

export async function analyzePaper(
  paperId: number,
): Promise<PaperAnalysisResponse> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<PaperAnalysisResponse>(
    `/papers/${paperId}/analyze`,
    {
      method: "POST",
      token: token ?? undefined,
    },
  );
}


// ==============================
// Paper Recommendations
// ==============================

export interface PaperRecommendation {
  paperId?: string;
  title: string;
  authors?: {
    name: string;
  }[];
  year?: number;
  url?: string;
  abstract?: string;
  citationCount?: number;
}

export async function getPaperRecommendations(
  paperId: number,
): Promise<PaperRecommendation[]> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<PaperRecommendation[]>(
    `/papers/${paperId}/recommendations`,
    {
      method: "GET",
      token: token ?? undefined,
    },
  );
}