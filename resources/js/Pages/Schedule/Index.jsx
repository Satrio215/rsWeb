import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

export default function ScheduleIndex({ schedules = [], auth }) {
    const handleDelete = async (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
            try {
                await axios.delete(route('schedules.destroy', id));
                alert('Jadwal berhasil dihapus');
                location.reload(); // Refresh halaman untuk melihat perubahan
            } catch (error) {
                console.error('Error deleting schedule:', error);
                alert('Terjadi kesalahan saat menghapus jadwal.');
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Jadwal Dokter</h2>}
        >
            <Head title="Schedules" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Daftar Jadwal Dokter</h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Dokter</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Hari</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Jam Mulai</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Jam Selesai</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {schedules.length > 0 ? (
                                            schedules.map((schedule) => (
                                                <tr key={schedule.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{schedule.doctor_name}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{schedule.day}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{schedule.start_time}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{schedule.end_time}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm flex space-x-2">
                                                        <button
                                                            onClick={() => handleDelete(schedule.id)}
                                                            className="border border-red-600 text-red-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-red-600 hover:text-white text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                                    Tidak ada jadwal yang tersedia.
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
