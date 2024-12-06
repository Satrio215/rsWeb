<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class MedicalRecordsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $appointmentIds = DB::table('appointments')->pluck('id');

        DB::table('medical_records')->insert(
            $appointmentIds->map(function ($appointmentId) {
                return [
                    'appointment_id' => $appointmentId,
                    'diagnosis' => fake()->sentence(6),
                    'treatment' => fake()->sentence(8),
                    'notes' => fake()->optional()->paragraph(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })->toArray()
        );
    }
}
