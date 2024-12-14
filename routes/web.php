<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\Auth\DoctorAuthController;
use App\Http\Controllers\Auth\PatientLoginController;
use App\Http\Controllers\PatientRegistrationController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('doctor/login', [DoctorAuthController::class, 'showLoginForm'])->name('doctor.login');
Route::post('doctor/login', [DoctorAuthController::class, 'login']);
Route::post('doctor/logout', [DoctorAuthController::class, 'logout'])->name('doctor.logout');

Route::middleware('auth:doctors')->group(function () {
    Route::get('doctor/dashboard', [DoctorAuthController::class, 'dashboard'])->name('doctor.dashboard');
    Route::get('doctor/schedule', [ScheduleController::class, 'show'])->name('schedule.show');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/doctors', [DoctorController::class, 'index'])->name('doctors.index');
    Route::get('/doctors/create', [DoctorController::class, 'create'])->name('doctors.create');
    Route::post('/doctors', [DoctorController::class, 'store'])->name('doctors.store');
    Route::get('/doctors/edit/{id}', [DoctorController::class, 'edit'])->name('doctors.edit');
    Route::put('/doctors/{id}', [DoctorController::class, 'update'])->name('doctors.update');
    Route::delete('/doctors/{id}', [DoctorController::class, 'destroy'])->name('doctors.destroy');

    Route::get('/schedules', [ScheduleController::class, 'index'])->name('schedules.index');
    Route::get('/schedules/create', [ScheduleController::class, 'create'])->name('schedules.create');
    Route::post('/schedules', [ScheduleController::class, 'store'])->name('schedules.store');
    Route::get('/schedules/edit/{id}', [ScheduleController::class, 'edit'])->name('schedules.edit');
    Route::put('/schedules/{id}', [ScheduleController::class, 'update'])->name('schedules.update');
    Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy'])->name('schedules.destroy');
    Route::resource('medical-records', MedicalRecordController::class);
    Route::get('/medical-records', [MedicalRecordController::class, 'index'])->name('medical-records.index');
    Route::get('medical-records/{id}/edit', [MedicalRecordController::class, 'edit'])->name('medical-records.edit');
    Route::put('/medical-records/{id}', [MedicalRecordController::class, 'update'])->name('medical-records.update');

    Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments.index');
    Route::get('/appointments/create', [AppointmentController::class, 'create'])->name('appointments.create');
    Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');
    Route::get('/appointments/edit/{id}', [AppointmentController::class, 'edit'])->name('appointments.edit');
    Route::put('/appointments/{id}', [AppointmentController::class, 'update'])->name('appointments.update');
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy'])->name('appointments.destroy');
});

Route::get('/register-patient', function () {
    return Inertia::render('Auth/RegisterPatient');
})->name('register-patient');

Route::post('/register-patient', [PatientRegistrationController::class, 'register'])->name('register-patient.submit');

Route::get('/login-patient', function () {
    return Inertia::render('Auth/LoginPatient');
})->name('login-patient');

Route::post('patient/login', [PatientLoginController::class, 'login'])->name('patient.login.submit');
Route::post('patient/logout', [PatientLoginController::class, 'logout'])->name('patient.logout');
Route::get('/patient/dashboard', [PatientController::class, 'dashboard'])
    ->middleware('auth:patient') 
    ->name('patient.dashboard');



require __DIR__.'/auth.php';
