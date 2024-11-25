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
        $medicalRecords = MedicalRecord::with(['patient', 'doctor', 'appointment'])->get();

        // Return a collection of MedicalRecord resources
        return MedicalRecordResource::collection($medicalRecords);
    }

    // Menyimpan rekam medis baru
    public function store(StoreMedicalRecordRequest $request)
    {
        // Store the validated data and create the MedicalRecord
        $medicalRecord = MedicalRecord::create($request->validated());

        // Return the newly created resource with a success message
        return response()->json([
            'message' => 'Medical record created successfully.',
            'medical_record' => new MedicalRecordResource($medicalRecord)
        ], Response::HTTP_CREATED);
    }

    // Menampilkan detail rekam medis berdasarkan ID
    public function show(MedicalRecord $medicalRecord)
    {
        // Load relationships for the medical record
        return new MedicalRecordResource($medicalRecord->load(['patient', 'doctor', 'appointment']));
    }


    public function update(UpdateMedicalRecordRequest $request, MedicalRecord $medicalRecord)
    {
        // Validasi dan update rekam medis yang ada
        $medicalRecord->update($request->validated());

        // Return response dengan pesan sukses dan data rekam medis yang sudah diperbarui
        return response()->json([
            'message' => 'Medical record updated successfully.',
            'medical_record' => new MedicalRecordResource($medicalRecord)
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
