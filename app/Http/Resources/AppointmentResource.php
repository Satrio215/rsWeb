<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'patient_name' => $this->patient->name, // Pastikan relasi sudah dimuat
            'doctor_name' => $this->doctor->name,   // Pastikan relasi sudah dimuat
            'appointment_date' => $this->appointment_date,
            'notes' => $this->notes,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
