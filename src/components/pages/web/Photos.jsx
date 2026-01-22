import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PhotoModal from "../modals/PhotosModal";

const Photos = ({ images = [] }) => {

    const navigate = useNavigate();
    const [openPhotoModal, setOpenPhotoModal] = useState(null); // ✅ FIX 2

    return (
        <section className="min-h-screen bg-gray-50 py-10 px-6 md:px-12 mt-16">

            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-5 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        Photo Gallery
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Explore all photos in this collection.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/")}
                    className="text-blue-600  hover:text-pink-800 font-medium"
                >
                    ← Back
                </button>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((photo) => (
                    <div
                        key={photo._id}
                        className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 cursor-pointer"
                        onClick={() => setOpenPhotoModal(photo)} // ✅ FIX
                    >
                        <img
                            src={photo.url}
                            alt="Gallery"
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                            <div className="p-4 text-center text-white">
                                <h3 className="text-lg font-semibold">View Photo</h3>
                                <p className="text-sm text-gray-200">Click to open</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Photo Modal */}
            {openPhotoModal && (
                <PhotoModal
                    photo={openPhotoModal}
                    onClose={() => setOpenPhotoModal(null)}
                />
            )}
        </section>
    );
};

export default Photos;
