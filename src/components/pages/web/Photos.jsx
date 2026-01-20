import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PhotoModal from "../modals/PhotosModal";
import { useDispatch } from "react-redux";

const Photos = () => {
    const { photosId } = useParams();
    console.log(photosId);
    const dispatch = useDispatch();
    const [openPhotoModal, setOpenPhotoModal] = useState(null);


    useEffect(() => {

    })


    return (
        <section className="min-h-screen bg-gray-50 py-10 px-6 md:px-12 mt-16 mb-12">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        Collection #{id} - Photo Gallery
                    </h2>
                    <p className="text-gray-500 mt-1">Explore all photos in this collection.</p>
                </div>
                <Link
                    to="/collection"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    ← Back to Collections
                </Link>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300"
                        onClick={() => setOpenPhotoModal(photo)}

                    >
                        {/* Image */}
                        <img
                            src={photo.img}
                            alt={photo.title}
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                            <div className="p-4 text-center text-white">
                                <h3 className="text-lg font-semibold">{photo.title}</h3>
                                <p className="text-sm text-gray-200">View Details</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Photo Modal */}
            <PhotoModal photo={openPhotoModal} onClose={() => setOpenPhotoModal(null)} />
        </section>
    );
};

export default Photos;
