<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signin(Request $request){
        
        $email = $request->input('email');
        $password = $request->input('password');
    
        // Check if the user exists in the admins table
        $admin = Admin::where('email', $email)->first();

        // User is an admin and password is correct
        if ($admin && Hash::check($password, $admin->password)) {    
            // $token = Auth::guard('admin')->login($admin);
            return response()->json([
                'role' => 'admin', 
                'user' => $admin]);
        }
    
        // If email is not found in admins table, check customers table
        $customer = Customer::where('email', $email)->first();
    
        if ($customer && Hash::check($password, $customer->password)) {
            // User is a customer and password is correct
            // $token = Auth::guard('customer')->login($customer);
            return response()->json([
                'role' => 'customer',
                'user' => $customer]);
        }
        return response()->json(['message' => 'Email not found']);
    }

    public function signup(Request $request){

        $firstName = $request->first_name;
        $lastName = $request->last_name;
        $email = $request->email;
        $password = $request->password;
    
        if (!$firstName || !$lastName || !$email || !$password) {
            return response()->json([
                'message' => 'Missing required fields']);
        }
    
        // Check if the email already exists in the customers table
        if (Customer::where('email', $email)->exists()) {
            return response()->json(['message' => 'Email already registered']);
        }
    
        $customer = new Customer;
        $customer->first_name = $firstName;
        $customer->last_name = $lastName;
        $customer->email = $email;
        $customer->password = Hash::make($password);
        $customer->save();
    
        return response()->json([
            'message' => 'Customer registered successfully',
            'customer' => $customer,
        ]);
    }

}
