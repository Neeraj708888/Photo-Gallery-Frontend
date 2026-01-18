export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_URL = `${BASE_URL}/api`;

console.log("API Base URL:", BASE_URL);

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_URL}/auth/register`,
    LOGIN: `${API_URL}/auth/login`,
    LOGOUT: `${API_URL}/auth/logout`,
  },

  COLLECTIONS: {
    CREATE: `${API_URL}/collections/create`,
    UPDATE: (collectionId) => `${API_URL}/collections/update/${collectionId}`,
    DELETE: (collectionId) => `${API_URL}/collections/delete/${collectionId}`,
    SATATUS: (collectionId) => `${API_URL}/collections/status/${collectionId}`,
    SEARCH: `${API_URL}/collections/search`,
    SINGLE: (collectionId) => `${API_URL}/collections/${collectionId}`,
    ALL: `${API_URL}/collections`,

  },

  GALLERY: {
    CREATE: `${API_URL}/gallery/create`,
    UPDATE: (galleryId) => `${API_URL}/gallery/update/${galleryId}`,
    DELETE: (galleryId) => `${API_URL}/gallery/delete/${galleryId}`,
    SATATUS: (galleryId) => `${API_URL}/gallery/status/${galleryId}`,
    SEARCH: `${API_URL}/collections/search`,
    SINGLE: (galleryId) => `${API_URL}/gallery/${galleryId}`,
    ALL: `${API_URL}/gallery`,
    READ: `${API_URL}/gallery/create`,
  },

  PHOTOS: {
    CREATE: `${API_URL}/photos/create`,
    UPDATE: (photoId) => `${API_URL}/photos/update/${photoId}`,
    DELETE: (photoId) => `${API_URL}/photos/delete/${photoId}`,
    SATATUS: (photoId) => `${API_URL}/photos/status/${photoId}`,
    SEARCH: `${API_URL}/collections/search`,
    SINGLE: (photoId) => `${API_URL}/photos/${photoId}`,
    ALL: `${API_URL}/photos`,
    READ: `${API_URL}/photos/create`,
  },
};
