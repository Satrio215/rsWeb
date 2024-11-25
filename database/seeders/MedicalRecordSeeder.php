<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\Appointment;
use App\Models\MedicalRecord;

class MedicalRecordSeeder extends Seeder
{
    public function run()
    {
        // Seeder untuk tabel patients
        $patients = Patient::factory(10)->create();

        // Seeder untuk tabel doctors
        $doctors = Doctor::factory(5)->create();

        // Seeder untuk tabel appointments
        $appointments = Appointment::factory(10)->create();

        // Seeder untuk tabel medical_records
        foreach ($patients as $patient) {
            MedicalRecord::create([
                'patient_id' => $patient->id,
                'doctor_id' => $doctors->random()->id,
                'appointment_id' => $appointments->random()->id,
                'diagnosis' => 'Diagnosis example for ' . $patient->name,
                'treatment' => 'Treatment example for ' . $patient->name,
                'notes' => 'Additional notes for ' . $patient->name,
            ]);
        }
    }
}
