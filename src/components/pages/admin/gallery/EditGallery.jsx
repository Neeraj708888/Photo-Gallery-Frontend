import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getSingleGallery, updateGallery } from "../../../../features/thunks/galleryThunk";
import { getAllcollections } from "../../../../features/thunks/collectionThunk";

export default function EditGallery() {

  const { galleryId } = useParams();
  console.log("Gallery Id: ", galleryId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleGallery, loading, errorMessage, successMessage } = useSelector(state => state.galleries);
  const { collections } = useSelector(state => state.collections);

  // Local State
  const [form, setForm] = useState({
    galleryName: "",
    collectionId: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [focusedField, setFocusedField] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch Single Gallery First
  useEffect(() => {
    if (galleryId) dispatch(getSingleGallery(galleryId));
    dispatch(getAllcollections());
  }, [galleryId, dispatch]);


  // Prefill Data
  useEffect(() => {
    if (singleGallery) {
      setForm({
        galleryName: singleGallery.galleryName || "",
        collectionId: singleGallery?.collection?._id || "",
        image: singleGallery?.thumbnail?.url || null,
      });

      setImagePreview(singleGallery?.thumbnail?.url || null);
    }
  }, [singleGallery]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("galleryName", form.galleryName);
    formData.append("collection", form.collectionId);

    if (form.image) {
      formData.append("thumbnail", form.image);
    }

    setSubmitting(true);

    dispatch(
      updateGallery({
        id: galleryId,
        payload: formData
      })
    )
      .unwrap()
      .then(() => {
        setSubmitting(false);
        navigate("/admin/gallery");
      })
      .catch(() => {
        setSubmitting(false);
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
              Modify Galley Details
            </h2>
            <p className="text-pink-100/90 mt-1">
              Modify Gallery info or replace the photo easily.
            </p>
          </div>
          <div className="text-sm bg-white/10 px-3 py-1 rounded-full">Modifying</div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white rounded-2xl p-6 shadow-lg border"
      >
        {/* Select Collection */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium mb-1 block">
            Select Collection
          </span>
          <div className={inputWrapperClass("collection")}>
            <select
              name="collection"
              value={form?.collectionId}
              onChange={(e) => setForm(prev => ({
                ...prev,
                collectionId: e.target.value
              }))}
              onFocus={() => handleFocus("collection")}
              onBlur={handleBlur}
              className="w-full bg-transparent px-4 py-3 rounded-lg text-gray-800 focus:outline-none appearance-none"
            >
              <option value="">-- Select a Collection --</option>
              {collections.map((col) => (
                <option key={col?._id} value={col._id}>
                  {col?.collectionName}
                </option>
              ))}
            </select>
          </div>
        </label>

        {/* Gallery Name*/}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium mb-1 block">Gallery Name</span>
          <div className={inputWrapperClass("quotes")}>
            <input
              name="galleryName"
              value={form.galleryName}
              onChange={(e) => setForm(prev => ({
                ...prev,
                galleryName: e.target.value
              }))}
              onFocus={() => handleFocus("quotes")}
              onBlur={handleBlur}
              placeholder="Write your thoughts about this moment..."
              rows={3}
              className="w-full bg-transparent px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none resize-none"
            />
          </div>
        </label>


        {/* Upload Image */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium mb-1 block">
            Change / Upload Photo
          </span>
          <div className={inputWrapperClass("image")}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              onFocus={() => handleFocus("image")}
              onBlur={handleBlur}
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
        </label>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <button
            type="submit"
            disabled={submitting}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-md font-semibold transition-all duration-200 ${submitting
              ? "bg-pink-300 text-white cursor-wait"
              : "bg-pink-600 hover:bg-pink-700 text-white"
              }`}
          >
            {submitting ? "Modifying..." : "Modify"}
          </button>

          <button
            type="button"
            className='inline-flex items-center gap-2 px-5 py-2 rounded-md font-semibold transition-all duration-200  bg-pink-600 hover:bg-pink-700 text-white' onClick={() => navigate('/admin/gallery')}>
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
