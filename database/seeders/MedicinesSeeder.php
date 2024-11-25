<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class MedicinesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('medicines')->insert([
            [
                'name' => 'Paracetamol',
                'stock' => 100,
                'unit_price' => 2000.00,
                'description' => 'Obat pereda demam dan penghilang rasa sakit.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Amoxicillin',
                'stock' => 150,
                'unit_price' => 3000.00,
                'description' => 'Antibiotik untuk mengatasi infeksi bakteri.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cetirizine',
                'stock' => 80,
                'unit_price' => 2500.00,
                'description' => 'Obat untuk mengatasi alergi seperti gatal-gatal atau pilek.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ibuprofen',
                'stock' => 120,
                'unit_price' => 4000.00,
                'description' => 'Obat antiinflamasi untuk nyeri atau radang.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ranitidine',
                'stock' => 60,
                'unit_price' => 3500.00,
                'description' => 'Obat untuk mengurangi produksi asam lambung.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
