<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
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
}
