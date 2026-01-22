import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllGalleries } from "../../../features/thunks/galleryThunk";

const GalleryCards = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { gallery } = useSelector(state => state.galleries);

    console.log("Gallery Data", gallery);

    // Fetch Galleries
    useEffect(() => {
        dispatch(getAllGalleries());
    }, [dispatch]);

    return (
        <section className="py-16 bg-gray-50">
            {/* Section Title */}
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    Our <span className="text-blue-500">Gallery</span>
                </h2>
                <p className="text-gray-600 mt-2 text-base sm:text-lg">
                    Explore our beautiful collection of memorable photos.
                </p>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {gallery.map((photo) => (
                    <div
                        key={photo._id}
                        className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => navigate('/collection')}
                    >
                        {/* Image */}
                        <div className="relative w-full h-56 sm:h-64 overflow-hidden">
                            <img
                                src={photo?.images?.[0]?.url}
                                alt={photo.gallerName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Text Info */}

                        <div className="p-4 flex flex-row justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                                    {photo.galleryName}
                                </h3>
                                <p className="text-gray-500 text-sm">{new Date(photo.createdAt).toLocaleString()}</p>
                            </div>
                            <p className="font-semibold text-pink-600">{photo.images.length} <span className="text-gray-600">Photos</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GalleryCards;
