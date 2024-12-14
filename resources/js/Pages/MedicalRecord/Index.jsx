import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";

export default function MedicalRecordIndex({ medicalRecords = [], auth }) {
    const handleDelete = async (id) => {
        if (
            confirm("Apakah Anda yakin ingin menghapus data rekam medis ini?")
        ) {
            try {
                await axios.delete(route("medical-records.destroy", id)); // Gunakan id yang benar untuk rute
                alert("Rekam medis berhasil dihapus");
                location.reload(); // Segarkan halaman untuk melihat perubahan
            } catch (error) {
                console.error("Error deleting medical record:", error);
                alert("Terjadi kesalahan saat menghapus rekam medis.");
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Rekam Medis
                </h2>
            }
        >
            <Head title="Medical Records" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Daftar Rekam Medis Pasien
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Nama Pasien
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Nomor HP
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Nama Dokter
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Spesialisasi Dokter
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {medicalRecords.length > 0 ? (
                                            medicalRecords.map((record) => (
                                                <tr
                                                    key={record.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                        {record.patient.name}
                                                    </td>

                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                        {new Date(
                                                            record.created_at,
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                        {record.doctor.name}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                        {
                                                            record.doctor
                                                                .phone_number
                                                        }
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                        {
                                                            record.doctor
                                                                .specialization
                                                        }
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm flex space-x-2">
                                                        {/* Edit Button */}
                                                        <Link
                                                            href={route(
                                                                "medical-records.edit",
                                                                record.id,
                                                            )}
                                                            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-blue-600 hover:text-white text-sm"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    record.id,
                                                                )
                                                            }
                                                            className="border border-red-600 text-red-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-red-600 hover:text-white text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center py-4 text-gray-500"
                                                >
                                                    Tidak ada rekam medis yang
                                                    tersedia.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
