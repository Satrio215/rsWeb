<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Appointment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),  // Menggunakan factory untuk membuat data pasien
            'doctor_id' => Doctor::factory(),  // Menggunakan factory untuk membuat data dokter
            'appointment_date' => $this->faker->dateTimeBetween('+1 day', '+1 month'),  // Tanggal janji temu dalam 1 bulan ke depan
            'status' => $this->faker->randomElement(['Scheduled', 'Completed', 'Cancelled']),
        ];
    }
}
