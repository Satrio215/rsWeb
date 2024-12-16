<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable as AuthenticatableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model implements \Illuminate\Contracts\Auth\Authenticatable
{

    use HasFactory, AuthenticatableTrait;

    protected $table = 'medicines';

    protected $fillable = [
        'name',        // Nama obat
        'description', // Deskripsi obat
        'unit_price',  // Harga obat per unit
        'stock',       // Jumlah stok obat
    ];
    
}
