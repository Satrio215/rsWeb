<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;

class PatientRegistrationController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'birth_date' => 'required|date',
            'gender' => 'required|in:male,female',
            'address' => 'required|string',
            'phone_number' => 'required|string|max:16',
            'email' => 'required|string|email|max:100|unique:patients,email',
            'password' => 'required|string|confirmed|min:8'
        ]);

        $patient = Patient::create([
            'name' => $request->name,
            'birth_date' => $request->birth_date,
            'gender' => $request->gender,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return Redirect::to('/login-patient');
    }
}
