<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signin(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        // Check if the user exists in the admins table
        $admin = Admin::where('email', $email)->first();

        if ($admin && Hash::check($password, $admin->password)) {
            // User is an admin and password is correct
            $token = Auth::guard('admin')->login($admin);
            return response()->json(['role' => 'admin', 'user' => $admin, 'token' => $token], 200);
        }

        // If email is not found in admins table, check customers table
        $customer = Customer::where('email', $email)->first();

        if ($customer && Hash::check($password, $customer->password)) {
            // User is a customer and password is correct
            $token = Auth::guard('customer')->login($customer);
            return response()->json(['role' => 'customer', 'user' => $customer, 'token' => $token], 200);
        }else{
            return response()->json(['Error'=> 'Email not found' ]);
        }
    }





    
}
