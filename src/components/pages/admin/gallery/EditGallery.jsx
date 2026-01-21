import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

import {
  getSingleGallery,
  updateGallery,
} from "../../../../features/thunks/galleryThunk";
import { getAllcollections } from "../../../../features/thunks/collectionThunk";

export default function EditGallery() {
  const { galleryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleGallery, loading } = useSelector(
    (state) => state.galleries
  );
  const { collections = [] } = useSelector(
    (state) => state.collections
  );

  // Local State
  const [galleryName, setGalleryName] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [images, setImages] = useState([]); // existing + new
  const [focusedField, setFocusedField] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (galleryId) dispatch(getSingleGallery(galleryId));
    dispatch(getAllcollections());
  }, [dispatch, galleryId]);

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (singleGallery) {
      setGalleryName(singleGallery.galleryName || "");
      setCollectionId(singleGallery.collection?._id || "");

      // existing images as preview-only
      const existingImages =
        singleGallery.images?.map((img) => ({
          url: img.url,
          existing: true,
        })) || [];

      setImages(existingImages);
    }
  }, [singleGallery]);

  /* ================= IMAGE HANDLERS ================= */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      existing: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!galleryName || !collectionId) {
      alert("Gallery name & collection required");
      return;
    }

    const formData = new FormData();
    formData.append("galleryName", galleryName);
    formData.append("collection", collectionId);

    images.forEach((img) => {
      if (!img.existing && img.file) {
        formData.append("images", img.file);
      }
    });

    setSubmitting(true);

    dispatch(updateGallery({ id: galleryId, payload: formData }))
      .unwrap()
      .then(() => {
        setSubmitting(false);
        navigate("/admin/gallery");
      })
      .catch(() => setSubmitting(false));
  };

  const inputWrapperClass = (field) =>
    `transition-shadow duration-200 rounded-lg p-1 ${focusedField === field
      ? "shadow-lg ring-2 ring-pink-300"
      : "shadow-sm"
    }`;

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-red-500 text-white rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-extrabold">Edit Gallery</h2>
        <p className="text-pink-100 mt-1">
          Update gallery details & images
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white rounded-2xl p-6 shadow-lg border space-y-6"
      >
        {/* Collection */}
        <label className="block">
          <span className="font-medium">Select Collection</span>
          <div className={inputWrapperClass("collection")}>
            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              onFocus={() => setFocusedField("collection")}
              onBlur={() => setFocusedField("")}
              className="w-full px-4 py-3 rounded-lg focus:outline-none"
            >
              <option value="">-- Select Collection --</option>
              {collections.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.collectionName}
                </option>
              ))}
            </select>
          </div>
        </label>

        {/* Gallery Name */}
        <label className="block">
          <span className="font-medium">Gallery Name</span>
          <div className={inputWrapperClass("galleryName")}>
            <input
              value={galleryName}
              onChange={(e) => setGalleryName(e.target.value)}
              onFocus={() => setFocusedField("galleryName")}
              onBlur={() => setFocusedField("")}
              className="w-full px-4 py-3 rounded-lg focus:outline-none"
            />
          </div>
        </label>

        {/* Upload Images */}
        <div>
          <label className="font-semibold block mb-2">
            Update Photos
          </label>

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-lg p-6 cursor-pointer hover:bg-pink-50">
            <UploadCloud className="text-pink-500 mb-2" />
            <span className="text-sm">Click to add more images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* Preview */}
          {images.length > 0 && (
            <motion.div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative">
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 bg-white rounded-full px-2 shadow"
                  >
                    ✕
                  </button>
                  <img
                    src={img.preview || img.url}
                    className="h-40 w-full object-cover rounded-xl border"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            disabled={submitting || loading}
            className="bg-pink-600 text-white px-6 py-2 rounded-md"
          >
            {submitting ? "Updating..." : "Update"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/gallery")}
            className="bg-pink-600 text-white px-6 py-2 rounded-md"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
