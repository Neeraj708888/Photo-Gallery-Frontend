import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllcollections } from "../../../features/thunks/collectionThunk";

const Collection = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { collections } = useSelector(state => state.collections);

    // Fetch Collection
    useEffect(() => {
        dispatch(getAllcollections());
    }, [dispatch]);

    const handleNavigate = (id) => {
        console.log("Hit Collection Id: ", id);
        navigate(`/collection/${id}`);
    };

    return (
        <section className="py-16 bg-gray-50">
            {/* Section Title */}
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    Featured <span className="text-blue-500">Collections</span>
                </h2>
                <p className="text-gray-600 mt-2 text-base sm:text-lg">
                    Explore our curated photo collections from around the world.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {collections.map((col) => (
                    <div
                        key={col._id}
                        className="group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white"
                    >
                        {/* Title */}
                        <div className="p-4 flex items-center justify-between">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                                {col.collectionName}
                            </h3>
                        </div>

                        {/* Image */}
                        <div className="relative w-full h-56 sm:h-64 overflow-hidden" onClick={() => handleNavigate(col._id)}>

                            <img
                                src={col?.thumbnail?.url}
                                alt={col?.collectionName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />



                            {/* Photo Count */}
                            {/* <button type='button' className="absolute bottom-3 right-3 bg-black/70 text-white text-sm font-medium px-3 py-1 rounded-full" onClick={(e) => {
                                e.stopPropagation();
                                handleNavigate(col._id)
                            }}>
                                {collections.total} Photos
                            </button> */}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Collection;