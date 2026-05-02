const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Something went wrong.');
  }

  return payload;
}

export const api = {
  getMenu: () => request('/menu'),
  getTestimonials: () => request('/testimonials'),
  getGallery: () => request('/gallery'),
  createReservation: (data) =>
    request('/reservations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  createContactMessage: (data) =>
    request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
