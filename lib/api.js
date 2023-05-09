// lib/api.js

export default async function fetchAPI(path) {
  const res = await fetch(path);
  const json = await res.json();
  return json;
}
