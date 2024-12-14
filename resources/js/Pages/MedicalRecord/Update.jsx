import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function EditMedicalRecord({
    auth,
    doctors = [],
    record,
    patients = [],
}) {
    const { data, setData, put, errors } = useForm({
        doctor_id: record.doctor_id,
        patient_id: record.patient_id,
        diagnosis: record.diagnosis || "",
        treatment: record.treatment || "",
        notes: record.notes || "",
        day: record.day || "",
        start_time: record.start_time || "",
        end_time: record.end_time || "",
    });
    console.log(record);
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("medical-records.update", record.id)); // Kirim data ke API untuk update
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Rekam Medis
                </h2>
            }
        >
            <Head title="Edit Rekam Medis" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Dokter */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Dokter
                                    </label>
                                    <select
                                        value={data.doctor_id}
                                        onChange={(e) =>
                                            setData("doctor_id", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    >
                                        <option value="">Pilih Dokter</option>
                                        {doctors.map((doctor) => (
                                            <option
                                                key={doctor.id}
                                                value={doctor.id}
                                            >
                                                {doctor.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.doctor_id && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.doctor_id}
                                        </div>
                                    )}
                                </div>

                                {/* Pasien */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Pasien
                                    </label>
                                    <select
                                        value={data.patient_id}
                                        onChange={(e) =>
                                            setData(
                                                "patient_id",
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    >
                                        <option value="">Pilih Pasien</option>
                                        {patients.map((patient) => (
                                            <option
                                                key={patient.id}
                                                value={patient.id}
                                            >
                                                {patient.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.patient_id && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.patient_id}
                                        </div>
                                    )}
                                </div>

                                {/* Diagnosis */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Diagnosis
                                    </label>
                                    <textarea
                                        value={data.diagnosis}
                                        onChange={(e) =>
                                            setData("diagnosis", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        rows={3}
                                        required
                                    />
                                    {errors.diagnosis && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.diagnosis}
                                        </div>
                                    )}
                                </div>

                                {/* Treatment */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Treatment
                                    </label>
                                    <textarea
                                        value={data.treatment}
                                        onChange={(e) =>
                                            setData("treatment", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        rows={3}
                                        required
                                    />
                                    {errors.treatment && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.treatment}
                                        </div>
                                    )}
                                </div>

                                {/* Notes */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Notes
                                    </label>
                                    <textarea
                                        value={data.notes}
                                        onChange={(e) =>
                                            setData("notes", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        rows={3}
                                    />
                                    {errors.notes && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.notes}
                                        </div>
                                    )}
                                </div>

                                {/* Hari, Jam Mulai, Jam Selesai */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Hari
                                    </label>
                                    <input
                                        type="text"
                                        value={data.day}
                                        onChange={(e) =>
                                            setData("day", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Jam Mulai
                                    </label>
                                    <input
                                        type="time"
                                        value={data.start_time}
                                        onChange={(e) =>
                                            setData(
                                                "start_time",
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Jam Selesai
                                    </label>
                                    <input
                                        type="time"
                                        value={data.end_time}
                                        onChange={(e) =>
                                            setData("end_time", e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
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
