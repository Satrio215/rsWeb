
import { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EditMedicalRecord({ record, auth }) {
    const { data, setData, put } = useForm({
        diagnosis: record.diagnosis,
        treatment: record.treatment,
        notes: record.notes,
        patient_id: record.patient_id,
        doctor_id: record.doctor_id,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(route("medical-records.update", record.id), data);
            alert("Rekam medis berhasil diperbarui");
            window.location.href = route("medical-records.index"); // Kembali ke halaman daftar setelah update
        } catch (error) {
            console.error("Error updating medical record:", error);
            alert("Terjadi kesalahan saat memperbarui rekam medis.");
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
            <Head title="Edit Medical Record" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
                                            Diagnosis
                                        </label>
                                        <input
                                            type="text"
                                            id="diagnosis"
                                            value={data.diagnosis}
                                            onChange={(e) => setData("diagnosis", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="treatment" className="block text-sm font-medium text-gray-700">
                                            Treatment
                                        </label>
                                        <input
                                            type="text"
                                            id="treatment"
                                            value={data.treatment}
                                            onChange={(e) => setData("treatment", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                            Notes
                                        </label>
                                        <textarea
                                            id="notes"
                                            value={data.notes}
                                            onChange={(e) => setData("notes", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                    <div>
                                        <label htmlFor="patient_id" className="block text-sm font-medium text-gray-700">
                                            Patient ID
                                        </label>
                                        <input
                                            type="number"
                                            id="patient_id"
                                            value={data.patient_id}
                                            onChange={(e) => setData("patient_id", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="doctor_id" className="block text-sm font-medium text-gray-700">
                                            Doctor ID
                                        </label>
                                        <input
                                            type="number"
                                            id="doctor_id"
                                            value={data.doctor_id}
                                            onChange={(e) => setData("doctor_id", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => window.location.href = route("medical-records.index")}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600"
                                    >
                                        Kembali
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700"
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
