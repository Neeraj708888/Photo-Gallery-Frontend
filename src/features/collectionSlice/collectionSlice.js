import { createSlice } from "@reduxjs/toolkit";
import { createCollections, deleteCollections, getAllcollections, getSingleCollection, toggleCollectionStatus, updateCollections } from "../thunks/collectionThunk";


const collectionSlice = createSlice({
    name: "collections",
    initialState: {
        collections: [],
        singleCollection: null,

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
            .addCase(createCollections.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addCase(createCollections.fulfilled, (state, action) => {
                console.log("Create Collection Payload: ", action.payload.data);
                state.loading = false,
                    state.collections.unshift(action.payload.data);
                state.successMessage = action.payload.message;
            })
            .addCase(createCollections.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })
            // Get Single Collection
            .addCase(getSingleCollection.pending, (state, action) => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addCase(getSingleCollection.fulfilled, (state, action) => {
                console.log("Single Collection Payload: ", action.payload);
                state.loading = false;
                state.singleCollection = action.payload;
            })
            .addCase(getSingleCollection.rejected, (state, action) => {
                state.loading = false;
                state.singleCollection = null;
                state.errorMessage = action.payload;
            })

            // Get ALl Collection
            .addCase(getAllcollections.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllcollections.fulfilled, (state, action) => {
                console.log("All Collection Payload: ", action.payload.data);
                state.loading = false;
                state.collections = action.payload?.data || [];
            })
            .addCase(getAllcollections.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })
            // Update Collection
            .addCase(updateCollections.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateCollections.fulfilled, (state, action) => {
                console.log("Update Collection Payload: ", action.payload);
                state.loading = false;
                state.collections = state.collections.map((item) => item._id === action.payload._id ? action.payload : item);

                state.successMessage = action.payload.message;
            })
            .addCase(updateCollections.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })

            // Delete Collection
            .addCase(deleteCollections.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteCollections.fulfilled, (state, action) => {
                console.log("Delete Collection Payload: ", action.payload);
                state.loading = false;
                state.collections = state.collections.filter((item) => item._id !== action.payload.data);

                state.successMessage = action.payload.message;
            })
            .addCase(deleteCollections.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })

            // Toggle Status
            .addCase(toggleCollectionStatus.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(toggleCollectionStatus.fulfilled, (state, action) => {
                console.log("Collection Status Payload: ", action.payload);
                state.loading = false;
                if (!action.payload?._id) return;

                state.collections = action.collections.map(item => item._id === action.payload._id ? action.payload : item);

                state.successMessage = action.payload;
            })
            .addCase(toggleCollectionStatus.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            });
    }
},
)

export const { clearMessage } = collectionSlice.actions;
export default collectionSlice.reducer;