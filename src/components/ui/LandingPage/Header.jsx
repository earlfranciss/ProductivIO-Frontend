import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header({ id }) {
    const [hover, setHover] = useState(false);

    // Load Tailwind Elements script dynamically
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1";
        script.type = "module";
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    return (
        <div id={ id }>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex items-center lg:flex-1">
                        <Link to="/" className="flex items-center space-x-2">
                            <motion.img
                                src={hover ? "/icon-glow.png" : "/icon.png"}
                                alt="ProductivIO Logo"
                                className="h-8 w-auto cursor-pointer"
                                whileHover={{ scale: 1.25, rotate: 25 }}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            />
                            <p className="text-m font-bold">ProductivIO</p>
                        </Link>
                    </div>


                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            command="show-modal"
                            commandfor="mobile-menu"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-6 w-6"
                            >
                                <path
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Link
                            to="#"
                            className="text-sm font-semibold text-white"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("features").scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            Features
                        </Link>
                        <Link
                            to="#"
                            className="text-sm font-semibold text-white"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("highlights").scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            Highlights
                        </Link>
                        <Link
                            to="#"
                            className="text-sm font-semibold text-white"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("newsletter").scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            Subscribe
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link to="/login" className="text-sm font-semibold text-white">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>

                {/* Mobile menu dialog */}
                <el-dialog>
                    <dialog id="mobile-menu" className="backdrop:bg-transparent lg:hidden">
                        <div tabIndex={0} className="fixed inset-0 focus:outline-none">
                            <el-dialog-panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                                <div className="flex items-center justify-between">
                                    <Link to="/" className="-m-1.5 p-1.5">
                                        <span className="sr-only">ProductivIO</span>
                                        <img
                                            src="/icon.png"
                                            alt="Logo"
                                            className="h-8 w-auto"
                                        />
                                    </Link>
                                    <button
                                        type="button"
                                        command="close"
                                        commandfor="mobile-menu"
                                        className="-m-2.5 rounded-md p-2.5 text-gray-200"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                d="M6 18L18 6M6 6l12 12"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-white/10">
                                        <div className="space-y-2 py-6">
                                            <Link
                                                to="#"
                                                className="text-sm font-semibold text-white"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById("features").scrollIntoView({ behavior: "smooth" });
                                                }}
                                            >
                                                Features
                                            </Link>
                                            <Link
                                                to="#"
                                                className="text-sm font-semibold text-white"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById("highlights").scrollIntoView({ behavior: "smooth" });
                                                }}
                                            >
                                                Highlights
                                            </Link>
                                            <Link
                                                to="#"
                                                className="text-sm font-semibold text-white"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById("newsletter").scrollIntoView({ behavior: "smooth" });
                                                }}
                                            >
                                                Subscribe
                                            </Link>
                                        </div>
                                        <div className="py-6">
                                            <Link
                                                to="/login"
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-white/5"
                                            >
                                                Log in
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </el-dialog-panel>
                        </div>
                    </dialog>
                </el-dialog>
            </header>

            {/* Main Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                {/* Background decorative shapes */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-purple-700 to-purple-700 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
                    ></div>
                </div>

                {/* Hero content */}
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-400 to-pink-400">
                        Organize tasks, track goals, and stay focused — all in one place.
                    </h1>
                    <p className="mt-6 text-lg text-gray-300 sm:text-xl">
                        Boost productivity, track goals, and stay focused with ease.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/register"
                            className="rounded-md bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-purple-700"
                        >
                            Get started
                        </Link>
                        <Link
                            to="#"
                            className="text-sm font-semibold text-white hover:underline"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("newsletter").scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            Learn more <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>

                {/* Bottom decorative shape */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-purple-700 to-purple-700 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
                    ></div>
                </div>
            </div>
        </div>
    )
}