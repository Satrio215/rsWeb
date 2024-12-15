<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Models\Doctor;
use App\Models\Patient;

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
        return Inertia::render('MedicalRecord/Create', [
        'doctors' => Doctor::all() // Ambil data dokter atau referensi lain jika diperlukan
    ]);
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
    public function edit($id)
    {
        $response = Http::get("http://127.0.0.1:8000/api/medical-records/{$id}");

        if ($response->successful()) {
            return Inertia::render('MedicalRecord/Update', [
                'record' => $response->json()['data'],
                'doctors' => Doctor::all(),
                'patients' => Patient::all()
            ]);
        }

        return redirect()->route('medical-records.index')->with('error', 'Data tidak ditemukan');
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, $id)
    {
        // Validasi data yang dikirim dari form
        $validated = $request->validate([
            'patient_id' => 'required|integer|exists:patients,id', // Sesuaikan dengan frontend
            'doctor_id' => 'required|integer|exists:doctors,id',
            'diagnosis' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        // Kirim data ke API untuk update medical record
        $response = Http::put("http://127.0.0.1:8000/api/medical-records/{$id}", $validated);

        // Cek apakah request berhasil
        if ($response->successful()) {
            return to_route('medical-records.index')->with('success', 'Data berhasil diperbarui.');
        }

        // Jika gagal, kembalikan ke halaman sebelumnya dengan error
        return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicalRecord $medicalRecord)
    {
        $response = Http::delete("http://127.0.0.1:8000/api/medical-records/{$medicalRecord}");

        if ($response->successful()) {
            return redirect()->route('medical-records.index')->with('success', 'Data berhasil dihapus.');
        }

        return back()->withErrors(['error' => 'Terjadi kesalahan saat menghapus data']);
    }
}
