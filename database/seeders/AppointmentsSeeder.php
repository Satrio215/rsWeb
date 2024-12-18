<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppointmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $doctorIds = DB::table('doctors')->pluck('id')->toArray();
        $patientIds = DB::table('patients')->pluck('id')->toArray();
        if (empty($doctorIds) || empty($patientIds)) {
            echo "Seeder gagal: Pastikan tabel 'doctors' dan 'patients' sudah terisi data.\n";
            return;
        }

        DB::table('appointments')->insert(
            collect(range(1, 10))->map(function () use ($doctorIds, $patientIds) {
                return [
                    'appointment_date' => fake()->dateTimeBetween('+1 days', '+7 days')->format('Y-m-d'),
                    'appointment_time' => fake()->randomElement($this->generateHours()),
                    'doctor_id' => fake()->randomElement($doctorIds),
                    'patient_id' => fake()->randomElement($patientIds),
                    'status' => fake()->randomElement(['Scheduled', 'Completed', 'Cancelled']),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })->toArray()
        );
    }
    private function generateHours(): array
    {
        return collect(range(0, 23))->map(function ($hour) {
            return str_pad($hour, 2, '0', STR_PAD_LEFT) . ':00';
        })->toArray();
    }
}
