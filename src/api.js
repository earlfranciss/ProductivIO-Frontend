const BASE_URL = import.meta.env.VITE_API_URL;

async function http(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", 
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}), 
    },
    ...options,
  });

  const resClone = res.clone();

  if (!res.ok) {
    let errorBody;
    try {
      errorBody = await res.json();
    } catch {
      try {
        errorBody = await resClone.text();
      } catch {
        errorBody = null;
      }
    }

    const errorMessage =
      (errorBody && errorBody.message) ||
      (typeof errorBody === "string" ? errorBody : null) ||
      "API Error";

    const error = new Error(errorMessage);
    error.status = res.status;
    error.statusText = res.statusText;
    error.body = errorBody;
    throw error;
  }

  return res.status === 204 ? null : res.json();
}

export const api = {
  // --- Auth ---
  login: (credentials) =>
    http("/api/Auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  register: (credentials) =>
    http("/api/Auth/register", { method: "POST", body: JSON.stringify(credentials) }),
  validate: (token) =>
    http("/api/Auth/validate", {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // --- Tasks ---

  // --- Notes ---

  // --- Quiz ---

  // --- Flashcards ---

  // --- Pomodoro ---

}

