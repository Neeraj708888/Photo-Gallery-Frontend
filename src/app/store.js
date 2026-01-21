import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/adminSlices/adminSlice.js"; // ← Use adminSlice, not gallerySlice
import collectionReducer from "../features/collectionSlice/collectionSlice.js";
import galleryReducer from "../features/gallerySlice/gallerySlice.js";
import photosReducer from "../features/photoSlice/photoSlice.js";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    collections: collectionReducer,
    galleries: galleryReducer,
    photos: photosReducer,


  },
});

export default store;
