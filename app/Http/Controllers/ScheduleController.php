<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Schedule;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schedules = Schedule::with('doctor:id,name')
        ->latest()
        ->get()
        ->map(function ($schedule) {
            return [
                'id' => $schedule->id,
                'doctor_name' => $schedule->doctor->name ?? 'Tidak Diketahui',
                'day' => $schedule->day,
                'start_time' => $schedule->start_time,
                'end_time' => $schedule->end_time,
            ];
        });

    return inertia('Schedule/Index', [
        'schedules' => $schedules,
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $doctors = Doctor::all();
        return inertia('Schedule/Create', [
            'doctors' => $doctors,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'day' => 'required|string|max:255',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        Schedule::create([
            'doctor_id' => $request->input('doctor_id'),
            'day' => $request->input('day'),
            'start_time' => $request->input('start_time'),
            'end_time' => $request->input('end_time'),
        ]);

        return redirect()->route('schedules.index')->with('success', 'Jadwal berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $doctor = Auth::guard('doctors')->user();

        if (!$doctor) {
            return abort(403, 'Anda tidak memiliki akses ke jadwal.');
        }

        $schedules = Schedule::where('doctor_id', $doctor->id)->get();

        return inertia('Doctor/Schedule', [
            'schedules' => $schedules,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $schedule = Schedule::findOrFail($id);
        $doctors = Doctor::all();
        return inertia('Schedule/Update', [
            'schedule' => $schedule,
            'doctors' => $doctors,
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule, $id)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'day' => 'required|string|max:255',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $schedule = Schedule::findOrFail($id);

        $schedule->update([
            'doctor_id' => $request->input('doctor_id'),
            'day' => $request->input('day'),
            'start_time' => $request->input('start_time'),
            'end_time' => $request->input('end_time'),
        ]);

        return redirect()->route('schedules.index')->with('success', 'Jadwal berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule, $id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->delete();

        return response()->json(['message' => 'Doctor berhasil dihapus.']);
    }
}
