import React, { useEffect, useState } from "react";
import { Trash2, Eye, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateCollectionModal from "../../modals/CreateCollectionModal";
import EditCollectionModal from "../../modals/EditCollectionModal";
import DeleteModal from "../../modals/DeleteModal";
import Pagination from "../../../utils/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../../../features/collectionSlice/collectionSlice";
import { createCollections, deleteCollections, getAllcollections, toggleCollectionStatus, updateCollections } from "../../../../features/thunks/collectionThunk";

const CollectionList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    collections = [],
    loading,
    successMessage,
    errorMessage,
  } = useSelector((state) => state.collections);


  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [search, setSearch] = useState("");

  // Modals State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [createCollectionModal, setCreateCollectionModal] = useState(false);
  const [editCollectionModal, setEditCollectionModal] = useState(false);


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch collections
  useEffect(() => {
    dispatch(getAllcollections());
  }, [dispatch]);

  // Clear messages
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, successMessage, errorMessage]);

  // Search
  const filtered = collections.filter((col) =>
    col?.collectionName?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const displayedData = filtered.slice(startIndex, endIndex);

  // ---------------- HANDLERS ----------------

  // Create
  const handleSaveCollection = ({ name, image }) => {
    const formData = new FormData();
    formData.append("collectionName", name);
    formData.append("thumbnail", image);
    formData.append("status", true);
    dispatch(
      createCollections(formData)
    ).then(() => {
      setCreateCollectionModal(false);
      dispatch(getAllcollections());
    });
  };

  // Edit
  const handleEditCollection = (collection) => {
    setSelectedCollection(collection);
    setEditCollectionModal(true);
  };

  const handleUpdateCollection = ({ id, formData }) => {
    console.log("Updating Id is: ", id);
    dispatch(
      updateCollections({ id, formData })
    ).then(() => {
      setEditCollectionModal(false);
      dispatch(getAllcollections());
    });
  };

  // Delete
  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteCollections(selectedItem._id)).then(() => {
      setIsDeleteOpen(false);
      setSelectedItem(null);
      dispatch(getAllcollections());
    });
  };

  const cancelDelete = () => {
    setIsDeleteOpen(false);
    setSelectedItem(null);
  };

  // Toggle Status
  const handleToggleStatus = (item) => {
    dispatch(
      toggleCollectionStatus({
        id: item._id,
        status: !item.status,
      })
    ).then(() => {
      dispatch(getAllcollections());
    });
  };

  // ---------------- UI ----------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white p-4 md:p-6">
      <h1 className="text-3xl font-semibold text-pink-600 mb-6 tracking-wide">
        💍 Collection Management
      </h1>

      {errorMessage && (
        <p className="mb-4 text-red-500 font-medium">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="mb-4 text-green-600 font-medium">{successMessage}</p>
      )}

      {/* Search + Create */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Collection..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-pink-200 rounded-lg px-4 py-2 w-full sm:w-1/2"
        />
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          onClick={() => setCreateCollectionModal(true)}
        >
          + Create
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-pink-100">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-pink-100 text-pink-700">
            <tr>
              <th className="py-3 px-5">SL</th>
              <th className="py-3 px-5">Image</th>
              <th className="py-3 px-5">Collection</th>
              <th className="py-3 px-5 text-center">Status</th>
              <th className="py-3 px-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayedData ? (
              displayedData?.map((item, index) => (
                <tr key={item._id} className="border-b">
                  <td className="py-3 px-5">{startIndex + index + 1}</td>

                  <td className="py-3 px-5">
                    <img
                      src={item?.thumbnail?.url}
                      alt={item.collectionName}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  <td className="py-3 px-5">{item.collectionName}</td>

                  {/* Status Toggle */}
                  <td className="py-3 px-5 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.status === true}
                        onChange={() => handleToggleStatus(item)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-pink-500 transition-all"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-6 transition-all"></div>
                    </label>
                    <span
                      className={`ml-2 text-sm font-medium ${item.status
                        ? "text-pink-600"
                        : "text-gray-500"
                        }`}
                    >
                      {item.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-5 text-center">
                    <div className="flex justify-center gap-4 text-pink-600">
                      <button
                        onClick={() =>
                          navigate(`/admin/collection/view/${item._id}`)
                        }
                      >
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleEditCollection(item)}>
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDeleteClick(item)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No collections found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filtered.length}
        limit={limit}
        onPageChange={setCurrentPage}
      />

      {/* Modals */}
      {createCollectionModal && (
        <CreateCollectionModal
          onClose={() => setCreateCollectionModal(false)}
          onSave={handleSaveCollection}
        />
      )}

      {editCollectionModal && (
        <EditCollectionModal
          onClose={() => setEditCollectionModal(false)}
          onSave={handleUpdateCollection}
          collection={selectedCollection}
        />
      )}

      <DeleteModal
        isOpen={isDeleteOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Delete Collection"
        message={`Are you sure you want to delete "${selectedItem?.collectionName}"?`}
      />
    </div>
  );
};

export default CollectionList;
