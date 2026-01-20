import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGallery } from "../../../../features/thunks/galleryThunk";
import { getAllcollections } from "../../../../features/thunks/collectionThunk";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

export default function CreateGallery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { loading, errorMessage, successMessage } = useSelector(
    (state) => state.galleries
  );
  const { collections = [] } = useSelector((state) => state.collections);

  // Local states
  const [galleryName, setGalleryName] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [images, setImages] = useState([]); // { file, preview }
  const [focusedField, setFocusedField] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch collections on mount
  useEffect(() => {
    dispatch(getAllcollections());
  }, [dispatch]);

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit gallery
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!galleryName || !collectionId || images.length === 0) {
      alert("All fields are required including at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("galleryName", galleryName);
    formData.append("collection", collectionId);

    // Append multiple images
    images.forEach((img) => {
      formData.append("images", img.file); // backend should handle array of images
    });

    setSubmitting(true);
    dispatch(createGallery(formData))
      .unwrap()
      .then(() => {
        setSubmitting(false);
        setGalleryName("");
        setCollectionId("");
        setImages([]);
      })
      .catch(() => setSubmitting(false));
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
          <div className="text-sm bg-white/10 px-3 py-1 rounded-full">
            Creating
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white rounded-2xl p-6 shadow-lg border space-y-6"
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
          <span className="text-gray-700 font-medium mb-1 block">
            Gallery Name
          </span>
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
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Photos <span className="text-red-500">*</span>
          </label>
          <label
            htmlFor="images"
            className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-lg p-6 cursor-pointer hover:bg-pink-50 transition-all"
          >
            <UploadCloud className="text-pink-500 mb-2" size={28} />
            <span className="text-sm text-gray-500">
              Click to upload one or more images
            </span>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* Image Previews */}
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="relative group"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition-all z-10"
                  >
                    ✕
                  </button>
                  <img
                    src={img.preview}
                    alt={`Preview ${idx}`}
                    className="w-full h-40 object-contain rounded-xl border border-pink-200 bg-white"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <button
            type="submit"
            disabled={submitting || loading}
            className={`px-5 py-2 rounded-md font-semibold transition ${submitting || loading
              ? "bg-pink-300 text-white cursor-wait"
              : "bg-pink-600 hover:bg-pink-700 text-white"
              }`}
          >
            {submitting || loading ? "Submitting..." : "Submit"}
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
        {successMessage && (
          <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-red-600 font-medium">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}








// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { clearPhotos, fetchPhotos } from "../../../../features/gallery/gallerySlice";

// const GalleryList = () => {
//   const dispatch = useDispatch();
//   const { photos, loading, error } = useSelector((state) => state.gallery);

//   useEffect(() => {
//     dispatch(fetchPhotos());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//             📸 Gallery
//           </h2>
//           <button
//             onClick={() => dispatch(clearPhotos())}
//             className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
//           >
//             Clear Photos
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center text-pink-600 text-lg font-semibold">
//             Loading photos...
//           </div>
//         )}
//         {error && (
//           <div className="text-center text-red-500 text-lg font-semibold">
//             {error}
//           </div>
//         )}

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {photos.map((photo) => (
//             <div
//               key={photo.id}
//               className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <img
//                 src={photo.thumbnailUrl}
//                 alt={photo.title}
//                 className="w-full h-32 object-cover"
//               />
//               <div className="p-3">
//                 <p className="text-gray-700 font-medium text-sm truncate">
//                   {photo.title}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GalleryList;


