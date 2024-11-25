<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



//fitur appointments
Route::get('/appointments', [AppointmentController::class, 'coba']);
Route::get('/appointments/show', [AppointmentController::class, 'index']);
Route::get('/appointments/showselect', [AppointmentController::class, 'indexselection']);

Route::apiResource('medical-records', MedicalRecordController::class);

