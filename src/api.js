const BASE_URL = process.env.REACT_APP_API_URL;

async function http(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
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

    const error = new Error("API Error");
    error.status = res.status;
    error.statusText = res.statusText;
    error.body = errorBody;
    throw error;
  }

  return res.status === 204 ? null : res.json();
}

export const api = {
    // --- Auth ---

    // --- Tasks ---

    // --- Notes ---

    // --- Quiz ---

    // --- Flashcards ---

    // --- Pomodoro ---
    
}

