import React, { useEffect, useState } from "react";
import { Edit, Trash, Search, ImagePlus, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteGallery, getAllGalleries, toggleGalleryStatus } from "../../../../features/thunks/galleryThunk";
import DeleteModal from "../../modals/DeleteModal";

const GalleryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gallery, loading, errorMessage, successMessage } = useSelector(state => state.galleries);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllGalleries());
  }, [dispatch]);

  console.log("Gallery Data : ", gallery);

  // 🔍 Filter galleries
  const filtered = gallery.filter((g) =>
    g.galleryName.toLowerCase().includes(search.toLowerCase())
  );

  // 🧠 Toggle status
  const handleStatusToggle = (item) => {
    dispatch(toggleGalleryStatus({
      id: item._id,
      status: !item.status,
    })).then(() => dispatch(getAllGalleries()));
  };

  // Delete
  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  }

  const confrimDelete = () => {
    dispatch(deleteGallery(selectedItem._id))
      .then(() => {
        setIsDeleteOpen(false);
        setSelectedItem(null);
        dispatch(getAllGalleries());
      });
  };

  const cancelDelete = () => {
    setIsDeleteOpen(false);
    setSelectedItem(null);
  };


  if (loading) {
    return <p className="text-center text-pink-500">Loading galleries...</p>;
  }

  return (
    <section className="min-h-screen  bg-gradient-to-br from-pink-50 via-rose-50 to-white p-4 sm:p-6">
      {/* 🌸 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-semibold text-pink-600 flex items-center gap-2">
          <ImagePlus className="w-7 h-7" />
          Gallery Management
        </h1>

        {/* Search + Create */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Gallery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 outline-none transition-all bg-white"
            />
          </div>

          <button
            className="bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-700 transition duration-200 shadow-md"
            onClick={() => navigate("/admin/gallery/create")}
          >
            + Create
          </button>
        </div>
      </div>

      {/* 🌺 Table Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm text-gray-700 border-collapse">
          <thead className="bg-pink-100 text-pink-700">
            <tr>
              <th className="py-3 px-5 text-left font-semibold">SL</th>
              <th className="py-3 px-5 text-left font-semibold">Image</th>
              <th className="py-3 px-5 text-left font-semibold">Gallery Name</th>
              <th className="py-3 px-5 text-center font-semibold">Status</th>
              <th className="py-3 px-5 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((gallery, index) => (
                <tr
                  key={gallery._id}
                  className="border-b border-pink-100 hover:bg-rose-50 transition duration-150"
                >
                  <td className="py-3 px-5">{index + 1}</td>

                  {/* Thumbnail */}
                  <td className="py-3 px-5">
                    <img
                      src={gallery?.thumbnail?.url}
                      alt="Gallery"
                      className="w-32 h-20 object-cover rounded-lg border border-pink-100 shadow-sm"
                    />
                  </td>

                  <td className="py-3 px-5 font-medium text-gray-800">
                    {gallery.galleryName}
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3 px-5 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={gallery.status === true}
                        onChange={() => handleStatusToggle(gallery)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-pink-500 transition-all"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-6 transition-all"></div>
                    </label>
                    <span
                      className={`ml-2 text-sm font-medium ${gallery.status
                        ? "text-pink-600"
                        : "text-gray-500"
                        }`}
                    >
                      {gallery.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-5 text-center">
                    <div className="flex justify-center gap-3 text-pink-600">
                      <button
                        title="View"
                        className="hover:text-pink-700 transition" onClick={() => navigate(`/admin/gallery/view/${gallery._id}`)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-pink-100 transition"
                        onClick={() => navigate(`/admin/gallery/edit/${gallery?._id}`)}
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-rose-100 text-red-600 transition"
                        onClick={() => handleDeleteClick(gallery)}
                        title="Delete"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-500 italic"
                >
                  No galleries found 💫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isOpen={isDeleteOpen}
        onConfirm={confrimDelete}
        onCancel={cancelDelete}
        title="Delete Gallery"
        message={`Are you sure you want to delete "${selectedItem?.galleryName}"`}
      />

    </section>
  );
};

export default GalleryList;


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


