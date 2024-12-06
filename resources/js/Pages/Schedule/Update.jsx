import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function EditSchedule({ auth, doctors = [], schedule }) {
    const { data, setData, put, errors } = useForm({
        doctor_id: schedule.doctor_id,
        day: schedule.day,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('schedules.update', schedule.id)); // Update the schedule
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Jadwal</h2>}
        >
            <Head title="Edit Jadwal" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Doctor Selection */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Dokter</label>
                                    <select
                                        value={data.doctor_id}
                                        onChange={(e) => setData('doctor_id', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    >
                                        <option value="">Pilih Dokter</option>
                                        {doctors.length > 0 ? (
                                            doctors.map((doctor) => (
                                                <option key={doctor.id} value={doctor.id}>
                                                    {doctor.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No doctors available</option>
                                        )}
                                    </select>
                                    {errors.doctor_id && <div className="text-red-500 text-xs mt-1">{errors.doctor_id}</div>}
                                </div>

                                {/* Day Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Hari</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.day}
                                        onChange={(e) => setData('day', e.target.value)}
                                        required
                                    />
                                    {errors.day && <div className="text-red-500 text-xs mt-1">{errors.day}</div>}
                                </div>

                                {/* Start Time Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Jam Mulai</label>
                                    <input
                                        type="time"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.start_time}
                                        onChange={(e) => setData('start_time', e.target.value)}
                                        required
                                    />
                                    {errors.start_time && <div className="text-red-500 text-xs mt-1">{errors.start_time}</div>}
                                </div>

                                {/* End Time Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Jam Selesai</label>
                                    <input
                                        type="time"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.end_time}
                                        onChange={(e) => setData('end_time', e.target.value)}
                                        required
                                    />
                                    {errors.end_time && <div className="text-red-500 text-xs mt-1">{errors.end_time}</div>}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-300"
                                >
                                    Perbarui
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
