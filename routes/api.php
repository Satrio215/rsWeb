<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MedicalRecordController;

Route::apiResource('medical-records', MedicalRecordController::class);
