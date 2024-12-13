<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class PatientLoginController extends Controller
{
    public function showLoginForm()
    {
        return view('Auth.LoginPatient');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if (Auth::guard('patient')->attempt([
            'email' => $request->email,
            'password' => $request->password
        ], $request->remember)) {
            return Inertia::location(route('patient.dashboard'));
        } 
        throw ValidationException::withMessages([
            'email' => ['Email atau password tidak sesuai.'],
        ]);
    }

    public function logout()
    {
        Auth::guard('patient')->logout();
        return redirect()->route('login');
    }
}
