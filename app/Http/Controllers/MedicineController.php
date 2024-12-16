<?php

namespace App\Http\Controllers;

use App\Models\Medicine;    
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medicines = Medicine::latest()->get();

        return inertia('Medicine/Index', [
            'medicines' => $medicines
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $medicines = Medicine::all();
        return inertia('Medicine/Create', [
            'medicines' => $medicines,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'stock' => 'nullable|integer|min:0',
            'description' => 'required|string',
            'unit_price' => 'required|numeric|min:0',
        ]);

        // Simpan data baru ke database
        Medicine::create([
            'name' => $request->name,
            'description' => $request->description,
            'unit_price' => $request->unit_price,
            'stock' => $request->stock ?? 0,
        ]);

        // Redirect ke halaman index dengan pesan sukses
        return redirect()->route('medicines.index')->with('success', 'Obat berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Medicine $medicine)
    {
        // Menampilkan detail data Medicine
        return inertia('Medicine/Show', compact('medicine'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // Menampilkan form edit data Medicine
        $medicine = Medicine::findOrFail($id);

        return inertia('Medicine/Update', [
            'medicine' => $medicine,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'unit_price' => 'required|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
        ]);

        $medicine = Medicine::findOrFail($id);

        // Update data di database
        $medicine->update([
            'name' => $request->name,
            'description' => $request->description,
            'unit_price' => $request->unit_price,
            'stock' => $request->stock,
        ]);

        // Redirect ke halaman index dengan pesan sukses
        return redirect()->route('medicines.index')->with('success', 'Obat berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medicine $medicine, $id)
    {
        $medicine = Medicine::findOrFail($id);
        $medicine->delete();

        return response()->json(['message' => 'Data Obat berhasil dihapus.']);
    }
}
