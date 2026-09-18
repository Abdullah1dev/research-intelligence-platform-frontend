import { apiClient } from "./client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}

export async function login(
  data: LoginRequest,
): Promise<AuthResponse> {
  return apiClient<AuthResponse>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function register(
  data: RegisterRequest,
): Promise<AuthResponse> {
  return apiClient<AuthResponse>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const token = localStorage.getItem(
    "access_token",
  );

  return apiClient<CurrentUser>(
    "/auth/me",
    {
      method: "GET",
      token: token ?? undefined,
    },
  );
}