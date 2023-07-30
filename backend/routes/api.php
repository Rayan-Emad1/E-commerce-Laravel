<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


// Route::get('/test-token', function () {
//     return response()->json(['message' => 'Token is valid']);
// })->middleware('jwt');


Route::post('/signin', [AuthController::class, 'signin']);
Route::post('/signup', [AuthController::class, 'signup']);



Route::get('/products', [CustomerController::class, 'getProducts']);


