import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

    const location = useLocation();
    const menuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    // ✅ FIXED active logic
    const isActive = (path) => location.pathname === path;

    // Menu close if click outside or options
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);


    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? "bg-white shadow-md text-gray-800"
                : "bg-white/10 backdrop-blur-md text-black"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex items-center">
                        <img src="/logo.jpeg" alt="Logo" className="h-12 w-12 mr-2 rounded-l-lg" />
                        <span className={`text-xl font-semibold ${isScrolled ? "text-gray-800" : "text-blue-400"}`}>
                            Photo Gallery
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        {[
                            { name: "/", label: "Home" },
                            { name: "/gallery", label: "Gallery" },
                            { name: "/blog", label: "Blog" },
                            { name: "/about", label: "About Us" },
                            { name: "/login", label: "Login" }
                        ].map((item, index) => (
                            <Link
                                key={index}
                                to={item.name}
                                className={`relative font-medium transition-colors
${isActive(item.name)
                                        ? "text-pink-600 after:w-full"
                                        : ""
                                    }
after:absolute after:left-0 after:-bottom-1
after:h-[2px] after:bg-pink-600
after:w-0 after:transition-all after:duration-300 after:ease-in-out
hover:after:w-full
${!isActive(item.name)
                                        ? isScrolled
                                            ? "text-gray-700 hover:text-blue-600"
                                            : "text-white/90 hover:text-blue-400"
                                        : ""
                                    }`}

                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className={isScrolled ? "text-gray-800" : "text-red-800"}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className={`md:hidden border-t ${isScrolled
                    ? "bg-white text-gray-800"
                    : "bg-white/10 backdrop-blur-lg text-white"
                    }`}
                    ref={menuRef}
                >
                    <ul className="flex flex-col px-6 py-4 space-y-3">
                        {[
                            { name: "/", label: "Home" },
                            { name: "/gallery", label: "Gallery" },
                            { name: "/blog", label: "Blog" },
                            { name: "/about", label: "About Us" },
                            { name: "/login", label: "Login" }
                        ].map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.name}
                                    onClick={() => setIsOpen(false)}
                                    className={`relative font-medium transition-colors
${isActive(item.name)
                                            ? "text-pink-600 after:w-full"
                                            : ""
                                        }
after:absolute after:left-0 after:-bottom-1
after:h-[2px] after:bg-pink-600
after:w-0 after:transition-all after:duration-300 after:ease-in-out
hover:after:w-full
${!isActive(item.name)
                                            ? isScrolled
                                                ? "text-gray-700 hover:text-blue-600"
                                                : "text-white/90 hover:text-blue-400"
                                            : ""
                                        }`}

                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
