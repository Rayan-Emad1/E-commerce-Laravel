<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AdminController;


// Route::get('/test-token', function () {
//     return response()->json(['message' => 'Token is valid']);
// })->middleware('jwt');


Route::post('/signin', [AuthController::class, 'signin']);
Route::post('/signup', [AuthController::class, 'signup']);



Route::get('/products', [CustomerController::class, 'getProducts']);
Route::post('/get-product', [CustomerController::class, 'getProduct']);
Route::post('/add-to-cart', [CustomerController::class, 'addToCart']);
Route::post('/add-to-liked', [CustomerController::class, 'addToLiked']);
Route::get('get-customer-products', [CustomerController::class, 'getCustomerProducts']);



Route::get('/products', [AdminController::class, 'getProducts']);
Route::post('/create', [AdminController::class, 'create']);
Route::post('/update',[AdminController::class, 'update']);
Route::post('/destroy',[AdminController::class, 'destroy']);
