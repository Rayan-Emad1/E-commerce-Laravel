<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;


// Route::get('/test-token', function () {
//     return response()->json(['message' => 'Token is valid']);
// })->middleware('jwt');


Route::post('/signin', [AuthController::class, 'signin']);
Route::post('/signup', [AuthController::class, 'signup']);



Route::get('/products', [CustomerController::class, 'getProducts']);
Route::post('/get-product', [CustomerController::class, 'getProduct']);
Route::get('/add-to-cart', [CustomerController::class, 'addToCart']);
Route::post('/add-to-liked', [CustomerController::class, 'addToLiked']);


