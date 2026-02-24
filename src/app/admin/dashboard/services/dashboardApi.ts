import { DashboardSummary } from "@/interfaces/dashboardSummary";
import { apiFetch } from "@/utils/admin-client";
import { getApiUrl, API_ENDPOINTS } from "@/lib/api-client";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return apiFetch<DashboardSummary>(getApiUrl(API_ENDPOINTS.DASHBOARD_SUMMARY));
}
