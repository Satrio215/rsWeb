<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appointments = Appointment::with(['patient', 'doctor'])->get();
        return inertia('Appointment/Index', ['appointments' => $appointments]);
            
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $doctors = Doctor::all();
        $patients = Patient::all();
        return inertia('Appointment/Create', compact('doctors', 'patients'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'patient_id' => 'required|exists:patients,id',
            'appointment_date' => 'required',
            'appointment_time' => 'required',
            'status' => 'required|string|in:Scheduled,Completed,Cancelled',
        ]);

        Appointment::create($validatedData);

        return redirect('appointments')->with('success', 'Appointment successfully created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $doctors = Doctor::all();
        $patients = Patient::all();
        $appointments = Appointment::with(['doctor', 'patient'])->find($id);
        return inertia('Appointment/Edit', compact('doctors', 'patients','appointments'));
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'patient_id' => 'required|exists:patients,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required',
            'status' => 'required|in:Scheduled,Completed,Cancelled',
        ]);
        $appointment = Appointment::findOrFail($id);
        $appointment->update($validated);
    
        return redirect()->route('appointments.index')->with('success', 'Appointment berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    
    public function destroy(Appointment $appointment, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();
        return response()->json(['message' => 'Doctor berhasil dihapus.']);
        
    }
}
