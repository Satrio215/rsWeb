<?php

namespace Database\Factories;

use App\Models\Doctor;
use Illuminate\Database\Eloquent\Factories\Factory;

class DoctorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Doctor::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'specialization' => $this->faker->word(),
            'phone_number' => $this->faker->regexify('[0-9]{3}-[0-9]{3}-[0-9]{4}'),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'), // Anda bisa menyesuaikan password default
        ];
    }
}
