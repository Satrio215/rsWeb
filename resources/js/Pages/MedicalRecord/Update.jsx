import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import style dari react-toastify

export default function EditMedicalRecord({
    auth,
    doctors = [],
    record,
    patients = [],
}) {
    const { data, setData, put, errors } = useForm({
        doctor_id: record.doctor.id,
        patient_id: record.patient.id,
        diagnosis: record.diagnosis || "",
        treatment: record.treatment || "",
        notes: record.notes || "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // URL API ke route yang mengarah ke controller Laravel (gunakan ID rekam medis)
            const response = await axios.put(
                `http://127.0.0.1:8000/api/medical-records/${record.id}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json", // Set header content type jika perlu
                    },
                },
            );

            if (response.status === 200) {
                // Tanggapan sukses, navigasi atau update UI sesuai kebutuhan
                toast.success("Rekam medis berhasil diperbarui!", {
                    position: "top-right", // Posisi toast
                    autoClose: 5000, // Waktu auto-close dalam milidetik
                    hideProgressBar: false, // Menampilkan progress bar
                    closeOnClick: true, // Menutup toast saat diklik
                    pauseOnHover: true, // Menjeda toast saat hover
                    draggable: true, // Membuat toast bisa dipindahkan
                    progress: undefined, // Menonaktifkan progress bar (jika tidak diperlukan)
                });
                // Anda bisa menambahkan redirect atau feedback sukses di sini
            }
        } catch (error) {
            // Tangani error jika permintaan gagal
            toast.error("Terjadi kesalahan saat memperbarui data!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            alert("Terjadi kesalahan saat memperbarui data");
        }
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

            <ToastContainer />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            {/* Tempatkan ini di dalam layout untuk menampilkan toast */}
                            <form onSubmit={handleSubmit}>
                                medical
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
