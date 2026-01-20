
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../components/api/axiosInstance";


// Create Collection Thunk-Api 
export const createPhotos = createAsyncThunk("photos/create", async (payload, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("photos/create", payload);

        return response.data;

    } catch (error) {

        return rejectWithValue(error.response?.data?.message || "Internal error in photos create");

    }
});

// Update Collection Thunk-Api
export const updatePhotos = createAsyncThunk("photos/update", async ({ id, payload }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/photos/update/${id}`, payload);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Internal error in update photos");
    }
});

// Delete Collection Think-Api
export const deletePhotos = createAsyncThunk("photos/delete", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/photos/delete${id}`);

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Internal error in delete photos");
    }
});

// Get All Collection Thunk-Api 
export const getAllPhotos = createAsyncThunk("photos", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/photos");
        console.log("Photos thunk Response: ", response.data.data);
        return response.data.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Internal error in fetch photos");
    }
});

// Get Single Collection Thunk-Api
export const getSinglePhotos = createAsyncThunk("single/photos", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/photos/${id}`);
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Internal error in fetch single photos");
    }
});


