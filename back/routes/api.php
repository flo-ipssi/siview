<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

    // Expenses
    Route::post('/expenses', [\App\Http\Controllers\ExpenseController::class, 'store']);
    

});
