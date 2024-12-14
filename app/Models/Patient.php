<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Patient extends Authenticatable
{
    use HasFactory;
    protected $fillable = [
        'name',
        'birth_date',
        'gender',
        'address',
        'phone_number',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];


    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
