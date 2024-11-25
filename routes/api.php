<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MedicalRecordController;
use App\Http\Controllers\ScheduleController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('medical-records', MedicalRecordController::class);

//Jadwal (127.0.0.1/rsWeb/public/api/schedules)
Route::get('/schedules', [ScheduleController::class, 'index']);
Route::post('/schedules/add', [ScheduleController::class, 'store']);




