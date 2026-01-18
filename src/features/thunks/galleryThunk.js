import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../components/api/axiosInstance";


// Create Gallery Thunk-Api 
export const createGallery = createAsyncThunk(
    "gallery/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                "/gallery/create",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            console.log("Create Gallery Thunk Response:", response?.data?.data);
            return response?.data?.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Internal error in gallery create"
            );
        }
    }
);

// Update Gallery Thunk-Api
export const updateGallery = createAsyncThunk("gallery/update", async ({ id, payload }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/gallery/update/${id}`, payload);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Internal error in update gallery");
    }
});

// Delete Gallery Think-Api
export const deleteGallery = createAsyncThunk("gallery/delete", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/gallery/delete/${id}`);

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Internal error in delete gallery");
    }
});

// Get All Gallery Thunk-Api 
export const getAllGalleries = createAsyncThunk(
    "gallery/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/gallery");
            console.log("All Gallery Thunk Response: ", response.data.data);

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Internal error in fetch gallery"
            );
        }
    }
);

// Get Single Gallery Thunk-Api
export const getSingleGallery = createAsyncThunk("single/gallery", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/gallery/${id}`);
        console.log("Single Gallery Thunk Response: ", response.data);

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Internal error in fetch single gallery");
    }
});

// Status Toggle
export const toggleGalleryStatus = createAsyncThunk('toggele/gallery', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch(`/gallery/status/${id}`);
        console.log("Gallery Status Thunk Response: ", response.data);

        return response.data;

    } catch (error) {
        console.log("Error in Gallery Thunk sattus: ", error);
        return rejectWithValue(error?.response?.data?.message || "Internal error in change status gallery");
    }
});


