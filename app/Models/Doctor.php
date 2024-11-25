<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'specialization',
        'phone_number',
        'email',
        'password',
    ];
    /**
     * Hide sensitive attributes.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Define the appointments relationship.
     */
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}
