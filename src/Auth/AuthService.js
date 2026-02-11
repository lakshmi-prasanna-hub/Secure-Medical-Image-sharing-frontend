import api from '../components/api';

export const login = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('user', res.data.user);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const signup = async (formData) => {
  try {
    const res = await api.post('/auth/signup', formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const refreshAccessToken = async () => {
  try {
    const res = await api.post('/auth/');
    localStorage.setItem('accessToken', res.data.accessToken);
    return res.data.accessToken;
  } catch (err) {
    console.error('Refresh token failed', err);
    throw err;
  }
};

export const logout = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    await api.post('/auth/logout', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.error("Logout API failed:", err);
  } finally {
    localStorage.removeItem('accessToken');
  }
};

// Axios Interceptor Setup (token refresh logic)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        logout();
      }
    }
    return Promise.reject(error);
  }
);
