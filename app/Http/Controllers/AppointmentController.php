<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function coba()
    {
        $appointments = Appointment::with(['patient', 'doctor'])
            ->get(['id', 'patient_id', 'doctor_id', 'appointment_date', 'status']);

        $data = $appointments->map(function ($appointment) {
            return [
                'patient_name' => $appointment->patient->name,
                'doctor_name' => $appointment->doctor->name,
                'appointment_date' => $appointment->appointment_date->format('Y-m-d H:i'),
                'status' => $appointment->status,
            ];
        });
        return response()->json($data);
    }
    public function index()
    {
        $appointments = Appointment::with(['patient', 'doctor'])->get();
        return response()->json($appointments);
    }

    public function indexselection()
    {
        $appointments = Appointment::with('patient:id,name','doctor:id,name')->get();
        return response()->json($appointments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function cobain(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required',
            'doctor_id' => 'required',
            'appointment_date' => 'required',
            'status' => 'required',
        ]);

        $appointment = Appointment::create($validated);

        return response()->json([
            'message' => 'Appointment created successfully.',
            'data' => $appointment,
        ], 201);
    }
    
}
