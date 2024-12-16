import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen flex">
                <aside className="w-2/4 bg-gray-200 p-6">
                    <h3 className="font-semibold text-lg mb-4">Navigation Menu Manajemen</h3>
                    <ul className="space-y-4">
                        <li>
                            <a href={route('appointments.index')} className="text-gray-700">1. Appointment</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-700">2. Pasien dan Rekam Medis</a>
                        </li>
                        <li className="relative">
                            <div className="flex items-center justify-between">
                                {/* Link to doctors.index */}
                                <a
                                    href={route('doctors.index')}
                                    className="text-gray-700 w-full text-left"
                                >
                                    3. Dokter
                                </a>
                                {/* Dropdown Toggle Icon */}
                                <button
                                    onClick={toggleDropdown}
                                    className="text-gray-700 ml-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-4 h-4 transform transition-transform ${
                                            isDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414 6.707 9.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <ul className="absolute left-0 mt-2 bg-white border rounded shadow-lg w-full z-10">
                                    <li>
                                        <a
                                            href={route('doctors.index')}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Doctor List
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={route('schedules.index')}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Doctor Schedules
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a href={route('medicines.index')} className="text-gray-700">4. Obat</a>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-grow p-6">
                    <h2 className="text-xl font-semibold mb-4">Welcome, {auth.user.name}!</h2>

                    <div
                        className="relative flex flex-col lg:flex-row justify-center bg-gray-50 p-6 rounded-lg shadow min-h-screen overflow-hidden"
                    >
                        {/* Background Image with Animation */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-60 bg-animated-background"
                            style={{
                                backgroundImage: `url('https://trustmedis.com/wp-content/uploads/2023/04/campaign-creators-pypeCEaJeZY-unsplash-scaled.jpg')`,
                            }}
                        ></div>

                        {/* Overlay for Fading Effect */}
                        <div className="absolute inset-0 bg-white opacity-75"></div>

                        {/* Content */}
                        <div className="relative lg:w-4/2 text-center lg:text-left">
                            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-800">
                                Pantau Kinerja Klinik Cihuy Anda dengan Mudah, Salam Sehat!!
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Sistem Manajemen Klinik RS CIHUY dirancang untuk mempermudah pihak manajemen dalam memonitor dan mengelola operasional klinik secara efisien. Sistem ini menyediakan statistik dan laporan komprehensif, baik dalam periode harian, bulanan, maupun tahunan. Dengan tampilan yang informatif dan mudah digunakan, RS CIHUY Dashboard menampilkan data pendaftaran pasien, jadwal dokter, pengelolaan rekam medis, juga sebagai pengelolaan obat.
                            </p>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 text-center mt-6">
                <p>&copy; {new Date().getFullYear()} RS CIHUY. All rights reserved.</p>
            </footer>

            <style>
                {`
                @keyframes moveBackground {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .bg-animated-background {
                    animation: moveBackground 10s linear infinite;
                }
                `}
            </style>
        </AuthenticatedLayout>
    );
}
