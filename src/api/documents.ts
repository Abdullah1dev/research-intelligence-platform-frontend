import { apiClient } from "./client";

export interface PaperDocument {
  id: number;
  paper_id: number;
  file_name: string;
  file_size: number;
  mime_type: string;
  storage_key: string;
  processing_status: string;
  processing_error: string | null;
  created_at: string;
  updated_at: string;
}

export async function getPaperDocument(
  paperId: number,
): Promise<PaperDocument> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<PaperDocument>(
    `/papers/${paperId}/document`,
    {
      method: "GET",
      token: token ?? undefined,
    },
  );
}