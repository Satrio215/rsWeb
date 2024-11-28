<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Patient;
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
        return view('appointments.data', compact('appointments'));

    }
    public function createForm()
    {   
        $patients = Patient::all();
        $doctors = Doctor::all();

        return view('appointments.create', compact('patients', 'doctors'));
        return view('appointments/create');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date',
            'status' => 'required|string|in:Scheduled,Completed,Cancelled',
        ]);
        Appointment::create($validated);
        return redirect('/appointment')->with('success', 'Appointment created successfully.');
    }
    
    public function update2(Request $request, $id)
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found.'], 404);
        }

        $validated = $request->validate([
            'patient_id' => 'sometimes|exists:patients,id',
            'doctor_id' => 'sometimes|exists:doctors,id',
            'appointment_date' => 'sometimes|date',
            'status' => 'sometimes|in:Scheduled,Completed,Cancelled',
        ]);

        $appointment->update($validated);

        return response()->json([
            'message' => 'Appointment updated successfully.',
            'data' => $appointment,
        ]);
    }


    public function edit($id)
    {
        $appointment = Appointment::with('patient', 'doctor')->findOrFail($id);
        $appointment2 = Appointment::with(['patient', 'doctor'])->get();

        return view('appointments.update', compact('appointment','appointment2'));
    }

    // Update data appointment
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string|max:100',
            'doctor_name' => 'required|string|max:100',
            'appointment_date' => 'required|date',
            'status' => 'required|string|in:Scheduled,Completed,Cancelled',
        ]);

        $appointment = Appointment::findOrFail($id);

        // Update atau buat data pasien baru
        $patient = Patient::firstOrCreate(
            ['name' => $validated['patient_name']],
            [
                'birth_date' => now()->subYears(20),
                'gender' => 'Male',
                'address' => 'Unknown Address',
                'phone_number' => '1234567890',
                'email' => fake()->unique()->safeEmail(),
                'password' => bcrypt('password'),
            ]
        );

        // Update atau buat data dokter baru
        $doctor = Doctor::firstOrCreate(
            ['name' => $validated['doctor_name']],
            [
                'specialization' => 'General',
                'phone_number' => '0987654321',
                'email' => fake()->unique()->safeEmail(),
                'password' => bcrypt('password'),
            ]
        );

        // Update data appointment
        $appointment->update([
            'patient_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'appointment_date' => $validated['appointment_date'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('appointments.index')->with('success', 'Appointment updated successfully.');
    }
    

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $appointment = Appointment::with(['patient', 'doctor'])->find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found.'], 404);
        }

        return response()->json($appointment);
    }

    /**
     * Update the specified resource in storage.
     */
   
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found.'], 404);
        }

        $appointment->delete();

        return response()->json(['message' => 'Appointment deleted successfully.']);
    }  












    
    // public function indexselection()
    // {
    //     $appointments = Appointment::with('patient:id,name','doctor:id,name')->get();
    //     return response()->json($appointments);
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function cobain(Request $request)
    // {
    //     $validated = $request->validate([
    //         'patient_id' => 'required',
    //         'doctor_id' => 'required',
    //         'appointment_date' => 'required',
    //         'status' => 'required',
    //     ]);

    //     $appointment = Appointment::create($validated);

    //     return response()->json([
    //         'message' => 'Appointment created successfully.',
    //         'data' => $appointment,
    //     ], 201);
    // }
    
}
