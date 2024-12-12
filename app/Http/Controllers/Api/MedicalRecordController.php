<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMedicalRecordRequest;
use App\Http\Requests\UpdateMedicalRecordRequest;
use App\Http\Resources\MedicalRecordResource;
use App\Models\MedicalRecord;
use Illuminate\Http\Response;

class MedicalRecordController extends Controller
{
    // Menampilkan daftar rekam medis
    public function index()
    {
        $medicalRecords = MedicalRecord::with(['appointment.patient', 'appointment.doctor'])->get();

        // Return a collection of MedicalRecord resources
        return MedicalRecordResource::collection($medicalRecords);
    }

    // Menyimpan rekam medis baru

    public function store(StoreMedicalRecordRequest $request)
    {
        $medicalRecord = MedicalRecord::create($request->validated());

        return response()->json([
            'message' => 'Medical record created successfully.',
            'medical_record' => new MedicalRecordResource($medicalRecord->load(['appointment.patient', 'appointment.doctor']))
        ], Response::HTTP_CREATED);
    }

    // Menampilkan detail rekam medis berdasarkan ID
    public function show(MedicalRecord $medicalRecord)
    {
        // Load relationships for the medical record
        return new MedicalRecordResource(
            $medicalRecord->load(['appointment.patient', 'appointment.doctor'])
        );
    }



    public function update(UpdateMedicalRecordRequest $request, MedicalRecord $medicalRecord)
    {
        // Validasi data
        $validated = $request->validated();

        // Perbarui data di tabel `appointments` melalui relasi
        $appointment = $medicalRecord->appointment;
        $appointment->update([
            'patient_id' => $validated['patient_id'],
            'doctor_id' => $validated['doctor_id'],
        ]);

        // Perbarui data rekam medis di tabel `medical_records`
        $medicalRecord->update([
            'diagnosis' => $validated['diagnosis'],
            'treatment' => $validated['treatment'],
            'notes' => $validated['notes'],
        ]);

        // Kembalikan respon
        return response()->json([
            'message' => 'Medical record updated successfully.',
            'medical_record' => new MedicalRecordResource($medicalRecord->load(['appointment.patient', 'appointment.doctor'])),
        ]);
    }

    // Menghapus rekam medis berdasarkan ID
    public function destroy(MedicalRecord $medicalRecord)
    {
        // Delete the medical record
        $medicalRecord->delete();

        // Return a success message
        return response()->json([
            'message' => 'Medical record deleted successfully.'
        ], Response::HTTP_OK);
    }
}
