import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllcollections } from "../../../features/thunks/collectionThunk";

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const { collections, loading } = useSelector(state => state.collections);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllcollections());
    }, []);

    // Auto-slide every 4 seconds
    useEffect(() => {


        if (!collections || collections.length === 0) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [collections.length]);

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* Background Images */}
            <div className="absolute inset-0 overflow-x-hidden w-screen h-screen">
                {collections.map((img, index) => (
                    <img
                        key={index}
                        src={img?.thumbnail?.url}
                        // alt={`slide-${index}`}
                        alt='banner'
                        className={`absolute inset-0 transition-opacity w-screen h-screen duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 text-center text-white px-4 sm:px-8 max-w-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    Welcome to <span className="text-blue-400">Photo Gallery</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
                    Discover, share, and cherish your favorite moments with our stunning photo gallery.
                    Explore a world of captivating images and create your own collection today!
                </p>

                {/* Transparent text button */}
                {/* <button
                    className="relative font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 bg-clip-text text-transparent hover:scale-105"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Get Started
                </button> */}
            </div>


            {/* Dots Navigation */}
            <div className="absolute bottom-6 flex space-x-3 z-10">
                {collections.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current
                            ? "bg-white scale-125 shadow-md"
                            : "bg-gray-400 hover:bg-gray-300"
                            }`}
                    ></button>
                ))}
            </div>
        </section>
    );
};

export default Hero;
