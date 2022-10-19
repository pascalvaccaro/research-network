import { API_URL, handleResponse } from "./constants";
import { authenticate } from "./auth";

export async function getPosts(page = 0, limit = 20) {
  const response = await fetch(`${API_URL}/posts?page=${page}&limit=${limit}`);
  return handleResponse(response);
}

export async function createPost(newPost) {
  const options = authenticate({
    method: "POST",
    body: JSON.stringify(newPost),
  });
  const response = await fetch(API_URL + "/post", options);
  return handleResponse(response);
}

export async function addLike(postId) {
  const options = authenticate({
    method: "POST",
    body: JSON.stringify({ postId }),
  });
  const response = await fetch(API_URL + "/post/like", options);
  return handleResponse(response);
}

export async function addComment(postId, content) {
  const options = authenticate({
    method: "POST",
    body: JSON.stringify({ postId, content }),
  });
  const response = await fetch(API_URL + "/post/comment", options);
  return handleResponse(response);
}
