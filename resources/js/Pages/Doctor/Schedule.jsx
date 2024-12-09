import { Head } from '@inertiajs/react';
import AuthenticatedDoctor from '@/Layouts/AuthenticatedDoctor';

const Schedule = ({ schedules, auth }) => {
    return (
        <AuthenticatedDoctor
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Jadwal Dokter
                </h2>
            }
        >
            <Head title="Jadwal Dokter" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Hari</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Waktu Mulai</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Waktu Selesai</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {schedules.map((schedule) => (
                                            <tr key={schedule.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{schedule.day}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{schedule.start_time}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{schedule.end_time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedDoctor>
    );
};

export default Schedule;
