import { API_URL, API_TOKEN_NAME, handleResponse } from "./constants";

export const isLoggedIn = () => !!localStorage.getItem(API_TOKEN_NAME);
export const authenticate = (options = {}) => {
  options.headers = options.headers || {};
  options.headers["Content-Type"] = "application/json";
  if (isLoggedIn()) {
    options.headers.Authorization =
      "bearer " + localStorage.getItem(API_TOKEN_NAME);
  }
  return options;
};

export async function login(credentials = {}) {
  const response = await fetch(API_URL + "/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await handleResponse(response);
  localStorage.setItem(API_TOKEN_NAME, data.token);
  return data.success;
}

export async function register(credentials) {
  const response = await fetch(API_URL + "/register", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await handleResponse(response);
  return data.success;
}

