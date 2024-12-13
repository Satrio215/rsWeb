<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class MedicalRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil data rekam medis dari database
        $response = Http::get('http://127.0.0.1:8000/api/medical-records');
        $medicalRecords = $response->json()['data'];

        // Kirim data ke Inertia
        return Inertia::render('MedicalRecord/Index', [
            'medicalRecords' => $medicalRecords
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(MedicalRecord $medicalRecord)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MedicalRecord $medicalRecord)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MedicalRecord $medicalRecord)
    {
        $data = [
            'diagnosis' => $request->diagnosis,
            'treatment' => $request->treatment,
            'notes' => $request->notes,
            'patient_id' => $request->patient_id,
            'doctor_id' => $request->doctor_id,
        ];

        // Mengirim permintaan PUT ke API eksternal
        $response = Http::put("http://127.0.0.1:8000/api/medical-records/{$id}", $data);

        // Menangani respon
        if ($response->successful()) {
            return redirect()->route('medical-records.index')->with('success', 'Rekam medis berhasil diperbarui.');
        }

        return redirect()->route('medical-records.index')->with('error', 'Gagal memperbarui rekam medis.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicalRecord $medicalRecord)
    {
        //
    }
}
