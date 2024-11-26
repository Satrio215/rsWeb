<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Api\MedicalRecordController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



//fitur appointments
Route::get('/appointments', [AppointmentController::class, 'coba']);
Route::post('/appointments/add/process', [AppointmentController::class, 'store']);
Route::post('/appointments/add/process2', [AppointmentController::class, 'cobain']);

Route::get('/appointments/show', [AppointmentController::class, 'index']);
Route::get('/appointments/showselect', [AppointmentController::class, 'indexselection']);

Route::apiResource('medical-records', MedicalRecordController::class);

//Jadwal (127.0.0.1/rsWeb/public/api/schedules)
Route::get('/schedules', [ScheduleController::class, 'index']);
Route::post('/schedules/add', [ScheduleController::class, 'store']);

