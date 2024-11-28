<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AppointmentController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', [ProfileController::class, 'edit']);






Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/appointment/create', [AppointmentController::class, 'createForm']);
Route::get('/appointment', [AppointmentController::class, 'index']);
Route::post('/appointment/create/store', [AppointmentController::class, 'store']);
Route::get('/appointment/{id}/edit', [AppointmentController::class, 'edit'])->name('appointments.edit');
Route::put('/appointment/{id}', [AppointmentController::class, 'update'])->name('appointments.update');


require __DIR__.'/auth.php';
