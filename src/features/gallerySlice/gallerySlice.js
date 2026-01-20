import { createSlice } from "@reduxjs/toolkit";
import { createGallery, deleteGallery, getAllGalleries, getSingleGallery, toggleGalleryStatus, updateGallery } from "../thunks/galleryThunk";

const gallerySlice = createSlice({
  name: "galleries",
  initialState: {
    gallery: [],              // list
    singleGallery: null,      // single item
    loading: false,
    errorMessage: null,
    successMessage: null,
  },

  reducers: {
    clearMessage: (state) => {
      state.errorMessage = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {

    // CREATE
    builder
      .addCase(createGallery.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(createGallery.fulfilled, (state, action) => {
        console.log("Create Gallery Slice Response: ", action.payload.data);
        state.loading = false;
        state.gallery.unshift(action.payload.data); // ✅ safe
        state.successMessage = action.payload.message;
      })
      .addCase(createGallery.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })

      // All Gallery
      .addCase(getAllGalleries.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllGalleries.fulfilled, (state, action) => {
        console.log("All Gallery Slice Response: ", action.payload);
        state.loading = false;
        state.gallery = action.payload; // ✅ FIXED
      })
      .addCase(getAllGalleries.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })

      // Get Single Gallery
      .addCase(getSingleGallery.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(getSingleGallery.fulfilled, (state, action) => {
        console.log("Single Gallery Slice Response: ", action.payload.data);
        state.loading = false;
        state.singleGallery = action.payload.data;
      })
      .addCase(getSingleGallery.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      // UPDATE
      .addCase(updateGallery.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(updateGallery.fulfilled, (state, action) => {
        console.log("Update Gallery Slice Response: ", action.payload.data);
        state.loading = false;
        state.singleGallery = action.payload.data;
        state.successMessage = action.payload.message;
      })

      // DELETE
      .addCase(deleteGallery.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteGallery.fulfilled, (state, action) => {
        console.log("Delete Gallery Slice Response: ", action.payload);
        state.loading = false;
        state.gallery = state.gallery.filter(
          (item) => item._id !== action.payload._id
        );
        state.successMessage = action.payload.message;
      })
      .addCase(deleteGallery.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })

      // Toggle Status
      .addCase(toggleGalleryStatus.pending, (state, action) => {
        state.pending = false;
      })
      .addCase(toggleGalleryStatus.fulfilled, (state, action) => {
        console.log("Gallery Status Payload: ", action.payload);
        if (!action.payload?._id) return;

        state.gallery = state.gallery.map((g) => g._id === action.payload._id ? action.payload : g);
      })
      .addCase(toggleGalleryStatus.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message || action.payload.data;
      });
  },
});

export const { clearMessage } = gallerySlice.actions;
export default gallerySlice.reducer;
