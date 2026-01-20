import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import { createGallery } from "../../../../features/thunks/galleryThunk";
import { getAllcollections } from "../../../../features/thunks/collectionThunk";

export default function CreateGallery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { loading } = useSelector((state) => state.galleries);
  const { collections = [] } = useSelector((state) => state.collections);

  // Local state
  const [galleryName, setGalleryName] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [images, setImages] = useState([]); // files
  const [previews, setPreviews] = useState([]); // preview URLs
  const [focusedField, setFocusedField] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch collections
  useEffect(() => {
    dispatch(getAllcollections());
  }, [dispatch]);

  // Handle multiple image selection
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!galleryName || !collectionId || images.length === 0) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("galleryName", galleryName);
    formData.append("collection", collectionId);
    images.forEach((img) => formData.append("images", img)); // multiple images

    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    dispatch(createGallery(formData))
      .unwrap()
      .then(() => {
        setSubmitting(false);
        setSuccessMsg("Gallery created successfully!");
        setGalleryName("");
        setCollectionId("");
        setImages([]);
        setPreviews([]);
      })
      .catch((err) => {
        setSubmitting(false);
        setErrorMsg(err || "Something went wrong");
      });
  };

  const inputWrapperClass = (field) =>
    `transition-shadow duration-200 rounded-lg p-1 ${focusedField === field ? "shadow-lg ring-2 ring-pink-300" : "shadow-sm"
    }`;

  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-red-500 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Create Gallery Details
            </h2>
            <p className="text-pink-100/90 mt-1">
              Create gallery under selected collection.
            </p>
          </div>
          <div className="text-sm bg-white/10 px-3 py-1 rounded-full">Creating</div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white rounded-2xl p-6 shadow-lg border"
      >
        {/* Collection Select */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium mb-1 block">
            Select Collection
          </span>
          <div className={inputWrapperClass("collection")}>
            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              onFocus={() => setFocusedField("collection")}
              onBlur={() => setFocusedField("")}
              className="w-full bg-transparent px-4 py-3 rounded-lg text-gray-800 focus:outline-none appearance-none"
            >
              <option value="">-- Select a Collection --</option>
              {collections.map((col) => (
                <option key={col._id} value={col._id}>
                  {col.collectionName}
                </option>
              ))}
            </select>
          </div>
        </label>

        {/* Gallery Name */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium mb-1 block">Gallery Name</span>
          <div className={inputWrapperClass("galleryName")}>
            <input
              type="text"
              value={galleryName}
              onChange={(e) => setGalleryName(e.target.value)}
              onFocus={() => setFocusedField("galleryName")}
              onBlur={() => setFocusedField("")}
              placeholder="Enter gallery name"
              className="w-full bg-transparent px-4 py-3 rounded-lg focus:outline-none"
            />
          </div>
        </label>

        {/* Upload Images */}
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Upload Photos <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <label
              htmlFor="images"
              className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-lg p-6 cursor-pointer hover:bg-pink-50 transition-all"
            >
              <UploadCloud className="text-pink-500 mb-2" size={28} />
              <span className="text-sm text-gray-500">
                Click to upload photos
              </span>
              <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="hidden"
              />
            </label>

            {/* Preview */}
            {previews.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                {previews.map((url, index) => (
                  <div key={index} className="relative group">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition-all z-10"
                    >
                      ✕
                    </button>
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded-lg border border-pink-200"
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <button
            type="submit"
            disabled={submitting || loading}
            className={`px-5 py-2 rounded-md font-semibold transition ${submitting
              ? "bg-pink-300 text-white cursor-wait"
              : "bg-pink-600 hover:bg-pink-700 text-white"
              }`}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/gallery")}
            className="px-5 py-2 rounded-md font-semibold bg-pink-600 hover:bg-pink-700 text-white"
          >
            Back
          </button>
        </div>

        {/* Messages */}
        {successMsg && <p className="mt-4 text-green-600 font-medium">{successMsg}</p>}
        {errorMsg && <p className="mt-4 text-red-600 font-medium">{errorMsg}</p>}
      </form>
    </div>
  );
}
































{/* Quotes */ }
{/* <label className="block mb-4">
          <span className="text-gray-700 font-medium mb-1 block">Quotes</span>
          <div className={inputWrapperClass("quotes")}>
            <textarea
              name="quotes"
              value={form.quotes}
              onChange={handleChange}
              onFocus={() => handleFocus("quotes")}
              onBlur={handleBlur}
              placeholder="Write your thoughts about this moment..."
              rows={3}
              className="w-full bg-transparent px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none resize-none"
            />
          </div>
        </label> */}

{/* Date & Time */ }
{/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <label className="block">
            <span className="text-gray-700 font-medium mb-1 block">Date</span>
            <div className={inputWrapperClass("date")}>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                onFocus={() => handleFocus("date")}
                onBlur={handleBlur}
                className="w-full bg-transparent px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium mb-1 block">Time</span>
            <div className={inputWrapperClass("time")}>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                onFocus={() => handleFocus("time")}
                onBlur={handleBlur}
                className="w-full bg-transparent px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
              />
            </div>
          </label>
        </div> */}


{/* <label className="block mb-4">
          <span className="text-gray-700 font-medium mb-1 block">
            Upload Image
          </span>
          <div className={inputWrapperClass("image")}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              onFocus={() => setFocusedField("image")}
              onBlur={() => setFocusedField("")}
              className="w-full px-4 py-2 rounded-lg text-gray-700 bg-transparent focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
            />
          </div>

          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-48 h-36 object-cover rounded-lg border shadow-md"
              />
            </div>
          )}
        </label> */}