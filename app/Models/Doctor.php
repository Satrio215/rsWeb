<?php
namespace App\Models;

use Illuminate\Auth\Authenticatable as AuthenticatableTrait; // Correct the use statement
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model implements \Illuminate\Contracts\Auth\Authenticatable // Implement the interface
{
    use HasFactory, AuthenticatableTrait; // Use the trait correctly

    protected $table = 'doctors';  // Make sure the table name matches your database

    protected $fillable = [
        'name',
        'specialization',
        'phone_number',
        'email',
        'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relationships
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}


