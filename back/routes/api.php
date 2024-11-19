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
Route::get('/me', action: [\App\Http\Controllers\AuthController::class, 'me']);

Route::middleware('auth:api')->group(function () {
    // Auth
    Route::get('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

    // Expenses
    Route::post('/expense/create', [\App\Http\Controllers\ExpenseController::class, 'store']);
    Route::get('/expense/list', action: [\App\Http\Controllers\ExpenseController::class, 'getExpenses']);
});
