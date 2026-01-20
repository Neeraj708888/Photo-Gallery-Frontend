import { createSlice } from "@reduxjs/toolkit";
import { createPhotos, deletePhotos, getAllPhotos, getSinglePhotos, updatePhotos } from "../thunks/photosThunk";




const photoSlice = createSlice({
    name: "photos",
    initialState: {
        photos: [],
        singlePhoto: null,

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
        // Create Collection
        builder
            .addCase(createPhotos.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addCase(createPhotos.fulfilled, (state, action) => {
                state.loading = false,
                    state.photos.unshift(action.payload.data);
                state.successMessage = action.payload.message;
            })
            .addCase(createPhotos.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })
            // Get Single Collection
            .addCase(getSinglePhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })
            // Get All Photos
            .addCase(getAllPhotos.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllPhotos.fulfilled, (state, action) => {
                console.log("Get All Photos Slice Response: ", action.payload);
                state.loading = false;
                state.photos = action.payload;
            })
            .addCase(getAllPhotos.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
            })

            // Update Collection
            .addCase(updatePhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.photos = state.gallery.map((item) => item._id === action.payload.data._id ? action.payload.data : item);

                state.successMessage = action.payload.message;
            })

            // Delete Collection
            .addCase(deletePhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.photos = state.photos.filter((item) => item._id !== action.payload.data._id);

                state.successMessage = action.payload.message;
            });
    }
},
)

export const { clearMessage } = photoSlice.actions;
export default photoSlice.reducer;