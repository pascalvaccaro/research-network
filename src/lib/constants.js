export const API_DOMAIN = "https://social-network-api.osc-fr1.scalingo.io";
export const NAMESPACE_ID = "elmaestro";
export const API_URL = new URL("/" + NAMESPACE_ID, API_DOMAIN).toString();
export const API_TOKEN_NAME = "token-" + NAMESPACE_ID;
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok || data.success === false) {
    throw new ApiError(response.status, data.message);
  }
  return data;
}
