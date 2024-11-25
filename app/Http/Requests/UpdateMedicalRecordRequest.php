<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMedicalRecordRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Pastikan pengguna memiliki izin untuk memperbarui rekam medis
    }

    public function rules()
    {
        return [
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_id' => 'required|exists:appointments,id',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
            'notes' => 'nullable|string',
        ];
    }
}
