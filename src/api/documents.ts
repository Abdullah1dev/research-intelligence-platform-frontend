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
  const token = localStorage.getItem("access_token");

  return apiClient<PaperDocument>(
    `/papers/${paperId}/document`,
    {
      method: "GET",
      token: token ?? undefined,
    },
  );
}

export async function uploadPaperDocument(
  paperId: number,
  file: File,
): Promise<PaperDocument> {
  const token = localStorage.getItem("access_token");

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `http://localhost:8000/papers/${paperId}/document`,
    {
      method: "POST",
      headers: {
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
      body: formData,
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      errorBody ||
        `Document upload failed: ${response.status}`,
    );
  }

  return response.json();
}