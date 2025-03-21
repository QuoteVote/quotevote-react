import { ActivityItem, ApiResponse, PaginatedResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchActivities(): Promise<ActivityItem[]> {
  const response = await fetchWithAuth('/activities');
  return response.data;
}

export async function fetchPaginatedActivities(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<ActivityItem>> {
  const response = await fetchWithAuth(
    `/activities?page=${page}&limit=${limit}`
  );
  return response;
}

export async function createActivity(data: Partial<ActivityItem>): Promise<ActivityItem> {
  const response = await fetchWithAuth('/activities', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function updateActivity(
  id: string,
  data: Partial<ActivityItem>
): Promise<ActivityItem> {
  const response = await fetchWithAuth(`/activities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function deleteActivity(id: string): Promise<ApiResponse<null>> {
  const response = await fetchWithAuth(`/activities/${id}`, {
    method: 'DELETE',
  });
  return response;
} 