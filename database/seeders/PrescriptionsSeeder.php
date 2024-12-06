<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class PrescriptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $medicalRecordIds = DB::table('medical_records')->pluck('id');
        $medicineIds = DB::table('medicines')->pluck('id');

        DB::table('prescriptions')->insert(
            collect(range(1, 10))->map(function () use ($medicalRecordIds, $medicineIds) {
                return [
                    'medical_record_id' => $medicalRecordIds->random(),
                    'medicine_id' => $medicineIds->random(),
                    'dosage' => fake()->randomElement(['1 tablet per day', '2 tablets per day', '1 teaspoon every 8 hours']),
                    'quantity' => fake()->numberBetween(1, 20),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })->toArray()
        );
    }
}
