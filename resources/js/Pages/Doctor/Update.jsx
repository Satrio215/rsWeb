import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Update({ auth, doctor }) {
    const { data, setData, put, errors } = useForm({
        name: doctor.name,
        specialization: doctor.specialization,
        phone_number: doctor.phone_number,
        email: doctor.email,
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('doctors.update', doctor.id)); // Mengirim data ke server untuk diupdate
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Dokter</h2>}
        >
            <Head title="Update Dokter" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Name Field */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nama</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>

                                {/* Specialization Field */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Spesialisasi</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.specialization}
                                        onChange={(e) => setData('specialization', e.target.value)}
                                        required
                                    />
                                    {errors.specialization && <div className="text-red-500 text-xs mt-1">{errors.specialization}</div>}
                                </div>

                                {/* Phone Number Field */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        required
                                    />
                                    {errors.phone_number && <div className="text-red-500 text-xs mt-1">{errors.phone_number}</div>}
                                </div>

                                {/* Email Field */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                                </div>

                                {/* Password Field (optional for update) */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-300"
                                >
                                    Simpan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}