import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function EditAppointment({ auth, doctors, patients, appointments }) {
    const { data, setData, put, errors } = useForm({
        doctor_id: appointments.doctor_id || '',
        patient_id: appointments.patient_id || '',
        appointment_date: appointments.appointment_date || '',
        appointment_time: appointments.appointment_time || '',
        status: appointments.status || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('appointments.update', appointments.id)); // Mengirim data ke server
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Appointment</h2>}
        >
            <Head title="Edit Appointment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Pilihan Dokter */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Dokter</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.doctor_id}
                                        onChange={(e) => setData('doctor_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Dokter</option>
                                        {doctors.map((doctor) => (
                                            <option key={doctor.id} value={doctor.id}>
                                                {doctor.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.doctor_id && <div className="text-red-500 text-xs mt-1">{errors.doctor_id}</div>}
                                </div>

                                {/* Pilihan Pasien */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Pasien</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.patient_id}
                                        onChange={(e) => setData('patient_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Pasien</option>
                                        {patients.map((patient) => (
                                            <option key={patient.id} value={patient.id}>
                                                {patient.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.patient_id && <div className="text-red-500 text-xs mt-1">{errors.patient_id}</div>}
                                </div>

                                {/* Tanggal Appointment */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Appointment</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.appointment_date}
                                        onChange={(e) => setData('appointment_date', e.target.value)}
                                        required
                                    />
                                    {errors.appointment_date && (
                                        <div className="text-red-500 text-xs mt-1">{errors.appointment_date}</div>
                                    )}
                                </div>

                                {/* Waktu Appointment */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Pilih Jam</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.appointment_time}
                                        onChange={(e) => setData('appointment_time', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Jam</option>
                                        {[...Array(24).keys()].map((hour) => {
                                            const formattedHour = hour.toString().padStart(2, '0'); // Format menjadi 2 digit
                                            return (
                                                <option key={hour} value={`${formattedHour}:00`}>
                                                    {`${formattedHour}:00`}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.appointment_time && <div className="text-red-500 text-xs mt-1">{errors.appointment_time}</div>}
                                </div>

                                {/* Status */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        required
                                    >
                                        <option value="Scheduled">Scheduled</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                    {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-300"
                                >
                                    Simpan Perubahan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
