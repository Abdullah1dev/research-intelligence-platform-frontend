import { apiClient } from "./client";

export interface Conversation {
  id: number;
  title: string | null;
  user_id: number;
  paper_id: number;
  created_at: string;
  updated_at: string;
}

export interface ConversationCreateRequest {
  paper_id: number;
  title?: string;
}

export interface ConversationMessageRequest {
  message: string;
}

export interface ConversationMessageResponse {
  conversation_id: number;
  paper_id: number;
  answer: string;
}

export async function getConversations(): Promise<
  Conversation[]
> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<Conversation[]>(
    "/conversations/",
    {
      method: "GET",
      token: token ?? undefined,
    },
  );
}

export async function getConversation(
  conversationId: number,
): Promise<Conversation> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<Conversation>(
    `/conversations/${conversationId}`,
    {
      method: "GET",
      token: token ?? undefined,
    },
  );
}

export async function createConversation(
  data: ConversationCreateRequest,
): Promise<Conversation> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<Conversation>(
    "/conversations/",
    {
      method: "POST",
      token: token ?? undefined,
      body: JSON.stringify(data),
    },
  );
}

export async function deleteConversation(
  conversationId: number,
): Promise<void> {
  const token = localStorage.getItem(
    "access_token",
  );

  await apiClient<void>(
    `/conversations/${conversationId}`,
    {
      method: "DELETE",
      token: token ?? undefined,
    },
  );
}

export async function sendMessage(
  conversationId: number,
  message: string,
): Promise<ConversationMessageResponse> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<ConversationMessageResponse>(
    `/conversations/${conversationId}/messages`,
    {
      method: "POST",
      token: token ?? undefined,
      body: JSON.stringify({
        message,
      }),
    },
  );
}