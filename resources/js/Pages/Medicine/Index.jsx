import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

export default function MedicineIndex({ medicines, auth }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data obat ini?')) {
            axios.delete(route('medicines.destroy', id))
                .then(() => {
                    alert('Data obat berhasil dihapus');
                    window.location.reload(); // Refresh halaman untuk melihat perubahan
                })
                .catch((error) => {
                    console.error('Error deleting medicine:', error);
                });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Obat</h2>}
        >
            <Head title="Medicine" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
                            {/* Judul */}
                            <h3 className="text-2xl font-bold text-gray-800">Daftar Obat</h3>

                            {/* Tombol Tambah Obat */}
                            <Link
                                href={route('medicines.create')}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg shadow text-sm"
                            >
                                Tambah Obat
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nama</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Deskripsi</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Harga</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Stok</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {medicines.map((medicine) => (
                                        <tr key={medicine.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">{medicine.name}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">{medicine.description}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">{medicine.unit_price}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">{medicine.stock}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm flex space-x-2">
                                                {/* Edit Button */}
                                                <Link
                                                    href={route('medicines.edit', medicine.id)}
                                                    className="border border-green-600 text-green-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-green-600 hover:text-white text-sm"
                                                >
                                                    Edit
                                                </Link>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(medicine.id)}
                                                    className="border border-red-600 text-red-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-red-600 hover:text-white text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
