<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Patient::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'birth_date' => $this->faker->date(),
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'address' => $this->faker->address(),
            'phone_number' => $this->faker->regexify('[0-9]{3}-[0-9]{3}-[0-9]{4}'),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'),  // Anda bisa menyesuaikan password default
        ];
    }
}
