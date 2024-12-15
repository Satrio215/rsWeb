<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $doctors = Doctor::latest()->get();

        return inertia('Doctor/Index', [
            'doctors' => $doctors
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Doctor/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'specialization' => 'required',
            'phone_number' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        Doctor::create([
            'name' => $request->input('name'),
            'specialization' => $request->input('specialization'),
            'phone_number' => $request->input('phone_number'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')), // Enkripsi password
        ]);

        return redirect()->route('doctors.index')->with('success', 'Dokter berhasil ditambahkan.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Doctor $doctor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $doctor = Doctor::findOrFail($id);

        return inertia('Doctor/Update', [
            'doctor' => $doctor,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Doctor $doctor, $id)
    {
        $doctor = Doctor::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'specialization' => 'required',
            'phone_number' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $doctor->update([
            'name' => $request->input('name'),
            'specialization' => $request->input('specialization'),
            'phone_number' => $request->input('phone_number'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);

        return redirect()->route('doctors.index')->with('success', 'Dokter berhasil diupdate.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctor $doctor, $id)
    {
        $doctor = Doctor::findOrFail($id);
        $doctor->delete();
        return response()->json(['message' => 'Doctor berhasil dihapus.']);
    }
}
