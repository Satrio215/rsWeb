<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MedicalRecordResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'appointment_id' => $this->appointment_id,
            'diagnosis' => $this->diagnosis,
            'treatment' => $this->treatment,
            'notes' => $this->notes,
            'patient' => new PatientResource($this->appointment->patient),
            'doctor' => new DoctorResource($this->appointment->doctor),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
