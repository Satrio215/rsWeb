<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DoctorAuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Doctor/Login');
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $doctor = Doctor::where('email', $validated['email'])->first();

        if ($doctor && Hash::check($validated['password'], $doctor->password)) {
            Auth::guard('doctors')->login($doctor);

            return redirect()->route('doctor.dashboard');
        }

        return back()->withErrors(['email' => 'The provided credentials are incorrect.']);
    }

    public function logout()
    {
        Auth::guard('doctors')->logout();
        return redirect()->route('doctor.login');
    }

    public function dashboard()
    {
        $doctor = auth()->guard('doctors')->user();

        return Inertia::render('Doctor/Dashboard', [
            'doctor' => $doctor
        ]);
    }
}
